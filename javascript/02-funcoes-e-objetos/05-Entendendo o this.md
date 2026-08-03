# Entendendo o this no JavaScript - método Feynman

No [[javascript/Introdução ao JavaScript\|JavaScript]], a palavra-chave `this` faz referência ao [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] que está executando a [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] ou o bloco de código no momento atual. O seu valor varia dinamicamente dependendo de **como** a [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] foi chamada.

Sob a perspectiva da **Vida Corporativa**, o `this` funciona exatamente como um **Crachá de Funcionário (ID Badge)**.

---

## A analogia do crachá de funcionário

Imagine que a empresa possui um modelo de crachá padrão que tem um campo dinâmico contendo o nome e o cargo do portador. O crachá em si não tem um nome fixo impresso; ele descobre quem é o portador com base em quem o está usando naquele instante:

*   **O Crachá (A palavra-chave `this`):** É um acessório que muda de significado dependendo de quem o veste.
*   **O Portador (O [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] de Contexto):** Se o funcionário Carlos coloca o crachá, a pergunta *"Quem é o dono deste crachá?"* (`this`) responde *"Carlos"*. Se a Ana coloca o mesmo crachá, a resposta passa a ser *"Ana"*.
*   **O Crachá na Mesa da Recepção (Contexto Global):** Se o crachá está solto na recepção, sem ninguém usando, ele pertence à empresa como um todo ([[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] global `window` ou `global`). No modo estrito (strict mode), por segurança, a recepção não permite que ninguém mexa nele se não estiver em serviço (`undefined`).

---

## 1. Dentro de um método de objeto (o crachá do funcionário)
Quando o `this` é usado dentro de um método que pertence a um [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]], ele aponta diretamente para o **próprio [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]]** que é dono da ação.

```javascript
const funcionario = {
  nome: "Lucas",
  exibirIdentidade() {
    // O this aponta para o portador do crachá (o objeto funcionario)
    console.log("Portador do crachá: " + this.nome);
  }
};

funcionario.exibirIdentidade(); // Saída: "Portador do crachá: Lucas"
```

---

## 2. Em funções construtoras (emitindo um novo crachá)
Quando criamos instâncias de [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] usando uma [[javascript/02-funcoes-e-objetos/06-Funções construtoras\|função construtora]] ou [[javascript/02-funcoes-e-objetos/09-Classes\|classe]] com a palavra-chave `new`, o `this` aponta para o **novo indivíduo** sendo gerado.

```javascript
function CriarFuncionario(nome) {
  // Atribui o nome ao crachá do novo objeto que está nascendo
  this.nome = nome;
}

const pessoa1 = new CriarFuncionario("Ana");
console.log(pessoa1.nome); // Saída: "Ana"
```
*Aqui, `new` cria o [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] e atribui o crachá `this` diretamente à `pessoa1`.*

---

## 3. Em funções comuns (crachá na recepção)
Se o `this` for invocado dentro de uma [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] que não faz parte de nenhum [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]]:

*   **Modo Não Estrito (Padrão):** O `this` aponta para o [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] global (`window` no navegador).
*   **Modo Estrito (`"use strict"`):** O `this` será `undefined` para evitar modificações acidentais no [[javascript/06-arquitetura-e-avancado/03-Escopo e closures\|Escopo e Closures]] global.

```javascript
function verDonoDoCrachá() {
  console.log(this);
}

verDonoDoCrachá(); // Retorna o objeto Window (no navegador)
```

---

## 4. Em arrow functions (o crachá emprestado)
As [[javascript/02-funcoes-e-objetos/02-Arrow functions\|arrow functions]] não possuem seu próprio `this`. Em vez de tentar adivinhar quem as chamou, elas **emprestam o `this` do [[javascript/06-arquitetura-e-avancado/03-Escopo e closures\|Escopo e Closures]] que as envolve** ([[javascript/06-arquitetura-e-avancado/03-Escopo e closures\|Escopo e Closures]] léxico).

```javascript
const salaDeReuniao = {
  projeto: "Reforma do site",
  equipe: ["Carlos", "Bruno"],
  iniciarTrabalho() {
    // A arrow function herda o 'this' do método iniciarTrabalho
    this.equipe.forEach((membro) => {
      console.log(`${membro} está trabalhando no ${this.projeto}`);
    });
  }
};

salaDeReuniao.iniciarTrabalho();
// Saída:
// "Carlos está trabalhando no Reforma do site"
// "Bruno está trabalhando no Reforma do site"
```
*Se usássemos uma [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] padrão no `forEach`, ela teria seu próprio contexto e não conseguiria ler o `this.projeto` (retornaria `undefined`).*

---

## 5. Vinculando o crachá manualmente (bind, call e apply)

Podemos forçar o crachá a pertencer a alguém específico usando três métodos nativos:

1.  **`call(objeto, arg1, arg2...)`**: Executa a [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] imediatamente passando um [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] para ser o `this`.
2.  **`apply(objeto, [args])`**: Igual ao `call`, mas passa os argumentos em um array.
3.  **`bind(objeto)`**: Não executa a [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] na hora. Ele cria uma nova [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] amarrada para sempre ao [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] informado.

```javascript
const empresaB = { nome: "Google" };

function mostrarEmpresa() {
  console.log("Trabalha na empresa: " + this.nome);
}

// Vincula o 'this' da função mostrarEmpresa à empresaB
const mostrarGoogle = mostrarEmpresa.bind(empresaB);
mostrarGoogle(); // Saída: "Trabalha na empresa: Google"
```

---

## Resumo para memorizar

*   **this:** É o crachá dinâmico do [[javascript/Introdução ao JavaScript\|JavaScript]]. Aponta para o [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] que chamou a [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]].
*   **Método:** `this` aponta para o próprio [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] dono do método.
*   **new:** `this` aponta para o novo [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] que acabou de ser criado.
*   **[[javascript/02-funcoes-e-objetos/02-Arrow functions\|Arrow Functions]]:** Não tem `this` próprio; herda o `this` do [[javascript/06-arquitetura-e-avancado/03-Escopo e closures\|Escopo e Closures]] de fora.
*   **bind/call/apply:** Permitem que você defina manualmente quem usará o crachá.
