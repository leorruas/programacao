# Câmera, projeção e leitura espacial em Three.js

Em cenas gráficas, a câmera não é apenas um observador. Ela participa da forma final percebida. O mesmo objeto pode parecer plano, monumental, distorcido ou impossível dependendo de `fov`, distância, orientação e ponto de interesse.

Este artigo aprofunda [[javascript/07-threejs/02-Cena, câmera, renderer e coordenadas|câmera, renderer e coordenadas]] e prepara a leitura de perspectiva forçada e oclusão.

---

## 1. A câmera transforma 3D em 2D

O renderer precisa responder a uma pergunta simples: onde cada ponto 3D aparece na tela?

Em uma `PerspectiveCamera`, objetos mais distantes parecem menores.

```javascript
const camera = new THREE.PerspectiveCamera(
  35,
  innerWidth / innerHeight,
  0.1,
  100
);
```

Os quatro parâmetros são `fov`, `aspect`, `near` e `far`.

---

## 2. Fov controla a intensidade da perspectiva

Um `fov` alto exagera a profundidade. Um `fov` baixo comprime a perspectiva.

```javascript
camera.fov = 25;
camera.updateProjectionMatrix();
```

Alterar apenas o `fov` também muda o enquadramento. Para comparar duas lentes, ajuste a distância da câmera para preservar aproximadamente o tamanho aparente do objeto.

A analogia fotográfica ajuda:

* angular perto do objeto: perspectiva forte;
* lente longa mais distante: perspectiva comprimida.

Em composição editorial 3D, campos de visão menores costumam produzir formas mais controladas.

---

## 3. Distância, alvo e enquadramento trabalham juntos

```javascript
camera.position.set(4, 2, 8);
camera.lookAt(0, 0, 0);
```

Mover a câmera sem repensar o alvo pode produzir enquadramentos inesperados. Se posição e `lookAt` são animados, trate os dois como parte do estado da câmera.

Um estado explícito pode ser:

```javascript
const cameraState = {
  position: new THREE.Vector3(0.2, 0.1, 9),
  target: new THREE.Vector3(0, 0, 0),
  fov: 26
};
```

---

## 4. Projetando um ponto para a tela

Three.js permite converter um ponto global para NDC, o espaço normalizado da tela.

```javascript
const point = new THREE.Vector3(1, 2, 0);
point.project(camera);
```

Depois:

```javascript
const screenX = (point.x * 0.5 + 0.5) * width;
const screenY = (-point.y * 0.5 + 0.5) * height;
```

Isso é útil para alinhar HTML com objetos 3D, medir coincidências em tela, depurar perspectiva forçada e verificar se dois terminais parecem conectados.

---

## 5. `unproject()` faz o caminho inverso

```javascript
const point = new THREE.Vector3(ndcX, ndcY, 0.5);
point.unproject(camera);
```

Isso converte um ponto da projeção para o espaço 3D. Para interação, `Raycaster` costuma ser a ferramenta final, mas entender `unproject()` ajuda a compreender de onde o raio vem.

---

## 6. Câmera ortográfica

Uma `OrthographicCamera` não reduz objetos com a distância.

```javascript
const camera = new THREE.OrthographicCamera(
  -2, 2, 2, -2, 0.1, 100
);
```

Ela é útil para diagramas, interfaces 3D quase planas, visualização técnica e cenas em que o tamanho aparente não deve depender de `z`.

---

## 7. Perspectiva quase ortográfica

Às vezes você quer profundidade real, mas leitura quase plana. Uma estratégia é usar `PerspectiveCamera` com `fov` baixo e câmera mais distante.

```javascript
const camera = new THREE.PerspectiveCamera(22, aspect, 0.1, 100);
camera.position.z = 12;
```

Você preserva perspectiva suficiente para revelar espessura sem transformar a cena em grande-angular.

---

## 8. Responsive framing

O mesmo `z` não funciona necessariamente em desktop e mobile.

```javascript
function fitCamera(camera, width, height) {
  const aspect = width / height;
  camera.aspect = aspect;

  const visibleHeight = Math.max(5, 6 / aspect);
  const fovRad = THREE.MathUtils.degToRad(camera.fov);
  camera.position.z = visibleHeight / (2 * Math.tan(fovRad / 2));

  camera.updateProjectionMatrix();
}
```

O princípio é preservar uma área mínima visível, não apenas aplicar uma escala arbitrária no grupo inteiro.

---

## 9. Camera rig

Em cenas narrativas, concentre lógica de câmera em um sistema responsável por posição, alvo, roll, `fov`, distância responsiva e estados narrativos.

Em React Three Fiber, isso costuma ser um componente que usa `useThree` e `useFrame`.

```jsx
function CameraRig({ sample }) {
  const { camera } = useThree();

  useFrame(() => {
    const state = sample();
    camera.position.set(state.x, state.y, state.z);
    camera.lookAt(state.targetX, state.targetY, state.targetZ);
  });

  return null;
}
```

---

## 10. Movimento de câmera precisa de função narrativa

Dolly-in pode revelar detalhe e aumentar densidade. Arco lateral pode produzir parallax e revelar profundidade. Roll pode desestabilizar a leitura.

Esses recursos perdem força quando usados o tempo todo. Uma câmera dirigida não é uma câmera que nunca para, mas uma câmera que se move quando a mudança de ponto de vista ajuda a perceber algo novo.

---

## 11. Parallax como indicador de profundidade

Quando a câmera se desloca lateralmente, objetos em profundidades diferentes mudam de posição aparente em velocidades diferentes.

```javascript
camera.position.x = Math.sin(time * 0.2) * 0.15;
```

Pequenos deslocamentos já podem revelar que uma composição aparentemente gráfica possui profundidade real.

---

## 12. Near, far e precisão de profundidade

Valores extremos pioram a precisão do depth buffer.

Evite sem necessidade:

```javascript
near = 0.0001;
far = 1000000;
```

Prefira um intervalo compatível com a escala real da cena. Se superfícies muito próximas piscam ou trocam de ordem, investigue `z-fighting`, escala e clipping antes de tentar corrigir com material.

---

## 13. A câmera também pode ser parte do problema

Uma composição pode parecer errada mesmo quando a geometria está correta. Antes de reconstruir o objeto, pergunte:

* a perspectiva está forte demais?
* o alvo da câmera está deslocado?
* o objeto está perto demais da lente?
* o framing muda demais entre aspectos?
* o problema é realmente topologia ou apenas projeção?

Essa separação reduz tentativa e erro.

---

## 14. Debug de câmera

Quando o enquadramento falha:

1. congele os objetos;
2. imprima `camera.position`, `fov` e `aspect`;
3. compare desktop e mobile;
4. projete pontos importantes para a tela;
5. use `CameraHelper` em uma câmera de debug quando necessário;
6. só depois volte a alterar a geometria.

---

## 15. Exemplo integrado

```javascript
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(28, innerWidth / innerHeight, 0.1, 50);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const material = new THREE.MeshNormalMaterial();

for (let i = 0; i < 5; i += 1) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 0.2), material);
  mesh.position.set((i - 2) * 1.1, 0, (i - 2) * -0.45);
  scene.add(mesh);
}

function fitCamera() {
  const aspect = innerWidth / innerHeight;
  camera.aspect = aspect;
  const visibleHeight = Math.max(4.5, 6 / aspect);
  const fov = THREE.MathUtils.degToRad(camera.fov);
  camera.position.z = visibleHeight / (2 * Math.tan(fov / 2));
  camera.updateProjectionMatrix();
}

fitCamera();
addEventListener("resize", () => {
  renderer.setSize(innerWidth, innerHeight);
  fitCamera();
});

renderer.setAnimationLoop((time) => {
  const seconds = time * 0.001;
  camera.position.x = Math.sin(seconds * 0.3) * 0.18;
  camera.position.y = Math.cos(seconds * 0.2) * 0.06;
  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
});
```

---

## Resumo para memorizar

A câmera define como o espaço 3D vira imagem 2D. `fov`, distância, alvo e aspecto precisam ser pensados em conjunto. Projeção de pontos ajuda a medir o que realmente aparece na tela, e pequenos movimentos de câmera podem revelar profundidade por parallax.

Para uma direção visual controlada, trate a câmera como parte da composição e da narrativa, não como um controle genérico de navegação.