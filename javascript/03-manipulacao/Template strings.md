# Template strings - método Feynman

Template Strings (ou Template Literals) são uma forma moderna e mais simples de criar textos (strings) em [[javascript/Introdução ao JavaScript\|JavaScript]]. Em vez de usar aspas comuns (simples ou duplas), usamos crases (backticks: `` ` ``).

Para um designer, os Template Strings funcionam exatamente como os **Campos de Texto Dinâmicos do Figma** (Text Variables). Imagine criar um componente onde você escreve "Olá, [Nome do Usuário]!". Quando o componente é renderizado na tela, o Figma substitui o espaço reservado pelo nome real do usuário. O Template String faz o mesmo no código.

---

## O jeito antigo vs. o jeito moderno

### O jeito antigo (concatenação com "+")
Para juntar texto fixo com variáveis, tínhamos que somar os blocos de texto um por um. Isso frequentemente gerava erros por falta de espaços ou aspas esquecidas.

```javascript
const usuario = "Leo";
const notificacoes = 5;

// Concatenação confusa
const mensagem = "Ola, " + usuario + "! Voce tem " + notificacoes + " novas notificacoes.";
console.log(mensagem);
```

### O jeito moderno (template string com crases)
Usando crases, escrevemos o texto normalmente e inserimos qualquer variável ou código dinâmico dentro de `${}`.

```javascript
const usuario = "Leo";
const notificacoes = 5;

// Template String limpo e legível
const mensagem = `Ola, ${usuario}! Voce tem ${notificacoes} novas notificacoes.`;
console.log(mensagem);
```

---

## Duas grandes vantagens dos template strings

### 1 - inserir operações diretas
Você não precisa colocar apenas variáveis dentro de `${}`. Você pode colocar qualquer expressão ou operação matemática direta.
```javascript
const preco = 100;
const desconto = 15;

// Faz o cálculo da diferença diretamente dentro do texto
const recibo = `Preco com desconto: R$ ${preco - desconto}`;
console.log(recibo); // Saída: "Preco com desconto: R$ 85"
```

### 2 - quebras de linha sem sujeira
Com aspas tradicionais, quebrar a linha no código gerava erros. Com crases, você pode quebrar as linhas do seu texto diretamente no editor e o [[javascript/Introdução ao JavaScript\|JavaScript]] respeitará o espaçamento exato.
```javascript
// Útil para criar blocos de HTML dinâmicos
const cardHTML = `
  <div class="card">
    <h2>Titulo do Card</h2>
    <p>Descricao do conteudo.</p>
  </div>
`;
```

---

## Resumo para memorizar

*   **Template String:** Strings declaradas com crases (backticks: `` ` ``).
*   **Interpolação:** A capacidade de inserir variáveis e expressões dinâmicas usando `${expressao}` (como campos dinâmicos no Figma).
*   **Quebra de Linha:** Aceita múltiplas linhas escritas diretamente no código sem precisar usar caracteres especiais como `\n`.
