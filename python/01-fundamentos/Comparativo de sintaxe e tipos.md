# Comparativo de sintaxe e tipos: Python vs. JavaScript

Aprender uma segunda linguagem de programação é como **aprender um segundo idioma da mesma família linguística** (como aprender espanhol já sabendo português). A estrutura básica de raciocínio é a mesma, mas os vocábulos, a pontuação e as regras de gramática variam.

Este documento serve como um dicionário de tradução entre o [[javascript/Introdução ao JavaScript\|JavaScript]] (idioma que você já conhece) e o [[python/Introdução ao Python\|Python]] (o novo idioma).

---

## 1 - declaração de variáveis (criação de termos)

No [[javascript/Introdução ao JavaScript\|JavaScript]], precisamos de palavras-chave para criar variáveis e definir suas regras de [[javascript/06-arquitetura-e-avancado/Escopo e closures\|Escopo e Closures]]. No [[python/Introdução ao Python\|Python]], a declaração é direta e implícita.

| Ação | [[javascript/Introdução ao JavaScript\|JavaScript]] | [[python/Introdução ao Python\|Python]] |
| :--- | :--- | :--- |
| Variável Mutável | `let nome = "Leo";` | `nome = "Leo"` |
| Variável Constante | `const pi = 3.14;` | `PI = 3.14` (Apenas convenção em maiúsculo, a linguagem não bloqueia a alteração) |
| Fim de Instrução | Exige ponto e vírgula `;` (opcional mas recomendado) | Quebra de linha direta (sem ponto e vírgula) |

---

## 2 - dicionário de tipos de dados

Aqui está o paralelo de como cada idioma classifica as informações na memória:

### Números
*   **[[javascript/Introdução ao JavaScript\|JavaScript]]:** Usa um único tipo `Number` para tudo.
    ```javascript
    let idade = 25; // Number
    let preco = 19.90; // Number
    ```
*   **[[python/Introdução ao Python\|Python]]:** Separa estritamente inteiros de decimais.
    ```python
    idade = 25 # Tipo: int (inteiro)
    preco = 19.90 # Tipo: float (decimal)
    ```

### Textos (strings)
*   **[[javascript/Introdução ao JavaScript\|JavaScript]]:** Usa aspas simples, duplas ou crases para strings.
    ```javascript
    const texto = `Ola ${nome}`; // Aceita crases para interpolação
    ```
*   **[[python/Introdução ao Python\|Python]]:** Usa aspas simples ou duplas. Não existem crases. Para interpolar, usa-se a letra `f` na frente da string.
    ```python
    texto = f"Ola {nome}" # f-string (equivalente ao template string)
    ```

### Lógicos (booleanos)
*   **[[javascript/Introdução ao JavaScript\|JavaScript]]:** Letras minúsculas: `true` e `false`.
*   **[[python/Introdução ao Python\|Python]]:** Letras iniciais maiúsculas: `True` e `False`.

### O vazio (ausência de valor)
*   **[[javascript/Introdução ao JavaScript\|JavaScript]]:** Separa em `undefined` (não definido pelo sistema) e `null` (esvaziado pelo programador).
*   **[[python/Introdução ao Python\|Python]]:** Não possui `undefined` (tentar usar algo inexistente gera erro imediatamente). Usa a palavra `None` para representar o valor nulo de propósito.

---

## 3 - estruturas de dados (coleções)

Como agrupar múltiplos dados em cada linguagem:

### Listas
*   **[[javascript/Introdução ao JavaScript\|JavaScript]]:** Chamado de `Array`.
    ```javascript
    const lista = [1, 2, 3];
    ```
*   **[[python/Introdução ao Python\|Python]]:** Chamado de `list`.
    ```python
    lista = [1, 2, 3]
    ```

### Fichas cadastrais (chave e valor)
*   **[[javascript/Introdução ao JavaScript\|JavaScript]]:** Chamado de `Object`. Permite chaves sem aspas.
    ```javascript
    const usuario = { nome: "Ana", idade: 25 };
    ```
*   **[[python/Introdução ao Python\|Python]]:** Chamado de `dict` (Dicionário). Exige aspas duplas em todas as chaves.
    ```python
    usuario = {"nome": "Ana", "idade": 25}
    ```

---

## Resumo gramatical para memorizar

*   **[[javascript/Introdução ao JavaScript\|JavaScript]]:** Usa chaves `{}` para blocos, parênteses `()` para condições e exige declaração explícita (`let`/`const`).
*   **[[python/Introdução ao Python\|Python]]:** Usa indentação (espaçamento) obrigatória para blocos de código, dispensa parênteses em condições e declara variáveis apenas atribuindo valores diretamente.
