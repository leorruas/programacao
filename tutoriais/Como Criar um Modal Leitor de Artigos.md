# Tutorial: Como Criar um Modal Leitor de Artigos

Neste tutorial passo a passo, você aprenderá como transformar os cards da sua busca em elementos clicáveis que abrem o artigo completo em uma janela flutuante (**Modal**), sem sair da página.

---

## 🎯 O Objetivo

Quando o usuário buscar um termo e clicar em qualquer card de resultado, uma janela pop-up (Modal) deve abrir exibindo o título completo e o texto do artigo Markdown formatado, com uma opção para fechar no botão `×` ou pressionando a tecla `Esc`.

---

## 1️⃣ Passo 1: Adicionar a Estrutura do Modal no HTML

Abra o seu arquivo `index.html`. Logo abaixo da tag `</main>` e **antes** da tag `<script src="script.js"></script>`, adicione a estrutura do modal:

```html
    <!-- Modal Leitor de Artigos -->
    <div id="modal" class="modal modal-fechado">
        <div class="modal-conteudo">
            <span class="modal-fechar">&times;</span>
            <h2 id="modal-titulo"></h2>
            <div id="modal-corpo" class="modal-corpo"></div>
        </div>
    </div>
```

### 💡 O que cada parte faz:
- `<div id="modal">`: A tela preta de fundo que cobre o site inteiro.
- `modal-fechado`: Classe CSS que esconde o modal quando não estamos lendo nada (`display: none`).
- `<span class="modal-fechar">&times;</span>`: O caractere especial `&times;` renderiza o X de fechar.
- `<div id="modal-corpo">`: Onde o texto do artigo será inserido dinamicamente pelo JavaScript.

---

## 2️⃣ Passo 2: Estilizar o Modal no CSS

Abra o arquivo `style.css`. 

Primeiro, torne os cards visualmente clicáveis adicionando `cursor: pointer;` na classe `.card`:

```css
.card {
    cursor: pointer; /* Transforma o ponteiro em mãozinha ao passar o mouse */
    overflow: hidden;
}
```

Em seguida, no final do arquivo `style.css`, adicione as regras de estilo do modal:

```css
/* Modal (Fundo Escuro Flutuante) */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(5px); /* Efeito de desfoque no fundo */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

/* Esconde o modal por padrão */
.modal.modal-fechado {
    display: none;
}

/* Caixa Branca/Rosa de Conteúdo do Leitor */
.modal-conteudo {
    background-color: #000;
    border: 1px solid pink;
    border-radius: 10px;
    width: 90%;
    max-width: 800px;
    max-height: 85vh;
    padding: 35px;
    box-sizing: border-box;
    position: relative;
    overflow-y: auto; /* Adiciona barra de rolagem se o texto for longo */
    color: white;
    font-size: 0.6em;
    line-height: 1.6;
}

/* Botão X de Fechar */
.modal-fechar {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 1.5em;
    color: pink;
    cursor: pointer;
    transition: color 0.2s;
}

.modal-fechar:hover {
    color: white;
}

.modal-conteudo h2 {
    color: pink;
    font-size: 1.8em;
    margin-top: 0;
    margin-bottom: 20px;
    border-bottom: 1px solid #333;
    padding-bottom: 10px;
}

/* Estilo para blocos de código dentro do modal */
.modal-corpo pre {
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

## 3️⃣ Passo 3: Conectar a Lógica no JavaScript

Abra o seu arquivo `script.js`.

### A) Mapear os Elementos do Modal no Topo do Arquivo
No topo do arquivo (junto com o `botao` e `campoTexto`), adicione:

```javascript
const modal = document.getElementById("modal");
const modalTitulo = document.getElementById("modal-titulo");
const modalCorpo = document.getElementById("modal-corpo");
const modalFechar = document.querySelector(".modal-fechar");
```

### B) Criar as Funções de Abrir e Fechar o Modal
Adicione as funções de controle e os ouvintes de evento:

```javascript
// Função para abrir o modal com o título e conteúdo do artigo
function abrirModal(titulo, conteudo) {
    modalTitulo.textContent = titulo;
    
    // Converte quebras de linha em parágrafos HTML para o texto ficar formatado
    modalCorpo.innerHTML = conteudo
        .split("\n\n")
        .map(paragrafo => `<p>${paragrafo.replace(/\n/g, "<br>")}</p>`)
        .join("");

    modal.classList.remove("modal-fechado"); // Exibe o modal
}

// Fechar ao clicar no botão X
modalFechar.addEventListener("click", () => {
    modal.classList.add("modal-fechado");
});

// Fechar ao clicar fora da caixa do artigo (no fundo escuro)
window.addEventListener("click", (evento) => {
    if (evento.target === modal) {
        modal.classList.add("modal-fechado");
    }
});

// Fechar ao pressionar a tecla ESC no teclado
document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
        modal.classList.add("modal-fechado");
    }
});
```

### C) Adicionar o Evento de Clique em Cada Card Criado
Dentro da função `buscar(termo)`, no ponto onde o card HTML é montado, modifique a criação para adicionar o ouvinte de clique:

```javascript
// Dentro do for (const arquivo of arquivos):
if (temNoTitulo || temNoConteudo) {
    encontrouResultado = true;
    const resumo = conteudoTexto.substring(0, 150) + "...";

    // Criamos o elemento div do card em JavaScript
    const cardElemento = document.createElement("div");
    cardElemento.className = "card";
    cardElemento.innerHTML = `
        <h2>${arquivo.titulo}</h2>
        <div class="conteudo">${resumo}</div>
    `;

    // Quando clicar no card, abre o modal com o artigo completo!
    cardElemento.addEventListener("click", () => {
        abrirModal(arquivo.titulo, conteudoTexto);
    });

    containerResultados.appendChild(cardElemento);
}
```

---

## 🚀 Pronto!

Agora é só testar:
1. Digite um termo na busca e clique em **Pesquisar**.
2. Clique em qualquer card de resultado.
3. O modal se abrirá no centro da tela com o texto completo do artigo!
4. Feche clicando no `×`, no fundo preto ou apertando `Esc`.
