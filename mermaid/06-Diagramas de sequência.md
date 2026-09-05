# Diagramas de sequência

O diagrama de sequência (`sequenceDiagram`) é a ferramenta padrão da engenharia de software para mapear **interações e troca de mensagens que ocorrem ao longo do tempo**.

Enquanto um fluxograma mapeia árvores de decisões e bifurcações lógicas, o diagrama de sequência responde com precisão milimétrica à pergunta: *"Em que ordem exata os componentes conversam entre si e quem é responsável por cada etapa do processo?"*

---

## 1. Anatomia do tempo e participantes

Em um diagrama de sequência:
* O **eixo horizontal** representa os participantes (atores humanos, sistemas, microsserviços, bancos de dados).
* O **eixo vertical** representa a **linha do tempo**, que avança continuamente de cima para baixo.

### Código-fonte do diagrama
````markdown
```mermaid
sequenceDiagram
    autonumber
    actor Estudante as Estudante
    participant App as Frontend (React)
    participant API as Backend (Node.js)
    participant DB as Banco de Dados

    Estudante->>App: 1. Seleciona mentor e horário
    App->>API: 2. POST /solicitacoes
    API->>DB: 3. INSERT INTO solicitacoes
    DB-->>API: 4. Retorna ID gerado
    API-->>App: 5. HTTP 201 (Criado)
    App-->>Estudante: 6. Exibe confirmação na tela
```
````

### Visualização renderizada
```mermaid
sequenceDiagram
    autonumber
    actor Estudante as Estudante
    participant App as Frontend (React)
    participant API as Backend (Node.js)
    participant DB as Banco de Dados

    Estudante->>App: 1. Seleciona mentor e horário
    App->>API: 2. POST /solicitacoes
    API->>DB: 3. INSERT INTO solicitacoes
    DB-->>API: 4. Retorna ID gerado
    API-->>App: 5. HTTP 201 (Criado)
    App-->>Estudante: 6. Exibe confirmação na tela
```

---

## 2. Atores, participantes e caixas de ativação

### 2.1. `actor` versus `participant`
* **`actor`**: Renderiza a figura humana (boneco de palito). Usado exclusivamente para representar usuários humanos (alunos, mentores, administradores).
* **`participant`**: Renderiza retângulos de componentes de código, servidores, filas ou APIs externas.
* **`as`**: Permite definir um apelido curto no código e um rótulo legível e completo no diagrama.

### 2.2. Caixas de ativação (`activate` e `deactivate` ou `+` e `-`)
As barras verticais de ativação indicam visualmente quando um participante está **efetivamente processando uma tarefa** ou aguardando resposta.

---

## 3. Estruturas de controle: `alt`, `opt` e `loop`

Processos reais possuem caminhos alternativos (sucesso vs falha) e etapas condicionais:

* **`alt / else`**: Bifurcação condicional (ex: mentor aceita vs mentor recusa).
* **`opt`**: Passo opcional (ex: usuário opta por receber lembrete via SMS).
* **`loop`**: Tentativas repetidas (*retry*) ou polling periódico.

---

## 4. O sistema unificado: processo completo de solicitação de mentoria

Abaixo, o fluxo integrado de solicitação de mentoria no sistema da PUC, ilustrando atores, ativações, agrupamentos (`box`) e caminhos alternativos:

### Código-fonte do diagrama
````markdown
```mermaid
sequenceDiagram
    autonumber
    
    box rgb(30, 30, 30) Camada do usuário
        actor Aluno as Aluno
        actor Mentor as Mentor
    end

    box rgb(45, 45, 45) Plataforma e serviços
        participant Web as Frontend Web
        participant API as API de Mentorias
        participant Notif as Serviço de E-mail
        participant DB as PostgreSQL
    end

    Aluno->>+Web: Solicita sessão de mentoria
    Web->>+API: POST /agendamentos (alunoId, mentorId, data)
    
    API->>+DB: Verifica conflito de agenda
    DB-->>-API: Horário livre

    API->>DB: Cria registro com status "Pendente"
    API-)Notif: Dispara notificação assíncrona ao Mentor
    API-->>-Web: Retorna HTTP 202 (Solicitação recebida)
    Web-->>-Aluno: Exibe "Aguardando confirmação do mentor"

    Note over Mentor,Notif: Mentor recebe e-mail com link de aprovação

    Mentor->>+API: PUT /agendamentos/{id}/resposta
    
    alt Mentor confirma agendamento
        API->>DB: Atualiza status para "Confirmado"
        API-)Notif: Notifica Aluno sobre a confirmação
        API-->>Mentor: Exibe mensagem de sucesso
    else Mentor recusa ou propõe novo horário
        API->>DB: Atualiza status para "Recusado"
        API-)Notif: Notifica Aluno com motivo da recusa
        API-->>-Mentor: Confirma cancelamento
    end
```
````

### Visualização renderizada
```mermaid
sequenceDiagram
    autonumber
    
    box rgb(30, 30, 30) Camada do usuário
        actor Aluno as Aluno
        actor Mentor as Mentor
    end

    box rgb(45, 45, 45) Plataforma e serviços
        participant Web as Frontend Web
        participant API as API de Mentorias
        participant Notif as Serviço de E-mail
        participant DB as PostgreSQL
    end

    Aluno->>+Web: Solicita sessão de mentoria
    Web->>+API: POST /agendamentos (alunoId, mentorId, data)
    
    API->>+DB: Verifica conflito de agenda
    DB-->>-API: Horário livre

    API->>DB: Cria registro com status "Pendente"
    API-)Notif: Dispara notificação assíncrona ao Mentor
    API-->>-Web: Retorna HTTP 202 (Solicitação recebida)
    Web-->>-Aluno: Exibe "Aguardando confirmação do mentor"

    Note over Mentor,Notif: Mentor recebe e-mail com link de aprovação

    Mentor->>+API: PUT /agendamentos/{id}/resposta
    
    alt Mentor confirma agendamento
        API->>DB: Atualiza status para "Confirmado"
        API-)Notif: Notifica Aluno sobre a confirmação
        API-->>Mentor: Exibe mensagem de sucesso
    else Mentor recusa ou propõe novo horário
        API->>DB: Atualiza status para "Recusado"
        API-)Notif: Notifica Aluno com motivo da recusa
        API-->>-Mentor: Confirma cancelamento
    end
```

---

## 5. Resumo para memorizar

* O eixo vertical representa o tempo; mensagens no topo acontecem estritamente antes das mensagens na base.
* Use `actor` para seres humanos e `participant` para serviços e sistemas.
* Use blocos `alt/else` para caminhos de sucesso e erro e `opt` para etapas opcionais.
