# Ordem prática para dominar Three.js

Este artigo organiza uma sequência prática de estudo para sair do uso por tentativa e erro e ganhar um modelo mental sólido de Three.js. A motivação é simples: cenas 3D aparentemente pequenas podem combinar muitos conceitos ao mesmo tempo. Quando isso acontece, o problema deixa de ser apenas escrever código e passa a ser entender espaço, transformação, câmera, projeção e hierarquia.

Uma animação com oito vigas, grupos locais, câmera dirigida, perspectiva forçada, oclusão, React Three Fiber, GSAP, instancing e shaders já está muito além do exercício clássico de "fazer um cubo girar". Por isso a ordem de estudo importa.

A prioridade recomendada é:

1. `Object3D`, `Group` e transformações;
2. vetores, matrizes e espaços local/global;
3. câmera e projeção;
4. geometria e `BufferGeometry`;
5. React Three Fiber;
6. animação e timelines;
7. instancing e shaders.

---

## 1. Object3D, Group e transformações

Este é o assunto mais importante para cenas compostas por várias peças.

Em Three.js, praticamente tudo que pode ser posicionado em cena herda de `Object3D`: `Mesh`, `Group`, câmeras, luzes e outros objetos.

As três propriedades mais importantes são:

```javascript
object.position;
object.rotation;
object.scale;
```

A dificuldade aparece quando um objeto é filho de outro.

```javascript
const group = new THREE.Group();
const mesh = new THREE.Mesh(geometry, material);

group.add(mesh);
scene.add(group);
```

Agora existem dois sistemas de transformação:

* o `mesh` possui posição e rotação locais dentro do `group`;
* o `group` possui sua própria transformação dentro da cena.

Se o grupo gira, o filho acompanha porque sua transformação final é composta com a transformação do pai.

Uma analogia útil é o Figma: imagine um ícone dentro de um Frame. A posição do ícone é relativa ao Frame. Se o Frame inteiro é movido, o ícone acompanha sem mudar sua posição interna.

Isso é a base para entender [[javascript/07-threejs/02-Cena, câmera, renderer e coordenadas|coordenadas e cena]] e [[javascript/07-threejs/07-React Three Fiber no Next.js|React Three Fiber]].

### Exercício mínimo

Crie três caixas dentro de um `Group`.

Teste separadamente:

* mover apenas uma caixa;
* girar apenas uma caixa;
* mover o grupo inteiro;
* girar o grupo inteiro;
* colocar um grupo dentro de outro grupo.

O objetivo não é criar uma composição bonita. É conseguir prever o resultado antes de executar o código.

---

## 2. Vetores, matrizes e espaços local/global

O segundo passo é entender que a mesma peça pode ter coordenadas diferentes dependendo do espaço de referência.

Um ponto local pode ser:

```javascript
const localPoint = new THREE.Vector3(1, 0, 0);
```

Mas se o objeto pai estiver deslocado ou rotacionado, esse ponto ocupará outro lugar no mundo.

Three.js fornece operações como:

```javascript
object.localToWorld(vector);
object.worldToLocal(vector);
```

Essas funções ficam essenciais quando você precisa responder perguntas como:

* onde está a ponta desta viga no mundo?
* duas peças realmente se tocam ou só parecem se tocar?
* um endpoint pertence ao sistema local da peça ou ao sistema global da cena?

`Vector3` deve virar uma ferramenta cotidiana. Os usos mais importantes no início são:

```javascript
vector.clone();
vector.add(other);
vector.sub(other);
vector.normalize();
vector.multiplyScalar(value);
vector.distanceTo(other);
```

Também vale começar a reconhecer `Matrix4`, mesmo sem dominar álgebra linear em profundidade. Matrizes são o mecanismo usado para combinar posição, rotação e escala.

A pergunta prática não é "sei calcular uma matriz à mão?". É "consigo reconhecer quando uma transformação está sendo aplicada à geometria ou ao objeto?".

### Exercício mínimo

Crie uma viga horizontal dentro de um grupo rotacionado.

Depois:

1. defina um endpoint em coordenadas locais;
2. converta esse endpoint para coordenadas globais;
3. mostre um pequeno marcador nesse ponto;
4. altere a rotação do grupo e observe o marcador acompanhar corretamente.

Se esse exercício fizer sentido sem tentativa e erro, o modelo local/global começou a consolidar.

---

## 3. Câmera e projeção

Em 3D, uma composição não é apenas o objeto. É também a relação entre objeto e câmera.

Uma `PerspectiveCamera` transforma uma cena tridimensional em uma imagem bidimensional.

```javascript
const camera = new THREE.PerspectiveCamera(
  25,
  width / height,
  0.1,
  100
);
```

Os parâmetros principais são:

* `position`: onde a câmera está;
* `rotation` ou `lookAt()`: para onde ela olha;
* `fov`: quanto do campo visual aparece;
* `near` e `far`: limites de profundidade renderizados.

Aqui surge uma distinção fundamental:

**estar alinhado no mundo não é a mesma coisa que parecer alinhado na tela.**

Dois pontos podem ocupar posições 3D diferentes e, vistos de uma câmera específica, cair praticamente sobre o mesmo pixel.

É isso que permite perspectiva forçada e objetos impossíveis.

Esse tema aprofunda [[javascript/07-threejs/02-Cena, câmera, renderer e coordenadas|Cena, câmera, renderer e coordenadas]].

### Exercício mínimo

Coloque duas vigas em profundidades `z` diferentes.

Faça uma câmera dirigida para que, na tela, uma extremidade de cada viga pareça se encontrar.

Depois altere levemente a câmera e observe a ilusão desaparecer.

Esse exercício ensina mais sobre perspectiva forçada do que tentar construir diretamente um objeto impossível complexo.

---

## 4. Geometria antes de efeitos

Depois de dominar transformações e câmera, aprofunde a diferença entre forma geométrica e transformação do objeto.

Uma `BoxGeometry` já resolve muitos problemas:

```javascript
const geometry = new THREE.BoxGeometry(length, width, depth);
```

O próximo passo é entender `BufferGeometry`.

Uma geometria customizada normalmente possui:

* posições de vértices;
* índices que definem triângulos;
* normais;
* atributos adicionais quando necessário.

Exemplo mínimo:

```javascript
const geometry = new THREE.BufferGeometry();
geometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(vertices, 3)
);
geometry.setIndex(indices);
geometry.computeVertexNormals();
```

A ideia central é separar duas perguntas:

**A forma da peça está errada?**

ou

**A peça correta está sendo posicionada de forma errada?**

Misturar esses dois problemas gera muito retrabalho.

Veja também [[javascript/07-threejs/03-Geometria, material, mesh e luz|Geometria, material, mesh e luz]].

---

## 5. React Three Fiber depois do modelo mental de Three.js

React Three Fiber muda a forma de escrever a cena, não as leis do espaço 3D.

Three.js puro:

```javascript
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(1, 0, 0);
scene.add(mesh);
```

R3F:

```tsx
<mesh position={[1, 0, 0]}>
  <boxGeometry />
  <meshBasicMaterial />
</mesh>
```

O erro comum é aprender apenas a sintaxe JSX e continuar sem entender o objeto Three.js que existe por baixo.

Por isso [[javascript/07-threejs/07-React Three Fiber no Next.js|React Three Fiber no Next.js]] deve ser lido depois dos fundamentos espaciais.

### O que distinguir

Em uma cena R3F, pergunte sempre:

* isto é comportamento do React?
* isto é comportamento do React Three Fiber?
* isto é propriedade de um objeto Three.js?
* isto é apenas CSS/DOM ao redor do Canvas?

Essa separação torna debugging muito mais rápido.

---

## 6. Animação como interpolação de estado

Animação 3D não precisa começar com uma timeline complexa. Conceitualmente, ela é uma mudança contínua de estado ao longo do tempo.

Um modelo útil é definir dois estados:

```javascript
const start = { x: 0, rotation: 0 };
const end = { x: 2, rotation: Math.PI / 2 };
```

E interpolar entre eles com um progresso `t` de `0` a `1`.

```javascript
const x = THREE.MathUtils.lerp(start.x, end.x, t);
```

GSAP pode controlar esse progresso ou os próprios transforms. O importante é primeiro saber quais são os estados inicial e final.

Isso conecta diretamente a [[javascript/07-threejs/04-Loop de renderização, tempo e animação|loop de renderização, tempo e animação]].

### Regra prática

Primeiro faça os estados estáticos funcionarem.

Depois anime a passagem entre eles.

Usar a animação para descobrir qual deveria ser o frame final mistura direção visual com implementação e torna a iteração muito mais cara.

---

## 7. Instancing e shaders ficam para depois

`InstancedMesh` é excelente quando muitas cópias compartilham a mesma geometria e material.

Uma composição radial com centenas de linhas, por exemplo, pode usar uma geometria única com vários transforms de instância.

Shaders também são extremamente poderosos, mas não são pré-requisito para compreender cenas 3D.

A ordem recomendada é:

```text
transformações
→ câmera
→ geometria
→ animação
→ instancing
→ shaders
```

Se o problema atual ainda é descobrir onde um objeto está ou por que um grupo gira de forma inesperada, um shader não resolve a lacuna fundamental.

---

## 8. A sequência de exercícios mais eficiente

Em vez de estudar apenas lendo documentação, use uma série de microprojetos.

### Exercício 1: uma viga

Crie uma única viga e controles para:

* `position.x`, `position.y`, `position.z`;
* `rotation.x`, `rotation.y`, `rotation.z`;
* câmera `z`;
* `fov`.

### Exercício 2: hierarquia

Crie três vigas dentro de um `Group` e teste transformações no pai e nos filhos.

### Exercício 3: local e global

Mostre visualmente um endpoint local convertido para world space.

### Exercício 4: projeção

Use duas vigas separadas em Z que pareçam se tocar em uma câmera específica.

### Exercício 5: estado e interpolação

Crie dois layouts estáticos e um slider `0 → 1` que interpole os transforms.

### Exercício 6: família procedural

Crie uma linha, duplique-a em várias instâncias e distribua as cópias radialmente.

Esse último exercício introduz naturalmente `InstancedMesh` e prepara cenas com anéis, leques e padrões de interferência.

---

## 9. Como diagnosticar uma cena antes de mexer no código

Quando algo parece errado, classifique o problema antes de editar.

Pergunte nesta ordem:

1. **Geometria:** a forma da peça individual está correta?
2. **Transform local:** a peça está correta dentro do seu grupo?
3. **Transform global:** o grupo está no lugar correto na cena?
4. **Câmera:** o problema é espacial ou apenas de projeção?
5. **Oclusão:** quem deveria estar na frente de quem?
6. **Animação:** os endpoints estáticos estão corretos antes de interpolar?
7. **Renderização:** existe problema de material, depth test, z-fighting ou shader?

Isso reduz a tendência de mudar câmera, geometria, material e animação ao mesmo tempo.

Para aprofundar esse raciocínio, consulte [[javascript/07-threejs/06-Composição visual, performance e diagnóstico de cenas 3D|Composição visual, performance e diagnóstico de cenas 3D]].

---

## 10. Critério de domínio prático

Você não precisa decorar toda a API do Three.js.

Considere esta base consolidada quando conseguir:

* prever o efeito de mover ou rotacionar um `Group`;
* explicar a diferença entre coordenadas locais e globais;
* converter um ponto entre local e world space;
* distinguir transformação do objeto de transformação aplicada à geometria;
* explicar por que dois pontos podem parecer conectados sem estarem no mesmo lugar no mundo;
* ajustar câmera e `fov` com intenção;
* ler uma `BufferGeometry` simples;
* identificar quando usar estado React e quando alterar refs no render loop;
* definir estados estáticos antes de animá-los;
* reconhecer quando `InstancedMesh` é melhor que centenas de componentes independentes.

O objetivo é ganhar capacidade de direção técnica e visual, não memorizar métodos isolados.

---

## Resumo para memorizar

Para cenas 3D complexas, aprenda primeiro **hierarquia e transformações**, depois **local/global e vetores**, depois **câmera e projeção**. Só então aprofunde geometria, React Three Fiber e animação. `InstancedMesh` e shaders vêm depois.

A regra mais útil é: **resolva o frame estático antes da transição**. Quando uma cena não funciona, descubra primeiro se o problema está na geometria, no transform local, no transform global, na câmera ou na oclusão. Essa classificação reduz muito a tentativa e erro.