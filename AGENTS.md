# Diretrizes e Modus Operandi do Projeto (AGENTS.md)

Este documento centraliza todas as regras de desenvolvimento, manutenção de notas, registros de histórico e sincronização para assistentes de IA neste repositório.

---

## 0. Leitura Obrigatória Inicial (Prrequisito)

- **Obrigatório antes de qualquer tarefa**: Todo assistente de IA DEVE ler integralmente os arquivos [`AGENTS.md`](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/AGENTS.md) e [`me.md`](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/me.md) antes de iniciar qualquer análise, alteração ou resposta ao usuário.
- O arquivo `me.md` contém o perfil, contexto e preferências de aprendizado do usuário, enquanto `AGENTS.md` define as regras técnicas e o fluxo de trabalho obrigatório.

---


## 1. Registro Obrigatório no `log.md` e Push Automático ao GitHub

- **Log Obrigatório**: Toda e qualquer alteração de arquivo (criação, edição, renomeação, refatoração, otimização ou exclusão) DEVE ser registrada no arquivo `log.md`.
- **Ordem Cronológica Decrescente**: O bloco da data atual deve sempre ficar no topo (logo abaixo do título/introdução do `log.md`).
- **Formato**: Use itens de lista detalhando o componente/pasta e o que foi feito. Exemplo: `* **Tipo de Alteração**: [[Caminho/Nota|Título]] - Descrição da mudança`.
- **Git Push Automático**: Toda alteração no projeto (código, CSS, HTML, notas Markdown ou regras) deve obrigatoriamente ser commitada e enviada ao GitHub via `git push origin main` imediatamente ao concluir a tarefa.

---

## 2. Uso Preferencial de WikiLinks

- **Links Internos**: Para conectar notas no vault do Obsidian e no Web App, use sempre a sintaxe de WikiLinks `[[Caminho/Da/Nota|Nome Visível]]`.
- **Compatibilidade**: Evite caminhos absolutos do sistema operacional local dentro das notas Markdown.

---

## 3. Interligação Automática (Auto-Interlinking)

- Ao criar ou atualizar qualquer artigo, crie WikiLinks cruzados para termos técnicos e palavras-chave que possuam notas correspondentes no repositório.

---

## 4. Estilo de Escrita e Apresentação (Feynman & No Emojis)

- **Método Feynman**: Explique conceitos com clareza, analogias do mundo real e linguagem acessível.
- **Proibido Emojis**: Não utilize emojis em nenhum lugar do repositório (notas, log ou interface), mantendo um visual limpo e profissional.

---

## 5. Manutenção das Listas e Scripts do Web App

- Sempre que uma nota for adicionada, movida ou renomeada, atualize a lista de arquivos no `script.js`.
- Garanta que a busca em tempo real e o leitor de artigos funcionem corretamente após qualquer alteração estrutural.
