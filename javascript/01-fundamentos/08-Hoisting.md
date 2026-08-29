# Hoisting (elevação) - método Feynman

**Hoisting** (elevação ou içamento) é um comportamento padrão do [[javascript/Introdução ao JavaScript\|JavaScript]] onde as declarações de variáveis (como `var`, `let` e `const` explicadas em [[javascript/01-fundamentos/01-Var, let e const|Var, Let e Const]]) e [[javascript/02-funcoes-e-objetos/01-Funções\|funções]] são "puxadas" para o topo do seu [[javascript/06-arquitetura-e-avancado/03-Escopo e closures\|escopo]] de execução antes do código começar a rodar.

Para um designer, o hoisting é muito parecido com a **indexação automática de Componentes no Figma**: 
* Se você cria um Componente Master no rodapé de uma página, você ainda consegue arrastar instâncias dele no topo da página. O Figma "sabe" que ele existe porque indexou (elevou) a existência daquele componente antes de renderizar a visualização.
* No código, o [[javascript/Introdução ao JavaScript\|JavaScript]] lê todo o arquivo primeiro para registrar as [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] e variáveis declaradas antes de começar a executá-lo linha por linha.

---

## O hoisting de funções (o caso de sucesso)

As [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] tradicionais sofrem hoisting completo. Isso significa que você pode chamar uma [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] na Linha 1, mesmo se a definição dela estiver escrita apenas na Linha 10.

*   **Exemplo Prático:**
    ```javascript
    // Chamando o botão antes dele ser declarado no código
    renderizarBotao(); // Funciona perfeitamente! Saída: "Botão renderizado"

    function renderizarBotao() {
      console.log("Botão renderizado");
    }
    ```
*   **Por que isso acontece?** O [[javascript/Introdução ao JavaScript\|JavaScript]] move toda a estrutura da [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] `renderizarBotao` para o topo da execução por baixo dos panos.

---

## O hoisting de variáveis com ___placeholder_8___ (o bug do ___placeholder_9___)

Quando usamos a palavra-chave antiga `var`, o [[javascript/Introdução ao JavaScript\|JavaScript]] eleva apenas a **declaração** da variável, mas **não o valor** (inicialização) atribuído a ela.

*   **Exemplo Prático:**
    ```javascript
    console.log(corDeFundo); // Retorna: undefined (não dá erro, mas o valor é vazio)
    
    var corDeFundo = "#ffffff";
    
    console.log(corDeFundo); // Retorna: "#ffffff"
    ```
*   **O que o [[javascript/Introdução ao JavaScript\|JavaScript]] faz por trás das cenas (hoisting):**
    ```javascript
    var corDeFundo; // Declaração é elevada para o topo sem valor (inicia como undefined)
    
    console.log(corDeFundo); // Mostra undefined
    
    corDeFundo = "#ffffff"; // O valor é atribuído apenas aqui
    
    console.log(corDeFundo); // Mostra "#ffffff"
    ```

---

## O comportamento moderno com ___placeholder_11___ e ___placeholder_12___ (zona temporal morta)

Para evitar os bugs causados pelo hoisting do `var` (que retornava `undefined` silenciosamente em vez de avisar que a variável não existia ainda), o [[javascript/Introdução ao JavaScript\|JavaScript]] moderno com `let` e `const` mudou essa regra:

Se você tentar acessar uma variável declarada com `let` ou `const` antes de sua linha de criação, o [[javascript/Introdução ao JavaScript\|JavaScript]] gera um erro imediato (**ReferenceError**).

*   **Exemplo Prático:**
    ```javascript
    console.log(corTexto); // Erro: Cannot access 'corTexto' before initialization
    
    let corTexto = "#000000";
    ```
Esse espaço de tempo entre o início do código e a linha onde o `let`/`const` é declarado é chamado de **Temporal Dead Zone** (Zona Temporal Morta). É uma trava de segurança para garantir que você não use dados antes de estarem definidos.

---

## Resumo para memorizar

*   **Hoisting:** Ação de elevar a declaração de [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] e variáveis ao topo do arquivo antes de rodar o código.
*   **[[javascript/02-funcoes-e-objetos/01-Funções\|Funções]]:** São totalmente elevadas e podem ser usadas em qualquer ordem.
*   **`var`:** É elevado mas seu valor fica como `undefined`, gerando comportamento imprevisível.
*   **`let`/`const`:** Também são "preparados" pelo [[javascript/Introdução ao JavaScript\|JavaScript]], mas o acesso a eles é estritamente bloqueado antes da inicialização física no arquivo para garantir segurança.
