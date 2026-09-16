# InstancedMesh e desenho eficiente de muitas formas

Quando dezenas ou centenas de objetos compartilham a mesma geometria e material, criar um `Mesh` separado para cada um pode aumentar muito o número de draw calls. `InstancedMesh` existe para representar muitas cópias com uma única chamada de desenho.

Este artigo aprofunda [[javascript/07-threejs/06-Composição visual, performance e diagnóstico de cenas 3D|performance e diagnóstico]] e [[javascript/07-threejs/10-BufferGeometry e geometria paramétrica em Three.js|BufferGeometry e geometria paramétrica]].

---

## 1. O problema: muitos objetos iguais

Imagine 500 barras radiais em uma composição.

A implementação ingênua seria:

```javascript
for (let i = 0; i < 500; i += 1) {
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}
```

Visualmente funciona, mas cada `Mesh` pode gerar trabalho separado para o renderer.

Se geometria e material são compartilhados, a GPU pode receber essas cópias de forma mais eficiente.

---

## 2. InstancedMesh em uma frase

`InstancedMesh` significa:

> desenhe a mesma geometria com o mesmo material várias vezes, usando uma transformação diferente para cada cópia.

```javascript
const instances = new THREE.InstancedMesh(
  geometry,
  material,
  500
);
```

O terceiro argumento é a capacidade máxima.

---

## 3. Cada instância tem sua própria matriz

Você não recebe 500 objetos independentes. Em vez disso, grava uma matriz para cada índice.

```javascript
const dummy = new THREE.Object3D();

for (let i = 0; i < 500; i += 1) {
  dummy.position.set(i * 0.02, 0, 0);
  dummy.updateMatrix();
  instances.setMatrixAt(i, dummy.matrix);
}

instances.instanceMatrix.needsUpdate = true;
```

O `dummy` serve apenas para montar a transformação.

---

## 4. A analogia com componentes repetidos

Pense em uma lista no Figma com 100 avatares idênticos.

Você não quer 100 definições diferentes do componente. Quer uma definição compartilhada e 100 instâncias com posição própria.

`InstancedMesh` aplica a mesma ideia à renderização.

---

## 5. Posição, rotação e escala continuam disponíveis

Cada matriz pode combinar todas as transformações:

```javascript
dummy.position.set(x, y, z);
dummy.rotation.set(rx, ry, rz);
dummy.scale.set(sx, sy, sz);
dummy.updateMatrix();
instances.setMatrixAt(index, dummy.matrix);
```

Isso permite desenhar:

* anéis radiais;
* grids;
* partículas geométricas;
* barras repetidas;
* diagramas densos;
* fachadas e módulos repetitivos.

---

## 6. Atualização em tempo real

Você pode atualizar matrizes a cada frame:

```javascript
for (let i = 0; i < count; i += 1) {
  const angle = i / count * Math.PI * 2;

  dummy.position.set(
    Math.cos(angle) * radius,
    Math.sin(angle) * radius,
    0
  );

  dummy.rotation.z = angle;
  dummy.updateMatrix();
  mesh.setMatrixAt(i, dummy.matrix);
}

mesh.instanceMatrix.needsUpdate = true;
```

A geometria permanece a mesma. Só as transformações mudam.

---

## 7. Count pode ser menor que a capacidade

Você pode reservar 500 instâncias e mostrar apenas 120:

```javascript
instances.count = 120;
```

Isso é útil para animações em que elementos aparecem progressivamente sem recriar a estrutura.

---

## 8. Cores por instância

Também é possível definir cores diferentes:

```javascript
instances.setColorAt(index, new THREE.Color(color));
instances.instanceColor.needsUpdate = true;
```

Mas lembre que material e geometria continuam compartilhados.

---

## 9. O que instancing não resolve

`InstancedMesh` não é ideal quando cada objeto precisa de:

* geometria totalmente diferente;
* material diferente;
* hierarquia própria complexa;
* lógica de interação muito específica;
* animação esquelética independente.

O ganho vem justamente da repetição estrutural.

---

## 10. Em React Three Fiber

```jsx
const meshRef = useRef();
const dummy = useMemo(() => new THREE.Object3D(), []);

useFrame(() => {
  if (!meshRef.current) return;

  for (let i = 0; i < count; i += 1) {
    const angle = i / count * Math.PI * 2;
    dummy.position.set(Math.cos(angle) * 2, Math.sin(angle) * 2, 0);
    dummy.rotation.z = angle;
    dummy.updateMatrix();
    meshRef.current.setMatrixAt(i, dummy.matrix);
  }

  meshRef.current.instanceMatrix.needsUpdate = true;
});

return (
  <instancedMesh ref={meshRef} args={[undefined, undefined, 224]}>
    <boxGeometry args={[1, 0.02, 0.02]} />
    <meshBasicMaterial />
  </instancedMesh>
);
```

---

## 11. Evite alocações dentro do frame

Isto é ruim:

```javascript
useFrame(() => {
  for (...) {
    const vector = new THREE.Vector3();
  }
});
```

Você está criando objetos JavaScript repetidamente.

Prefira reutilizar:

```javascript
const dummy = useMemo(() => new THREE.Object3D(), []);
```

A mesma regra vale para vetores, matrizes e quaternions temporários.

---

## 12. Draw calls importam mais que quantidade bruta de triângulos em alguns casos

Uma cena com geometria relativamente simples pode ficar pesada se houver muitos objetos e materiais separados.

Diagnóstico útil:

```javascript
console.log(renderer.info.render.calls);
console.log(renderer.info.render.triangles);
```

`renderer.info` ajuda a entender o custo real da cena.

---

## 13. Instancing e design paramétrico combinam muito bem

Uma família visual pode ser descrita por poucos parâmetros:

```javascript
const state = {
  count: 64,
  radius: 2.1,
  span: Math.PI * 2,
  phase: 0.12
};
```

Cada instância deriva desses parâmetros. Animar a composição significa interpolar o estado, não criar e destruir objetos.

Esse padrão é especialmente eficiente para transições gráficas.

---

## 14. Exemplo completo e integrado

```javascript
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, innerWidth / innerHeight, 0.1, 100);
camera.position.z = 7;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const count = 180;
const geometry = new THREE.BoxGeometry(0.8, 0.018, 0.018);
const material = new THREE.MeshBasicMaterial({ color: 0x171817 });
const mesh = new THREE.InstancedMesh(geometry, material, count);
scene.add(mesh);

const dummy = new THREE.Object3D();

function update(radius, phase) {
  for (let i = 0; i < count; i += 1) {
    const angle = i / count * Math.PI * 2 + phase;
    dummy.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
    dummy.rotation.z = angle + Math.PI / 2;
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;
}

renderer.setAnimationLoop((time) => {
  const seconds = time * 0.001;
  update(2 + Math.sin(seconds) * 0.08, seconds * 0.08);
  renderer.render(scene, camera);
});
```

---

## Resumo para memorizar

`InstancedMesh` é a ferramenta certa quando muitas cópias compartilham geometria e material. Em vez de centenas de `Mesh`, você mantém uma capacidade fixa e atualiza matrizes por índice.

A combinação mais poderosa é: geometria compartilhada + estado paramétrico + matrizes atualizadas com refs. Isso reduz draw calls e mantém animações densas controláveis.