# Picking, raycasting, seleção e drag em Three.js

Depois de aprender a gerar muitos elementos proceduralmente em [[javascript/07-threejs/20-Partículas, curvas, campos e geometria procedural em Three.js|partículas, curvas, campos e geometria procedural]], surge um novo problema: **como transformar uma cena 3D em uma interface que responde com precisão ao usuário?**

É aqui que entram picking, raycasting, seleção, hover, drag e estratégias de interação em escala.

Uma analogia útil com design é pensar na cena 3D como uma interface semântica invisível. O usuário enxerga pixels, mas a aplicação precisa descobrir qual objeto está “por baixo” do cursor, em que ponto do espaço ele foi atingido e o que fazer com esse resultado.

Este artigo aprofunda [[javascript/07-threejs/05-Interação, raycasting e relação com o DOM|interação, raycasting e relação com o DOM]], [[javascript/07-threejs/09-Transformações locais, globais e hierarquia em Three.js|transformações locais e globais]], [[javascript/07-threejs/11-InstancedMesh e desenho eficiente de muitas formas|InstancedMesh]] e [[javascript/07-threejs/13-Câmera, projeção e leitura espacial em Three.js|câmera e projeção]].

---

## 1. Picking é descobrir qual elemento visual o usuário apontou

No DOM, o navegador já sabe qual elemento recebeu um clique.

Em uma cena 3D, o canvas é normalmente um único elemento HTML. O navegador sabe que o clique aconteceu no canvas, mas não sabe qual mesh da cena foi escolhida.

Por isso precisamos fazer picking.

O fluxo mental é:

`cursor na tela → coordenadas normalizadas → raio pela câmera → interseções → objeto escolhido`

---

## 2. Coordenadas do cursor não estão no mesmo espaço da cena

Eventos de ponteiro fornecem coordenadas em pixels.

O raycaster espera coordenadas normalizadas de dispositivo, ou NDC, no intervalo de `-1` a `1`.

```javascript
const pointer = new THREE.Vector2();

pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
```

Se o canvas não ocupa a tela inteira, use o retângulo real do elemento.

```javascript
const rect = renderer.domElement.getBoundingClientRect();

pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
```

Esse detalhe evita um dos bugs mais comuns: o raycast parece “deslocado” do cursor.

---

## 3. O raycaster transforma a câmera em uma linha de consulta

O padrão básico é:

```javascript
const raycaster = new THREE.Raycaster();
raycaster.setFromCamera(pointer, camera);
```

O raio começa na câmera e atravessa o ponto projetado pelo cursor.

Depois consultamos objetos:

```javascript
const hits = raycaster.intersectObjects(objects, true);
```

O array vem ordenado por distância.

Na maior parte dos casos, o primeiro item é o objeto visível mais próximo da câmera.

---

## 4. Uma interseção carrega mais do que o objeto

Um resultado de raycast pode conter:

* `object`: objeto atingido;
* `point`: ponto da interseção em coordenadas globais;
* `distance`: distância ao início do raio;
* `face`: face atingida, quando aplicável;
* `uv`: coordenada UV do ponto;
* `instanceId`: índice da instância em `InstancedMesh`;
* informações específicas do tipo de geometria.

Exemplo:

```javascript
const hit = hits[0];

console.log(hit.object);
console.log(hit.point);
console.log(hit.uv);
```

Isso permite que a interação use dados espaciais, não apenas um identificador visual.

---

## 5. O objeto atingido nem sempre é o objeto semântico

Em cenas complexas, uma entidade visual pode ser composta por várias meshes.

Um produto pode ter:

* corpo;
* tampa;
* rótulo;
* sombra auxiliar;
* peças internas.

O raycaster retorna a mesh atingida, mas a aplicação pode querer selecionar o produto inteiro.

Uma solução é subir pela hierarquia até encontrar uma marca semântica.

```javascript
function findSelectable(object) {
  let current = object;

  while (current) {
    if (current.userData.selectable) return current;
    current = current.parent;
  }

  return null;
}
```

A regra importante é: **picking físico e seleção semântica são etapas diferentes**.

---

## 6. `userData` pode conectar geometria e domínio

Objetos Three.js podem guardar metadados:

```javascript
mesh.userData = {
  selectable: true,
  productId: "chair-07",
  type: "product"
};
```

Isso cria uma ponte entre cena e aplicação sem depender do nome visual da mesh.

Evite transformar `userData` em um depósito de estado mutável complexo. Use-o principalmente para identidade e metadados de cena.

---

## 7. Hover é uma máquina de estado pequena

Hover não é apenas executar código em `pointermove`.

Você precisa saber:

* qual objeto estava ativo antes;
* qual está sob o cursor agora;
* quando entrou;
* quando saiu;
* se vale recalcular a cada movimento.

```javascript
let hovered = null;

function updateHover(next) {
  if (next === hovered) return;

  if (hovered) hovered.userData.hovered = false;
  if (next) next.userData.hovered = true;

  hovered = next;
}
```

Essa separação reduz flicker e atualizações redundantes.

---

## 8. Seleção não é a mesma coisa que hover

Hover é transitório.

Seleção normalmente persiste até outra ação.

Um modelo simples:

```javascript
let selected = null;

function select(object) {
  selected = object;
}
```

Em uma aplicação React, essa identidade persistente geralmente pertence ao estado da aplicação, enquanto efeitos visuais de hover por frame podem permanecer em refs ou estado local de cena.

---

## 9. Raycast em toda a cena pode escalar mal

Isto é conveniente:

```javascript
raycaster.intersectObjects(scene.children, true);
```

Mas pode ser desnecessariamente caro.

Em cenas grandes, mantenha uma coleção explícita de objetos interativos:

```javascript
const pickables = [];
```

E consulte apenas esse conjunto:

```javascript
raycaster.intersectObjects(pickables, false);
```

A primeira otimização de picking é quase sempre **não testar objetos que nunca podem ser escolhidos**.

---

## 10. Layers podem filtrar o raycast

`Layers` permite separar subconjuntos lógicos.

```javascript
mesh.layers.set(1);
raycaster.layers.set(1);
```

Agora o raycaster ignora objetos fora dessa layer.

Isso é útil para:

* gizmos;
* objetos de edição;
* elementos de UI 3D;
* decoração não interativa;
* modos diferentes da aplicação.

---

## 11. Bounding volumes reduzem trabalho

Raycasting em meshes geralmente começa por testes de bounding volumes antes de chegar aos triângulos.

Por isso é importante manter bounds coerentes quando a geometria muda.

```javascript
geometry.computeBoundingSphere();
geometry.computeBoundingBox();
```

Em geometrias procedurais deformadas na CPU, bounds antigos podem fazer o picking falhar ou custar mais do que o necessário.

---

## 12. InstancedMesh muda a identidade do objeto

Em `InstancedMesh`, todas as instâncias compartilham geometria e material.

O resultado de raycast usa `instanceId`:

```javascript
const hit = raycaster.intersectObject(instancedMesh)[0];

if (hit) {
  console.log(hit.instanceId);
}
```

Esse índice precisa ser mapeado para o domínio da aplicação.

```javascript
const items = [
  { id: "a" },
  { id: "b" },
  { id: "c" }
];

const item = items[hit.instanceId];
```

O ganho de renderização do instancing não elimina a necessidade de uma camada de identidade.

---

## 13. Pontos e linhas precisam de tolerância

Raycasting em `Points` e `Line` não funciona como em triângulos sólidos.

Você pode ajustar o threshold:

```javascript
raycaster.params.Points.threshold = 0.1;
raycaster.params.Line.threshold = 0.05;
```

O valor deve fazer sentido na escala do mundo.

Um threshold enorme faz elementos distantes parecerem clicáveis. Um threshold minúsculo transforma a interação em teste de precisão.

---

## 14. Drag precisa converter movimento de tela em movimento espacial

O cursor se move em 2D, mas o objeto existe em 3D.

Portanto arrastar exige uma regra sobre **em qual superfície ou eixo o objeto pode se mover**.

Sem essa regra, o problema é subdeterminado: um único pixel da tela corresponde a uma linha inteira no espaço.

---

## 15. Drag em um plano

Uma estratégia comum é criar um plano matemático de movimento.

```javascript
const dragPlane = new THREE.Plane(
  new THREE.Vector3(0, 1, 0),
  0
);

const target = new THREE.Vector3();
raycaster.ray.intersectPlane(dragPlane, target);
```

Agora o ponteiro define um ponto concreto naquele plano.

Esse padrão funciona bem para:

* mover objetos sobre chão;
* organizar peças em uma mesa;
* editores 3D simplificados;
* interfaces espaciais com plano dominante.

---

## 16. Preserve o offset do clique

Se você mover diretamente o centro do objeto para o ponto do raycast, ele “salta” para baixo do cursor.

Calcule o deslocamento no início do drag:

```javascript
const offset = new THREE.Vector3();

offset.copy(hit.point).sub(selected.position);
```

Durante o movimento:

```javascript
selected.position.copy(target).sub(offset);
```

Isso preserva o ponto onde o usuário realmente segurou o objeto.

---

## 17. Drag por eixo exige projeção diferente

Às vezes o usuário só pode mover em `x`, `y` ou `z`.

Nesse caso, use uma restrição explícita, como uma linha, plano auxiliar ou gizmo.

A lógica de UX deve vir antes da matemática:

* qual grau de liberdade existe?;
* qual feedback mostra essa restrição?;
* o movimento deve ocorrer no espaço global ou local?;
* existe snapping?

O erro comum é implementar movimento livre e tentar impor a regra depois.

---

## 18. Espaço global e espaço local importam no drag

Se um objeto está dentro de um grupo transformado, `hit.point` está em espaço global.

Mas `object.position` está no espaço local do pai.

Converta antes de atribuir:

```javascript
const localPoint = parent.worldToLocal(target.clone());
object.position.copy(localPoint);
```

Esse é um caso clássico em que o drag parece “andar torto” porque os espaços foram misturados.

---

## 19. Pointer capture ajuda a manter continuidade

Durante drag, o ponteiro pode sair do canvas ou passar sobre outros elementos.

No DOM, `setPointerCapture` ajuda a manter o fluxo:

```javascript
canvas.setPointerCapture(event.pointerId);
```

E ao terminar:

```javascript
canvas.releasePointerCapture(event.pointerId);
```

Isso torna a interação mais robusta em mouse, caneta e touch.

---

## 20. Clique e drag não devem ser confundidos

Um pequeno movimento involuntário não deve necessariamente cancelar um clique.

Você pode registrar a posição inicial e usar um limiar em pixels:

```javascript
const dx = event.clientX - startX;
const dy = event.clientY - startY;
const distance = Math.hypot(dx, dy);

const isDrag = distance > 4;
```

Isso evita interfaces em que qualquer tremor do mouse dispara comportamento de arrastar.

---

## 21. Oclusão também é regra de interação

O raycaster retorna interseções ordenadas por distância.

Se um objeto invisível ou auxiliar está na frente, ele pode bloquear o objeto que o usuário enxerga.

Por isso objetos técnicos devem ser:

* removidos da lista de pickables;
* colocados em outra layer;
* marcados para filtragem;
* ou configurados para não participar do picking.

A geometria invisível ainda pode ser interativa se você não definir uma política explícita.

---

## 22. Seleção por área exige outra estratégia

Raycasting resolve bem um ponto do cursor.

Mas seleção por retângulo, laço ou viewport inteiro pede técnicas diferentes.

Possibilidades:

* projetar bounding volumes para screen space;
* usar frustum selection;
* construir um volume de seleção;
* GPU picking em casos muito grandes.

O modelo muda de “qual raio atingiu?” para “quais objetos pertencem a esta região?”.

---

## 23. GPU picking

Em cenas enormes, testar muitos objetos na CPU pode se tornar caro.

Uma alternativa é renderizar uma cena auxiliar em que cada objeto recebe uma cor/ID único, ler o pixel sob o cursor e converter esse valor de volta para uma entidade.

Conceitualmente:

`objeto → ID codificado → render target → pixel → ID da entidade`

Essa técnica troca custo de interseção geométrica por uma passagem de renderização e leitura de pixel.

Ela só vale a pena quando o profiling mostra que o raycasting convencional realmente virou gargalo.

---

## 24. Throttle e eventos de movimento

`pointermove` pode disparar muitas vezes por segundo.

Nem toda aplicação precisa fazer raycast em cada evento.

Uma estratégia é guardar a última posição e processar no próximo frame:

```javascript
let pointerDirty = false;

canvas.addEventListener("pointermove", event => {
  updatePointer(event);
  pointerDirty = true;
});

function animate() {
  if (pointerDirty) {
    updatePicking();
    pointerDirty = false;
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
```

Isso sincroniza picking com a taxa real de renderização.

---

## 25. React Three Fiber já traduz eventos para objetos 3D

R3F oferece eventos declarativos:

```jsx
<mesh
  onPointerOver={() => setHovered(true)}
  onPointerOut={() => setHovered(false)}
  onClick={() => setSelected(true)}
>
  <boxGeometry />
  <meshStandardMaterial />
</mesh>
```

Internamente, o sistema usa raycasting e propagação de eventos.

Isso não elimina o modelo mental. Apenas automatiza parte da infraestrutura.

---

## 26. Propagação de eventos em R3F

Eventos podem atravessar a hierarquia e também considerar múltiplas interseções.

Quando necessário:

```jsx
onPointerDown={event => {
  event.stopPropagation();
}}
```

Use `stopPropagation()` quando existe uma razão semântica clara para impedir interação com objetos atrás ou ancestrais.

Evite espalhá-lo em toda a cena sem entender a ordem dos eventos.

---

## 27. Drag em R3F com plano matemático

Um padrão simples usa `useThree`, ray e plane.

```jsx
const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const point = new THREE.Vector3();

function handlePointerMove(event) {
  event.ray.intersectPlane(plane, point);
  ref.current.position.copy(point);
}
```

Para produção, preserve offset, estado de drag e conversão entre espaço global/local.

---

## 28. Estado visual e estado de aplicação continuam separados

Um objeto pode ter:

* `hovered`: estado visual transitório;
* `dragging`: estado de interação;
* `selectedId`: identidade persistente da aplicação;
* `position`: estado espacial;
* `productId`: identidade de domínio.

Misturar todos esses conceitos em um único objeto costuma gerar acoplamento.

A arquitetura da [[javascript/07-threejs/16-Arquitetura avançada de React Three Fiber para cenas complexas|Fase 5]] continua útil aqui.

---

## 29. Feedback visual precisa confirmar a interação

Uma boa interação espacial mostra:

* o que está sob o cursor;
* o que está selecionado;
* quando o drag começou;
* onde o objeto pode ser solto;
* se existe snapping ou restrição;
* se uma ação falhou.

O feedback pode usar material, outline, escala, gizmo, cursor do DOM ou overlay HTML.

Interação precisa não compensa feedback ambíguo.

---

## 30. Antipadrões comuns

### Raycast na cena inteira a cada movimento

Testa objetos que nunca seriam interativos.

### Usar nome da mesh como identidade de negócio

Quebra quando o asset muda.

### Misturar coordenadas globais e locais

Produz saltos e movimentos aparentemente aleatórios.

### Mover o centro do objeto direto para o cursor

Faz o objeto pular no início do drag.

### Tratar hover como seleção

Apaga a diferença entre estado transitório e persistente.

### Resolver performance antes de medir

GPU picking e estruturas espaciais aumentam complexidade. Só entram quando o profiling justificar.

---

## 31. Exemplo completo em Three.js

```javascript
import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 6, 8);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.HemisphereLight(0xffffff, 0x222233, 2));

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(12, 12),
  new THREE.MeshStandardMaterial({ color: 0x252525 })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const pickables = [];

for (let i = 0; i < 6; i += 1) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0x888888 })
  );

  mesh.position.set((i - 2.5) * 1.4, 0.5, 0);
  mesh.userData.selectable = true;
  mesh.userData.id = `box-${i}`;

  scene.add(mesh);
  pickables.push(mesh);
}

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const dragPoint = new THREE.Vector3();
const dragOffset = new THREE.Vector3();

let selected = null;
let hovered = null;
let dragging = false;

function updatePointer(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
}

renderer.domElement.addEventListener("pointermove", event => {
  updatePointer(event);

  if (dragging && selected) {
    if (raycaster.ray.intersectPlane(dragPlane, dragPoint)) {
      selected.position.copy(dragPoint).sub(dragOffset);
      selected.position.y = 0.5;
    }
    return;
  }

  const hit = raycaster.intersectObjects(pickables, false)[0];
  const next = hit?.object ?? null;

  if (hovered !== next) {
    if (hovered) hovered.material.emissive.setHex(0x000000);
    if (next) next.material.emissive.setHex(0x222222);
    hovered = next;
  }
});

renderer.domElement.addEventListener("pointerdown", event => {
  updatePointer(event);

  const hit = raycaster.intersectObjects(pickables, false)[0];
  if (!hit) return;

  selected = hit.object;
  dragging = true;
  dragOffset.copy(hit.point).sub(selected.position);
  renderer.domElement.setPointerCapture(event.pointerId);
});

renderer.domElement.addEventListener("pointerup", event => {
  dragging = false;
  if (renderer.domElement.hasPointerCapture(event.pointerId)) {
    renderer.domElement.releasePointerCapture(event.pointerId);
  }
});

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", resize);

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
```

O exemplo separa quatro responsabilidades: conversão do ponteiro, picking, estado de interação e movimento restrito a um plano.

---

## 32. Exemplo completo em React Three Fiber

```jsx
"use client";

import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";

function DraggableBox({ position, id }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);

  const plane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
    []
  );

  const point = useMemo(() => new THREE.Vector3(), []);
  const offset = useMemo(() => new THREE.Vector3(), []);

  return (
    <mesh
      ref={ref}
      position={position}
      userData={{ id, selectable: true }}
      onPointerOver={event => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onPointerDown={event => {
        event.stopPropagation();
        event.target.setPointerCapture(event.pointerId);
        offset.copy(event.point).sub(ref.current.position);
        setDragging(true);
      }}
      onPointerMove={event => {
        if (!dragging) return;
        event.stopPropagation();

        if (event.ray.intersectPlane(plane, point)) {
          ref.current.position.copy(point).sub(offset);
          ref.current.position.y = 0.5;
        }
      }}
      onPointerUp={event => {
        event.stopPropagation();
        event.target.releasePointerCapture(event.pointerId);
        setDragging(false);
      }}
    >
      <boxGeometry />
      <meshStandardMaterial
        color={hovered ? "#bbbbbb" : "#777777"}
        emissive={dragging ? "#333333" : "#000000"}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <hemisphereLight intensity={2} />

      <DraggableBox id="box-a" position={[-1.4, 0.5, 0]} />
      <DraggableBox id="box-b" position={[0, 0.5, 0]} />
      <DraggableBox id="box-c" position={[1.4, 0.5, 0]} />

      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#252525" />
      </mesh>
    </>
  );
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 6, 8], fov: 45 }}>
      <Scene />
    </Canvas>
  );
}
```

No R3F, o sistema de eventos simplifica o raycasting, mas drag ainda exige decidir o plano, preservar offset e separar estado transitório de identidade persistente.

---

## 33. Diagnóstico por camada

Quando a interação parece errada, verifique em ordem:

1. o cursor foi convertido usando o retângulo real do canvas?;
2. a câmera usada no raycast é a câmera ativa?;
3. o objeto faz parte da coleção ou layer interativa?;
4. o hit retorna a mesh esperada ou apenas uma peça filha?;
5. a identidade semântica foi separada da mesh física?;
6. o movimento usa espaço global ou local corretamente?;
7. existe um plano/eixo explícito para o drag?;
8. o offset inicial foi preservado?;
9. objetos invisíveis estão bloqueando o raio?;
10. o problema é precisão, semântica ou performance?

Essa sequência evita tentar corrigir matemática quando o erro é de hierarquia ou identidade.

---

## 34. Critério para escolher a estratégia

Use raycasting convencional para a maioria das interfaces 3D.

Use uma lista reduzida ou layers quando apenas parte da cena é interativa.

Use `instanceId` quando a cena usa `InstancedMesh`.

Use thresholds específicos para linhas e pontos.

Use planos ou eixos para transformar movimento 2D em drag espacial previsível.

Considere GPU picking ou estruturas espaciais avançadas somente depois que profiling mostrar que o picking na CPU é um gargalo real.

A próxima fase vai aprofundar exatamente essa medição: distinguir custo de CPU, GPU, draw calls, memória, pixels e gargalos de pipeline antes de otimizar.

---

## Resumo para memorizar

Picking transforma uma posição 2D do ponteiro em uma consulta espacial. O raycaster produz interseções físicas, mas a aplicação ainda precisa convertê-las em entidades semânticas. Hover, seleção e drag são estados diferentes; drag exige uma restrição espacial explícita; e cenas grandes precisam reduzir o conjunto de objetos testados antes de recorrer a soluções mais sofisticadas.

A cadeia principal é: **ponteiro → NDC → raycaster → interseção → entidade semântica → estado de interação → feedback visual**. Para drag, acrescente **plano/eixo → conversão de espaço → posição final**. Em performance, comece filtrando pickables e medindo custo antes de migrar para GPU picking ou estruturas mais complexas.