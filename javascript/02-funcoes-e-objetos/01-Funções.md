# Entendendo funções - método Feynman

Em [[javascript/Introdução ao JavaScript\|JavaScript]], uma **Função** é um bloco de código projetado para realizar uma tarefa específica. Ela permite que você salve um conjunto de instruções e as execute quantas vezes quiser, sem precisar reescrever o código todas as vezes.

Sob a perspectiva da **Música**, uma função funciona exatamente como um **refrão musical**. Em uma canção, o compositor não escreve a letra e as notas do refrão repetidamente a cada vez que ele deve tocar. Ele apenas escreve a estrutura do refrão uma vez e apenas o "chama" nas partes correspondentes da música. 

---

## A analogia da partitura e refrão

Imagine estruturar uma canção de forma inteligente:

*   **A Partitura (A Função):** É a partitura do refrão gravada em uma folha. Ela guarda o ritmo e as notas, esperando ser tocada.
*   **Os Instrumentos (Parâmetros / Argumentos):** São as variáveis que você pode passar para o refrão. Você pode tocá-lo no saxofone hoje e no piano amanhã, ou mudar o tom da execução.
*   **O Processo:** É a ação física dos músicos tocando os instrumentos seguindo a partitura.
*   **A Música Final (Retorno / Output):** É a onda sonora (o resultado final) produzida pela execução do refrão que chega aos ouvidos do público.

---

## Como escrever uma função no JavaScript

A sintaxe de uma função segue essa lógica de entrada (instrumento/tom), processo (tocar) e saída (som):

```javascript
// Declarando a função (Escrevendo a partitura do refrão)
function tocarRefrao(instrumento) {
  // O processo interno da música
  const somPronto = "Tocando refrão no " + instrumento;
  
  // O retorno (entregando a melodia final)
  return somPronto;
}
```

### Ativando a função (colocando a música para rodar)

Chamar ou executar uma função é o equivalente a mandar os músicos começarem a tocar o refrão na vida real, passando o instrumento escolhido:

```javascript
// Passamos "Piano" como instrumento (argumento)
const somCançao = tocarRefrao("Piano");

console.log(somCançao); // Saída: Tocando refrão no Piano
```

---

## Parâmetros vs. argumentos

A diferença básica é:
*   **Parâmetros:** São os espaços reservados ou variáveis definidas na criação da função (ex: o termo `instrumento` na declaração da função). É o "molde" ou a linha da partitura.
*   **Argumentos:** São os valores reais que você passa quando ativa (chama) a função (ex: a palavra `"Piano"` quando você chamou `tocarRefrao("Piano")`). É o dado concreto de entrada.

---

## Quando usar argumentos?

Use argumentos sempre que quiser que sua função seja **dinâmica** e **reutilizável**.
*   **Sem argumentos:** A função faz sempre exatamente a mesma coisa (estática).
*   **Com argumentos:** A função pode processar dados diferentes e produzir resultados diferentes a cada execução, evitando que você precise criar várias funções parecidas.

---

## Tipos de parâmetros e argumentos no JavaScript

No [[javascript/Introdução ao JavaScript\|JavaScript]], existem diferentes formas de trabalhar com parâmetros e argumentos para tornar o código mais flexível:

### 1. Parâmetros padrão (default parameters)
Permitem definir um valor padrão caso nenhum argumento seja passado para aquele parâmetro na chamada da função.
```javascript
function saudar(nome = "Visitante") {
  return "Olá, " + nome;
}

console.log(saudar());        // Saída: "Olá, Visitante"
console.log(saudar("Lucas")); // Saída: "Olá, Lucas"
```

### 2. Parâmetros rest (tamanho variável)
Usados quando você não sabe quantos argumentos serão passados. O operador rest (`...`) agrupa todos os argumentos restantes em um array.
```javascript
function somarNumeros(...numeros) {
  return numeros.reduce((total, num) => total + num, 0);
}

console.log(somarNumeros(10, 20, 30)); // Saída: 60
```

### 3. Argumentos nomeados (simulados via objeto)
O [[javascript/Introdução ao JavaScript\|JavaScript]] não tem argumentos nomeados nativos (como [[python/Introdução ao Python\|Python]]). No entanto, simulamos isso passando um **[[javascript/02-funções-e-objetos/03-Objetos\|Objetos]]** e fazendo a desestruturação nos parâmetros. É ideal para quando há muitos parâmetros, eliminando a dependência da ordem deles.
```javascript
function criarUsuario({ nome, idade, cargo }) {
  console.log(`Usuário ${nome}, ${idade} anos, trabalha como ${cargo}.`);
}

// A ordem não importa na chamada:
criarUsuario({ cargo: "Developer", nome: "Ana", idade: 25 });
```

---

## O comportamento e limite do ___placeholder_11___

A instrução `return` tem uma regra muito rígida no desenvolvimento de software: **ela só funciona e só faz sentido dentro de funções**.

O `return` serve para duas tarefas principais:
1. **Enviar um valor de volta** para onde a função foi chamada.
2. **Encerrar a execução** da função imediatamente. Qualquer linha de código abaixo de um `return` ativo dentro da função será ignorada.

> [!IMPORTANT]
> Se você tentar escrever um `return` no corpo principal do arquivo (fora de uma função) — mesmo que esteja dentro de uma estrutura `if` ou de um loop `for` —, o motor do [[javascript/Introdução ao JavaScript\|JavaScript]] gerará um erro e impedirá a execução do script:
> `SyntaxError: Illegal return statement` (Instrução de retorno ilegal).

### Exemplo:
```javascript
//  Correto: O return está contido dentro da função
function verificarAprovacao(nota) {
  if (nota >= 7) {
    return "Aprovado"; // A função para aqui se a nota for maior ou igual a 7
  }
  return "Reprovado"; // Só é executado se o return de cima não rodar
}

//  Incorreto (Gera Erro):
if (true) {
  return "Algo"; // SyntaxError: Illegal return statement
}
```

---

## Funções sem retorno (apenas ações)

Nem toda máquina precisa te devolver algo físico no final. Algumas apenas fazem uma ação externa. 

No [[javascript/Introdução ao JavaScript\|JavaScript]], uma função pode apenas exibir um aviso na tela ou alterar uma propriedade do [[javascript/04-dom-e-browser/01-DOM\|DOM]] (geralmente disparada por [[javascript/04-dom-e-browser/04-Eventos\|eventos]]), sem usar a palavra-chave `return`. A visibilidade das variáveis criadas dentro de uma função é protegida por regras que você pode ver em [[javascript/06-arquitetura-e-avancado/03-Escopo e closures|Escopo e closures]]. Além disso, funções frequentemente contêm tomadas de decisão internas usando [[javascript/01-fundamentos/05-Condicionais (if-else)|Condicionais (If-Else)]] (como mudar a melodia dependendo do tom recebido nos argumentos).

```javascript
function exibirAviso() {
  console.log("Atenção: Conexão lenta detectada.");
}

exibirAviso(); // Apenas executa a ação de escrever no console
```

---

## Resumo para memorizar

*   **Função:** Um bloco de código reutilizável que executa uma tarefa.
*   **Parâmetro:** O espaço reservado para os dados de entrada na definição da função.
*   **Argumento:** O valor real enviado à função no momento da sua chamada.
*   **Return:** A instrução que finaliza a função e envia o resultado de volta para quem a chamou.
*   **[[javascript/05-assincrono/01-Callbacks\|Callbacks]]:** Funções passadas como argumentos para outras funções serem executadas posteriormente.
*   **[[javascript/02-funções-e-objetos/06-Funções construtoras\|Funções Construtoras]]:** Funções usadas para gerar novos [[javascript/02-funções-e-objetos/03-Objetos\|Objetos]]/instâncias.
*   **[[javascript/02-funções-e-objetos/07-Protótipos e proto\|Protótipos e Proto]]:** O mecanismo de herança no [[javascript/Introdução ao JavaScript\|JavaScript]] baseado nos [[javascript/02-funções-e-objetos/07-Protótipos e proto\|Protótipos e Proto]] de funções e [[javascript/02-funções-e-objetos/03-Objetos\|Objetos]].
