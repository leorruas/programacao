# UVs, texturas, PBR e environment maps em Three.js

Depois de aprender a construir ou carregar uma geometria, surge uma pergunta diferente: **como essa forma passa a parecer madeira, metal, plástico, vidro, tecido ou uma superfície gráfica específica?**

A resposta não está em uma única propriedade. A aparência final nasce da relação entre coordenadas UV, texturas, material, iluminação, ambiente e gerenciamento de cor.

Uma analogia útil com design de produto é pensar que a geometria é o molde físico, o UV é o gabarito de corte, a textura é a impressão aplicada ao material e a iluminação é o contexto onde esse objeto será fotografado. Uma superfície pode estar tecnicamente correta em uma dessas camadas e ainda parecer errada porque outra camada foi preparada de forma incompatível.

Este artigo aprofunda [[javascript/07-threejs/03-Geometria, material, mesh e luz|geometria, material, mesh e luz]], [[javascript/07-threejs/12-Shaders, GLSL e materiais customizados|shaders e materiais customizados]] e [[javascript/07-threejs/17-glTF e pipeline Blender para Three.js|glTF e pipeline Blender para Three.js]].

---

## 1. O pipeline mental de uma superfície

Uma superfície PBR pode ser lida como uma cadeia:

`geometria → UV → textura → material → iluminação → renderer → pixels`

Cada parte responde a uma pergunta diferente:

* geometria: qual é a forma real?;
* UV: onde cada ponto da superfície cai dentro de uma imagem 2D?;
* textura: quais dados variam ao longo da superfície?;
* material: como esses dados participam do modelo de iluminação?;
* iluminação e environment map: que luz chega à superfície?;
* renderer: como o resultado linear é convertido para exibição.

Essa separação é importante para diagnóstico. Uma costura visível pode ser UV. Um metal opaco pode ser falta de environment map. Uma cor lavada pode ser `colorSpace` incorreto. Um relevo fraco pode ser `normalScale`, não geometria.

---

## 2. UV é a ponte entre 3D e 2D

UVs são coordenadas bidimensionais associadas aos vértices da geometria.

Enquanto `x`, `y` e `z` dizem onde o vértice está no espaço 3D, `u` e `v` dizem onde esse ponto consulta uma textura 2D.

Uma textura usa normalmente o domínio:

```text
u: 0 → 1
v: 0 → 1
```

A analogia mais direta é desmontar uma caixa de papelão até transformá-la em uma planificação. A caixa é 3D. A planificação é o espaço onde uma arte gráfica pode ser posicionada.

No Three.js, uma geometria pode possuir o atributo:

```javascript
console.log(geometry.attributes.uv);
```

Sem UVs adequados, uma textura baseada em UV não sabe como se distribuir pela superfície.

---

## 3. O que significa fazer unwrap

Fazer *UV unwrap* é decidir como uma superfície tridimensional será aberta e organizada em um plano.

Essa operação envolve escolhas visuais:

* onde colocar cortes;
* onde aceitar costuras;
* quanto espaço cada parte recebe;
* quais ilhas precisam manter orientação;
* quais áreas podem compartilhar textura;
* quais partes precisam de maior densidade de pixels.

Um unwrap ruim pode gerar:

* distorção;
* padrões esticados;
* diferenças de resolução entre partes;
* costuras em locais muito visíveis;
* desperdício de espaço na textura.

Por isso UV não é apenas um detalhe técnico da exportação. É parte da direção visual do asset.

---

## 4. Texel density

*Texel density* descreve quanto detalhe de textura uma determinada área da superfície recebe.

Se duas partes de um produto têm área visual semelhante, mas uma ocupa quatro vezes mais espaço no UV, ela receberá muito mais resolução da mesma textura.

Isso pode criar uma inconsistência perceptível: um lado parece extremamente nítido e outro parece borrado.

A pergunta prática não é "qual resolução máxima eu consigo usar?". É:

**quantos pixels essa superfície realmente precisa na tela?**

Essa lógica conecta diretamente qualidade visual e orçamento de memória.

---

## 5. Textura de cor não é a mesma coisa que textura de dados

Algumas texturas representam cores destinadas ao olho humano. Outras representam números que serão usados em cálculos.

Exemplos de **texturas de cor**:

* `map` / base color;
* `emissiveMap`;
* mapas de cor especular quando usados por materiais compatíveis.

Exemplos de **texturas de dados**:

* `normalMap`;
* `roughnessMap`;
* `metalnessMap`;
* `aoMap`;
* `displacementMap`;
* `alphaMap`.

Essa diferença é central para color management.

---

## 6. `colorSpace` precisa representar o significado da textura

No Three.js moderno, texturas que contêm cor normalmente precisam ser anotadas com o espaço de cor correspondente.

Para uma textura de base color comum:

```javascript
const colorMap = textureLoader.load("/textures/base-color.webp");
colorMap.colorSpace = THREE.SRGBColorSpace;
```

Para uma textura de roughness:

```javascript
const roughnessMap = textureLoader.load("/textures/roughness.webp");
roughnessMap.colorSpace = THREE.NoColorSpace;
```

A regra mental é:

* dados de cor para visualização: geralmente `SRGBColorSpace`;
* dados usados como valores físicos ou vetoriais: `NoColorSpace`;
* mapas HDR de iluminação: normalmente dados lineares, tratados pelo pipeline de ambiente.

Aplicar sRGB a um normal map ou roughness map altera os números antes do cálculo e muda o material de forma incorreta.

---

## 7. `MeshStandardMaterial` e o modelo metallic-roughness

`MeshStandardMaterial` implementa um fluxo PBR baseado principalmente em *metalness* e *roughness*.

```javascript
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 0.2,
  roughness: 0.55
});
```

A intenção do PBR é reduzir ajustes arbitrários e aproximar o comportamento da superfície de regras consistentes de interação com a luz.

Dois controles são especialmente importantes:

* `metalness`: define se a superfície se comporta mais como dielétrico ou metal;
* `roughness`: define o quanto a reflexão é espalhada pela microestrutura da superfície.

Um metal polido e um metal escovado podem compartilhar metalness alto, mas ter roughness muito diferente.

---

## 8. Metalness não é um slider de brilho

Esse é um erro conceitual comum.

Um material mais metálico não significa simplesmente "mais brilhante".

Metais e não-metais refletem luz de formas diferentes. No fluxo metallic-roughness, materiais como madeira, papel, plástico e pedra normalmente ficam próximos de `metalness = 0`. Metais expostos ficam próximos de `1`.

Valores intermediários fazem sentido em superfícies mistas, como tinta descascada, ferrugem, sujeira ou transições controladas por mapa.

O controle de aparência polida ou fosca está principalmente em `roughness`.

---

## 9. Roughness controla a largura da reflexão

Com roughness baixa, reflexos ficam mais definidos.

Com roughness alta, a energia refletida é espalhada em uma região maior e a superfície parece mais fosca.

```javascript
material.roughness = 0.15;
```

não transforma automaticamente a superfície em algo convincente. Se não existir informação útil no ambiente para refletir, a diferença pode ser pequena.

É por isso que materiais PBR e environment maps estão fortemente ligados.

---

## 10. Mapas PBR principais

Um material pode combinar vários mapas.

```javascript
const material = new THREE.MeshStandardMaterial({
  map: colorMap,
  normalMap,
  roughnessMap,
  metalnessMap,
  aoMap
});
```

Cada mapa altera uma dimensão diferente da superfície.

### `map`

Base color ou albedo visual da superfície.

### `normalMap`

Perturba a normal usada no cálculo de iluminação sem alterar a silhueta real da geometria.

### `roughnessMap`

Controla roughness por pixel.

### `metalnessMap`

Controla metalness por pixel.

### `aoMap`

Representa ambient occlusion pré-calculada, reforçando regiões menos expostas à iluminação ambiente.

### `displacementMap`

Move vértices de verdade. Diferente de normal map, pode alterar silhueta e sombra, mas só existe detalhe geométrico suficiente se a malha tiver subdivisões compatíveis.

---

## 11. Normal map não cria geometria

Um normal map altera o vetor normal usado pela iluminação.

Isso cria a impressão de relevos pequenos, mas não muda a posição real dos vértices.

Portanto:

* ele não altera a silhueta;
* ele não cria volume físico;
* o efeito depende da luz e do ponto de vista;
* detalhes muito profundos podem parecer falsos.

```javascript
material.normalMap = normalMap;
material.normalScale.set(0.7, 0.7);
```

Quando o normal map foi produzido com convenção incompatível de handedness, pode ser necessário inverter o componente Y via `normalScale`.

---

## 12. Ambient occlusion e múltiplos canais UV

`aoMap` é um caso importante porque pode depender de um segundo conjunto de UVs.

Uma geometria pode manter mais de um atributo UV:

```javascript
geometry.setAttribute("uv1", geometry.attributes.uv.clone());
aoMap.channel = 1;
```

Em um asset de produção, o segundo conjunto pode ter um unwrap específico para lightmaps ou ambient occlusion em vez de simplesmente duplicar o primeiro.

O ponto importante é separar a imagem do canal UV usado para consultá-la.

---

## 13. Channel packing

Nem todo mapa precisa ocupar uma imagem RGB separada.

Pipelines PBR frequentemente empacotam dados escalares em canais diferentes de uma mesma textura.

Um padrão comum em glTF é o conjunto ORM:

* R: occlusion;
* G: roughness;
* B: metallic.

O Three.js também consulta canais específicos nos mapas correspondentes. Isso permite reutilizar uma mesma textura como fonte para mais de uma propriedade do material quando o pipeline foi preparado dessa forma.

A vantagem é reduzir arquivos e amostragens desnecessárias. A desvantagem é aumentar a dependência de um pipeline bem documentado.

---

## 14. Repetição, rotação e deslocamento da textura

Uma textura possui transformações próprias.

```javascript
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(4, 4);
texture.offset.set(0.1, 0);
texture.center.set(0.5, 0.5);
texture.rotation = Math.PI / 4;
```

Essas operações não movem a geometria. Elas mudam como as coordenadas UV são transformadas antes da amostragem.

Isso é útil para materiais tileable, padrões gráficos e prototipação rápida, mas não substitui um unwrap coerente quando o objeto exige posicionamento específico de arte.

---

## 15. Mipmaps e filtragem

Quando uma textura ocupa poucos pixels na tela, ler diretamente a resolução original pode causar aliasing e cintilação.

Mipmaps são versões progressivamente menores da mesma textura usadas conforme a distância e o tamanho projetado.

O Three.js usa filtros apropriados por padrão para muitos casos, mas vale entender os controles:

```javascript
texture.minFilter = THREE.LinearMipmapLinearFilter;
texture.magFilter = THREE.LinearFilter;
```

A ideia é semelhante a um sistema responsivo de imagens: não faz sentido usar toda a informação de uma imagem 4K para representar um objeto que ocupa 30 pixels.

---

## 16. Anisotropy

Superfícies vistas em ângulos rasantes podem ficar borradas mesmo com mipmaps.

Anisotropic filtering aumenta a qualidade de amostragem nessas situações.

```javascript
texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
```

Mais anisotropy significa mais amostras e maior custo. Não é necessário maximizar em toda textura indiscriminadamente.

Use em superfícies onde a diferença visual realmente aparece, como pisos, mesas, pistas e planos extensos.

---

## 17. Resolução da textura e memória de GPU

O peso do arquivo comprimido no download não é igual ao custo da textura depois de decodificada na GPU.

Uma imagem altamente comprimida pode ocupar pouco na rede e ainda expandir para dezenas de megabytes em memória.

Uma aproximação simples para uma textura RGBA sem compressão é:

`largura × altura × 4 bytes`

Uma textura 4096 × 4096 ultrapassa 64 MB apenas no nível principal, antes de considerar mipmaps e outras cópias possíveis.

Por isso a pergunta correta é sempre contextual:

* qual o tamanho projetado do objeto?;
* quão perto a câmera chega?;
* existe mobile como alvo?;
* quantas texturas semelhantes ficam residentes?;
* KTX2 ou outra compressão GPU faz sentido?

O pipeline de compressão foi introduzido em [[javascript/07-threejs/17-glTF e pipeline Blender para Three.js|glTF e pipeline Blender para Three.js]].

---

## 18. Environment map é iluminação, não decoração

Em materiais PBR, o ambiente participa diretamente do cálculo de reflexão e iluminação indireta.

Um objeto metálico sem um ambiente rico pode parecer escuro ou sem informação porque quase toda sua aparência depende do que existe para refletir.

No Three.js, a cena pode receber uma textura de ambiente:

```javascript
scene.environment = environmentTexture;
```

O background é uma decisão separada:

```javascript
scene.background = environmentTexture;
```

Você pode iluminar com um environment map sem necessariamente mostrar a imagem como fundo.

---

## 19. HDR e alcance dinâmico

Uma imagem HDR pode armazenar intensidades acima do intervalo de uma imagem comum de 8 bits.

Isso é importante para iluminação porque uma janela, softbox ou sol pode ser muito mais intenso do que o restante do ambiente.

Com `RGBELoader`:

```javascript
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

const environment = await new RGBELoader().loadAsync("/hdr/studio.hdr");
environment.mapping = THREE.EquirectangularReflectionMapping;
scene.environment = environment;
```

Um environment map não substitui automaticamente todas as luzes. Ele fornece iluminação baseada em imagem e reflexos. Luzes direcionais ou pontuais ainda podem ser úteis para direção, contraste e sombras dinâmicas.

---

## 20. PMREM e roughness

Materiais PBR precisam consultar versões do ambiente com diferentes níveis de desfoque conforme a roughness.

É justamente essa necessidade que motiva o uso de prefiltered environment maps.

`PMREMGenerator` gera uma representação preparada para esse tipo de consulta.

```javascript
const pmrem = new THREE.PMREMGenerator(renderer);
const envMap = pmrem.fromEquirectangular(environment).texture;
scene.environment = envMap;
```

Em fluxos modernos do Three.js, parte desse processamento pode ser integrada pelo próprio renderer ao usar environment maps compatíveis, mas entender PMREM explica por que roughness alta não significa simplesmente aplicar um blur 2D arbitrário na imagem original.

---

## 21. `RoomEnvironment` para um estúdio procedural

Nem sempre é necessário baixar um HDR para obter uma iluminação de estúdio coerente.

Three.js fornece ambientes procedurais que podem ser convertidos com PMREM.

```javascript
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const pmrem = new THREE.PMREMGenerator(renderer);
const room = new RoomEnvironment();
scene.environment = pmrem.fromScene(room).texture;
```

Isso é útil para visualização de produto, protótipos e testes de material em que você quer uma iluminação previsível sem depender de um arquivo externo.

---

## 22. Environment map e luz direta têm funções diferentes

Uma luz direcional pode criar uma sombra clara e uma direção de leitura forte.

Um environment map pode criar reflexos complexos e iluminação distribuída ao redor da superfície.

Uma composição de produto pode usar os dois:

```javascript
scene.environment = envMap;

const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
keyLight.position.set(4, 6, 5);
scene.add(keyLight);
```

O erro é pensar em environment map como "imagem bonita atrás" ou em luz direta como substituto completo de um ambiente refletido.

---

## 23. `MeshPhysicalMaterial` quando o material padrão não basta

`MeshStandardMaterial` resolve muitos casos. Quando o material exige camadas ou fenômenos adicionais, `MeshPhysicalMaterial` amplia o modelo.

Ele pode representar propriedades como:

* clearcoat;
* transmission;
* thickness;
* IOR;
* sheen;
* iridescence;
* anisotropy.

Exemplo de verniz sobre pintura:

```javascript
const material = new THREE.MeshPhysicalMaterial({
  color: 0x222222,
  roughness: 0.35,
  metalness: 0,
  clearcoat: 1,
  clearcoatRoughness: 0.12
});
```

Quanto mais complexo o material, maior tende a ser o custo de shading. Use propriedades físicas porque elas descrevem a superfície, não porque existem como sliders disponíveis.

---

## 24. Transparência e transmission não são a mesma coisa

`transparent` e `opacity` significam mistura alfa tradicional.

`transmission` em `MeshPhysicalMaterial` tenta representar luz atravessando um material físico, como vidro.

Um vidro convincente depende de contexto:

* environment map;
* IOR;
* thickness quando aplicável;
* roughness;
* geometria adequada;
* objetos visíveis através dele.

Transformar `opacity` em `0.2` pode criar transparência visual, mas não equivale a um material refrativo fisicamente plausível.

---

## 25. Color management e tone mapping são camadas diferentes

Color management responde a uma pergunta: **como interpretar os valores de cor ao entrar e sair do pipeline?**

Tone mapping responde a outra: **como comprimir um intervalo de luminância potencialmente maior para o display?**

Um renderer pode usar, por exemplo:

```javascript
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
```

Não use tone mapping para corrigir um `colorSpace` errado e não mude `colorSpace` para compensar iluminação ruim. São problemas diferentes.

---

## 26. Texturas de glTF já fazem parte de um contrato de pipeline

Quando um asset é carregado por `GLTFLoader`, o loader interpreta a estrutura e os materiais segundo as regras do glTF.

Isso é diferente de carregar imagens arbitrárias com `TextureLoader` e conectar manualmente os mapas.

Ao substituir uma textura de uma mesh vinda de glTF, preste atenção a convenções de orientação e cor.

Um caso frequente é uma textura carregada manualmente precisar de:

```javascript
replacement.flipY = false;
replacement.colorSpace = THREE.SRGBColorSpace;
```

antes de ser usada como `map` em uma mesh que veio de glTF.

A regra é não corrigir por tentativa e erro. Primeiro descubra qual convenção cada parte do pipeline está usando.

---

## 27. React Three Fiber e Drei

Em React Three Fiber, Drei oferece abstrações úteis sem mudar o modelo mental.

```jsx
import { Environment, useTexture } from "@react-three/drei";

function ProductMaterial() {
  const [map, normalMap, roughnessMap] = useTexture([
    "/textures/base-color.webp",
    "/textures/normal.webp",
    "/textures/roughness.webp"
  ]);

  map.colorSpace = THREE.SRGBColorSpace;

  return (
    <>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={map}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          metalness={0.1}
        />
      </mesh>

      <Environment files="/hdr/studio.hdr" />
    </>
  );
}
```

`<Environment>` reduz boilerplate. `useTexture` reduz boilerplate. As perguntas fundamentais continuam sendo UV, significado dos mapas, color space, material e iluminação.

---

## 28. Diagnóstico por isolamento

Quando um material parece errado, desligue variáveis.

Uma sequência útil é:

1. material com cor sólida;
2. apenas `map`;
3. adicionar roughness e metalness;
4. adicionar normal map;
5. adicionar environment map;
6. adicionar luzes diretas;
7. adicionar tone mapping e ajustes finais.

Também vale inspecionar um mapa por vez em um material simples.

Isso evita tentar resolver simultaneamente UV, iluminação, roughness e color management.

---

## 29. Erros comuns

### A textura parece lavada ou escura

Revise `colorSpace` antes de alterar luz e exposição.

### O padrão fica esticado

Revise UVs e texel density.

### O metal fica quase preto

Verifique se existe environment map com informação útil para refletir.

### O relevo parece invertido

Revise normal map e convenção do eixo Y.

### O objeto pisca ou fica ruidoso à distância

Revise mipmaps, filtros e resolução da textura.

### O material parece bom no Blender e ruim no navegador

Compare o material realmente exportável pelo glTF, color management, environment e propriedades suportadas. O viewport do Blender não é automaticamente o mesmo pipeline do Three.js.

---

## 30. Exemplo completo e integrado

```javascript
import * as THREE from "three";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x161616);

const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 0.4, 4.5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();

const map = textureLoader.load("/textures/product-base-color.webp");
map.colorSpace = THREE.SRGBColorSpace;

const normalMap = textureLoader.load("/textures/product-normal.webp");
const roughnessMap = textureLoader.load("/textures/product-roughness.webp");
const metalnessMap = textureLoader.load("/textures/product-metalness.webp");
const aoMap = textureLoader.load("/textures/product-ao.webp");

const geometry = new THREE.SphereGeometry(1, 96, 64);
geometry.setAttribute("uv1", geometry.attributes.uv.clone());
aoMap.channel = 1;

const material = new THREE.MeshStandardMaterial({
  map,
  normalMap,
  roughnessMap,
  metalnessMap,
  aoMap,
  roughness: 0.7,
  metalness: 1
});

const product = new THREE.Mesh(geometry, material);
scene.add(product);

const environment = await new RGBELoader().loadAsync("/hdr/studio.hdr");
environment.mapping = THREE.EquirectangularReflectionMapping;
scene.environment = environment;

const keyLight = new THREE.DirectionalLight(0xffffff, 2);
keyLight.position.set(3, 4, 5);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xffffff, 0.7);
fillLight.position.set(-4, 1, 2);
scene.add(fillLight);

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

window.addEventListener("resize", resize);

function animate() {
  requestAnimationFrame(animate);
  product.rotation.y += 0.003;
  renderer.render(scene, camera);
}

animate();
```

O exemplo não tenta maximizar realismo. Ele demonstra o encadeamento correto: UVs, mapas com significado distinto, `colorSpace`, material PBR, environment map, luz direta, tone mapping e renderização.

---

## Fontes principais

* [Three.js Texture](https://threejs.org/docs/pages/Texture.html)
* [Three.js MeshStandardMaterial](https://threejs.org/docs/pages/MeshStandardMaterial.html)
* [Three.js MeshPhysicalMaterial](https://threejs.org/docs/pages/MeshPhysicalMaterial.html)
* [Three.js PMREMGenerator](https://threejs.org/docs/pages/PMREMGenerator.html)
* [Three.js RoomEnvironment](https://threejs.org/docs/pages/RoomEnvironment.html)
* [Three.js manual: textures](https://threejs.org/manual/#en/textures)
* [Khronos glTF 2.0 specification](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html)

---

## Resumo para memorizar

Uma superfície não é apenas uma imagem sobre uma malha. Ela é o resultado de **UVs + dados de textura + material + iluminação + color management**.

Use UVs para definir onde a imagem consulta a superfície, mantenha texel density coerente e diferencie texturas de cor de texturas de dados. Em PBR, `metalness` descreve o tipo de resposta física e `roughness` controla a dispersão da reflexão. Normal maps alteram iluminação, displacement altera vértices.

Environment maps são parte da iluminação e são especialmente importantes para materiais PBR. HDR fornece alcance dinâmico, PMREM organiza o ambiente para diferentes roughness e tone mapping converte luminância para o display. Quando algo parece errado, isole uma camada por vez em vez de compensar um erro com outro.