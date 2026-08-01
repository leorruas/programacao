# Arrow functions: a escrita moderna e simplificada - método Feynman

As **arrow functions** ([[javascript/01-fundamentos/Funções\|Funções]] de seta) são uma forma simplificada e curta de escrever [[javascript/01-fundamentos/Funções\|Funções]] em [[javascript/Introdução ao JavaScript\|JavaScript]], introduzidas na atualização do ES6 (2015). Elas são a forma padrão e mais utilizada de escrever código no desenvolvimento web moderno.

Sob a perspectiva da **Administração**, uma arrow function funciona exatamente como a **contratação de um prestador de serviços terceirizado (freelancer)** com um fluxo simplificado de entrega.

---

## A analogia do departamento versus o freelancer

Imagine duas formas de resolver uma tarefa dentro de uma empresa:

*   **A [[javascript/01-fundamentos/Funções\|Funções]] clássica (Um departamento formal CLT):** Criar uma [[javascript/01-fundamentos/Funções\|Funções]] tradicional (com a palavra `function`) é como abrir um departamento completo na empresa. Esse departamento tem sua própria hierarquia interna, seu próprio regulamento e seu próprio diretor (o seu próprio contexto `this`). Isso dá muita robustez, mas exige burocracia para criar e gerenciar.
*   **A arrow function (O freelancer terceirizado):** É a contratação de um prestador de serviço rápido para entregar um relatório de linha única. Ele não cria um departamento novo, não tenta estabelecer uma nova diretoria e usa a estrutura e as ferramentas da sala onde foi colocado para trabalhar (ele herda o `this` do contexto pai onde foi declarado). O fluxo é simplificado ao máximo: você entrega a demanda e ele devolve o relatório de imediato, sem precisar de aprovações burocráticas (retorno implícito).

---

## Como escrever uma arrow function

A grande diferença visual é a remoção da palavra `function` e a introdução do símbolo de seta `=>` (formado por um sinal de igual e um de maior que):

### 1 - comparação de sintaxe básica
```javascript
// Função clássica (CLT)
function dobrar(numero) {
  return numero * 2;
}

// Arrow function (Freelancer)
const dobrarArrow = (numero) => {
  return numero * 2;
};
```

### 2 - o superpoder do retorno implícito
Se a sua arrow function executar apenas uma linha de instrução, você pode omitir as chaves `{}` e a palavra-chave `return`. O [[javascript/Introdução ao JavaScript\|JavaScript]] entende que o resultado daquela única linha deve ser enviado de volta automaticamente:

```javascript
// Retorno implícito (sem chaves e sem a palavra return)
const dobrarCurto = (numero) => numero * 2;

console.log(dobrarCurto(5)); // Saída: 10
```

---

## Arrow functions servem para o React?

Sim, **elas são a base do [[react/Introdução ao React\|React]] moderno**! Quase todos os componentes funcionais e manipuladores de [[javascript/01-fundamentos/Eventos\|Eventos]] em [[react/Introdução ao React\|React]] são escritos usando arrow functions devido à sua simplicidade e clareza de [[javascript/06-arquitetura-e-avancado/Escopo e closures\|Escopo e Closures]]:

```javascript
// Escrevendo um componente funcional React com Arrow Function
const BotaoEnviar = () => {
  const lidarComClique = () => console.log("Clicou!");

  return (
    <button onClick={lidarComClique}>
      Enviar dados
    </button>
  );
};
```

No [[react/Introdução ao React\|React]] antigo (baseado em [[javascript/01-fundamentos/Classes\|Classes]]), as [[javascript/01-fundamentos/Funções\|Funções]] comuns causavam muitos bugs de perda de referência do `this`. Como as arrow functions herdam o `this` do contexto pai onde foram criadas, elas eliminaram a necessidade de ficar vinculando [[javascript/01-fundamentos/Funções\|Funções]] manualmente (o antigo `.bind(this)`).

---

## Resumo para memorizar

*   **Sintaxe curta:** Elimina a palavra `function` e usa `=>`.
*   **Retorno implícito:** Dispensa `{}` e `return` se a [[javascript/01-fundamentos/Funções\|Funções]] tiver apenas uma linha de código.
*   **this compartilhado:** Não cria seu próprio contexto [[javascript/01-fundamentos/Entendendo o this\|this]]; herda o contexto de onde foi declarada (essencial para o funcionamento limpo de componentes e [[javascript/01-fundamentos/Eventos\|Eventos]] no [[react/Introdução ao React\|React]]).
