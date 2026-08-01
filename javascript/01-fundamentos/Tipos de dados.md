# Entendendo tipos de dados - método Feynman

Em [[javascript/Introdução ao JavaScript\|JavaScript]], toda informação que guardamos em uma variável pertence a um tipo específico.

Sob a perspectiva da **Semiótica (o estudo dos signos e convenções de significado)**, os tipos de dados são as convenções que estabelecemos para que o computador saiba como interpretar e dar sentido a um valor na memória. Um valor bruto como `320` não significa nada sozinho; é a tipagem que atua como o código de interpretação, definindo se ele deve ser lido como uma palavra textual, uma coordenada matemática ou um interruptor lógico.

No [[javascript/Introdução ao JavaScript\|JavaScript]], os tipos de dados funcionam exatamente assim para que o interpretador saiba quais regras semânticas ele pode aplicar a cada variável.

---

## Os principais tipos de dados (primitivos)

O [[javascript/Introdução ao JavaScript\|JavaScript]] possui tipos básicos que representam valores simples e imutáveis:

### 1. String (texto)
Representa qualquer sequência de caracteres de texto. Deve ser escrita sempre entre aspas (duplas, simples ou crases). Veja também [[javascript/03-manipulacao/Template strings\|Template Strings]] para criação de textos dinâmicos.
```javascript
const nome = "Ana";
const textoBotao = 'Clique aqui';
```

### 2. Number (número)
Diferente de outras linguagens que separam números inteiros de números decimais, no [[javascript/Introdução ao JavaScript\|JavaScript]] todo número é do tipo `Number` (seja inteiro ou quebrado).
```javascript
const largura = 320;
const preco = 49.90;
```

#### O que é nan (not a number)?
O `NaN` é um valor especial do tipo `Number` que o [[javascript/Introdução ao JavaScript\|JavaScript]] retorna quando uma operação matemática falha ou tenta processar algo inválido.
*   **Analogia de Design:** É como digitar a palavra "laranja" no input de largura (Width) de um componente no Figma. Como o sistema espera um número para fazer o cálculo de dimensão e você passou um texto inválido, a operação matemática falha.
*   **Como ocorre no código:**
    ```javascript
    const resultadoInvalido = "abacaxi" * 10;
    console.log(resultadoInvalido); // Saída: NaN
    
    console.log(typeof NaN); // Saída: "number" (curiosamente, seu tipo técnico ainda é number)
    ```

### 3. Boolean (booleano / lógico)
Aceita apenas dois valores possíveis: `true` (verdadeiro) ou `false` (falso). É o equivalente aos interruptores ou chaves liga/desliga de design.
```javascript
const ativo = true;
const exibirMenu = false;
```

### 4. Undefined (indefinido)
Significa que uma variável foi criada, mas ainda não recebeu nenhum valor. É uma gaveta vazia com uma etiqueta na frente, mas sem nada dentro.
```javascript
let configuracao;
console.log(configuracao); // Saída: undefined
```

### 5. Null (nulo)
Representa a ausência intencional de valor. Você escolhe deixar a variável vazia de propósito (diferente do `undefined`, que acontece de forma automática).
```javascript
const selecaoAtual = null; // Nenhuma camada selecionada no momento
```

### 6. Symbol (símbolo / identificador único)
Representa um identificador totalmente único e exclusivo. Mesmo se você criar dois Symbols com a mesma descrição, eles serão tratados como coisas completamente diferentes pelo [[javascript/Introdução ao JavaScript\|JavaScript]].
* **Analogia de Design:** É como o **ID interno único** que o Figma gera para cada camada. Você pode criar 5 retângulos chamados `"Card"` na sua tela (com o mesmo nome e estilo), mas por trás das cenas o Figma dá um ID secreto e único para cada um saber quem é quem.
```javascript
const idBotao1 = Symbol("botao");
const idBotao2 = Symbol("botao");

console.log(idBotao1 === idBotao2); // Saída: false (são absolutamente únicos!)
```

### 7. Bigint (números gigantes)
Usado para armazenar números inteiros muito grandes que ultrapassam o limite seguro do tipo `Number` convencional.
* **Analogia de Design:** Pense no limite de tamanho máximo do canvas do Figma. Se você tentar criar um frame de tamanho infinito, você atinge o limite do software. O `BigInt` serve para quando você precisa trabalhar com cálculos astronômicos que quebram a matemática comum do computador.
```javascript
const numeroGigante = 9007199254740991n; // Termina com a letra 'n'
```

---

## Tipos complexos (objetos e arrays)

Além dos tipos primitivos simples, temos estruturas que agrupam múltiplos dados:

*   **Object ([[javascript/01-fundamentos/Objetos\|Objetos]]):** Um grupo de propriedades do tipo chave e valor. Veja a nota completa em [[javascript/01-fundamentos/Objetos]].
*   **Array (Lista):** Uma lista ordenada de valores. Veja métodos para manipulá-las em [[javascript/03-manipulacao/Métodos de array]].

```javascript
// Objeto (Ficha)
const usuario = {
  nome: "Léo",
  idade: 28
};

// Array (Lista)
const coresTema = ["#000000", "#ffffff", "#0a84ff"];
```

---

## Tipos dinâmicos: a flexibilidade do JavaScript

O [[javascript/Introdução ao JavaScript\|JavaScript]] é uma linguagem de **tipagem dinâmica**. Isso significa que você não precisa declarar qual o tipo de dado que uma variável vai guardar, e que o tipo dela pode mudar se você reatribuir um novo valor (embora essa prática deva ser evitada para manter o código seguro).

```javascript
let dado = 10;      // Começou como Number
dado = "Dez";       // Mudou para String sem gerar erros
```

---

## Resumo para memorizar

*   **String:** Textos, sempre entre aspas.
*   **Number:** Números (inteiros ou decimais), escritos direto sem aspas.
*   **Boolean:** Chave liga/desliga (`true` ou `false`).
*   **Undefined:** Variável criada sem valor atribuído.
*   **Null:** Variável esvaziada intencionalmente.
*   **Symbol:** Identificador único gerado pelo sistema (como o ID interno das camadas no Figma).
*   **BigInt:** Números inteiros astronômicos que superam a matemática do Number padrão.
*   **Tipagem Dinâmica:** O [[javascript/Introdução ao JavaScript\|JavaScript]] descobre o tipo de dado sozinho com base no valor que você digita.
