# Composição visual, performance e diagnóstico de cenas 3D

Uma cena pode estar tecnicamente correta e ainda parecer genérica, confusa ou parecida com uma demo de biblioteca. Esse problema não se resolve necessariamente com mais efeitos.

Este artigo conecta Three.js ao olhar de design: câmera, proporção, luz, material, densidade e movimento são decisões de composição antes de serem decisões de código.

Ele parte dos fundamentos de [[javascript/07-threejs/02-Cena, câmera, renderer e coordenadas|câmera e coordenadas]], [[javascript/07-threejs/03-Geometria, material, mesh e luz|materiais e luz]] e [[javascript/07-threejs/04-Loop de renderização, tempo e animação|animação]].

---

## 1. A pergunta mais útil não é "qual efeito falta?"

Quando uma cena parece fraca, investigue nesta ordem:

1. **Composição**: o enquadramento é bom?
2. **Escala**: o objeto ocupa a quantidade certa da tela?
3. **Profundidade**: existe separação espacial perceptível?
4. **Material**: a superfície ajuda a ler a forma?
5. **Luz**: existe direção ou tudo está igualmente iluminado?
6. **Movimento**: existe hierarquia entre o que se move e o que permanece estável?
7. **Performance**: a cena consegue manter movimento suave?

Adicionar bloom, partículas ou shaders antes disso pode apenas maquiar um problema estrutural.

---

## 2. Comece pela câmera

Uma mudança de câmera pode alterar mais o resultado visual do que trocar de geometria.

Compare mentalmente:

```javascript
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100);
camera.position.z = 3;
```

com:

```javascript
const camera = new THREE.PerspectiveCamera(32, aspect, 0.1, 100);
camera.position.z = 8;
```

A primeira configuração tende a exagerar a perspectiva. A segunda tende a comprimir e organizar a cena.

Para um objeto gráfico editorial, vale testar campos de visão menores antes de concluir que o 3D está "sem graça".

---

## 3. Use profundidade com diferença suficiente para ser percebida

Se vários planos possuem diferenças mínimas de `z`, talvez a cena continue parecendo plana.

```javascript
panelA.position.z = 0;
panelB.position.z = -0.1;
panelC.position.z = -0.2;
```

Teste primeiro uma separação mais clara:

```javascript
panelA.position.z = 0.8;
panelB.position.z = 0;
panelC.position.z = -0.8;
```

Depois reduza até encontrar o grau adequado.

Esse procedimento é útil em design: **exagere para entender a variável, depois refine**.

---

## 4. Uma luz clara costuma ensinar mais que cinco luzes

Comece com:

```javascript
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
const key = new THREE.DirectionalLight(0xffffff, 2.5);
key.position.set(4, 6, 5);

scene.add(ambient, key);
```

Depois altere apenas a posição da luz principal.

Se a leitura formal melhora, você identificou uma variável real. Se adicionar novas luzes sem saber o que cada uma faz, fica difícil explicar por que a cena mudou.

---

## 5. Material demais pode destruir a coerência

Em uma composição abstrata, não é obrigatório que cada objeto tenha um material diferente.

Você pode começar com um único material compartilhado:

```javascript
const sharedMaterial = new THREE.MeshStandardMaterial({
  color: 0xe8e8e8,
  roughness: 0.75,
  metalness: 0.05
});
```

E variar principalmente forma, posição e profundidade.

Essa restrição ajuda a distinguir estrutura de acabamento.

---

## 6. Wireframe, grid e partículas são linguagem visual, não prova de qualidade

Esses elementos aparecem com frequência em demos 3D:

* wireframes;
* grades infinitas;
* partículas;
* glow;
* bloom;
* rotação contínua;
* câmera seguindo o cursor;
* objetos flutuando em seno.

Nenhum deles é ruim por definição. O problema surge quando entram como padrão automático sem relação com a direção visual.

Uma cena pode parecer mais sofisticada usando apenas:

* uma forma forte;
* uma câmera bem escolhida;
* uma luz controlada;
* uma transformação lenta.

---

## 7. Movimento precisa de hierarquia

Imagine uma composição com quatro planos.

Em vez de animar todos:

```javascript
panels.forEach((panel, index) => {
  panel.rotation.x = Math.sin(time + index);
  panel.rotation.y = Math.cos(time + index);
  panel.position.z = Math.sin(time * 2 + index);
});
```

você pode animar apenas o grupo:

```javascript
group.rotation.y = Math.sin(time * 0.25) * 0.08;
```

ou uma única relação:

```javascript
frontPanel.position.z = 0.5 + Math.sin(time * 0.4) * 0.08;
```

Isso cria um foco e preserva a composição.

---

## 8. Performance: pixel ratio

Uma das decisões mais simples:

```javascript
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
```

Renderizar no pixel ratio máximo de telas muito densas pode aumentar bastante o número de pixels processados.

Se a cena é decorativa e ocupa uma grande área, uma pequena redução de resolução pode ser visualmente imperceptível e tecnicamente importante.

---

## 9. Performance: geometria

Mais segmentos significam mais vértices.

```javascript
new THREE.SphereGeometry(1, 128, 128);
```

pode ser desnecessário para um objeto pequeno.

Teste:

```javascript
new THREE.SphereGeometry(1, 32, 16);
```

A regra é usar a complexidade necessária para o tamanho e a função visual do objeto.

---

## 10. Performance: sombras

Sombras reais podem ser caras.

Ativar:

```javascript
renderer.shadowMap.enabled = true;
```

não deveria ser automático.

Antes, pergunte se a sombra realmente é parte da direção visual. Muitas cenas abstratas funcionam com iluminação sem shadow maps, ou com soluções visuais mais simples.

---

## 11. Performance: objetos e draw calls

Mil objetos separados podem custar mais do que uma composição visualmente equivalente organizada com técnicas como `InstancedMesh`.

Para começar, o diagnóstico mais importante é simples:

* quantos objetos existem?
* quantos materiais diferentes existem?
* quantas luzes e sombras existem?
* quantas coisas são atualizadas a cada frame?

Não otimize uma cena mínima prematuramente, mas também não peça ao agente para gerar centenas de meshes para criar textura visual sem medir o custo.

---

## 12. Um protocolo de diagnóstico visual

Quando uma cena estiver ruim, congele a animação e faça este teste:

### Etapa 1: fundo neutro

```javascript
scene.background = new THREE.Color(0xf4f4f2);
```

### Etapa 2: um único material

Troque temporariamente todos os materiais por um material simples.

### Etapa 3: uma câmera fixa

Desative interação de cursor e movimentos de câmera.

### Etapa 4: uma única luz principal

Reduza a iluminação.

### Etapa 5: analise a silhueta

Se a composição continua fraca parada, o problema provavelmente não é a animação.

### Etapa 6: reintroduza uma variável por vez

Adicione material, depois movimento, depois interação.

Isso transforma "está feio" em um problema investigável.

---

## 13. Exemplo completo e integrado

```javascript
import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf4f3ef);

const camera = new THREE.PerspectiveCamera(
  32,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(4.5, 3.2, 9);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

const group = new THREE.Group();
scene.add(group);

const material = new THREE.MeshStandardMaterial({
  color: 0xe1e1df,
  roughness: 0.72,
  metalness: 0.04
});

for (let i = 0; i < 4; i += 1) {
  const geometry = new THREE.BoxGeometry(1.6, 2.2, 0.12);
  const panel = new THREE.Mesh(geometry, material);

  panel.position.x = (i - 1.5) * 1.3;
  panel.position.z = (1.5 - i) * 0.45;
  panel.rotation.y = (i - 1.5) * 0.08;

  group.add(panel);
}

scene.add(new THREE.AmbientLight(0xffffff, 0.75));

const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
keyLight.position.set(5, 7, 6);
scene.add(keyLight);

function animate(time) {
  const seconds = time * 0.001;
  group.rotation.y = Math.sin(seconds * 0.25) * 0.05;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
```

O exemplo é propositalmente limitado. A experiência visual vem da relação entre câmera, profundidade, repetição, material e luz.

---

## 14. Como dirigir um agente de código

Em vez de pedir:

> deixe o 3D mais legal

prefira identificar a variável:

> mantenha toda a geometria atual. Reduza o `fov` da câmera de 55 para 32, afaste a câmera o suficiente para preservar o enquadramento e remova todos os movimentos individuais dos painéis. Deixe apenas uma rotação do grupo no eixo Y com amplitude máxima de 0.05 radianos.

Quanto melhor você entende a cena, menor precisa ser o prompt e menor é a chance de o agente reconstruir tudo.

---

## Fontes principais

* [Three.js tips](https://discoverthreejs.com/tips-and-tricks/)
* [Three.js responsive design](https://threejs.org/manual/en/responsive.html)
* [Three.js optimizing lots of objects](https://threejs.org/manual/en/optimize-lots-of-objects.html)
* [WebGLRenderer](https://threejs.org/docs/#WebGLRenderer)

---

## Resumo para memorizar

Uma cena visualmente boa depende primeiro de **composição, câmera, escala, profundidade, material, luz e hierarquia de movimento**. Efeitos entram depois. Para diagnosticar, simplifique a cena até sobrar a estrutura e reintroduza uma variável por vez. Performance começa por pixel ratio, complexidade geométrica, quantidade de objetos, materiais, sombras e trabalho realizado a cada frame.