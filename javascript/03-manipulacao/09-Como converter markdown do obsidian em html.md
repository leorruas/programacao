# Como Converter Markdown do Obsidian em HTML Real no JavaScript

Quando lemos um arquivo `.md` criado no Obsidian via `fetch()`, recebemos uma string de texto puro cheia de marcações como `#`, `**`, ```` ```` e `>`. 

Se simplesmente jogarmos esse texto na tela com `textContent` ou `innerHTML` básico, o navegador exibirá os símbolos brutamente sem nenhuma formatação.

Neste artigo, você aprenderá como transformar o Markdown do Obsidian em elementos HTML reais (`<h1>`, `<strong>`, `<pre><code>`, etc.), tanto criando seu próprio conversor em JavaScript quanto usando a biblioteca `marked.js`.

---

## 1. O Problema: Texto Puro vs HTML Real

Quando o Obsidian salva um arquivo, ele usa a sintaxe **Markdown**:
```markdown
# Flexbox
O **Flexbox** é incrível para alinhar elementos.
```

Se colocarmos no JavaScript diretamente:
`artigoCorpo.textContent = conteudo;`

O navegador exibe exatamente `# Flexbox` e `**Flexbox**`.

Para que o navegador aplique o visual correto, precisamos converter essas marcações para tags HTML:
```html
<h1>Flexbox</h1>
<p>O <strong>Flexbox</strong> é incrível para alinhar elementos.</p>
```

---

## 2. Método 1: Conversor Manual com Regex (Expressões Regulares)

Podemos criar uma função leve em JavaScript que busca os padrões do Markdown e os substitui pelas tags HTML equivalentes usando `.replace()` e Expressões Regulares (Regex).

```javascript
function converterMarkdownParaHTML(markdown) {
    let html = markdown;

    // 1. Títulos (#, ##, ###)
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // 2. Negrito (**texto**) e Itálico (*texto*)
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // 3. Blocos de Código (```codigo```)
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

    // 4. Código em linha (`codigo`)
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // 5. Citações (> citação)
    html = html.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');

    // 6. Links ([[url|texto]])
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');

    // 7. Parágrafos (separa blocos de texto por quebras de linha duplas)
    return html.split('\n\n').map(bloco => {
        const blocoLimpo = bloco.trim();
        if (blocoLimpo.startsWith('<h') || 
            blocoLimpo.startsWith('<pre') || 
            blocoLimpo.startsWith('<blockquote')) {
            return blocoLimpo;
        }
        return `<p>${blocoLimpo.replace(/\n/g, '<br>')}</p>`;
    }).join('');
}
```

### Como aplicar na sua função `abrirArtigo()`:
```javascript
function abrirArtigo(titulo, conteudo) {
    artigoTitulo.textContent = titulo;
    
    // Converte o Markdown do Obsidian em HTML real!
    artigoCorpo.innerHTML = converterMarkdownParaHTML(conteudo);

    divResultados.classList.add("escondido");
    leitorDeArtigo.classList.remove("escondido");
}
```

---

## 3. Método 2: Usando a Biblioteca Pronta (Marked.js)

Se você preferir converter **absolutamente qualquer sintaxe avançada do Obsidian** (listas complexas, tabelas, tarefas `- [ ]`, etc.) em uma linha sem precisar escrever regras manualmente, pode usar a biblioteca pública **Marked.js**.

### Passo 1: Adicionar o script no `index.html`
Coloque esta linha no `<head>` do seu `index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
```

### Passo 2: Usar uma única linha no `script.js`
Na sua função `abrirArtigo()`:

```javascript
function abrirArtigo(titulo, conteudo) {
    artigoTitulo.textContent = titulo;
    
    // A biblioteca Marked faz toda a conversão de Markdown para HTML em 1 linha!
    artigoCorpo.innerHTML = marked.parse(conteudo);

    divResultados.classList.add("escondido");
    leitorDeArtigo.classList.remove("escondido");
}
```

---

## 4. Estilizando as Tags Convertidas no CSS

Para que o HTML convertido tenha uma ótima tipografia no tema escuro, adicione estilos para essas tags no seu `style.css`:

```css
/* Títulos convertidos do Markdown */
.artigo-corpo h1, 
.artigo-corpo h2, 
.artigo-corpo h3 {
    color: pink;
    margin-top: 20px;
    margin-bottom: 10px;
}

/* Negritos */
.artigo-corpo strong {
    color: pink;
}

/* Blocos de Código */
.artigo-corpo pre {
    background-color: #111;
    border: 1px solid pink;
    padding: 15px;
    border-radius: 5px;
    overflow-x: auto;
}

.artigo-corpo code {
    font-family: monospace;
    color: pink;
}
```

---

## 5. Resumo de Bolso

| Sintaxe no Obsidian | Tag HTML Resultante | O que faz no navegador? |
| :--- | :--- | :--- |
| `# Título` | `<h1>` | Título principal grande |
| `**texto**` | `<strong>` | Texto em negrito destacável |
| `*texto*` | `<em>` | Texto em itálico |
| ```` ```codigo``` ```` | `<pre><code>` | Bloco de código com caixa e rolagem |
| `> texto` | `<blockquote>` | Citação em bloco recuada |
