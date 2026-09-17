# WebGPU, TSL e próximos pipelines em Three.js

Depois de aprender a medir gargalos em [[javascript/07-threejs/22-Performance profissional, profiling e diagnóstico de gargalos em Three.js|performance profissional]], surge uma última mudança de perspectiva: **e se o próximo ganho não vier de otimizar melhor o pipeline antigo, mas de mudar a arquitetura do próprio pipeline gráfico?**

É aqui que entram WebGPU, `WebGPURenderer`, TSL, compute shaders, storage buffers e a nova composição de renderização do Three.js.

A analogia com design de produto é útil: trocar `WebGLRenderer` por `WebGPURenderer` não é como trocar uma imagem PNG por WebP. É mais parecido com migrar de um sistema de telas soltas para um design system com tokens, componentes e pipeline de build próprios. Parte do produto continua igual, mas as extensões, os pontos de customização e os limites arquiteturais mudam.

Este artigo fecha a trilha avançada conectando [[javascript/07-threejs/12-Shaders, GLSL e materiais customizados|shaders e GLSL]], [[javascript/07-threejs/19-Post-processing, render targets, depth e stencil em Three.js|post-processing]], [[javascript/07-threejs/20-Partículas, curvas, campos e geometria procedural em Three.js|sistemas procedurais]] e [[javascript/07-threejs/22-Performance profissional, profiling e diagnóstico de gargalos em Three.js|profiling]] a uma arquitetura preparada para WebGPU.

---

## 1. WebGPU não é um botão de modo turbo

A primeira ideia a descartar é:

> "Se eu trocar WebGL por WebGPU, a mesma cena automaticamente ficará muito mais rápida."

Isso pode acontecer em algum caso, mas não é o modelo mental correto.

WebGPU oferece uma API moderna para trabalhar com a GPU, com melhor modelagem de recursos, pipelines, compute e paralelismo. Porém, o desempenho final ainda depende de:

* quantidade de trabalho enviado;
* arquitetura da cena;
* shaders;
* resolução;
* uso de memória;
* transferências CPU → GPU e GPU → CPU;
* organização de passes;
* hardware e driver;
* backend realmente utilizado.

Por isso, a regra do artigo anterior continua válida:

`medir → localizar gargalo → formular hipótese → alterar → medir novamente`

WebGPU amplia o conjunto de ferramentas. Ele não substitui profiling.

---

## 2. Separe WebGPU, WebGPURenderer, TSL e WGSL

Esses nomes aparecem juntos, mas representam camadas diferentes.

### WebGPU

WebGPU é a API gráfica e de computação moderna exposta pelo navegador. Ela fica abaixo do Three.js.

É a camada que lida conceitualmente com coisas como:

* buffers;
* texturas;
* pipelines;
* bind groups;
* render passes;
* compute passes;
* comandos enviados à GPU.

### WebGPURenderer

`WebGPURenderer` é a abstração do Three.js sobre uma arquitetura de renderer capaz de trabalhar com diferentes backends.

No comportamento atual do Three.js, ele tenta usar WebGPU quando disponível e pode cair para um backend WebGL 2 quando WebGPU não está disponível.

Isso significa que `WebGPURenderer` não deve ser lido simplesmente como "renderer que sempre está em WebGPU".

### TSL

TSL, Three.js Shading Language, é a camada declarativa de nós para construir lógica de shader e de pipeline em JavaScript.

Ela permite que você descreva operações uma vez e deixe o sistema gerar código adequado ao backend.

Em vez de pensar apenas em:

`JavaScript → string GLSL`

passamos a ter:

`JavaScript → grafo de nós TSL → backend → WGSL ou GLSL`

### WGSL

WGSL é a linguagem de shaders associada ao WebGPU.

Ela ocupa uma camada mais baixa que TSL. Se você escreve lógica específica em WGSL, ganha controle, mas também aumenta o acoplamento ao backend WebGPU.

A regra prática é:

* use TSL quando quiser permanecer dentro da abstração do Three.js e preservar portabilidade entre backends;
* use recursos específicos de WebGPU quando o problema realmente exigir compute, storage ou outra capacidade que não existe de forma equivalente no backend WebGL 2;
* desça para WGSL específico apenas quando houver uma razão técnica clara.

---

## 3. O ponto de entrada muda

Para trabalhar com a nova arquitetura, o Three.js usa um entry point diferente:

```javascript
import * as THREE from "three/webgpu";
```

TSL é importado separadamente:

```javascript
import { color, positionLocal, sin, time, vec3 } from "three/tsl";
```

Isso é importante porque materiais de nós e classes ligadas ao novo renderer não pertencem ao mesmo conjunto de exports usado historicamente por:

```javascript
import * as THREE from "three";
```

Ao migrar um projeto, trate a troca de entry point como uma mudança arquitetural que merece uma etapa própria de teste.

---

## 4. Inicialização pode ser assíncrona

Com `WebGLRenderer`, é comum criar o renderer e começar a desenhar imediatamente.

A arquitetura de `WebGPURenderer` precisa considerar inicialização assíncrona.

Uma forma explícita é:

```javascript
const renderer = new THREE.WebGPURenderer({ antialias: true });

await renderer.init();

renderer.render(scene, camera);
```

Em aplicações com loop contínuo, o padrão recomendado pelo Three.js é usar `setAnimationLoop()`, que coordena essa inicialização antes dos frames de renderização.

```javascript
renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
});
```

O ponto conceitual é importante: **o renderer deixa de ser apenas um objeto síncrono criado no início do arquivo e passa a representar uma infraestrutura que pode precisar preparar backend, pipelines e recursos antes de desenhar**.

---

## 5. Fallback não significa equivalência total de recursos

`WebGPURenderer` pode usar WebGPU ou cair para WebGL 2.

Isso é excelente para compatibilidade, mas cria uma distinção importante entre dois tipos de recurso.

### Recursos portáveis entre backends

Materiais de nós e muita lógica TSL podem ser compilados para o backend disponível.

Nesse caso, a aplicação pode compartilhar a mesma descrição de alto nível.

### Recursos que exigem WebGPU real

Algumas operações dependem explicitamente do backend WebGPU, por exemplo determinadas operações de compute, storage textures, workgroup memory e outras funcionalidades específicas.

Então esta lógica é incorreta:

```text
Uso WebGPURenderer
→ logo todo recurso WebGPU está disponível
```

A leitura correta é:

```text
Uso WebGPURenderer
→ o renderer escolhe um backend
→ recursos portáveis continuam funcionando
→ recursos específicos precisam validar a capacidade real do backend
```

Se o produto depende obrigatoriamente de WebGPU, o Three.js oferece um teste de capacidade:

```javascript
import WebGPU from "three/addons/capabilities/WebGPU.js";

if (!WebGPU.isAvailable()) {
  document.body.appendChild(WebGPU.getErrorMessage());
}
```

Se a aplicação funciona bem no backend WebGL 2, você pode preferir fallback em vez de bloquear o acesso.

---

## 6. TSL muda a forma de pensar shader customizado

No pipeline clássico, uma customização costuma começar com uma string GLSL:

```javascript
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader
});
```

Ou com alterações em um material existente via `onBeforeCompile()`.

Na nova arquitetura, a direção principal é usar Node Materials e TSL.

Um material básico de nós pode ser criado assim:

```javascript
const material = new THREE.MeshStandardNodeMaterial({
  roughness: 0.4,
  metalness: 0.1
});

material.colorNode = color(0x7c3aed);
```

O material continua sendo um objeto Three.js, mas propriedades específicas podem ser substituídas por grafos de nós.

---

## 7. Um shader vira composição de valores

Considere uma deformação vertical simples.

Em TSL:

```javascript
const wave = sin(
  positionLocal.x.mul(3).add(time.mul(2))
).mul(0.12);

material.positionNode = positionLocal.add(
  vec3(0, wave, 0)
);
```

A ideia é parecida com montar uma árvore de operações:

```text
posição local
→ pega x
→ multiplica frequência
→ soma tempo
→ aplica seno
→ multiplica amplitude
→ adiciona no eixo y
```

Você está construindo um grafo computacional, não concatenando uma string de código.

Essa diferença é central porque o Three.js pode analisar esse grafo e gerar a implementação apropriada para o backend.

---

## 8. TSL não é JavaScript executado por vértice

A sintaxe lembra JavaScript, mas o modelo de execução é diferente.

Quando você escreve:

```javascript
positionLocal.x.mul(3)
```

não significa que o navegador executará esse cálculo em JavaScript para cada vértice.

Você está descrevendo uma operação que será transformada em código de shader.

A comparação correta é:

* JavaScript normal: executa agora na CPU;
* TSL: descreve um programa que será compilado para execução no pipeline gráfico.

É semelhante a uma ferramenta de design que salva constraints em vez de calcular manualmente cada posição final de cada elemento enquanto você edita.

---

## 9. ShaderMaterial não migra por copiar e colar

A migração de `ShaderMaterial`, `RawShaderMaterial` ou customizações complexas de `onBeforeCompile()` precisa ser tratada como reescrita de intenção, não de sintaxe.

Pergunte primeiro:

* qual entrada o shader usa?
* qual propriedade visual ele produz?
* ele altera posição, normal, cor ou iluminação?
* ele depende de textura?
* ele depende de dados por instância?
* ele executa lógica que deveria virar compute?

Depois reconstrua essa intenção em TSL.

O antipadrão é tentar fazer uma tradução linha a linha de GLSL para nós sem rever a arquitetura.

---

## 10. TSL pode ser uma ponte, não apenas um recurso WebGPU

Uma vantagem importante da arquitetura é separar a definição de shader do backend final.

O mesmo grafo TSL pode, quando os recursos usados forem compatíveis, ser transformado em código adequado ao backend selecionado pelo renderer.

Isso ajuda a evitar duas implementações paralelas:

```text
shader GLSL para WebGL
+
shader WGSL para WebGPU
```

Mas a portabilidade termina quando você usa uma operação que só existe no backend WebGPU.

Então pense em três camadas:

1. lógica TSL portátil;
2. extensões específicas do renderer;
3. capacidades exclusivas de WebGPU.

---

## 11. Compute muda onde uma simulação pode viver

Nos sistemas procedurais do artigo 20, vimos a pergunta:

> atualizo esse sistema na CPU ou na GPU?

WebGPU torna essa pergunta ainda mais importante porque compute shaders permitem executar trabalho geral altamente paralelo na GPU sem precisar disfarçar a computação como um passo de renderização.

O modelo mental é:

```text
CPU cria recursos e agenda trabalho
→ compute shader processa muitos elementos em paralelo
→ resultado permanece em buffers da GPU
→ renderização consome esses buffers
```

O ganho arquitetural aparece quando você evita o ciclo:

```text
CPU calcula milhares de valores
→ envia tudo para a GPU
→ GPU desenha
→ repete no próximo frame
```

---

## 12. Storage buffers mantêm dados perto de quem os usa

Uma estrutura típica usa storage buffers para permitir que compute escreva dados que depois serão consumidos pela renderização.

O Three.js fornece abstrações como `StorageBufferNode` e helpers como `instancedArray()`.

Um exemplo mínimo de inicialização em compute é:

```javascript
import {
  Fn,
  instanceIndex,
  instancedArray,
  vec3
} from "three/tsl";

const particleCount = 10000;
const positions = instancedArray(particleCount, "vec3");

const initialize = Fn(() => {
  const position = positions.element(instanceIndex);
  position.assign(vec3(0, 0, 0));
})().compute(particleCount);

await renderer.computeAsync(initialize);
```

Depois, esse buffer pode alimentar um material de nós sem precisar ser reconstruído em JavaScript a cada frame.

```javascript
const particleMaterial = new THREE.SpriteNodeMaterial();
particleMaterial.positionNode = positions.toAttribute();
```

A ideia principal é **evitar que a CPU funcione como mensageiro de dados que já poderiam nascer, mudar e ser consumidos na GPU**.

---

## 13. Compute não elimina custo de memória

Mover trabalho para a GPU não torna o custo zero.

Ainda existem perguntas de arquitetura:

* quantos elementos existem?
* qual o tamanho de cada elemento?
* quantos buffers são mantidos?
* eles são lidos e escritos em todos os frames?
* existe ping-pong entre buffers?
* a simulação usa muita memória temporária?
* há sincronizações desnecessárias?

Compute resolve um tipo de gargalo. Não substitui o orçamento de memória nem o profiling.

---

## 14. Readback GPU → CPU é uma fronteira cara

Um erro comum é executar o cálculo na GPU e imediatamente pedir o resultado de volta para JavaScript.

A arquitetura dispõe de mecanismos de readback, mas esse caminho pode exigir sincronização entre GPU e CPU.

Se o resultado só será usado para desenhar, prefira deixá-lo na GPU.

Pergunte:

> Eu realmente preciso que a CPU conheça cada valor calculado pela GPU?

Em uma simulação de 500 mil partículas, a resposta normalmente é não.

A CPU pode precisar saber apenas estado de alto nível, como:

* modo da simulação;
* parâmetros globais;
* seleção do usuário;
* seed;
* tempo;
* limites.

---

## 15. Post-processing também muda de arquitetura

No pipeline clássico de [[javascript/07-threejs/19-Post-processing, render targets, depth e stencil em Three.js|post-processing]], usamos `EffectComposer` e uma sequência de passes.

Esse sistema pertence ao pipeline de `WebGLRenderer`.

Na arquitetura atual de `WebGPURenderer`, o Three.js usa `RenderPipeline` e nós de composição.

Um exemplo mínimo:

```javascript
import { bloom, pass } from "three/tsl";

const renderPipeline = new THREE.RenderPipeline(renderer);
const scenePass = pass(scene, camera);
const sceneColor = scenePass.getTextureNode("output");
const bloomPass = bloom(sceneColor);

renderPipeline.outputNode = sceneColor.add(bloomPass);
```

No loop, quem passa a controlar a saída composta é o pipeline:

```javascript
renderer.setAnimationLoop(() => {
  renderPipeline.render();
});
```

Isso transforma pós-processamento em uma composição de nós integrada ao pipeline em vez de uma coleção isolada de classes que trocam buffers entre si.

---

## 16. RenderPipeline substitui a API antiga de PostProcessing

Em versões recentes do Three.js, a classe `PostProcessing` foi renomeada para `RenderPipeline` e permanece apenas como compatibilidade temporária.

Para código novo, prefira:

```javascript
const renderPipeline = new THREE.RenderPipeline(renderer);
```

Em vez de estruturar material novo ao redor de uma API já marcada para remoção.

Essa é uma boa regra geral em migrações de infraestrutura: **não apenas fazer o projeto funcionar hoje, mas evitar começar uma arquitetura nova em cima de uma camada que já está sendo retirada**.

---

## 17. MRT deixa de ser apenas detalhe de render target

Multiple Render Targets, MRT, permitem produzir múltiplas saídas em uma passagem.

Isso pode ser útil para efeitos que precisam de informações como:

* cor;
* emissivo;
* normal;
* profundidade;
* máscaras auxiliares.

Na nova arquitetura, TSL e os nós de pass conseguem compor essas saídas explicitamente.

Isso conecta diretamente o conhecimento de [[javascript/07-threejs/19-Post-processing, render targets, depth e stencil em Three.js|buffers auxiliares]] a um pipeline mais declarativo.

A pergunta deixa de ser apenas:

> Qual render target eu crio?

E passa a ser:

> Quais dados intermediários minha composição realmente precisa produzir e reutilizar?

---

## 18. WebGPU pode reduzir trabalho redundante, mas só quando a arquitetura permite

A nova arquitetura abre espaço para recursos como:

* compute;
* storage buffers;
* pipelines mais explícitos;
* render bundles em casos apropriados;
* composição de shaders por nós;
* menos dependência de uploads constantes da CPU.

Mas a decisão continua dependente de medição.

Se sua cena tem 20 objetos simples e zero gargalo, reescrever tudo em compute não é avanço técnico. É complexidade adicional.

Use o artigo 22 como filtro:

```text
há um gargalo medido?
→ qual parte domina o frame?
→ a nova arquitetura remove ou reduz esse custo?
→ o ganho compensa a complexidade?
```

---

## 19. forceWebGL é útil para testar portabilidade

`WebGPURenderer` aceita a opção `forceWebGL`.

```javascript
const renderer = new THREE.WebGPURenderer({
  antialias: true,
  forceWebGL: true
});
```

Isso é útil para verificar se uma cena baseada na nova arquitetura continua funcionando no backend WebGL 2.

Mas não confunda esse teste com um teste de WebGPU real.

Se a aplicação usa compute ou outro recurso exclusivo do backend WebGPU, `forceWebGL: true` não valida esse caminho.

---

## 20. Estratégia de migração segura

Uma migração previsível pode ser dividida assim.

### Etapa 1: congele uma baseline

Registre:

* frame time;
* resolução e DPR;
* hardware de teste;
* draw calls;
* triângulos;
* memória aproximada;
* recursos visuais ativos.

Sem baseline, você não saberá se a migração melhorou alguma coisa.

### Etapa 2: troque o renderer sem adicionar novidade visual

Primeiro tente reproduzir a mesma cena.

Não misture:

* novo renderer;
* novo material;
* novo post-processing;
* nova simulação;
* novo asset.

Tudo na mesma alteração.

### Etapa 3: migre shaders customizados para TSL

Comece pelos shaders menores e mais isolados.

### Etapa 4: migre pós-processamento

Troque a arquitetura `EffectComposer` pelo pipeline de nós apenas depois da cena base estar correta.

### Etapa 5: adicione compute onde houver benefício medido

Partículas, simulações, geração de dados e deformações massivas são candidatos naturais.

### Etapa 6: compare novamente

A pergunta final não é "funcionou?".

É:

> O pipeline novo melhorou custo, legibilidade, capacidade ou manutenção de forma suficiente para justificar a migração?

---

## 21. Compatibilidade deve ser uma decisão de produto

Você pode organizar o suporte de três formas.

### Fallback transparente

Usa `WebGPURenderer` e aceita WebGL 2 quando WebGPU não existe.

Bom quando os recursos utilizados são portáveis.

### Feature enhancement

A experiência base funciona no fallback, mas recursos avançados aparecem apenas com WebGPU.

Exemplo:

* modo básico: animação tradicional;
* modo avançado: simulação compute com centenas de milhares de partículas.

### WebGPU obrigatório

Faz sentido quando o produto depende estruturalmente de compute ou outra capacidade exclusiva.

Nesse caso, detecte suporte e apresente uma mensagem de fallback de produto, não apenas um erro técnico no console.

---

## 22. React Three Fiber também pode usar WebGPURenderer

O `<Canvas>` do React Three Fiber aceita uma função assíncrona em `gl`.

Isso permite inicializar `WebGPURenderer` antes de entregá-lo ao reconciler.

```jsx
<Canvas
  gl={async (props) => {
    const renderer = new THREE.WebGPURenderer(props);
    await renderer.init();
    return renderer;
  }}
>
  {/* cena */}
</Canvas>
```

Ao usar o entry point `three/webgpu`, o padrão documentado pelo R3F também registra esse namespace com `extend()`.

```javascript
import * as THREE from "three/webgpu";
import { Canvas, extend } from "@react-three/fiber";

extend(THREE);
```

A arquitetura React não elimina os conceitos desta fase. Ela apenas muda quem instancia e coordena os objetos.

---

## 23. TSL continua sendo estado gráfico, não estado React

Mesmo em R3F, evite transformar valores atualizados a cada frame em state React sem necessidade.

Esta separação continua válida:

```text
React
→ estrutura, produto, estado semântico

Three.js / TSL
→ materiais, buffers, uniforms, pipeline gráfico

GPU
→ execução paralela por vértice, fragmento ou compute
```

Se um valor muda milhares de vezes por segundo dentro de um shader, ele não precisa atravessar React a cada alteração.

---

## 24. Antipadrões de migração

### Migrar porque WebGPU parece mais moderno

Tecnologia nova não substitui um problema claro.

### Reescrever shader linha por linha

TSL pede reconstrução da intenção do shader, não tradução mecânica de sintaxe.

### Presumir que fallback suporta compute

O renderer pode cair para WebGL 2, mas recursos específicos do backend WebGPU continuam específicos.

### Fazer readback em todo frame

Você perde parte da vantagem de manter o cálculo e os dados na GPU.

### Trocar renderer, material e pós-processamento ao mesmo tempo

Se algo quebra, você não sabe em qual fronteira procurar.

### Usar compute para sistemas pequenos

Para dezenas de elementos, a simplicidade da CPU pode continuar superior.

### Abandonar profiling depois da migração

WebGPU muda a infraestrutura, não a necessidade de medir.

---

## 25. Checklist de decisão

Antes de migrar uma cena, responda:

* o pipeline atual possui um gargalo medido?
* esse gargalo é CPU, GPU, memória ou comunicação entre CPU e GPU?
* TSL melhora manutenção de shaders customizados?
* a cena depende de `ShaderMaterial`, `RawShaderMaterial` ou `onBeforeCompile()`?
* o post-processing atual depende de `EffectComposer`?
* existe um sistema massivo que poderia permanecer integralmente na GPU?
* a aplicação precisa funcionar sem WebGPU?
* o fallback WebGL 2 oferece a experiência mínima necessária?
* algum recurso exige backend WebGPU de verdade?
* a migração será feita por camadas isoladas?
* existe baseline para comparar antes e depois?

Se essas respostas não estiverem claras, a arquitetura ainda não está pronta para migração.

---

## 26. Exemplo completo em Three.js

O exemplo abaixo usa `WebGPURenderer` e TSL para criar uma superfície cujo próprio vertex pipeline gera uma onda.

```javascript
import * as THREE from "three/webgpu";
import {
  color,
  positionLocal,
  sin,
  time,
  vec3
} from "three/tsl";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101014);

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 0, 4);

const renderer = new THREE.WebGPURenderer({
  antialias: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(3, 2, 64, 64);

const material = new THREE.MeshStandardNodeMaterial({
  roughness: 0.35,
  metalness: 0.05,
  side: THREE.DoubleSide
});

material.colorNode = color(0x7c3aed);

const wave = sin(
  positionLocal.x.mul(3).add(time.mul(2))
).mul(0.18);

material.positionNode = positionLocal.add(
  vec3(0, 0, wave)
);

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(2, 3, 4);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 0.4));

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.setAnimationLoop(() => {
  plane.rotation.y += 0.002;
  renderer.render(scene, camera);
});
```

O ponto mais importante do exemplo não é o efeito da onda. É perceber que a deformação é descrita em TSL e executada no pipeline gráfico, sem atualizar a posição de cada vértice manualmente em JavaScript.

---

## 27. Exemplo completo em React Three Fiber

```jsx
import { useMemo } from "react";
import * as THREE from "three/webgpu";
import {
  color,
  positionLocal,
  sin,
  time,
  vec3
} from "three/tsl";
import {
  Canvas,
  extend
} from "@react-three/fiber";

extend(THREE);

function WavyCard() {
  const colorNode = useMemo(
    () => color(0x7c3aed),
    []
  );

  const positionNode = useMemo(() => {
    const wave = sin(
      positionLocal.x.mul(3).add(time.mul(2))
    ).mul(0.15);

    return positionLocal.add(
      vec3(0, 0, wave)
    );
  }, []);

  return (
    <mesh>
      <planeGeometry args={[3, 2, 64, 64]} />
      <meshStandardNodeMaterial
        colorNode={colorNode}
        positionNode={positionNode}
        roughness={0.35}
        metalness={0.05}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      gl={async (props) => {
        const renderer = new THREE.WebGPURenderer({
          ...props,
          antialias: true
        });

        await renderer.init();
        return renderer;
      }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[2, 3, 4]}
        intensity={3}
      />
      <WavyCard />
    </Canvas>
  );
}
```

A responsabilidade permanece separada:

* React organiza a cena;
* R3F coordena o lifecycle;
* Three.js descreve recursos gráficos;
* TSL descreve o shader;
* o backend executa o trabalho na GPU.

---

## 28. Como esta fase fecha a trilha avançada

As fases anteriores construíram uma sequência:

```text
espaço
→ geometria
→ escala
→ shaders
→ câmera
→ animação
→ oclusão
→ arquitetura R3F
→ assets
→ superfície
→ composição
→ procedural
→ interação
→ profiling
→ pipeline gráfico moderno
```

WebGPU só faz sentido aqui porque as caixas anteriores já foram abertas.

Sem entender draw calls, buffers, shaders, render targets, GPU, frame time e transferências de dados, WebGPU vira apenas uma nova lista de APIs para decorar.

Com esses conceitos consolidados, ele passa a ser uma evolução coerente da arquitetura.

---

## Fontes principais

* [Three.js WebGPURenderer](https://threejs.org/docs/pages/WebGPURenderer.html)
* [Three.js manual: WebGPURenderer](https://threejs.org/manual/#en/webgpurenderer)
* [Three.js TSL](https://threejs.org/docs/pages/TSL.html)
* [Three.js RenderPipeline](https://threejs.org/docs/pages/RenderPipeline.html)
* [Three.js PassNode](https://threejs.org/docs/pages/PassNode.html)
* [Three.js StorageBufferNode](https://threejs.org/docs/pages/StorageBufferNode.html)
* [Three.js StorageBufferAttribute](https://threejs.org/docs/pages/StorageBufferAttribute.html)
* [Three.js WebGPU capability helper](https://threejs.org/docs/pages/WebGPU.html)
* [Three.js WebGPU compute examples](https://threejs.org/examples/?q=webgpu_compute)
* [React Three Fiber Canvas: WebGPU](https://r3f.docs.pmnd.rs/api/canvas)

---

## Resumo para memorizar

WebGPU não deve ser memorizado como "WebGL mais rápido". Ele representa uma arquitetura gráfica moderna, com pipelines e compute mais explícitos. No Three.js, `WebGPURenderer` abstrai essa arquitetura e pode escolher WebGPU ou um backend WebGL 2; TSL descreve lógica de shader em um grafo de nós que pode gerar código para o backend apropriado; WGSL é a linguagem de shader específica de WebGPU.

A migração profissional não é `WebGLRenderer → WebGPURenderer` em uma linha. Ela exige separar renderer, shaders customizados, pós-processamento, recursos específicos de backend e compatibilidade. `ShaderMaterial`, `RawShaderMaterial`, `onBeforeCompile()` e `EffectComposer` não devem ser tratados como peças que simplesmente continuam iguais no novo pipeline: a intenção precisa ser reconstruída com Node Materials, TSL e `RenderPipeline`.

Compute e storage buffers são especialmente importantes quando grandes conjuntos de dados podem nascer, mudar e ser consumidos na GPU sem atravessar JavaScript em todos os frames. Porém, readback, memória, resolução e sincronização continuam tendo custo. A regra final da trilha permanece a mesma: **entenda o pipeline, meça o gargalo e só então escolha a abstração mais adequada**.