# Cena, câmera, renderer e coordenadas

Depois de entender o modelo geral de [[javascript/07-threejs/01-Three.js e o modelo mental de uma cena 3D|Three.js]], a próxima dificuldade é espacial: **onde os objetos estão e de onde a câmera os observa?**

A maioria das cenas que parecem "quebradas" no começo tem menos relação com sintaxe e mais com posição, escala, direção ou enquadramento.

---

## 1. O espaço tridimensional

No navegador tradicional, estamos acostumados a dois eixos:

* `x`: horizontal;
* `y`: vertical.

Em Three.js existe também:

* `z`: profundidade.

Um ponto pode ser descrito como:

```javascript
const ponto = new THREE.Vector3(2, 1, -3);
```

Isso significa:

```text
x = 2
y = 1
z = -3
```

A posição de um objeto é um vetor desse tipo:

```javascript
cube.position.set(2, 1, -3);
```

A palavra importante é **relação**. `z = -3` sozinho não diz se o objeto está perto ou longe visualmente. Isso depende da câmera.

---

## 2. Position, rotation e scale

Todo `Object3D` possui três transformações essenciais.

### Position

```javascript
mesh.position.set(1, 0, -2);
```

Move o objeto no espaço.

### Rotation

```javascript
mesh.rotation.x = Math.PI / 4;
mesh.rotation.y = Math.PI / 6;
```

As rotações são expressas em **radianos**, não em graus.

Uma volta completa é:

```javascript
Math.PI * 2
```

Meia volta:

```javascript
Math.PI
```

Um quarto de volta:

```javascript
Math.PI / 2
```

### Scale

```javascript
mesh.scale.set(2, 1, 0.5);
```

Altera a escala em cada eixo.

A analogia com Figma é direta: posição, rotação e escala continuam existindo, mas agora há profundidade real na transformação.

---

## 3. A câmera em perspectiva

A câmera mais comum para cenas 3D é `PerspectiveCamera`:

```javascript
const camera = new THREE.PerspectiveCamera(
  35,
  width / height,
  0.1,
  100
);
```

O primeiro valor, `fov`, afeta muito o caráter visual da cena.

Um `fov` mais baixo tende a produzir uma sensação mais comprimida, próxima de lentes longas. Um `fov` mais alto aumenta a sensação de perspectiva e pode deformar elementos próximos das bordas.

Para interfaces e objetos editoriais, valores como `30`, `35`, `40` ou `45` frequentemente produzem uma imagem mais controlada do que um campo muito aberto. Isso não é uma regra universal. É uma decisão de composição.

```javascript
const camera = new THREE.PerspectiveCamera(35, aspect, 0.1, 100);
camera.position.set(0, 0, 8);
```

---

## 4. Near e far não são detalhes irrelevantes

Os parâmetros `near` e `far` definem o intervalo de profundidade que a câmera renderiza.

```javascript
new THREE.PerspectiveCamera(35, aspect, 0.1, 100);
```

Objetos mais próximos do que `0.1` ou mais distantes do que `100` serão cortados.

Evite usar intervalos absurdamente grandes sem necessidade:

```javascript
// possível, mas geralmente desnecessário
new THREE.PerspectiveCamera(35, aspect, 0.0001, 1000000);
```

Um intervalo mais controlado também ajuda a precisão do depth buffer.

---

## 5. Para onde a câmera está olhando

Mover a câmera não significa automaticamente apontá-la para um objeto.

Você pode usar:

```javascript
camera.lookAt(0, 0, 0);
```

ou:

```javascript
camera.lookAt(mesh.position);
```

Isso é particularmente útil durante o aprendizado porque deixa explícito qual é o alvo visual.

```javascript
camera.position.set(4, 3, 8);
camera.lookAt(0, 0, 0);
```

A combinação posição + alvo define grande parte da composição.

---

## 6. PerspectiveCamera versus OrthographicCamera

Uma `PerspectiveCamera` reproduz a redução aparente com a distância:

```javascript
const camera = new THREE.PerspectiveCamera(35, aspect, 0.1, 100);
```

Uma `OrthographicCamera` mantém objetos do mesmo tamanho visual mesmo quando estão em profundidades diferentes.

```javascript
const camera = new THREE.OrthographicCamera(
  -4,
  4,
  3,
  -3,
  0.1,
  100
);
```

Para gráficos que precisam parecer mais técnicos, diagramáticos ou quase 2.5D, a câmera ortográfica pode ser muito interessante. Para profundidade mais fotográfica, a perspectiva tende a ser mais natural.

Essa distinção é especialmente útil para design: **3D não exige perspectiva dramática**.

---

## 7. Resize da janela

Se o tamanho do viewport muda, a proporção da câmera também precisa mudar.

```javascript
window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
});
```

Se você altera `aspect`, `fov`, `near` ou `far`, normalmente precisa chamar:

```javascript
camera.updateProjectionMatrix();
```

Sem isso, a câmera continua usando a matriz de projeção anterior.

---

## 8. Pixel ratio

Uma tela Retina pode pedir muitos pixels à GPU.

Em vez de usar cegamente:

```javascript
renderer.setPixelRatio(window.devicePixelRatio);
```

é comum limitar:

```javascript
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
```

Isso costuma preservar nitidez suficiente sem multiplicar demais o custo de renderização.

---

## 9. Exemplo completo e integrado

```javascript
import * as THREE from "three";

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.set(4, 3, 8);
camera.lookAt(0, 0, 0);

const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({
  color: 0x111111,
  wireframe: true
});

const cube = new THREE.Mesh(geometry, material);
cube.rotation.set(Math.PI / 8, Math.PI / 4, 0);
scene.add(cube);

renderer.render(scene, camera);

window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.render(scene, camera);
});
```

Antes de adicionar animação, altere apenas três coisas e observe o efeito:

* `camera.position`;
* `camera.fov`;
* `cube.rotation`.

Esse exercício ensina mais sobre direção visual 3D do que adicionar vários efeitos ao mesmo tempo.

---

## Fontes principais

* [Three.js: creating a scene](https://threejs.org/manual/en/creating-a-scene.html)
* [PerspectiveCamera](https://threejs.org/docs/#PerspectiveCamera)
* [OrthographicCamera](https://threejs.org/docs/#OrthographicCamera)
* [WebGLRenderer](https://threejs.org/docs/#WebGLRenderer)

---

## Resumo para memorizar

Uma cena 3D é organizada nos eixos **x, y e z**. Objetos possuem **position, rotation e scale**. A câmera define o enquadramento e a projeção, e `fov`, posição e alvo mudam fortemente o resultado visual. Em interfaces responsivas, lembre de atualizar `aspect`, `projectionMatrix`, tamanho do renderer e pixel ratio.