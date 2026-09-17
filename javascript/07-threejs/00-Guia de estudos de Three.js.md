# Guia de estudos de Three.js

Esta trilha introduz [[javascript/07-threejs/01-Three.js e o modelo mental de uma cena 3D|Three.js]] a partir do que já é conhecido de JavaScript, DOM, Canvas e design de interfaces. O objetivo não é decorar a API inteira. É entender o suficiente da arquitetura 3D para conseguir construir, avaliar e dirigir uma cena com intenção.

A pergunta central é: **como uma descrição abstrata de objetos em um espaço tridimensional vira pixels em uma tela 2D?**

A ordem recomendada é:

* [[javascript/07-threejs/01-Three.js e o modelo mental de uma cena 3D|Three.js e o modelo mental de uma cena 3D]]: entender cena, câmera, renderer e objetos.
* [[javascript/07-threejs/02-Cena, câmera, renderer e coordenadas|Cena, câmera, renderer e coordenadas]]: entender onde as coisas existem e como a câmera as enxerga.
* [[javascript/07-threejs/03-Geometria, material, mesh e luz|Geometria, material, mesh e luz]]: separar forma, aparência e iluminação.
* [[javascript/07-threejs/04-Loop de renderização, tempo e animação|Loop de renderização, tempo e animação]]: entender o que realmente acontece a cada frame.
* [[javascript/07-threejs/05-Interação, raycasting e relação com o DOM|Interação, raycasting e relação com o DOM]]: conectar cursor, clique, resize e interface HTML à cena 3D.
* [[javascript/07-threejs/06-Composição visual, performance e diagnóstico de cenas 3D|Composição visual, performance e diagnóstico de cenas 3D]]: separar uma cena tecnicamente correta de uma cena visualmente convincente.
* [[javascript/07-threejs/07-React Three Fiber no Next.js|React Three Fiber no Next.js]]: traduzir o modelo mental de Three.js para componentes React e Next.js.
* [[javascript/07-threejs/08-Ordem prática para dominar Three.js|Ordem prática para dominar Three.js]]: priorizar transformações, espaços local/global, câmera, projeção e exercícios pequenos antes de cenas complexas.
* [[javascript/07-threejs/09-Transformações locais, globais e hierarquia em Three.js|Transformações locais, globais e hierarquia em Three.js]]: dominar `Object3D`, `Group`, pivôs, matrizes e conversões entre espaços.
* [[javascript/07-threejs/10-BufferGeometry e geometria paramétrica em Three.js|BufferGeometry e geometria paramétrica em Three.js]]: construir forma a partir de vértices, índices, atributos e regras geométricas próprias.
* [[javascript/07-threejs/11-InstancedMesh e desenho eficiente de muitas formas|InstancedMesh e desenho eficiente de muitas formas]]: renderizar grandes famílias de objetos repetidos sem multiplicar draw calls desnecessariamente.
* [[javascript/07-threejs/12-Shaders, GLSL e materiais customizados|Shaders, GLSL e materiais customizados]]: entender o que a GPU executa por vértice e por fragmento e quando um material customizado realmente vale a pena.
* [[javascript/07-threejs/13-Câmera, projeção e leitura espacial em Three.js|Câmera, projeção e leitura espacial em Three.js]]: tratar `fov`, distância, alvo, parallax e enquadramento como parte da composição.
* [[javascript/07-threejs/14-GSAP, interpolação de estados e animação dirigida em Three.js|GSAP, interpolação de estados e animação dirigida em Three.js]]: separar estados canônicos, interpolação e controle temporal em sequências complexas.
* [[javascript/07-threejs/15-Perspectiva forçada, oclusão e objetos impossíveis em Three.js|Perspectiva forçada, oclusão e objetos impossíveis em Three.js]]: resolver silhueta, encontros projetados, sweet spot da câmera e ciclos locais de oclusão.
* [[javascript/07-threejs/16-Arquitetura avançada de React Three Fiber para cenas complexas|Arquitetura avançada de React Three Fiber para cenas complexas]]: separar modelo geométrico, estado narrativo, interpolação, renderização, câmera e debug em cenas grandes.
* [[javascript/07-threejs/17-glTF e pipeline Blender para Three.js|glTF e pipeline Blender para Three.js]]: organizar assets externos, exportação, hierarquia, materiais, animações, carregamento e integração Blender → Three.js.
* [[javascript/07-threejs/18-UVs, texturas, PBR e environment maps em Three.js|UVs, texturas, PBR e environment maps em Three.js]]: conectar UVs, mapas de textura, `colorSpace`, materiais PBR, iluminação por ambiente, HDR e tone mapping.
* [[javascript/07-threejs/19-Post-processing, render targets, depth e stencil em Three.js|Post-processing, render targets, depth e stencil em Three.js]]: compreender composição em múltiplas passagens, imagens intermediárias, depth textures, stencil, múltiplas câmeras e custos de efeitos em screen space.
* [[javascript/07-threejs/20-Partículas, curvas, campos e geometria procedural em Three.js|Partículas, curvas, campos e geometria procedural em Three.js]]: gerar sistemas visuais por regras, escolher entre CPU e GPU e controlar partículas, trajetórias, campos e superfícies procedurais.
* [[javascript/07-threejs/21-Picking, raycasting, seleção e drag em Three.js|Picking, raycasting, seleção e drag em Three.js]]: transformar entrada 2D em seleção semântica e manipulação espacial previsível, inclusive em cenas grandes e instanciadas.
* [[javascript/07-threejs/22-Performance profissional, profiling e diagnóstico de gargalos em Three.js|Performance profissional, profiling e diagnóstico de gargalos em Three.js]]: medir frame time, separar gargalos de CPU/GPU e escolher otimizações a partir de evidência em vez de heurísticas soltas.

---

## 1. O mapa mental da trilha

```mermaid
flowchart LR
    A["JavaScript e<br>Canvas"] --> B["Cena, câmera<br>e renderer"]
    B --> C["Geometria,<br>material e luz"]
    C --> D["Render loop<br>e interação"]
    D --> E["Composição e<br>performance"]
    E --> F["React Three Fiber<br>e Next.js"]
    F --> G["Transformações e<br>hierarquia"]
    G --> H["BufferGeometry e<br>geometria paramétrica"]
    H --> I["Instancing e<br>shaders"]
    I --> J["Câmera e<br>projeção"]
    J --> K["GSAP, estados e<br>timing"]
    K --> L["Perspectiva forçada<br>e oclusão"]
    L --> M["Arquitetura R3F<br>para cenas complexas"]
    M --> N["glTF e pipeline<br>Blender para web"]
    N --> O["UVs, PBR e<br>environment maps"]
    O --> P["Post-processing,<br>depth e stencil"]
    P --> Q["Partículas, curvas<br>e procedural"]
    Q --> R["Picking, seleção<br>e drag"]
    R --> S["Profiling, frame time<br>e gargalos"]

    classDef core fill:#1f1f1f,stroke:#f1a7b5,color:#fff,stroke-width:2px;
    classDef component fill:#242424,stroke:#888,color:#fff;
    class A,S core;
    class B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R component;
```

Three.js fica muito mais simples quando você percebe que boa parte do trabalho se repete em quatro perguntas:

1. **O que existe na cena?**
2. **Onde cada coisa está?**
3. **De onde estamos olhando?**
4. **Como o renderer transforma isso em pixels?**

Na parte avançada surgem outras perguntas: **como manter identidade, desempenho e intenção visual enquanto tudo muda ao longo do tempo?**, **como organizar uma cena complexa para que projeção, oclusão, câmera e código continuem legíveis?**, **como integrar assets produzidos fora do código sem transformar o runtime em uma coleção de correções de exportação?**, **como fazer uma superfície responder de forma coerente a texturas, luz e ambiente sem compensar um erro com outro?**, **quando a imagem final precisa passar por buffers e passes adicionais antes de chegar à tela?**, **quando vale gerar forma e comportamento por regras em vez de modelar cada elemento manualmente?**, **como converter um gesto 2D em seleção e movimento espacial sem confundir mesh física, entidade semântica e estado da aplicação?** e **como descobrir onde está o gargalo real antes de escolher uma técnica de otimização?**

---

## 2. O que você precisa saber antes

Não é necessário dominar matemática avançada para começar. Para a base, basta reconhecer:

* objetos e arrays em JavaScript;
* funções e módulos `import` / `export`;
* coordenadas `x`, `y` e `z`;
* eventos do navegador;
* [[javascript/04-dom-e-browser/17-Canvas e gráficos|Canvas e gráficos]];
* `requestAnimationFrame` ou a ideia de executar código repetidamente ao longo do tempo.

Para os artigos 09 a 22, passa a ser importante reconhecer vetores, matrizes, hierarquia de transforms, interpolação, projeção, depth buffer, a diferença entre estado de aplicação e estado visual, a distinção entre arquivo de autoria e asset de runtime, a diferença entre texturas de cor e texturas de dados, a ideia de renderizar uma imagem para uma textura intermediária, a diferença entre gerar um sistema na CPU e delegar cálculos repetitivos à GPU, a conversão entre coordenadas de tela, NDC, espaço global e espaço local e a leitura de frame time como orçamento de renderização. Esses conceitos são introduzidos progressivamente dentro da própria trilha.

---

## 3. O que Three.js resolve

O navegador já possui APIs gráficas de baixo nível, como WebGL. Elas dão acesso à GPU, mas exigem que você cuide de muitos detalhes técnicos. Three.js cria uma camada mais amigável sobre esse processo.

Em vez de programar diretamente cada etapa gráfica, você trabalha com objetos como:

```javascript
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial();
const mesh = new THREE.Mesh(geometry, material);
```

A ideia é parecida com usar componentes de interface em vez de desenhar cada pixel manualmente.

---

## 4. Critério de domínio

Considere esta trilha consolidada quando você conseguir olhar para uma cena e responder:

* qual é a câmera e qual é seu `fov`;
* onde a câmera está posicionada;
* quais objetos são `Mesh`;
* quais geometrias e materiais formam esses objetos;
* quais luzes realmente afetam os materiais;
* o que está sendo alterado a cada frame;
* se um efeito pertence ao Three.js, ao React Three Fiber ou ao CSS/DOM;
* qual parte provavelmente está deixando a cena pesada;
* por que uma composição parece achatada, genérica ou confusa;
* como converter pontos entre espaços local, global e projetado;
* quando usar `BufferGeometry`, `InstancedMesh` ou shader customizado;
* como separar estados canônicos da timeline que os conecta;
* como distinguir uma falha de geometria de uma falha de câmera/projeção;
* como construir uma relação de oclusão local sem exigir conexão física em 3D;
* como estruturar uma cena R3F para que matemática, renderização e câmera não fiquem acopladas;
* quando uma correção pertence ao Blender e quando pertence ao Three.js;
* como inspecionar hierarquia, nomes, materiais e animações de um asset glTF;
* como distinguir texturas de cor de texturas de dados e atribuir `colorSpace` coerente;
* como UVs, texel density, normal maps, roughness e metalness alteram a leitura de uma superfície;
* por que environment maps e HDR são parte da iluminação PBR e não apenas um fundo visual;
* quando usar render direto, render target, post-processing, depth texture ou stencil;
* como separar custo de geometria de custo de pixels em pipelines com múltiplos passes;
* como diagnosticar ordem de passes, resolução de targets e color management antes de ajustar efeitos;
* quando um sistema procedural deve usar `Points`, `InstancedMesh`, `BufferGeometry` ou shader;
* como distinguir aleatoriedade de ruído coerente e usar seed quando a reprodutibilidade importa;
* como curvas, tangentes e campos transformam regras matemáticas em trajetórias e movimento;
* quando uma atualização deve permanecer na CPU e quando vale migrá-la para a GPU;
* como converter pointer em NDC e usar `Raycaster` com a câmera ativa;
* como separar interseção física, entidade selecionável e identidade de domínio;
* como usar `instanceId`, layers e listas de pickables para interação em escala;
* como transformar movimento do cursor em drag restrito a plano ou eixo sem misturar espaço global e local;
* como usar frame time, `renderer.info`, DPR, passes, sombras e alocações para separar gargalos de CPU e GPU;
* como comparar uma baseline com uma hipótese de otimização antes de manter a mudança;
* que mudança deve ser feita sem pedir ao Codex para reconstruir o sistema inteiro.

O objetivo prático é **ganhar capacidade de direção técnica e visual**.

---

## 5. Ordem prática de prioridade

Para cenas com muitas peças, câmera dirigida, animação e assets externos, a ordem mais eficiente não é começar por shaders ou efeitos avançados.

Priorize:

1. `Object3D`, `Group`, posição, rotação, escala e pivô;
2. `Vector3`, matrizes e conversão entre espaços local e global;
3. câmera, `fov`, perspectiva e projeção em tela;
4. geometria, `BoxGeometry` e depois `BufferGeometry`;
5. React Three Fiber, `useThree`, refs e `useFrame`;
6. animação e interpolação de estados com GSAP;
7. `InstancedMesh` e shaders quando o problema realmente exigir;
8. perspectiva forçada e oclusão apenas depois de os estados estáticos básicos estarem resolvidos;
9. separar matemática, estado, câmera e JSX antes de ampliar a complexidade da cena;
10. integrar glTF e Blender quando a forma, os materiais ou as animações forem melhor produzidos como asset externo;
11. refinar UVs, texturas, PBR, environment maps e color management quando a forma e o pipeline de asset já estiverem previsíveis;
12. adicionar post-processing, render targets, depth ou stencil somente quando a cena base já estiver correta e o problema realmente pertencer à composição da imagem;
13. criar sistemas procedurais somente depois de definir regra base, representação visual, orçamento de elementos e local correto de atualização entre CPU e GPU;
14. implementar interação espacial definindo primeiro entidade semântica, conjunto de pickables, regra de oclusão e graus de liberdade do drag antes de otimizar o raycasting;
15. otimizar apenas depois de medir frame time, registrar uma baseline e identificar se o custo dominante está em CPU, GPU, memória, pixels, draw calls ou interação.

A nota [[javascript/07-threejs/08-Ordem prática para dominar Three.js|Ordem prática para dominar Three.js]] transforma a base dessa sequência em exercícios pequenos. Os artigos 09–22 formam a trilha avançada para cenas mais dirigidas, complexas, integradas a pipelines de produção 3D, composição gráfica, geração procedural, interação espacial e profiling profissional.

---

## 6. Fases avançadas

A expansão avançada foi dividida em blocos menores para que cada fase tenha um único problema central e possa ser encerrada antes de a próxima começar.

* **Fase 1, estrutura espacial, concluída**: [[javascript/07-threejs/09-Transformações locais, globais e hierarquia em Three.js|09]] e [[javascript/07-threejs/10-BufferGeometry e geometria paramétrica em Three.js|10]].
* **Fase 2, GPU e escala, concluída**: [[javascript/07-threejs/11-InstancedMesh e desenho eficiente de muitas formas|11]] e [[javascript/07-threejs/12-Shaders, GLSL e materiais customizados|12]].
* **Fase 3, câmera e movimento, concluída**: [[javascript/07-threejs/13-Câmera, projeção e leitura espacial em Three.js|13]] e [[javascript/07-threejs/14-GSAP, interpolação de estados e animação dirigida em Three.js|14]].
* **Fase 4, perspectiva, projeção e oclusão, concluída**: [[javascript/07-threejs/15-Perspectiva forçada, oclusão e objetos impossíveis em Three.js|15]].
* **Fase 5, arquitetura de cenas complexas em R3F, concluída**: [[javascript/07-threejs/16-Arquitetura avançada de React Three Fiber para cenas complexas|16]].
* **Fase 6, assets e pipeline 3D, concluída**: [[javascript/07-threejs/17-glTF e pipeline Blender para Three.js|17]].
* **Fase 7, superfície e iluminação avançada, concluída**: [[javascript/07-threejs/18-UVs, texturas, PBR e environment maps em Three.js|18]].
* **Fase 8, composição gráfica avançada, concluída**: [[javascript/07-threejs/19-Post-processing, render targets, depth e stencil em Three.js|19]].
* **Fase 9, sistemas procedurais, concluída**: [[javascript/07-threejs/20-Partículas, curvas, campos e geometria procedural em Three.js|20]].
* **Fase 10, interação espacial, concluída**: [[javascript/07-threejs/21-Picking, raycasting, seleção e drag em Three.js|21]].
* **Fase 11, performance profissional, concluída**: [[javascript/07-threejs/22-Performance profissional, profiling e diagnóstico de gargalos em Three.js|22]].

A Fase 11 fecha o bloco de performance com uma mudança de método: a trilha deixa de tratar otimização como coleção de truques e passa a exigir baseline, frame budget, separação CPU/GPU, hipótese isolada e medição antes/depois. A próxima etapa muda o foco do diagnóstico dentro do pipeline WebGL para a evolução do próprio pipeline gráfico.

A partir daqui, uma fase deve corresponder preferencialmente a um artigo avançado grande. Só temas naturalmente inseparáveis devem compartilhar a mesma fase.

---

## 7. Próximas fases planejadas

A sequência editorial prevista é:

* **Fase 12, WebGPU e próximos pipelines**: modelo de renderização moderno e evolução além de WebGL.

Esse bloco entra separadamente para que a evolução de WebGL para pipelines gráficos mais modernos seja estudada como mudança arquitetural, e não como apenas mais uma técnica de otimização.

---

## Fontes principais

* [Three.js manual](https://threejs.org/manual/)
* [Three.js documentation](https://threejs.org/docs/)
* [Three.js examples](https://threejs.org/examples/)
* [React Three Fiber documentation](https://r3f.docs.pmnd.rs/)
* [GSAP documentation](https://gsap.com/docs/v3/)
* [Khronos glTF 2.0 specification](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html)
* [Blender manual: glTF 2.0](https://docs.blender.org/manual/en/dev/addons/scene_gltf2.html)
* [Three.js Texture](https://threejs.org/docs/pages/Texture.html)
* [Three.js MeshStandardMaterial](https://threejs.org/docs/pages/MeshStandardMaterial.html)
* [Three.js PMREMGenerator](https://threejs.org/docs/pages/PMREMGenerator.html)
* [Three.js EffectComposer](https://threejs.org/docs/pages/EffectComposer.html)
* [Three.js WebGLRenderTarget](https://threejs.org/docs/pages/WebGLRenderTarget.html)
* [Three.js DepthTexture](https://threejs.org/docs/pages/DepthTexture.html)
* [Three.js Points](https://threejs.org/docs/pages/Points.html)
* [Three.js Curve](https://threejs.org/docs/pages/Curve.html)
* [Three.js BufferGeometry](https://threejs.org/docs/pages/BufferGeometry.html)
* [Three.js Raycaster](https://threejs.org/docs/pages/Raycaster.html)
* [React Three Fiber events](https://r3f.docs.pmnd.rs/api/events)
* [Three.js WebGLRenderer.info](https://threejs.org/docs/pages/WebGLRenderer.html#info)
* [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)

---

## Resumo para memorizar

Three.js não é principalmente uma biblioteca de "efeitos 3D". É uma forma de descrever uma **cena**, posicionar uma **câmera**, criar ou carregar **objetos**, permitir que o usuário interaja com eles, medir o custo desse sistema e pedir a um **renderer** que transforme esse estado em pixels. Aprender essa arquitetura primeiro torna animação, interação, React Three Fiber, integração com assets, direção de materiais, composição final, geração procedural e profiling muito menos misteriosos.

Para trabalho aplicado, a prioridade é: **hierarquia e transformações → espaços local/global → câmera e projeção → geometria → React Three Fiber → animação → instancing e shaders → oclusão/perspectiva forçada → arquitetura de cena → pipeline de assets → superfícies e iluminação PBR → post-processing e buffers auxiliares → sistemas procedurais → picking, seleção e drag → profiling e otimização medida**. Resolva estados estáticos antes de animar, trate a câmera como parte da composição, mantenha matemática, estado e renderização separáveis, não use o runtime para mascarar problemas que pertencem ao asset de autoria, não use luz ou exposição para compensar UVs, mapas ou `colorSpace` incorretos, não use pós-processamento para esconder uma cena base que ainda está errada, não use complexidade procedural quando uma representação mais simples entrega o mesmo resultado, não trate toda mesh atingida como se já fosse a entidade de aplicação que o usuário pretende manipular e não otimize sem uma baseline que mostre qual gargalo você está tentando reduzir.