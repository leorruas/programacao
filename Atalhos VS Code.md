# Atalhos essenciais do vs code (macOS & windows/linux)

Este guia reúne os atalhos mais úteis do VS Code para acelerar seu fluxo de trabalho de desenvolvimento. 

> [!TIP]
> No macOS, a tecla **Cmd (⌘)** substitui o **Ctrl** do Windows/Linux na maioria dos atalhos, e **Opt (⌥)** substitui o **Alt**.

---

## 1. Navegação e arquivos

| Ação | macOS | Windows / Linux |
| :--- | :--- | :--- |
| **Busca Rápida de Arquivos** (Ir para arquivo) | `⌘ + P` | `Ctrl + P` |
| **Paleta de Comandos** (Acessar todas as funções) | `⇧ + ⌘ + P` | `Ctrl + Shift + P` |
| **Ir para uma linha específica** | `⌃ + G` | `Ctrl + G` |
| **Alternar entre abas abertas** | `⌃ + Tab` | `Ctrl + Tab` |
| **Fechar a aba atual** | `⌘ + W` | `Ctrl + W` |
| **Reabrir aba recém-fechada** | `⇧ + ⌘ + T` | `Ctrl + Shift + T` |
| **Mostrar/Ocultar Barra Lateral** | `⌘ + B` | `Ctrl + B` |

---

## 2. Edição básica

| Ação | macOS | Windows / Linux |
| :--- | :--- | :--- |
| **Copiar linha atual (sem seleção)** | `⌘ + C` | `Ctrl + C` |
| **Cortar linha atual (sem seleção)** | `⌘ + X` | `Ctrl + X` |
| **Mover linha atual para cima/baixo** | `⌥ + ↓ / ↑` | `Alt + ↓ / ↑` |
| **Duplicar linha atual para cima/baixo** | `⇧ + ⌥ + ↓ / ↑` | `Shift + Alt + ↓ / ↑` |
| **Apagar linha atual** | `⇧ + ⌘ + K` | `Ctrl + Shift + K` |
| **Inserir linha abaixo (sem quebrar a atual)** | `⌘ + Enter` | `Ctrl + Enter` |
| **Inserir linha acima (sem quebrar a atual)** | `⇧ + ⌘ + Enter` | `Ctrl + Shift + Enter` |
| **Comentar/Descomentar bloco de código** | `⌘ + /` | `Ctrl + /` |
| **Formatar código (Prettier / Linter)** | `⇧ + ⌥ + F` | `Shift + Alt + F` |

---

## 3. Multi-cursor e seleção

| Ação | macOS | Windows / Linux |
| :--- | :--- | :--- |
| **Adicionar cursor manualmente** | `⌥ + Clique` | `Alt + Clique` |
| **Adicionar cursor acima/abaixo** | `⌥ + ⌘ + ↑ / ↓` | `Ctrl + Alt + ↑ / ↓` |
| **Selecionar próxima ocorrência da palavra atual** | `⌘ + D` | `Ctrl + D` |
| **Selecionar todas as ocorrências da palavra atual** | `⇧ + ⌘ + L` | `Ctrl + Shift + L` |
| **Desfazer a última ação do cursor** | `⌘ + U` | `Ctrl + U` |
| **Seleção em coluna (drag)** | `⇧ + ⌥ + Arrastar` | `Shift + Alt + Arrastar` |

---

## 4. Busca e substituição

| Ação | macOS | Windows / Linux |
| :--- | :--- | :--- |
| **Buscar no arquivo atual** | `⌘ + F` | `Ctrl + F` |
| **Substituir no arquivo atual** | `⌥ + ⌘ + F` | `Ctrl + H` |
| **Buscar em todos os arquivos do projeto** | `⇧ + ⌘ + F` | `Ctrl + Shift + F` |
| **Substituir em todos os arquivos** | `⇧ + ⌘ + H` | `Ctrl + Shift + H` |

---

## 5. Controle do editor e terminal

| Ação | macOS | Windows / Linux |
| :--- | :--- | :--- |
| **Dividir o editor (Split Screen)** | `⌘ + \` | `Ctrl + \` |
| **Focar no grupo de editor 1, 2 ou 3** | `⌘ + 1 / 2 / 3` | `Ctrl + 1 / 2 / 3` |
| **Abrir / Ocultar Terminal Integrado** | `⌃ + \`` | `Ctrl + \`` |
| **Criar novo terminal** | `⌃ + ⇧ + \`` | `Ctrl + Shift + \`` |
| **Zoom in / Zoom out** | `⌘ + = / -` | `Ctrl + = / -` |

---

## Dicas de produtividade do vs code

1. **Estrutura Básica HTML5 (Emmet)**: Em um arquivo `.html`, digite `!` ou `html:5` e pressione `Tab` (ou `Enter`) para gerar o esqueleto HTML5 completo automaticamente.
2. **Emmet Integrado**: Digite `div.container>ul>li*3` e aperte `Tab` para gerar a estrutura HTML completa instantaneamente.
3. **Criar Títulos e Tags Rápido (Emmet)**: Digite apenas o nome da tag como `h1`, `h2`, `h3`, `p`, `div` e aperte `Tab` (ou `Enter`) para gerar as tags completas `<h1...` automaticamente. Se já tiver um texto escrito, selecione-o e use `⌥ + W` para envolver com uma tag.
4. **Tags de Conexão e CSS (Emmet)**: Digite `link:css` ou apenas `link` + `Tab` dentro do `<head>` para gerar a tag `<link rel="stylesheet">` rapidamente.
5. **Google Fonts via Extensão**: Instale a extensão **Google Fonts** no VS Code e use `⌘ + Shift + P` > *Google Fonts* para buscar e inserir fontes sem sair do editor.
6. **Zen Mode**: Pressione `⌘ + K` seguido de `Z` (ou `Ctrl + K Z` no Windows) para entrar no modo de foco total, escondendo todos os painéis e barras.
7. **Markdown Preview**: Para ver a pré-visualização de arquivos markdown como este lado a lado, use `⇧ + ⌘ + V` (ou `Ctrl + Shift + V`).
