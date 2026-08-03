# Regex (expressões regulares): os filtros inteligentes de texto - método Feynman

As **expressões regulares** (conhecidas como **regex**) são padrões de busca formados por sequências de caracteres. Elas servem para fazer buscas ultra complexas, substituições de texto em lote ou validações de formatos específicos (como checar se o texto digitado em um formulário realmente segue o formato de um e-mail válido ou telefone).

Sob a perspectiva da **Linguística e Decodificação de Códigos (Criptografia de Guerra)**, o regex funciona exatamente como uma **máquina de decodificação de mensagens com gabaritos vazados**.

---

## A analogia da descriptografia de mensagens

Imagine que você é um decodificador de mensagens interceptando transmissões de rádio inimigas durante uma guerra. Você não sabe o conteúdo exato das mensagens, mas o setor de inteligência descobriu os padrões estruturais que os espiões usam para enviar coordenadas de ataques:

*   **O gabarito padrão (A expressão regular):** A inteligência informa que as coordenadas sempre seguem o padrão: *três letras maiúsculas, seguidas por um hífen e quatro números* (ex: `ABC-1234`). Isso é o regex: a regra que descreve a forma das mensagens, não as palavras exatas.
*   **A busca na esteira (A correspondência):** Você joga a sua folha de gabarito por cima dos calhamaços de cartas interceptadas. Apenas as cartas que contiverem um texto que se encaixe perfeitamente vazado pelas fendas do seu gabarito (como `SPX-9872` ou `RJX-0012`) serão reveladas. O que não se encaixar no molde é ignorado.

---

## Como escrever expressões regulares no JavaScript

No [[javascript/Introdução ao JavaScript\|JavaScript]], criamos um regex colocando o padrão que queremos buscar entre duas barras inclinadas `/padrao/`.

### 1 - o teste básico de validação
Usamos o método `.test()` para checar se um texto segue as regras do nosso molde, retornando verdadeiro ou falso:

```javascript
// O molde procura a palavra exata "Next.js" de forma estrita
const molde = /Next\.js/; 

console.log(molde.test("Estou estudando Next.js no momento.")); // Saída: true
console.log(molde.test("Estou estudando JavaScript puro.")); // Saída: false
```

### 2 - o poder das classes de caracteres (os moldes coringa)
Em vez de buscar palavras fixas, o regex usa símbolos especiais (metacaracteres) para criar regras dinâmicas:

*   `\d` - Qualquer número de 0 a 9 (d de *digit*).
*   `[A-Z]` - Qualquer letra de A a Z maiúscula.
*   `{n}` - A quantidade exata de repetições.

Vamos construir o padrão de coordenadas da nossa analogia (`ABC-1234`):

```javascript
// Procura: 3 letras maiúsculas, um hífen, e 4 números
const padraoCoordenada = /[A-Z]{3}-\d{4}/;

console.log(padraoCoordenada.test("A coordenada é SPX-9872")); // Saída: true
console.log(padraoCoordenada.test("A coordenada é spx-9872")); // Saída: false (letras minúsculas)
console.log(padraoCoordenada.test("A coordenada é SPX-98"));   // Saída: false (falta números)
```

---

## Modificadores comuns (flags)

Você pode adicionar pequenas letras (flags) após a barra final do regex para alterar o comportamento da busca:

*   `/padrao/i` - **Case Insensitive:** Ignora a diferença entre letras maiúsculas e minúsculas (ex: `/gato/i` encontra "Gato", "GATO" ou "gato").
*   `/padrao/g` - **Global:** Busca e captura todas as ocorrências do texto ao longo de todo o documento, em vez de parar na primeira que encontrar.

---

## Conexões com o restante do vault

*   O regex é a ferramenta interna por trás das validações de dados recebidos por campos de texto de formulários monitorados por **[[javascript/04-dom-e-browser/04-Eventos|Eventos]]**.
*   Ele é muito utilizado ao sanitizar strings antes de enviá-las para bases de dados através de requisições de **[[javascript/05-assincrono/03-Fetch|Fetch]]**.
*   Em Javascript moderno, podemos usá-lo dentro de diversos **[[javascript/03-manipulacao/03-Métodos de array|Métodos de array]]** para filtrar listas complexas de textos.

---

## Resumo para memorizar

*   **Regex:** Um padrão de busca estruturado para identificar e validar formatos de texto.
*   **`/padrao/`:** A sintaxe nativa para declarar uma expressão regular no [[javascript/Introdução ao JavaScript\|JavaScript]].
*   **`.test(texto)`:** O método que valida se o texto passado atende às regras do regex, retornando `true` ou `false`.
