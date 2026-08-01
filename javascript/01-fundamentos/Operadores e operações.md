# Operações e operadores - método Feynman

Em [[javascript/Introdução ao JavaScript\|JavaScript]], **Operadores** são símbolos especiais que usamos para realizar **Operações** com nossos [[javascript/01-fundamentos/Tipos de dados\|dados]] (somar, comparar, validar condições, etc.).

Sob a perspectiva da **Economia**, os operadores funcionam como as **fórmulas de transações e fluxo de caixa**. Toda operação financeira exige ferramentas para calcular saldos (adição/subtração), projetar lucros (multiplicação) ou testar condições fiscais (ex: se o saldo é maior ou igual ao preço da compra para liberar a liberação do produto).

---

## 1 - operadores aritméticos (cálculos matemáticos)
Usamos para fazer contas matemáticas com números. No design, isso é equivalente aos cálculos matemáticos que você faz diretamente nos inputs numéricos do Figma (ex: digitar `100% - 24px` ou `W: 120 * 2`).

| Operador | Operação | Exemplo no Código | Equivalente no Design |
| :--- | :--- | :--- | :--- |
| `+` | Adição (ou Concatenação) | `10 + 20` (30) / `"Olá " + "Mundo"` | Somar largura de dois cards / Juntar dois textos |
| `-` | Subtração | `100 - 24` (76) | Reduzir espaçamento de margem |
| `*` | Multiplicação | `16 * 2` (32) | Duplicar tamanho de um ícone |
| `/` | Divisão | `100 / 4` (25) | Dividir uma linha em 4 colunas iguais |
| `%` | Resto da Divisão | `5 % 2` (1) | Descobrir se um número de colunas é par ou ímpar |

### O truque do operador unário "+" (conversão de texto para número)
Em [[javascript/Introdução ao JavaScript\|JavaScript]], existe um atalho de escrita elegante usando o operador de adição `+` sozinho antes de uma string. Quando colocado antes de um texto que contém números, ele converte a string automaticamente em um tipo numérico (Number).
*   **Como funciona no código:**
    ```javascript
    const larguraTexto = "320"; // Tipo: String
    const larguraNumero = +larguraTexto; // Tipo: Number (valor 320)
    
    console.log(larguraNumero + 10); // Saída: 330 (matemática funciona!)
    ```
*   **Por que usar:** Evita ter que escrever [[javascript/01-fundamentos/Funções\|Funções]] maiores como `Number(texto)` ou `parseInt(texto)`. Mas atenção: se a string contiver letras (ex: `"320px"`), o operador retornará `NaN` (Not a Number/Não é um Número).

---

## 2 - operadores de comparação (checagem de condições)
Usamos para comparar dois valores e obter uma resposta de Verdadeiro (`true`) ou Falso (`false`). No Figma, isso funciona como as **regras lógicas condicionais de prototipagem** (ex: *"Se o input de texto estiver preenchido, habilite o botão"*).

> [!IMPORTANT]
> Em [[javascript/Introdução ao JavaScript\|JavaScript]], sempre prefira usar `===` (igualdade estrita) em vez de `==`. O operador de três iguais compara tanto o **valor** quanto o **tipo de dado**, evitando bugs inesperados.

| Operador | Comparação | Exemplo | Analogia de Design |
| :--- | :--- | :--- | :--- |
| `===` | Estritamente Igual | `cor === "#ffffff"` | "A cor selecionada é exatamente Branco?" |
| `!==` | Estritamente Diferente | `tamanho !== "large"` | "O componente selecionado não é o botão Large?" |
| `>` | Maior que | `largura > 1200` | "A largura da tela é maior que o breakpoint de Desktop?" |
| `<` | Menor que | `opacidade < 1` | "A opacidade da camada é menor que 100% (transparente)?" |
| `>=` | Maior ou Igual | `caracteres >= 8` | "A senha digitada tem 8 caracteres ou mais?" |
| `<=` | Menor ou Igual | `itens <= 5` | "A quantidade de itens cabe na tela sem precisar de scroll?" |

---

## 3 - operadores lógicos (combinação de regras)
Permitem combinar múltiplas comparações para criar lógicas mais complexas.

### E (___placeholder_37___) - ambas as condições precisam ser verdadeiras
*   **No código:** `condicaoA && condicaoB`
*   **A analogia da estrada (Avaliação de curto-circuito):** Funciona como passar por uma série de cabines de pedágio em uma estrada. O operador `&&` exige que todas as cabines estejam liberadas (valores verdadeiros ou [[javascript/01-fundamentos/Truthy e Falsy\|truthy]]) para que a viagem prossiga até o final:
    *   **O curto-circuito (Falsy barra na hora):** Se o operador encontrar qualquer cabine bloqueada (um valor **[[javascript/01-fundamentos/Truthy e Falsy\|Truthy e Falsy]]**, ex: `0` ou `""`), a viagem é interrompida imediatamente. O [[javascript/Introdução ao JavaScript\|JavaScript]] para a leitura na hora e **retorna o valor [[javascript/01-fundamentos/Truthy e Falsy\|Truthy e Falsy]] que causou o bloqueio** (ex: `'Gato' && false` retorna `false`; `(5 - 5) && (5 + 5)` calcula `0` no primeiro termo, que é [[javascript/01-fundamentos/Truthy e Falsy\|Truthy e Falsy]], e retorna `0` de imediato, sem calcular o segundo).
    *   **A chegada ao destino (Tudo liberado):** Se todas as cabines forem aprovadas (todos os termos forem [[javascript/01-fundamentos/Truthy e Falsy\|Truthy e Falsy]]), a viagem vai até o final da estrada e o [[javascript/Introdução ao JavaScript\|JavaScript]] **retorna o último valor verificado** na ponta direita (ex: `'Gato' && 'Cão'` retorna `'Cão'`; `(5 >= 5) && (3 < 6)` retorna `true` porque ambos são verdadeiros e o último é o booleano `true`).
    *   **Por que o [[javascript/Introdução ao JavaScript\|JavaScript]] retorna o último valor em vez de apenas "true"?**
        *   **A analogia da linha de montagem (Culinária):** Pense em um prato que precisa passar por três aprovações na cozinha: o Auxiliar, o Cozinheiro e o Chef Final. O operador `&&` atua como o inspetor. Se todas as etapas aprovam (são [[javascript/01-fundamentos/Truthy e Falsy\|Truthy e Falsy]]), o processo foi um sucesso completo. Em vez de escrever um relatório dizendo "Sucesso", o inspetor simplesmente pega o prato pronto da mão do Chef (o último valor verificado na ponta direita) e entrega para você.
        *   **Utilidade prática:** Isso permite reduzir a quantidade de código para renderizar e extrair variáveis de forma dinâmica. Em vez de criar um bloco `if` completo, fazemos a checagem e atribuição na mesma linha:
            ```javascript
            const usuarioLogado = true;
            const nomeUsuario = "Léo";
            
            // Retorna "Léo" direto porque o primeiro termo é verdadeiro
            const resultado = usuarioLogado && nomeUsuario;
            console.log(resultado); // Saída: "Léo"
            ```

### Ou (___placeholder_54___) - apenas uma das condições precisa ser verdadeira
*   **No código:** `condicaoA || condicaoB`
*   **A analogia dos ingredientes substitutos (Curto-circuito do OU):** Funciona como uma lista de substituições de ingredientes em uma receita. O operador `||` quer encontrar **apenas uma** opção disponível (valores verdadeiros ou [[javascript/01-fundamentos/Truthy e Falsy\|truthy]]) para prosseguir:
    *   **O curto-circuito (O primeiro [[javascript/01-fundamentos/Truthy e Falsy\|Truthy e Falsy]] vence):** Conforme lê da esquerda para a direita, assim que o `||` encontra o **primeiro valor verdadeiro ([[javascript/01-fundamentos/Truthy e Falsy\|Truthy e Falsy]])**, ele para a busca imediatamente. Ele ignora o restante do código à direita e **retorna o primeiro valor verdadeiro encontrado** (ex: `'Gato' || 'Cão'` retorna `'Gato'`; `false || "Óleo" || "Banha"` retorna `"Óleo"`, pois ignora a banha após achar o óleo).
    *   **O pior cenário (Tudo bloqueado):** Se todas as opções forem inválidas (todos os termos forem [[javascript/01-fundamentos/Truthy e Falsy\|Truthy e Falsy]]), ele vai até o final da linha e **retorna o último valor [[javascript/01-fundamentos/Truthy e Falsy\|Truthy e Falsy]] verificado** na ponta direita (ex: `null || undefined || 0` retorna `0`).
    *   **Utilidade prática (Valores padrão/Fallback):** É muito usado para definir um valor padrão caso o usuário não preencha uma informação:
        ```javascript
        const nomeDigitado = ""; // Falsy
        const nomePadrao = "Visitante"; // Truthy
        
        // Como o primeiro é falsy, ele avança e retorna o valor padrão
        const nomeExibido = nomeDigitado || nomePadrao;
        console.log(nomeExibido); // Saída: "Visitante"
        ```

### Não / negação (___placeholder_64___) - inverte o valor lógico
*   **No código:** `!valor`
*   **Analogia econômica:** Funciona como um teste de inadimplência ou restrição fiscal (ex: se `aprovado` é verdadeiro, `!aprovado` significa que a transação foi negada).
*   **Interação com [[javascript/01-fundamentos/Truthy e Falsy\|Truthy e Falsy]]**: Se aplicado a dados não booleanos, ele inverte a sua equivalência lógica (converte e inverte strings, arrays, números, etc., conforme explicado em [[javascript/01-fundamentos/Truthy e falsy|Truthy e Falsy]]).

---

## 4 - operadores de atribuição (definição e modificação de variáveis)
Usamos para atribuir valores a variáveis. Eles também podem funcionar de forma abreviada para realizar uma operação aritmética e atribuir o resultado de volta à variável ao mesmo tempo.

| Operador | Equivalente Completo | Exemplo no Código | Resultado final (com `x = 5` e `y = 10`) |
| :--- | :--- | :--- | :--- |
| `=` | `x = y` | `x = y` | `10` |
| `+=` | `x = x + y` | `x += y` | `15` |
| `-=` | `x = x - y` | `x -= y` | `-5` |
| `*=` | `x = x * y` | `x *= y` | `50` |
| `/=` | `x = x / y` | `x /= y` | `0.5` |
| `%=` | `x = x % y` | `x %= y` | `0` |
| `**=` | `x = x ** y` | `x **= y` | `9765625` |

### Exemplo em código:
```javascript
var x = 5;
var y = 10;

x += y;   // x = x + y (15)
x -= y;   // x = x - y (-5)
x *= y;   // x = x * y (50)
x /= y;   // x = x / y (0.5)
x %= y;   // x = x % y (0)
x **= y;  // x = x ** y (9765625)
```

---

## Resumo para memorizar

*   **Aritméticos (`+`, `-`, `*`, `/`):** Fazem contas (como ajustar dimensões no Figma).
*   **Comparação (`===`, `!==`, `>`, `<`):** Testam valores e retornam `true` ou `false` (como regras de breakpoint de tela).
*   **Lógicos (`&&`, `||`, `!`):** Combinam regras para criar condições inteligentes para a interface.
*   **Atribuição (`=`, `+=`, `-=`, etc.):** Definem ou atualizam valores de variáveis de forma simples ou combinada/abreviada.
