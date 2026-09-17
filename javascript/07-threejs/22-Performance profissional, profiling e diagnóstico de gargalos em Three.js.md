# Performance profissional, profiling e diagnóstico de gargalos em Three.js

Depois de aprender a construir cenas complexas, usar shaders, texturas, pós-processamento, sistemas procedurais e interação espacial, surge uma pergunta que muda completamente a forma de otimizar: **o que realmente está deixando a cena lenta?**

A resposta profissional não é “reduzir polígonos”, “usar instancing” ou “diminuir o DPR” por reflexo. É medir primeiro, localizar o gargalo e só então escolher a intervenção certa.

A analogia com produto é simples: otimizar uma cena sem profiling é como redesenhar um funil inteiro porque uma métrica caiu, sem saber em qual etapa o problema aconteceu. Você pode gastar muito esforço e piorar justamente a parte que já funcionava.

Este artigo conecta [[javascript/07-threejs/11-InstancedMesh e desenho eficiente de muitas formas|InstancedMesh]], [[javascript/07-threejs/12-Shaders, GLSL e materiais customizados|shaders]], [[javascript/07-threejs/18-UVs, texturas, PBR e environment maps em Three.js|texturas e PBR]], [[javascript/07-threejs/19-Post-processing, render targets, depth e stencil em Three.js|post-processing]], [[javascript/07-threejs/20-Partículas, curvas, campos e geometria procedural em Three.js|sistemas procedurais]] e [[javascript/07-threejs/21-Picking, raycasting, seleção e drag em Three.js|interação espacial]].

---

## 1. Performance é um orçamento por frame

Uma aplicação interativa não precisa apenas “ser rápida”. Ela precisa terminar o trabalho de cada frame dentro de um orçamento.

Se o alvo for 60 FPS, cada frame dispõe de aproximadamente:

```text
1000 ms / 60 ≈ 16,7 ms
```

Para 30 FPS:

```text
1000 ms / 30 ≈ 33,3 ms
```

Isso muda o modelo mental. O problema não é apenas “quantos FPS tenho?”, mas **quanto tempo cada frame custa e onde esse tempo está sendo gasto**.

FPS é consequência. Frame time é diagnóstico.

---

## 2. CPU e GPU podem ser gargalos diferentes

Uma cena Three.js atravessa duas grandes frentes de trabalho:

* **CPU**: JavaScript, React, lógica de aplicação, física, raycasting, atualização de matrizes, criação de objetos, garbage collection, preparação de comandos de renderização;
* **GPU**: transformação de vértices, rasterização, shaders, texturas, sombras, pós-processamento, blending e preenchimento de pixels.

Uma cena pode estar lenta porque a CPU demora para preparar o frame, mesmo com uma GPU folgada. Ou o contrário: a CPU termina cedo, mas a GPU demora para desenhar tudo.

A otimização certa depende dessa distinção.

---

## 3. O primeiro erro é olhar apenas para FPS

FPS sozinho esconde picos.

Uma cena pode parecer “60 FPS” na média, mas ter frames ocasionais de 50 ou 80 ms. O usuário percebe esses picos como travadinhas.

Por isso, observe:

* tempo médio de frame;
* picos de frame time;
* regularidade entre frames;
* custo de eventos específicos, como abrir modal, iniciar drag ou trocar asset;
* comportamento após alguns minutos, quando memória e garbage collection começam a aparecer.

Um gráfico de frame time costuma ser mais informativo do que um contador isolado de FPS.

---

## 4. Meça antes de modificar

Uma boa sessão de profiling segue uma ordem simples:

1. reproduzir o problema de forma consistente;
2. medir uma baseline;
3. formular uma hipótese;
4. mudar uma coisa por vez;
5. medir novamente;
6. manter a mudança apenas se o ganho for real.

Sem baseline, uma otimização vira opinião.

Uma tabela mínima de experimento pode ser:

| Versão | Frame time | Draw calls | Triângulos | DPR | Observação |
| --- | ---: | ---: | ---: | ---: | --- |
| baseline | 21 ms | 420 | 1,2 M | 2 | queda ao mover câmera |
| teste A | 15 ms | 120 | 1,2 M | 2 | instancing reduziu CPU |
| teste B | 11 ms | 120 | 1,2 M | 1,5 | GPU ainda era gargalo |

O importante é transformar “parece melhor” em comparação observável.

---

## 5. `renderer.info` mostra o que está sendo enviado para renderização

Three.js expõe estatísticas úteis em `renderer.info`.

```javascript
console.log(renderer.info.render);
```

Você pode encontrar valores como:

```javascript
{
  calls: 84,
  triangles: 320000,
  points: 0,
  lines: 12
}
```

Esses dados ajudam a responder perguntas diferentes.

* `calls`: quantas operações de desenho foram emitidas;
* `triangles`: quantos triângulos foram enviados;
* `points`: quantidade de pontos renderizados;
* `lines`: quantidade de segmentos de linha.

Nenhum desses números é “ruim” isoladamente. Eles só ganham sentido quando comparados ao frame time e ao dispositivo-alvo.

---

## 6. Draw calls podem custar mais do que a geometria sugere

Dois milhões de triângulos em poucas draw calls podem ser mais viáveis do que cem mil triângulos espalhados por milhares de objetos e materiais diferentes.

Cada draw call exige preparação de estado e comunicação entre CPU e GPU.

É por isso que [[javascript/07-threejs/11-InstancedMesh e desenho eficiente de muitas formas|InstancedMesh]] pode produzir um ganho enorme mesmo sem reduzir a quantidade total de triângulos.

Exemplo conceitual:

```javascript
const mesh = new THREE.InstancedMesh(
  geometry,
  material,
  1000
);
```

Mil objetos visualmente repetidos podem ser enviados de forma muito mais eficiente do que mil `Mesh` separados.

---

## 7. Muitos materiais também fragmentam o trabalho

Objetos com geometrias parecidas, mas materiais diferentes, podem impedir agrupamento eficiente.

Antes de criar dezenas de variantes de material, pergunte se parte da diferença pode virar:

* cor por instância;
* textura atlased;
* atributo customizado;
* uniform;
* parâmetro de shader.

Isso não significa transformar todo projeto em um mega-shader. Significa reconhecer quando a variedade visual está multiplicando estados de renderização sem necessidade.

---

## 8. Triângulos importam, mas contexto importa mais

Reduzir triângulos ainda pode ser decisivo, especialmente em mobile ou assets densos.

Mas o custo depende de:

* quantos objetos estão visíveis;
* quantos passes usam a geometria;
* quantas sombras precisam redesenhar a cena;
* quão complexos são os shaders;
* tamanho em tela;
* quantidade de pixels processados.

Uma estátua com 500 mil triângulos ocupando uma pequena área da tela pode ter perfil diferente de um plano fullscreen com shader pesado.

---

## 9. Fill rate é o custo de preencher pixels

A GPU não trabalha apenas com vértices. Ela precisa processar fragmentos, isto é, candidatos a pixels.

Problemas de fill rate aparecem quando muitos pixels são processados repetidamente.

Casos comuns:

* partículas transparentes sobrepostas;
* bloom;
* múltiplos passes fullscreen;
* grandes planos transparentes;
* efeitos de névoa ou glow;
* resolução alta com DPR elevado.

Se reduzir triângulos não muda o frame time, mas reduzir resolução muda bastante, é um forte sinal de gargalo relacionado a pixels.

---

## 10. DPR pode multiplicar o custo silenciosamente

`devicePixelRatio` aumenta a resolução real do canvas.

Em uma tela CSS de 1000 × 1000 pixels:

* DPR 1: 1 milhão de pixels;
* DPR 2: 4 milhões de pixels;
* DPR 3: 9 milhões de pixels.

O crescimento é quadrático.

Um limite simples pode evitar desperdício:

```javascript
renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 1.5)
);
```

O objetivo não é sempre reduzir qualidade. É perceber que DPR é uma variável de performance tão importante quanto geometria.

---

## 11. Post-processing multiplica trabalho em screen space

No [[javascript/07-threejs/19-Post-processing, render targets, depth e stencil em Three.js|pipeline de post-processing]], cada pass pode ler e escrever texturas do tamanho da tela.

Isso significa que:

```text
mais resolução × mais passes × shaders mais caros = mais custo de GPU
```

Ao diagnosticar pós-processamento, teste:

* desativar todos os passes;
* reativar um por vez;
* reduzir resolução de passes auxiliares;
* reduzir DPR temporariamente;
* comparar bloom seletivo, blur e depth-based effects isoladamente.

Nunca conclua que “a geometria está pesada” antes de desligar o pipeline fullscreen e medir novamente.

---

## 12. Sombras frequentemente custam uma segunda cena

Uma luz com shadow map precisa renderizar a cena do ponto de vista da luz.

Com várias luzes que projetam sombras, o custo pode crescer rapidamente.

Pergunte:

* todos os objetos precisam `castShadow = true`?
* todos precisam `receiveShadow = true`?
* a resolução do shadow map é necessária?
* uma luz adicional realmente precisa projetar sombra?
* objetos distantes podem sair do shadow frustum?

Exemplo:

```javascript
light.shadow.mapSize.set(1024, 1024);
```

Aumentar para 4096 não é uma melhoria gratuita de qualidade. É uma multiplicação relevante de memória e pixels processados.

---

## 13. Texturas pesam na memória da GPU

Uma imagem comprimida em disco não ocupa a mesma quantidade de memória depois de enviada à GPU.

Uma textura grande pode consumir muito mais memória do que seu arquivo `.jpg` sugere.

Problemas comuns:

* texturas 4K em objetos pequenos;
* vários mapas PBR 4K por material;
* assets duplicando texturas;
* HDRs maiores do que o necessário;
* falta de compressão de textura apropriada.

O artigo [[javascript/07-threejs/18-UVs, texturas, PBR e environment maps em Three.js|UVs, texturas, PBR e environment maps]] trata a superfície visual. Aqui, a pergunta é outra: **quanto dessa informação visual o dispositivo consegue manter e processar sem pressionar memória e banda?**

---

## 14. Garbage collection pode causar travadas periódicas

JavaScript libera memória automaticamente, mas isso não significa custo zero.

Se o render loop cria muitos objetos temporários, o coletor de lixo precisa intervir com frequência.

Antipadrão:

```javascript
function animate() {
  const direction = new THREE.Vector3();
  const nextPosition = new THREE.Vector3();

  // ...
}
```

Se isso roda a cada frame, você cria objetos continuamente.

Melhor:

```javascript
const direction = new THREE.Vector3();
const nextPosition = new THREE.Vector3();

function animate() {
  direction.set(0, 0, 0);
  nextPosition.copy(mesh.position);

  // ...
}
```

Reutilização de objetos reduz pressão de GC.

---

## 15. Evite criar geometrias e materiais dentro do loop

Isto é especialmente importante em React Three Fiber.

Antipadrão conceitual:

```jsx
<mesh geometry={new THREE.BoxGeometry()}>
  <meshStandardMaterial color="tomato" />
</mesh>
```

Se a estrutura for recriada repetidamente, você pode gerar alocações e trabalho desnecessário.

Prefira reutilizar recursos quando fizer sentido.

```jsx
const geometry = useMemo(
  () => new THREE.BoxGeometry(1, 1, 1),
  []
);
```

O objetivo não é usar `useMemo` em tudo. É evitar recriar recursos caros sem necessidade.

---

## 16. Atualizar buffers também tem custo

Em sistemas procedurais do [[javascript/07-threejs/20-Partículas, curvas, campos e geometria procedural em Three.js|artigo 20]], podemos modificar atributos ao longo do tempo.

```javascript
positionAttribute.needsUpdate = true;
```

Isso pode exigir upload de dados da CPU para a GPU.

Se milhares ou milhões de valores mudam por frame, pergunte se:

* todos precisam ser atualizados;
* parte da animação pode acontecer no shader;
* o buffer pode ser menor;
* `DynamicDrawUsage` é apropriado;
* o sistema pode usar instancing;
* a simulação pode operar em frequência menor que o render.

Mover trabalho para a GPU só é vantajoso quando reduz o gargalo real e não cria outro maior.

---

## 17. Culling evita desenhar o que não importa

Three.js já realiza frustum culling em muitos objetos.

```javascript
mesh.frustumCulled = true;
```

Mas cenas grandes podem exigir estratégias adicionais.

* dividir mundo em regiões;
* ativar/desativar grupos por proximidade;
* usar LOD;
* não carregar tudo de uma vez;
* não manter objetos invisíveis atualizando lógica por frame.

Não desenhar é geralmente mais barato do que desenhar de forma “otimizada”.

---

## 18. LOD troca detalhe por distância

Objetos distantes ocupam poucos pixels. Não faz sentido manter o mesmo detalhe geométrico em todas as distâncias.

Three.js oferece `LOD`.

```javascript
const lod = new THREE.LOD();

lod.addLevel(highDetailMesh, 0);
lod.addLevel(mediumDetailMesh, 20);
lod.addLevel(lowDetailMesh, 50);
```

A ideia é semelhante a um design responsivo: o conteúdo visual se adapta à escala em que será percebido.

---

## 19. Interação também pode virar gargalo de CPU

No [[javascript/07-threejs/21-Picking, raycasting, seleção e drag em Three.js|artigo 21]], raycasting foi tratado como sistema de interação. Em cenas grandes, ele também entra no profiling.

Evite raycast contra toda a cena em todo `pointermove` sem necessidade.

Reduza o conjunto testado com:

* arrays de pickables;
* layers;
* bounding volumes;
* particionamento espacial;
* frequência controlada de teste;
* `instanceId` para famílias instanciadas.

O problema de interação pode ser CPU-bound mesmo que a renderização esteja leve.

---

## 20. React Three Fiber adiciona uma camada de estado que também deve ser medida

Em React Three Fiber, além de GPU e Three.js, existe custo de React.

Use estado React para estado de aplicação, não para cada valor visual de alta frequência.

Antipadrão:

```jsx
useFrame(() => {
  setX(value => value + 0.01);
});
```

Isso pode provocar renders React a cada frame.

Para transformações visuais contínuas, refs costumam ser mais adequadas.

```jsx
const meshRef = useRef();

useFrame((_, delta) => {
  meshRef.current.rotation.y += delta;
});
```

A diferença não é “React ruim, refs boas”. É separar estado declarativo de aplicação de estado visual transitório por frame.

---

## 21. Chrome DevTools ajuda a localizar custo de CPU

Ao gravar uma sessão na aba Performance do navegador, procure:

* long tasks;
* funções JavaScript que ocupam muito tempo;
* eventos frequentes;
* garbage collection;
* layout e style recalculation fora do canvas;
* picos durante interação;
* trabalho repetido em cada frame.

O profiler não responde automaticamente “qual linha está errada”, mas ajuda a eliminar hipóteses.

Se a thread principal fica ocupada por JavaScript antes de cada frame, reduzir bloom provavelmente não resolverá o gargalo principal.

---

## 22. GPU profiling precisa de interpretação cuidadosa

Medir GPU é mais difícil do que medir JavaScript porque CPU e GPU trabalham de forma assíncrona.

Um sinal prático de GPU-bound é quando:

* reduzir DPR melhora muito o frame time;
* desativar passes fullscreen melhora muito;
* reduzir sombras melhora muito;
* reduzir complexidade de shader melhora muito;
* reduzir quantidade de pixels cobertos melhora mais do que reduzir lógica JS.

Não use um único sinal como prova absoluta. Combine experimentos.

---

## 23. Uma matriz simples ajuda a identificar o gargalo

| Teste | Se melhorar bastante | Suspeita principal |
| --- | --- | --- |
| reduzir DPR | sim | fill rate / GPU |
| desligar post-processing | sim | passes fullscreen / GPU |
| reduzir draw calls | sim | CPU + driver |
| pausar lógica JS | sim | CPU |
| reduzir raycasting | sim | CPU / interação |
| reduzir sombras | sim | GPU / shadow passes |
| reduzir textura | sim | memória / banda GPU |
| reduzir partículas transparentes | sim | overdraw / fill rate |
| evitar alocações por frame | sim | GC / CPU |

Essa matriz não substitui profiling, mas transforma sintomas em hipóteses testáveis.

---

## 24. Performance mobile precisa ser tratada como alvo próprio

Um notebook potente pode mascarar decisões ruins.

Mobile costuma ter limitações mais fortes em:

* GPU;
* largura de banda;
* memória;
* dissipação térmica;
* DPR alto;
* duração de bateria.

Além disso, performance pode piorar depois de alguns minutos por thermal throttling.

Por isso, não valide apenas no desktop de desenvolvimento.

---

## 25. Resize também pode causar trabalho desnecessário

Ao redimensionar o canvas, atualizamos câmera e renderer.

```javascript
camera.aspect = width / height;
camera.updateProjectionMatrix();
renderer.setSize(width, height, false);
```

Mas resize handlers muito frequentes podem disparar trabalho excessivo.

O mesmo vale para reconstruir render targets ou recalcular estruturas pesadas em toda mudança pequena de viewport.

---

## 26. Otimização prematura é um antipadrão técnico

Alguns sinais de otimização prematura:

* implementar instancing sem draw calls altos;
* reduzir polígonos quando o gargalo é pós-processamento;
* migrar lógica para shader sem CPU estar saturada;
* adicionar LOD em uma cena minúscula;
* criar sistema complexo de culling sem objetos suficientes;
* reduzir qualidade de textura sem pressão de memória.

O custo de manutenção também faz parte da performance do produto.

Uma solução tecnicamente sofisticada, mas difícil de manter, precisa justificar sua complexidade com ganho medido.

---

## 27. Faça testes A/B técnicos

Uma forma simples de investigar gargalos é criar toggles de debug.

```javascript
const debug = {
  shadows: true,
  post: true,
  particles: true,
  interaction: true
};
```

Então você mede combinações.

```javascript
particles.visible = debug.particles;
light.castShadow = debug.shadows;
```

Esse tipo de controle transforma profiling em experimento reproduzível.

---

## 28. Instrumente frame time no próprio projeto

Uma medição simples pode ajudar durante desenvolvimento.

```javascript
let previous = performance.now();

function animate(now) {
  const frameTime = now - previous;
  previous = now;

  if (frameTime > 20) {
    console.log(`Frame lento: ${frameTime.toFixed(2)} ms`);
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

Isso não substitui um profiler, mas cria consciência imediata de picos.

---

## 29. Exemplo completo em Three.js com painel de diagnóstico

```javascript
import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.set(0, 4, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 8, 5);
light.castShadow = true;
scene.add(light);

const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material = new THREE.MeshStandardMaterial({ color: 0x66aaff });
const count = 2000;
const cubes = new THREE.InstancedMesh(geometry, material, count);

const dummy = new THREE.Object3D();

for (let i = 0; i < count; i += 1) {
  dummy.position.set(
    (Math.random() - 0.5) * 12,
    (Math.random() - 0.5) * 6,
    (Math.random() - 0.5) * 8
  );

  dummy.rotation.set(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    0
  );

  dummy.updateMatrix();
  cubes.setMatrixAt(i, dummy.matrix);
}

scene.add(cubes);

const statsElement = document.createElement('pre');
statsElement.style.position = 'fixed';
statsElement.style.top = '12px';
statsElement.style.left = '12px';
statsElement.style.padding = '8px';
statsElement.style.background = 'rgba(0,0,0,0.7)';
statsElement.style.color = 'white';
document.body.appendChild(statsElement);

let previous = performance.now();
let accumulator = 0;
let samples = 0;

function animate(now) {
  const frameTime = now - previous;
  previous = now;

  accumulator += frameTime;
  samples += 1;

  cubes.rotation.y += 0.0015 * frameTime;

  renderer.render(scene, camera);

  if (samples >= 30) {
    const averageFrameTime = accumulator / samples;
    const info = renderer.info.render;

    statsElement.textContent = [
      `Frame: ${averageFrameTime.toFixed(2)} ms`,
      `FPS aprox.: ${(1000 / averageFrameTime).toFixed(1)}`,
      `Draw calls: ${info.calls}`,
      `Triângulos: ${info.triangles}`,
      `DPR: ${renderer.getPixelRatio()}`
    ].join('\n');

    accumulator = 0;
    samples = 0;
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height, false);
});
```

Esse exemplo não tenta “otimizar tudo”. Ele cria uma baseline observável: frame time, FPS aproximado, draw calls, triângulos e DPR.

---

## 30. Exemplo completo em React Three Fiber

```jsx
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

function InstancedField() {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const count = 1500;

  const transforms = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 8
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        0
      ]
    }));
  }, []);

  useMemo(() => {
    requestAnimationFrame(() => {
      transforms.forEach((item, index) => {
        dummy.position.set(...item.position);
        dummy.rotation.set(...item.rotation);
        dummy.updateMatrix();
        meshRef.current?.setMatrixAt(index, dummy.matrix);
      });

      if (meshRef.current) {
        meshRef.current.instanceMatrix.needsUpdate = true;
      }
    });
  }, [dummy, transforms]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshStandardMaterial color="#66aaff" />
    </instancedMesh>
  );
}

function PerformanceProbe() {
  const { gl } = useThree();
  const [label, setLabel] = useState('medindo...');
  const accumulatorRef = useRef(0);
  const samplesRef = useRef(0);

  useFrame((_, delta) => {
    accumulatorRef.current += delta * 1000;
    samplesRef.current += 1;

    if (samplesRef.current >= 30) {
      const average = accumulatorRef.current / samplesRef.current;
      const info = gl.info.render;

      setLabel(
        `${average.toFixed(2)} ms | ${info.calls} calls | ${info.triangles} tris`
      );

      accumulatorRef.current = 0;
      samplesRef.current = 0;
    }
  });

  return (
    <div
      style={{
        position: 'fixed',
        top: 12,
        left: 12,
        zIndex: 10,
        padding: 8,
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        fontFamily: 'monospace'
      }}
    >
      {label}
    </div>
  );
}

export default function App() {
  return (
    <>
      <PerformanceProbe />

      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 4, 10], fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 5]} intensity={2} />
        <InstancedField />
      </Canvas>
    </>
  );
}
```

Aqui, `dpr={[1, 1.5]}` limita a densidade de pixels e `gl.info.render` continua disponível para inspeção.

---

## 31. Checklist de diagnóstico

Antes de otimizar, responda:

* o problema acontece em desktop, mobile ou ambos?
* qual é o frame time médio e quais são os picos?
* o gargalo parece CPU ou GPU?
* quantas draw calls existem?
* quantos triângulos estão sendo enviados?
* quantos materiais diferentes existem?
* há instancing possível?
* DPR está acima do necessário?
* quantos passes fullscreen estão ativos?
* sombras estão sendo renderizadas mais vezes do que precisam?
* existem texturas maiores do que o uso em tela justifica?
* o loop cria objetos temporários por frame?
* há atualização de buffers CPU → GPU todo frame?
* raycasting está testando objetos demais?
* React state está sendo atualizado em alta frequência?
* objetos fora de cena continuam executando lógica?
* uma mudança isolada melhora de fato o frame time?

Esse checklist evita otimizações por superstição.

---

## 32. Ordem prática para investigar uma cena lenta

Uma sequência eficiente é:

1. medir frame time;
2. registrar `renderer.info`;
3. desligar post-processing;
4. desligar sombras;
5. reduzir DPR;
6. pausar animações e lógica de frame;
7. reduzir raycasting/interação;
8. comparar draw calls;
9. observar alocações e GC;
10. testar texturas e assets menores;
11. só então aplicar instancing, LOD, batching ou shaders alternativos.

Essa ordem não é lei universal, mas cria um processo disciplinado de eliminação de hipóteses.

---

## 33. A próxima pergunta é sobre pipeline, não apenas otimização

Depois de dominar profiling, você passa a enxergar o renderer como um pipeline com limites concretos: CPU prepara trabalho, GPU executa estágios gráficos, memória e banda conectam recursos, e decisões de arquitetura determinam quanto trabalho precisa circular por esse sistema.

A próxima fase leva essa visão para pipelines gráficos mais modernos e para a transição conceitual além de WebGL.

---

## Resumo para memorizar

Performance profissional em Three.js não começa com uma técnica de otimização. Começa com **medição**.

O modelo mental principal é:

`frame budget → medir → localizar CPU/GPU → formular hipótese → mudar uma variável → medir novamente`

Draw calls ajudam a enxergar custo de preparação de renderização. Triângulos medem apenas uma parte do trabalho. DPR, overdraw e pós-processamento revelam custo por pixel. Sombras adicionam renderizações extras. Texturas pressionam memória e banda. Alocações por frame podem gerar garbage collection. Atualizações de buffers transferem dados entre CPU e GPU. Raycasting pode saturar CPU. React state pode criar trabalho desnecessário se usado como estado visual por frame.

Use [[javascript/07-threejs/11-InstancedMesh e desenho eficiente de muitas formas|InstancedMesh]] quando draw calls são o problema, [[javascript/07-threejs/12-Shaders, GLSL e materiais customizados|shaders]] quando a GPU pode executar trabalho massivo de forma mais adequada, [[javascript/07-threejs/18-UVs, texturas, PBR e environment maps em Three.js|texturas]] de acordo com o orçamento real de memória, [[javascript/07-threejs/19-Post-processing, render targets, depth e stencil em Three.js|post-processing]] com consciência de resolução, [[javascript/07-threejs/20-Partículas, curvas, campos e geometria procedural em Three.js|sistemas procedurais]] com limites explícitos e [[javascript/07-threejs/21-Picking, raycasting, seleção e drag em Three.js|raycasting]] apenas sobre conjuntos relevantes.

A regra mais importante é: **não otimize o que você ainda não mediu**.