# Partículas, curvas, campos e geometria procedural em Three.js

Depois de aprender a compor uma cena pronta com [[javascript/07-threejs/19-Post-processing, render targets, depth e stencil em Three.js|post-processing, render targets, depth e stencil]], surge uma mudança importante de pergunta: **e quando a forma visual não existe pronta e precisa ser gerada por regras?**

É aqui que entram sistemas procedurais.

Em vez de modelar manualmente cada elemento, você define uma lógica capaz de produzir muitos elementos, trajetórias, superfícies ou comportamentos. A analogia com design é pensar na diferença entre desenhar cem pontos individualmente e criar um componente com Auto Layout, regras de espaçamento e parâmetros que geram os cem pontos automaticamente.

Em Three.js, sistemas procedurais aparecem principalmente em quatro famílias:

* partículas;
* curvas e trajetórias;
* campos que influenciam movimento;
* geometria gerada por código.

Este artigo conecta [[javascript/07-threejs/10-BufferGeometry e geometria paramétrica em Three.js|BufferGeometry e geometria paramétrica]], [[javascript/07-threejs/11-InstancedMesh e desenho eficiente de muitas formas|InstancedMesh]], [[javascript/07-threejs/12-Shaders, GLSL e materiais customizados|shaders]] e [[javascript/07-threejs/04-Loop de renderização, tempo e animação|loop de animação]].

---

## 1. Procedural significa regra em vez de desenho manual

Uma forma procedural não é necessariamente aleatória.

Ela é produzida por uma função, algoritmo ou conjunto de parâmetros.

Por exemplo:

```javascript
const y = Math.sin(x) * 2;
```

Essa regra já descreve uma curva inteira sem armazenar manualmente todos os pontos possíveis.

O mesmo princípio pode gerar:

* uma nuvem de partículas;
* uma espiral;
* um terreno;
* uma fita;
* uma linha orgânica;
* uma distribuição de objetos;
* um sistema de movimento coletivo.

A ideia central é: **parâmetros entram, estrutura visual sai**.

---

## 2. Sistema procedural não é a mesma coisa que animação

Uma cena pode ser procedural e estática.

Exemplo: gerar uma montanha aleatória uma única vez.

Uma cena também pode ser animada sem ser procedural.

Exemplo: mover manualmente um cubo entre duas posições.

Quando combinamos os dois, temos um sistema no qual as regras continuam produzindo ou atualizando estados ao longo do tempo.

---

## 3. CPU e GPU resolvem partes diferentes do problema

Em sistemas pequenos, a CPU pode calcular posições e atualizar atributos.

Em sistemas grandes, isso pode ficar caro.

Uma divisão útil é:

* **CPU**: inicialização, regras de alto nível, poucos elementos, lógica irregular;
* **GPU**: atualização massiva e paralela, efeitos por vértice, milhões de cálculos semelhantes.

Não existe uma fronteira fixa. O objetivo é evitar enviar trabalho repetitivo para JavaScript quando a GPU pode executá-lo em paralelo.

---

## 4. Partículas com `THREE.Points`

Uma partícula simples pode ser representada como um vértice.

Com `THREE.Points`, milhares de pontos podem compartilhar a mesma geometria e material.

```javascript
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array([
  -1, 0, 0,
   0, 1, 0,
   1, 0, 0
]);

geometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const material = new THREE.PointsMaterial({
  size: 0.08,
  color: 0xffffff
});

const points = new THREE.Points(geometry, material);
scene.add(points);
```

A geometria armazena posições; o material decide como cada ponto aparece.

---

## 5. Gerar muitas partículas na inicialização

Uma distribuição aleatória pode ser criada uma vez:

```javascript
const count = 5000;
const positions = new Float32Array(count * 3);

for (let i = 0; i < count; i++) {
  const i3 = i * 3;

  positions[i3] = (Math.random() - 0.5) * 10;
  positions[i3 + 1] = (Math.random() - 0.5) * 10;
  positions[i3 + 2] = (Math.random() - 0.5) * 10;
}
```

Isso já produz uma nuvem procedural.

Mas aleatoriedade pura costuma parecer ruído. Sistemas visualmente fortes normalmente combinam acaso com uma estrutura.

---

## 6. Aleatoriedade com intenção

Em vez de distribuir tudo uniformemente, você pode controlar densidade, raio ou direção.

Para uma distribuição circular:

```javascript
const angle = Math.random() * Math.PI * 2;
const radius = Math.sqrt(Math.random()) * 5;

const x = Math.cos(angle) * radius;
const z = Math.sin(angle) * radius;
```

O `Math.sqrt()` altera a distribuição para evitar concentração excessiva no centro.

A lição é importante: **a função de distribuição é parte da direção visual**.

---

## 7. Seed e reprodutibilidade

`Math.random()` produz resultados diferentes a cada carregamento.

Isso pode ser desejável, mas dificulta:

* debugging;
* comparação visual;
* testes;
* direção de arte;
* sincronização entre clientes.

Quando o resultado precisa ser reproduzível, use um gerador pseudoaleatório com seed.

O mesmo seed deve produzir a mesma cena.

---

## 8. Atualizar partículas na CPU

Para poucas partículas, você pode alterar o atributo `position` a cada frame:

```javascript
const position = geometry.attributes.position;

for (let i = 0; i < position.count; i++) {
  const y = position.getY(i);
  position.setY(i, y + 0.002);
}

position.needsUpdate = true;
```

O problema é que a CPU precisa percorrer todos os elementos e enviar novos dados para a GPU.

Esse custo cresce com a quantidade de partículas e com a frequência das atualizações.

---

## 9. Quando mover a animação para shader

Se milhares de partículas seguem uma regra semelhante, faz sentido enviar parâmetros e deixar a GPU calcular a posição visual.

Por exemplo, em vez de atualizar cada `y` na CPU, o vertex shader pode calcular:

```glsl
float offset = sin(position.x * 2.0 + uTime);
vec3 transformed = position;
transformed.y += offset * 0.4;
```

A CPU atualiza apenas `uTime`.

A GPU executa a fórmula para todos os vértices em paralelo.

Essa é uma das principais transições entre uma cena procedural pequena e uma cena procedural escalável.

---

## 10. Estado base e estado visual

Uma estratégia eficiente é manter uma posição inicial imutável e derivar a posição animada dela.

Por exemplo:

`posição final = posição base + função(tempo, parâmetros)`

Isso evita acumular erro numérico e facilita reconstruir o sistema.

O raciocínio é semelhante ao usado em [[javascript/07-threejs/14-GSAP, interpolação de estados e animação dirigida em Three.js|estados canônicos e interpolação]]: mantenha uma referência estável e derive o estado visual.

---

## 11. Curvas em Three.js

Three.js possui classes como:

* `LineCurve3`;
* `QuadraticBezierCurve3`;
* `CubicBezierCurve3`;
* `CatmullRomCurve3`.

Uma curva não é apenas uma linha desenhada. Ela é uma função capaz de responder:

**qual ponto existe em determinada posição ao longo do caminho?**

---

## 12. Catmull-Rom para trajetórias suaves

```javascript
const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-3, 0, 0),
  new THREE.Vector3(-1, 2, 1),
  new THREE.Vector3(1, -1, 2),
  new THREE.Vector3(3, 1, 0)
]);
```

Para obter um ponto entre início e fim:

```javascript
const point = curve.getPoint(0.5);
```

O parâmetro costuma variar de `0` a `1`.

Isso permite mover objetos por uma trajetória sem definir manualmente cada posição intermediária.

---

## 13. Amostrar uma curva para desenhá-la

```javascript
const points = curve.getPoints(100);
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({ color: 0xffffff });
const line = new THREE.Line(geometry, material);
```

A curva matemática é contínua.

A linha visual é uma aproximação feita por amostras.

Quanto mais amostras, mais suave a aparência, mas maior a quantidade de vértices.

---

## 14. Movimento ao longo de uma curva

```javascript
const t = (performance.now() * 0.0001) % 1;
const point = curve.getPointAt(t);
mesh.position.copy(point);
```

`getPointAt()` tenta trabalhar com progressão mais uniforme ao longo do comprimento da curva.

Isso é diferente de simplesmente interpolar o parâmetro matemático bruto em curvas cuja velocidade aparente varia muito.

---

## 15. Tangente e orientação

Uma curva também pode fornecer a direção local do movimento:

```javascript
const tangent = curve.getTangentAt(t).normalize();
```

Essa tangente pode orientar um objeto, uma câmera ou uma fita.

O conceito é semelhante ao de um carro numa estrada: posição diz onde ele está; tangente diz para onde a estrada aponta naquele trecho.

---

## 16. Tubos e formas derivadas de curvas

`TubeGeometry` transforma uma curva em volume:

```javascript
const geometry = new THREE.TubeGeometry(
  curve,
  120,
  0.12,
  12,
  false
);
```

Esse padrão serve para:

* cabos;
* trilhas;
* tubos;
* tentáculos;
* caminhos orgânicos;
* visualizações de fluxo.

A geometria final continua sendo um `BufferGeometry`, mas sua estrutura foi produzida por uma regra.

---

## 17. Campos como funções de influência

Um campo responde a uma pergunta do tipo:

**dada uma posição no espaço, qual força ou direção atua aqui?**

Uma função simples pode ser:

```javascript
function radialField(position) {
  return position.clone().normalize().multiplyScalar(-0.01);
}
```

Nesse exemplo, qualquer ponto recebe uma força em direção ao centro.

---

## 18. Campo radial

Para uma partícula em `p`, uma atração para o centro pode ser pensada como:

`força = direção para o centro × intensidade`

Em código:

```javascript
const direction = center.clone().sub(position).normalize();
velocity.addScaledVector(direction, strength);
```

Isso cria comportamentos orbitais, convergência ou colapso, dependendo de como velocidade e amortecimento são tratados.

---

## 19. Campo vetorial

Um campo também pode devolver direções diferentes dependendo da posição.

```javascript
function flowField(x, y, z) {
  return new THREE.Vector3(
    Math.sin(y * 0.8),
    Math.cos(z * 0.8),
    Math.sin(x * 0.8)
  ).normalize();
}
```

Partículas que consultam esse campo parecem seguir correntes invisíveis.

Isso é útil para:

* fumaça estilizada;
* fluxo de dados;
* vento;
* enxames;
* movimento abstrato;
* visualização de sistemas complexos.

---

## 20. Ruído coerente é diferente de aleatoriedade quadro a quadro

Trocar direção com `Math.random()` a cada frame produz tremor.

Para movimento orgânico, normalmente usamos ruído coerente, como Perlin ou Simplex noise.

A diferença é que valores próximos no espaço e no tempo geram resultados relacionados.

Em termos visuais:

* random puro: estática de televisão;
* noise coerente: nuvens, relevo, vento, fluxo.

Essa continuidade é o que cria sensação de fenômeno, e não de erro.

---

## 21. Integração numérica simples

Sistemas de partículas frequentemente mantêm pelo menos:

* posição;
* velocidade;
* aceleração ou força.

Um passo básico:

```javascript
velocity.add(acceleration);
position.add(velocity);
```

Com delta time:

```javascript
velocity.addScaledVector(acceleration, delta);
position.addScaledVector(velocity, delta);
```

Usar `delta` reduz dependência da taxa de frames.

---

## 22. Euler explícito é simples, mas não perfeito

A atualização anterior é uma forma simples de integração numérica.

Ela funciona bem em muitos efeitos visuais, mas pode ficar instável em sistemas rígidos ou forças fortes.

Para efeitos gráficos, frequentemente basta.

Para física mais exigente, integradores mais estáveis ou bibliotecas de física podem ser melhores.

O objetivo aqui é entender que movimento procedural é uma simulação aproximada, não necessariamente uma solução física exata.

---

## 23. Geometria procedural com `BufferGeometry`

Você pode gerar superfícies diretamente por vértices.

Por exemplo, uma grade:

```javascript
const width = 20;
const height = 20;
const positions = [];

for (let z = 0; z < height; z++) {
  for (let x = 0; x < width; x++) {
    const px = x - width / 2;
    const pz = z - height / 2;
    const py = Math.sin(px * 0.5) * Math.cos(pz * 0.5);

    positions.push(px, py, pz);
  }
}
```

A fórmula de `py` define o relevo.

Trocar a função troca a forma.

---

## 24. Índices conectam vértices em triângulos

Uma superfície não é apenas um conjunto de pontos.

Você precisa dizer quais vértices formam cada triângulo.

Em uma grade, cada célula costuma virar dois triângulos.

```javascript
indices.push(a, b, d);
indices.push(b, c, d);
```

Esse raciocínio foi introduzido em [[javascript/07-threejs/10-BufferGeometry e geometria paramétrica em Three.js|BufferGeometry e geometria paramétrica]]. Em sistemas procedurais, ele passa a ser usado para fabricar topologia em escala.

---

## 25. Normais precisam acompanhar a forma

Se você altera vértices de uma superfície, a iluminação pode ficar errada se as normais não forem atualizadas.

Para geometria estática gerada na CPU:

```javascript
geometry.computeVertexNormals();
```

Se a deformação acontece no shader, o problema fica mais complexo porque a normal original pode deixar de representar a superfície deformada.

Esse é um exemplo clássico de como geometria e material não podem ser tratados como sistemas independentes.

---

## 26. Instancing também pode ser procedural

Quando a forma básica se repete, use [[javascript/07-threejs/11-InstancedMesh e desenho eficiente de muitas formas|InstancedMesh]] em vez de criar milhares de meshes.

```javascript
const mesh = new THREE.InstancedMesh(
  geometry,
  material,
  count
);

const dummy = new THREE.Object3D();

for (let i = 0; i < count; i++) {
  const angle = i * 0.2;
  const radius = 0.03 * i;

  dummy.position.set(
    Math.cos(angle) * radius,
    i * 0.01 - 2,
    Math.sin(angle) * radius
  );

  dummy.updateMatrix();
  mesh.setMatrixAt(i, dummy.matrix);
}
```

Aqui a regra procedural gera uma espiral de instâncias.

---

## 27. `Points`, instancing ou geometria única

Escolha conforme o problema.

Use `Points` quando cada elemento pode ser representado como ponto ou sprite orientado para a câmera.

Use `InstancedMesh` quando cada elemento precisa de uma geometria 3D repetida.

Use uma única `BufferGeometry` quando os elementos formam uma superfície ou linha conectada.

A escolha errada pode multiplicar draw calls, memória ou complexidade de shader sem necessidade.

---

## 28. Atualização parcial de atributos

Quando apenas uma parte do buffer muda, evite reconstruir toda a geometria se não for necessário.

O princípio é:

* criar arrays uma vez;
* reutilizar buffers;
* alterar apenas valores necessários;
* marcar atributos como atualizados.

Criar novos arrays, geometrias e materiais a cada frame produz pressão no garbage collector e pode causar travamentos visíveis.

---

## 29. `DynamicDrawUsage`

Quando um atributo será alterado com frequência:

```javascript
positionAttribute.setUsage(THREE.DynamicDrawUsage);
```

Isso comunica ao renderer a intenção de uso do buffer.

Não transforma automaticamente uma solução lenta em rápida, mas ajuda o pipeline a tratar o recurso de modo coerente com atualizações frequentes.

---

## 30. Frustum culling e bounds

Geometrias procedurais que mudam muito podem deixar bounding boxes ou bounding spheres desatualizadas.

Isso pode fazer o renderer esconder algo que ainda deveria estar visível.

Quando necessário:

```javascript
geometry.computeBoundingSphere();
geometry.computeBoundingBox();
```

Para sistemas muito dinâmicos, também é possível revisar a estratégia de culling, mas desativá-la indiscriminadamente transfere custo para a GPU.

---

## 31. Procedural não significa infinito

Todo sistema precisa de limites.

Defina explicitamente:

* quantidade máxima de partículas;
* região espacial;
* lifetime;
* frequência de emissão;
* resolução da geometria;
* número de amostras de curvas;
* custo por frame.

Sem orçamento, regras simples podem produzir crescimento descontrolado.

---

## 32. Pooling de partículas

Em vez de criar e destruir partículas continuamente, um sistema pode manter um conjunto fixo e reutilizar elementos.

A lógica é:

1. reservar `N` partículas;
2. marcar quais estão ativas;
3. reutilizar uma inativa quando houver nova emissão;
4. devolver ao pool quando o lifetime terminar.

Isso reduz alocação de objetos e garbage collection.

---

## 33. Diagnóstico por camada

Quando um sistema procedural falha, pergunte em ordem:

1. a regra matemática produz valores plausíveis?;
2. a distribuição inicial está correta?;
3. os buffers têm tamanho e stride corretos?;
4. o atributo foi marcado com `needsUpdate` quando necessário?;
5. a simulação depende de frame rate?;
6. o erro está na posição base ou na deformação visual?;
7. a geometria precisa recalcular normais ou bounds?;
8. o gargalo está na CPU, na transferência de buffers ou na GPU?;
9. `Points`, instancing ou shader seria uma representação melhor?;
10. a regra visual está criando estrutura ou apenas ruído?

Esse diagnóstico evita reescrever o sistema inteiro para corrigir um problema localizado.

---

## 34. Antipadrões comuns

### Criar objetos JavaScript por partícula a cada frame

Aumenta garbage collection e custo de CPU.

### Usar uma `Mesh` para cada partícula

Multiplica draw calls quando `Points` ou `InstancedMesh` resolveria melhor.

### Usar `Math.random()` em toda atualização

Produz movimento sem continuidade e dificulta debugging.

### Atualizar buffers inteiros sem necessidade

Aumenta transferência CPU → GPU.

### Aumentar subdivisões para corrigir uma regra ruim

Mais vértices não consertam uma função procedural mal definida.

### Colocar tudo no shader cedo demais

Shaders escalam bem, mas dificultam inspeção e debugging. Primeiro valide a regra em uma versão pequena e legível.

### Ignorar delta time

Faz o comportamento variar com FPS.

---

## 35. Exemplo completo em Three.js

Este exemplo combina partículas, campo radial leve e curva de referência. As partículas são inicializadas proceduralmente e atualizadas na CPU para manter a lógica explícita.

```javascript
import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0b0d);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1.5, 9);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const count = 2000;
const positions = new Float32Array(count * 3);
const velocities = new Float32Array(count * 3);

for (let i = 0; i < count; i++) {
  const i3 = i * 3;
  const angle = Math.random() * Math.PI * 2;
  const radius = 1.5 + Math.random() * 2.5;

  positions[i3] = Math.cos(angle) * radius;
  positions[i3 + 1] = (Math.random() - 0.5) * 2.5;
  positions[i3 + 2] = Math.sin(angle) * radius;

  velocities[i3] = (Math.random() - 0.5) * 0.1;
  velocities[i3 + 1] = (Math.random() - 0.5) * 0.1;
  velocities[i3 + 2] = (Math.random() - 0.5) * 0.1;
}

const particleGeometry = new THREE.BufferGeometry();
const positionAttribute = new THREE.BufferAttribute(positions, 3);
positionAttribute.setUsage(THREE.DynamicDrawUsage);
particleGeometry.setAttribute("position", positionAttribute);

const particleMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.035,
  sizeAttenuation: true
});

const particles = new THREE.Points(
  particleGeometry,
  particleMaterial
);
scene.add(particles);

const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-3, -1, 0),
  new THREE.Vector3(-1, 1.5, 1),
  new THREE.Vector3(1, -0.5, -1),
  new THREE.Vector3(3, 1, 0)
]);

const curveGeometry = new THREE.BufferGeometry().setFromPoints(
  curve.getPoints(120)
);
const curveMaterial = new THREE.LineBasicMaterial({ color: 0x666666 });
scene.add(new THREE.Line(curveGeometry, curveMaterial));

const clock = new THREE.Clock();

function animate() {
  const delta = Math.min(clock.getDelta(), 0.033);
  const position = particleGeometry.attributes.position;

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    let x = positions[i3];
    let y = positions[i3 + 1];
    let z = positions[i3 + 2];

    const length = Math.hypot(x, y, z) || 1;
    const force = -0.08;

    velocities[i3] += (x / length) * force * delta;
    velocities[i3 + 1] += (y / length) * force * delta;
    velocities[i3 + 2] += (z / length) * force * delta;

    x += velocities[i3] * delta;
    y += velocities[i3 + 1] * delta;
    z += velocities[i3 + 2] * delta;

    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;
  }

  position.needsUpdate = true;
  particles.rotation.y += delta * 0.08;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
```

O exemplo é intencionalmente CPU-based para deixar visível a relação entre posição, velocidade, força e atualização de buffer. Em uma cena com muito mais partículas, a próxima otimização natural seria mover a deformação repetitiva para a GPU.

---

## 36. Exemplo completo em React Three Fiber

```jsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function ProceduralParticles({ count = 3000 }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const radius = 1 + Math.random() * 3;

      array[i3] = Math.cos(angle) * radius;
      array[i3 + 1] = (Math.random() - 0.5) * 2;
      array[i3 + 2] = Math.sin(angle) * radius;
    }

    return array;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (!pointsRef.current) return;

    pointsRef.current.rotation.y = t * 0.08;
    pointsRef.current.rotation.x = Math.sin(t * 0.2) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.035}
        sizeAttenuation
      />
    </points>
  );
}

function ProceduralCurve() {
  const points = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3, -1, 0),
      new THREE.Vector3(-1, 1.5, 1),
      new THREE.Vector3(1, -0.5, -1),
      new THREE.Vector3(3, 1, 0)
    ]);

    return curve.getPoints(120);
  }, []);

  const geometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(points),
    [points]
  );

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#666666" />
    </line>
  );
}

export default function Scene() {
  return (
    <Canvas
      camera={{ fov: 45, position: [0, 1.5, 9] }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#0b0b0d"]} />
      <ProceduralParticles />
      <ProceduralCurve />
    </Canvas>
  );
}
```

Aqui a geração inicial fica em `useMemo`, enquanto `useFrame` altera apenas o estado visual que realmente precisa mudar a cada frame. Isso preserva a separação arquitetural discutida em [[javascript/07-threejs/16-Arquitetura avançada de React Three Fiber para cenas complexas|arquitetura avançada de React Three Fiber]].

---

## 37. Critério para escolher a estratégia

Use geração na CPU quando a estrutura é criada uma vez ou possui poucos elementos.

Use atributos dinâmicos quando poucos milhares de valores precisam mudar e a lógica ainda deve permanecer fácil de inspecionar.

Use shaders quando muitos vértices seguem regras semelhantes a cada frame.

Use `Points` quando cada elemento pode ser visualmente representado como ponto.

Use `InstancedMesh` quando o sistema repete uma geometria 3D.

Use curvas quando posição e direção precisam ser derivadas de um caminho contínuo.

Use campos quando o comportamento depende da posição atual no espaço.

Use geometria procedural quando a própria topologia ou superfície é resultado de uma função.

---

## 38. Ponte para interação espacial

Sistemas procedurais criam uma nova pergunta: quando existem milhares de elementos gerados por regra, **como selecionar, apontar, arrastar ou identificar partes específicas sem transformar a interação em um gargalo?**

Essa é a fronteira da próxima fase. A interação espacial exige pensar em picking, raycasting em escala, seleção e manipulação de objetos densos sem confundir custo de renderização com custo de detecção.

Esse assunto fica reservado para a Fase 10.

---

## Resumo para memorizar

Sistemas procedurais trocam desenho manual por regras. Partículas usam buffers e podem migrar da CPU para shaders quando a escala cresce; curvas descrevem trajetórias contínuas; campos devolvem forças ou direções a partir da posição; geometria procedural transforma funções em vértices, índices e superfícies.

A regra prática é: **defina uma estrutura base, derive variações por função, escolha a representação mais barata e só então anime**. Use CPU para lógica de alto nível e sistemas pequenos, GPU para cálculos massivos e repetitivos, `Points` para partículas simples, `InstancedMesh` para formas repetidas e `BufferGeometry` para superfícies conectadas. Controle quantidade, lifetime, resolução e atualizações para impedir que uma regra visual simples vire um custo descontrolado.