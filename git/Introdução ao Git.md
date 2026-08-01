# Introdução ao Git - método Feynman

O **[[git/Git\|Git]]** é um sistema de controle de versão distribuído que permite acompanhar o histórico de alterações no seu código, trabalhar em equipe sem sobrescrever arquivos e retornar a qualquer versão anterior do projeto a qualquer momento.

Sob a perspectiva do **Dia a Dia**, o [[git/Git\|Git]] funciona exatamente como uma **Máquina do Tempo com Diário de Bordo**.

---

## A analogia da máquina do tempo

Imagine um projeto de escrita de um livro:

*   **O Projeto:** É o livro em construção no seu computador.
*   **O Diário de Bordo (Histórico do [[git/01-fundamentos/Git\|Git]]):** A cada capítulo finalizado, você anota no diário o que foi alterado e tira um retrato daquele momento.
*   **A Máquina do Tempo:** Se você decidir apagar três capítulos ou experimentar um final alternativo e não gostar, você pode ativar a máquina do tempo e voltar o livro exatamente para o estado em que ele estava na terça-feira passada.

---

## 1. Estrutura padrão da pasta Git

A organização dos estudos de [[git/01-fundamentos/Git\|Git]] no seu vault segue esta estrutura:

*   **[[git/Introdução ao Git\|Introdução ao Git]]**: Visão geral e primeiros passos.
*   **[[git/conceitos/Git\|Git (Conceitos Básicos)]]**: Detalhamento sobre commits, branches, merges e GitHub.

---

## 2. Principais comandos para iniciar

| Comando | O que faz? | Analogia |
| :--- | :--- | :--- |
| `git init` | Inicializa o rastreamento do Git na pasta atual. | Instala o diário de bordo na pasta. |
| `git status` | Mostra quais arquivos foram modificados. | Verifica quais páginas foram alteradas hoje. |
| `git add .` | Prepara os arquivos modificados para serem salvos. | Junta as páginas na mesa antes de fotografar. |
| `git commit -m "mensagem"` | Salva o estado atual com uma mensagem explicativa. | Tira a foto oficial e cola no diário de bordo. |
| `git log` | Exibe o histórico de todos os salvamentos realizados. | Abre o diário de bordo para leitura. |

---

## Resumo para memorizar

*   **Controle de Versão:** Rastreia e salva o histórico do seu código sem precisar duplicar pastas.
*   **Snapshots:** O Git não guarda cópias inteiras do projeto, mas sim fotos das diferenças de linha por linha.
*   **Nuvem:** O GitHub é o servidor remoto onde enviamos nosso histórico do Git para ter backup e trabalhar em equipe.
