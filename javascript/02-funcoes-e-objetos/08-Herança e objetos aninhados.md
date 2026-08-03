# Herança e objetos aninhados no JavaScript - método Feynman

Uma dúvida muito comum ao trabalhar com [[javascript/01-fundamentos/Objetos\|objetos]] em [[javascript/Introdução ao JavaScript\|JavaScript]] é entender o que acontece quando criamos um [[javascript/01-fundamentos/Objetos\|Objetos]] dentro de outro (aninhamento) versus quando fazemos um [[javascript/01-fundamentos/Objetos\|Objetos]] **herdar** de outro (herança por [[javascript/01-fundamentos/Protótipos e Proto\|Protótipos e Proto]]).

Sob a perspectiva da **Organização e da Família**, a diferença entre aninhamento e herança funciona exatamente como a diferença entre uma **Mala com Compartimentos (Composição)** e uma **Árvore Genealógica (Herança)**.

---

## A analogia: compartimentos vs. genética

*   **[[javascript/01-fundamentos/Objetos\|Objetos]] Aninhados (Composição - "Tem um"):** É como colocar uma **bolsa menor dentro de uma mala maior**. A mala maior contém a bolsa, mas os [[javascript/01-fundamentos/Objetos\|Objetos]] que estão dentro da bolsa não viram propriedades da mala. A bolsa é apenas um *compartimento interno*.
*   **Herança de [[javascript/01-fundamentos/Objetos\|Objetos]] ([[javascript/01-fundamentos/Protótipos e Proto\|Protótipos e Proto]] - "É um"):** É a **relação entre Pai e Filho**. O filho nasce como um indivíduo separado, mas herda as características, o sobrenome e o acesso à casa do pai através da sua carga genética (o link `__proto__`).

---

## 1. Objetos aninhados (composição)

Quando você cria um [[javascript/01-fundamentos/Objetos\|Objetos]] dentro da propriedade de outro [[javascript/01-fundamentos/Objetos\|Objetos]], você **não está criando herança**. Você está criando uma estrutura de **composição**.

O [[javascript/01-fundamentos/Objetos\|Objetos]] interno **não herda** automaticamente as propriedades do [[javascript/01-fundamentos/Objetos\|Objetos]] pai que o contém.

```javascript
// Objeto Pai (Mala Maior)
const empresa = {
  nomeEmpresa: "TechCorp",
  cidade: "São Paulo",
  
  // Objeto Aninhado (Bolsa Interna)
  departamento: {
    nomeDept: "Design",
    totalFuncionarios: 10
  }
};

// Accessando via Dot Notation encadeada:
console.log(empresa.departamento.nomeDept); // Saída: "Design"

// O departamento interno NÃO herda a propriedade do pai:
console.log(empresa.departamento.cidade); // Saída: undefined (Não herda!)
```

### Por que o objeto interno não enxerga o pai?
No [[javascript/Introdução ao JavaScript\|JavaScript]], escopos de [[javascript/01-fundamentos/Objetos\|Objetos]] não "vazam" para dentro de [[javascript/01-fundamentos/Objetos\|Objetos]] aninhados. O [[javascript/01-fundamentos/Objetos\|Objetos]] `departamento` não sabe que está dentro de `empresa`; ele é apenas um valor isolado associado à chave `departamento`.

---

## 2. Criando um objeto a partir de outro com herança real (___placeholder_7___)

Se o seu objetivo é fazer com que um novo [[javascript/01-fundamentos/Objetos\|Objetos]] seja criado a partir de outro e **herde todas as propriedades e métodos** do original, devemos usar a herança prototípica via `Object.create()`.

```javascript
// Objeto Protótipo (O "Pai")
const usuarioBase = {
  plano: "Gratuito",
  obterPerfil() {
    return `Usuário do plano ${this.plano}`;
  }
};

// Criando um novo objeto herdando diretamente de usuarioBase
const usuarioPremium = Object.create(usuarioBase);

// Personalizando o filho
usuarioPremium.plano = "VIP";
usuarioPremium.desconto = 0.20;

// O filho tem suas próprias propriedades:
console.log(usuarioPremium.desconto); // Saída: 0.20

// E herda os métodos do pai:
console.log(usuarioPremium.obterPerfil()); // Saída: "Usuário do plano VIP"
```

---

## 3. O que acontece com o ___placeholder_9___ em objetos aninhados?

Quando você chama um método que está dentro de um [[javascript/01-fundamentos/Objetos\|Objetos]] aninhado, a palavra-chave [[javascript/01-fundamentos/Entendendo o this\|this]] aponta para o **[[javascript/02-funcoes-e-objetos/Objetos\|Objetos]] imediato** que é dono daquele método, e não para o [[javascript/02-funcoes-e-objetos/Objetos\|Objetos]] externo.

```javascript
const contaBancaria = {
  titular: "Lucas",
  saldo: 5000,
  
  cartaoCredito: {
    limite: 2000,
    exibirLimite() {
      // O 'this' aqui aponta para cartaoCredito, NÃO para contaBancaria
      console.log(this.limite); // Saída: 2000
      console.log(this.titular); // Saída: undefined (titular pertence a contaBancaria)
    }
  }
};

contaBancaria.cartaoCredito.exibirLimite();
```

---

## 4. Tabela comparativa: aninhamento vs. herança

| Característica | Objetos Aninhados (Composição) | Herança (`Object.create` / [[javascript/01-fundamentos/Protótipos e Proto\|Protótipos e Proto]]) |
| :--- | :--- | :--- |
| **Relação** | "Possui um" (`empresa.departamento`) | "É um" (`gerente` herda de `funcionario`) |
| **Acesso** | Via [[javascript/01-fundamentos/Dot Notation e Propriedades\|notação de ponto]] encadeada (`a.b.c`) | Acesso direto (`filho.propriedadeDoPai`) |
| **Herança de Dados** | Não herda nada do pai | Herda tudo via cadeia de [[javascript/01-fundamentos/Protótipos e Proto\|protótipos]] |
| **Uso Principal** | Agrupar informações estruturadas | Reutilizar código e comportamentos |

---

## Resumo para memorizar

*   **Objetos Aninhados:** São apenas dados guardados em gavetas internas. Não há herança genética de propriedades do objeto externo para o interno.
*   **Object.create(pai):** A forma oficial de criar um novo objeto onde o objeto pai é definido como seu [[javascript/01-fundamentos/Protótipos e Proto\|Protótipos e Proto]] (`__proto__`).
*   **Comportamento do `this`:** Em métodos aninhados, o `this` pertence ao objeto imediatamente à esquerda do ponto na chamada.
