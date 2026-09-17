# Log de alterações do vault

Este arquivo registra o histórico de criações, modificações, edições e reorganizações estruturais realizadas no vault em **ordem cronológica decrescente (mais recente no topo)**.

## 2026-09-17

* **Conclusão da Fase 12 e fechamento da trilha avançada de Three.js (`javascript/07-threejs/00`, `23`, `js/vault.js`)**:
  * **Artigo 23**: criado [[javascript/07-threejs/23-WebGPU, TSL e próximos pipelines em Three.js|WebGPU, TSL e próximos pipelines em Three.js]], cobrindo a diferença entre WebGPU, `WebGPURenderer`, TSL e WGSL, entry point `three/webgpu`, inicialização assíncrona, fallback WebGL 2, Node Materials, migração de shaders customizados, compute, storage buffers, readback, `RenderPipeline`, MRT e integração com React Three Fiber.
  * **Modelo mental de pipeline moderno**: formalizada a separação `API gráfica → renderer → backend → grafo TSL → WGSL/GLSL → GPU`, evitando tratar WebGPU como simples substituição de renderer ou como modo automático de performance.
  * **Compute e dados residentes na GPU**: registrada a cadeia `CPU agenda → compute processa → storage buffer mantém dados → renderização consome`, com ênfase em evitar uploads e readbacks desnecessários quando grandes conjuntos de dados podem permanecer na GPU.
  * **Migração segura**: estruturado o processo `baseline → troca de renderer → migração de shaders para TSL → migração de post-processing para RenderPipeline → compute apenas onde fizer sentido → nova medição`, preservando o método de profiling consolidado na Fase 11.
  * **Compatibilidade**: distinguido fallback transparente, enhancement progressivo e WebGPU obrigatório; `forceWebGL` é tratado como teste de portabilidade do novo renderer, não como validação de recursos WebGPU exclusivos.
  * **Código didático**: adicionados snippets atômicos, exemplo de compute com `instancedArray()`/`computeAsync()`, composição com `RenderPipeline` e exemplos completos em Three.js e React Three Fiber usando TSL.
  * **Verificação técnica**: conteúdo alinhado à documentação atual do Three.js para `WebGPURenderer`, TSL, `RenderPipeline`, `StorageBufferNode` e compute, e à documentação atual do React Three Fiber para inicialização assíncrona do renderer via `Canvas.gl`.
  * **Guia atualizado**: [[javascript/07-threejs/00-Guia de estudos de Three.js|Guia de estudos de Three.js]] passa a incorporar o artigo 23, estender o mapa mental até WebGPU/TSL/compute, marcar a Fase 12 como concluída e substituir a seção de próximas fases pelo fechamento explícito das 12 fases planejadas.
  * **Web App**: `js/vault.js` foi sincronizado com o artigo 23; `script.js` continua obtendo o catálogo dinamicamente de `js/vault.js` e não exigiu alteração manual.
  * **Validação editorial**: o artigo preserva WikiLinks, método Feynman, sentence case e seção `Resumo para memorizar`; não introduz Mermaid próprio. O diagrama do guia foi apenas estendido com o nó final de WebGPU/TSL/compute.
  * **Encerramento**: a expansão avançada planejada de Three.js está concluída nas Fases 1–12. Nenhuma Fase 13 foi criada; novos blocos só devem surgir a partir de um problema de aprendizagem novo e coeso.

* **Conclusão da Fase 11 da trilha avançada de Three.js (`javascript/07-threejs/00`, `22`, `js/vault.js`)**:
  * **Artigo 22**: criado [[javascript/07-threejs/22-Performance profissional, profiling e diagnóstico de gargalos em Three.js|Performance profissional, profiling e diagnóstico de gargalos em Three.js]], cobrindo frame budget, frame time, distinção CPU/GPU, `renderer.info`, draw calls, triângulos, fill rate, DPR, pós-processamento, sombras, texturas e memória de GPU, garbage collection, alocações por frame, atualização de buffers, culling, LOD, raycasting, React Three Fiber e profiling com DevTools.
  * **Modelo mental de performance**: formalizada a cadeia `frame budget → medir → localizar CPU/GPU → formular hipótese → mudar uma variável → medir novamente`, substituindo otimização por heurística por experimentos reproduzíveis.
  * **Diagnóstico por sintomas**: registrada uma matriz prática relacionando redução de DPR, passes, draw calls, sombras, raycasting, texturas e alocações aos gargalos mais prováveis.
  * **Performance em escala**: conectados instancing, shaders, sistemas procedurais, interação e assets às métricas que justificam cada técnica, incluindo o princípio de não adicionar complexidade sem ganho medido.
  * **Código didático**: adicionados snippets atômicos, checklist de diagnóstico e exemplos completos em Three.js e React Three Fiber com frame time, `renderer.info` e limite de DPR.
  * **Guia atualizado**: [[javascript/07-threejs/00-Guia de estudos de Three.js|Guia de estudos de Three.js]] passa a marcar a Fase 11 como concluída, incorpora o artigo 22 à ordem recomendada, ao mapa mental, aos critérios de domínio e às prioridades práticas.
  * **Web App**: `js/vault.js` foi sincronizado com o artigo 22 para manter o fallback da área Three.js completo quando a listagem dinâmica do GitHub falhar; `script.js` não possui catálogo manual correspondente e não exigiu alteração.
  * **Validação editorial**: o artigo preserva WikiLinks, método Feynman, sentence case e seção `Resumo para memorizar`; o diagrama já existente do guia foi apenas estendido com um nó de profiling. Não foi realizada validação local completa de execução/lint nesta sessão.
  * **Correção histórica**: restaurado no registro da Fase 3 o rótulo completo do artigo 14 para `GSAP, interpolação de estados e animação dirigida em Three.js`, sem alterar o destino do WikiLink.
  * **Próxima etapa**: a Fase 12 fica reservada a WebGPU e próximos pipelines; nenhum conteúdo da Fase 12 foi iniciado neste fechamento.

* **Conclusão da Fase 10 da trilha avançada de Three.js (`javascript/07-threejs/00`, `21`, `js/vault.js`)**:
  * **Artigo 21**: criado [[javascript/07-threejs/21-Picking, raycasting, seleção e drag em Three.js|Picking, raycasting, seleção e drag em Three.js]], cobrindo conversão de pointer para NDC, `Raycaster`, dados de interseção, seleção semântica, `userData`, hover, seleção persistente, layers, listas de pickables, bounds, `InstancedMesh.instanceId`, thresholds de `Points`/`Line`, drag por plano/eixo, offset de clique, espaços global/local, pointer capture, seleção por área, GPU picking e integração com React Three Fiber.
  * **Modelo mental de interação**: formalizada a cadeia `ponteiro → NDC → raycaster → interseção → entidade semântica → estado de interação → feedback visual`, separando hit físico de identidade de domínio.
  * **Drag espacial**: registrado que movimento 2D precisa de uma restrição 3D explícita, como plano ou eixo, e que o offset inicial e a conversão entre espaço global e local devem ser preservados.
  * **Escala e performance**: a fase prioriza reduzir o conjunto de objetos testados, usar layers e mapear `instanceId` antes de considerar GPU picking ou estruturas espaciais mais complexas.
  * **Código didático**: adicionados snippets atômicos e exemplos completos em Three.js e React Three Fiber com hover, seleção e drag em plano.
  * **Guia atualizado**: [[javascript/07-threejs/00-Guia de estudos de Three.js|Guia de estudos de Three.js]] passa a marcar a Fase 10 como concluída, incorpora o artigo 21 à ordem recomendada, ao mapa mental, aos critérios de domínio e às prioridades práticas.
  * **Web App**: `js/vault.js` foi sincronizado com o artigo 21 para manter o fallback da área Three.js completo quando a listagem dinâmica do GitHub falhar.
  * **Validação editorial**: o artigo preserva WikiLinks, método Feynman, sentence case e seção `Resumo para memorizar`; o diagrama já existente do guia foi estendido com um nó de interação. Não foi realizada validação local completa de execução/lint nesta sessão.
  * **Próxima etapa**: a Fase 11 fica reservada a profiling de CPU/GPU, draw calls, memória, DPR e diagnóstico de gargalos; nenhum conteúdo da Fase 11 foi iniciado neste fechamento.

* **Conclusão da Fase 9 da trilha avançada de Three.js (`javascript/07-threejs/00`, `20`, `js/vault.js`)**:
  * **Artigo 20**: criado [[javascript/07-threejs/20-Partículas, curvas, campos e geometria procedural em Three.js|Partículas, curvas, campos e geometria procedural em Three.js]], cobrindo geração procedural, `THREE.Points`, distribuições aleatórias com intenção, seed/reprodutibilidade, atualização de partículas em CPU e GPU, curvas `CatmullRomCurve3`, tangentes, `TubeGeometry`, campos radiais e vetoriais, ruído coerente, integração numérica, geometria procedural, normais, bounds, instancing, pooling e diagnóstico de performance.
  * **Modelo mental procedural**: formalizada a ideia `parâmetros → regra → estrutura visual`, distinguindo procedural de animação e separando geração inicial, simulação e deformação visual.
  * **CPU e GPU**: explicitado quando manter lógica na CPU, quando usar atributos dinâmicos e quando migrar cálculos massivos e repetitivos para shaders, conectando a fase aos artigos de `BufferGeometry`, `InstancedMesh` e GLSL.
  * **Curvas e campos**: adicionada a leitura de curvas como funções contínuas de posição e tangente, e de campos como funções que devolvem força ou direção em cada ponto do espaço.
  * **Performance**: registrados limites de quantidade, lifetime, resolução, atualização parcial de buffers, `DynamicDrawUsage`, pooling e escolha entre `Points`, `InstancedMesh` e geometria única.
  * **Código didático**: incluídos snippets atômicos e exemplos completos em Three.js e React Three Fiber, preservando a separação entre geração inicial e estado visual por frame.
  * **Guia atualizado**: [[javascript/07-threejs/00-Guia de estudos de Three.js|Guia de estudos de Three.js]] passa a marcar a Fase 9 como concluída, incorpora o artigo 20 à ordem recomendada, ao mapa mental, aos critérios de domínio e às prioridades práticas.
  * **Web App**: `js/vault.js` foi sincronizado com o artigo 20 para manter o fallback da área Three.js completo quando a listagem dinâmica do GitHub falhar.
  * **Validação editorial**: o artigo preserva WikiLinks, método Feynman, sentence case e seção `Resumo para memorizar`; a nova nota não introduz Mermaid próprio, enquanto o diagrama já existente do guia foi apenas estendido com um nó compatível com o padrão atual. Não foi realizada validação local completa de execução/lint nesta sessão.
  * **Próxima etapa**: a Fase 10 fica reservada a picking avançado, raycasting em escala, seleção e drag; nenhum conteúdo da Fase 10 foi iniciado neste fechamento.

* **Conclusão da Fase 8 da trilha avançada de Three.js (`javascript/07-threejs/00`, `19`, `js/vault.js`)**:
  * **Artigo 19**: criado [[javascript/07-threejs/19-Post-processing, render targets, depth e stencil em Three.js|Post-processing, render targets, depth e stencil em Three.js]], cobrindo `WebGLRenderTarget`, `EffectComposer`, `RenderPass`, `ShaderPass`, bloom, selective bloom, depth buffer, `DepthTexture`, stencil, viewport/scissor, múltiplas câmeras, ping-pong buffers, antialiasing e integração com React Three Fiber.
  * **Pipeline de composição**: formalizada a cadeia `cena base → buffers auxiliares → passes → composição → saída`, separando problemas que pertencem à geometria, materiais, luz e câmera daqueles que realmente exigem composição em screen space.
  * **Depth e stencil**: registrada a diferença entre `depthTest` e `depthWrite`, o uso de depth textures para efeitos dependentes de distância e o stencil como regra de permissão por pixel para máscaras, portais e recortes.
  * **Performance**: enfatizado que passes fullscreen escalam com a quantidade de pixels, que DPR e resolução de render targets afetam o custo de forma forte e que efeitos auxiliares podem trabalhar em resolução reduzida.
  * **Código didático**: o artigo inclui snippets atômicos e exemplos completos em Three.js e React Three Fiber, incluindo `EffectComposer`, `UnrealBloomPass`, `OutputPass` e `@react-three/postprocessing`.
  * **Guia atualizado**: [[javascript/07-threejs/00-Guia de estudos de Three.js|Guia de estudos de Three.js]] passa a marcar a Fase 8 como concluída, incorpora o artigo 19 ao mapa mental, à ordem recomendada e aos critérios de domínio e move a próxima etapa para sistemas procedurais.
  * **Web App**: `js/vault.js` foi sincronizado com o artigo 19 para manter o fallback da área Three.js completo quando a listagem dinâmica do GitHub falhar.
  * **Validação editorial**: o artigo preserva WikiLinks para notas existentes, método Feynman, exemplos duais e seção `Resumo para memorizar`; não foi realizada validação local completa de execução/lint nesta sessão.
  * **Próxima etapa**: a Fase 9 fica reservada a partículas, curvas, campos e geometria procedural; nenhum conteúdo da Fase 9 foi iniciado neste fechamento.

* **Conclusão da Fase 7 da trilha avançada de Three.js (`javascript/07-threejs/00`, `18`, `js/vault.js`)**:
  * **Artigo 18**: criado [[javascript/07-threejs/18-UVs, texturas, PBR e environment maps em Three.js|UVs, texturas, PBR e environment maps em Three.js]], cobrindo UVs, unwrap, texel density, texturas de cor vs dados, `colorSpace`, `MeshStandardMaterial`, metalness, roughness, normal maps, displacement, AO, channel packing, wrapping, mipmaps, filtros, anisotropy, memória de GPU, KTX2, HDR, environment maps, PMREM e tone mapping.
  * **Pipeline de superfície**: formalizada a cadeia `geometria → UV → textura → material → iluminação → renderer → pixels`, com diagnóstico por camada para evitar corrigir problema de UV com material, material com luz ou luz com exposição.
  * **Código didático**: adicionados snippets atômicos e exemplos completos em Three.js e React Three Fiber, incluindo `TextureLoader`, `RGBELoader`, `useTexture`, `Environment` e materiais PBR.
  * **Guia atualizado**: [[javascript/07-threejs/00-Guia de estudos de Three.js|Guia de estudos de Three.js]] passa a marcar a Fase 7 como concluída, incorpora o artigo 18 à ordem recomendada e move a próxima etapa para composição gráfica avançada.
  * **Web App**: `js/vault.js` foi sincronizado com o artigo 18 para manter o fallback da área Three.js completo quando a listagem dinâmica do GitHub falhar.
  * **Validação editorial**: o artigo usa WikiLinks para notas existentes da trilha, não introduz Mermaid novo e preserva a separação entre color management, mapas PBR, iluminação e pós-processamento.
  * **Próxima etapa**: a Fase 8 fica reservada a post-processing, render targets e técnicas com depth/stencil; nenhum conteúdo da Fase 8 foi iniciado neste fechamento.

* **Conclusão da Fase 6 da trilha avançada de Three.js (`javascript/07-threejs/00`, `17`, `js/vault.js`)**:
  * **Artigo 17**: criado [[javascript/07-threejs/17-glTF e pipeline Blender para Three.js|glTF e pipeline Blender para Three.js]], cobrindo a diferença entre arquivo de autoria e asset de runtime, `.glb` vs `.gltf`, hierarquia, unidades, nomes de objetos, materiais PBR, UVs, exportação pelo Blender, `GLTFLoader`, animações, `userData`, Draco, KTX2 e integração com React Three Fiber.
  * **Pipeline de autoria → runtime**: formalizada a separação entre problemas que pertencem ao Blender e problemas que pertencem à composição no Three.js, evitando correções arbitrárias de escala, rotação, materiais ou hierarquia no código.
  * **Código didático**: adicionados snippets atômicos e dois exemplos completos, um em Three.js puro e outro em React Three Fiber com `useGLTF` e `useAnimations`.
  * **Guia atualizado**: [[javascript/07-threejs/00-Guia de estudos de Three.js|Guia de estudos de Three.js]] passa a marcar a Fase 6 como concluída, incorpora o artigo 17 à ordem recomendada e move a próxima etapa para superfície e iluminação avançada.
  * **Web App**: `js/vault.js` foi sincronizado com o artigo 17 para manter o fallback da área Three.js completo quando a listagem dinâmica do GitHub falhar.
  * **Validação editorial**: o artigo usa apenas WikiLinks para notas existentes da trilha, não adiciona Mermaid novo e referencia documentação oficial do Three.js, Khronos e Blender para os pontos de pipeline e formato.
  * **Próxima etapa**: a Fase 7 fica reservada a UVs, texturas, materiais PBR e environment maps; nenhum conteúdo da Fase 7 foi iniciado neste fechamento.

* **Conclusão da Fase 5 da trilha avançada de Three.js (`javascript/07-threejs/00`, `16`)**:
  * **Revisão do artigo 16**: [[javascript/07-threejs/16-Arquitetura avançada de React Three Fiber para cenas complexas|Arquitetura avançada de React Three Fiber para cenas complexas]] foi revisado como bloco autônomo de arquitetura, mantendo a separação entre modelo geométrico, estado narrativo, interpolação, renderização, câmera e controles de debug.
  * **Critério de fechamento**: a fase consolida o uso de estados canônicos como dados, funções de amostragem, refs e `useFrame` para estado visual por frame, `InstancedMesh` para famílias grandes, `CameraRig` separado e organização modular de pastas.
  * **Guia atualizado**: [[javascript/07-threejs/00-Guia de estudos de Three.js|Guia de estudos de Three.js]] passa a marcar a Fase 5 como concluída e explicita a transição entre arquitetura interna de cenas e o próximo bloco de pipeline de assets.
  * **Web App**: o artigo 16 já estava sincronizado no fallback de `js/vault.js`, portanto nenhum ajuste adicional de catálogo foi necessário neste fechamento.
  * **Próxima etapa**: a Fase 6 fica reservada a assets e pipeline 3D, com `glTF` e integração Blender → Three.js; nenhum conteúdo da Fase 6 foi iniciado neste fechamento.

* **Reorganização das fases avançadas de Three.js (`javascript/07-threejs/00`, `15`, `16`)**:
  * **Fase 4 concluída**: [[javascript/07-threejs/15-Perspectiva forçada, oclusão e objetos impossíveis em Three.js|Perspectiva forçada, oclusão e objetos impossíveis em Three.js]] passa a constituir sozinho o bloco de perspectiva, projeção e oclusão.
  * **Fase 5 separada**: [[javascript/07-threejs/16-Arquitetura avançada de React Three Fiber para cenas complexas|Arquitetura avançada de React Three Fiber para cenas complexas]] deixa de ser agrupado com a Fase 4 e passa a compor a fase seguinte, dedicada exclusivamente à arquitetura de cenas complexas em React Three Fiber.
  * **Granularidade editorial**: a partir da Fase 4, um artigo avançado grande corresponde preferencialmente a uma fase; apenas temas naturalmente inseparáveis devem compartilhar o mesmo bloco.
  * **Guia atualizado**: [[javascript/07-threejs/00-Guia de estudos de Three.js|Guia de estudos de Three.js]] agora diferencia explicitamente Fase 4 concluída e Fase 5 com conteúdo criado, mas fechamento ainda pendente, e planeja as Fases 6–12 em blocos menores.
  * **Próximo passo**: a Fase 5 não é considerada encerrada neste registro, mesmo com o artigo 16 já existente; seu fechamento será tratado separadamente após revisão própria.

* **Conclusão da Fase 3 da trilha avançada de Three.js (`javascript/07-threejs/`, `js/vault.js`)**:
  * **Artigo 13**: criado [[javascript/07-threejs/13-Câmera, projeção e leitura espacial em Three.js|Câmera, projeção e leitura espacial em Three.js]], cobrindo `PerspectiveCamera`, `OrthographicCamera`, `fov`, distância, projeção para NDC, `unproject`, framing responsivo, camera rigs, parallax, near/far e diagnóstico de enquadramento.
  * **Artigo 14**: criado [[javascript/07-threejs/14-GSAP, interpolação de estados e animação dirigida em Three.js|GSAP, interpolação de estados e animação dirigida em Three.js]], cobrindo estados canônicos, interpolação, GSAP como controle temporal, ranges perceptivos, easing, holds, timeline mestre, scrubber, identidade persistente e integração com câmera.
  * **Guia revisado**: [[javascript/07-threejs/00-Guia de estudos de Three.js|Guia de estudos de Three.js]] agora incorpora explicitamente os artigos `09–14`, organiza as três fases avançadas já concluídas e atualiza o mapa mental, critérios de domínio, prioridades práticas e próximos blocos.
  * **Fases consolidadas**: Fase 1 = estrutura espacial (`09–10`), Fase 2 = GPU e escala (`11–12`) e Fase 3 = câmera e movimento (`13–14`).
  * **Web App**: a área Three.js permanece apresentada como área própria no leitor, embora os arquivos continuem fisicamente em `javascript/07-threejs/`; os artigos `13` e `14` foram incluídos no fallback de `js/vault.js`.
  * **Próxima etapa**: a Fase 4 fica reservada para composição complexa, com perspectiva forçada, oclusão, objetos impossíveis e arquitetura avançada de React Three Fiber. Nenhum conteúdo da Fase 4 foi iniciado neste fechamento.

## 2026-09-09

* **Correção visual do botão Mermaid no Web App (`mermaid-overrides.css`, `index.html`)**:
  * **Causa**: a regra global de `button` em `style.css` aplicava `width: 20%` e `border-radius: 100%` também ao botão `ampliar` inserido pela toolbar Mermaid, comprimindo o rótulo e deformando o controle.
  * **Correção isolada**: criada `mermaid-overrides.css` carregada depois dos estilos gerais para sobrescrever apenas `.mermaid-btn`, com largura automática, altura mínima, padding, raio discreto, `inline-flex`, alinhamento central e `white-space: nowrap`.
  * **Responsividade**: a toolbar Mermaid permanece oculta abaixo de 850 px, preservando a decisão já adotada para telas pequenas e o modo legado do iPad mini 2.
  * **Cache**: o novo stylesheet é carregado com `mermaid-ui-v1` para evitar cache antigo no GitHub Pages.

* **Criação de introdução à linguagem R (`r/00-Introdução ao R — origem, propósito e modelo mental.md`)**:
  * Criada nota introdutória cobrindo origem em S, Ross Ihaka e Robert Gentleman, propósito estatístico, vetores, data frames, operações vetorizadas, tidyverse, `dplyr`, `ggplot2`, comparação com Python, SQL e JavaScript e um exemplo completo de análise de pesquisa.
  * O artigo conecta o modelo mental vetorial de R aos fundamentos de vetores, matrizes e tensores já existentes no vault.

## 2026-09-06

* **Revisão de continuidade pedagógica da trilha de LLMs (`llm/00`, `02`, `04`, `05`, `06`, `07`, `10`)**:
  * **Problema identificado**: a trilha possuía artigos individualmente fortes, mas algumas passagens exigiam que o leitor reconstruísse sozinho por que um conceito vinha depois do outro; o caso mais evidente era `01 Dinâmica de treino → 02 Tokenização`.
  * **Ordem real alinhada ao guia**: o `00-Guia de estudos` deixou de recomendar a sequência paralela `02 → 03 → 01` e passou a assumir `01` como visão panorâmica, seguida de `02`, `03`, `04` e demais artigos em progressão natural.
  * **Princípio editorial de build-up**: formalizada a regra `apresentar o sistema inteiro → abrir uma caixa-preta → usar o que foi aprendido para criar o próximo problema`, exigindo que cada artigo deixe explícita sua relação narrativa com anterior e seguinte.
  * **01 → 02**: `02-Tokenização` agora começa retomando tokens, hidden states e logits introduzidos no artigo anterior e explica que a nova pergunta é como texto humano vira as representações numéricas usadas pelo pipeline.
  * **02 → 03**: adicionada ponte explícita mostrando `tokenização → embeddings iniciais → Transformer → representações contextuais`, preparando attention como a caixa ainda fechada.
  * **03 → 04**: `04-Engenharia de contexto` agora parte do Transformer já compreendido e muda a pergunta de `como o modelo processa o contexto?` para `quem decide o que entra nesse contexto?`.
  * **04 → 05**: engenharia de contexto passa explicitamente para a aplicação responsável por buscar dados, executar ferramentas, devolver resultados e lidar com falhas.
  * **05 → 06 → 07 → 08**: criada progressão entre dado pontual via ferramenta, conhecimento documental persistente via LLM Wiki, necessidade geral de conhecimento externo e, finalmente, arquitetura RAG.
  * **Correção de sequência no artigo 06**: a seção final deixou de saltar diretamente para RAG e agora aponta corretamente para `07-Por que LLMs precisam de conhecimento externo` antes de `08-O que é RAG e como funciona`.
  * **09 → 10 → 11**: `10-Embeddings aplicados ao RAG` agora parte dos chunks criados no artigo anterior e termina explicitando o novo gargalo de armazenamento/busca que motiva vector stores e índices ANN.
  * **Auditoria da segunda metade**: os artigos `11–17` já apresentavam continuidade conceitual forte (`índice → retrieval híbrido → reranking → montagem do contexto → implementação → avaliação → técnicas avançadas`), por isso não receberam reescrita artificial apenas para padronização.

* **Aprofundamento de logits e Softmax (`llm/01-Dinâmica de treino e inferência em LLMs.md`, `llm/Glossário de LLMs.md`)**:
  * **Pipeline de inferência**: expandida a passagem `representação contextual → projeção para vocabulário → logits → temperatura → Softmax → decodificação/amostragem → token`, conectando inferência à camada de fundamentos tensoriais.
  * **Logits por intuição e shape**: explicado que cada logit é um score bruto relativo, não uma porcentagem, e que a saída pode ser lida como `[batch, tokens, vocab_size]`, com um score para cada token possível.
  * **Softmax como complemento direto**: adicionada explicação passo a passo da normalização exponencial, da dependência relativa entre candidatos e da distinção entre produzir probabilidades e efetivamente escolher um token.
  * **Temperatura**: esclarecido que a temperatura reescala logits antes do Softmax e que `T = 0` é uma convenção tratada pela implementação, não uma divisão matemática literal por zero.
  * **Decodificação**: separados conceitualmente Softmax, greedy/argmax, Top-k, Top-p e amostragem, evitando tratar todos como uma única etapa.
  * **Código didático**: revisado o exemplo JavaScript para mostrar Softmax numericamente estável e pipeline completo de Top-p sem depender do snippet anterior.
  * **Precisão conceitual**: suavizadas afirmações excessivamente absolutas sobre determinismo com `temperature = 0`, alucinação e custo/latência de inferência.
  * **Glossário interligado**: as entradas Logit e Softmax foram ampliadas e agora apontam diretamente para as subseções correspondentes do artigo.

* **Correção de WikiLinks dentro de callouts (`script.js`, `index.html`)**:
  * **Causa**: `processarLinksObsidian()` instalava os eventos de clique antes de `processarCalloutsObsidian()`. Como o callout reconstrói seu conteúdo via `innerHTML`, os listeners dos links eram descartados.
  * **Correção**: invertida a ordem do pipeline para montar primeiro os callouts e somente depois converter/ativar os WikiLinks.
  * **Efeito**: links como Token, Parâmetro, Gradiente, Inferência e Glossário dentro de blocos `[!NOTE]` passam a manter navegação ativa.
  * **Cache**: cache buster do `script.js` atualizado para `estrutura-v36` no `index.html`.
* **Criação do artigo de fundamentos tensoriais (`llm/Fundamentos — vetores, matrizes, tensores e shapes.md`)**:
  * **Progressão Feynman**: o artigo parte de escalar → vetor → matriz → tensor e só depois introduz `shape`, batch, reshape, transpose, broadcasting e dtype.
  * **Ponte para LLMs**: conecta explicitamente `[tokens, embedding_dim]`, `[batch, tokens, embedding_dim]` e `[batch, heads, tokens, head_dim]`, preparando a leitura de tokenização e multi-head attention.
  * **Q, K e V por shapes**: mostra como acompanhar dimensões transforma a equação `QKᵀ` em uma operação rastreável (`[tokens, head_dim] × [head_dim, tokens] = [tokens, tokens]`).
  * **Código didático**: inclui snippet mínimo e exemplo completo em JavaScript para inspecionar shapes, além de exemplo complementar em PyTorch para `shape`, `dtype` e `device`.
  * **Integração da trilha**: o guia passou a recomendar fundamentos tensoriais antes de `02 Tokenização` e `03 Transformer`; as entradas Vetor, Matriz, Tensor e Dimensão do glossário apontam para o novo artigo.
  * **Sincronização do app**: o novo artigo foi adicionado à lista de fallback de `js/vault.js`.
* **Correção de concorrência no workflow Mermaid (`.github/workflows/mermaid-fallbacks.yml`)**:
  * **Causa das falhas**: múltiplos commits em sequência disparavam renderizações simultâneas dos mesmos SVGs; ao final, os jobs tentavam fazer `rebase/push` sobre uma `main` já modificada por outra execução e entravam em conflito.
  * **Serialização**: adicionada chave de `concurrency` com cancelamento de execuções antigas quando uma nova execução da mesma fila é iniciada.
  * **Menos ruído**: alterações apenas em `log.md`, `me.md` e `AGENTS.md` deixaram de disparar o gerador de SVGs.
  * **Estado do Pages**: as execuções mais recentes de publicação do GitHub Pages continuam concluindo com sucesso; as notificações observadas eram principalmente do workflow auxiliar de SVGs, não de falha geral do site.
* **Camada didática da trilha inicial de LLMs (`llm/00–05`, `llm/Glossário de LLMs.md`, `js/vault.js`)**:
  * **Glossário navegável**: criado `[[llm/Glossário de LLMs|Glossário de LLMs]]` com definições Feynman, analogias, distinções de termos próximos e entradas para fundamentos matemáticos, tokenização, Transformer, treinamento, inferência, engenharia de contexto, sistemas e RAG.
  * **WikiLinks com âncoras**: os artigos iniciais agora apontam diretamente para entradas como `#Token`, `#Gradiente`, `#Transformer`, `#Tool calling` e `#TTFT`, aproveitando o suporte do Web App à navegação por seção.
  * **Vocabulário antes de começar**: adicionados callouts nos artigos `01–05` com apenas os conceitos necessários para a primeira leitura, evitando exigir domínio prévio de toda a terminologia avançada.
  * **Degraus conceituais intermediários**: incluídos mapas mentais antes da formalização matemática e do código, com fluxos simples para treino, tokenização, Transformer, engenharia de contexto e sistemas de produção.
  * **Treinamento explicado em etapas**: expandida a passagem entre cross-entropy, gradiente, backpropagation, otimizador e atualização de pesos, preservando a matemática formal sem saltar diretamente para o jargão.
  * **Guia de leitura revisado**: o `00-Guia de estudos` agora diferencia a numeração histórica da ordem pedagógica recomendada (`02 → 03 → 01 → 04 → 05`) e explicita o mapa mental geral do pipeline de uma LLM.
  * **Sincronização do app**: o glossário foi adicionado à lista de fallback de `js/vault.js` para continuar acessível quando a API de listagem do GitHub não estiver disponível.
* **Fallback gráfico de Mermaid para iPad mini 2 (`assets/mermaid/`, `legacy-ios12.js`, `compat-ios12.css`, `.github/workflows/mermaid-fallbacks.yml`)**:
  * **SVG pré-renderizado antes do código**: o leitor legado passou a procurar um SVG determinístico para cada bloco Mermaid e exibi-lo como imagem navegável; o bloco de código permanece apenas como fallback de último nível se o asset ainda não existir ou falhar ao carregar.
  * **Geração automatizada**: criado `scripts/generate-mermaid-fallbacks.mjs` com Mermaid CLI fixado em `11.17.0`, configuração de Chromium para CI e workflow que regenera e commita os SVGs quando arquivos Markdown ou o gerador mudam.
  * **Resiliência do CI**: a geração ignora isoladamente diagramas com erro de parsing, preserva o fallback em código nesses casos e usa `git pull --rebase` antes do push para tolerar commits concorrentes na `main`.
  * **Mapeamento estável**: cada SVG usa hash do caminho relativo do artigo mais o índice do diagrama, permitindo que o Safari legado encontre o asset sem manter catálogo paralelo.
  * **Tipografia ampliada no iPad**: aumentada a escala do corpo, artigos, listas e navegação no breakpoint de 768 px, com leitura mais confortável em portrait e landscape.
  * **Interação leve**: SVGs podem ser rolados horizontalmente no artigo e abertos isoladamente em nova aba para aproveitar o zoom nativo do Safari, sem executar Mermaid no dispositivo.

* **Compatibilidade progressiva do Web App com iPad mini 2 / iOS 12 (`index.html`, `compat-ios12.css`, `legacy-ios12.js`)**:
  * **Detecção de capacidade antes do carregamento**: o `index.html` passou a testar suporte a optional chaining e regex lookbehind com `Function()` em sintaxe ES5; navegadores modernos carregam o app modular existente, enquanto navegadores legados entram em um caminho separado e não tentam interpretar `script.js` / `js/mermaid.js`.
  * **Dependências previsíveis**: `marked` foi fixado em `4.3.0` e Mermaid em `11.17.2` no caminho moderno, eliminando dependência de versões `latest` mutáveis no CDN.
  * **Leitor legado de baixo custo**: criado `legacy-ios12.js` sem módulos, optional chaining, lookbehind ou Pointer Events. O catálogo é extraído como texto de `js/vault.js`, a busca legada prioriza títulos para reduzir memória, artigos são carregados sob demanda e WikiLinks continuam navegáveis.
  * **Mermaid com degradação graciosa**: no Safari legado, diagramas não impedem a leitura do artigo e são exibidos como código Mermaid rolável; o explorador v11 completo permanece exclusivo do caminho moderno.
  * **Preservação dos exemplos didáticos Mermaid**: o fallback deixa o Marked interpretar os blocos cercados primeiro e só então estiliza `code.language-mermaid`, evitando corromper os blocos de código-fonte aninhados adicionados à trilha de Mermaid.
  * **Layout específico de tablet**: criado `compat-ios12.css` com fallback de cores/bordas, rolagem touch de código e tabelas e regras específicas para 768 px em portrait e 1024 px em landscape, evitando tratar o iPad mini como celular ampliado.
  * **Tema e dependências opcionais resilientes**: acesso a `localStorage`, preferência de tema e renderização KaTeX ficam protegidos contra falhas sem derrubar o leitor.

## 2026-09-05

* **Criação da Trilha Completa de Modelagem Visual com Mermaid (`mermaid/`, `js/vault.js`)**:
  * **Transição de Paradigma (De Desenho Livre a Diagrams as Code)**:
    * Estruturada a trilha completa de 14 artigos sequenciais (`00` a `13`) com foco em arquitetura da informação, teoria de grafos aplicada, semântica de layouts e engenharia de software, superando o reducionismo de "apenas sintaxe":
      * [[mermaid/00-Guia de estudos|00-Guia de estudos]]: Mapa da trilha em 3 blocos pedagógicos e introdução ao sistema unificado de mentorias.
      * [[mermaid/01-Mermaid como linguagem de modelagem visual|01-Mermaid como linguagem de modelagem visual]]: Declarativo vs Imperativo, motores de distribuição (Dagre) e a analogia topológica do mapa de metrô.
      * [[mermaid/02-Flowcharts e fundamentos de grafos|02-Flowcharts e fundamentos de grafos]]: Vértices, arestas, grau de entrada/saída, caminhos, ciclos, DAGs e densidade de arestas.
      * [[mermaid/03-Direção, hierarquia e organização espacial|03-Direção, hierarquia e organização espacial]]: As 4 direções (`TD`, `LR`, `BT`, `RL`), semântica do tempo horizontal vs hierarquia vertical e controle de edge crossings.
      * [[mermaid/04-Nós, relações, subgraphs e semântica visual|04-Nós, relações, subgraphs e semântica visual]]: Vocabulário geométrico, conexões, fronteiras de contexto com subgrafos e sistema semântico de classes (`:::core`, `:::component`, `:::data`, `:::warning`, `:::external`).
      * [[mermaid/05-Como escolher o tipo de diagrama|05-Como escolher o tipo de diagrama]]: Matriz de decisão orientada a perguntas e critérios de "Quando NÃO usar Mermaid".
      * [[mermaid/06-Diagramas de sequência|06-Diagramas de sequência]]: Atores, participantes, ativações e blocos condicionais (`alt`, `opt`, `loop`) no fluxo de agendamento de mentoria.
      * [[mermaid/07-Diagramas de classes e UML com Mermaid|07-Diagramas de classes e UML com Mermaid]]: Estrutura estática de classes, encapsulamento, herança, interfaces, agregação e composição no domínio de mentorias.
      * [[mermaid/08-Diagramas de estado|08-Diagramas de estado]]: Máquina de estados finita e ciclo de vida da `SolicitacaoMentoria` (`Criada` $\rightarrow$ `EmAnalise` $\rightarrow$ `Confirmada` $\rightarrow$ `SessaoAgendada` $\rightarrow$ `Finalizada`).
      * [[mermaid/09-ER e modelagem de dados|09-ER e modelagem de dados]]: Modelagem relacional, cardinalidades com notação Crow's Foot e tabelas do banco de dados acadêmico.
      * [[mermaid/10-Arquitetura de software com Mermaid|10-Arquitetura de software com Mermaid]]: Modelo C4 simplificado com subgrafos em camadas (clientes, gateway, serviços de aplicação, cache e banco).
      * [[mermaid/11-Controle de complexidade em diagramas grandes|11-Controle de complexidade em diagramas grandes]]: Padrão *Overview + Drill-down*, decomposição por domínio e redução de ruído visual.
      * [[mermaid/12-Padrões, antipadrões e refatoração de diagramas|12-Padrões, antipadrões e refatoração de diagramas]]: Diagnóstico dos antipadrões "minhoca horizontal", "arranha-céu vertical" e "ninho de mafagafos", com refatoração antes/depois e checklist.
      * [[mermaid/13-Mermaid dinâmico com JavaScript|13-Mermaid dinâmico com JavaScript]]: Integração com `mermaid.js`, `mermaid.initialize()`, `mermaid.render()` e geração dinâmica de diagramas a partir de objetos JSON.
  * **Apresentação Didática com Código-Fonte Completo**:
    * Adicionados blocos cercados em Markdown (````markdown ```mermaid ... ``` ````) precedendo cada diagrama em todos os 14 artigos, permitindo que o leitor visualize o código-fonte exato ao lado da renderização gráfica.
  * **Sincronização de Metadados**:
    * Atualizada a lista de fallback do leitor web em `js/vault.js` com todos os 14 novos artigos.
    * Conformidade rigorosa com método Feynman, ausência total de emojis e Sentence Case em todos os cabeçalhos.

* **Curadoria e Inclusão de Conteúdo Complementar em Vídeo na Trilha de LLMs e RAG (`llm/`, `index.html`)**:
  * **Videoteca Centralizada no Guia de Estudos ([[llm/00-Guia de estudos|00-Guia de estudos]])**:
    * Adicionada a seção `## Videoteca recomendada de IA e sistemas` consolidando os canais e autores de referência internacional: Andrej Karpathy (*Zero to Hero*, *State of GPT*), 3Blue1Brown (série geométrica sobre redes neurais e Transformers), StatQuest with Josh Starmer (álgebra visual passo a passo), DeepLearning.AI / Andrew Ng (sistemas e avaliação), Cohere / Jay Alammar (embeddings e reranking) e Yannic Kilcher (leitura de papers fundamentais).
  * **Seções Dedicadas nos 17 Artigos Técnicos de LLMs e RAG ([[llm/]])**:
    * Inserida a seção padronizada `## Conteúdo complementar em vídeo` imediatamente antes de `## Resumo para memorizar` em todos os 17 artigos (`01` a `17`).
    * Seleção curada e cirúrgica conectando cada tópico teórico a aulas de alto nível de intuição visual:
      * [[llm/01-Dinâmica de treino e inferência em LLMs|01]]: *State of GPT* (Karpathy), *Cross Entropy Loss* (StatQuest), *Large Language Models* (3Blue1Brown).
      * [[llm/02-Tokenização, embeddings e representações contextuais|02]]: *Let's build the GPT Tokenizer* (Karpathy), *Word Embedding and Word2Vec* (StatQuest), *Visualizing Embeddings* (3Blue1Brown).
      * [[llm/03-Arquitetura do Transformer e mecanismo de atenção|03]]: *Let's build GPT* (Karpathy), *Attention in transformers* (3Blue1Brown), *Transformer Neural Networks* (StatQuest).
      * [[llm/04-Engenharia de contexto e controle de inferência|04]]: *Prompt Engineering for Developers* (DeepLearning.AI), *Prompt Injection Attacks* (Computerphile), *Structured Outputs* (Outlines / DotCSV).
      * [[llm/05-Sistemas de produção com LLMs, tool calling e streaming|05]]: *Building Systems with ChatGPT API* (DeepLearning.AI), *Function Calling* (OpenAI DevDay), *Server-Sent Events* (Web Dev Simplified).
      * [[llm/06-LLMOps, observabilidade e avaliação contínua|06]]: *Evaluating and Debugging Generative AI* (DeepLearning.AI), *ML Observability* (Arize AI), *LLM Evaluation* (Weights & Biases).
      * [[llm/07-Segurança, guardrails e governança de LLMs|07]]: *AI Red Teaming* (Microsoft Security), *Prompt Injection Attacks* (Computerphile), *AI Governance* (NIST).
      * [[llm/08-O que é RAG e como funciona|08]]: *RAG from Scratch* (LangChain), *Retrieval Augmented Generation* (Pinecone), *RAG Explained* (IBM Technology).
      * [[llm/09-Embeddings e busca semântica|09]]: *Word Embedding and Word2Vec* (StatQuest), *Embeddings* (Cohere), *Vector Databases* (Fireship).
      * [[llm/10-Chunking, indexação e metadados|10]]: *Chunking Strategies* (Pinecone), *RAG Indexing* (LangChain), *Text Splitters* (LlamaIndex).
      * [[llm/11-Retrieval, reranking e estratégias híbridas|11]]: *Rerankers* (Cohere), *Hybrid Search* (Pinecone), *BM25* (James Briggs).
      * [[llm/12-RAG em produção, avaliação e observabilidade|12]]: *RAG Evaluation* (DeepLearning.AI), *RAGAS* (Exploding Gradients), *Production RAG* (LlamaIndex).
      * [[llm/13-Segurança, privacidade e governança em RAG|13]]: *RAG Security* (OWASP), *Prompt Injection* (Computerphile), *Data Privacy in LLMs* (Microsoft Research).
      * [[llm/14-Multi-tenancy e controle de acesso em RAG|14]]: *Multi-Tenant SaaS Architecture* (AWS), *Row Level Security* (Supabase), *Authorization for RAG* (Pinecone).
      * [[llm/15-RAG multimodal|15]]: *Multimodal RAG* (LlamaIndex), *CLIP* (OpenAI), *Multimodal Embeddings* (Cohere).
      * [[llm/16-RAG agentivo e integração com ferramentas|16]]: *Building Agentic RAG* (LlamaIndex), *Agents* (DeepLearning.AI), *Tool Use* (Anthropic).
      * [[llm/17-Arquiteturas avançadas de RAG e tendências|17]]: *GraphRAG* (Microsoft Research), *Corrective RAG* (LangChain), *Self-RAG* (AI Papers Academy).
    * **Referências como Curadoria, não Embeds Pesados**: Optou-se por manter os vídeos como referências textuais (título + autor/canal) sem iframes embutidos, preservando performance e evitando sobrecarga visual no Web App.

* **Expansão Avançada da Trilha de LLMs e RAG (`llm/`, `js/vault.js`)**:
  * **Nível Técnico Elevado (LLM Engineering / RAG Production)**:
    * Aprofundados todos os 17 artigos da trilha, substituindo explicações introdutórias por conteúdo de nível avançado e voltado a sistemas reais de produção.
    * [[llm/01-Dinâmica de treino e inferência em LLMs|01]]: Cross-Entropy formal, equação de Softmax com temperatura, Top-p / Nucleus Sampling e implementação completa em JavaScript.
    * [[llm/02-Tokenização, embeddings e representações contextuais|02]]: BPE completo, espaço vetorial denso, similaridade cosseno, positional encodings, RoPE e pooling.
    * [[llm/03-Arquitetura do Transformer e mecanismo de atenção|03]]: Scaled Dot-Product Attention, Multi-Head Attention, Causal Mask, RMSNorm, SwiGLU, KV Cache e implementação matemática de Self-Attention em JavaScript.
    * [[llm/04-Engenharia de contexto e controle de inferência|04]]: Context Engineering, hierarquia de mensagens, Structured Outputs via JSON Schema, Constrained Decoding, Prompt Injection e Evals.
    * [[llm/05-Sistemas de produção com LLMs, tool calling e streaming|05]]: Arquitetura cliente-servidor, API Gateway, Tool Calling com JSON Schema, Agent Loop, SSE, retries com Exponential Backoff + Jitter, TTFT, Tracing e Prompt Caching.
    * [[llm/06-LLMOps, observabilidade e avaliação contínua|06]]: SLIs/SLOs, traces, métricas de latência/custo/qualidade, datasets de avaliação, regressão, drift, canary releases e alertas.
    * [[llm/07-Segurança, guardrails e governança de LLMs|07]]: Prompt injection, exfiltração, tool abuse, least privilege, sandboxing, moderação, red teaming, auditoria e governança.
    * [[llm/08-O que é RAG e como funciona|08]]: pipeline completo de retrieval, embeddings, vector store, chunking, reranking, grounding e geração.
    * [[llm/09-Embeddings e busca semântica|09]]: vetores densos, cosine similarity, normalização, indexação ANN e comparação com busca lexical.
    * [[llm/10-Chunking, indexação e metadados|10]]: chunking fixo, semântico e recursivo, overlap, metadados, filtros e estratégias de indexação.
    * [[llm/11-Retrieval, reranking e estratégias híbridas|11]]: dense retrieval, BM25, hybrid search, reranking cross-encoder, RRF e query expansion.
    * [[llm/12-RAG em produção, avaliação e observabilidade|12]]: métricas de retrieval e geração, faithfulness, answer relevancy, latency, custo, traces e datasets dourados.
    * [[llm/13-Segurança, privacidade e governança em RAG|13]]: ACL, PII, data leakage, prompt injection via documentos, provenance, auditoria e retenção.
    * [[llm/14-Multi-tenancy e controle de acesso em RAG|14]]: isolamento lógico/físico, filtros por tenant, RBAC/ABAC, namespaces e row-level security.
    * [[llm/15-RAG multimodal|15]]: embeddings multimodais, OCR, CLIP-like models, indexação de imagens e fusão texto-imagem.
    * [[llm/16-RAG agentivo e integração com ferramentas|16]]: agentic retrieval, tool use, planning, memory, loops e integração com APIs.
    * [[llm/17-Arquiteturas avançadas de RAG e tendências|17]]: GraphRAG, Self-RAG, Corrective RAG, Adaptive RAG, long-context vs retrieval e tendências emergentes.
  * **Implementações Executáveis em JavaScript**:
    * Adicionados exemplos completos em JS puro para BPE simplificado, similaridade cosseno, self-attention, temperature/top-p sampling, tool calling, SSE client, retries com backoff+jitter, tracing e RAG pipeline.
  * **Diagramas Mermaid Avançados**:
    * Inseridos diagramas de arquitetura e fluxo nos artigos principais (Transformer, RAG, tool calling, observabilidade, segurança e multi-tenancy).
  * **Sincronização do Web App**:
    * Atualizada `js/vault.js` com todos os artigos `llm/01` a `llm/17`.

## 2026-09-02

* **Criação e refinamento da trilha de LLMs e RAG (`llm/`, `js/vault.js`)**:
  * **Nova área `llm`**: criada trilha de estudos de LLMs e RAG com guia em `llm/00-Guia de estudos.md` e artigos `llm/01` a `llm/17`, cobrindo fundamentos de LLMs, Transformer, contexto, sistemas de produção, LLMOps, segurança, RAG, embeddings, chunking, retrieval, multimodalidade e arquiteturas avançadas.
  * **Integração no Web App**: adicionada a área `llm` em `js/vault.js` com metadados próprios (`titulo`, `subtitulo`, `icone`, `ordem`) e fallback completo dos artigos.
  * **Conteúdo didático e técnico**: artigos estruturados com explicações conceituais, exemplos em JavaScript, diagramas Mermaid, referências complementares e seções `## Resumo para memorizar`.
  * **Correção de rotas com caracteres especiais (`script.js`)**:
    * Corrigida a codificação de caminhos com `#` para evitar 404 em artigos de C# no leitor web.