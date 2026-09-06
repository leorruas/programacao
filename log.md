# Log de alterações do vault

Este arquivo registra o histórico de criações, modificações, edições e reorganizações estruturais realizadas no vault em **ordem cronológica decrescente (mais recente no topo)**.

## 2026-09-06

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
      * [[llm/05-Sistemas de produção com LLMs, tool calling e streaming|05]]: *Functions, Tools and Agents* (DeepLearning.AI), *Server-Sent Events & HTTP Streaming* (Hussein Nasser), *Prompt Caching* (Anthropic / Latent Space).
      * [[llm/06-LLM Wiki conhecimento compilado para humanos e agentes|06]]: *Building Knowledge Graphs* (DeepLearning.AI), *Agentic Memory* (AI Explained), *Networked Thought* (Tiago Forte / Obsidian).
      * [[llm/07-Por que LLMs precisam de conhecimento externo|07]]: *RAG Explained* (IBM Technology), *Why Context Windows Don't Replace RAG* (Matthew Berman), *Lost in the Middle* (Yannic Kilcher).
      * [[llm/08-O que é RAG e como funciona|08]]: *RAG From Scratch* (LangChain), *Retrieval-Augmented Generation Architecture* (DeepLearning.AI), *Building Production RAG Systems* (FreeCodeCamp).
      * [[llm/09-Chunking e estratégias de fragmentação|09]]: *Chunking Strategies for LLM Applications* (Pinecone / Greg Kamradt), *Text Splitters* (DeepLearning.AI), *Semantic Chunking* (Aura / Greg Kamradt).
      * [[llm/10-Embeddings aplicados ao RAG|10]]: *Sentence-BERT* (Yannic Kilcher), *Vector Embeddings Explained Visually* (Cohere), *Matryoshka Embeddings* (Pinecone).
      * [[llm/11-Vector stores, índices e algoritmos de busca|11]]: *HNSW Graphs* (Pinecone / James Briggs), *Vector Databases: How Do They Work?* (Fireship), *PostgreSQL pgvector* (Hussein Nasser).
      * [[llm/12-Estratégias de retrieval e busca híbrida|12]]: *Hybrid Search* (Pinecone), *Reciprocal Rank Fusion Explained* (Cohere), *BM25 Algorithm* (StatQuest).
      * [[llm/13-Reranking e modelos de pontuação cruzada|13]]: *Re-ranking: The Secret Weapon for RAG* (Cohere / Nils Reimers), *Bi-Encoders vs Cross-Encoders* (Deep Learning AI), *Improving RAG Accuracy* (Pinecone).
      * [[llm/14-Engenharia de contexto para RAG|14]]: *Context Stuffing vs Targeted Retrieval* (LangChain), *Prompt Defenses: XML Tagging* (Anthropic), *Attention Sinks and Context Geometry* (AI Explained).
      * [[llm/15-Construindo um RAG em JavaScript|15]]: *Build RAG from Scratch in Node.js* (Developers Digest), *Vector Math and Dot Product in JS* (The Coding Train), *Full-Stack RAG Application* (AI Jason).
      * [[llm/16-Avaliando um sistema RAG|16]]: *Evaluating RAG Applications with Ragas* (DeepLearning.AI), *LLM-as-a-Judge* (Weights & Biases / Databricks), *Building an Evaluation Pipeline* (Arize AI).
      * [[llm/17-RAG avançado e limites arquiteturais|17]]: *Advanced RAG: Query Rewriting & HyDE* (Pinecone), *Graph RAG* (Microsoft Research), *Agentic RAG* (DeepLearning.AI).
  * **Conformidade de Estilo e Cache**: Cabeçalhos estritamente em *Sentence Case*, ausência total de emojis e cache buster atualizado para `estrutura-v34` no `index.html`.

* **Desacoplamento Estrutural de Linhas de Código e Código Inline (`script.js`, `style.css`, `index.html`)**:
  * **Eliminação Definitiva de Conflitos**: Substituído o elemento interno das linhas numeradas em `<pre>` de `<code>` para `<span class="code-text">`, desacoplando completamente os blocos grandes de código de quaisquer regras de código inline.
  * **Isolamento Estrito**: Assegurado que as caixas de código inline (`.artigo-corpo code:not(pre code)`) atuem exclusivamente sobre termos e trechos no meio do texto, enquanto os blocos `<pre>` permanecem planos, unificados e com coloração contínua.
  * **Cache Buster**: Incrementado para `estrutura-v33` no `index.html`.

* **Correção de Legibilidade de Callouts e Roteamento Resiliente por Hash (`style.css`, `script.js`, `index.html`)**:
  * **Legibilidade e Contraste nos Callouts para Modo Claro e Escuro**:
    * Ajustado o seletor `.obsidian-callout .callout-content` e seus parágrafos para utilizarem a variável contextual `color: var(--text)`, eliminando o problema de texto cinza claro ilegível sobre fundo branco no modo claro.
    * Adicionadas definições de alto contraste dedicadas para `:root[data-theme="light"]` cobrindo todos os tipos de avisos (`important`, `note`, `tip`, `warning`, `caution`), com bordas expressivas, fundos translúcidos e títulos com cores profundas e saturadas (`#d97706` / `#b45309` para avisos/warning, `#059669` para dicas/tip, `#7e22ce` para importantes, `#dc2626` para alertas de cuidado/caution).
    * Corrigido o contraste dos títulos em negrito dentro de checklists (`.task-item-content strong`).
  * **Roteamento Resiliente por URL e Persistência no Recarregamento (F5 / Direct Link)**:
    * Corrigido o roteamento de hash em `script.js`: substituída a checagem que dependia de função inexistente (`normalizarTexto`) pelo resolvedor tolerante `navegarParaLinkObsidian`.
    * Adicionado suporte a links antigos/renomeados (como `/artigo/llm/01-O que são LLMs e como funcionam`) que agora localizam automaticamente o artigo renomeado correspondente por similaridade de nome e título sem redirecionar indevidamente para a página principal.
    * Adicionado o ouvinte `popstate` para sincronização com histórico do navegador e passado `atualizarHash = false` durante a carga inicial para evitar substituições indesejadas de rota.
    * Incrementado cache buster para `estrutura-v31` no `index.html`.

* **Criação do Artigo LLM Wiki e Reorganização das Camadas de Conhecimento (`llm/`, `js/vault.js`, `index.html`)**:
  * **Padrão Arquitetural LLM Wiki ([[llm/06-LLM Wiki conhecimento compilado para humanos e agentes|06-LLM Wiki conhecimento compilado para humanos e agentes]])**:
    * Desenvolvido artigo técnico e conceitual estabelecendo a LLM Wiki como a terceira via entre despejo direto no contexto e RAG tradicional: transformação prévia de corpus heterogêneo em páginas atômicas com WikiLinks formais, relações conceituais explícitas e metadados de procedência (*provenance*).
    * Diferenciação rigorosa: fonte primária, wiki compilada, retrieval e LLM.
    * Seção dedicada demonstrando por que *LLM Wiki não é RAG* (trabalho antecipado em lote vs. busca reativa em runtime) e como ambos os padrões operam de forma complementar (RAG sobre uma Wiki estruturada).
    * Tabela comparativa multidimensional (contexto direto vs. RAG vs. LLM Wiki) cobrindo custo de preparação, custo em runtime, rastreabilidade, capacidade de síntese, legibilidade e riscos de distorção.
    * Análise crítica de vantagens (conhecimento persistente, navegação humana no Obsidian, memória compartilhada entre agentes) e limites/riscos (o perigo do *erro cristalizado*, invalidação de cache em grafos de dependência, divergências entre fontes, viés da ontologia e escala).
    * Analogia do compilador de software (código-fonte vs. representação compilada otimizada) e implementação conceitual completa em JavaScript de um compilador de páginas Markdown com WikiLinks.
  * **Renuneração e Expansão da Trilha RAG para 17 Artigos**:
    * Reordenados os artigos de RAG para a numeração 07 a 17 ([[llm/07-Por que LLMs precisam de conhecimento externo|07]] a [[llm/17-RAG avançado e limites arquiteturais|17]]), inserindo a LLM Wiki como a *Camada 5* de compilação de conhecimento prévio e o RAG como a *Camada 6* no [[llm/00-Guia de estudos|00-Guia de estudos]].
    * Atualizada a lista de fallback no `js/vault.js` e incrementado cache buster para `v30` no `index.html`.

* **Criação da Trilha Completa de Engenharia RAG (Retrieval-Augmented Generation) (`llm/`, `js/vault.js`, `index.html`)**:
  * **Trilha de Maturidade Progressiva (Feynman Técnico)**: Desenvolvidos 11 novos artigos conceituais e práticos (artigos 06 a 16) sem abstrações superficiais, cobrindo o ciclo ponta a ponta de engenharia de busca e geração aumentada:
    * [[llm/06-Por que LLMs precisam de conhecimento externo|06-Por que LLMs precisam de conhecimento externo]]: Conhecimento paramétrico congelado nos pesos vs conhecimento não paramétrico em runtime. Limitações reais de janelas gigantes (degradação de atenção *Lost in the Middle*, latência de TTFT e custo financeiro), matriz de decisão entre Fine-Tuning, Prompting e RAG, e separação de responsabilidades no software.
    * [[llm/07-O que é RAG e como funciona|07-O que é RAG e como funciona]]: Arquitetura completa desacoplada em duas fases estritas: Ingestão/Indexação (offline/lote) e Consulta/Retrieval (online/runtime), acompanhado de diagrama Mermaid vertical e implementação ponta a ponta em JavaScript puro.
    * [[llm/08-Chunking e estratégias de fragmentação|08-Chunking e estratégias de fragmentação]]: Fatiamento de documentos como base da qualidade de busca. Tamanho fixo com overlap, chunking estrutural em Markdown respeitando headings e metadados de trilha, chunking semântico por quebra de tópico, dilema de engenharia chunks pequenos vs grandes e parser estrutural para Obsidian.
    * [[llm/09-Embeddings aplicados ao RAG|09-Embeddings aplicados ao RAG]]: Aprofundamento dos modelos Bi-Encoders de sentença para recuperação densa. Normalização L2 para simplificação matemática da similaridade de cosseno em produto escalar, compressão com perdas, Matryoshka Representation Learning (MRL), pontos cegos de busca semântica (negações lógicas e identificadores exatos) e quantização escalar.
    * [[llm/10-Vector stores, índices e algoritmos de busca|10-Vector stores, índices e algoritmos de busca]]: Desafios de escala além da busca linear exata (KNN). Algoritmo HNSW (Hierarchical Navigable Small World) em grafos multi-camada para busca aproximada (ANN), comparação arquitetural entre `pgvector` e bancos vetoriais dedicados, persistência acoplada de vetores e metadados e filtragem pré-vetorial (*Pre-filtering*).
    * [[llm/11-Estratégias de retrieval e busca híbrida|11-Estratégias de retrieval e busca híbrida]]: Limitações da busca puramente vetorial em termos técnicos e identificadores. Algoritmo lexical BM25 com saturação de frequência de termos e normalização de extensão, pipeline de Busca Híbrida e algoritmo de fusão de consenso Reciprocal Rank Fusion (RRF).
    * [[llm/12-Reranking e modelos de pontuação cruzada|12-Reranking e modelos de pontuação cruzada]]: O pipeline de dois estágios (Two-Stage Retrieval). Por que o Top-1 da busca inicial não é o melhor documento, arquitetura Cross-Encoder com atenção cruzada total token a token entre pergunta e candidato, e filtragem de alta precisão para a LLM.
    * [[llm/13-Engenharia de contexto para RAG|13-Engenharia de contexto para RAG]]: Seleção, ordenação estratégica em ferradura (*U-shaped ordering*) para combater o viés de recência/primazia, citações estritas de procedência (*provenance*), blindagem defensiva contra envenenamento de contexto (*Context Poisoning*) e injeção indireta via tags XML.
    * [[llm/14-Construindo um RAG em JavaScript|14-Construindo um RAG em JavaScript]]: Implementação didática e funcional completa ponta a ponta em JavaScript puro (ES6+) sem uso de frameworks mágicos (LangChain/LlamaIndex), demonstrando processamento de Markdown, chunking com metadados, busca por cosseno e geração de prompts estruturados.
    * [[llm/15-Avaliando um sistema RAG|15-Avaliando um sistema RAG]]: Metodologia formal de Evals para RAG. Desacoplamento de métricas de Retrieval (Hit Rate @ K, Context Precision, Context Recall) e métricas de Geração (Faithfulness/Groundedness, Answer Relevance), criação de datasets de validação (*ground-truth*), runner automatizado de testes e o paradigma LLM-as-a-Judge.
    * [[llm/16-RAG avançado e limites arquiteturais|16-RAG avançado e limites arquiteturais]]: Técnicas de fronteira: Query Rewriting, Multi-Query Retrieval, HyDE, Parent-Child (Small-to-Big), Contextual Retrieval, Graph RAG, Agentic RAG, caching semântico e indexação incremental por hash de conteúdo. Cenários onde o RAG é a escolha errada (Text-to-SQL para dados relacionais/agregações numéricas, sumarização panorâmica de livros e adaptação de estilo via fine-tuning).
  * **Atualização do Guia de Estudos e Sincronização Web**:
    * Atualizado [[llm/00-Guia de estudos|00-Guia de estudos]] com a inclusão da *Camada 5: Arquitetura RAG*, com diagrama de 5 camadas e links para todos os novos artigos.
    * Inseridos os 11 artigos na lista de fallback de `js/vault.js`.
    * Incrementado cache buster para `v29` em `index.html`.

* **Harmonização Visual e Legibilidade de Código Inline (`style.css` e `script.js`)**:
  * **Resolução de Contraste no Modo Claro**: Substituído o fundo escuro estático (`#333`) de `.artigo-corpo code` pela cor de destaque contextual do vault (`var(--accent-pink-alpha-15)` e borda `var(--accent-pink-alpha-30)`), proporcionando leitura nítida e confortável com o texto escuro (`var(--text): #0f172a`) sem perder a identidade estética em ambos os temas (escuro e claro).
  * **Interatividade e Cópia com 1 Clique**: Portado o comportamento de feedback instantâneo ao clicar em trechos inline: cursor interativo, hover com contraste aprimorado, classe `.code-copiado` com tooltip animado `copiado!` via `fadeInOut` e escrita direta na área de transferência (`navigator.clipboard`).
  * **Preservação de Blocos de Código**: Isolamento estrito de blocos `<pre>` e `.code-line code`, garantindo que apenas trechos de código em parágrafos e tabelas recebam a estilização inline.

* **Criação do Guia Exaustivo de Comandos Git e Prevenção de Riscos (`git/01-fundamentos/Guia exaustivo de comandos Git.md`, `git/Introdução ao Git.md` e `js/vault.js`)**:
  * **Cobertura Completa e Rigor Operacional**: Desenvolvido artigo completo cobrindo todas as fases do Git: modelo mental das quatro zonas (Working Directory, Staging/Index, Local Repository e Remote), comandos de inicialização, inspeção (`log`, `diff`, `show`, `status`), ciclo de commit (`add`, `commit`, `--amend`), ramificação (`branch`, `switch`, `checkout`), estratégias de integração (`merge` tradicional vs. `rebase` vs. `cherry-pick`), sincronização remota (`fetch`, `pull`, `push`, `--force-with-lease`), recuperação e desfazer (`restore`, `reset --soft/mixed/hard`, `revert`, `reflog`), gaveta de rascunhos (`git stash`), limpeza de disco (`git clean`), tags semânticas e diagnóstico com `blame` e `bisect`.
  * **Alertas Explícitos de Risco e Perda Permanente**: Destacados com alertas (`[!CAUTION]`) comandos destrutivos que não realizam versionamento e eliminam dados sem passar pela lixeira (`git restore .`, `git clean -fd`, `git reset --hard`, `git push --force`), acompanhados de tabela de prevenção e alternativas seguras.
  * **Diagramas Mermaid e Interconexão**: Adicionado diagrama visual das quatro zonas e diagrama comparativo de Merge vs. Rebase. Atualizados links internos em `Introdução ao Git.md` e metadados de fallback em `js/vault.js`.

* **Aprofundamento Técnico Rigoroso e Renomeação da Trilha de LLMs (`llm/`, `js/vault.js`, `index.html`)**:
  * **Arquitetura de Profundidade Progressiva (Feynman Técnico)**: Reescritos os 5 artigos da trilha de IA com padrão estrutural em cinco estágios: Intuição & Analogia $\to$ Mecanismo Técnico Formal $\to$ Implementação Mínima Executável $\to$ Limites da Analogia $\to$ Implicações Práticas de Engenharia.
  * **Renomeação Alinhada à Densidade Conceitual e Sentence Case**:
    * [[llm/00-Guia de estudos|00-Guia de estudos]]: *Guia de estudos de LLMs: arquitetura, sistemas e engenharia*. Reestruturação da trilha em 4 camadas de maturidade (Fundamentos Matemáticos e Arquitetura; Treinamento e Comportamento; Engenharia de Contexto; Sistemas e Aplicações com Agentes), preparando a base para tópicos avançados (RAG, Evals, MCP, MoE, Quantização).
    * [[llm/01-Dinâmica de treino e inferência em LLMs|01-Dinâmica de treino e inferência em LLMs]]: *Dinâmica de treino e inferência em LLMs: pré-treino, pós-treino e amostragem*. Superação do reducionismo do auto-completar. Detalhamento do pré-treinamento com minimização de *Cross-Entropy Loss* e *Gradient Descent* (AdamW), pós-treinamento com *Supervised Fine-Tuning* (SFT) e alinhamento humano por *RLHF* e *DPO*. Pipeline matemático de inferência com amostragem de logits, Softmax termodinâmico, temperatura e filtragem por núcleo (*Top-p / Nucleus Sampling*). Análise das causas mecânicas de alucinações.
    * [[llm/02-Tokenização, embeddings e representações contextuais|02-Tokenização, embeddings e representações contextuais]]: *Tokenização, embeddings e representações contextuais: de BPE ao espaço vetorial*. Separação conceitual estrita entre matriz de *input embeddings* estáticos de vocabulário ($W_E$), representações contextuais dinâmicas construídas pelas camadas do Transformer e *sentence embeddings* treinados com *contrastive learning*. Tokenização moderna com *Byte-Pair Encoding* (BPE) e seus pontos cegos. Correção do bug de cálculo de norma e implementação de classe demonstrativa de *mean-pooling* e similaridade de cosseno validada.
    * [[llm/03-Arquitetura do Transformer e mecanismo de atenção|03-Arquitetura do Transformer e mecanismo de atenção]]: *Arquitetura do Transformer e mecanismo de atenção: tensores, RoPE e KV cache*. Anatomia completa do bloco Transformer Decoder-only: *Residual Stream*, normalização com *RMSNorm*, embeddings posicionais rotacionais (*RoPE*), projeções lineares $W_Q, W_K, W_V$, matriz de atenção escalada ($QK^T / \sqrt{d_k}$) com *Causal Masking* triangular ($-\infty$), camadas FFN com portas *SwiGLU*, taxonomia comparativa das três famílias (Decoder-only, Encoder-only, Encoder-Decoder) e a função crítica do *KV Cache* para a latência e consumo de VRAM.
    * [[llm/04-Engenharia de contexto e controle de inferência|04-Engenharia de contexto e controle de inferência]]: *Engenharia de contexto e controle de inferência: fronteiras, raciocínio e structured outputs*. Transição de prompt engineering para *Context Engineering*. A janela de contexto como RAM volátil do sistema operacional, o problema de fronteira e vulnerabilidade à injeção de prompt indireta (*Prompt Injection*), limites práticos de *Chain-of-Thought* (CoT) versus modelos com busca em tempo de teste (*Test-time Compute* com RL), e garantia determinística de formato via *Constrained Decoding* com JSON Schema e autômatos gramaticais.
    * [[llm/05-Sistemas de produção com LLMs, tool calling e streaming|05-Sistemas de produção com LLMs, tool calling e streaming]]: *Sistemas de produção com LLMs, tool calling e streaming: o loop agente e resiliência*. Padrões de arquitetura de software para produção: loop completo de *Tool Calling* / *Function Calling* (modelo $\to$ aplicação $\to$ execução de código $\to$ retorno à LLM), implementação de retries com backoff exponencial e *jitter*, economia de até 90% de custo e latência com *Prompt Caching* e orquestrador executável de agentes em JavaScript puro.
  * **Sincronização de Assets**: Atualizada a lista de fallback no `js/vault.js` e cache buster para `v28` no `index.html`.

* **Migração e Sincronização de Recursos Maduros do Vault da PUC para o Vault de Programação**:
  * **Explorador Interativo de Mermaid Modularizado (`js/mermaid.js`, `script.js` e `style.css`)**:
    * Criado módulo ES6 dedicado `js/mermaid.js` com motor de renderização, wrapper universal `.mermaid-wrapper` e toolbar com botão `ampliar`.
    * Implementado modal fullscreen interativo com zoom in/out, fit de tela (`f`), tamanho real 1:1 (`0`), atalhos de teclado (`+`, `-`, `Esc`) e pan/arraste por mouse ou toque com feedback visual (*grab* / *grabbing*).
    * Adaptadas classes semânticas (`:::core`, `:::component`, `:::data`, `:::warning`, `:::external`) e tokens de cores para a identidade visual rosa do vault (`--accent-pink: #ffb6c1` no modo escuro e `#c2255c` no modo claro).
  * **Renderização Matemática e Símbolos com KaTeX (`index.html` e `script.js`)**:
    * Adicionados estilos e scripts do KaTeX com suporte a auto-render de delimitadores (`$$`, `$`, `\(`, `\[`).
    * Implementado conversor de setas e expressões LaTeX (`processarLaTeXSetas`) para renderização nativa de operadores como `\rightarrow` para `→`.
  * **Lightbox Interativo de Imagens (`script.js` e `style.css`)**:
    * Adicionado modal fullscreen para zoom em figuras e imagens do corpo do artigo com backdrop blur, botão de fechamento e tecla Escape.
  * **Modularização do Catálogo e Fallback do Vault (`js/vault.js` e `script.js`)**:
    * Centralizados metadados de áreas, numeração e descrições no módulo `js/vault.js`, com lista de fallback completa e resiliente para alta disponibilidade offline ou erro de API.
  * **Atualização das Diretrizes de Governança Técnica (`AGENTS.md`)**:
    * Expandidas regras para diagramas Mermaid (critério topológico, classes semânticas, proibição estrita de ASCII art e critérios de aceite pré-commit).
    * Reforçada regra de codificação segura de caracteres como `#` (`encodeURIComponent`) e rolagem automática ao topo (`scroll(0,0)`).
  * **Versionamento de Assets**: Cache buster atualizado para `v26` em `index.html` e nos imports.

## 2026-08-31

* **Implementação de Alternância de Tema Claro e Escuro (`script.js`, `style.css` e `index.html`)**:
  * **Consistência Arquitetural com a PUC**: Adicionado botão `theme-toggle` na barra superior com persistência em `localStorage` e detecção automática de preferência do sistema operacional (`prefers-color-scheme`).
  * **Preservação e Adaptação da Identidade Rosa**: Definidos tokens dinâmicos para ambos os modos:
    * **Modo Escuro**: Fundo preto profundo (`--bg: #050505`), texto claro (`--text: #f5f5f7`), realces em rosa suave (`--accent-pink: #ffb6c1`).
    * **Modo Claro**: Fundo *off-white* suíço (`--bg: #f8fafc`), texto escuro de alta legibilidade (`--text: #0f172a`), superfícies brancas (`--surface: #ffffff`) e realces em rosa profundo (`--accent-pink: #c2255c`).
  * **Mermaid Reativo**: Diagramas Mermaid são reconfigurados e renderizados automaticamente ao alternar entre os temas claro e escuro.
  * **Versionamento de Assets**: Cache buster atualizado para `v25` no `index.html`.

* **Fixação Sticky do Índice Lateral "Neste Artigo" (`style.css` e `index.html`)**:
  * Removida a propriedade `overflow-x: hidden` do elemento raiz (`html, body`), que quebrava o contexto de rolagem do navegador e impedia o funcionamento de `position: sticky`.
  * Configurado `position: sticky; top: 80px; max-height: calc(100vh - 100px); overflow-y: auto;` com alinhamento superior no `.artigo-layout-container`, garantindo que o índice lateral "Neste artigo" acompanhe a leitura e role suavemente com a página.
  * Atualizado cache buster para `v24` no `index.html`.

* **Linting Completo de WikiLinks e Proteção de Pipes (`csharp/11-O loop foreach em Csharp.md` e vault)**:
  * Executado script de verificação estática em todos os 117 arquivos Markdown do repositório, validando **938 WikiLinks ativos**.
  * Corrigido pipe não escapado na tabela de comparação do artigo de loop foreach em C# (`[[csharp/12-Arrays em Csharp\|Arrays]]`), garantindo conformidade estrita com o padrão de colunas Markdown.

* **Sincronização da Busca Suíça e Inclusão de Todas as Pastas do Vault (`script.js`, `style.css` e `index.html`)**:
  * **Consistência Visual com a PUC**: Substituídos os cards antigos de busca pelo padrão suíço em lista (`resultado-item`), com numeração de linha (`01`, `02`...), destaque de termos em rosa (`mark.highlight`) no título e trecho contextual (`extrairTrechoRelevante`).
  * **Ocultação Limpa de Seções**: Ao digitar na busca, a seção inteira de áreas de estudo (`#explorar-pastas`) é ocultada imediatamente, eliminando elementos residuais soltos na tela.
  * **Mapeamento Completo de Pastas**: Expandida a lista de arquivos e carregamento para incluir 100% dos tópicos do vault, abrangendo **Python**, **React**, **Tutoriais**, **C#**, **CSS**, **Git**, **JavaScript**, **Mermaid**, **Web** e notas gerais.
  * **Versionamento de Assets**: Cache buster atualizado para `v23` no `index.html`.

* **Correção de Integridade Sintática do CSS (`style.css` e `index.html`)**:
  * Fechado bloco de chave CSS na regra de timeline (`.mermaid .timeline-year tspan`), restaurando o carregamento integral de todos os estilos e layouts da interface.
  * Atualizado cache buster para `v22` no `index.html`.

* **Correção de Escapamento de Pipes em Tabelas Markdown (`Sintaxe e possibilidades com Mermaid.md` e `index.html`)**:
  * Substituídos pipes literais na tabela de cardinalidades do `erDiagram` por entidades HTML (`&#124;`), impedindo que o parser de Markdown interprete a sintaxe relacional como delimitadores de coluna de tabela.
  * Atualizado cache buster para `v21` no `index.html`.

* **Otimização de Legibilidade do Eixo Temporal no Gráfico de Gantt (`Sintaxe e possibilidades com Mermaid.md`, `script.js` e `style.css`)**:
  * Ajustado `axisFormat` para `%b` com `tickInterval 1month`, exibindo os meses abreviados de forma limpa e espaçada, sem amontoar nem sobrepor números de ano/dia.
  * Definida largura mínima de 600px e rolagem horizontal suave no container do diagrama para manter as barras e os rótulos de seções e tarefas 100% legíveis em qualquer tela.
  * Atualizado cache buster para `v20` no `index.html`.

* **Blindagem de Parsers Markdown contra Corrupção de Tags de Código e Estilização de Mindmaps (`script.js`, `style.css` e `index.html`)**:
  * **Isolamento de Código e Syntax Highlighting**: Funções `converterHighlightsObsidian` e `protegerPipesObsidian` atualizadas para particionar o Markdown e ignorar completamente blocos cercados (```` ``` ````) e código inline (`` ` ``). Isso impede que `==>` seja convertido em tags HTML `<mark class="obsidian-highlight">` dentro de tabelas e diagramas.
  * **WikiLinks Seguros via DOM TreeWalker**: O parser de WikiLinks agora opera estritamente através de um `TreeWalker` que filtra e rejeita nós dentro de `<pre>`, `<code>` e `.mermaid`, impedindo a conversão de `id[["Texto"]]` em links `<a>` quebrados.
  * **Legibilidade e Contraste em Mindmaps e Timelines**: Ajustados estilos do nó raiz e nós filhos em mapas mentais (`mindmap`) e linhas do tempo (`timeline`), com fundos escuros refinados (`#1c1c1c` / `#222222`), bordas em rosa e texto branco 100% legível.
  * **Versionamento de Assets**: Cache buster atualizado para `v19` no `index.html`.

* **Correção Geral de Sintaxe e Alto Contraste para Diagramas Mermaid no Web App (`style.css`, `script.js` e `Sintaxe e possibilidades com Mermaid.md`)**:
  * **Sintaxe de Nós e Conectores**: Removida sintaxe não padrão de nós como parênteses triplos `((()))` e setas `<-->` no `flowchart TD`, eliminando qualquer erro `Syntax error in text (mermaid version 11.17.2)`.
  * **Alto Contraste e Legibilidade no Dark Mode**: Configurado conjunto completo de `themeVariables` no `mermaid.initialize` e regras CSS dedicadas para forçar textos brancos e nítidos em **Linha do tempo (`timeline`)**, **Mapas mentais (`mindmap`)**, **Matrizes de quadrantes (`quadrantChart`)** e **Cronogramas (`gantt`)**, resolvendo textos escuros sobrepostos e blocos sem contraste.
  * **Espaçamento e Datas do Gantt**: Reorganizado o eixo de datas do gráfico de Gantt e títulos de quadrantes para evitar quebras de layout e sobreposição de rótulos.
  * **Versionamento de Assets**: Atualizado cache busting para `v18` no `index.html`.

* **Otimização de Cache e Atualização Instantânea no GitHub Pages (`index.html` e `script.js`)**:
  * Adicionado `{ cache: "no-cache" }` nas requisições `fetch` da API do GitHub e no carregamento concorrente dos arquivos Markdown, evitando que o navegador sirva versões em cache desatualizadas.
  * Atualizado o identificador de versão de assets no `index.html` para `v17` (`style.css?v=estrutura-v17` e `script.js?v=estrutura-v17`).

* **Expansão Exaustiva e Completa de Sintaxe e Modelagem do Mermaid**:
  * [[mermaid/Sintaxe e possibilidades com Mermaid|Sintaxe e possibilidades com Mermaid]]: Guia completamente expandido e estruturado cobrindo todos os tipos de diagramas e elementos do ecossistema Mermaid (v11+). Inclui dicionário exaustivo de 13 formas geométricas de nós em `flowchart`, tabela com os 9 tipos de conexões/setas, subgrafos com direção interna, estilização e classes CSS, diagramas de sequência avançados (com `actor`, ativações, notas, agrupamento em `box`, estruturas `alt`, `opt`, `loop`, `par`, `critical`, `break`), modelagem completa de classes (`classDiagram`) com visibilidade, abstração, interfaces e tipos genéricos, máquinas de estado (`stateDiagram-v2`) com concorrência e bifurcações, modelagem de dados relacionais (`erDiagram`) com todas as cardinalidades, cronogramas de entrega em `gantt` com milestones e dependências, versionamento e branches em `gitGraph`, mapas mentais (`mindmap`), matrizes de priorização de produto (`quadrantChart`), linha do tempo de releases (`timeline`), gráficos de proporção (`pie`), boas práticas de prevenção de erros e tabela/guia de decisão Feynman para escolha do diagrama ideal.
* **Correção de Sintaxe e Renderização de Diagramas Mermaid (v11+)**:
  * [[mermaid/Sintaxe e possibilidades com Mermaid|Sintaxe e possibilidades com Mermaid]]: Corrigido o erro `Syntax error in text (mermaid version 11.17.2)` na seção *Tipos de conexões e setas*. Adicionada tabela comparativa com todas as sintaxes de conectores (`-->`, `---`, `-.->`, `==>`, `-->|Texto|`) e reestruturado o diagrama para `flowchart TD` vertical conectado ao nó principal com quebras compactas `<br>`, garantindo 100% de compatibilidade com o motor do Mermaid e perfeita legibilidade mobile.

## 2026-08-29

* **Auditoria Geral e Correção Global de Integridade do Vault**:
  * **Zero Links Quebrados**: Varredura completa em mais de 90 notas e correção automatizada de 1.010 links e referências cruzadas (ajuste de caminhos legados de C#, JavaScript `02-funcoes-e-objetos`, pipes escapados em tabelas e normalização de nomes de arquivos).
  * **Zero Emojis**: Remoção de emojis residuais em arquivos de projetos práticos e tutoriais de C#.
  * **Padronização de Sintaxe Mermaid**: Diagramas atualizados para conectores padrão com pipes `-->|Rótulo|` e blocos de código com quebras `<br>` compactas.
  * **Padronização de Títulos e Cabeçalhos**: Revisados e convertidos para *Sentence Case* estrito nos artigos de manipulação e tutoriais.
* **Incorporação de Diretrizes e Regras Avançadas do Vault PUC (`AGENTS.md` e `.agents/rules/`)**:
  * Atualizado o [`AGENTS.md`](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/AGENTS.md) consolidando as diretrizes de apresentação dual de código didático (snippets atômicos + exemplo completo integrado), regras de layout vertical e compatibilidade para Mermaid v11, preservação absoluta de marcações manuais (`==texto==`), proteção de métodos dunder/underscores em WikiLinks (`__proto__`, `__init__`) e refinamento de *Sentence Case*.
  * Criadas as regras dedicadas `.agents/rules/code_presentation.md`, `.agents/rules/mermaid_guidelines.md` e `.agents/rules/preserve_highlights.md`.
  * Atualizado o `script.js` com a renderização de conectores lineares no Mermaid (`flowchart: { curve: 'linear' }`) e blindagem de underlines em WikiLinks antes do processamento com `marked.js`.
* **Correção de Compatibilidade de Sintaxe do Mermaid (v11+)**:
  * [[mermaid/Sintaxe e possibilidades com Mermaid|Sintaxe e possibilidades com Mermaid]], [[mermaid/Introdução ao Mermaid|Introdução ao Mermaid]] e [[web/01-fundamentos/DNS e gerenciamento de domínios|DNS e gerenciamento de domínios]]: Ajustada a sintaxe de rótulos em conectores de setas de `-- Texto -->` para a notação padrão com pipes `-->|Texto|`, resolvendo o erro de parsing `Syntax error in text (mermaid version 11.17.2)`.
* **Atualização visual do Web App (`index.html`, `style.css` e `script.js`)**:
  * Alinhada a interface à estrutura editorial dos vaults PUC e Guia do Portal: masthead com título e busca, navegação fixa com pesquisa e catálogo de áreas em linhas de leitura.
  * Mantida a identidade visual rosa (`var(--accent-pink)`); a sidebar do artigo filtra os títulos de suas seções, enquanto a navbar faz a busca global do vault.
  * Substituído o acordeão por uma página de área com artigos numerados; a capa e a busca principal agora aparecem somente na home.
  * Adicionados breadcrumbs, contexto exibido somente quando presente e navegação entre o artigo anterior e o próximo da mesma área.
  * Adicionadas rotas compartilháveis para áreas e artigos e aplicada grade suíça ao catálogo inicial.
  * Padronizada a apresentação dos títulos e áreas, preservando os nomes de arquivos e as rotas existentes.
  * Ocultado visualmente o rótulo da busca principal, mantendo-o disponível para tecnologias assistivas.
* Corrigida a grade das áreas para duas colunas em telas de desktop e uma coluna no celular.
* Tabelas agora usam toda a largura disponível e exibem rolagem horizontal quando o conteúdo ultrapassa o artigo.
* Removido o divisor vertical entre as colunas da grade de áreas.
* Adicionadas descrições objetivas em cada área do catálogo para antecipar os conteúdos disponíveis.

## 2026-08-19

* **Criação de Artigo de Infraestrutura e Redes Web**:
  * [[web/01-fundamentos/DNS e gerenciamento de domínios|DNS e gerenciamento de domínios (A, CNAME, TXT, MX e NS)]]: Guia exaustivo e didático explicando o funcionamento do DNS (analogia da agenda de contatos), resolução recursiva e servidores raiz/TLD/autoritativos com diagramas Mermaid, dicionário completo dos tipos de registros (A, AAAA, CNAME, TXT, MX, NS, CAA, SRV, SOA), autenticação de e-mails com SPF/DKIM/DMARC, validação de posse de domínio, os 3 cenários de movimentação de DNS (apontamento simples vs troca de NS vs transferência de custódia), impacto do TTL e estratégia de migração sem queda (Zero Downtime).
* **Atualização do Web App (`script.js`)**:
  * Adicionada a nova nota [[web/01-fundamentos/DNS e gerenciamento de domínios|DNS e gerenciamento de domínios]] à lista de busca e fallback do leitor.

---

## 2026-08-16

* **Atualização Pedagógica de Tratamento de Erros**:
  * [[javascript/06-arquitetura-e-avancado/06-Tratamento de erros|Tratamento de erros (try, catch e finally)]]: Explicação detalhada da sintaxe `try / catch / finally` com analogia da máquina de cartão por aproximação, fluxograma Mermaid, propriedades do objeto `erro` (`message`, `name`, `stack`), exemplos de UI com desligamento de loaders no `finally` e emissão de exceções com `throw`.
* **Importação e Atualização do Web App (`index.html`, `style.css` e `script.js`)**:
  * Importadas as melhorias do motor de renderização da PUC, preservando a identidade visual Dark / Rosa (`#ffb6c1` / `var(--accent-pink)`).
  * **Sumário Dinâmico (TOC)**: Adicionada sidebar de Table of Contents (`#artigo-toc-sidebar`) à esquerda com navegação suave e destaque em tempo real via `IntersectionObserver` (ScrollSpy).
  * **Renderização Aprimorada do Obsidian**: Suporte a Callouts estilizados (`[!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`, `[!CAUTION]`), marcações de highlight (`==texto==`), proteção de links com pipes em tabelas e normalização de identação de listas.
  * **Listas de Tarefas**: Formatação e renderização de checkboxes customizadas (`[ ]` e `[x]`).
  * **Numeração de Código e Diagramas Mermaid**: Linhas numeradas em blocos `<pre>` e integração com o motor do Mermaid configurado no tema Dark/Rosa.
* **Novo Artigo de Sintaxe do Mermaid**:
  * [[mermaid/Sintaxe e possibilidades com Mermaid|Sintaxe e possibilidades com Mermaid]]: Guia aprofundado com a sintaxe completa de nós geométricos, estilos de setas e conectores (com sintaxe de rótulo compatível com Mermaid v11+), sub-grafos (`subgraph`), diagramas de sequência com mensagens síncronas/assíncronas, modelagem de classes (`classDiagram`), máquinas de estado (`stateDiagram-v2`), mapas mentais (`mindmap`) e gráficos de pizza (`pie`).
* **Nova Pasta e Artigo Introdutório de Mermaid**:
  * Criação da pasta `mermaid/` e da nota [[mermaid/Introdução ao Mermaid|Introdução ao Mermaid]]: Explicação conceitual de Diagrams as Code com analogia ao Auto Layout / Figma vs softwares gráficos, funcionamento do motor parser/SVG, sintaxe de `flowchart`, `sequenceDiagram`, `erDiagram` e `gantt`, com regras para o Obsidian.

---

## 2026-08-13

* **Otimização de Performance da Busca (`script.js`)**:
  * Implementado sistema de pré-carregamento concorrente com `Promise.all` para cachear todo o conteúdo das notas `.md` na memória durante a inicialização.
  * Adicionada busca instantânea em tempo real acionada diretamente no evento de digitação (`input`), com controle de *debounce* (150ms).
* **Ajuste de Layout Responsivo e Mobile (`style.css`)**:
  * Aplicada trava global (`overflow-x: hidden` e `box-sizing: border-box`) no `html` e `body` para resolver a rolagem horizontal indesejada em smartphones e tablets.
  * Adicionado suporte a `word-break: break-word` e rolagem horizontal em container próprio (`overflow-x: auto`) para blocos de código (`<pre>`), tabelas e elementos visuais no leitor de artigos.
* **Padronização de Regras de IA (`AGENTS.md` & `.agents/`)**:
  * Criado o arquivo [`AGENTS.md`](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/AGENTS.md) na raiz do repositório para centralizar as instruções globais do agente (obrigando a leitura prévia de `AGENTS.md` e `me.md`, registro em log, commit automático, uso de WikiLinks, técnica Feynman e proibição de emojis).
  * Migrada a estrutura de regras da pasta `.gemini/` para `.agents/rules/`.



---

## 2026-08-05


* **Reorganização Estrutural do Csharp**:
  * Reordenamento e renumeração de todos os 26 artigos de Csharp em uma sequência pedagógica contínua (01 a 26), dividida em 5 fases de aprendizado (Fundamentos & E/S -> Condicionais & Loops -> Coleções -> POO & Arquivos -> Web & Full Stack).
  * Atualização completa da lista de busca no `script.js` e do `00-Guia de estudos.md`.
* **Novo Artigo Integrador**:
  * [[csharp/26-Como conectar Csharp no HTML (Backend + Frontend JS)\|Como conectar Csharp no HTML (Backend + Frontend JS)]]: Artigo integrador explicando a arquitetura C# (Backend) + HTML/CSS/JS (Frontend), a analogia do Drive-Thru, troca de JSON via REST API e consumo com `fetch()`.
* **Revisão Ortográfica Geral**:
  * Correção e normalização automatizada de acentuação em português em 50 arquivos do vault (incluindo artigos de C#, JavaScript, CSS, Python e Git).

---

## 2026-08-04

* **Novos Artigos de Csharp**:
  * [[csharp/15-Capacity em coleções\|Capacity em coleções]]: Explicação de performance e alocação de memória de coleções.
  * [[csharp/11-O loop foreach em Csharp\|O loop foreach em Csharp]]: Estrutura de iteração sobre coleções e funcionamento do `IEnumerable`. Revisado com método Feynman (analogia da esteira de produção).
  * [[csharp/10-O loop do-while em Csharp\|O loop do-while em Csharp]]: Garantia de execução mínima de bloco de repetição e validação.
  * [[csharp/03-Console.Write e Console.WriteLine\|Console.Write e Console.WriteLine]]: Revisado com método Feynman (analogia da máquina de escrever) e emojis removidos.
  * [[csharp/06-Métodos de string (ToUpper e ToLower)\|Métodos de string (ToUpper e ToLower)]]: Revisado com método Feynman (analogia do filtro de voz e da foto impressa) e emojis removidos.
  * [[csharp/08-O switch em Csharp\|O switch em Csharp]]: Explicação com método Feynman (analogia do elevador) para controle de fluxo condicional múltiplo e Switch Expressions, sem o uso de emojis.
  * [[csharp/24-Csharp no Frontend e Backend\|Csharp no Frontend e Backend]]: Visão geral do ecossistema .NET para desenvolvimento full stack com ASP.NET Core (backend/API) e Blazor (frontend).
  * [[csharp/25-Consumindo APIs em Csharp\|Consumindo APIs em Csharp]]: Como usar o HttpClient para integrar APIs externas, deserializar JSON e a diferença entre consumir APIs no backend vs no frontend.
* **Criação de Regras (.gemini)**:
  * [[.agents/rules/no_emojis\|no_emojis]]: Nova regra estabelecida proibindo o uso de emojis em qualquer contexto do projeto (tanto no chat quanto nos arquivos do vault).
* **Atualização de Notas**:
  * [[csharp/01-Introdução ao Csharp\|Introdução ao Csharp]]: Adicionada seção de transição para outras linguagens e realizada a remoção completa de emojis decorativos dos cabeçalhos.
  * [[csharp/02-O método Main\|O método Main]]
  * Adicionada seção detalhada explicando quando usar o método Main com argumentos `(string[] args)` (CLI, scripts, automações) e quando usar sem parâmetros `()` (Console simples, UI, Web).
* **Organização de Tutoriais (Trilha Csharp Prática)**:
  * Criados **5 novos tutoriais práticos** baseados em projetos para consolidar as fases de estudo:
    1. [[tutoriais/[Csharp] • Projeto 1 - O Assistente de Terminal|[Csharp] • Projeto 1 - O Assistente de Terminal]] (Fundamentos, Entrada/Saída).
    2. [[tutoriais/[Csharp] • Projeto 2 - O Jogo de Adivinhação|[Csharp] • Projeto 2 - O Jogo de Adivinhação]] (Condicionais, Repetições, Random).
    3. [[tutoriais/[Csharp] • Projeto 3 - O Gerenciador de Tarefas|[Csharp] • Projeto 3 - O Gerenciador de Tarefas]] (Menu CLI, Listas Dinâmicas, Switch).
    4. [[tutoriais/[Csharp] • Projeto 4 - O Simulador de Conta Bancária|[Csharp] • Projeto 4 - O Simulador de Conta Bancária]] (Classes, Objetos, Construtor, Encapsulamento).
    5. [[tutoriais/[Csharp] • Projeto 5 - O Diário Digital|[Csharp] • Projeto 5 - O Diário Digital]] (Arquivos System.IO, Try-Catch, LINQ).
  * Adicionado o tutorial [[tutoriais/[Csharp] • Como Usar ArrayList, For e Foreach para Calcular Médias\|[Csharp] • Como Usar ArrayList, For e Foreach para Calcular Médias]] com guia de terminal.
* **Manutenção do Web App e Links**:
  * Registrados os novos arquivos e os 5 projetos práticos em `script.js`.
  * Atualizado o [[csharp/00-Guia de estudos|Guia de estudos]] ligando as fases teóricas com os novos projetos recomendados.
  * Aplicada a regra de links cruzados e limpeza de extensões `.md` em todos os artigos relacionados das novas notas.

## 2026-08-03


* **Reorganização de C#**:
  * Renomeação e numeração lógica dos 13 arquivos de C# (`00-` a `13-`) conforme recomendação do Guia de Estudos.
  * Atualização de todos os links e referências cruzadas internos no vault.
* **Interligação de Artigos de Csharp**:
  * Realizada uma varredura geral e inseridos Wikilinks cruzados em **15 arquivos de Csharp** conectando termos-chave (como arrays, POO, métodos, coleções, exceções, etc.) às suas respectivas notas explicativas.
* **Regra de Interligação Automática (Modus Operandi)**:
  * Criada a regra [[.agents/rules/auto_interlinking\|auto_interlinking.md]] definindo o comportamento padrão de linkagem inteligente cruzada para qualquer nova criação ou atualização de notas no vault.
* **Atualização de Nota**: [[csharp/01-Introdução ao Csharp\|Introdução ao Csharp]]
  * Adicionada seção explicativa com exemplos cotidianos e práticos de utilização do C# (McDonald's, Pix e automação) sob a ótica do Método Feynman.
* **Codificação de URLs em Links**:
  * Codificados todos os caminhos (URLs) em links markdown (`[[caminho|texto]]`) que contêm espaços e caracteres especiais em todas as notas do C# para garantir compatibilidade com o leitor do Web App (`marked.js`).
* **Regra de Preferência de Wikilinks**:
  * Criada a regra [[.agents/rules/prefer_wikilinks\|prefer_wikilinks.md]] para tornar obrigatório o uso de Wikilinks do Obsidian para links internos, garantindo compatibilidade multiplataforma.
* **Organização de Tutoriais**:
  * Renomeados os 4 arquivos na pasta `tutoriais/` adicionando o prefixo da linguagem correspondente (ex: `[JavaScript] • `) no nome dos arquivos e nos títulos principais (H1).
  * Atualizados os respectivos títulos e caminhos de arquivos no `script.js`.
* **Reorganização de JavaScript**:
  * Renomeação e numeração de todos os arquivos de notas dentro das subpastas lógicas (`01-fundamentos`, `02-funcoes-e-objetos`, `03-manipulacao`, `04-dom-e-browser`, `05-assincrono` e `06-arquitetura-e-avancado`) seguindo a sequência de fases do Guia de Estudos.
  * Atualização de todos os links internos, Wikilinks e caminhos de fallback no script `script.js`.
* **Criação de Notas Avançadas de C#**:
  * [[csharp/21-Tratamento de erros\|Tratamento de erros]]: Tratamento com `try`, `catch`, `finally` e `throw`.
  * [[csharp/22-Manipulação de arquivos\|Manipulação de arquivos]]: Manipulação de diretórios e arquivos com `System.IO`.
  * [[csharp/20-Herança e interfaces\|Herança e interfaces]]: Conceitos avançados de POO, herança de classes e contratos de interface.
  * [[csharp/23-LINQ buscas e filtros\|LINQ buscas e filtros]]: Consultas eficientes em coleções com métodos LINQ (`Where`, `Select`, `OrderBy`, etc.).

* **Atualização de Nota**: [[csharp/12-Arrays em Csharp\|Arrays em Csharp]]
  * Adicionada dica explicativa diferenciando as condições de limite do loop (`i < nomes.Length` vs `i < nomes.Length - 1`) para evitar confusões comuns com índices de array.

* **Atualização de Regra do Vault**:
  * Atualizada a regra [[.agents/rules/log_changes\|log_changes.md]] para incluir a obrigatoriedade de commit e push imediato ao GitHub após qualquer alteração no vault.

* **Atualização de Nota**: [[csharp/01-Introdução ao Csharp\|Introdução ao Csharp]]
  * Adicionada seção explicando o uso de namespaces extras (como `System.Collections.Generic`, `System.IO`, `System.Linq` e `System.Text`) para importar outras caixas de ferramentas no C#.

## 2026-08-02

* **Atualização de Regra do Vault**:
  * Atualizada a regra [[.agents/rules/linking_articles\|linking_articles.md]] para proibir caminhos locais absolutos do sistema e impor o uso exclusivo de links relativos ou Wikilinks para portabilidade em dispositivos móveis.

* **Padronização de Links do Vault**:
  * Conversão coletiva de todos os links de markdown locais absolutos (iCloud / Local paths) nas notas de C# para caminhos relativos de alta compatibilidade multi-dispositivo no Obsidian.

* **Criação de Nota**: [[csharp/17-Lista, pilha e fila\|Lista, pilha e fila em C#]]
  * Criação do guia de implementação prática contendo sintaxes, operações (Enqueue, Dequeue, Push, Pop, Add, Insert) e analogias do Método Feynman.

* **Criação de Notas de C#**:
  * [[csharp/14-Coleções em Csharp\|Coleções em Csharp]]: Explicação sobre coleções flexíveis (`List<T>`, `Dictionary<K, V>`, `HashSet<T>`).
  * [[csharp/16-Tipos abstratos de dados\|Tipos abstratos de dados]]: Introdução conceitual sobre TADs (Filas, Pilhas e Dicionários) e sua representação no código.
* **Atualização de Nota**: [[javascript/00-Guia de Estudos\|Guia de estudos de C#]]
  * Atualização da nota para incluir Coleções em Csharp e ajustar a ordenação de roteiro de estudos sugerido.

* **Melhoria no Layout de Código do Web App**:
  * Implementadas quebras de linha automáticas (`pre-wrap`) nos blocos de código (`pre`) para evitar barras de rolagem horizontais no mobile e desktop.
  * Criada numeração de linhas dinâmica e flexível integrada nos blocos de código de artigos do leitor.

* **Criação de Nota**: [[javascript/00-Guia de Estudos\|Guia de estudos de C#]]
  * Criação do mapa e roteiro de aprendizagem sequencial sugerido para C#, interligando todos os artigos do vault.

* **Criação de Notas de C#**:
  * [[csharp/02-O método Main\|O método Main]]: Explicação detalhada sobre a estrutura `public static void Main(string[] args)`.
  * [[javascript/01-fundamentos/09-Estruturas de repetição (for e while)\|Estruturas de repetição (for e while)]]: Explicação detalhada sobre loops `for`, `while` e `do while`.
  * [[csharp/13-Métodos de arrays\|Métodos de arrays]]: Dicionário exaustivo de funções para arrays.
* **Atualização de Nota**: [[csharp/12-Arrays em Csharp\|Arrays em Csharp]]
  * Adicionada seção detalhada sobre o erro `IndexOutOfRangeException` (estouro de índice), explicando causas comuns e como evitar.

* **Correção de Links de Artigos**:
  * Ajuste na codificação de caracteres de parênteses (`(` para `%28` e `)` para `%29`) nas URIs de markdown para corrigir links quebrados para o arquivo `12-Métodos (funções).md`.
  * Adicionado rodapé de artigos relacionados ao arquivo [[csharp/12-Arrays em Csharp\|Arrays em Csharp]].

* **Atualização de Nota**: [[csharp/12-Arrays em Csharp\|Arrays em Csharp]]
  * Adicionadas explicações intuitivas sob o Método Feynman (tabuleiros vs gaveteiros irregulares) e as finalidades práticas para Arrays multidimensionais e Jagged Arrays.

* **Comportamento de Busca no Web App**:
  * Modificada a função de busca no `script.js` para ocultar automaticamente o contêiner de pastas (`#pastas-container`) ao disparar pesquisas, evitando poluição visual.

* **Ajustes de Responsividade no Web App**:
  * Reduzido o tamanho da fonte do título `h1` ("pesquisa de programação") e do input de busca no mobile.
  * Mantido o alinhamento horizontal lado a lado (estilo desktop) para o input e botão de busca em telas móveis.

* **Atualização de Nota**: [[csharp/01-Introdução ao Csharp|Introdução ao Csharp]]
  * Adicionada a contextualização histórica de sua origem, áreas de uso prático (como Unity para jogos, mobile e corporativo) e a relevância de mercado da linguagem.

* **Padronização de Títulos e Cabeçalhos (Sentence Case)**:
  * Criação da regra [[.agents/rules/title_capitalization|title_capitalization.md]] exigindo que títulos e cabeçalhos em português mantenham apenas a primeira letra em maiúsculo (Sentence Case).
  * Renomeação dos 5 arquivos do C# para seguir a grafia Sentence Case.
  * Revisão e atualização de todos os cabeçalhos internos e links cruzados em todas as 7 notas na pasta `csharp/`.
  * Sincronização da lista de caminhos de fallback no `script.js`.

* **Atualização de Notas**: Todas as notas da pasta `csharp/`
  * Adicionada a hashtag `#csharp` logo abaixo do título de cada um dos 7 artigos de C# para categorização nativa no Obsidian.

* **Criação de Pasta e Notas de C#**:
  * Criação da pasta `csharp/` contendo os primeiros artigos explicativos.
  * [[csharp/01-Introdução ao Csharp\|Introdução ao Csharp]]: Guia conceitual sobre a linguagem.
  * [[csharp/12-Arrays em Csharp\|Arrays em Csharp]]: Explicação sobre vetores.
  * [[csharp/05-Segurança de tipos\|Segurança de Tipos]]: Detalhamento didático sobre tipagem estática e forte.
  * [[csharp/04-Variáveis, operadores e tipos de dados\|Variáveis, Operadores e Tipos de Dados]]: Dicionário das caixas de tipos de dados.
  * [[csharp/07-Estruturas condicionais e de repetição\|Estruturas Condicionais e de Repetição]]: Tomada de decisões e loops.
  * [[csharp/18-Métodos (funções)\|Métodos (Funções)]]: Automatização de blocos de comando.
  * [[javascript/06-arquitetura-e-avancado/01-Programação orientada a objetos\|Programação Orientada a Objetos]]: Moldes e fôrmas (classes), objetos e construtores.
  * Todas as notas de C# foram escritas sob o rigor do **Método Feynman** e interconectadas com links bidirecionais/cruzados.

* **Melhorias e Ajustes no Web App**:
  * Adicionado suporte a **Accordions** para a listagem categorizada por pastas na tela inicial.
  * Criada a barra de navegação flutuante **`sticky-nav`** contendo busca sincronizada, logo clicável e link direto para focar nas pastas.
  * Otimizado todo o CSS para tornar o layout **mobile friendly** (responsivo para celulares/tablets).
  * Ocultação dos arquivos de sistema (`me.md`, `log.md` e pasta `.gemini/`) na listagem de visualização do index.
  * Adicionadas tags de linguagem/pasta estilizadas nos cards de resultados de busca.

## 2026-07-25

* **Criação de Nota**: [[javascript/03-manipulacao/04-O método forEach em detalhes\|O método forEach em detalhes]]
  * Guia 100% exaustivo sobre o método `forEach()` no JavaScript.
  * Análise exaustiva dos 4 parâmetros: `currentValue` (`item`), `index`, `array` (array original) e `thisArg`.
  * Regras de ouro (retorno `undefined`, proibição de `break`/`continue`, comportamento com slots vazios).
  * Tabela comparativa (`forEach` vs `map` vs `for` tradicional).
  * Mini-projeto real de Central de Notificações de Pedidos no DOM.
  * Validação pós-processada: 734 wikilinks 100% válidos.

* **Atualização de Nota**: [[javascript/01-fundamentos/09-Estruturas de repetição (for e while)\|Estruturas de repetição (for e while)]]
  * Adicionados exemplos explícitos de uso do **`break`** e do **`continue`** diretamente dentro do loop `for` tradicional varrendo um array.
  * Validação pós-processada: 729 wikilinks 100% válidos.

* **Atualização de Nota**: [[javascript/01-fundamentos/09-Estruturas de repetição (for e while)\|Estruturas de repetição (for e while)]]
  * Adicionadas 3 estratégias avançadas de iteração com arrays:
    1. **Interrupção antecipada com `break`** (para parar o loop assim que encontrar o item desejado, como o `'PS4'`, otimizando performance).
    2. **Iteração funcional com `forEach`** (passando automaticamente item, índice e array).
    3. **Contagem regressiva decremental** (`i = array.length - 1; i >= 0; i--`).
  * Pós-processamento automatizado aplicado com sucesso (728 wikilinks válidos).

* **Atualização de Nota**: [[javascript/01-fundamentos/09-Estruturas de repetição (for e while)\|Estruturas de repetição (for e while)]]
  * Adicionado o padrão clássico de iteração em arrays (`videoGames[item]`) usando `.length`.
  * Adicionada seção de alerta `> [!CAUTION]` sobre o **Perigo do Loop Infinito** se o `item++` ou `i = i + 5` for omitido.
  * Validação pós-processada: 727 wikilinks 100% válidos.

* **Criação de Nota**: [[javascript/01-fundamentos/09-Estruturas de repetição (for e while)\|Estruturas de repetição (for e while)]]
  * Guia completo e exaustivo sobre estruturas de repetição no JavaScript (`for`, `while`, `do...while`, `for...of`, `for...in`, `break` e `continue`).
  * Incluído um **Mini-projeto Prático Real** de Gerador de Galeria e Processador de Estoque de Loja Virtual.
  * Pós-processamento automatizado aplicado com sucesso (Sentence Case estrito e Linter com 726 wikilinks válidos).

* **Protocolo de Pós-Processamento Automatizado de Títulos**:
  * Atualizado o script `fix_title_capitalization.py` para tratar automaticamente palavras após dois-pontos (`:`) nos subcabeçalhos (`## 1. Tailwind CSS: estilização por classes utilitárias`).
  * Aplicada a regra estrita em todas as notas e salvos os testes com **721 wikilinks 100% validados**.

* **Expansão Exaustiva de Nota**: [[javascript/03-manipulacao/02-Arrays e métodos de array\|Arrays e métodos de array]]
  * Atualizada a nota para conter a lista exaustiva de mais de **40 métodos e propriedades de Array** (estáticos, mutáveis, busca, iteração, transformação e novidades imutáveis do ES2023 como `toSorted`, `toReversed`, `toSpliced` e `with`).
  * Preservado o **Mini-projeto Prático Real** de Motor de Carrinho de E-commerce.

* **Criação de Nota**: [[javascript/03-manipulacao/02-Arrays e métodos de array\|Arrays e métodos de array]]
  * Guia exaustivo de Arrays e seus métodos divididos por categorias (Mutação, Busca, Iteração/Transformação e Ordenação/Fatiamento).
  * Incluído um **Mini-projeto Prático Real** de Motor de Carrinho de Compras de E-commerce utilizando `filter`, `map`, `find`, `reduce` e `join`.
  * Aplicação do Método Feynman (analogia da Prateleira de Estoque Numerada).

* **Enriquecimento do [[me|me]]**:
  * Adicionadas seções de **Preferências Técnicas e Estilo de Código** (JS ES6+, React funcional, Tailwind/CSS limpo).
  * Expandido o **Dicionário de Analogias** (Design Tokens, Regras de Negócio/MVP, Jornada do Usuário -> Lógica de Código).

* **Atualização do [[me|me]]**:
  * Detalhada a formação acadêmica completa no perfil: **Comunicação (Publicidade)**, **Design de Produto**, **MBA em Gestão de Negócios** e **Análise e Desenvolvimento de Sistemas (ADS)**.
  * Refinado o superpoder para unir pensamento visual, experiência do usuário (UX/UI), código e visão estratégica de negócios.

* **Interconexão Bidirecional**: [[javascript/04-dom-e-browser/01-DOM\|DOM]] <-> [[javascript/04-dom-e-browser/02-Métodos do objeto document\|Métodos do objeto document]]
  * Adicionados links cruzados bidirecionais entre a nota conceitual do DOM (árvore de camadas) e a nota exaustiva dos métodos de `document`.
  * Validação pelo linter: 721 wikilinks 100% válidos.

* **Atualização do [[me|me]]**:
  * Adicionado aviso no topo destacando o arquivo `me.md` como de **leitura obrigatória para todos os agentes de IA**.
  * Incorporadas as 7 diretrizes oficiais do vault diretamente no corpo do `me.md`.

* **Padronização Estrita de Cabeçalhos Internos (Sentence Case)**:
  * Correção automatizada dos cabeçalhos internos (`#`, `##`, `###`) em 30 arquivos do vault (incluindo `Métodos do objeto document.md`).
  * Todos os títulos secundários foram ajustados para manter apenas a primeira palavra com a inicial maiúscula (ex: `## 1. Métodos de seleção e busca de elementos`), preservando nomes próprios e tecnologias.

* **Criação de Nota**: [[javascript/04-dom-e-browser/02-Métodos do objeto document\|Métodos do objeto document]]
  * Dicionário exaustivo de todos os métodos e propriedades do objeto `document` (seleção, criação, eventos, geometria, escrita e propriedades globais).
  * Aplicação do Método Feynman (analogia do Gerente Geral de Edifício).

* **Reorganização Estrutural do Vault**:
  * Eliminação da pasta genérica `conceitos/` e redistribuição de 52 arquivos por pilares funcionais.

* **Criação de Nota**: [[react/01-fundamentos/Pacotes e ecossistema do React\|Pacotes e ecossistema do React]]
 * Guia de bibliotecas e pacotes terceiros para o React (Lucide, React Router, React Hook Form, Framer Motion, Zustand, etc.).
* **2026-08-29 — Hierarquia tipográfica editorial:** h1, h2, h3 e os demais títulos internos receberam escala progressiva, espaçamento consistente e marcadores rosa nos três níveis principais.
* **2026-08-29 — Entrada editorial:** catálogo de áreas alinhado ao ritmo visual do índice do vault PUC, mantendo a cor de destaque rosa e as descrições de cada área.
* **2026-08-29 — Cópia de código:** blocos de código passaram a oferecer botão de cópia com confirmação visual e alternativa compatível para navegadores sem Clipboard API.
* **2026-08-29 — Largura editorial:** a página inicial passou a usar o mesmo contêiner máximo e respiros laterais do vault PUC.
* **2026-08-29 — Navegação sequencial:** anterior e próximo entre artigos foram alinhados ao padrão editorial do Guia do Portal, com retorno separado.
* **2026-08-29 — Busca global:** estrutura da busca na navbar foi alinhada ao padrão acessível usado no vault PUC.
* **2026-08-29 — Navegação sequencial:** corrigida a largura da grade de anterior e próximo para ocupar todo o artigo.
* **2026-08-29 — Retorno à página inicial:** o breadcrumb “início” passou a restaurar a grade de áreas após buscas, e o título principal recebeu o rosa de destaque do vault.
