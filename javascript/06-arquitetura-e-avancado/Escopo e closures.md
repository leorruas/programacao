# Entendendo escopo e closures - método Feynman

Em [[javascript/Introdução ao JavaScript\|JavaScript]], onde e como você cria suas variáveis define quem pode ter acesso a elas. As regras de declaração com `var`, `let` e `const` explicadas em [[javascript/01-fundamentos/Var, let e const|Var, Let e Const]] são a base disso.

Os conceitos de **Escopo** e **Closures** determinam o nível de visibilidade das suas informações e como as [[javascript/01-fundamentos/Funções\|funções]] gerenciam essa memória, funcionando de forma muito parecida com as permissões de visibilidade de arquivos do Figma.

---

## 1. Escopo: o nível de visibilidade

O escopo define as fronteiras de acesso de uma variável.

*   **Escopo Global (Arquivos Públicos do Time):** São variáveis declaradas fora de qualquer [[javascript/01-fundamentos/Funções\|Funções]] ou bloco. Qualquer parte do seu código, em qualquer arquivo, consegue ler e alterar essa variável. É como um projeto público do Figma na pasta raiz do time: todo mundo consegue abrir e editar.
*   **Escopo Local (Rascunho Pessoal):** São variáveis declaradas dentro de uma [[javascript/01-fundamentos/Funções\|Funções]] ou bloco `{}` (com [[javascript/01-fundamentos/Var, Let e Const\|Var, Let e Const]] ou [[javascript/01-fundamentos/Var, Let e Const\|Var, Let e Const]]). Elas só existem e podem ser usadas dentro daquele bloco específico. É como um arquivo na sua pasta de rascunhos pessoais (Drafts): ninguém da sua equipe consegue ver até que você o compartilhe.

### Por que você não consegue ver a variável no console? (referenceerror)

Quando você cria uma variável dentro de uma [[javascript/01-fundamentos/Funções\|Funções]], ela pertence exclusivamente ao **escopo local** daquela [[javascript/01-fundamentos/Funções\|Funções]]. Assim que a execução da [[javascript/01-fundamentos/Funções\|Funções]] termina, o [[javascript/Introdução ao JavaScript\|JavaScript]] apaga essa variável da memória para poupar recursos.

Se você tentar usar o `console.log()` do lado de fora para espiar a variável local, o sistema acusará um erro:

```javascript
function calcularTotal() {
  let preco = 50; // Escopo Local (só existe aqui dentro)
  return preco * 2;
}

calcularTotal();

// Tentando acessar a variável do lado de fora:
console.log(preco); //  ERRO: ReferenceError: preco is not defined
```

O console do navegador (DevTools) também opera sob as regras do **Escopo Global**. Por estar "do lado de fora", ele não consegue ler nada que foi criado temporariamente dentro de uma [[javascript/01-fundamentos/Funções\|Funções]] durante a execução dela. 

####  a conexão com o hoisting:
O [[javascript/01-fundamentos/Hoisting\|Hoisting]] (içamento) faz com que as declarações sejam "puxadas" para o topo. No entanto, o hoisting respeita os limites de escopo: uma variável criada dentro de uma [[javascript/01-fundamentos/Funções\|Funções]] é elevada **apenas para o topo da própria [[javascript/01-fundamentos/Funções\|Funções]]** (o topo do seu escopo local), e não para o topo do arquivo inteiro. Por isso, ela continua inacessível do lado de fora.

### O "Modo Estrito" (`'use strict'`)
O `'use strict'` é uma diretiva que você coloca no topo do seu arquivo JavaScript (ou de uma função) para ativar o **Modo Estrito**. Ele força o interpretador do JavaScript a ser mais rigoroso com a sintaxe, transformando erros silenciosos em erros explícitos no console.

*   **Sem `'use strict'` (Modo Padrão):** Se você declarar uma variável sem usar `let`, `const` ou `var` dentro de uma função (ex: `carro = 'Fusca'`), o JavaScript não gera erro. Ele cria automaticamente uma variável no **Escopo Global** (`window.carro`), fazendo com que o valor "vaze" e fique acessível fora da função. Isso é uma fonte perigosa de bugs e vazamentos de memória.
*   **Com `'use strict'`:** O JavaScript proíbe a criação acidental de variáveis globais. Ao tentar rodar `carro = 'Fusca'` sem declarar a variável, o interpretador interrompe a execução e acusa um erro imediatamente: `Uncaught ReferenceError: carro is not defined`.

---

## 2. Closures: a memória do bloco de notas

Um **Closure** (Fechamento) ocorre quando uma [[javascript/01-fundamentos/Funções\|Funções]] interna consegue "lembrar" e ter acesso às variáveis criadas no escopo da sua [[javascript/01-fundamentos/Funções\|Funções]] pai, mesmo depois que a [[javascript/01-fundamentos/Funções\|Funções]] pai já terminou de ser executada.

### A analogia do bloco de notas de design

Imagine a seguinte situação de trabalho:

1.  Um coordenador de design (a [[javascript/01-fundamentos/Funções\|Funções]] pai) se reúne com você e define uma meta de entrega: *"Nossa meta é desenhar 10 telas"*.
2.  O coordenador vai embora (a [[javascript/01-fundamentos/Funções\|Funções]] pai encerra a execução).
3.  Você (a [[javascript/01-fundamentos/Funções\|Funções]] filha) continua trabalhando sozinho. Quando você precisa saber o que fazer, você abre o seu bloco de notas e lê a variável `meta: 10` que o coordenador definiu. 
4.  Você conseguiu acessar um dado que foi criado em uma reunião que já acabou, porque você guardou a referência a essa reunião no seu bloco de notas pessoal (isso é um Closure).

---

## Exemplo em código

No [[javascript/Introdução ao JavaScript\|JavaScript]], quando criamos uma [[javascript/01-fundamentos/Funções\|Funções]] dentro de outra, a [[javascript/01-fundamentos/Funções\|Funções]] de dentro sempre cria um closure guardando as variáveis da [[javascript/02-funcoes-e-objetos/Funções\|Funções]] de fora:

```javascript
function criarContador() {
  // Variável local (escopo local da função pai)
  let quantidade = 0;

  // Função filha que será retornada
  return function incrementar() {
    quantidade = quantidade + 1;
    console.log("Quantidade de cliques: " + quantidade);
  };
}

// Criamos uma instância do contador
const contarCliques = criarContador();

// A função criarContador já terminou de rodar aqui.
// Mas a função contarCliques ainda lembra da variável "quantidade" devido ao Closure.
contarCliques(); // Saída: Quantidade de cliques: 1
contarCliques(); // Saída: Quantidade de cliques: 2
```

---

## Resumo para memorizar

*   **Escopo:** A regra que determina onde uma variável pode ser lida ou alterada (Global ou Local).
*   **Closure:** O comportamento do [[javascript/Introdução ao JavaScript\|JavaScript]] de manter o acesso a variáveis de uma [[javascript/02-funcoes-e-objetos/Funções\|Funções]] externa mesmo depois que ela já terminou de rodar.
*   **Segurança:** Closures são usados para criar variáveis privadas que não podem ser alteradas diretamente do lado de fora, garantindo que o seu código seja seguro e previsível.
