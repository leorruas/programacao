# Post-processing, render targets, depth e stencil em Three.js

Depois de construir geometria, materiais, iluminação e câmera, surge outra camada de controle visual: **o que acontece depois que a cena já foi renderizada?**

É aqui que entram post-processing, render targets, depth buffers, stencil e composição em múltiplas passagens.

Uma analogia útil com design é pensar na cena 3D como a fotografia original. O post-processing é a etapa de tratamento, montagem e composição que acontece depois da captura. Algumas operações só precisam da imagem final. Outras precisam saber também qual pixel estava mais perto da câmera, qual objeto o produziu ou em qual região ele pode aparecer.

Este artigo aprofunda [[javascript/07-threejs/06-Composição visual, performance e diagnóstico de cenas 3D|composição visual e diagnóstico]], [[javascript/07-threejs/12-Shaders, GLSL e materiais customizados|shaders e materiais customizados]], [[javascript/07-threejs/13-Câmera, projeção e leitura espacial em Three.js|câmera e projeção]] e [[javascript/07-threejs/18-UVs, texturas, PBR e environment maps em Three.js|UVs, PBR e environment maps]].

---

## 1. O que muda quando a cena deixa de ir direto para a tela

No caminho mais simples, o renderer produz a imagem final diretamente no framebuffer da tela:

```javascript
renderer.render(scene, camera);
```

Com post-processing, o fluxo passa a ser mais parecido com:

`scene → render target → pass 1 → pass 2 → ... → tela`

A cena continua sendo renderizada normalmente. A diferença é que a primeira imagem pode ser guardada em uma textura intermediária e usada como entrada para novos cálculos.

Isso cria uma arquitetura de composição.

---

## 2. Render target é uma tela fora da tela

`WebGLRenderTarget` é um destino de renderização que vive na GPU.

Em vez de desenhar na tela, você desenha em uma textura:

```javascript
const target = new THREE.WebGLRenderTarget(width, height);

renderer.setRenderTarget(target);
renderer.render(scene, camera);
renderer.setRenderTarget(null);
```

Depois disso, `target.texture` pode ser usada em outro material, shader ou passe.

A analogia é semelhante a renderizar um frame para uma camada temporária antes de compor o layout final.

---

## 3. Por que renderizar para uma textura

Render targets permitem construir efeitos que exigem uma imagem intermediária.

Exemplos:

* blur;
* bloom;
* reflexos customizados;
* portais;
* minimapas;
* picture-in-picture;
* máscaras;
* composição de múltiplas câmeras;
* feedback visual entre frames;
* picking por cor;
* efeitos dependentes de depth.

A ideia central é simples: **uma renderização pode virar dado para outra renderização**.

---

## 4. Um passe é uma etapa do pipeline

Em post-processing, cada passe recebe uma entrada e produz uma saída.

Um pipeline pode ser:

`RenderPass → BloomPass → ColorCorrectionPass → OutputPass`

Cada passe resolve um problema específico.

Quanto mais passes, maior o custo potencial de:

* renderização extra;
* leitura e escrita de texturas;
* uso de memória de GPU;
* fill rate;
* largura de banda.

Por isso post-processing deve ser tratado como pipeline, não como uma coleção de filtros adicionados sem orçamento.

---

## 5. EffectComposer

O Three.js fornece uma arquitetura pronta de composição via `EffectComposer`.

```javascript
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
```

No loop:

```javascript
function animate() {
  composer.render();
  requestAnimationFrame(animate);
}
```

A partir daqui, novos passes podem ser adicionados em sequência.

---

## 6. ShaderPass

`ShaderPass` permite aplicar um shader fullscreen à imagem produzida anteriormente.

O padrão é trabalhar com um plano que ocupa a tela inteira e amostrar a textura do passe anterior.

Exemplo conceitual:

```javascript
const shader = {
  uniforms: {
    tDiffuse: { value: null },
    amount: { value: 0.2 }
  },
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float amount;
    varying vec2 vUv;

    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      color.rgb += amount;
      gl_FragColor = color;
    }
  `
};
```

Esse passe não precisa conhecer meshes ou materiais originais. Ele trabalha sobre pixels já produzidos.

---

## 7. Post-processing não corrige uma cena mal iluminada

Um erro comum é usar efeitos finais para compensar problemas anteriores.

Bloom não substitui iluminação.

Color grading não corrige `colorSpace` errado.

Blur não corrige aliasing estrutural.

Vignette não cria composição.

Antes de adicionar um passe, pergunte:

**o problema pertence à cena ou à imagem final?**

Se pertence à geometria, material, luz ou câmera, resolva antes.

---

## 8. Bloom e seleção perceptiva

Bloom simula espalhamento de luz de regiões intensas.

Com `UnrealBloomPass`:

```javascript
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

const bloom = new UnrealBloomPass(
  new THREE.Vector2(width, height),
  0.8,
  0.4,
  1.0
);

composer.addPass(bloom);
```

Os parâmetros principais controlam força, raio e threshold.

A decisão importante não é "quanto bloom usar", mas **quais regiões devem ser suficientemente luminosas para gerar bloom**.

Quando tudo brilha, o efeito deixa de criar hierarquia.

---

## 9. Selective bloom

Às vezes somente determinados objetos devem contribuir para bloom.

Existem várias estratégias:

* layers;
* materiais temporários;
* renderização separada;
* máscara por objeto;
* composição de duas cenas ou dois targets.

A lógica costuma ser:

1. renderizar apenas objetos emissivos em um target;
2. aplicar bloom nesse target;
3. compor o resultado sobre a cena original.

Isso é um bom exemplo de por que post-processing frequentemente vira arquitetura de renderização.

---

## 10. Depth buffer

O depth buffer armazena informação de profundidade usada para decidir qual fragmento está na frente.

Durante a renderização, cada fragmento produz um valor de profundidade.

Em termos intuitivos:

* menor ou maior valor, dependendo da convenção e transformação, representa posição ao longo do volume visível;
* o teste de depth compara fragmentos;
* o fragmento oculto pode ser descartado.

É isso que permite que objetos se ocultem corretamente sem ordenar manualmente todos os triângulos opacos.

---

## 11. Depth test e depth write são coisas diferentes

Materiais possuem controles como:

```javascript
material.depthTest = true;
material.depthWrite = true;
```

`depthTest` pergunta:

**este fragmento deve comparar sua profundidade com o buffer existente?**

`depthWrite` pergunta:

**se ele for desenhado, deve atualizar o buffer?**

Essa diferença é crucial para transparência, overlays e efeitos especiais.

Desabilitar ambos sem entender o pipeline costuma gerar objetos aparecendo por cima de coisas que deveriam ocultá-los.

---

## 12. Transparência e ordenação

Transparência é difícil porque a composição depende da ordem.

Para materiais opacos, depth buffer resolve grande parte do problema.

Para superfícies transparentes, o renderer pode precisar ordenar objetos e ainda assim enfrentar ambiguidades quando geometrias se intersectam.

Problemas comuns:

* partes transparentes somem;
* faces aparecem na ordem errada;
* superfícies piscam;
* objetos internos parecem atravessar o exterior.

Possíveis ferramentas incluem:

* `depthWrite = false`;
* `renderOrder`;
* separação em múltiplas meshes;
* alpha test quando transparência binária basta;
* técnicas como weighted blended OIT em pipelines customizados.

A correção depende do tipo de transparência, não de uma receita universal.

---

## 13. Z-fighting

Quando duas superfícies estão quase na mesma profundidade, o depth buffer pode não ter precisão suficiente para decidir qual está na frente.

O resultado é o conhecido z-fighting: padrões que piscam ou alternam entre superfícies.

Soluções possíveis:

* separar geometricamente as superfícies;
* revisar `near` e `far` da câmera;
* usar `polygonOffset` em casos controlados;
* evitar superfícies coplanares duplicadas.

Reduzir a razão entre `far` e `near` costuma melhorar a precisão de depth.

---

## 14. Depth texture

Em vez de usar profundidade apenas internamente, você pode armazená-la em uma textura.

```javascript
const target = new THREE.WebGLRenderTarget(width, height);
target.depthTexture = new THREE.DepthTexture(width, height);
```

Essa textura pode alimentar shaders posteriores.

Isso permite efeitos como:

* fog baseada em distância;
* depth of field;
* outlines por descontinuidade;
* soft particles;
* reconstrução aproximada de posição;
* screen-space effects.

---

## 15. Depth não é distância linear pronta

O valor armazenado pelo depth buffer normalmente não cresce linearmente com a distância em uma câmera perspectiva.

Por isso, para trabalhar com distância física no shader, é comum linearizar a profundidade.

A ideia depende de `near` e `far` da câmera.

Conceitualmente:

`depth projetado → reconstrução → distância útil`

Esse detalhe explica por que simplesmente visualizar uma depth texture pode produzir um gradiente aparentemente quase todo branco ou preto.

---

## 16. Stencil buffer

O stencil buffer é uma memória por pixel usada para marcar regiões.

Ele não armazena cor nem profundidade. Armazena pequenos valores inteiros usados em testes posteriores.

A analogia mais direta é um estêncil físico: primeiro você cria a máscara; depois permite pintura apenas onde a máscara autoriza.

Usos comuns:

* portais;
* espelhos;
* máscaras complexas;
* recortes;
* outlines;
* composição regional;
* evitar desenho fora de uma área.

---

## 17. Pipeline mental do stencil

Uma técnica com stencil geralmente possui etapas:

1. limpar o stencil;
2. desenhar uma forma de máscara escrevendo um valor;
3. impedir ou limitar escrita de cor nessa etapa;
4. configurar o teste de stencil;
5. renderizar conteúdo somente onde o valor corresponde;
6. restaurar o estado normal.

Ou seja, stencil é menos um "efeito" e mais uma regra de permissão por pixel.

---

## 18. `colorWrite`, `depthWrite` e stencil podem cooperar

Uma mesh de máscara pode existir apenas para produzir dados auxiliares.

Por exemplo:

```javascript
maskMaterial.colorWrite = false;
maskMaterial.depthWrite = false;
```

Ela pode participar do stencil sem aparecer visualmente.

Esse padrão aparece em pipelines onde objetos auxiliares controlam a composição sem fazer parte da cena percebida.

---

## 19. Scissor e viewport

Nem toda composição precisa de render target.

`viewport` define em qual região do framebuffer a câmera desenha.

`scissor` limita a região onde pixels podem ser modificados.

```javascript
renderer.setViewport(x, y, width, height);
renderer.setScissor(x, y, width, height);
renderer.setScissorTest(true);
```

Isso é útil para:

* múltiplas vistas;
* editor 3D;
* comparação antes/depois;
* mini viewport;
* inspeção técnica.

É uma solução mais barata quando você só precisa dividir a tela.

---

## 20. Múltiplas câmeras

Uma cena pode ser renderizada várias vezes com câmeras diferentes.

```javascript
renderer.setViewport(0, 0, width / 2, height);
renderer.render(scene, cameraA);

renderer.setViewport(width / 2, 0, width / 2, height);
renderer.render(scene, cameraB);
```

O custo é aproximadamente o de renderizar a cena mais de uma vez, então a duplicação precisa ter uma razão visual ou funcional clara.

---

## 21. Ping-pong buffers

Alguns efeitos usam a saída de um frame ou passe como entrada do próximo.

Para evitar ler e escrever na mesma textura simultaneamente, usa-se frequentemente um par de render targets:

* target A recebe resultado atual;
* target B lê A e escreve próximo resultado;
* no passo seguinte, eles trocam de função.

Esse padrão é chamado ping-pong.

É comum em:

* blur iterativo;
* simulações em textura;
* feedback;
* fluidos;
* cellular automata;
* partículas processadas na GPU.

---

## 22. Render target também tem resolução

Um render target não precisa ter a mesma resolução da tela.

Para efeitos como blur e bloom, reduzir resolução pode economizar muito custo:

```javascript
const target = new THREE.WebGLRenderTarget(
  Math.floor(width * 0.5),
  Math.floor(height * 0.5)
);
```

Depois o resultado é ampliado na composição final.

Esse tradeoff é especialmente importante em telas de DPR alto.

---

## 23. DPR e custo quadrático

Se largura e altura duplicam, a quantidade de pixels quadruplica.

Portanto um pipeline de cinco passes fullscreen em DPR alto pode custar muito mais do que a complexidade aparente do shader sugere.

Uma política comum é limitar DPR:

```javascript
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
```

E também reduzir a resolução de passes menos sensíveis.

---

## 24. MSAA, FXAA e SMAA

Aliasing pode ser tratado em diferentes pontos do pipeline.

### MSAA

Amostra múltiplas vezes durante rasterização. Pode ser útil em render targets compatíveis, mas aumenta custo de memória e processamento.

### FXAA

É um filtro de imagem final. É barato, mas pode suavizar detalhes que não eram aliasing.

### SMAA

Usa uma análise mais estruturada de bordas e costuma preservar mais detalhe que FXAA, com custo maior.

Nenhuma técnica é universalmente melhor. A escolha depende de resolução, geometria, movimento e orçamento.

---

## 25. Tone mapping e post-processing

Tone mapping foi introduzido em [[javascript/07-threejs/18-UVs, texturas, PBR e environment maps em Three.js|UVs, texturas, PBR e environment maps]].

Quando existe post-processing, é importante decidir **em qual ponto do pipeline a imagem sai do espaço linear de trabalho e vai para exibição**.

Se cada passe fizer conversões de cor de forma inconsistente, o resultado pode sofrer:

* contraste incorreto;
* cores lavadas;
* saturação estranha;
* bloom desproporcional;
* diferenças entre render direto e composer.

Color management precisa ser pensado como parte do pipeline completo.

---

## 26. RenderPass não é obrigatório em pipelines customizados

`EffectComposer` é uma ferramenta conveniente, não a única arquitetura possível.

Em sistemas mais específicos, você pode:

1. renderizar manualmente a cena em targets;
2. trocar materiais ou layers;
3. executar shaders fullscreen;
4. compor texturas;
5. enviar apenas o resultado final para a tela.

Isso dá mais controle, mas também torna você responsável por tamanho, dispose, ordem e estado do renderer.

---

## 27. React Three Fiber e post-processing

No R3F, a biblioteca `@react-three/postprocessing` fornece uma camada declarativa sobre muitos efeitos.

Exemplo:

```jsx
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

function Effects() {
  return (
    <EffectComposer>
      <Bloom luminanceThreshold={1} intensity={0.8} />
      <Vignette eskil={false} offset={0.2} darkness={0.45} />
    </EffectComposer>
  );
}
```

O benefício é integrar o pipeline ao ciclo de vida do R3F sem recriar manualmente toda a infraestrutura.

Mas o modelo mental continua sendo o mesmo: renderização intermediária, passes e composição final.

---

## 28. RenderTexture e cenas dentro de materiais

Com Drei, `RenderTexture` permite renderizar uma cena para uma textura e usá-la em outro objeto.

Conceitualmente:

```jsx
<mesh>
  <planeGeometry />
  <meshBasicMaterial>
    <RenderTexture>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <SceneInsideTexture />
    </RenderTexture>
  </meshBasicMaterial>
</mesh>
```

Isso facilita casos como:

* tela dentro da cena;
* interface 3D;
* portal;
* monitor;
* preview de produto.

Ainda assim, cada renderização interna possui custo próprio.

---

## 29. Diagnóstico por camada

Quando um efeito visual falha, pergunte em ordem:

1. a cena base sem post-processing está correta?;
2. o target tem a resolução esperada?;
3. a textura intermediária contém a imagem certa?;
4. o depth ou stencil foi limpo e configurado corretamente?;
5. a ordem dos passes está correta?;
6. o passe está trabalhando no espaço de cor esperado?;
7. existe conversão duplicada de tone mapping?;
8. a câmera usada no passe é a correta?;
9. o custo vem da geometria ou dos pixels processados?;
10. o efeito precisa realmente existir como post-processing?

Essa sequência evita editar cinco partes do pipeline ao mesmo tempo.

---

## 30. Antipadrões comuns

### Bloom para tudo

Reduz hierarquia e cria uma imagem leitosa.

### Muitos passes fullscreen

Cada passe custa pixels, memória e largura de banda.

### Render target em resolução máxima sem necessidade

Desperdiça fill rate e memória.

### Corrigir PBR no color grading

Esconde o problema em vez de corrigir material ou iluminação.

### Usar `renderOrder` como solução universal

Pode mascarar problemas de depth, transparência ou arquitetura.

### Desabilitar depth indiscriminadamente

Quebra a leitura espacial da cena.

### Não fazer dispose de targets

Pode acumular recursos de GPU em cenas que montam e desmontam.

---

## 31. Exemplo completo em Three.js

```javascript
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 0, 6);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.IcosahedronGeometry(1.2, 4);
const material = new THREE.MeshStandardMaterial({
  color: 0x222222,
  emissive: 0xff7a55,
  emissiveIntensity: 3,
  roughness: 0.3,
  metalness: 0.15
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const key = new THREE.DirectionalLight(0xffffff, 2);
key.position.set(3, 4, 5);
scene.add(key);

scene.add(new THREE.AmbientLight(0xffffff, 0.2));

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloom = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.7,
  0.35,
  1.0
);
composer.addPass(bloom);
composer.addPass(new OutputPass());

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  composer.setSize(width, height);
}

window.addEventListener("resize", resize);

function animate(time) {
  mesh.rotation.y = time * 0.00035;
  mesh.rotation.x = time * 0.00015;

  composer.render();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

O exemplo deixa a cena base simples e usa bloom como uma etapa posterior, sem transformar o efeito em substituto do material ou da iluminação.

---

## 32. Exemplo completo em React Three Fiber

```jsx
"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";

function ObjectScene() {
  return (
    <>
      <mesh>
        <icosahedronGeometry args={[1.2, 4]} />
        <meshStandardMaterial
          color="#222222"
          emissive="#ff7a55"
          emissiveIntensity={3}
          metalness={0.15}
          roughness={0.3}
        />
      </mesh>

      <Environment preset="studio" />
    </>
  );
}

function Effects() {
  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={1}
        luminanceSmoothing={0.2}
        intensity={0.8}
      />
      <Vignette offset={0.18} darkness={0.35} />
    </EffectComposer>
  );
}

export default function Scene() {
  return (
    <Canvas
      camera={{ fov: 40, position: [0, 0, 6] }}
      dpr={[1, 2]}
    >
      <ObjectScene />
      <Effects />
    </Canvas>
  );
}
```

A separação entre cena e efeitos deixa claro que post-processing é uma camada posterior de composição.

---

## 33. Critério para escolher a ferramenta

Use renderização direta quando a cena já entrega o resultado necessário.

Use post-processing quando o efeito depende da imagem inteira ou de informação de tela.

Use render targets quando uma renderização precisa virar textura ou entrada de outra etapa.

Use depth texture quando o efeito depende de distância ou descontinuidade espacial em screen space.

Use stencil quando você precisa permitir ou bloquear renderização em regiões específicas.

Use múltiplas câmeras ou viewport quando o problema é mostrar mais de uma visão, não aplicar um filtro à mesma visão.

---

## Resumo para memorizar

Post-processing começa quando a renderização deixa de ir diretamente para a tela e passa por imagens intermediárias. `WebGLRenderTarget` transforma uma renderização em textura; `EffectComposer` organiza passes; shaders fullscreen alteram a imagem; depth registra relações de profundidade; stencil marca regiões de permissão.

A regra prática é separar responsabilidades: **cena base → buffers auxiliares → passes → composição → saída**. Antes de adicionar um efeito, confirme se o problema realmente pertence ao pós-processamento. E, em performance, lembre que muitos desses custos crescem com a quantidade de pixels processados, não apenas com a quantidade de objetos.