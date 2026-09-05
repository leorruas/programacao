# Arquitetura de software com Mermaid

Modelar arquitetura de software significa comunicar a **visão sistêmica**: quais são os blocos construtivos da aplicação (frontend, APIs, mensageria, bancos de dados, microsserviços), como eles se comunicam através da rede e onde estão as fronteiras de segurança e infraestrutura.

---

## 1. O modelo C4 simplificado com Mermaid

O modelo C4 (Contexto, Contêineres, Componentes e Código) é o padrão da indústria para documentar arquiteturas em múltiplos níveis de zoom. Com o Mermaid, usamos `flowchart TB` estruturado com `subgraph` para modelar os dois primeiros níveis:

* **Nível 1 (Contexto do Sistema)**: O sistema como uma caixa preta e os atores/sistemas externos que interagem com ele.
* **Nível 2 (Contêineres de Aplicação)**: As aplicações executáveis reais (Single Page Application React, API Gateway, Workers, Bancos de Dados).

---

## 2. Fronteiras de rede e isolamento com `subgraph`

Subgrafos aninhados permitem desenhar zonas de segurança e camadas lógicas de infraestrutura:

### Código-fonte do diagrama
````markdown
```mermaid
flowchart TB
    classDef core fill:#ffb6c1,stroke:#ffffff,stroke-width:2px,color:#000000;
    classDef component fill:#2d2d2d,stroke:#ffb6c1,stroke-width:1px,color:#ffffff;
    classDef external fill:#1e3a8a,stroke:#60a5fa,stroke-width:1px,color:#ffffff;
    classDef data fill:#1e293b,stroke:#38bdf8,stroke-width:1px,color:#ffffff;

    subgraph Internet["Rede Pública / Clientes"]
        Browser["Navegador Web<br><i>(React SPA)</i>"]:::component
        Mobile["App Mobile<br><i>(React Native)</i>"]:::component
    end

    subgraph Cloud["Infraestrutura em Nuvem (VPC Privada)"]
        Gateway["API Gateway / Proxy Inverso<br><i>(Nginx / Traefik)</i>"]:::core

        subgraph Services["Microsserviços de Aplicação"]
            AuthService["Serviço de Autenticação"]:::component
            MentoriaService["Serviço de Mentorias"]:::component
        end

        subgraph Persistence["Camada de Dados"]
            Postgres[("PostgreSQL Cluster")]:::data
            RedisCache[("Redis Cache")]:::data
        end
    end

    subgraph ThirdParty["Serviços Terceiros"]
        EmailAPI["SendGrid API"]:::external
    end

    Browser -->|HTTPS / WSS| Gateway
    Mobile -->|HTTPS| Gateway
    Gateway --> AuthService
    Gateway --> MentoriaService

    AuthService --> RedisCache
    MentoriaService --> Postgres
    MentoriaService -.->|Disparo de e-mail| EmailAPI
```
````

### Visualização renderizada
```mermaid
flowchart TB
    classDef core fill:#ffb6c1,stroke:#ffffff,stroke-width:2px,color:#000000;
    classDef component fill:#2d2d2d,stroke:#ffb6c1,stroke-width:1px,color:#ffffff;
    classDef external fill:#1e3a8a,stroke:#60a5fa,stroke-width:1px,color:#ffffff;
    classDef data fill:#1e293b,stroke:#38bdf8,stroke-width:1px,color:#ffffff;

    subgraph Internet["Rede Pública / Clientes"]
        Browser["Navegador Web<br><i>(React SPA)</i>"]:::component
        Mobile["App Mobile<br><i>(React Native)</i>"]:::component
    end

    subgraph Cloud["Infraestrutura em Nuvem (VPC Privada)"]
        Gateway["API Gateway / Proxy Inverso<br><i>(Nginx / Traefik)</i>"]:::core

        subgraph Services["Microsserviços de Aplicação"]
            AuthService["Serviço de Autenticação"]:::component
            MentoriaService["Serviço de Mentorias"]:::component
        end

        subgraph Persistence["Camada de Dados"]
            Postgres[("PostgreSQL Cluster")]:::data
            RedisCache[("Redis Cache")]:::data
        end
    end

    subgraph ThirdParty["Serviços Terceiros"]
        EmailAPI["SendGrid API"]:::external
    end

    Browser -->|HTTPS / WSS| Gateway
    Mobile -->|HTTPS| Gateway
    Gateway --> AuthService
    Gateway --> MentoriaService

    AuthService --> RedisCache
    MentoriaService --> Postgres
    MentoriaService -.->|Disparo de e-mail| EmailAPI
```

---

## 3. O sistema unificado: arquitetura completa da plataforma de mentorias

Abaixo, a arquitetura de implantação da aplicação acadêmica de mentorias:

### Código-fonte do diagrama
````markdown
```mermaid
flowchart TD
    classDef core fill:#ffb6c1,stroke:#ffffff,stroke-width:2px,color:#000000;
    classDef comp fill:#2d2d2d,stroke:#ffffff,stroke-width:1px,color:#ffffff;
    classDef storage fill:#1e293b,stroke:#38bdf8,stroke-width:1px,color:#ffffff;
    classDef ext fill:#1e3a8a,stroke:#60a5fa,stroke-width:1px,color:#ffffff;

    subgraph Frontend["Camada de Apresentação"]
        AlunoUI["Portal do Aluno (React)"]:::comp
        MentorUI["Portal do Mentor (React)"]:::comp
    end

    subgraph Backend["Camada de Aplicação"]
        API["API RESTful (Node.js / Express)"]:::core
        CronJob["Worker de Verificação (48h)"]:::comp
    end

    subgraph Dados["Armazenamento e Cache"]
        DB[("PostgreSQL Principal")]:::storage
        Cache[("Redis (Sessões e Lock)")]:::storage
    end

    subgraph Externos["Integrações Externas"]
        Teams["Microsoft Teams API<br><i>(Criação de Salas)</i>"]:::ext
        SMTP["Servidor SMTP Acadêmico"]:::ext
    end

    AlunoUI -->|REST / JSON| API
    MentorUI -->|REST / JSON| API
    
    API --> DB
    API --> Cache
    API -->|Gera reunião| Teams
    API -->|Envia lembrete| SMTP
    
    CronJob --> DB
    CronJob --> SMTP
```
````

### Visualização renderizada
```mermaid
flowchart TD
    classDef core fill:#ffb6c1,stroke:#ffffff,stroke-width:2px,color:#000000;
    classDef comp fill:#2d2d2d,stroke:#ffffff,stroke-width:1px,color:#ffffff;
    classDef storage fill:#1e293b,stroke:#38bdf8,stroke-width:1px,color:#ffffff;
    classDef ext fill:#1e3a8a,stroke:#60a5fa,stroke-width:1px,color:#ffffff;

    subgraph Frontend["Camada de Apresentação"]
        AlunoUI["Portal do Aluno (React)"]:::comp
        MentorUI["Portal do Mentor (React)"]:::comp
    end

    subgraph Backend["Camada de Aplicação"]
        API["API RESTful (Node.js / Express)"]:::core
        CronJob["Worker de Verificação (48h)"]:::comp
    end

    subgraph Dados["Armazenamento e Cache"]
        DB[("PostgreSQL Principal")]:::storage
        Cache[("Redis (Sessões e Lock)")]:::storage
    end

    subgraph Externos["Integrações Externas"]
        Teams["Microsoft Teams API<br><i>(Criação de Salas)</i>"]:::ext
        SMTP["Servidor SMTP Acadêmico"]:::ext
    end

    AlunoUI -->|REST / JSON| API
    MentorUI -->|REST / JSON| API
    
    API --> DB
    API --> Cache
    API -->|Gera reunião| Teams
    API -->|Envia lembrete| SMTP
    
    CronJob --> DB
    CronJob --> SMTP
```

---

## 4. Resumo para memorizar

* Use `flowchart TB` com `subgraph` para documentar arquiteturas por camadas (clientes, gateway, serviços, banco).
* Aplique o sistema semântico de cores para diferenciar serviços internos de APIs externas e bancos de dados.
* Limite o escopo de cada diagrama para não misturar detalhes de código com topologia de servidores.
