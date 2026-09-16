# GSAP, interpolação de estados e animação dirigida em Three.js

Em cenas complexas, o desafio não é apenas mover objetos. É garantir que a transformação preserve identidade, tenha ritmo coerente e chegue exatamente aos estados aprovados.

Este artigo aprofunda [[javascript/07-threejs/04-Loop de renderização, tempo e animação|loop de renderização e animação]], [[javascript/07-threejs/09-Transformações locais, globais e hierarquia em Three.js|transformações hierárquicas]] e [[javascript/07-threejs/07-React Three Fiber no Next.js|React Three Fiber]].

---

## 1. Estado estático e transição são coisas diferentes

Um erro comum é construir a animação e deixar que ela defina implicitamente o estado final.

Uma arquitetura mais segura separa:

* estado A;
* estado B;
* função de interpolação A → B;
* controle de tempo.

Isso permite validar os extremos antes de polir o movimento.

---

## 2. Interpolação é o núcleo do movimento

Se uma propriedade vai de `a` para `b`, a interpolação linear é:

```javascript
const value = THREE.MathUtils.lerp(a, b, progress);
```

`progress` vai de `0` a `1`.

Para vetores:

```javascript
current.lerpVectors(start, end, progress);
```

Para orientações complexas, quaternions costumam ser mais seguros:

```javascript
currentQuaternion.slerpQuaternions(startQ, endQ, progress);
```

---

## 3. GSAP pode controlar tempo sem possuir a geometria

Uma estratégia útil é deixar o GSAP animar apenas um cursor escalar.

```javascript
const cursor = { progress: 0 };

gsap.to(cursor, {
  progress: 1,
  duration: 2.4,
  ease: "sine.inOut"
});
```

A cena deriva posição, rotação, profundidade, câmera e outros parâmetros a partir desse valor.

Isso desacopla a timeline do scene graph.

---

## 4. Separar fases perceptivas

Uma transição pode ter propriedades que começam e terminam em janelas diferentes.

```javascript
function range(value, start, end) {
  return THREE.MathUtils.clamp((value - start) / (end - start), 0, 1);
}

const opening = range(progress, 0.05, 0.45);
const depth = range(progress, 0.12, 0.60);
const rotation = range(progress, 0.22, 0.90);
```

Todos usam o mesmo cursor, mas cada mudança possui sua própria janela perceptiva.

---

## 5. Ease muda a narrativa

`ease` não é apenas acabamento.

* `power3.out`: desaceleração evidente;
* `sine.inOut`: aceleração e desaceleração suaves;
* `none`: velocidade constante.

Se uma sequência parece morrer no final, o problema pode ser uma sucessão de pequenos `ease-out`, e não a duração absoluta.

---

## 6. Hold e movimento devem ser distintos

Um hold serve para leitura.

```javascript
timeline.to(cursor, {
  progress: 1,
  duration: 2.2,
  ease: "sine.inOut"
});

timeline.to(cursor, {
  progress: 1,
  duration: 0.8,
  ease: "none"
});
```

O segundo trecho não altera o estado. Ele apenas mantém tempo.

Evite micro-holds entre todos os estados quando a narrativa pede continuidade.

---

## 7. Timeline mestre

Quando existem vários estados narrativos, uma timeline mestre tende a ser mais compreensível que vários playbacks independentes.

```javascript
const timeline = gsap.timeline({ paused: true });

timeline.to(cursor, { state: 1, duration: 2.4, ease: "sine.inOut" });
timeline.to(cursor, { state: 2, duration: 1.8, ease: "power2.inOut" });
timeline.to(cursor, { state: 3, duration: 2.1, ease: "none" });
```

A propriedade animada pode ser contínua. Ela não precisa representar apenas inteiros.

---

## 8. Amostrando entre estados canônicos

Imagine alvos numerados `0`, `1`, `2`, `3`.

```javascript
function sampleState(position) {
  const value = THREE.MathUtils.clamp(position, 0, states.length - 1);
  const index = Math.floor(value);
  const progress = value - index;

  const from = states[index];
  const to = states[Math.min(index + 1, states.length - 1)];

  return {
    x: THREE.MathUtils.lerp(from.x, to.x, progress),
    y: THREE.MathUtils.lerp(from.y, to.y, progress)
  };
}
```

A timeline controla `position`. A cena controla o significado desse valor.

---

## 9. Scrubber antes de playback

Antes de julgar o movimento em velocidade normal, permita navegar manualmente por `progress`.

Um scrubber revela:

* popping;
* cruzamentos ruins;
* inversões inesperadas;
* problemas no meio da transição;
* endpoints que não coincidem;
* mudanças de câmera que só funcionam em um frame específico.

Inspeção manual é uma forma de teste visual.

---

## 10. Estado canônico precisa existir fora da animação

Um estado importante deve poder ser renderizado diretamente, sem obrigar a timeline a chegar até ele.

Isso facilita:

* comparar antes/depois;
* aprovar composições estáticas;
* testar responsividade;
* fotografar frames de debug;
* alterar timing sem alterar geometria.

A regra prática é: primeiro os endpoints, depois a transição.

---

## 11. Não recrie geometria sem necessidade

Em React Three Fiber, evite `setState()` por frame quando apenas objetos Three.js precisam mudar.

```javascript
useFrame(() => {
  const sampled = sampleState(cursor.current.position);
  meshRef.current.position.x = sampled.x;
});
```

Para cenas pequenas, estado React pode ser aceitável. Para animação densa, refs reduzem reconciliação.

---

## 12. Identidade visual precisa sobreviver

Se oito peças viram três módulos, mantenha um mapa explícito de identidade.

```javascript
const pieces = [
  { id: 0, module: "A" },
  { id: 1, module: "A" },
  { id: 2, module: "B" }
];
```

A posição pode mudar. O objeto não deve desaparecer e reaparecer como outra coisa sem motivo narrativo.

---

## 13. Câmera pode fazer parte da mesma timeline

```javascript
const cameraState = {
  x: 0,
  y: 0,
  z: 8,
  targetX: 0,
  targetY: 0
};
```

Geometria e câmera podem ser amostradas a partir do mesmo cursor narrativo. Isso sincroniza parallax, enquadramento e transformação formal.

---

## 14. Movimento contínuo não é sequência de poses

Estados intermediários podem funcionar como waypoints e não como paradas.

Se a narrativa é "afastar progressivamente", não faz sentido mandar os objetos voltarem apenas porque um storyboard antigo possuía um estado de reaproximação.

A timeline deve expressar a lógica perceptiva atual, não obedecer mecanicamente a uma enumeração histórica.

---

## 15. Como diagnosticar timing ruim

Se a animação parece arrastada:

1. confira a duração absoluta;
2. remova holds intermediários;
3. compare `sine.inOut` com `none`;
4. verifique se cada segmento desacelera e acelera novamente;
5. observe se a câmera repete a mesma curva de velocidade;
6. use o scrubber para separar problema de composição de problema de tempo.

Múltiplas desacelerações curtas podem parecer mais lentas que um movimento longo com duração equivalente.

---

## 16. Reduced motion

Uma experiência deve respeitar usuários que preferem menos movimento.

```javascript
const prefersReduced = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
```

Nesse caso, você pode reduzir deslocamentos de câmera, encurtar transições ou apresentar diretamente um estado estático forte.

---

## 17. Exemplo completo

```javascript
import * as THREE from "three";
import gsap from "gsap";

const cursor = { position: 0 };

const states = [
  { x: -2, rotation: 0 },
  { x: 0, rotation: 0.4 },
  { x: 2, rotation: Math.PI }
];

function sample(position) {
  const value = THREE.MathUtils.clamp(position, 0, states.length - 1);
  const index = Math.floor(value);
  const progress = value - index;
  const from = states[index];
  const to = states[Math.min(index + 1, states.length - 1)];

  return {
    x: THREE.MathUtils.lerp(from.x, to.x, progress),
    rotation: THREE.MathUtils.lerp(from.rotation, to.rotation, progress)
  };
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, innerWidth / innerHeight, 0.1, 100);
camera.position.z = 7;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 0.15, 0.15),
  new THREE.MeshBasicMaterial({ color: 0x171817 })
);
scene.add(mesh);

const timeline = gsap.timeline({ repeat: -1, yoyo: true });
timeline.to(cursor, { position: 1, duration: 1.8, ease: "sine.inOut" });
timeline.to(cursor, { position: 2, duration: 1.4, ease: "none" });

renderer.setAnimationLoop(() => {
  const state = sample(cursor.position);
  mesh.position.x = state.x;
  mesh.rotation.z = state.rotation;
  renderer.render(scene, camera);
});
```

---

## Resumo para memorizar

Uma animação robusta separa estados canônicos, interpolação e controle temporal. GSAP pode animar um cursor simples enquanto a cena deriva geometria e câmera desse valor.

Valide endpoints, use scrubber, escolha easing de acordo com a narrativa e evite transformar uma trajetória contínua em uma sequência cansativa de acelerações, pausas e desacelerações.