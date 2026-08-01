# Entendendo objetos - método Feynman

Em [[javascript/Introdução ao JavaScript\|JavaScript]], um **Objeto** é um dos [[javascript/01-fundamentos/Tipos de dados]] complexos. Ele é uma estrutura que permite agrupar variáveis (propriedades) e [[javascript/01-fundamentos/Funções\|funções]] (métodos) que pertencem a uma mesma entidade em um único lugar. Para criá-los em lote, usamos [[javascript/01-fundamentos/Classes]] ou [[javascript/01-fundamentos/Funções Construtoras]].

Pense em um objeto como a **Ficha de Propriedades de um Componente** do Figma.

---

## A analogia do Figma

Imagine que você criou um componente de cartão de perfil de usuário (User Card) no Figma. Esse cartão não é apenas um retângulo solto na tela; ele é um conjunto de informações agrupadas que definem o perfil:

*   **Propriedades (As características físicas do cartão):**
    *   Largura: `350px`
    *   Cor de Fundo: `"#ffffff"`
    *   Nome do Usuário: `"Ana"`
    *   Foto de Perfil: `"imagem.jpg"`
*   **Métodos (As ações que o cartão sabe fazer):**
    *   Seguir Usuário (Ao clicar no botão de seguir)
    *   Exibir Detalhes (Ao abrir o perfil)

No [[javascript/Introdução ao JavaScript\|JavaScript]], em vez de criar variáveis soltas para cada uma dessas características, nós as envelopamos dentro de um único objeto chamado `usuario`.

---

## Como escrever um objeto no JavaScript

Para criar um objeto, usamos chaves `{}` e organizamos as informações em pares de chave (nome do dado) e valor (dado real):

```javascript
// Criando o objeto "usuario"
const usuario = {
  // Propriedades (Características)
  nome: "Ana",
  idade: 25,
  corFundo: "#ffffff",
  ativo: true,

  // Método (Ação)
  seguir: function() {
    console.log("Você começou a seguir " + this.nome);
  }
};
```

### Acessando os dados do objeto

Para ler um dado ou ativar uma [[javascript/01-fundamentos/Funções\|Funções]] de dentro do objeto, usamos a **[[javascript/01-fundamentos/Dot Notation e Propriedades\|notação de ponto]]** (`.`):

```javascript
// Lendo propriedades
console.log(usuario.nome);  // Saída: Ana
console.log(usuario.idade); // Saída: 25

// Ativando um método (a ação de seguir)
usuario.seguir(); // Saída: Você começou a seguir Ana
```

---

## O papel do ___placeholder_10___ dentro do objeto

No exemplo acima, você deve ter reparado no uso de `this.nome`. 

A palavra `this` (que significa "este" ou "isto") serve para o objeto olhar para si mesmo e acessar as próprias propriedades. Quando o método `seguir` roda, o `this.nome` diz ao [[javascript/Introdução ao JavaScript\|JavaScript]]: *"Busque a propriedade chamada 'nome' que está dentro deste mesmo objeto que eu pertenço"*.

---

## Modificando e adicionando propriedades

Objetos em [[javascript/Introdução ao JavaScript\|JavaScript]] são muito flexíveis. Você pode alterar valores ou adicionar novas características a qualquer momento, mesmo se o objeto tiver sido criado com `const` (pois a restrição do `const` impede trocar o objeto inteiro por outro, mas permite alterar o seu conteúdo interno):

```javascript
// Alterando um valor existente
usuario.idade = 26;

// Adicionando uma nova propriedade
usuario.profissao = "Designer";

console.log(usuario.profissao); // Saída: Designer
```

---

## Resumo para memorizar

*   **Objeto:** Uma estrutura usada para agrupar características (propriedades) e ações (métodos) de um elemento.
*   **Propriedades:** As variáveis internas do objeto, escritas em pares de chave e valor.
*   **Métodos:** As [[javascript/01-fundamentos/Funções\|Funções]] salvas dentro do objeto que descrevem ações que ele pode realizar.
*   **[[javascript/01-fundamentos/Dot Notation e Propriedades\|Dot Notation]]:** O uso do ponto (`objeto.propriedade`) para acessar ou alterar informações dele.
*   **Objetos Embutidos:** O [[javascript/Introdução ao JavaScript\|JavaScript]] possui objetos nativos pré-configurados, como [[javascript/01-fundamentos/Math\|Math]] para [[javascript/01-fundamentos/Funções\|Funções]] matemáticas e [[javascript/01-fundamentos/JSON\|JSON]] para estruturação de dados.
