# Perspectiva forçada, oclusão e objetos impossíveis em Three.js

Algumas composições parecem impossíveis não porque a geometria 3D seja literalmente impossível, mas porque a câmera recebe uma combinação cuidadosamente preparada de projeção, profundidade e oclusão. O resultado é uma imagem coerente em 2D e contraditória em 3D.

Este artigo aprofunda [[javascript/07-threejs/13-Câmera, projeção e leitura espacial em Three.js|câmera, projeção e leitura espacial]], [[javascript/07-threejs/09-Transformações locais, globais e hierarquia em Three.js|transformações locais e globais]] e [[javascript/07-threejs/10-BufferGeometry e geometria paramétrica em Three.js|geometria paramétrica]].

---

## 1. O impossível acontece na imagem

Um objeto impossível é melhor entendido como um problema de projeção.

Pense em uma ilustração editorial: você não precisa construir um objeto fisicamente realizável. Precisa construir uma imagem em que cada pedaço pareça conectado ao seguinte, mesmo que essas conexões sejam incompatíveis quando vistas no espaço tridimensional.

Em Three.js, isso desloca a pergunta de:

> como construir um objeto impossível em 3D?

para:

> como posicionar peças 3D para que, de uma câmera específica, a projeção 2D produza uma leitura impossível?

---

## 2. Silhueta vem antes da profundidade

Antes de ajustar `z`, resolva a organização projetada em `x` e `y`.

Uma composição precisa ter:

* silhueta clara;
* circulação visual legível;
* encontros entre peças bem posicionados;
* espaço negativo central coerente;
* quantidade controlada de cruzamentos.

Se a projeção 2D já parece confusa, adicionar profundidade não costuma corrigir o problema.

---

## 3. Três encontros, três relações de profundidade

Uma estrutura impossível clássica pode exigir relações cíclicas como:

* A passa na frente de B;
* B passa na frente de C;
* C passa na frente de A.

Esse ciclo é contraditório como ordem global de profundidade, mas pode ser produzido localmente em encontros diferentes.

O segredo é não procurar uma única ordem `A > B > C` para o objeto inteiro. Cada encontro pode depender de peças específicas com valores de `z` próprios.

---

## 4. Oclusão local em vez de módulo rígido

Se cada módulo precisa permanecer rígido, você reduz muito o espaço de solução.

Para composições dirigidas pela câmera, pode ser melhor manter a identidade das peças, mas permitir que cada uma tenha transformações próprias:

```javascript
const pieceState = {
  position: new THREE.Vector3(),
  rotation: new THREE.Euler(),
  scale: new THREE.Vector3(1, 1, 1)
};
```

Assim, duas peças que pertencem ao mesmo grupo conceitual podem receber profundidades ou pequenas rotações diferentes no estado final.

---

## 5. Sweet spot da câmera

A ilusão normalmente funciona em um intervalo pequeno de posições da câmera.

Esse ponto de vista é o sweet spot.

Ele pode depender de:

* posição da câmera;
* `fov`;
* alvo do `lookAt`;
* roll;
* distância entre os planos das peças.

Mover a câmera demais pode desmontar a ilusão imediatamente. Por isso, em cenas narrativas, a câmera deve ser dirigida, não livre.

---

## 6. Projeção como ferramenta de medição

Você pode medir a posição em tela de terminais importantes:

```javascript
const worldPoint = object.localToWorld(localPoint.clone());
const projected = worldPoint.clone().project(camera);
```

Dois pontos podem estar separados no espaço, mas quase coincidir na tela.

Para medir a distância projetada:

```javascript
const dx = projectedA.x - projectedB.x;
const dy = projectedA.y - projectedB.y;
const screenDistance = Math.hypot(dx, dy);
```

Isso é útil quando duas pontas precisam parecer conectadas sem realmente se tocar em 3D.

---

## 7. Conexão aparente não exige conexão física

Um erro frequente é tentar fazer todos os terminais coincidirem em coordenadas 3D.

Em perspectiva forçada, o critério importante pode ser apenas a coincidência projetada.

Duas peças podem ter:

```text
mesmo x e y projetados
z diferentes
```

O observador percebe continuidade visual, enquanto a separação em profundidade permite controlar qual peça aparece na frente.

---

## 8. Z não é apenas distância

Usar `z` apenas como um eixo de organização global pode ser insuficiente.

Você também pode inclinar peças em `x` e `y`:

```javascript
mesh.rotation.x = 0.18;
mesh.rotation.y = -0.12;
```

Isso altera:

* largura aparente;
* orientação das faces;
* posição projetada das extremidades;
* relação entre contorno frontal e lateral.

Pequenas inclinações podem resolver encontros que apenas mover em `z` não resolve.

---

## 9. Depth buffer e oclusão real

Quando materiais opacos normais são usados, o depth buffer já determina qual fragmento fica visível.

Isso é preferível a falsificar a ilusão com transparência ou máscaras quando a composição pode ser resolvida geometricamente.

Mas o depth buffer só entende profundidade física local. A contradição global vem do fato de cada encontro usar peças diferentes e relações diferentes.

---

## 10. Z-fighting

Quando duas superfícies ficam quase no mesmo plano, podem aparecer padrões tremidos ou instáveis.

Esse fenômeno é z-fighting.

Evite diferenças minúsculas sem intenção:

```javascript
meshA.position.z = 0;
meshB.position.z = 0.000001;
```

Prefira separações suficientes para o depth buffer distinguir os planos, respeitando a escala da cena e os valores de `near` e `far`.

---

## 11. Ordem de resolução

Uma sequência eficiente para resolver uma composição impossível é:

1. definir a silhueta 2D desejada;
2. posicionar os encontros em tela;
3. escolher a câmera inicial;
4. resolver a relação de oclusão de cada encontro;
5. ajustar `z`, rotação e pequenos offsets por peça;
6. validar novamente a silhueta;
7. só então animar a entrada nesse estado.

Não comece pela animação.

---

## 12. Debug por camadas

Quando o objeto não lê corretamente, isole o problema.

Primeiro, desenhe apenas as linhas centrais das peças. Depois, adicione volume. Em seguida, adicione contornos e materiais.

Você também pode colorir temporariamente cada grupo:

```javascript
const debugMaterials = {
  A: new THREE.MeshBasicMaterial({ color: 0xff5555 }),
  B: new THREE.MeshBasicMaterial({ color: 0x55ff55 }),
  C: new THREE.MeshBasicMaterial({ color: 0x5555ff })
};
```

O objetivo não é estética. É enxergar quem está passando na frente de quem.

---

## 13. Não confunda loop fechado com circulação impossível

Uma composição pode parecer apenas um polígono ou um laço fechado se os encontros forem resolvidos como conexões normais.

Para criar leitura impossível, cada encontro precisa contribuir para uma contradição perceptiva.

O centro negativo também ajuda. Um vazio triangular, estrelado ou assimétrico pode reforçar a circulação visual sem exigir geometria adicional.

---

## 14. A câmera também pode animar a revelação

Antes do sweet spot, a estrutura pode parecer simplesmente tridimensional.

Durante a transição, a câmera pode fazer um pequeno arco até a posição em que as coincidências projetadas se alinham.

```javascript
camera.position.lerpVectors(startPosition, endPosition, progress);
```

Isso permite que a ilusão seja descoberta, em vez de aparecer pronta.

---

## 15. Quando usar geometria customizada

`BoxGeometry` pode ser suficiente para testes rápidos.

Mas, se você precisa de junções precisas, contornos consistentes ou ribbons com largura controlada, [[javascript/07-threejs/10-BufferGeometry e geometria paramétrica em Three.js|BufferGeometry]] pode ser mais adequada.

A geometria customizada não resolve a composição por si só. Ela melhora a precisão depois que a topologia visual já está funcionando.

---

## 16. Exemplo completo e integrado

O exemplo abaixo cria três barras em profundidades diferentes e mede dois terminais projetados. Ele não produz sozinho um objeto impossível completo, mas demonstra o mecanismo fundamental de coincidência em tela com separação espacial.

```javascript
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(28, innerWidth / innerHeight, 0.1, 50);
camera.position.set(0.4, 0.25, 8);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const material = new THREE.MeshNormalMaterial();

function createBar(x, y, z, rotationZ) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 0.22, 0.22),
    material
  );

  mesh.position.set(x, y, z);
  mesh.rotation.z = rotationZ;
  scene.add(mesh);
  return mesh;
}

const barA = createBar(-0.7, 0.45, 0.25, Math.PI / 3);
const barB = createBar(0.7, 0.45, -0.15, -Math.PI / 3);
const barC = createBar(0, -0.65, 0.08, 0);

function projectEndpoint(mesh, localX) {
  mesh.updateMatrixWorld(true);
  const world = mesh.localToWorld(new THREE.Vector3(localX, 0, 0));
  return world.project(camera);
}

function render() {
  const a = projectEndpoint(barA, 1.2);
  const b = projectEndpoint(barB, -1.2);

  const projectedDistance = Math.hypot(a.x - b.x, a.y - b.y);
  console.log("distância projetada entre terminais:", projectedDistance);

  renderer.render(scene, camera);
}

render();
```

O próximo passo seria ajustar transformações até os encontros projetados coincidirem e, depois, atribuir relações de profundidade diferentes para cada região de cruzamento.

---

## Resumo para memorizar

Objetos impossíveis em Three.js são principalmente problemas de projeção e oclusão. Resolva primeiro a silhueta e os encontros em 2D, depois use profundidade, rotação e uma câmera dirigida para construir as contradições locais.

Não procure uma ordem global de profundidade quando a ilusão exige um ciclo como `A sobre B`, `B sobre C`, `C sobre A`. Preserve a identidade das peças, mas permita transformações por peça quando necessário. Valide o estado estático antes de animar.