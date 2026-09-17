# glTF e pipeline Blender para Three.js

Quando uma cena começa a depender de objetos modelados fora do código, o problema deixa de ser apenas construir `Mesh`, `BufferGeometry` e materiais manualmente. Surge um novo fluxo: criar o asset em uma ferramenta de autoria, exportar para um formato de runtime, carregar no navegador e manter a cena previsível depois dessa passagem.

A forma mais útil de pensar nisso é como um pipeline de design. O arquivo `.blend` é o arquivo de trabalho editável. O `glTF` é o arquivo de entrega otimizado para a aplicação. O Three.js é o runtime que recebe esse asset e o integra à cena.

Este artigo aprofunda [[javascript/07-threejs/07-React Three Fiber no Next.js|React Three Fiber no Next.js]], [[javascript/07-threejs/10-BufferGeometry e geometria paramétrica em Three.js|BufferGeometry e geometria paramétrica]], [[javascript/07-threejs/13-Câmera, projeção e leitura espacial em Three.js|câmera e projeção]] e [[javascript/07-threejs/16-Arquitetura avançada de React Three Fiber para cenas complexas|arquitetura de cenas complexas em R3F]].

---

## 1. glTF não é o arquivo de autoria

glTF significa *GL Transmission Format*. A função central dele é transportar uma cena 3D entre ferramentas e runtimes com baixo custo de processamento.

Isso significa que ele não deve ser tratado como substituto do arquivo `.blend`.

Pense assim:

* `.blend`: arquivo-fonte de design;
* `.glb` ou `.gltf`: build de produção do asset;
* Three.js: ambiente onde esse build é executado.

O arquivo de autoria preserva decisões de modelagem, modificadores, organização de trabalho e contexto criativo. O glTF preserva o que o runtime precisa para exibir o resultado.

---

## 2. O que um asset glTF pode conter

Um glTF pode transportar mais do que uma malha isolada.

Ele pode incluir:

* hierarquia de cena;
* nós e transformações;
* meshes e primitivas;
* materiais PBR;
* texturas;
* câmeras;
* luzes pontuais suportadas pela extensão apropriada;
* animações;
* skinning;
* morph targets;
* propriedades extras.

Por isso, `GLTFLoader` não retorna simplesmente uma `Mesh`. Ele retorna um objeto com várias partes.

```javascript
const gltf = await loader.loadAsync("/models/product.glb");

console.log(gltf.scene);
console.log(gltf.animations);
console.log(gltf.cameras);
console.log(gltf.userData);
```

A propriedade usada com mais frequência é `gltf.scene`, que representa a cena padrão carregada como um `Group` do Three.js.

---

## 3. `.glb` e `.gltf` não são a mesma embalagem

Os dois formatos representam glTF 2.0, mas empacotam os dados de forma diferente.

### `.glb`

É um contêiner binário único. Pode reunir estrutura da cena, buffers e imagens em um só arquivo.

É conveniente para deploy porque reduz o número de arquivos que precisam ser mantidos juntos.

### `.gltf`

É um arquivo JSON que descreve a cena e pode apontar para arquivos externos, como:

* `.bin` para buffers;
* `.png`, `.jpg` ou outras imagens compatíveis para texturas.

Esse formato é mais fácil de inspecionar manualmente, mas exige mais cuidado com caminhos e deploy.

Para aplicações web comuns, `.glb` costuma ser a escolha prática quando não existe motivo para manter recursos separados.

---

## 4. A estrutura mental de um glTF

Um glTF não é apenas uma lista de triângulos. Ele possui uma organização parecida com a cena que você já conhece em Three.js.

A relação principal é:

```text
scene
  nodes
    meshes
      primitives
        attributes
        indices
        material
```

Os `nodes` carregam hierarquia e transformações. Os `meshes` descrevem geometria. Os materiais apontam para propriedades de superfície e texturas.

Essa distinção ajuda a diagnosticar um problema comum: o objeto pode parecer estar na posição errada não porque os vértices estão errados, mas porque algum nó ancestral contém uma transformação.

---

## 5. Coordenadas e unidades

A especificação glTF usa sistema de coordenadas destro, com `+Y` para cima, e define distâncias lineares em metros.

O Blender usa convenções próprias durante a autoria, e o exportador glTF realiza a conversão necessária.

Por isso, evite corrigir manualmente no Three.js uma rotação de eixo que já foi tratada pelo exportador sem antes inspecionar a hierarquia carregada.

Uma boa regra é:

1. decidir a escala real no Blender;
2. aplicar transformações apenas quando isso fizer sentido para o asset;
3. exportar usando as opções corretas;
4. inspecionar o resultado no Three.js;
5. só então adicionar offsets de composição específicos da aplicação.

---

## 6. Preparação do asset no Blender

Antes da exportação, o modelo precisa estar previsível.

Verifique:

* escala coerente;
* origem dos objetos;
* nomes úteis;
* hierarquia de parentesco;
* normais;
* UVs quando houver texturas;
* materiais compatíveis com o pipeline glTF;
* animações e ações que realmente devem ser exportadas;
* modificadores que precisam ou não ser aplicados.

Não trate a exportação como um botão final sem critérios. Uma cena mal organizada no Blender costuma virar uma cena difícil de manipular no código.

---

## 7. Nomear objetos é uma decisão de API

Se o código precisa encontrar partes do modelo, os nomes no Blender passam a funcionar como uma interface entre design 3D e programação.

Exemplo no Blender:

```text
ProductRoot
Screen
Body
ButtonPrimary
ButtonSecondary
```

Depois, no Three.js:

```javascript
const screen = gltf.scene.getObjectByName("Screen");
const button = gltf.scene.getObjectByName("ButtonPrimary");
```

Isso é muito melhor do que depender de posições arbitrárias na árvore de filhos.

Evite nomes genéricos como `Cube.001`, `Cube.002` e `Mesh_17` em assets que serão manipulados pelo código.

---

## 8. Materiais: Blender não é o navegador

O Blender possui muitos sistemas de shading que não têm equivalência direta no glTF.

O caminho mais previsível é usar materiais compatíveis com o modelo PBR do glTF, normalmente construídos a partir de Principled BSDF no Blender.

Nem todo node graph arbitrário será transportado como uma lógica equivalente no runtime.

Quando um material depende de efeitos específicos do Blender, existem três possibilidades:

* simplificar o material para o pipeline glTF;
* assar parte da aparência em texturas;
* reconstruir o efeito no Three.js com material customizado ou shader.

A pergunta útil é: a aparência deve viajar com o asset ou pertence à aplicação?

---

## 9. Texturas e UVs

Textura não é apenas uma imagem colada na mesh. Ela depende do mapeamento UV e da interpretação correta de cada canal.

Antes de exportar, confirme:

* UVs válidos;
* resolução adequada ao tamanho visual na tela;
* ausência de texturas enormes sem ganho perceptível;
* canais de material conectados corretamente;
* caminhos resolvidos no export.

Texturas frequentemente pesam mais do que a geometria. Otimizar apenas o número de polígonos e ignorar imagens pode produzir um asset leve em vertices e pesado em download e memória de GPU.

---

## 10. Exportando do Blender

O exportador glTF do Blender fica em:

```text
File > Export > glTF 2.0
```

Algumas opções importantes dependem do projeto:

* exportar apenas objetos selecionados;
* aplicar modificadores na malha avaliada;
* exportar UVs;
* exportar normais e tangentes quando necessários;
* incluir animações;
* incluir propriedades customizadas como extras;
* exportar com `+Y` para cima conforme a convenção glTF.

Não marque tudo automaticamente. Cada recurso exportado aumenta informação, complexidade ou tamanho do asset.

---

## 11. Carregando com `GLTFLoader`

`GLTFLoader` é um addon do Three.js e precisa ser importado explicitamente.

```javascript
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();
const gltf = await loader.loadAsync("/models/product.glb");
scene.add(gltf.scene);
```

O método assíncrono é especialmente útil porque deixa o fluxo compatível com `async/await`.

---

## 12. Não perca a hierarquia ao carregar

Depois da carga, evite imediatamente desmontar toda a cena em meshes soltas sem necessidade.

A hierarquia pode conter:

* pivôs úteis;
* transformações herdadas;
* grupos semânticos;
* bones;
* nós animados;
* organização necessária para clips de animação.

Primeiro inspecione:

```javascript
gltf.scene.traverse((object) => {
  console.log(object.name, object.type, object.position);
});
```

Só depois decida o que realmente precisa ser alterado.

---

## 13. Clipes de animação

As animações exportadas aparecem em `gltf.animations` como `AnimationClip`.

```javascript
const mixer = new THREE.AnimationMixer(gltf.scene);
const clip = gltf.animations[0];
const action = mixer.clipAction(clip);

action.play();
```

No loop de renderização:

```javascript
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  mixer.update(delta);
  renderer.render(scene, camera);
}
```

A animação do arquivo e a animação dirigida pela aplicação são camadas diferentes. Um asset pode ter clips internos e ainda ser movido por GSAP como parte de uma composição maior.

---

## 14. Animação interna e animação da cena

Considere um personagem com animação de caminhada.

O clip controla:

* bones;
* movimentos internos;
* morph targets.

A aplicação pode controlar:

* posição global do personagem;
* câmera;
* entrada e saída da cena;
* progressão narrativa.

Essa separação evita tentar resolver tudo dentro do arquivo 3D ou tudo dentro do código.

---

## 15. `userData` e propriedades extras

Propriedades customizadas exportadas como extras podem chegar ao Three.js em `userData`.

Isso permite transportar metadados do Blender para a aplicação.

Exemplo conceitual:

```javascript
const hotspot = gltf.scene.getObjectByName("HotspotCamera");
console.log(hotspot.userData);
```

Um objeto pode carregar dados como:

```json
{
  "interactive": true,
  "category": "primary-action"
}
```

Isso cria uma ponte útil entre organização semântica do asset e comportamento no front-end.

---

## 16. Compressão de geometria

`GLTFLoader` pode trabalhar com extensões de compressão como Draco e Meshopt quando os decoders correspondentes são configurados.

Com Draco:

```javascript
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
```

Compressão reduz transferência, mas adiciona custo de decodificação. Ela deve ser tratada como parte de uma estratégia de performance, não como checkbox automático.

---

## 17. Compressão de texturas

Texturas podem dominar download e memória.

O pipeline moderno pode usar KTX2 e Basis Universal quando o projeto realmente precisa reduzir peso e aproveitar formatos comprimidos adequados à GPU.

No loader:

```javascript
import { KTX2Loader } from "three/addons/loaders/KTX2Loader.js";

const ktx2Loader = new KTX2Loader();
ktx2Loader
  .setTranscoderPath("/basis/")
  .detectSupport(renderer);

loader.setKTX2Loader(ktx2Loader);
```

A otimização mais importante depende do gargalo real: tamanho de download, tempo de decodificação, memória ou custo de renderização.

---

## 18. Quando usar `glTF` e quando gerar geometria em código

Nem toda forma deve vir do Blender.

Use `glTF` quando:

* a forma é melhor criada visualmente;
* existe modelagem orgânica ou detalhada;
* há rigging, skinning ou animação de bones;
* materiais e UVs fazem parte central do asset;
* o objeto é uma peça de conteúdo produzida por artista ou designer 3D.

Use geometria em código quando:

* a forma é realmente paramétrica;
* precisa responder a dados em tempo real;
* é composta por padrões matemáticos;
* precisa mudar de topologia dinamicamente;
* o código descreve a forma melhor do que uma ferramenta de autoria.

Em muitos projetos, os dois sistemas coexistem.

---

## 19. React Three Fiber e `useGLTF`

Em React Three Fiber, Drei oferece `useGLTF` como abstração conveniente sobre o carregamento de glTF.

```jsx
import { useGLTF } from "@react-three/drei";

function Product() {
  const { scene } = useGLTF("/models/product.glb");
  return <primitive object={scene} />;
}
```

Para pré-carregar:

```javascript
useGLTF.preload("/models/product.glb");
```

A abstração muda, mas o modelo mental continua sendo o mesmo: existe um asset glTF carregado e convertido em objetos Three.js.

---

## 20. Quando não usar `<primitive>` como solução final

`<primitive object={scene} />` é ótimo para carregar uma cena inteira rapidamente, mas pode ser genérico demais quando partes precisam de comportamento próprio.

Se você precisa manipular elementos específicos, considere:

* localizar nós por nome;
* criar componentes semânticos;
* usar ferramentas como geração de componentes a partir de glTF;
* preservar a hierarquia necessária sem transformar o asset inteiro em uma caixa-preta.

O objetivo não é converter cada mesh em JSX manualmente. É expor apenas as partes que realmente fazem parte da lógica da aplicação.

---

## 21. Erros comuns de pipeline

### O modelo chega gigantesco ou minúsculo

Verifique unidade, escala e transforms antes de aplicar fatores arbitrários no código.

### O objeto chega rotacionado

Inspecione a conversão de eixos e a hierarquia antes de adicionar uma rotação corretiva permanente.

### O material parece diferente

Confirme se o shader do Blender é compatível com glTF e se as texturas foram exportadas corretamente.

### A animação não funciona

Confirme se os clips foram realmente exportados, se os nomes estão corretos e se o `AnimationMixer` está sendo atualizado por frame.

### O arquivo pesa demais

Meça geometria, quantidade e resolução de texturas, animações, materiais e possibilidade de compressão.

### O código não encontra uma peça

Defina nomes semânticos no Blender e não dependa de índices frágeis na árvore.

---

## 22. Uma estratégia de pipeline previsível

Um fluxo saudável é:

1. modelar e organizar no Blender;
2. nomear objetos que serão acessados pela aplicação;
3. validar escala, origem, UVs, normais, materiais e animações;
4. exportar uma versão glTF de teste;
5. carregar no Three.js sem correções cosméticas precipitadas;
6. inspecionar hierarquia, bounds, materiais e clips;
7. corrigir problemas de autoria no Blender quando pertencem ao asset;
8. corrigir problemas de composição no Three.js quando pertencem à aplicação;
9. otimizar apenas depois de medir;
10. automatizar export e validação quando o pipeline amadurecer.

Essa separação evita que o código vire uma coleção de compensações para problemas que deveriam ter sido resolvidos no asset.

---

## 23. Exemplo completo e integrado em Three.js

```javascript
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe9e6df);

const camera = new THREE.PerspectiveCamera(
  28,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(2.5, 1.8, 6);
camera.lookAt(0, 0.8, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.8));

const keyLight = new THREE.DirectionalLight(0xffffff, 3);
keyLight.position.set(3, 5, 4);
scene.add(keyLight);

const loader = new GLTFLoader();
const gltf = await loader.loadAsync("/models/product.glb");
const model = gltf.scene;
scene.add(model);

model.traverse((object) => {
  if (object.isMesh) {
    object.castShadow = true;
    object.receiveShadow = true;
  }
});

const screen = model.getObjectByName("Screen");
if (screen) {
  console.log("Tela localizada:", screen);
}

const mixer = gltf.animations.length
  ? new THREE.AnimationMixer(model)
  : null;

if (mixer) {
  const action = mixer.clipAction(gltf.animations[0]);
  action.play();
}

const clock = new THREE.Clock();

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", resize);

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);

  renderer.render(scene, camera);
}

animate();
```

Esse exemplo mantém a hierarquia do asset, inspeciona uma peça por nome e separa a animação interna do arquivo do restante da cena.

---

## 24. Exemplo completo e integrado em React Three Fiber

```jsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";

function Product() {
  const group = useRef();
  const { scene, animations } = useGLTF("/models/product.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const firstAction = Object.values(actions)[0];
    firstAction?.play();

    return () => firstAction?.stop();
  }, [actions]);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.08;
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/product.glb");

export default function ProductScene() {
  return (
    <Canvas camera={{ fov: 28, position: [2.5, 1.8, 6] }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 5, 4]} intensity={3} />
      <Product />
      <Environment preset="studio" />
    </Canvas>
  );
}
```

O asset continua sendo produzido fora do React. O componente apenas carrega, posiciona e integra o resultado ao estado visual da aplicação.

---

## 25. Checklist de entrega de um asset

Antes de considerar um asset pronto para a aplicação, confirme:

* escala e unidade coerentes;
* pivôs e origens intencionais;
* nomes de nós estáveis;
* hierarquia compreensível;
* normais corretas;
* UVs válidos;
* materiais exportáveis;
* texturas com resolução adequada;
* animações necessárias incluídas;
* ausência de conteúdo não utilizado;
* tamanho de arquivo medido;
* carregamento testado no runtime real;
* comportamento verificado em diferentes dispositivos quando necessário.

---

## Fontes principais

* [Three.js `GLTFLoader`](https://threejs.org/docs/pages/GLTFLoader.html)
* [Three.js manual: loading 3D models](https://threejs.org/manual/en/loading-3d-models.html)
* [Khronos glTF 2.0 specification](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html)
* [Khronos glTF tutorial](https://github.khronos.org/glTF-Tutorials/gltfTutorial/)
* [Blender manual: glTF 2.0](https://docs.blender.org/manual/en/dev/addons/scene_gltf2.html)

---

## Resumo para memorizar

glTF é um formato de entrega para runtime, não um substituto do arquivo de autoria. O Blender produz e organiza o asset; o exportador converte esse trabalho para glTF; o Three.js carrega a cena resultante e a integra à aplicação.

Um pipeline confiável depende de escala, nomes, hierarquia, materiais, UVs, texturas e animações previsíveis antes da exportação. No código, preserve a hierarquia até entender o que ela representa, acesse peças por nomes semânticos e separe problemas do asset de problemas de composição.

Use `.glb` quando um único arquivo simplifica o deploy, `GLTFLoader` ou `useGLTF` para carregar, `AnimationMixer` ou `useAnimations` para clips internos e compressão apenas quando uma medição indicar que ela resolve um gargalo real.