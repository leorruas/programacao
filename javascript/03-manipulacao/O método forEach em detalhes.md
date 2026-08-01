# O método foreach em detalhes no JavaScript - método Feynman

O método **`forEach()`** é uma função de iteração do protótipo de [[javascript/03-manipulacao/Arrays e métodos de array\|Array]] no JavaScript usada para executar uma função de [[javascript/05-assincrono/Callbacks\|callback]] em cada elemento de uma lista, um a um, de forma sequencial.

Sob a perspectiva do **Design e Automação**, o `forEach()` funciona exatamente como um **Inspetor de Qualidade na Esteira de Produção** ou a execução de um script que varre todas as camadas selecionadas no Figma para disparar uma ação em cada uma delas.

---

## A analogia do inspetor de esteira

Imagine a linha de empacotamento de uma fábrica:

*   **O Array:** É a esteira rolante cheia de caixas de produtos.
*   **O `forEach()`:** É o robô inspetor instalado ao lado da esteira.
*   **A Função Callback:** É a ordem de serviço que o robô executa para cada caixa que passa (ex: carimbar a data, verificar a etiqueta, ou disparar um alarme se a caixa estiver danificada).
*   **O Retorno `undefined`:** O robô apenas executa o trabalho na esteira existente; ele não constrói uma esteira nova (diferente do `map()`, que cria uma esteira paralela com os produtos modificados).

---

## 1. Assinatura exaustiva e parâmetros do foreach

A sintaxe completa do `forEach()` aceita até **4 parâmetros formais** divididos entre a função de callback e o contexto de execução:

```javascript
array.forEach(function(currentValue, index, array) {
  // Código executado para cada elemento
}, thisArg);
```

### Detalhamento exaustivo dos parâmetros:

| Parâmetro | Tipo | Obrigatoriedade | Descrição |
| :--- | :--- | :--- | :--- |
| **`currentValue`** (ou `item`) | Qualquer | **Obrigatório** | O valor do elemento atual que está sendo processado na volta do loop. |
| **`index`** | Número | Opcional | a posição numérica (índice `0`, `1`, `2`...) do elemento atual no array. |
| **`array`** | Array | Opcional | O próprio array original que está sendo percorrido (útil para consultar a propriedade `.length` ou elementos vizinhos). |
| **`thisArg`** | Objeto | Opcional | Objeto a ser usado como contexto do [[javascript/02-funcoes-e-objetos/Entendendo o this\|this]] dentro da função callback. |

---

## 2. Exemplo prático utilizando todos os parâmetros

Veja como acessar todos os argumentos disponibilizados pelo `forEach()` na prática:

```javascript
const videoGames = ['Switch', 'PS4', 'XBOX', '3DS'];

// Utilizando os 3 parâmetros da callback (item, index, arrayOriginal)
videoGames.forEach(function(item, index, arrayOriginal) {
  const total = arrayOriginal.length;
  console.log(`Item ${index + 1} de ${total}: ${item}`);
});

// Saída no console:
// Item 1 de 4: Switch
// Item 2 de 4: PS4
// Item 3 de 4: XBOX
// Item 4 de 4: 3DS
```

### Exemplo utilizando o parâmetro `thisarg`:
```javascript
const carrinho = {
  moeda: "R$",
  formatarPreco(valor) {
    return `${this.moeda} ${valor.toFixed(2)}`;
  }
};

const precos = [100, 250, 400];

// Passamos 'carrinho' como segundo argumento para definir o 'this' da função callback
precos.forEach(function(preco) {
  console.log(this.formatarPreco(preco));
}, carrinho);

// Saída no console:
// R$ 100.00
// R$ 250.00
// R$ 400.00
```

---

## 3. Características críticas e regras de ouro do foreach

### A. O `foreach()` sempre retorna `undefined`
Ele não devolve nenhum valor. Tentar atribuir o resultado de um `forEach()` a uma variável resultará em `undefined`:

```javascript
const numeros = [1, 2, 3];
const resultado = numeros.forEach(n => n * 2);

console.log(resultado); // Saída: undefined (Para criar um novo array transformado, use map!)
```

### B. Impossível usar `break` ou `continue`
Dentro de um `forEach()`, as palavras-chave `break` e `continue` **não funcionam** e causam erro de sintaxe.

*   Para interromper o loop prematuramente ao encontrar um item, use o `for` tradicional ou métodos como `some()` e `every()`.
*   Para pular uma iteração, use uma instrução `return` simples dentro da callback:

```javascript
const jogos = ['Switch', 'PS4', 'XBOX', '3DS'];

jogos.forEach(item => {
  if (item === 'PS4') {
    return; // Pula apenas a execução do PS4 (funciona como o 'continue')
  }
  console.log(item);
});
// Saída: Switch, XBOX, 3DS
```

### C. Comportamento com elementos vazios (sparse arrays)
O `forEach()` ignora automaticamente posições não atribuídas ou deletadas no array:

```javascript
const listaComVazio = [1, , 3]; // Índice 1 está vazio
listaComVazio.forEach(item => console.log(item)); 
// Saída: 1 e 3 (o slot vazio no índice 1 foi ignorado)
```

---

## 4. Tabela comparativa: foreach vs map vs for tradicional

| Recurso | `forEach()` | `map()` | `for` tradicional |
| :--- | :--- | :--- | :--- |
| **Retorno** | `undefined` | Novo Array transformado | Nenhum (ou o que você definir) |
| **Uso Principal** | Efeitos colaterais (logs, eventos) | Transformação de dados | Loops com controle preciso |
| **Aceita `break`/`continue`?** | Não ❌ | Não ❌ | Sim ✅ |
| **Acesso ao `index`** | Sim (2º parâmetro) | Sim (2º parâmetro) | Manualmente via contador |
| **Controle de Passo** | Apenas de 1 em 1 | Apenas de 1 em 1 | Livre (`i++`, `i += 5`, `i--`) |

---

## 5. Mini-projeto prático: central de notificações de pedidos (DOM)

Veja como usar o `forEach()` na prática para renderizar uma lista de notificações interativas no sistema:

```javascript
// 1. Dados dos pedidos recebidos da API
const pedidos = [
  { id: 201, cliente: "Ana Silva", status: "Pago", valor: 350 },
  { id: 202, cliente: "Carlos Souza", status: "Pendente", valor: 120 },
  { id: 203, cliente: "Beatriz Lima", status: "Enviado", valor: 890 }
];

// 2. Usando forEach para processar cada pedido e simular atualizações de interface
pedidos.forEach((pedido, index, listaCompleta) => {
  const posicao = index + 1;
  const totalPedidos = listaCompleta.length;

  console.log(`[Notificação ${posicao}/${totalPedidos}] Pedido #${pedido.id} de ${pedido.cliente} - Status: ${pedido.status}`);

  if (pedido.status === "Pago") {
    console.log(`-> Liberar nota fiscal para ${pedido.cliente} no valor de R$ ${pedido.valor}`);
  }
});
```

---

## Resumo para memorizar

*   **`forEach()`**: Executa uma função em lote para cada item do array (sempre retorna `undefined`).
*   **Parâmetros da Callback:** `(item, index, arrayOriginal)`.
*   **Parâmetro de Contexto:** `thisArg` (define o `this` dentro da callback).
*   **Sem `break`**: Não é possível cancelar o `forEach()` no meio; use `return` para pular uma rodada ou `for` tradicional para abortar.
