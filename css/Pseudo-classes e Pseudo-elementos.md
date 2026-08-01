# Pseudo-classes (:) e Pseudo-elementos (::) no CSS

No CSS, dois pontos `:` e quatro pontos `::` servem para alcançar estados e partes de elementos que seriam impossíveis de selecionar apenas com tags, classes ou IDs.

---

## 1. A Diferença Fundamental: `:` vs `::`

| Conceito | Símbolo | O que faz? | Analogia Feynman |
| :--- | :--- | :--- | :--- |
| **Pseudo-classe** | `:` (1 par de dois pontos) | Seleciona o elemento quando ele está em um **ESTADO** ou **CONDIÇÃO** específica. | O elemento já existe, mas está "vestindo um crachá de estado" (ex: sendo clicado, focado ou é o primeiro filho). |
| **Pseudo-elemento** | `::` (2 pares de dois pontos) | Seleciona uma **PARTE INTERNA** ou cria um **ELEMENTO VIRTUAL FANTASMA**. | Uma lupa cirúrgica que mira numa fatia do elemento (ex: a 1ª letra, o texto de dica) ou cria algo novo no CSS. |

> **Nota histórica**: Antigamente no CSS2, usava-se apenas `:` para tudo. No CSS3, a regra oficial passou a ser `:` para pseudo-classes e `::` para pseudo-elementos. Os navegadores ainda aceitam `:` para pseudo-elementos antigos por compatibilidade, mas o padrão moderno é usar `::`.

---

## 2. Pseudo-classes (:) — Estados e Condições

Pseudo-classes reagem a ações do usuário, estado de formulários ou posição do elemento no HTML.

### A) Interação do Usuário
* `:hover` — Quando o ponteiro do mouse está sobre o elemento.
  ```css
  button:hover {
      background-color: pink;
  }
  ```
* `:focus` — Quando o elemento ganha foco (clicado ou selecionado via tecla Tab).
  ```css
  input:focus {
      border: 2px solid pink;
      outline: none;
  }
  ```
* `:focus-within` — Quando o próprio elemento **ou qualquer filho dele** ganha foco.
  ```css
  form:focus-within {
      background-color: #222; /* Destaca o formulário inteiro quando o usuário clica em qualquer input */
  }
  ```
* `:active` — No exato milissegundo em que o elemento é pressionado/clicado.
* `:visited` — Links (`<a>`) que o usuário já visitou no navegador.
* `:target` — O elemento cujo ID corresponde ao âncora atual da URL (ex: `site.com/#sobre`).

---

### B) Controle de Formulários
* `:placeholder-shown` — Seleciona o input **enquanto o placeholder estiver visível** (ou seja, quando o campo está totalmente vazio).
  ```css
  /* Estiliza o input apenas enquanto a pessoa NÃO começou a digitar nada */
  input:placeholder-shown {
      border-color: gray;
  }
  ```
* `:checked` — Caixas de seleção (`checkbox`), botões de rádio (`radio`) ou opções de `<select>` marcadas.
* `:disabled` / `:enabled` — Elementos desativados ou ativos.
* `:required` / `:optional` — Campos que possuem o atributo `required` ou não.
* `:valid` / `:invalid` — Campos cujos dados inseridos passam ou falham na validação HTML5.

---

### C) Estruturais e Posicionamento (Navegação na Árvore HTML)
* `:root` — Representa a raiz do documento (`<html>`). É o local oficial para declarar variáveis globais CSS.
  ```css
  :root {
      --cor-destaque: pink;
  }
  ```
* `:first-child` — O elemento se for o **primeiro filho** do seu container pai.
* `:last-child` — O elemento se for o **último filho** do seu container pai.
* `:nth-child(n)` — Seleciona elementos por número ou padrão (par/ímpar/fórmula).
  ```css
  li:nth-child(even) { background-color: #111; } /* Linhas pares */
  li:nth-child(odd)  { background-color: #222; } /* Linhas ímpares */
  li:nth-child(3n)   { color: pink; }            /* A cada 3 elementos */
  ```
* `:first-of-type` / `:last-of-type` — Primeiro ou último elemento **daquele tipo específico de tag** no container.
* `:only-child` — Seleciona o elemento apenas se ele for o único filho do pai.
* `:empty` — Seleciona elementos que estão totalmente vazios (sem texto nem tags filhas).

---

### D) Lógica e Filtros Avançados
* `:not(seletor)` — Seleciona tudo **exceto** o que corresponder ao seletor dentro dos parênteses.
  ```css
  button:not(.btn-desativado) {
      cursor: pointer;
  }
  ```
* `:has(seletor)` — **O Seletor Pai do CSS!** Seleciona um pai se ele contiver determinado filho.
  ```css
  /* Estiliza o card apenas se houver uma imagem dentro dele */
  .card:has(img) {
      padding: 0;
  }
  ```
* `:is()` e `:where()` — Agrupadores de seletores para evitar repetição de código.

---

## 3. Pseudo-elementos (::) — Partes de Texto e Elementos Fantasma

Pseudo-elementos criam partes virtuais da página sem alterar o HTML.

### A) Texto de Dica em Campos de Entrada
* `::placeholder` — Seleciona especificamente o texto de instrução temporário dentro de `<input>` ou `<textarea>`.

```css
/* Troca a cor do texto do placeholder */
input::placeholder {
    color: pink;
    opacity: 0.8;
}

/* Combinação: Altera o placeholder quando o mouse passa sobre o input */
input:hover::placeholder {
    color: #000;
}
```

---

### B) Elementos Virtuais Fantasma (`::before` e `::after`)
Criam conteúdos decorativos antes ou depois do conteúdo real do elemento. **Obrigatório usar a propriedade `content`**.

```css
/* Adiciona um ícone ou aspas antes de um bloco de citação */
blockquote::before {
    content: "“";
    font-size: 2em;
    color: pink;
}

/* Cria uma linha decorativa embaixo do título h1 */
h1::after {
    content: "";
    display: block;
    width: 50px;
    height: 3px;
    background-color: pink;
    margin-top: 5px;
}
```

---

### C) Tipografia e Seleção
* `::selection` — Controla o visual do texto quando o usuário **grifa/seleciona** com o mouse.
  ```css
  ::selection {
      background-color: pink;
      color: black;
  }
  ```
* `::first-letter` — Seleciona a primeiríssima letra de um bloco de texto (estilo letra capitular de jornal).
  ```css
  p::first-letter {
      font-size: 2.5em;
      font-weight: bold;
      color: pink;
  }
  ```
* `::first-line` — Seleciona a primeira linha de um parágrafo (muda dinamicamente se a janela encolher).

---

### D) Componentes da Interface do Navegador
* `::marker` — Estiliza a bolinha/número das listas (`<ul>`, `<ol>`, `<li>`) ou a setinha do `<details>`.
  ```css
  li::marker {
      color: pink;
      font-size: 1.2em;
  }
  ```
* `::file-selector-button` — Estiliza o botão interno de carregamento em `<input type="file">`.
* `::backdrop` — O fundo escuro/desfocado atrás de uma caixa modal `<dialog>` aberta ou vídeo em tela cheia.

---

## 4. Guia Rápido de Combinação Prática

Você pode combinar pseudo-classes e pseudo-elementos em uma mesma regra CSS:

```css
/* 1. Elemento base */
input { ... }

/* 2. Pseudo-classe (Estado do elemento) */
input:focus { ... }

/* 3. Pseudo-elemento (Parte interna do elemento) */
input::placeholder { ... }

/* 4. Combinação: Estado do elemento + Parte interna */
input:hover::placeholder { ... }
input:focus::placeholder { ... }
```

---

## 5. Resumo de Bolso

| O que você quer estilizar? | O que usar? | Exemplo |
| :--- | :--- | :--- |
| Mudar cor ao passar o mouse | Pseudo-classe (`:`) | `button:hover` |
| Estilizar o campo quando focado | Pseudo-classe (`:`) | `input:focus` |
| Estilizar a primeira linha de uma lista | Pseudo-classe (`:`) | `li:first-child` |
| Mudar a cor da dica dentro do input | Pseudo-elemento (`::`) | `input::placeholder` |
| Criar uma linha ou detalhe decorativo no CSS | Pseudo-elemento (`::`) | `h1::after` |
| Mudar a cor da seleção do mouse na tela | Pseudo-elemento (`::`) | `::selection` |
| Mudar a cor da bolinha de uma lista | Pseudo-elemento (`::`) | `li::marker` |
