# Arrays e métodos de array no JavaScript - método Feynman

Um **Array** (ou Matriz/Vetor) é uma estrutura de dados ordenada usada para armazenar múltiplos valores dentro de uma única variável. Cada item dentro de um array possui uma posição numérica chamada de **Índice (Index)**, que sempre começa a contar a partir do zero (`0`).

Sob a perspectiva do **Design e Organização**, um Array funciona exatamente como uma **Prateleira com Caixas Numeradas** ou a **Lista de Variantes de um Componente no Figma**.

---

## A analogia da prateleira numerada

Imagine a prateleira de estoque de uma loja de calçados:

*   **O Array (`produtos`):** É a prateleira inteira etiquetada.
*   **Os Itens:** São as caixas de sapatos guardadas na prateleira.
*   **O Índice (`0`, `1`, `2`...):** É o número gravado no nicho da prateleira. A primeira caixa fica no nicho `0`, a segunda no nicho `1`, e assim por diante.
*   **Os Métodos de Array:** São os procedimentos operacionais do estoque (adicionar nova caixa no fim da fila, buscar um sapato específico, filtrar apenas sapatos pretos, ou calcular o valor total de todas as caixas).

---

## 1. Dicionário exaustivo de todos os métodos e propriedades de array

Abaixo está o guia completo de todas as 40+ propriedades, métodos estáticos e métodos de instância do objeto `Array` do JavaScript:

### A. Propriedade de informação
| Item | Tipo | Descrição e Exemplo |
| :--- | :--- | :--- |
| **`length`** | Propriedade | Retorna ou define a quantidade total de elementos no array. Ex: `[1, 2, 3].length` (Saída: `3`). |

---

### B. Métodos estáticos (invocados direto em `array.*`)
| Método | Descrição | Exemplo de Uso |
| :--- | :--- | :--- |
| **`Array.isArray(valor)`** | Retorna `true` se o valor passado for um Array válido. | `Array.isArray([1, 2])` -> `true` |
| **`Array.from(iteravel, mapFn)`** | Cria um novo Array a partir de um objeto iterável (ex: NodeList do [[javascript/04-dom-e-browser/01-DOM\|DOM]], Set ou String). | `Array.from('ABC')` -> `["A", "B", "C"]` |
| **`Array.fromAsync(iteravelAsync)`** | Cria um novo Array a partir de um iterável assíncrono (ES2024). | `await Array.fromAsync(asyncIterable)` |
| **`Array.of(el1, el2...)`** | Cria uma nova instância de Array com os argumentos passados, independentemente do tipo. | `Array.of(7)` -> `[7]` |

---

### C. Métodos mutáveis de adição e remoção (modificam o array original)
| Método | Descrição | Exemplo / Saída |
| :--- | :--- | :--- |
| **`push(item1, item2...)`** | Adiciona um ou mais itens ao **final** do array e retorna o novo `length`. | `arr.push("A")` |
| **`pop()`** | Remove e retorna o **último** elemento do array. | `arr.pop()` |
| **`unshift(item1, item2...)`** | Adiciona um ou mais itens ao **início** do array (desloca índices). | `arr.unshift("Z")` |
| **`shift()`** | Remove e retorna o **primeiro** elemento do array. | `arr.shift()` |
| **`splice(inicio, qtd, item1...)`** | Remove, substitui ou insere elementos em qualquer posição. | `arr.splice(1, 2)` (remove 2 itens a partir do índice 1) |
| **`fill(valor, inicio, fim)`** | Preenche todos os elementos do array com um valor estático. | `[1, 2, 3].fill(0)` -> `[0, 0, 0]` |
| **`copyWithin(target, start, end)`** | Copia uma sequência de elementos do array para outra posição do próprio array. | `[1, 2, 3, 4].copyWithin(0, 2)` -> `[3, 4, 3, 4]` |

---

### D. Métodos de busca, posição e teste
| Método | Descrição | Exemplo / Saída |
| :--- | :--- | :--- |
| **`at(index)`** | Retorna o elemento no índice informado. Aceita números negativos para contar de trás para frente! | `[10, 20, 30].at(-1)` -> `30` |
| **`includes(item, inicio)`** | Retorna `true` se o array contiver o elemento. | `["A", "B"].includes("A")` -> `true` |
| **`indexOf(item, inicio)`** | Retorna o primeiro índice em que o elemento pode ser encontrado (ou `-1`). | `["A", "B"].indexOf("B")` -> `1` |
| **`lastIndexOf(item, inicio)`** | Retorna o último índice em que o elemento foi encontrado. | `["A", "B", "A"].lastIndexOf("A")` -> `2` |
| **`find(callback)`** | Retorna o **primeiro elemento** que satisfaz a função de teste (ou `undefined`). | `arr.find(x => x.id === 10)` |
| **`findIndex(callback)`** | Retorna o **índice do primeiro elemento** que satisfaz o teste (ou `-1`). | `arr.findIndex(x => x > 5)` |
| **`findLast(callback)`** | Retorna o **último elemento** que satisfaz a condição (ES2023). | `arr.findLast(x => x > 5)` |
| **`findLastIndex(callback)`** | Retorna o **índice do último elemento** que satisfaz a condição (ES2023). | `arr.findLastIndex(x => x > 5)` |
| **`some(callback)`** | Retorna `true` se **pelo menos um** elemento passar no teste. | `arr.some(x => x > 10)` |
| **`every(callback)`** | Retorna `true` se **todos** os elementos passarem no teste. | `arr.every(x => x > 0)` |

---

### E. Métodos de iteração e transformação (os pilares do mercado)
Estes métodos recebem uma [[javascript/02-funções-e-objetos/02-Arrow functions\|arrow function]] de [[javascript/05-assincrono/01-Callbacks\|callback]] para processar os elementos:

| Método | Descrição | Retorno |
| :--- | :--- | :--- |
| **`forEach(callback)`** | Executa uma função para cada elemento (usado para loops e efeitos colaterais). | `undefined` |
| **`map(callback)`** | Transforma cada item e retorna um **novo array** com o mesmo número de elementos. | Novo Array transformado |
| **`filter(callback)`** | Filtra os elementos e retorna um **novo array** contendo apenas quem passou na condição. | Novo Array filtrado |
| **`reduce(callback, inicial)`** | Reduz o array a um **único valor final** acumulado (ex: somar totais). | Valor acumulado final |
| **`reduceRight(callback, init)`** | Executa o `reduce` da direita para a esquerda (do fim para o início). | Valor acumulado final |
| **`flatMap(callback)`** | Mapeia cada elemento usando uma função e depois achata o resultado em 1 nível. | Novo Array achatado |

---

### F. Métodos de ordenação, fatiamento e criação de novos arrays
| Método | Descrição | Exemplo / Saída |
| :--- | :--- | :--- |
| **`slice(inicio, fim)`** | Retorna uma cópia de parte do array em um novo array (não modifica o original). | `[1, 2, 3, 4].slice(1, 3)` -> `[2, 3]` |
| **`concat(arr2, arr3...)`** | Retorna um novo array reunindo todos os arrays passados. | `[1].concat([2])` -> `[1, 2]` |
| **`join(separador)`** | Junta todos os elementos do array em uma [[javascript/03-manipulacao/05-Propriedades e métodos de string\|String]] com o separador. | `["A", "B"].join("-")` -> `"A-B"` |
| **`sort(compareFunc)`** | Ordena os elementos do array **mutando o original**. | `[3, 1, 2].sort((a,b) => a - b)` -> `[1, 2, 3]` |
| **`reverse()`** | Inverte a ordem dos elementos **mutando o original**. | `[1, 2, 3].reverse()` -> `[3, 2, 1]` |
| **`flat(profundidade)`** | Achata sub-arrays aninhados até a profundidade especificada. | `[1, [2, [3]]].flat(2)` -> `[1, 2, 3]` |

---

### G. Métodos imutáveis modernos de ordenação e alteração (es2023)
Estes métodos modernos executam operações sem alterar o array original:

*   **`toSorted(compareFunc)`**: Versão imutável de `sort()`. Retorna um novo array ordenado.
*   **`toReversed()`**: Versão imutável de `reverse()`. Retorna um novo array invertido.
*   **`toSpliced(start, deleteCount, item1...)`**: Versão imutável de `splice()`. Retorna um novo array modificado.
*   **`with(index, value)`**: Retorna uma cópia do array substituindo o valor no índice informado.
    ```javascript
    const original = ["A", "B", "C"];
    const modificado = original.with(1, "X"); // ["A", "X", "C"]
    ```

---

### H. Métodos iteradores e conversão de texto
| Método | Descrição | Exemplo / Saída |
| :--- | :--- | :--- |
| **`keys()`** | Retorna um novo iterador de Array contendo os **índices** de cada elemento. | `[...arr.keys()]` -> `[0, 1, 2]` |
| **`values()`** | Retorna um novo iterador de Array contendo os **valores** de cada elemento. | `[...arr.values()]` |
| **`entries()`** | Retorna um novo iterador de Array contendo pares `[índice, valor]`. | `for (let [i, v] of arr.entries())` |
| **`toString()`** | Converte o array em uma string separada por vírgulas. | `[1, 2].toString()` -> `"1,2"` |
| **`toLocaleString()`** | Converte o array em string considerando formatação de moeda/data local. | `[1000].toLocaleString('pt-BR')` |

---

## 2. Mini-projeto prático: motor de carrinho de e-commerce

Para ver como esses métodos de array funcionam na prática no desenvolvimento front-end, veja este exemplo completo de gerenciamento de um carrinho de compras:

```javascript
// 1. Nossa base de dados de produtos (Array de Objetos)
const produtos = [
  { id: 101, nome: "Tênis Running Pro", categoria: "Calçados", preco: 350, emEstoque: true },
  { id: 102, nome: "Camiseta Tech Fit", categoria: "Roupas", preco: 120, emEstoque: true },
  { id: 103, nome: "Jaqueta Corta-Vento", categoria: "Roupas", preco: 450, emEstoque: false },
  { id: 104, nome: "Meia Esportiva Pack", categoria: "Acessórios", preco: 40, emEstoque: true }
];

// --- OPERAÇÃO 1: Filtrar apenas produtos em estoque (FILTER) ---
const disponiveis = produtos.filter((produto) => produto.emEstoque === true);

console.log("Produtos em estoque:", disponiveis.length); // Saída: 3

// --- OPERAÇÃO 2: Aplicar um cupom de 10% de desconto em todos os preços (MAP) ---
const produtosComDesconto = disponiveis.map((produto) => {
  return {
    ...produto,
    precoComDesconto: produto.preco * 0.90
  };
});

// --- OPERAÇÃO 3: Buscar um produto específico pelo ID para adicionar ao carrinho (FIND) ---
const produtoBuscado = produtos.find((produto) => produto.id === 102);
console.log("Produto encontrado:", produtoBuscado.nome); // Saída: "Camiseta Tech Fit"

// --- OPERAÇÃO 4: Calcular o valor total da compra dos itens disponíveis (REDUCE) ---
const valorTotalCarrinho = disponiveis.reduce((acumulador, produto) => {
  return acumulador + produto.preco;
}, 0);

console.log("Valor Total do Carrinho: R$", valorTotalCarrinho); // Saída: R$ 510

// --- OPERAÇÃO 5: Formatar a lista de nomes dos produtos para exibir na nota (MAP + JOIN) ---
const resumoNomes = disponiveis
  .map((produto) => produto.nome)
  .join(" | ");

console.log("Resumo da compra:", resumoNomes);
// Saída: "Tênis Running Pro | Camiseta Tech Fit | Meia Esportiva Pack"
```

---

## Resumo para memorizar

*   **Array:** Uma lista ordenada de itens acessada por índices numéricos (começando em `0`).
*   **Imutabilidade Moderna (ES2023):** Use `toSorted()`, `toReversed()`, `toSpliced()` e `with()` para alterar listas sem modificar o array original.
*   **Os Big 3 de Iteração:**
    *   **`map()`**: Transforma todos os elementos (retorna novo array do mesmo tamanho).
    *   **`filter()`**: Seleciona elementos específicos (retorna novo array filtrado).
    *   **`reduce()`**: Reduz o array inteiro a um único valor final (ex: soma total).
