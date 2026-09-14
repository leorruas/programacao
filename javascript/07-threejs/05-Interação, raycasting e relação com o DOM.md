# Interação, raycasting e relação com o DOM

Three.js desenha uma cena dentro de um Canvas. O restante da página continua sendo HTML, CSS e JavaScript do navegador. Em uma interface real, os dois mundos precisam conversar.

A ideia principal deste artigo é separar três níveis:

* **DOM**: botões, textos, seções, formulários e eventos da página;
* **Canvas**: a superfície onde Three.js desenha;
* **Cena 3D**: objetos que não são elementos HTML e, portanto, não recebem eventos DOM diretamente.

Para selecionar objetos 3D com o cursor, Three.js normalmente usa **raycasting**.

---

## 1. O cursor precisa ser normalizado

Eventos do navegador fornecem coordenadas em pixels:

```javascript
window.addEventListener("pointermove", (event) => {
  console.log(event.clientX, event.clientY);
});
```

Three.js trabalha com coordenadas normalizadas de dispositivo, chamadas NDC, no intervalo de `-1` a `1`.

```javascript
const pointer = new THREE.Vector2();

window.addEventListener("pointermove", (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
});
```

O eixo `y` é invertido porque o sistema do navegador e o sistema usado para a projeção não possuem a mesma orientação vertical.

---

## 2. O que é um Raycaster

Imagine um raio saindo da câmera e atravessando a posição do cursor no plano da tela.

```javascript
const raycaster = new THREE.Raycaster();
```

A cada interação, ele pode ser atualizado:

```javascript
raycaster.setFromCamera(pointer, camera);
```

Depois testamos quais objetos foram atravessados:

```javascript
const intersections = raycaster.intersectObjects(scene.children);
```

O resultado é um array ordenado por distância.

```javascript
if (intersections.length > 0) {
  console.log(intersections[0].object);
}
```

---

## 3. Raycasting não é o mesmo que evento DOM

No DOM, um botão pode receber:

```javascript
button.addEventListener("click", handler);
```

Um `Mesh` de Three.js não é um nó HTML. Ele existe dentro da estrutura da cena.

No Three.js puro, você normalmente:

1. escuta o evento no Canvas ou `window`;
2. converte a coordenada do cursor;
3. cria o raio;
4. calcula interseções;
5. decide o que fazer com o objeto encontrado.

Esse modelo fica mais abstrato em React Three Fiber, que permite escrever handlers como `onClick` diretamente nos elementos JSX 3D. Mas por baixo existe a mesma ideia espacial.

---

## 4. Hover em um objeto

```javascript
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let hovered = null;

window.addEventListener("pointermove", (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

function updateInteraction() {
  raycaster.setFromCamera(pointer, camera);

  const intersections = raycaster.intersectObjects(interactiveObjects);
  hovered = intersections[0]?.object ?? null;
}
```

Depois o loop pode responder:

```javascript
function animate() {
  updateInteraction();

  interactiveObjects.forEach((object) => {
    const targetScale = object === hovered ? 1.08 : 1;
    object.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.08
    );
  });

  renderer.render(scene, camera);
}
```

---

## 5. Cuidado com o custo do raycasting

Testar interseção contra todos os objetos da cena em cada frame pode se tornar caro.

Prefira manter uma coleção específica:

```javascript
const interactiveObjects = [panelA, panelB, panelC];
```

E testar apenas nela:

```javascript
raycaster.intersectObjects(interactiveObjects, false);
```

O princípio é parecido com manipulação do DOM: selecione apenas o que precisa responder à interação.

---

## 6. Quando usar DOM sobre o Canvas

Nem tudo precisa existir dentro do mundo 3D.

Texto de interface, navegação e conteúdo normalmente continuam melhores no DOM:

```html
<section class="hero">
  <div id="three-container"></div>
  <div class="hero-content">
    <h1>Strategic designer</h1>
    <p>Research, systems and future possibilities.</p>
  </div>
</section>
```

O Canvas pode ser decorativo enquanto o texto permanece semântico, selecionável e acessível.

Essa separação também facilita:

* responsividade;
* SEO;
* acessibilidade;
* seleção de texto;
* manutenção;
* fallback quando WebGL não está disponível.

---

## 7. Pointer como influência, não como controle absoluto

Para uma cena decorativa, o cursor não precisa "dirigir" o objeto.

Um padrão mais controlado é converter cursor em alvo de baixa amplitude:

```javascript
const targetRotation = {
  x: 0,
  y: 0
};

window.addEventListener("pointermove", (event) => {
  const x = (event.clientX / window.innerWidth) * 2 - 1;
  const y = -(event.clientY / window.innerHeight) * 2 + 1;

  targetRotation.y = x * 0.12;
  targetRotation.x = y * 0.06;
});
```

O loop suaviza a aproximação:

```javascript
group.rotation.x = THREE.MathUtils.lerp(
  group.rotation.x,
  targetRotation.x,
  0.05
);

group.rotation.y = THREE.MathUtils.lerp(
  group.rotation.y,
  targetRotation.y,
  0.05
);
```

Isso mantém autoria visual. O usuário influencia a cena sem destruí-la.

---

## 8. Exemplo completo e integrado

```javascript
import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 7;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

const interactiveObjects = [];
const group = new THREE.Group();
scene.add(group);

for (let i = 0; i < 3; i += 1) {
  const geometry = new THREE.BoxGeometry(1.4, 1.8, 0.15);
  const material = new THREE.MeshBasicMaterial({
    color: 0x222222,
    wireframe: true
  });

  const panel = new THREE.Mesh(geometry, material);
  panel.position.x = (i - 1) * 1.7;

  group.add(panel);
  interactiveObjects.push(panel);
}

const pointer = new THREE.Vector2(10, 10);
const raycaster = new THREE.Raycaster();
let hoveredObject = null;

window.addEventListener("pointermove", (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
  raycaster.setFromCamera(pointer, camera);
  const intersections = raycaster.intersectObjects(interactiveObjects, false);
  hoveredObject = intersections[0]?.object ?? null;

  interactiveObjects.forEach((object) => {
    const targetZ = object === hoveredObject ? 0.45 : 0;
    object.position.z = THREE.MathUtils.lerp(
      object.position.z,
      targetZ,
      0.08
    );
  });

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
```

A interação muda apenas profundidade. Isso já é suficiente para comunicar que a estrutura responde ao usuário.

---

## Conexões no vault

Este artigo se conecta diretamente a [[javascript/04-dom-e-browser/06-Eventos no navegador|Eventos no navegador]], [[javascript/04-dom-e-browser/11-Dimensões e posições de elementos|Dimensões e posições de elementos]] e [[javascript/07-threejs/04-Loop de renderização, tempo e animação|Loop de renderização, tempo e animação]].

---

## Fontes principais

* [Raycaster](https://threejs.org/docs/#Raycaster)
* [Three.js picking](https://threejs.org/manual/en/picking.html)
* [Three.js responsive design](https://threejs.org/manual/en/responsive.html)

---

## Resumo para memorizar

Objetos 3D não são elementos DOM. Para descobrir qual objeto está sob o cursor, Three.js usa **raycasting**: a posição do pointer é normalizada, um raio parte da câmera e as interseções são calculadas. Em interfaces, mantenha conteúdo e navegação no DOM sempre que fizer sentido e use o Canvas como uma camada visual especializada.