# Diretrizes e Modus Operandi do Projeto (AGENTS.md)

Este documento centraliza todas as regras de desenvolvimento, manutenção de notas, registros de histórico e sincronização para assistentes de IA neste repositório.

---

## 0. Leitura Obrigatória Inicial (Prerrequisito)

- **Obrigatório antes de qualquer tarefa**: Todo assistente de IA DEVE ler integralmente os arquivos [`AGENTS.md`](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/AGENTS.md) e [`me.md`](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/me.md) antes de iniciar qualquer análise, alteração ou resposta ao usuário.
- O arquivo `me.md` contém o perfil, contexto e preferências de aprendizado do usuário, enquanto `AGENTS.md` define as regras técnicas e o fluxo de trabalho obrigatório.

---

## 1. Registro Obrigatório no `log.md` e Push Automático ao GitHub

- **Log Obrigatório**: Toda e qualquer alteração de arquivo (criação, edição, renomeação, refatoração, otimização ou exclusão) DEVE ser registrada no arquivo `log.md`.
- **Ordem Cronológica Decrescente**: O bloco da data atual deve sempre ficar no topo (logo abaixo do título/introdução do `log.md`).
- **Formato**: Use itens de lista detalhando o componente/pasta e o que foi feito. Exemplo: `* **Tipo de Alteração**: [[Caminho/Nota|Título]] - Descrição da mudança`.
- **Git Push Automático**: Toda alteração no projeto (código, CSS, HTML, notas Markdown ou regras) deve obrigatoriamente ser commitada e enviada ao GitHub via `git push origin main` imediatamente ao concluir a tarefa.

---

## 2. Uso Preferencial de WikiLinks e Proteção de Sintaxe

- **Links Internos**: Para conectar notas no vault do Obsidian e no Web App, use sempre a sintaxe de WikiLinks `[[Caminho/Da/Nota|Nome Visível]]`.
- **Dentro de Tabelas**: Use obrigatoriamente o pipe escapado (`\|`) para não corromper as colunas Markdown (ex.: `[[caminho/Nota\|Rótulo]]`).
- **Nomes Especiais e Dunder Methods**: Mantenha nomes de métodos mágicos (ex.: `__proto__`, `__init__`, `_privado`) devidamente protegidos para que parsers Markdown não os convertam em formatação itálica ou negrito indesejada.
- **Compatibilidade**: Evite caminhos absolutos do sistema operacional local dentro das notas Markdown.

---

## 3. Interligação Automática (Auto-Interlinking)

- Ao criar ou atualizar qualquer artigo, crie WikiLinks cruzados para termos técnicos e palavras-chave que possuam notas correspondentes no repositório.

---

## 4. Estilo de Escrita, Método Feynman e Proibição de Emojis

- **Método Feynman**: Explique conceitos com clareza, analogias do mundo real (design, interface, produtos e cotidiano) e linguagem acessível antes de aprofundar na sintaxe formal. Inclua uma seção `## Resumo para memorizar` ao final de notas conceituais.
- **Proibido Emojis**: É estritamente proibido utilizar emojis em qualquer lugar do repositório (notas, log, cabeçalhos ou respostas), mantendo um padrão limpo e profissional.
- **Capitalização Frasal Estrita (Sentence Case)**:
  - Em **todos os títulos e cabeçalhos** (`#`, `##`, `###`, `####`), apenas a primeira palavra deve ter a inicial maiúscula.
  - Palavras subsequentes devem ser minúsculas, exceto nomes próprios, marcas e siglas técnicas (ex.: `JavaScript`, `Python`, `React`, `Git`, `C#`, `DOM`, `API`, `JSON`, `SQL`, `CSS`, `HTML`, `DNS`, `CNAME`).
  - Aplique também a regra em rótulos em negrito no corpo do texto e parênteses explicativos (ex.: `**A interface (*o que faz*):**`).

---

## 5. Diretrizes para Apresentação de Código Didático

- **Apresentação Dual de Código**:
  1. **Snippets Atômicos**: Pequenos trechos isolados ao lado da explicação teórica demonstrando especificamente a propriedade, método ou função tratada.
  2. **Exemplo Completo e Integrado**: Ao final, um código integral, compilável e executável (ex.: arquivo completo em JS/React/C# com manipulação de DOM, classes ou ciclo de vida) que una todas as partes explicadas.

---

---

## 6. Diretrizes para Diagramas Mermaid e Explorador Interativo

- **Critério Topológico de Orientação**: Não há orientação universal fixa. Escolha `TD`, `LR` ou outra disposição de acordo com a topologia do conhecimento:
  - *Processos e sequências lineares*: `LR` para fluxos curtos ou `TD` para fluxos longos com desvios.
  - *Hierarquias, taxonomias e herança*: `TD` como padrão estrutural.
  - *Sistemas e mapas relacionais*: orientação que minimize cruzamentos de arestas (*edge crossing*).
- **Conectores Compatíveis com Mermaid v11+**: Utilize sempre a sintaxe oficial com pipes `-->|Rótulo|` para setas rotuladas (evitando `-- Rótulo -->`).
- **Quebra de Linha em Nós (`<br>`)**: Use `<br>` a cada 2 ou 3 palavras em textos longos de nós (`Node["Texto com<br>quebra"]`) para manter os blocos estreitos e compactos.
- **Rótulos com Aspas**: Envolva o texto de todos os nós em aspas duplas para evitar erros com caracteres especiais como parênteses ou barras.
- **Escolha Semântica do Tipo de Diagrama**:
  - `classDiagram` para modelagem de classes, herança e interfaces;
  - `erDiagram` para bancos relacionais e cardinalidades;
  - `sequenceDiagram` para troca de mensagens e chamadas assíncronas;
  - `stateDiagram-v2` para ciclo de vida e máquinas de estado;
  - `flowchart` para algoritmos, controle de fluxo e arquiteturas.
- **Sistema Semântico Global de Classes de Estilo**:
  - `:::core`: conceito central, nó raiz ou elemento principal;
  - `:::component`: módulo, classe concreta, serviço ou componente operacional;
  - `:::data`: entidade de banco, payload, JSON ou estrutura de dados;
  - `:::warning`: exceção, erro, ponto de atenção ou restrição;
  - `:::external`: sistema terceiro, API externa ou fronteira de escopo.
- **Proibição Estrita de Diagramas em ASCII Art**: Proibido desenhar caixas e pirâmides com caracteres de texto (`+---+`, `| |`, `----->`). Use Mermaid nativo ou tabelas Markdown.
- **Compatibilidade Obrigatória com o Explorador Mermaid do App**:
  - O leitor web possui pipeline automatizado (`js/mermaid.js`) que envolve diagramas em `.mermaid-wrapper`, insere a toolbar com botão `ampliar` e abre o explorador fullscreen interativo com ajuste de tela (*fit*), zoom e pan por arraste.
  - O botão `ampliar` é universal e obrigatório em todo diagrama do app.
- **Protocolo de Validação Pré-Commit**:
  - Jamais commitar um diagrama com erro de parsing (`Syntax error in text`) ou SVG quebrado.
  - Validar sempre a renderização antes de concluir qualquer edição de nota com Mermaid.

---

## 7. Preservação Absoluta de Marcações do Usuário

- **Highlights do Obsidian (`==texto==`)**: Grifos e destaques manuais feitos pelo usuário nunca devem ser removidos, alterados ou limpos durante edições, refatorações ou interlinkagens.

---

## 8. Manutenção Modular do Web App e Sincronização

- **Módulos ES6 e Fallback**: Metadados de pastas residem em `js/vault.js`, motor do Mermaid em `js/mermaid.js` e coordenação do app em `script.js`.
- Sempre que uma nota for adicionada, movida ou renomeada, mantenha as listas de arquivos em `js/vault.js` e `script.js` devidamente sincronizadas.
- **Codificação de URLs Especiais**: Garanta que requisições e rotas com caracteres como `#` (ex.: notas de `C#`) usem `encodeURIComponent` para evitar erros HTTP 404.
- **Rolagem Obrigatória ao Topo**: Toda transição de área ou artigo deve reposicionar o leitor no topo exato da tela (`scroll(0, 0)`).

