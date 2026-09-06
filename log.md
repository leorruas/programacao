# Log de alterações do vault

Este arquivo registra o histórico de criações, modificações, edições e reorganizações estruturais realizadas no vault em **ordem cronológica decrescente (mais recente no topo)**.

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
  * **Causa**: `processarLinksObsidian()` instalava os eventos de clique antes de `processarCalloutsObsidian()`. Como o callout reconstrói o conteúdo via `innerHTML`, os listeners dos links eram descartados.
  * **Correção**: invertida a ordem do pipeline para montar primeiro os callouts e somente depois converter/ativar os WikiLinks.
  * **Efeito**: links como Token, Parâmetro, Gradiente, Inferência e Glossário dentro de blocos `[!NOTE]` passam a manter navegação ativa.
  * **Cache**: cache buster do `script.js` atualizado para `estrutura-v36` no `index.html`.
* **Criação do artigo de fundamentos tensoriais (`llm/Fundamentos — vetores, matrizes, tensores e shapes.md`)**:
  * **Progressão Feynman**: o artigo parte de escalar → vetor → matriz → tensor e só depois introduz `shape`, batch, reshape, transpose, broadcasting e dtype.
  * **Ponte para LLMs**: conecta explicitamente `[tokens, embedding_dim]`, `[batch, tokens, embedding_dim]` e `[batch, heads, tokens, head_dim]`, preparando a leitura de tokenização e multi-head attention.
  * **Q, K e V por shapes**: mostra como acompanhar dimensões transforma a equação `QKᵀ` em uma operação rastreável (`[tokens, head_dim] × [head_dim, tokens] = [tokens, tokens]`).
  * **Código didático**: inclui snippet mínimo e exemplo completo em JavaScript para inspecionar shapes, além de exemplo complementar em PyTorch para `shape`, `dtype` e `device`.
  * **Integração da trilha**: o guia passou a recomendar fundamentos tensoriais antes de `02 Tokenização` e `03 Transformer`; as entradas Vetor, Matriz, Tensor e Dimensão do glossário apontam para o novo artigo.
  * **Sincronização do app**: o novo artigo foi adicionado ao fallback de `js/vault.js`.
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
