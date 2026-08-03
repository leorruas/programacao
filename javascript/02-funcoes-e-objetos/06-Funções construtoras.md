# Entendendo funções construtoras - método Feynman

Em [[javascript/Introdução ao JavaScript\|JavaScript]], quando precisamos criar vários [[javascript/01-fundamentos/Objetos\|Objetos]] que compartilham a mesma estrutura e comportamento (métodos), usamos [[javascript/01-fundamentos/Funções\|Funções]] construtoras. Elas funcionam como gabaritos para gerar novos [[javascript/01-fundamentos/Objetos\|Objetos]] sob demanda.

Sob a perspectiva da **Biologia**, uma [[javascript/01-fundamentos/Funções\|Funções]] construtora funciona exatamente como o **DNA (código genético) de um organismo**, enquanto os [[javascript/01-fundamentos/Objetos\|Objetos]] criados a partir dela são os **indivíduos gerados (instâncias)**.

---

## A analogia do dna e dos organismos

Imagine a replicação biológica na natureza:

*   **O DNA (A [[javascript/01-fundamentos/Funções\|Funções]] construtora):** É o manual genético que dita as regras de um tipo de criatura. O DNA define que todos os cães terão quatro patas, uma cor de pelo e a habilidade de latir. Sozinho, o DNA é apenas informação estática.
*   **O nascimento (A palavra-chave `new`):** Quando a natureza executa o processo de gestação usando a palavra-chave `new`, ela pega as instruções daquele DNA e traz ao mundo um filhote físico, real e independente.
*   **A individualidade (O `this`):** Cada filhote gerado a partir do mesmo DNA de cachorro terá seu próprio pelo, seu próprio nome e suas próprias calorias. O `this` garante que o que pertence ao cachorro Rex não se misture com as características do cachorro Bob, mesmo ambos tendo vindo do mesmíssimo manual genético.

---

## Como funciona no JavaScript

A [[javascript/01-fundamentos/Funções\|Funções]] construtora é a receita genética. Ela define quais propriedades e ações cada [[javascript/01-fundamentos/Objetos\|Objetos]] desse tipo terá.

### 1 - criando o manual genético (a função construtora)
No [[javascript/Introdução ao JavaScript\|JavaScript]], definimos a [[javascript/01-fundamentos/Funções\|Funções]] construtora usando uma convenção: a primeira letra do nome deve ser **maiúscula** (para indicar que ela é uma construtora). Usamos a palavra `this` para representar a instância atual que está sendo criada.

```javascript
function Cachorro(nome, cor) {
  // O "this" indica as propriedades que o filhote gerado vai receber
  this.nome = nome;
  this.cor = cor;
  
  // Também podemos colocar ações (métodos) no DNA
  this.latir = function() {
    console.log(this.nome + " diz: Au au!");
  };
}
```

### 2 - gerando os organismos (criando instâncias com ___placeholder_7___)
Para criar um [[javascript/01-fundamentos/Objetos\|Objetos]] a partir da nossa [[javascript/01-fundamentos/Funções\|Funções]] construtora, usamos a palavra-chave `new`. Ela ativa o DNA e gera uma cópia física e independente (instância) com seus próprios dados.

```javascript
// Criando dois cachorros independentes baseados no mesmo DNA
const rex = new Cachorro("Rex", "marrom");
const bob = new Cachorro("Bob", "preto");

// Ativando os comportamentos de cada um
rex.latir(); // Saída: Rex diz: Au au!
bob.latir(); // Saída: Bob diz: Au au!
```

---

## O papel do ___placeholder_9___ e do ___placeholder_10___

*   **O `new`:** Ele faz toda a mágica. Quando você escreve `new Cachorro()`, o [[javascript/Introdução ao JavaScript\|JavaScript]] cria um [[javascript/01-fundamentos/Objetos\|Objetos]] vazio nos bastidores, conecta esse [[javascript/01-fundamentos/Objetos\|Objetos]] às propriedades do DNA e o entrega pronto e ativo para você.
*   **O [[javascript/01-fundamentos/Entendendo o this\|this]]:** Ele é um pronome possessivo. Dentro da [[javascript/01-fundamentos/Funções\|Funções]] construtora, `this` significa "este indivíduo específico que está sendo gerado agora". Quando você cria o `rex`, o `this` aponta para as informações do Rex. Quando cria o `bob`, aponta para o Bob, mantendo suas características protegidas por suas respectivas membranas celulares.

---

## Resumo para memorizar

*   **[[javascript/01-fundamentos/Funções\|Funções]] construtora:** Um modelo de código (DNA) usado para gerar múltiplos [[javascript/01-fundamentos/Objetos\|Objetos]] com a mesma estrutura básica.
*   **new:** A palavra-chave obrigatória para gerar uma cópia física e ativa (organismo) a partir desse modelo.
*   **this:** A referência de individualidade que garante que as informações da cópia A não se misturem com as informações da cópia B.
*   **[[javascript/01-fundamentos/Protótipos e Proto\|Protótipos e Proto]]:** Os [[javascript/01-fundamentos/Objetos\|Objetos]] gerados se conectam à [[javascript/01-fundamentos/Funções\|Funções]] construtora através de seus [[javascript/01-fundamentos/Protótipos e Proto\|Protótipos e Proto]] (`prototype` e `__proto__`).
