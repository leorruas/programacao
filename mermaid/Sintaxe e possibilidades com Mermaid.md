# Sintaxe e possibilidades com Mermaid

O Mermaid é uma ferramenta de **Diagrams as Code** baseada em JavaScript que compila texto simples e estruturado em gráficos vetoriais (SVG). Ele permite documentar fluxos de usuário, arquiteturas de sistemas, ciclos de vida de telas, bancos de dados e cronogramas diretamente no código ou nas notas do Obsidian.

Este guia reúne de forma exaustiva as possibilidades, tipos de diagramas, geometrias, conectores, comandos avançados e boas práticas de modelagem.

---

## 1. Anatomia universal de um bloco Mermaid

Todo bloco Mermaid inicia com a cerca tripla de código indicando a linguagem `mermaid`, seguida pela declaração do tipo de gráfico na primeira linha:

````markdown
```mermaid
tipo-do-diagrama [direção/parâmetros]
    %% Comentários começam com dois sinais de porcentagem
    id_origem["Rótulo visível"] --> id_destino["Rótulo visível"]
```
````

---

## 2. Fluxogramas (`flowchart`)

O `flowchart` é o diagrama mais versátil da biblioteca, ideal para fluxos condicionais (`if/else`), jornadas de navegação e rotinas de backend.

### Orientações de layout
* `TD` ou `TB`: Top to Bottom (vertical, de cima para baixo). Layout prioritário para mobile.
* `BT`: Bottom to Top (vertical, de baixo para cima).
* `LR`: Left to Right (horizontal, da esquerda para a direita).
* `RL`: Right to Left (horizontal, da direita para a esquerda).

### Formatos geométricos de nós

| Forma visual | Sintaxe no código | Aplicação prática |
| :--- | :--- | :--- |
| Retângulo padrão | `id["Texto"]` | Processamento ou etapa genérica |
| Cantos arredondados | `id("Texto")` | Ação de interface ou clique |
| Pílula / Estádio | `id(["Texto"])` | Início ou fim de fluxo |
| Sub-rotina | `id[["Texto"]]` | Função externa, módulo ou microsserviço |
| Cilindro | `id[("Texto")]` | Banco de dados ou armazenamento local |
| Círculo | `id(("Texto"))` | Conector ou ponto de junção |
| Losango (Decisão) | `id{"Texto"}` | Condicionais e bifurcações lógicas |
| Hexágono | `id{{"Texto"}}` | Preparação ou inicialização |
| Paralelogramo | `id[/"Texto"/]` | Entrada ou saída de dados (I/O) |
| Paralelogramo invertido | `id[\"Texto\"\]` | Leitura de sensores ou evento externo |
| Trapézio | `id[/"Texto"\]` | Operação manual |
| Trapézio invertido | `id[\"Texto"/]` | Exibição de tela ou relatório |

```mermaid
flowchart TD
    Inicio(["Início do fluxo"]) --> Input[/"Digitar email e senha"/]
    Input --> Decisao{"Dados válidos?"}
    Decisao -->|Sim| Processar[["Validar token JWT"]]
    Decisao -->|Não| Erro["Exibir mensagem de erro"]
    Processar --> Banco[("Salvar sessão no Redis")]
    Banco --> Fim(["Acesso liberado"])
```

### Tipos de conexões e setas

| Conexão | Sintaxe | Efeito visual |
| :--- | :--- | :--- |
| Seta sólida | `A --> B` | Fluxo direcionado comum |
| Linha contínua | `A --- B` | Conexão direta sem sentido |
| Linha pontilhada | `A -.-> B` | Relação opcional, indireta ou evento |
| Linha grossa | `A ==> B` | Caminho crítico ou fluxo principal |
| Seta com texto | `A -->\|Rótulo\| B` | Fluxo anotado com condição |

```mermaid
flowchart TD
    Origem["Nó central"]
    Origem --> Solida["Seta sólida padrão"]
    Origem --- SemPonta["Linha contínua<br>sem ponta"]
    Origem -.-> Pontilhada["Linha pontilhada<br>com seta"]
    Origem ==> Grossa["Linha grossa<br>destacada"]
    Origem -->|Com condição| ComTexto["Seta com<br>rótulo"]
```

### Sub-grafos (`subgraph`) e direções internas
Permitem delimitar fronteiras de arquitetura (ex: Frontend, Backend, Banco de Dados):

```mermaid
flowchart TB
    subgraph Client["Camada do cliente (Frontend)"]
        UI["Tela de produtos"]
        Carrinho["Carrinho de compras"]
    end

    subgraph Server["Camada de aplicação (Backend)"]
        direction TB
        API["Gateway REST"]
        Auth["Serviço de autenticação"]
    end

    subgraph Storage["Infraestrutura de dados"]
        DB[("PostgreSQL")]
        Cache[("Redis")]
    end

    UI --> Carrinho
    Carrinho --> API
    API --> Auth
    API --> DB
    Auth --> Cache
```

### Estilização e classes CSS no Mermaid
Você pode customizar nós com estilos diretos ou classes reutilizáveis:

```mermaid
flowchart TD
    classDef destaque fill:#ffb6c1,stroke:#ffffff,stroke-width:2px,color:#000000;
    classDef perigo fill:#ff4d4f,stroke:#ffffff,stroke-width:2px,color:#ffffff;

    Normal["Nó padrão"] --> Especial["Nó com destaque"]:::destaque
    Especial --> Alerta["Nó de erro crítico"]:::perigo
```

---

## 3. Diagramas de sequência (`sequenceDiagram`)

O diagrama de sequência é o padrão de ouro para documentar processos assíncronos, requisições HTTP, comunicação entre microsserviços e ciclos de eventos no tempo.

### Elementos fundamentais
* **`actor`**: Renderiza a figura humana (boneco de palito / *stick figure*) para representar pessoas reais (usuários, clientes, operadores).
* **`participant`**: Renderiza caixas retangulares representando módulos de código, servidores, APIs ou bancos de dados.
* **`autonumber`**: Numera automaticamente cada passo da troca de mensagens em círculos sequenciais.
* **`as`**: Permite definir um apelido (*alias*) curto no código e um nome visível completo na tela.

### Tipos de flechas e mensagens

| Sintaxe | Estilo | Significado |
| :--- | :--- | :--- |
| `->>` | Sólida com ponta | Mensagem síncrona / Chamada de função |
| `-->>` | Pontilhada com ponta | Resposta ou retorno de dados |
| `-x` | Sólida com cruz | Mensagem síncrona com falha/bloqueio |
| `--x` | Pontilhada com cruz | Resposta com falha/rejeição |
| `-)` | Sólida aberta | Mensagem assíncrona / Disparo de evento |
| `--))` | Pontilhada aberta | Resposta de evento assíncrono |

### Estruturas de controle em sequências
* **Ativações (`activate` / `deactivate` ou `+` / `-`)**: Mostra a barra vertical de processamento do componente.
* **Agrupamento visual (`box`)**: Cria retângulos coloridos ao fundo para agrupar participantes por domínio.
* **Notas (`Note`)**: `Note left of`, `Note right of` ou `Note over A,B`.
* **Condicionais (`alt / else`)**: Caminhos alternativos (sucesso vs erro).
* **Opcional (`opt`)**: Passo que só ocorre sob certas condições.
* **Repetição (`loop`)**: Iterações e tentativas repetidas (*polling/retry*).
* **Paralelo (`par / and`)**: Duas tarefas rodando simultaneamente.
* **Região crítica (`critical / option`)**: Transação atômica que exige tratamento.
* **Quebra de fluxo (`break`)**: Interrupção imediata por erro fatal ou cancelamento.

### Exemplo completo de sequência

```mermaid
sequenceDiagram
    autonumber
    
    box rgb(30, 30, 30) Camada do usuário
        actor User as Usuário
    end

    box rgb(45, 45, 45) Infraestrutura de serviços
        participant App as Frontend (React)
        participant API as Gateway de API
        participant DB as Banco de Dados
    end

    User->>+App: Clica em "Efetuar pagamento"
    App->>+API: POST /checkout com dados do pedido
    
    Note over API,DB: Validação de estoque e saldo

    alt Saldo suficiente
        API->>+DB: Grava transação aprovada
        DB-->>-API: ID do pedido gerado
        API-->>App: HTTP 200 (Sucesso)
        App-->>User: Exibe tela de confirmação
    else Saldo insuficiente
        API-->>-App: HTTP 400 (Recusado)
        App-->>-User: Exibe alerta de cartão recusado
    end

    opt Usuário deseja comprovante por email
        App-)API: Dispara evento assíncrono de envio
    end
```

---

## 4. Diagramas de classes (`classDiagram`)

Usado em arquitetura orientada a objetos para documentar propriedades, métodos, encapsulamento e relações entre classes.

### Visibilidade e membros
* `+` : Público (`public`)
* `-` : Privado (`private`)
* `#` : Protegido (`protected`)
* `~` : Pacote / Interno (`package/internal`)
* `{abstract}` : Método ou classe abstrata
* `{static}` : Membro estático da classe

### Relacionamentos entre classes

| Sintaxe | Relação | Descrição |
| :--- | :--- | :--- |
| `<|--` | Herança | Subclasse herda de Superclasse |
| `..|>` | Realização / Interface | Classe implementa um contrato de interface |
| `*--` | Composição forte | A parte não existe sem o todo (ciclo de vida acoplado) |
| `o--` | Agregação | A parte pode existir independentemente do todo |
| `-->` | Associação | Uma classe conhece e utiliza outra |
| `..>` | Dependência | Uma classe usa outra temporariamente em um método |

### Exemplo completo de modelagem de classes

```mermaid
classDiagram
    class Autenticavel {
        <<interface>>
        +login(string email, string senha) Boolean
        +logout() Void
    }

    class Usuario {
        <<abstract>>
        -int id
        #string nome
        #string email
        +getId() int
        +getNome() string
        +atualizarPerfil() Boolean*
    }

    class Cliente {
        -string enderecoEntrega
        -List~String~ cartoesSalvos
        +realizarPedido() Pedido
    }

    class Pedido {
        -int numeroPedido
        -float valorTotal
        +calcularFrete() float
    }

    Usuario <|-- Cliente : Herda de
    Autenticavel <|.. Usuario : Implementa
    Cliente "1" *-- "many" Pedido : Contém
```

---

## 5. Diagramas de máquina de estados (`stateDiagram-v2`)

Mapeia os estados possíveis de um componente de interface, pedido ou ciclo de vida de uma entidade, além dos gatilhos que causam as transições.

### Elementos
* `[*]`: Ponto inicial e ponto terminal.
* `-->`: Transição entre estados com rótulo `: evento / ação`.
* `state NomeGrupo { ... }`: Estados compostos e aninhados.
* `--`: Divisor de concorrência (estados paralelos acontecendo ao mesmo tempo).
* `<<choice>>`: Ponto de decisão condicional.
* `<<fork>>` e `<<join>>`: Bifurcação e junção de fluxos.

```mermaid
stateDiagram-v2
    [*] --> Rascunho : Criar novo pedido

    state Processamento {
        [*] --> ValidandoEstoque
        ValidandoEstoque --> AguardandoPagamento : Estoque reservado
        AguardandoPagamento --> PagamentoAprovado : Pix confirmado
        AguardandoPagamento --> PagamentoRecusado : Tempo expirado
    }

    Rascunho --> Processamento : Finalizar carrinho
    PagamentoAprovado --> Enviado : Despachar mercadoria
    PagamentoRecusado --> Cancelado : Encerrar pedido
    Enviado --> Entregue : Confirmação de recebimento
    Entregue --> [*]
    Cancelado --> [*]
```

---

## 6. Diagramas de entidade e relacionamento (`erDiagram`)

Mapeia a modelagem de bancos de dados relacionais (tabelas, campos, chaves primárias, estrangeiras e cardinalidades).

### Sintaxe de cardinalidades

| Conector | Significado |
| :--- | :--- |
| `||--||` | Exatamente um para exatamente um |
| `||--o{` | Um para zero ou muitos |
| `||--|{` | Um para um ou muitos |
| `|o--o|` | Zero ou um para zero ou um |
| `}o--o{` | Zero ou muitos para zero ou muitos |

```mermaid
erDiagram
    USUARIO ||--o{ PEDIDO : realiza
    PEDIDO ||--|{ ITEM_PEDIDO : contem
    PRODUTO ||--o{ ITEM_PEDIDO : pertence_a

    USUARIO {
        int id PK
        string nome
        string email UK
        string senha_hash
    }

    PEDIDO {
        int id PK
        int usuario_id FK
        datetime criado_em
        decimal total
    }

    PRODUTO {
        int id PK
        string titulo
        decimal preco
        int estoque
    }

    ITEM_PEDIDO {
        int id PK
        int pedido_id FK
        int produto_id FK
        int quantidade
        decimal preco_unitario
    }
```

---

## 7. Gráficos de Gantt (`gantt`)

Usado para planejar entregas, cronogramas de sprints, lançamentos de MVPs e acompanhamento de dependências temporais.

```mermaid
gantt
    title Cronograma de entrega do projeto
    dateFormat YYYY-MM-DD
    axisFormat %b/%Y

    section Design
    Pesquisa e protótipo       :done,    des1, 2026-01-01, 2026-02-15
    Design System              :active,  des2, 2026-02-15, 2026-04-01

    section Engenharia
    Backend e APIs             :done,    dev1, 2026-02-01, 2026-04-15
    Frontend Web               :active,  dev2, 2026-04-01, 2026-06-30

    section Lançamento
    Deploy em produção         :milestone, m1, 2026-06-30, 0d
```

---

## 8. Diagramas de versionamento (`gitGraph`)

Excelente para explicar estratégias de branches (*Git Flow*, *Trunk-based*), pull requests, merges e tags de versão.

```mermaid
gitGraph
    commit id: "Init repo"
    commit id: "Config Tailwind"
    branch develop
    checkout develop
    commit id: "Setup rotas"
    branch feature/login
    checkout feature/login
    commit id: "Cria tela de login"
    commit id: "Valida campos"
    checkout develop
    merge feature/login
    checkout main
    merge develop tag: "v1.0.0"
```

---

## 9. Mapas mentais (`mindmap`)

Ideal para arquitetura de informação, brainstorms, taxonomias de design e organização hierárquica de estudos.

```mermaid
mindmap
  root((Desenvolvimento Web))
    Frontend
      HTML
      CSS
      JavaScript
    Backend
      APIs REST
      Banco de Dados
    DevOps
      Git
      Deploy
```

---

## 10. Matrizes e gráficos de quadrantes (`quadrantChart`)

Perfeito para matrizes 2x2 de tomada de decisão em design e produto (ex: Impacto vs Esforço, Urgente vs Importante).

```mermaid
quadrantChart
    title Priorização de funcionalidades
    x-axis "Baixo esforço" --> "Alto esforço"
    y-axis "Baixo impacto" --> "Alto impacto"
    quadrant-1 "Estratégico"
    quadrant-2 "Prioridade máxima"
    quadrant-3 "Descartar"
    quadrant-4 "Secundário"
    "Login Google": [0.25, 0.85]
    "Refatorar CSS": [0.80, 0.30]
    "Busca": [0.70, 0.90]
    "Rodapé": [0.15, 0.20]
```

---

## 11. Linha do tempo (`timeline`) e gráficos de pizza (`pie`)

Para documentar marcos históricos, evolução de versões e métricas proporcionais de forma rápida.

### Linha do tempo (`timeline`)
```mermaid
timeline
    title Evolução da stack do projeto
    section 2024
        Q1 : Criação do repositório
        Q3 : Migração para TypeScript
    section 2025
        Q2 : Adoção do Tailwind CSS
        Q4 : Lançamento do Web App v1
```

### Gráfico de pizza (`pie`)
```mermaid
pie title Distribuição de tecnologias do Vault
    "JavaScript" : 45
    "C#" : 25
    "CSS" : 15
    "Mermaid" : 10
    "Outros" : 5
```

---

## Boas práticas de escrita para evitar erros

1. **Aspas duplas obrigatórias em rótulos**: Se o texto contiver parênteses `()`, colchetes `[]`, barras `/` ou dois-pontos `:`, envolva todo o rótulo em aspas duplas (ex: `A["Texto (Detalhe)"]`).
2. **Evite numeração sequencial com ponto no início**: Não inicie textos com `1. Passo`, pois parsers Markdown podem confundir com listas ordenadas. Prefira `1 - Passo`.
3. **Identificadores curtos e sem espaços**: Use IDs limpos (`UserNode`, `CheckoutBtn`, `ApiGateway`) e coloque o texto explicativo dentro dos delimitadores da forma.
4. **Pipes escapados em tabelas Markdown**: Se for citar sintaxes que contenham pipes dentro de tabelas Markdown, utilize `\|` (ex: `A -->\|Texto\| B`).

---

## Guia de decisão: qual diagrama escolher?

| O que você quer explicar? | Diagrama recomendado | Palavra-chave inicial |
| :--- | :--- | :--- |
| Tomada de decisão, algoritmo ou fluxo de telas | Fluxograma | `flowchart TD` |
| Troca de mensagens entre usuário, app e APIs no tempo | Diagrama de sequência | `sequenceDiagram` |
| Estrutura de classes, herança e interfaces | Diagrama de classes | `classDiagram` |
| Estados de um botão, tela ou pedido (`idle`, `loading`, `error`) | Diagrama de estados | `stateDiagram-v2` |
| Modelagem de tabelas e chaves de banco de dados | Entidade e relacionamento | `erDiagram` |
| Cronograma, sprints e dependências temporais | Gráfico de Gantt | `gantt` |
| Fluxo de branches e merges do Git | Grafo Git | `gitGraph` |
| Hierarquia de conceitos, tópicos e brainstorm | Mapa mental | `mindmap` |
| Matriz de priorização 2x2 (Impacto x Esforço) | Gráfico de quadrantes | `quadrantChart` |
| Marcos e lançamentos cronológicos | Linha do tempo | `timeline` |
| Proporções e métricas percentuais | Gráfico de pizza | `pie` |

---

## Resumo para memorizar

* O Mermaid permite criar diagramas completos usando apenas texto estruturado, garantindo versionamento no Git e legibilidade perfeita.
* No `flowchart`, os delimitadores definem a geometria (`[]` retângulo, `()` arredondado, `([])` pílula, `{}` losango, `[()]` cilindro).
* No `sequenceDiagram`, a figura humana é criada com a palavra-chave **`actor`** e as caixas com **`participant`**.
* Todas as instruções suportam comentários com `%%` e aceitam estilizações visuais diretas para enriquecer a documentação técnica.

