# Flowcharts e fundamentos de grafos

Antes de escrever qualquer fluxograma (`flowchart`), é fundamental compreender o conceito que sustenta toda essa representação: a **teoria dos grafos**. Não se trata de matemática avançada ou fórmulas complexas, mas de entender a estrutura que organiza nós e relações.

---

## 1. O que é um grafo no contexto de modelagem

Um grafo é uma coleção de **vértices (nós)** conectados por **arestas (ligações)**.

### Código-fonte do diagrama
````markdown
```mermaid
flowchart LR
    classDef core fill:#ffb6c1,stroke:#ffffff,stroke-width:2px,color:#000000;
    classDef nodeClass fill:#2d2d2d,stroke:#ffffff,stroke-width:1px,color:#ffffff;

    V1["Vértice A<br><i>(Nó)</i>"]:::nodeClass -->|Aresta Direcionada| V2["Vértice B<br><i>(Nó)</i>"]:::core
```
````

### Visualização renderizada
```mermaid
flowchart LR
    classDef core fill:#ffb6c1,stroke:#ffffff,stroke-width:2px,color:#000000;
    classDef nodeClass fill:#2d2d2d,stroke:#ffffff,stroke-width:1px,color:#ffffff;

    V1["Vértice A<br><i>(Nó)</i>"]:::nodeClass -->|Aresta Direcionada| V2["Vértice B<br><i>(Nó)</i>"]:::core
```

* **Vértice / Nó**: Representa uma entidade, tela, função, etapa de processamento ou estado.
* **Aresta / Conexão**: Representa a transição, dependência, chamada de método ou fluxo de dados entre dois nós.
* **Direcionalidade**: As arestas podem ser direcionadas (possuem sentido definido por setas `-->`) ou não direcionadas (ligação simples `---`).

---

## 2. Conceitos essenciais de grafos aplicados a diagramas

### 2.1. Grau de um nó (grau de entrada e de saída)
O grau de um nó indica quantas conexões chegam ou saem dele:
* **Grau de entrada (*In-degree*)**: Quantas arestas chegam ao nó. Um nó com alto grau de entrada costuma ser um ponto de convergência, gargalo ou serviço centralizado.
* **Grau de saída (*Out-degree*)**: Quantas arestas partem do nó. Um nó com alto grau de saída representa uma decisão com múltiplos caminhos (*switch/case*) ou um despachante de eventos (*Event Bus*).

### Código-fonte do diagrama
````markdown
```mermaid
flowchart TD
    classDef core fill:#ffb6c1,stroke:#ffffff,stroke-width:2px,color:#000000;
    
    In1["Entrada 1"] --> Hub["Hub Central<br><i>(Alto In-Degree)</i>"]:::core
    In2["Entrada 2"] --> Hub
    In3["Entrada 3"] --> Hub

    Hub --> Out1["Saída A"]
    Hub --> Out2["Saída B"]
```
````

### Visualização renderizada
```mermaid
flowchart TD
    classDef core fill:#ffb6c1,stroke:#ffffff,stroke-width:2px,color:#000000;
    
    In1["Entrada 1"] --> Hub["Hub Central<br><i>(Alto In-Degree)</i>"]:::core
    In2["Entrada 2"] --> Hub
    In3["Entrada 3"] --> Hub

    Hub --> Out1["Saída A"]
    Hub --> Out2["Saída B"]
```

### 2.2. Caminhos, ciclos e DAG (Grafo Direcionado Acíclico)
* **Caminho**: Sequência contínua de arestas que conecta um nó de origem a um nó de destino.
* **Ciclo**: Quando um caminho permite sair de um nó e retornar a ele mesmo (ex: loops de retry, validações que exigem nova digitação).
* **DAG (*Directed Acyclic Graph*)**: Um grafo direcionado que **não possui ciclos**. É a estrutura ideal para pipelines de build, compilação de código, resolução de dependências e etapas sequenciais de onboarding.

### Código-fonte do diagrama
````markdown
```mermaid
flowchart LR
    classDef warning fill:#ff4d4f,stroke:#ffffff,stroke-width:1px,color:#ffffff;
    classDef core fill:#ffb6c1,stroke:#ffffff,stroke-width:2px,color:#000000;

    subgraph DAG["Grafo Acíclico (DAG) - Fluxo Linear"]
        A1["Compilar"] --> A2["Testar"] --> A3["Deploy"]:::core
    end

    subgraph Ciclico["Grafo Cíclico - Loop de Validação"]
        B1["Formulário"] --> B2{"Dados válidos?"}
        B2 -->|Sim| B3["Salvar"]:::core
        B2 -->|Não| B1:::warning
    end
```
````

### Visualização renderizada
```mermaid
flowchart LR
    classDef warning fill:#ff4d4f,stroke:#ffffff,stroke-width:1px,color:#ffffff;
    classDef core fill:#ffb6c1,stroke:#ffffff,stroke-width:2px,color:#000000;

    subgraph DAG["Grafo Acíclico (DAG) - Fluxo Linear"]
        A1["Compilar"] --> A2["Testar"] --> A3["Deploy"]:::core
    end

    subgraph Ciclico["Grafo Cíclico - Loop de Validação"]
        B1["Formulário"] --> B2{"Dados válidos?"}
        B2 -->|Sim| B3["Salvar"]:::core
        B2 -->|Não| B1:::warning
    end
```

### 2.3. Densidade de arestas e o problema do espaguete
A **densidade** mede a proporção de arestas existentes em relação ao número máximo possível de conexões entre os nós.
* **Baixa densidade**: Nós organizados em árvore ou cadeia simples. Layout limpo e previsível.
* **Alta densidade**: Quase todos os nós conversam com todos os outros. Em Mermaid, alta densidade resulta em linhas se cruzando por cima de nós (*edge crossing*), tornando a visualização confusa.

---

## 3. Como a estrutura do problema dita o diagrama

Ao analisar um requisito antes de diagramar, faça três perguntas:

1. **Existe uma ordem temporal estrita?** Se sim, pense em uma cadeia ou DAG horizontal (`flowchart LR`).
2. **Existe uma hierarquia de subordinação ou composição?** Se sim, pense em uma árvore vertical (`flowchart TD`).
3. **Existem muitas relações cruzadas entre módulos distantes?** Se sim, evite um flowchart monolítico; decomponha em subgrafos ou use outro tipo de diagrama (como sequência ou arquitetura em blocos).

### Código-fonte do diagrama
````markdown
```mermaid
flowchart TD
    classDef core fill:#ffb6c1,stroke:#ffffff,stroke-width:2px,color:#000000;
    
    Analise{"Qual a topologia<br>da informação?"}
    
    Analise -->|Hierárquica| Arvore["Árvore Vertical<br>(flowchart TD)"]
    Analise -->|Processo / Tempo| Pipeline["Pipeline Horizontal<br>(flowchart LR)"]
    Analise -->|Muitas relações cruzadas| Decompor["Decompor em Subgrafos<br>ou Diagrama de Sequência"]:::core
```
````

### Visualização renderizada
```mermaid
flowchart TD
    classDef core fill:#ffb6c1,stroke:#ffffff,stroke-width:2px,color:#000000;
    
    Analise{"Qual a topologia<br>da informação?"}
    
    Analise -->|Hierárquica| Arvore["Árvore Vertical<br>(flowchart TD)"]
    Analise -->|Processo / Tempo| Pipeline["Pipeline Horizontal<br>(flowchart LR)"]
    Analise -->|Muitas relações cruzadas| Decompor["Decompor em Subgrafos<br>ou Diagrama de Sequência"]:::core
```

---

## 4. Resumo para memorizar

* Todo fluxograma é um grafo composto por nós (vértices) e conexões (arestas).
* Nós com alto grau de entrada/saída são pontos críticos de controle e tomada de decisão.
* Grafos acíclicos (DAGs) geram layouts estáveis; grafos com alta densidade de relações cruzadas exigem modularização para não virarem diagramas espaguete.
