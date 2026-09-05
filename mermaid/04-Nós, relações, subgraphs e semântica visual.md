# Nós, relações, subgraphs e semântica visual

No design de interface, você nunca usa a mesma cor e tamanho de tipografia para um botão primário, um alerta de erro e um texto de rodapé. Da mesma forma, na modelagem visual com Mermaid, cada formato geométrico, tipo de conector e estilo carrega um **significado semântico imediato**.

---

## 1. O vocabulário geométrico dos nós

Os delimitadores que você utiliza ao declarar um nó no código determinam sua representação física:

| Geometria | Sintaxe | Significado semântico | Analogia de interface |
| :--- | :--- | :--- | :--- |
| Retângulo padrão | `id["Texto"]` | Processamento ou etapa genérica | Card neutro / Container |
| Cantos arredondados | `id("Texto")` | Ação do usuário ou clique | Botão primário / Ação |
| Estádio / Pílula | `id(["Texto"])` | Início ou fim de um ciclo de fluxo | Tag de status / Pílula |
| Losango (Decisão) | `id{"Texto"}` | Bifurcação lógica (`if/else`, switch) | Modal de confirmação |
| Cilindro | `id[("Texto")]` | Banco de dados ou armazenamento persistente | LocalStorage / Banco |
| Sub-rotina | `id[["Texto"]]` | Função isolada, microsserviço ou API externa | Componente reutilizável |
| Hexágono | `id{{"Texto"}}` | Inicialização ou preparação | Hook de montagem (`useEffect`) |

```mermaid
flowchart TD
    classDef core fill:#ffb6c1,stroke:#ffffff,stroke-width:2px,color:#000000;
    classDef component fill:#2d2d2d,stroke:#ffb6c1,stroke-width:1px,color:#ffffff;
    
    Init(["1. Início do agendamento"]):::core --> Action("2. Usuário escolhe horário"):::component
    Action --> Check{"3. Mentor disponível?"}
    Check -->|Sim| Save[("4. Persistir na base")]
    Check -->|Não| Erro(["5. Fim com erro"])
```

---

## 2. Tipos de conectores e sua semântica

A forma como dois nós são interligados comunica a natureza da dependência:

* `A --> B`: Fluxo síncrono e direto (obrigatório).
* `A -.-> B`: Notificação assíncrona, disparo de evento ou dependência opcional.
* `A ==> B`: Caminho principal / caminho feliz (*happy path*).
* `A -- Rótulo --> B` ou `A -->|Rótulo| B`: Transição anotada com condição ou payload.

---

## 3. Subgrafos (`subgraph`): criando fronteiras de arquitetura

Um `subgraph` funciona exatamente como um **Frame ou Grupo no Figma**: ele cria uma fronteira visual que agrupa elementos com o mesmo domínio de responsabilidade.

```mermaid
flowchart TB
    classDef core fill:#ffb6c1,stroke:#ffffff,stroke-width:2px,color:#000000;
    classDef comp fill:#2d2d2d,stroke:#ffffff,stroke-width:1px,color:#ffffff;

    subgraph Client["Camada do Estudante (Frontend)"]
        UI["Interface Web"]:::comp
        Form["Formulário de Solicitação"]:::comp
    end

    subgraph Server["Camada de Serviços (Backend)"]
        direction TB
        API["Gateway de API"]:::core
        Auth["Serviço de Validação"]:::comp
    end

    subgraph Storage["Camada de Persistência"]
        DB[("PostgreSQL")]:::comp
    end

    Form --> API
    API --> Auth
    API --> DB
```

---

## 4. O sistema semântico global de classes de estilo

Para manter a consistência visual em todo o repositório e na renderização do leitor web, adote a seguinte convenção semântica:

* `:::core`: Conceito central, nó principal ou estado de sucesso.
* `:::component`: Módulo de software, serviço ou componente operacional.
* `:::data`: Entidade de banco de dados, JSON, payload ou estrutura de dados.
* `:::warning`: Exceção, erro, ponto de atenção ou caminho de falha.
* `:::external`: Sistema terceiro, API externa ou fronteira fora do escopo.

```mermaid
flowchart LR
    classDef core fill:#ffb6c1,stroke:#ffffff,stroke-width:2px,color:#000000;
    classDef component fill:#2d2d2d,stroke:#ffb6c1,stroke-width:1px,color:#ffffff;
    classDef warning fill:#ff4d4f,stroke:#ffffff,stroke-width:1px,color:#ffffff;
    classDef external fill:#1e3a8a,stroke:#60a5fa,stroke-width:1px,color:#ffffff;

    App["App Frontend"]:::component --> Hub["Serviço Central"]:::core
    Hub --> SendGrid["API SendGrid"]:::external
    Hub --> Falha["Erro de Conexão"]:::warning
```

---

## 5. Resumo para memorizar

* Geometrias diferentes comunicam funções distintas: pílulas para limites, losangos para decisões e cilindros para persistência.
* Subgrafos definem fronteiras de contexto e camadas arquiteturais.
* O uso consistente de classes semânticas (`:::core`, `:::component`, `:::warning`) acelera a compreensão visual imediata do diagrama.
