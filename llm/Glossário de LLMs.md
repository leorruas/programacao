# Glossário de LLMs

Este glossário funciona como uma camada de apoio para a trilha de LLMs. A ideia não é substituir os artigos: cada entrada dá uma definição curta, uma intuição e, quando necessário, distingue termos que costumam ser confundidos.

> [!TIP] Como usar
> Ao encontrar um termo desconhecido nos artigos, abra a entrada correspondente e volte para a leitura. Na primeira passagem, não é necessário memorizar a definição formal inteira.

---

## Fundamentos matemáticos

### Vetor

Um **vetor** é uma lista ordenada de números. Em LLMs, vetores são usados para representar tokens, posições, conceitos e estados internos do modelo.

Uma analogia com design é pensar em um elemento do Figma descrito por várias propriedades numéricas ao mesmo tempo: posição X, posição Y, largura, altura e opacidade. O conjunto desses valores forma uma descrição numérica do elemento.

**Não confundir com:** um vetor não é necessariamente uma seta visual. A seta é apenas uma forma geométrica de representar um vetor.

Relacionado: [[llm/Fundamentos — vetores, matrizes, tensores e shapes|Vetores, matrizes, tensores e shapes para LLMs]].

### Matriz

Uma **matriz** é uma tabela de números organizada em linhas e colunas. Redes neurais usam matrizes para transformar vetores: recebem uma representação numérica e produzem outra.

Se um vetor é como um conjunto de propriedades de um componente, uma matriz pode ser imaginada como uma regra de transformação que combina essas propriedades para produzir uma nova representação.

Relacionado: [[llm/Fundamentos — vetores, matrizes, tensores e shapes|Vetores, matrizes, tensores e shapes para LLMs]].

### Tensor

Um **tensor** é uma generalização de vetores e matrizes para mais dimensões. Um número isolado pode ser visto como tensor de dimensão zero; um vetor, como tensor de uma dimensão; uma matriz, como tensor de duas dimensões.

Em bibliotecas como PyTorch, praticamente todos os dados que circulam pela rede são tensores.

Relacionado: [[llm/Fundamentos — vetores, matrizes, tensores e shapes|Vetores, matrizes, tensores e shapes para LLMs]].

### Dimensão

Uma **dimensão** é uma posição ou eixo disponível em uma representação vetorial. Um embedding com 768 dimensões possui 768 números usados em conjunto para representar alguma informação.

Essas dimensões geralmente não correspondem de maneira simples a conceitos humanos como “cor”, “formalidade” ou “tristeza”. O significado costuma estar distribuído entre várias dimensões.

Relacionado: [[llm/Fundamentos — vetores, matrizes, tensores e shapes|Vetores, matrizes, tensores e shapes para LLMs]].

### Parâmetro

Um **parâmetro** é um valor numérico ajustável aprendido pelo modelo durante o treinamento.

Quando se diz que um modelo tem bilhões de parâmetros, isso significa que sua rede contém bilhões de valores que foram sendo ajustados para reduzir erros de previsão.

**Não confundir com:** parâmetro de função em programação. A palavra é a mesma, mas aqui estamos falando dos números internos aprendidos pela rede.

### Peso

Um **peso** é um tipo de parâmetro que participa das transformações matemáticas da rede e determina quanto determinadas informações influenciam outras.

Uma forma simples de pensar é como pesos em uma fórmula de priorização: aumentar um peso faz determinada característica exercer mais influência no resultado.

### Função de perda

A **função de perda** (*loss function*) transforma o erro do modelo em um número. Quanto pior a previsão segundo o objetivo do treinamento, maior tende a ser a perda.

Ela funciona como uma métrica que diz ao processo de treinamento “quão ruim foi esta tentativa?”, permitindo calcular em qual direção os parâmetros deveriam mudar.

### Cross-entropy

A **cross-entropy** ou entropia cruzada é uma função de perda muito usada em classificação e treinamento de modelos de linguagem.

No caso de uma LLM, ela penaliza o modelo quando a probabilidade atribuída ao token correto é baixa. O objetivo do treinamento é reduzir essa perda ao longo de muitos exemplos.

### Gradiente

O **gradiente** indica como uma pequena mudança em cada parâmetro afetaria a função de perda.

Uma analogia é estar em uma paisagem montanhosa e querer descer até um vale: o gradiente informa a direção em que o terreno sobe mais rapidamente. Para reduzir o erro, o otimizador tende a caminhar na direção oposta.

### Descida de gradiente

A **descida de gradiente** é a família de métodos que usa gradientes para alterar parâmetros de modo a reduzir a função de perda.

O treinamento repete aproximadamente este ciclo: prever, medir o erro, calcular gradientes e atualizar parâmetros.

### Backpropagation

**Backpropagation** ou retropropagação é o algoritmo usado para calcular como o erro observado na saída se relaciona com os parâmetros das camadas anteriores.

Ele não “ensina” sozinho o modelo; ele calcula os gradientes. Um otimizador usa esses gradientes para efetivamente atualizar os parâmetros.

### Otimizador

Um **otimizador** é o algoritmo que decide como atualizar os parâmetros a partir dos gradientes.

Adam e AdamW são exemplos populares. Eles acrescentam mecanismos para estabilizar e adaptar o tamanho das atualizações durante o treinamento.

### AdamW

**AdamW** é um otimizador muito usado no treinamento de redes neurais. Ele combina estimativas adaptativas dos gradientes com uma forma desacoplada de regularização chamada *weight decay*.

Para a primeira leitura, basta lembrar: gradiente indica a direção; AdamW decide como transformar essa informação em uma atualização concreta dos pesos.

---

## Representação da linguagem

### Token

Um **token** é uma unidade discreta de texto processada pelo modelo. Ele não corresponde necessariamente a uma palavra inteira: uma palavra pode virar um token, vários tokens ou partes compartilhadas com outras palavras.

O modelo não recebe diretamente “frases” como nós as enxergamos. Primeiro, o texto é convertido em uma sequência de IDs de tokens.

Relacionado: [[llm/02-Tokenização, embeddings e representações contextuais|Tokenização, embeddings e representações contextuais]].

### Vocabulário

O **vocabulário** é o conjunto de tokens que o tokenizer sabe representar. Cada token possui um identificador numérico.

Um modelo pode ter dezenas ou centenas de milhares de tokens possíveis, dependendo do tokenizer e das línguas contempladas.

### Tokenização

**Tokenização** é o processo de converter texto em tokens e, normalmente, cada token em um ID numérico.

É a ponte entre texto humano e a entrada discreta usada pelo modelo.

Relacionado: [[llm/02-Tokenização, embeddings e representações contextuais|Tokenização, embeddings e representações contextuais]].

### Embedding

Um **embedding** é uma representação vetorial aprendida. Em vez de tratar uma unidade apenas como um ID arbitrário, o modelo a representa por uma lista de números que pode carregar relações úteis para a tarefa.

**Não confundir com:**
* **Token embedding**: representação inicial de um token dentro do modelo.
* **Representação contextual**: representação que muda à medida que o token atravessa as camadas do Transformer.
* **Sentence embedding**: vetor produzido para representar uma frase ou documento, frequentemente usado em busca semântica e RAG.

Relacionado: [[llm/02-Tokenização, embeddings e representações contextuais|Tokenização, embeddings e representações contextuais]].

### Representação contextual

Uma **representação contextual** é o estado vetorial de um token depois que ele já incorporou informações de outros tokens do contexto.

Por isso, a representação de “banco” em “banco de dados” pode ser diferente da representação de “banco” em “sentei no banco”.

### Espaço latente

**Espaço latente** é uma forma de falar sobre o espaço matemático das representações internas aprendidas pelo modelo.

“Latente” significa que as propriedades relevantes não foram rotuladas manualmente por humanos; surgem como estrutura distribuída nas representações aprendidas.

### Logit

Um **logit** é uma pontuação bruta de preferência produzida pelo modelo para uma possibilidade antes da normalização em probabilidades.

Na saída de uma LLM, normalmente existe um logit para cada token possível do vocabulário. Um logit como `4.2` não significa 4,2% nem 42%, e um valor negativo não representa probabilidade negativa. O que importa é sua relação com os demais logits do mesmo vetor.

O Softmax transforma o conjunto inteiro dessas pontuações em uma distribuição de probabilidades.

Relacionado: [[llm/01-Dinâmica de treino e inferência em LLMs#3.1. O que é um logit|Logits na dinâmica de inferência]].

### Probabilidade

Uma **probabilidade** expressa o grau de preferência do modelo por uma possibilidade dentro de uma distribuição normalizada.

Na geração, probabilidades não significam “probabilidade de a frase ser verdadeira”. Elas representam principalmente a distribuição do próximo token segundo o modelo.

### Distribuição de probabilidades

Uma **distribuição de probabilidades** associa uma probabilidade a cada possibilidade considerada e faz com que a soma total seja 1.

Em uma LLM, cada passo de geração produz uma distribuição sobre os próximos tokens possíveis.

---

## Redes neurais e Transformer

### Rede neural

Uma **rede neural** é uma composição de transformações matemáticas parametrizadas. Durante o treinamento, seus parâmetros são ajustados para produzir saídas que reduzam uma função de perda.

O termo “neural” é histórico e inspirado de forma bastante abstrata em neurônios biológicos; não significa que o sistema replique um cérebro.

### Camada

Uma **camada** é uma etapa de transformação dentro da rede. Um Transformer contém várias camadas empilhadas, e cada uma atualiza as representações que circulam pelo modelo.

### Forward pass

O **forward pass** é a passagem dos dados da entrada até a saída da rede.

Durante inferência, esse é essencialmente o caminho executado para produzir logits. Durante treinamento, depois dele também ocorre o cálculo do erro e a backpropagation.

### Transformer

O **Transformer** é uma arquitetura de rede neural baseada principalmente em mecanismos de atenção e transformações por posição.

Sua grande inovação foi permitir que diferentes posições de uma sequência troquem informação de forma eficiente e paralelizável durante treinamento.

Relacionado: [[llm/03-Arquitetura do Transformer e mecanismo de atenção|Arquitetura do Transformer e mecanismo de atenção]].

### Atenção

**Atenção** (*attention*) é um mecanismo que permite que uma posição calcule quanto deve incorporar informação de outras posições.

A palavra é uma metáfora útil, mas não representa atenção consciente. É uma operação matemática de combinação ponderada de informações.

### Self-attention

**Self-attention** é atenção aplicada entre elementos da própria sequência. Cada token pode consultar outros tokens permitidos pelo padrão de máscara.

### Q, K e V

**Q, K e V** significam *Query*, *Key* e *Value*. São três projeções vetoriais usadas na atenção.

Uma analogia de busca ajuda:
* **Query**: o que esta posição está procurando.
* **Key**: como cada posição se anuncia para ser encontrada.
* **Value**: a informação que será efetivamente incorporada se aquela posição receber atenção.

### Causal mask

A **causal mask** impede que, durante a geração autorregressiva, uma posição veja tokens futuros.

Sem essa restrição, o modelo poderia “colar” durante o treinamento ao usar a própria resposta futura para prever o próximo token.

### Residual stream

O **residual stream** é o fluxo principal de representações que atravessa os blocos do Transformer e recebe contribuições dos mecanismos de atenção e das redes feed-forward.

Uma analogia é uma prancheta compartilhada que vai sendo enriquecida por vários módulos sem apagar completamente o estado anterior.

### Normalização

**Normalização** em redes neurais ajusta a escala das ativações para tornar o treinamento e a computação mais estáveis.

RMSNorm e LayerNorm são mecanismos de normalização usados em diferentes arquiteturas.

### RMSNorm

**RMSNorm** é uma técnica de normalização baseada na raiz quadrática média das ativações. É comum em várias arquiteturas modernas de LLMs.

Na primeira leitura, basta lembrar que ela ajuda a manter o fluxo numérico das representações em uma escala estável.

### RoPE

**RoPE** (*Rotary Positional Embeddings*) é uma técnica para incorporar informação de posição nas relações de atenção.

Como atenção pura não sabe naturalmente qual token veio primeiro ou depois, mecanismos posicionais fornecem essa informação.

### FFN

**FFN** (*Feed-Forward Network*) é a rede aplicada separadamente a cada posição dentro de um bloco Transformer, depois ou ao redor da atenção dependendo da arquitetura.

Enquanto a atenção mistura informações entre posições, a FFN transforma a representação de cada posição.

### SwiGLU

**SwiGLU** é uma família de funções e estruturas de ativação usadas em FFNs de vários modelos modernos.

Não é requisito para entender attention; é um detalhe de arquitetura que passa a importar quando você estuda implementações concretas de Transformers.

### KV cache

O **KV cache** armazena as projeções Key e Value já calculadas para tokens anteriores durante geração.

Sem ele, a cada novo token o modelo precisaria recalcular grande parte das mesmas informações. O cache reduz computação repetida e acelera inferência autoregressiva.

---

## Treinamento e adaptação

### Pré-treinamento

**Pré-treinamento** é a etapa ampla em que o modelo aprende padrões estatísticos a partir de um grande corpus, frequentemente usando previsão do próximo token.

É nesse estágio que grande parte das representações linguísticas e conceituais do modelo é formada.

### Modelo base

Um **modelo base** é um modelo após o pré-treinamento, antes de etapas adicionais destinadas a fazê-lo seguir instruções ou comportar-se como assistente.

Ele é muito bom em continuar padrões de texto, mas isso não implica automaticamente seguir pedidos conversacionais.

### Foundation model

**Foundation model** é um termo amplo para modelos treinados em grande escala que podem servir como base para muitas tarefas posteriores.

No contexto da trilha, o termo costuma aparecer próximo de “modelo base”, mas não são sinônimos perfeitos em todos os textos da literatura.

### Fine-tuning

**Fine-tuning** é continuar o treinamento de um modelo já pré-treinado em dados ou objetivos mais específicos.

Ele pode adaptar comportamento, domínio, estilo ou tarefa sem repetir todo o pré-treinamento do zero.

### SFT

**SFT** (*Supervised Fine-Tuning*) é fine-tuning supervisionado com exemplos de entrada e saída desejada.

Em modelos de instrução, pode ensinar padrões como responder perguntas, seguir formatos e agir como assistente.

### RLHF

**RLHF** (*Reinforcement Learning from Human Feedback*) é uma família de métodos que usa preferências humanas para ajustar o comportamento de modelos.

Historicamente, uma abordagem comum envolve treinar um modelo de recompensa e depois otimizar a política do modelo com aprendizado por reforço.

### RLAIF

**RLAIF** (*Reinforcement Learning from AI Feedback*) substitui ou complementa parte do feedback humano por avaliações produzidas por sistemas de IA.

### DPO

**DPO** (*Direct Preference Optimization*) é um método de otimização de preferências que treina diretamente a partir de pares de respostas preferidas e rejeitadas, sem exigir o mesmo pipeline de RLHF clássico com um loop explícito de reforço.

### Reward model

Um **reward model** ou modelo de recompensa aprende a atribuir uma pontuação a respostas com base em dados de preferência.

Essa pontuação pode ser usada como sinal de otimização em pipelines de alinhamento.

### Alinhamento

**Alinhamento** é um termo amplo para técnicas que tentam aproximar o comportamento do modelo de objetivos, instruções e restrições desejadas.

Não significa que o modelo passe a possuir valores humanos internos; é uma descrição operacional do comportamento observado e do processo de otimização.

---

## Inferência e geração

### Inferência

**Inferência** é o momento em que usamos um modelo já treinado para produzir uma saída.

Durante inferência, os parâmetros normalmente ficam fixos: o modelo calcula representações, logits e tokens, mas não aprende permanentemente com cada conversa.

### Autorregressivo

Um modelo **autorregressivo** gera uma sequência passo a passo, condicionando cada novo token aos tokens anteriores disponíveis.

Em uma LLM causal, o processo é aproximadamente: contexto atual → logits → escolha do próximo token → acrescenta token ao contexto → repete.

### Softmax

**Softmax** transforma o vetor inteiro de logits em uma distribuição de probabilidades: cada valor fica entre 0 e 1 e a soma de todos os candidatos é 1.

Ele não escolhe o próximo token. Sua função é converter scores brutos em uma distribuição comparável; greedy, Top-k, Top-p e amostragem entram depois. A probabilidade de um candidato depende de seu logit em relação aos demais logits do vetor.

Relacionado: [[llm/01-Dinâmica de treino e inferência em LLMs#3.3. Softmax: de scores incomparáveis para uma distribuição|Softmax na dinâmica de inferência]].

### Temperatura

**Temperatura** é um parâmetro aplicado aos logits antes do Softmax para alterar a concentração da distribuição.

Temperaturas menores tornam a distribuição mais concentrada; temperaturas maiores a deixam mais espalhada. O significado exato e os limites disponíveis dependem da implementação do provedor.

### Greedy decoding

**Greedy decoding** escolhe, a cada passo, o token de maior probabilidade disponível.

É simples e previsível, mas “escolher sempre o maior agora” não garante a melhor sequência global.

### Top-k

**Top-k** restringe a amostragem aos (k) tokens mais prováveis naquele passo.

### Top-p

**Top-p** ou *nucleus sampling* seleciona o menor conjunto de tokens cuja probabilidade acumulada atinge um limiar (p), e amostra dentro desse conjunto.

### Amostragem

**Amostragem** é o processo de escolher um token de acordo com uma distribuição probabilística em vez de selecionar obrigatoriamente o maior valor.

### Context window

A **context window** ou janela de contexto é a quantidade máxima de tokens que um modelo consegue considerar em uma execução, segundo sua arquitetura e configuração.

Ela funciona como memória de trabalho temporária, não como memória permanente aprendida nos pesos.

---

## Engenharia de contexto e segurança

### Prompt

Um **prompt** é a entrada fornecida ao modelo para orientar uma geração. Em aplicações reais, pode incluir instruções, mensagens, documentos recuperados, resultados de ferramentas e exemplos.

### Engenharia de contexto

**Engenharia de contexto** é a disciplina de decidir quais informações entram na janela de contexto, em qual ordem, com quais fronteiras e com qual objetivo.

Ela é mais ampla que apenas escrever bem uma instrução.

Relacionado: [[llm/04-Engenharia de contexto e controle de inferência|Engenharia de contexto e controle de inferência]].

### Prompt injection

**Prompt injection** ocorre quando conteúdo não confiável influencia o modelo a seguir instruções que deveriam ser tratadas apenas como dados.

Em sistemas com ferramentas, o risco aumenta porque uma interpretação errada pode causar ações externas.

### Structured output

**Structured output** é uma saída que deve obedecer a uma estrutura definida, como um JSON compatível com um schema.

### JSON Schema

**JSON Schema** é uma linguagem declarativa para descrever a estrutura permitida ou esperada de documentos JSON.

Ela pode definir tipos, propriedades obrigatórias, enums e outras restrições.

### Constrained decoding

**Constrained decoding** é a aplicação de restrições durante a geração para impedir tokens ou sequências incompatíveis com uma gramática ou schema.

Isso é diferente de apenas pedir em texto “responda em JSON”.

### Evals

**Evals** são avaliações sistemáticas usadas para medir se um sistema com LLM cumpre critérios definidos em um conjunto de casos de teste.

Podem avaliar correção, formato, recuperação, segurança, preferência e outros comportamentos.

---

## Sistemas e produção

### API

Uma **API** é uma interface que permite que softwares se comuniquem por contratos definidos.

Em aplicações com LLMs, a API do provedor recebe entradas estruturadas e devolve saídas do modelo ou eventos de streaming.

### Endpoint

Um **endpoint** é um ponto específico de acesso de uma API, normalmente associado a uma URL e a uma operação.

### Tool calling

**Tool calling** é o padrão em que o modelo produz uma solicitação estruturada para que a aplicação execute uma ferramenta.

O modelo normalmente não executa a função diretamente; a aplicação valida a solicitação, chama código ou serviço real e devolve o resultado ao modelo.

Relacionado: [[llm/05-Sistemas de produção com LLMs, tool calling e streaming|Sistemas de produção com LLMs, tool calling e streaming]].

### Agente

Um **agente** baseado em LLM é um sistema que usa o modelo para decidir próximos passos dentro de um loop, frequentemente combinando ferramentas, estado e critérios de parada.

“Agente” descreve a arquitetura do sistema, não uma capacidade mágica adicional do modelo.

### Streaming

**Streaming** é o envio progressivo da resposta em partes, em vez de esperar a geração inteira terminar.

Isso reduz a latência percebida pela interface, embora a aplicação precise reconstruir eventos e estados parciais.

### SSE

**SSE** (*Server-Sent Events*) é um mecanismo web para o servidor enviar eventos ao cliente através de uma conexão HTTP persistente.

É um dos formatos usados para streaming de respostas.

### Delta

Um **delta** é uma atualização parcial recebida durante streaming. Pode conter um trecho de texto ou parte de uma estrutura maior, como argumentos de uma ferramenta.

### Rate limit

**Rate limit** é um limite imposto a quantas requisições, tokens ou operações podem ser processados em determinado período.

Quando excedido, APIs frequentemente retornam erros como HTTP 429.

### Retry

Um **retry** é uma nova tentativa de executar uma operação após uma falha transitória.

Retries precisam de limites e critérios: repetir indiscriminadamente pode piorar congestionamento ou duplicar ações.

### Backoff exponencial

**Backoff exponencial** aumenta progressivamente o intervalo entre retries.

A ideia é dar tempo para um serviço sobrecarregado se recuperar em vez de gerar uma tempestade de novas requisições.

### Jitter

**Jitter** adiciona uma pequena variação aleatória ao tempo de espera dos retries para evitar que muitos clientes voltem a tentar exatamente ao mesmo tempo.

### TTFT

**TTFT** (*Time To First Token*) é o tempo entre enviar uma requisição e receber o primeiro token ou primeiro evento útil da resposta.

É uma métrica importante de latência percebida em interfaces conversacionais.

### Tracing

**Tracing** registra a sequência de operações de uma execução, permitindo visualizar chamadas de modelo, ferramentas, tempos, erros e dependências.

### Prompt caching

**Prompt caching** é o reaproveitamento, pelo provedor ou infraestrutura, de computação associada a partes repetidas do contexto.

Os detalhes, limites e economia variam entre modelos e provedores; não se deve assumir uma porcentagem universal de redução.

---

## Conhecimento externo e RAG

### RAG

**RAG** (*Retrieval-Augmented Generation*) é uma arquitetura em que um sistema recupera informações externas relevantes e as fornece ao modelo como contexto para gerar uma resposta.

Relacionado: [[llm/08-O que é RAG e como funciona|O que é RAG e como funciona]].

### Retrieval

**Retrieval** é a etapa de recuperar itens potencialmente relevantes para uma consulta.

### Chunk

Um **chunk** é um fragmento de documento usado como unidade de indexação ou recuperação.

### Reranking

**Reranking** é uma segunda etapa que reordena candidatos recuperados usando um método de pontuação mais preciso ou mais caro.

### Vector store

Um **vector store** é uma infraestrutura destinada a armazenar embeddings e recuperar vetores semelhantes de forma eficiente.

### Grounding

**Grounding** é o grau em que uma resposta está apoiada em evidência fornecida ou recuperada, em vez de depender apenas do conhecimento paramétrico do modelo.

---

## Resumo para memorizar

* **Token** é a unidade discreta; **embedding** é uma representação vetorial.
* **Parâmetros/pesos** são os valores aprendidos; **gradientes** indicam como alterá-los para reduzir a perda.
* **Transformer** transforma representações; **attention** mistura informação entre posições; **FFN** transforma cada posição.
* **Logits** são pontuações brutas; **Softmax** produz probabilidades; **amostragem** escolhe o próximo token.
* **Context window** é memória de trabalho temporária, não conhecimento permanente.
* **Tool calling** pede uma ação estruturada; a aplicação é responsável por executar e validar essa ação.
* **RAG** recupera conhecimento externo para inseri-lo no contexto.
