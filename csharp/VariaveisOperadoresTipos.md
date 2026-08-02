# Variáveis, Operadores e Tipos de Dados em C#

Aprender programação é muito parecido com aprender matemática básica e organizar seus brinquedos em caixas. Vamos entender as três ferramentas fundamentais: caixas, regras de tipos e os operadores que fazem as contas.

---

## 1. O que são Variáveis e Tipos de Dados?

Uma **variável** é uma caixinha na memória do computador onde guardamos alguma informação útil. Como o C# se preocupa muito com a [Segurança de Tipos](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/SegurancaDeTipos.md), cada caixa tem um formato rígido (o **tipo de dado**).

Aqui estão os formatos de caixas mais comuns:

### Caixas Numéricas:
* `int`: Guarda apenas números inteiros (como `10`, `-5`, `0`). Pense nela como um pote para guardar bolinhas de gude (você não guarda meia bolinha).
* `double` ou `float`: Guarda números quebrados (como `1.75` ou `3.14`). É como um copo de medição de água onde você pode medir mililitros quebrados.

### Caixas de Letras/Texto:
* `char`: Guarda uma única letra ou caractere, sempre entre aspas simples (ex: `'A'`, `'7'`, `'$'`). É como uma pecinha de letra de um jogo de tabuleiro.
* `string`: Guarda textos completos, frases ou palavras, sempre entre aspas duplas (ex: `"Olá, Mundo!"`). É como uma faixa com uma frase escrita.

### Caixas de Sim ou Não:
* `bool` (Booleano): Guarda apenas dois valores: `true` (verdadeiro) ou `false` (falso). É como um interruptor de luz que só pode estar ligado ou desligado.

---

## 2. O que são Operadores?

Os **operadores** são símbolos matemáticos ou lógicos que nos ajudam a manipular o conteúdo das caixas.

### Operadores Matemáticos (Contas):
* `+` (Soma): Junta valores ou textos.
* `-` (Subtração): Retira um valor do outro.
* `*` (Multiplicação): Multiplica.
* `/` (Divisão): Divide.
* `%` (Resto da divisão): Descobre o que sobrou de uma divisão inteira (ex: `5 % 2` é igual a `1`).

### Operadores de Comparação (Perguntas):
* `==` (Igual a): Pergunta se dois valores são iguais.
* `!=` (Diferente de): Pergunta se dois valores são diferentes.
* `>` (Maior que) e `<` (Menor que).

---

## 3. Código de Exemplo: Tudo junto!

Veja como combinamos caixas e operadores no C#:

```csharp
int moedasNaCarteira = 10;
int moedasNoChao = 5;

// Usando o operador + para somar e colocar na caixa total
int totalMoedas = moedasNaCarteira + moedasNoChao; // Guarda 15

// Usando operadores de comparação para tomar decisões
bool consigoComprarChocolate = (totalMoedas > 12); // Guarda true ou false
```

---

## Artigos Relacionados:
* **[Introdução ao C#](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/Introducao.md)**
* **[Segurança de Tipos](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/SegurancaDeTipos.md)**
* **[Estruturas Condicionais e de Repetição](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/EstruturasCondicionaisRepeticao.md)**
* **[Arrays em C#](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/Arrays.md)**
