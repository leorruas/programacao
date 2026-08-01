# Onde Colocar a Tag `<script>` e a Pegadinha do `null` no DOM ⚠️

Um dos erros mais comuns no desenvolvimento web é tentar capturar um elemento com `document.querySelector()` e receber **`null`**, fazendo o código quebrar com a seguinte mensagem no console:

> 🛑 `Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')`

---

## 🧐 Por que isso acontece? (A Ordem de Leitura do HTML)

O navegador lê o arquivo `index.html` de **cima para baixo, em ordem sequencial**:

```
1. <!DOCTYPE html>
2. <html>
3.   <head>
4.      <script src="script.js"></script> ──► O JS executa AQUI! (O body ainda NÃO existe!)
5.   </head>
6.   <body>
7.      <button>Pesquisar</button> ────────► O botão só é desenhado AQUI!
8.   </body>
9. </html>
```

Se a tag `<script>` estiver no `<head>`, o JavaScript roda **antes** do HTML desenhar o botão na tela. Quando o JS pergunta ao navegador *"Onde está o botão?"*, o navegador responde *"Não existe nenhum botão ainda"* (`null`).

---

## 🛠️ As 3 Formas de Resolver Esse Problema

### Solução 1: Colocar o `<script>` no Final do `<body>` (A Mais Recomendada)

Coloque a tag `<script>` na última linha antes de fechar a tag `</body>`:

```html
<body>
    <input type="text">
    <button>Pesquisar</button>

    <!-- O JS fica por último para garantir que o HTML já foi todo desenhado -->
    <script src="script.js"></script>
</body>
```

---

### Solução 2: Usar o atributo `defer` na Tag `<script>`

Se você preferir manter o `<script>` dentro do `<head>`, adicione o atributo `defer`. Ele avisa ao navegador: *"Baixe o arquivo JS, mas só execute DEPOIS que todo o HTML for lido!"*.

```html
<head>
    <script src="script.js" defer></script>
</head>
```

---

### Solução 3: Escutar o Evento `DOMContentLoaded` no JS

Você também pode dizer ao JavaScript para esperar a montagem da tela antes de rodar qualquer linha:

```javascript
document.addEventListener("DOMContentLoaded", () => {
    // Todo o seu código aqui só roda quando a página estiver 100% pronta!
    const botao = document.querySelector("button");
    const campoTexto = document.querySelector("input");

    botao.addEventListener("click", () => {
        console.log(campoTexto.value);
    });
});
```

---

## 💡 Dica Bônus: Sintaxe dos Seletores no `querySelector`

Sempre preste atenção no prefixo do seletor:

| O que você quer selecionar? | Exemplo no HTML | Sintaxe no `querySelector` |
| :--- | :--- | :--- |
| **Nome da Tag** | `<button>` | `document.querySelector("button")` |
| **Classe** (usa PONTO `.`) | `<div class="card">` | `document.querySelector(".card")` |
| **ID** (usa HASHTAG `#`) | `<input id="busca">` | `document.querySelector("#busca")` |
