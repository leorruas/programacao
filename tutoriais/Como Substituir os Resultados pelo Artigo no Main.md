# Tutorial: Como Substituir os Resultados pelo Artigo no Main (Navegação SPA)

Neste tutorial passo a passo, você aprenderá como exibir o artigo completo **direto na página principal (`<main>`)**, substituindo temporariamente a lista de resultados quando o usuário clicar em um card.

---

## O Objetivo

Em vez de abrir uma janela flutuante (modal), a grade de resultados de busca será oculta temporariamente e o conteúdo completo do artigo será exibido dentro da própria tag `<main>`, acompanhado de um botão **"Voltar para a busca"**.

---

## 1. Passo 1: Adicionar a Área do Leitor no HTML

Abra seu arquivo `index.html`. Dentro da tag `<main>`, logo **abaixo** da `<div class="resultados">`, adicione o container do leitor:

```html
<main>
    <input type="text" placeholder="o que você quer pesquisar hoje? ">
    <button>Pesquisar</button>
    
    <!-- 1. Lista com os cards de resultado -->
    <div class="resultados">
        <div class="cards-container"></div>
    </div>

    <!-- 2. Área de leitura do artigo (fica oculta por padrão) -->
    <div id="leitor-artigo" class="leitor-artigo escondido">
        <button id="btn-voltar" class="btn-voltar">&larr; Voltar para a busca</button>
        <h2 id="artigo-titulo"></h2>
        <div id="artigo-corpo" class="artigo-corpo"></div>
    </div>
</main>
```

---

## 2. Passo 2: Estilizar no CSS

Abra seu arquivo `style.css`.

### A) Criar a classe utilitária de ocultação
Adicione no CSS uma classe simples que esconde qualquer elemento quando ativada:

```css
.escondido {
    display: none !important;
}
```

### B) Deixar os cards clicáveis
Adicione `cursor: pointer;` na regra `.card`:

```css
.card {
    cursor: pointer; /* Exibe a mãozinha ao passar o mouse */
}
```

### C) Estilizar o Leitor e o Botão Voltar
No final do seu `style.css`, adicione o estilo visual da área de leitura:

```css
/* Área de leitura do artigo no main */
.leitor-artigo {
    margin-top: 30px;
    padding: 30px;
    border: 1px solid pink;
    border-radius: 10px;
    background-color: #050505;
    color: white;
    font-size: 0.6em;
    line-height: 1.6;
}

/* Botão de Voltar */
.btn-voltar {
    background-color: transparent;
    border: 1px solid pink;
    color: pink;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    margin-bottom: 20px;
    width: auto; /* Substitui a largura genérica de botões */
    transition: background-color 0.3s, color 0.3s;
}

.btn-voltar:hover {
    background-color: pink;
    color: black;
}

/* Título do Artigo */
.leitor-artigo h2 {
    color: pink;
    font-size: 1.8em;
    margin-bottom: 20px;
    border-bottom: 1px solid #333;
    padding-bottom: 10px;
}

/* Formatação do texto e código */
.artigo-corpo p {
    margin-bottom: 15px;
}

.artigo-corpo pre {
    background-color: #111;
    border: 1px solid pink;
    padding: 15px;
    border-radius: 5px;
    overflow-x: auto;
    color: pink;
    font-family: monospace;
}
```

---

## 3. Passo 3: Escrever a Lógica no JavaScript

Abra seu arquivo `script.js`.

### A) Selecionar os Novos Elementos do DOM
No início do arquivo, selecione os novos elementos HTML:

```javascript
const divResultados = document.querySelector(".resultados");
const leitorArtigo = document.getElementById("leitor-artigo");
const artigoTitulo = document.getElementById("artigo-titulo");
const artigoCorpo = document.getElementById("artigo-corpo");
const btnVoltar = document.getElementById("btn-voltar");
```

### B) Criar as Funções para Alternar as Telas
Crie uma função para abrir o artigo e outra para voltar aos resultados de busca:

```javascript
// Exibe o artigo e esconde a lista de resultados
function abrirArtigo(titulo, conteudo) {
    artigoTitulo.textContent = titulo;
    
    // Formata parágrafos dividindo por quebras de linha duplas
    artigoCorpo.innerHTML = conteudo
        .split("\n\n")
        .map(p => `<p>${p.replace(/\n/g, "<br>")}</p>`)
        .join("");

    divResultados.classList.add("escondido");   // Esconde os cards
    leitorArtigo.classList.remove("escondido"); // Mostra a leitura do artigo
}

// Voltar para a lista de resultados
btnVoltar.addEventListener("click", () => {
    leitorArtigo.classList.add("escondido");    // Esconde a leitura
    divResultados.classList.remove("escondido"); // Mostra os cards novamente
});
```

### C) Adicionar o Evento de Clique em Cada Card Criado
Dentro da sua função `buscar(termo)`, no momento de criar o card HTML no loop, adicione o evento de clique:

```javascript
// Dentro do loop de busca dos arquivos:
if (temNoTitulo || temNoConteudo) {
    encontrouResultado = true;
    const resumo = conteudoTexto.substring(0, 150) + "...";

    // Criamos a div do card via JavaScript
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <h2>${arquivo.titulo}</h2>
        <div class="conteudo">${resumo}</div>
    `;

    // Quando clicar no card, troca a visão para o artigo completo!
    card.addEventListener("click", () => {
        abrirArtigo(arquivo.titulo, conteudoTexto);
    });

    containerResultados.appendChild(card);
}
```

---

## Resumo do Fluxo

1. O usuário digita um termo e clica em **Pesquisar**. Os cards aparecem em `.resultados`.
2. O leitor (`#leitor-artigo`) possui a classe `.escondido` e fica invisível.
3. Ao clicar em um card, a classe `.escondido` é adicionada ao `.resultados` e removida do `#leitor-artigo`.
4. Ao clicar em **"Voltar para a busca"**, o processo se inverte, trazendo a lista de cards de volta intacta!
