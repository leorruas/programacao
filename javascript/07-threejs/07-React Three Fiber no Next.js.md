# React Three Fiber no Next.js

React Three Fiber, normalmente abreviado como R3F, é um renderer React para Three.js. Ele não substitui os conceitos de Three.js. Ele oferece uma forma declarativa de montar a mesma cena usando componentes JSX.

Por isso esta nota vem depois de [[javascript/07-threejs/01-Three.js e o modelo mental de uma cena 3D|Three.js e o modelo mental de uma cena 3D]], e não antes.

A tradução principal é:

```javascript
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

vira algo como:

```tsx
<mesh>
  <boxGeometry />
  <meshStandardMaterial />
</mesh>
```

O modelo mental continua sendo Three.js.

---

## 1. Instalação

Em um projeto React ou Next.js:

```bash
npm install three @react-three/fiber @react-three/drei
```

Se o projeto usa TypeScript:

```bash
npm install -D @types/three
```

A documentação do React Three Fiber mantém compatibilidade alinhada à versão principal do React. Ao instalar em um projeto existente, confira sempre a combinação atual das versões antes de forçar dependências.

---

## 2. O Canvas é a porta de entrada

No R3F, o `<Canvas>` prepara renderer, cena, câmera e render loop.

```tsx
import { Canvas } from "@react-three/fiber";

export default function Scene() {
  return (
    <Canvas>
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color="black" wireframe />
      </mesh>
    </Canvas>
  );
}
```

O código é declarativo, mas o objeto final continua sendo Three.js.

`<mesh>` corresponde conceitualmente a:

```javascript
new THREE.Mesh();
```

`<boxGeometry />` corresponde a:

```javascript
new THREE.BoxGeometry();
```

---

## 3. Next.js: o componente precisa executar no cliente

Three.js depende do ambiente do navegador para criar o contexto gráfico. No App Router do Next.js, a cena deve ficar em um Client Component.

```tsx
"use client";

import { Canvas } from "@react-three/fiber";

export default function HeroScene() {
  return (
    <Canvas>
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color="black" />
      </mesh>
    </Canvas>
  );
}
```

Mantenha a fronteira pequena: o fato de a cena precisar ser cliente não significa que a página inteira precisa virar Client Component.

---

## 4. Câmera no Canvas

Você pode configurar a câmera diretamente:

```tsx
<Canvas
  camera={{
    position: [0, 0, 8],
    fov: 35,
    near: 0.1,
    far: 100
  }}
>
  <SceneContent />
</Canvas>
```

Isso aplica os mesmos conceitos de [[javascript/07-threejs/02-Cena, câmera, renderer e coordenadas|câmera e coordenadas]].

Não trate esses valores como configuração burocrática. Eles fazem parte da direção visual.

---

## 5. Props viram propriedades de objetos Three.js

Em Three.js puro:

```javascript
mesh.position.set(2, 0, -1);
mesh.rotation.y = Math.PI / 4;
```

Em R3F:

```tsx
<mesh
  position={[2, 0, -1]}
  rotation={[0, Math.PI / 4, 0]}
>
  <boxGeometry />
  <meshBasicMaterial color="black" />
</mesh>
```

A sintaxe mudou. O espaço tridimensional não.

---

## 6. useFrame

`useFrame` inscreve uma função no render loop compartilhado do Canvas.

```tsx
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function RotatingBox() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.25;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshBasicMaterial color="black" wireframe />
    </mesh>
  );
}
```

O `delta` continua sendo o tempo desde o frame anterior.

A documentação recomenda manter o trabalho dentro de `useFrame` enxuto. Evite disparar `setState()` a cada frame.

---

## 7. Hooks só funcionam dentro do Canvas

Isto está errado:

```tsx
function Page() {
  const state = useThree();

  return <Canvas />;
}
```

`useThree` e `useFrame` dependem do contexto criado pelo `<Canvas>`.

A estrutura correta é:

```tsx
function SceneContent() {
  const { camera } = useThree();

  return <mesh />;
}

function Scene() {
  return (
    <Canvas>
      <SceneContent />
    </Canvas>
  );
}
```

---

## 8. Eventos ficam mais simples

No Three.js puro, interação exige coordenadas do pointer + `Raycaster`.

No R3F, a camada de eventos permite:

```tsx
<mesh
  onPointerOver={() => setHovered(true)}
  onPointerOut={() => setHovered(false)}
  onClick={() => setActive((value) => !value)}
>
  <boxGeometry />
  <meshStandardMaterial color={hovered ? "white" : "gray"} />
</mesh>
```

Isso não significa que raycasting desapareceu conceitualmente. R3F está abstraindo essa infraestrutura.

A nota [[javascript/07-threejs/05-Interação, raycasting e relação com o DOM|Interação, raycasting e relação com o DOM]] explica o mecanismo por baixo.

---

## 9. Drei

`@react-three/drei` oferece helpers sobre R3F.

Um exemplo conhecido é `OrbitControls`:

```tsx
import { OrbitControls } from "@react-three/drei";

<Canvas>
  <SceneContent />
  <OrbitControls />
</Canvas>
```

Ele é ótimo para inspecionar uma cena durante o desenvolvimento.

Para um portfólio, entretanto, não deixe controles de demo virarem automaticamente a interação final. Use-os para encontrar câmera e composição. Depois decida se o usuário realmente precisa orbitar a cena.

---

## 10. Separar Scene de Page

Uma arquitetura simples em Next.js pode ser:

```text
components/
  three/
    HeroScene.tsx
    HeroObject.tsx
app/
  page.tsx
```

`HeroScene.tsx` cuida do Canvas:

```tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { HeroObject } from "./HeroObject";

export function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 35 }}>
      <HeroObject />
    </Canvas>
  );
}
```

`HeroObject.tsx` cuida da composição:

```tsx
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function HeroObject() {
  const group = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    group.current.rotation.y = Math.sin(time * 0.25) * 0.05;
  });

  return (
    <group ref={group}>
      <mesh position={[-1.2, 0, 0.4]}>
        <boxGeometry args={[1.6, 2.2, 0.12]} />
        <meshStandardMaterial color="#e3e3e0" roughness={0.75} />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 2.2, 0.12]} />
        <meshStandardMaterial color="#e3e3e0" roughness={0.75} />
      </mesh>

      <mesh position={[1.2, 0, -0.4]}>
        <boxGeometry args={[1.6, 2.2, 0.12]} />
        <meshStandardMaterial color="#e3e3e0" roughness={0.75} />
      </mesh>

      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 5, 6]} intensity={2.4} />
    </group>
  );
}
```

Essa divisão é suficiente para começar. Não crie uma arquitetura genérica de cenas antes de precisar dela.

---

## 11. Exemplo completo no Next.js

```tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Composition() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock, pointer }) => {
    const group = groupRef.current;
    const time = clock.getElapsedTime();

    group.rotation.y = THREE.MathUtils.lerp(
      group.rotation.y,
      pointer.x * 0.08,
      0.04
    );

    group.rotation.x = THREE.MathUtils.lerp(
      group.rotation.x,
      -pointer.y * 0.04,
      0.04
    );

    group.position.y = Math.sin(time * 0.4) * 0.03;
  });

  return (
    <group ref={groupRef}>
      {[-1.5, -0.5, 0.5, 1.5].map((offset, index) => (
        <mesh
          key={offset}
          position={[offset * 0.9, 0, (1.5 - index) * 0.35]}
          rotation={[0, offset * 0.04, 0]}
        >
          <boxGeometry args={[1.2, 1.8, 0.1]} />
          <meshStandardMaterial
            color="#e4e4e1"
            roughness={0.72}
            metalness={0.04}
          />
        </mesh>
      ))}

      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 5]} intensity={2.5} />
    </group>
  );
}

export default function ThreeHero() {
  return (
    <div style={{ width: "100%", height: "60vh" }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 7], fov: 32, near: 0.1, far: 100 }}
      >
        <Composition />
      </Canvas>
    </div>
  );
}
```

Observe que o exemplo possui poucos elementos e pouca animação. A intenção é deixar a composição legível antes de transformá-la em um sistema.

---

## 12. Um princípio importante para vibe coding

Não peça primeiro:

> crie uma biblioteca completa de componentes 3D reutilizáveis.

Prefira:

> crie uma única composição em `HeroScene.tsx`. Não abstraia nada ainda. Use quatro planos, uma câmera fixa de `fov: 32`, uma luz ambiente e uma luz direcional. Só o grupo pode responder ao pointer, com rotação máxima de 0.08 radianos.

Depois que a cena estiver visualmente resolvida, você identifica o que realmente merece virar componente.

Isso reduz código descartável e também reduz o espaço de decisão do agente.

---

## Fontes principais

* [React Three Fiber: introduction](https://r3f.docs.pmnd.rs/getting-started/introduction)
* [React Three Fiber: Canvas](https://r3f.docs.pmnd.rs/api/canvas)
* [React Three Fiber: hooks](https://r3f.docs.pmnd.rs/api/hooks)
* [React Three Fiber repository](https://github.com/pmndrs/react-three-fiber)

---

## Resumo para memorizar

React Three Fiber é **Three.js expresso como componentes React**. `<Canvas>` prepara a infraestrutura; elementos como `<mesh>` representam objetos Three.js; `useFrame` participa do render loop; eventos abstraem raycasting. Em Next.js, mantenha a cena em um Client Component e preserve o restante da página no modelo normal do framework. Primeiro resolva uma cena concreta; abstraia apenas depois.