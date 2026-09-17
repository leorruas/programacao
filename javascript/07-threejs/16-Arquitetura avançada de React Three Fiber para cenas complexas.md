# Arquitetura avançada de React Three Fiber para cenas complexas

Quando uma cena deixa de ser um experimento simples e passa a ter dezenas ou centenas de objetos, câmera dirigida, timeline, estados canônicos e geometria customizada, o principal problema deixa de ser sintaxe. O problema vira arquitetura.

Este artigo aprofunda [[javascript/07-threejs/07-React Three Fiber no Next.js|React Three Fiber no Next.js]], [[javascript/07-threejs/14-GSAP, interpolação de estados e animação dirigida em Three.js|GSAP e interpolação de estados]], [[javascript/07-threejs/11-InstancedMesh e desenho eficiente de muitas formas|InstancedMesh]] e [[javascript/07-threejs/10-BufferGeometry e geometria paramétrica em Three.js|BufferGeometry]].

---

## 1. O erro de misturar tudo no JSX

Em cenas pequenas, é tentador colocar geometria, matemática, timeline, câmera e estado React no mesmo componente.

Isso funciona até o momento em que cada alteração visual exige percorrer centenas de linhas de JSX.

A separação mais útil é entre:

* modelo geométrico;
* estado narrativo;
* interpolação;
* renderização;
* câmera;
* controles de debug.

A cena fica mais previsível quando cada camada tem uma responsabilidade clara.

---

## 2. Modelo geométrico fora do componente

Funções que constroem dados ou geometrias não precisam conhecer React.

```javascript
export function buildRibbonSegment(length, width, depth) {
  return new THREE.BoxGeometry(length, width, depth);
}
```

Ou, para algo customizado:

```javascript
export function buildParametricGeometry(parameters) {
  const geometry = new THREE.BufferGeometry();
  // calcula positions, indices, normals...
  return geometry;
}
```

Isso permite testar e reutilizar a matemática sem depender do ciclo de renderização do React.

---

## 3. Estado canônico como dados

Evite esconder estados importantes dentro de animações imperativas.

Prefira estruturas explícitas:

```javascript
const STATES = {
  compact: {
    camera: { x: 0, y: 0, z: 8 },
    pieces: [
      { x: -1, y: 0, z: 0, rz: 0 },
      { x: 1, y: 0, z: 0, rz: 0 }
    ]
  },
  open: {
    camera: { x: 0.3, y: 0.1, z: 7.4 },
    pieces: [
      { x: -1.8, y: 0.4, z: 0.2, rz: 0.3 },
      { x: 1.7, y: -0.2, z: -0.1, rz: -0.25 }
    ]
  }
};
```

Um estado canônico pode ser inspecionado, comparado e aprovado isoladamente.

---

## 4. Interpolação como função pura

Se possível, transforme `progress` em estado visual com funções puras.

```javascript
function lerpState(a, b, progress) {
  return {
    x: THREE.MathUtils.lerp(a.x, b.x, progress),
    y: THREE.MathUtils.lerp(a.y, b.y, progress),
    z: THREE.MathUtils.lerp(a.z, b.z, progress),
    rz: THREE.MathUtils.lerp(a.rz, b.rz, progress)
  };
}
```

A timeline controla o tempo. A função de interpolação controla o resultado.

Essa separação facilita scrubber, testes e depuração.

---

## 5. Refs para estado mutável por frame

React state é ótimo para interface declarativa, mas não é obrigatório para toda propriedade que muda a 60 fps.

```javascript
const meshRef = useRef();

useFrame(() => {
  meshRef.current.rotation.z += 0.01;
});
```

Para centenas de objetos, refs evitam reconciliação React desnecessária.

---

## 6. Quando usar state React

Use state React para coisas como:

* estado selecionado no painel de debug;
* play/pause;
* parâmetros de UI;
* modo de visualização;
* seleção de cena.

Evite armazenar em state, a cada frame, milhares de valores de posição que só existem para atualizar matrices.

---

## 7. useFrame como etapa de aplicação

`useFrame` funciona bem como lugar onde o estado amostrado é aplicado aos objetos.

```javascript
useFrame(() => {
  const sampled = sampleScene(progressRef.current);

  pieces.current.forEach((mesh, index) => {
    const target = sampled.pieces[index];
    mesh.position.set(target.x, target.y, target.z);
    mesh.rotation.set(target.rx, target.ry, target.rz);
  });
});
```

O cálculo pode acontecer fora. `useFrame` apenas aplica.

---

## 8. InstancedMesh para famílias grandes

Se dezenas ou centenas de elementos compartilham geometria e material, use [[javascript/07-threejs/11-InstancedMesh e desenho eficiente de muitas formas|InstancedMesh]].

```javascript
const dummy = new THREE.Object3D();

for (let i = 0; i < count; i += 1) {
  dummy.position.set(x[i], y[i], z[i]);
  dummy.rotation.z = rotation[i];
  dummy.updateMatrix();
  instancedMesh.setMatrixAt(i, dummy.matrix);
}

instancedMesh.instanceMatrix.needsUpdate = true;
```

A família continua sendo muitos objetos visuais, mas com custo de draw call muito menor.

---

## 9. Câmera em componente próprio

Em cenas narrativas, crie um `CameraRig`.

```javascript
function CameraRig({ progressRef }) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const state = sampleCamera(progressRef.current);
    camera.position.set(state.x, state.y, state.z);
    target.set(state.tx, state.ty, state.tz);
    camera.lookAt(target);
  });

  return null;
}
```

Isso evita espalhar lógica de enquadramento por componentes de geometria.

---

## 10. Controles de debug separados da cena

Botões, sliders e scrubbers pertencem à camada de interface.

A cena deve receber os valores necessários por props, refs ou uma store pequena, sem depender da estrutura visual do painel.

Isso facilita remover o debug da versão final sem desmontar a arquitetura.

---

## 11. Evite componentes por instância quando não há ganho semântico

Criar 224 componentes React idênticos só para desenhar 224 linhas é uma abstração cara.

Nesse caso, um componente `RadialRing` com `InstancedMesh` representa melhor o sistema.

Use componentes React quando eles representam unidades semânticas da cena, não apenas porque cada objeto visual poderia tecnicamente virar um componente.

---

## 12. Agrupamento semântico e transformações locais

`Group` é útil quando um conjunto realmente compartilha uma transformação.

```jsx
<group ref={moduleRef}>
  <mesh ref={pieceARef} />
  <mesh ref={pieceBRef} />
</group>
```

Mas não force rigidez conceitual quando a composição exige transformações por peça.

Um grupo pode servir para organização sem obrigar todos os filhos a terem comportamento idêntico.

---

## 13. Quaternions para rotações complexas

Interpolar Euler diretamente pode produzir caminhos estranhos.

Para rotações 3D fortes, considere quaternions:

```javascript
currentQuaternion.slerpQuaternions(
  startQuaternion,
  endQuaternion,
  progress
);
```

Para rotações quase planas em `z`, interpolar ângulo pode continuar sendo suficiente.

---

## 14. Memoização com intenção

`useMemo` é útil para objetos que são caros ou precisam manter identidade:

```javascript
const geometry = useMemo(() => buildGeometry(config), [config]);
```

Mas não memorize tudo automaticamente.

Se a geometria é estática, ótimo. Se precisa mudar continuamente, talvez seja melhor atualizar atributos existentes ou derivar transforms sem recriar a geometria.

---

## 15. Dispose e ciclo de vida

Geometrias, materiais e render targets usam memória de GPU.

Quando você cria recursos manualmente fora do fluxo normal do R3F, entenda quem é responsável por `dispose()`.

```javascript
useEffect(() => {
  return () => {
    geometry.dispose();
    material.dispose();
  };
}, [geometry, material]);
```

React Three Fiber cuida de muitos casos automaticamente, mas recursos externos e caches customizados podem exigir atenção.

---

## 16. Uma arquitetura prática de pastas

Uma cena complexa pode seguir algo assim:

```text
scene/
  SceneCanvas.tsx
  SceneModel.ts
  scene-states.ts
  scene-sampler.ts
  geometry/
    buildRibbon.ts
    buildRing.ts
  components/
    PieceSystem.tsx
    RadialRing.tsx
    CameraRig.tsx
  debug/
    SceneControls.tsx
```

O importante não é o nome exato das pastas. É impedir que matemática, estados e renderização fiquem inseparáveis.

---

## 17. Estado visual não é estado de aplicação

Uma distinção útil:

* estado de aplicação: `isPlaying`, `selectedState`, `reducedMotion`;
* estado visual: posições, rotações, opacidades e matrices derivadas do tempo.

O primeiro costuma pertencer ao React.

O segundo pode ser derivado e aplicado diretamente a refs.

---

## 18. Performance deve ser medida

Não transforme toda cena em uma arquitetura hiperbólica antes de existir um problema.

Observe:

* FPS;
* quantidade de draw calls;
* geometria recriada por frame;
* reconciliações React;
* tamanho do DPR;
* custo de shaders;
* quantidade de instâncias.

Depois escolha a otimização correspondente.

---

## 19. Debug visual é parte da arquitetura

Uma cena complexa deve facilitar perguntas como:

* qual peça é esta?;
* qual é seu transform local?;
* qual é o transform global?;
* em qual estado estou?;
* qual é o `progress` atual?;
* qual é a posição da câmera?;
* qual encontro está falhando?

Por isso, mantenha IDs estáveis e dados legíveis.

```javascript
const pieces = [
  { id: "left-top", module: "A" },
  { id: "center-left", module: "A" }
];
```

---

## 20. Exemplo completo e integrado

```jsx
"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const states = [
  { x: -1.5, rotation: 0, cameraX: 0, cameraZ: 7 },
  { x: 1.5, rotation: Math.PI * 0.75, cameraX: 0.3, cameraZ: 6.4 }
];

function sample(progress) {
  return {
    x: THREE.MathUtils.lerp(states[0].x, states[1].x, progress),
    rotation: THREE.MathUtils.lerp(
      states[0].rotation,
      states[1].rotation,
      progress
    ),
    cameraX: THREE.MathUtils.lerp(
      states[0].cameraX,
      states[1].cameraX,
      progress
    ),
    cameraZ: THREE.MathUtils.lerp(
      states[0].cameraZ,
      states[1].cameraZ,
      progress
    )
  };
}

function CameraRig({ progressRef }) {
  const { camera } = useThree();

  useFrame(() => {
    const state = sample(progressRef.current);
    camera.position.set(state.cameraX, 0.2, state.cameraZ);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Piece({ progressRef }) {
  const ref = useRef();
  const geometry = useMemo(() => new THREE.BoxGeometry(2.4, 0.2, 0.2), []);

  useFrame(() => {
    const state = sample(progressRef.current);
    ref.current.position.x = state.x;
    ref.current.rotation.z = state.rotation;
  });

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshNormalMaterial />
    </mesh>
  );
}

export default function SceneExample() {
  const progressRef = useRef(0.35);

  return (
    <Canvas camera={{ fov: 28, position: [0, 0.2, 7] }}>
      <Piece progressRef={progressRef} />
      <CameraRig progressRef={progressRef} />
    </Canvas>
  );
}
```

O exemplo é pequeno, mas já contém a separação principal: estados e `sample()` definem a lógica, `Piece` aplica transformações à geometria e `CameraRig` cuida apenas da câmera.

---

## Resumo para memorizar

Arquitetura avançada em React Three Fiber significa separar matemática, estados, interpolação, renderização, câmera e controles de debug. Use React state para estado de aplicação e refs para estado visual denso por frame quando isso simplificar a cena.

Componentes devem representar unidades semânticas, não necessariamente cada objeto visual. Para famílias grandes, use `InstancedMesh`; para geometrias complexas, mantenha builders fora do JSX; para cenas narrativas, use estados canônicos e um `CameraRig` próprio. A meta é conseguir alterar uma camada sem reconstruir todas as outras.