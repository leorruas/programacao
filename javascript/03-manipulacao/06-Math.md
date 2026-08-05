# O objeto math: a calculadora científica do JavaScript - método Feynman

No [[javascript/Introdução ao JavaScript\|JavaScript]], o **Math** é um [[javascript/02-funções-e-objetos/03-Objetos\|Objetos]] embutido (built-in) que fornece propriedades e métodos para realizar operações matemáticas e trabalhar com constantes.

Sob a perspectiva da **Tecnologia do Dia a Dia**, o `Math` funciona exatamente como um aplicativo de **Calculadora Científica do Celular**.

---

## A analogia da calculadora científica

Imagine que você precisa resolver uma equação de engenharia ou calcular a raiz de um número:

*   **A Calculadora Física (O [[javascript/02-funções-e-objetos/03-Objetos\|Objetos]] Math):** Você não precisa "construir" uma calculadora do zero toda vez que quer fazer uma conta (você não usa `new Math()`). A calculadora já vem pronta de fábrica instalada no celular. Você só a abre e usa.
*   **Os Botões de Constantes (Propriedades):** São botões pré-programados na sua calculadora, como o botão **π (PI)** ou **e (Euler)**. Ao apertá-los, a calculadora te entrega o número exato imediatamente.
*   **Os Botões de Operação (Métodos):** São os botões como **raiz quadrada (√)**, **seno (sin)** ou **arredondamento**. Você insere um número (argumento), aperta o botão e ele te cospe o resultado processado.

---

## 1. As constantes matemáticas (os botões de valor fixo)

O `Math` disponibiliza 8 constantes matemáticas precisas prontas para uso:

| Propriedade | Valor Aproximado | Analogia / O que é |
| :--- | :--- | :--- |
| `Math.PI` | `3.14159` | O famoso PI, usado para calcular circunferências e áreas de círculos. |
| `Math.E` | `2.718` | A base dos logaritmos naturais (Constante de Euler). |
| `Math.LN2` | `0.693` | O logaritmo natural do número 2. |
| `Math.LN10` | `2.302` | O logaritmo natural do número 10. |
| `Math.LOG2E` | `1.442` | O logaritmo de E na base 2. |
| `Math.LOG10E` | `0.434` | O logaritmo de E na base 10. |
| `Math.SQRT1_2` | `0.707` | A raiz quadrada de 1/2. |
| `Math.SQRT2` | `1.414` | A raiz quadrada do número 2. |

---

## 2. Arredondamento e fração (formatando os números)

Em programação, é muito comum precisar ajustar números quebrados para inteiros. A nossa calculadora tem botões específicos para cada tipo de arredondamento:

*   **`Math.round(x)`**: Arredonda para o inteiro mais próximo (se for `.5` ou mais, sobe; se for menor, desce).
    ```javascript
    Math.round(4.5); // Saída: 5
    Math.round(4.4); // Saída: 4
    ```
*   **`Math.floor(x)`**: O "cortador de teto". Ele sempre arredonda para baixo, em direção ao menor inteiro.
    ```javascript
    Math.floor(4.9); // Saída: 4
    Math.floor(-4.1); // Saída: -5
    ```
*   **`Math.ceil(x)`**: O "empurrador para cima". Ele sempre arredonda para cima, em direção ao maior inteiro.
    ```javascript
    Math.ceil(4.1); // Saída: 5
    ```
*   **`Math.trunc(x)`**: A "guilhotina de decimais". Ele simplesmente ignora tudo que está depois da vírgula, sem arredondar nada.
    ```javascript
    Math.trunc(4.99); // Saída: 4
    Math.trunc(-4.99); // Saída: -4
    ```
*   **`Math.fround(x)`**: Retorna a precisão flutuante de 32 bits mais próxima do número (usado para otimização de baixo nível).

---

## 3. Sinais, comparações e sorteio (lógica matemática)

*   **`Math.abs(x)`**: O "eliminador de negatividade". Ele ignora o sinal e retorna o módulo do número (valor absoluto sempre positivo).
    ```javascript
    Math.abs(-15); // Saída: 15
    ```
*   **`Math.sign(x)`**: Identifica a natureza do número. Retorna `1` se for positivo, `-1` se for negativo, e `0` se for zero.
    ```javascript
    Math.sign(-85); // Saída: -1
    ```
*   **`Math.max(n1, n2, ...)`** e **`Math.min(n1, n2, ...)`**: Analisam uma lista de números e dizem quem é o maior ou o menor.
    ```javascript
    Math.max(5, 12, 3); // Saída: 12
    Math.min(5, 12, 3); // Saída: 3
    ```
*   **`Math.random()`**: O "dado invisível". Gera um número decimal aleatório maior ou igual a `0` e menor que `1`. Para sortear um número inteiro de 1 a 10:
    ```javascript
    const sorteio = Math.floor(Math.random() * 10) + 1;
    ```

---

## 4. Potências e raízes (cálculos de dimensão)

*   **`Math.pow(base, expoente)`**: Eleva um número a uma potência.
    ```javascript
    Math.pow(2, 3); // Saída: 8 (2 elevado ao cubo)
    ```
*   **`Math.sqrt(x)`**: Calcula a raiz quadrada (qual número multiplicado por ele mesmo dá `x`).
    ```javascript
    Math.sqrt(16); // Saída: 4
    ```
*   **`Math.cbrt(x)`**: Calcula a raiz cúbica.
    ```javascript
    Math.cbrt(27); // Saída: 3
    ```
*   **`Math.hypot(a, b, ...)`**: O Teorema de Pitágoras automático. Calcula a hipotenusa com base nos catetos inseridos.
    ```javascript
    Math.hypot(3, 4); // Saída: 5 (raiz de 3² + 4² = raiz de 25)
    ```

---

## 5. Exponenciais e logaritmos

Usados para cálculos matemáticos avançados (crescimento populacional, escalas de som, etc.):

*   **`Math.exp(x)`**: Retorna a constante de Euler elevada a `x` (\(e^x\)).
*   **`Math.expm1(x)`**: Retorna \(e^x - 1\) (útil para altíssima precisão).
*   **`Math.log(x)`**: Retorna o logaritmo natural (base `E`) de um número.
*   **`Math.log1p(x)`**: Retorna o logaritmo natural de \(1 + x\).
*   **`Math.log10(x)`**: Retorna o logaritmo na base 10.
*   **`Math.log2(x)`**: Retorna o logaritmo na base 2.

---

## 6. Trigonometria (trabalhando com círculos e triângulos)

> [!IMPORTANT]
> A calculadora do [[javascript/Introdução ao JavaScript\|JavaScript]] trabalha exclusivamente em **radianos**, não em graus. Para converter graus para radianos, use a fórmula: `radianos = graus * (Math.PI / 180)`.

### Funções padrão
*   **`Math.sin(x)`**: Seno do ângulo `x`.
*   **`Math.cos(x)`**: Cosseno do ângulo `x`.
*   **`Math.tan(x)`**: Tangente do ângulo `x`.

### Funções arco (inversas)
*   **`Math.asin(x)`**: Arco seno.
*   **`Math.acos(x)`**: Arco cosseno.
*   **`Math.atan(x)`**: Arco tangente.
*   **`Math.atan2(y, x)`**: Retorna o arco tangente do quociente de suas coordenadas `y` e `x`. Muito usado no desenvolvimento de jogos e física de telas para girar elementos em direção ao mouse.

### Funções hiperbólicas
*   **`Math.sinh(x)`** / **`Math.cosh(x)`** / **`Math.tanh(x)`**: Seno, cosseno e tangente hiperbólicos.
*   **`Math.asinh(x)`** / **`Math.acosh(x)`** / **`Math.atanh(x)`**: Inversas trigonométricas hiperbólicas.

---

## 7. Métodos avançados de baixo nível

Métodos de otimização numérica binária direta no hardware de 32 bits:

*   **`Math.clz32(x)`**: Retorna a quantidade de bits zero à esquerda da representação binária de 32 bits do número.
*   **`Math.imul(x, y)`**: Multiplicação de inteiros no estilo da linguagem C (útil para otimizar bibliotecas de jogos ou motores gráficos em JS).

---

## Resumo para memorizar

*   **Math:** É a calculadora estática embutida no [[javascript/Introdução ao JavaScript\|JavaScript]] (não precisa de `new`).
*   **Arredondamento:** `round` (próximo), `floor` (baixo), `ceil` (cima), `trunc` (corta decimal).
*   **Sorteio:** `Math.random()` gera decimais de 0 a 0.999...
*   **Radianos:** Lembre-se de sempre converter seus graus antes de usar métodos trigonométricos!
