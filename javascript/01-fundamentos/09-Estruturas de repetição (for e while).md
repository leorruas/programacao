# Estruturas de repetição (for e while) no JavaScript - método Feynman

As **Estruturas de Repetição** (ou **Loops**) são blocos de código usados para executar a mesma instrução várias vezes de forma automatizada até que uma condição específica seja satisfeita.

Sob a perspectiva do **Design e Automação**, um Loop funciona exatamente como a **Esteira da Linha de Montagem de uma Fábrica** ou a ação automatizada de **Criar Múltiplas Cópias de uma Camada no Figma**.

---

## A analogia da linha de montagem

Imagine a produção de cartões de visitas em uma gráfica:

*   **O Loop (`for` / `while`):** É o motor da máquina impressora programado para rodar até atingir a meta.
*   **O Contador (`let i = 0`):** É o contador digital no painel da máquina marcando quantas folhas já foram impressas.
*   **A Condição (`i < 100`):** É a trava de segurança ("pare a máquina assim que chegar na folha número 100").
*   **O Incremento (`i++`):** É a alavanca que avança a contagem em +1 folha a cada volta do motor.

---

## 1. O loop for tradicional: contador com início e fim

O **`for`** é usado quando você **sabe exatamente quantas vezes deseja repetir** a instrução antes de começar.

### Sintaxe:
```javascript
for (inicialização; condição; incremento) {
  // Código que será executado em cada repetição
}
```

### Estratégia clássica: percorrer arrays usando `.length`
Esta é a estratégia mais comum do mercado para varrer os itens de uma lista um a um:

```javascript
const videoGames = ['Switch', 'PS4', 'XBOX', '3DS'];

// O contador "item" começa em 0 e vai até o tamanho total da lista (videoGames.length)
for (let item = 0; item < videoGames.length; item++) {
  console.log(videoGames[item]);
}
// Saída no console:
// Switch
// PS4
// XBOX
// 3DS
```

### Outras estratégias poderosas para loops em arrays

#### A. Interrupção antecipada com `break` ao encontrar o item desejado
Ideal para otimização de performance. Em vez de percorrer milhares de itens à toa, o loop para imediatamente ao encontrar o que procura:

```javascript
const videoGames = ['Switch', 'PS4', 'XBOX', '3DS'];

for (let item = 0; item < videoGames.length; item++) {
  console.log(videoGames[item]);
  if (videoGames[item] === 'PS4') {
    break; // Encontrou o PS4, cancela as próximas voltas imediatamente!
  }
}
// Saída no console:
// Switch
// PS4
```

#### B. Iteração funcional moderna com `foreach`
Passa automaticamente o item atual, o seu índice numérico e a lista completa sem precisar gerenciar contadores (veja a nota exaustiva sobre **[[javascript/03-manipulacao/04-O método forEach em detalhes\|O método forEach em detalhes]]**):

```javascript
videoGames.forEach(function(item, index) {
  console.log(`Posição ${index}: ${item}`);
});
```

#### C. Contagem regressiva (do último para o primeiro)
Basta iniciar o contador com `videoGames.length - 1` e decrementar com `i--`:

```javascript
for (let i = videoGames.length - 1; i >= 0; i--) {
  console.log(videoGames[i]);
}
// Saída no console:
// 3DS
// XBOX
// PS4
// Switch
```

> [!CAUTION] O Horror do Loop Infinito (A Importância Vital do `item++`)
> O que acontece se você esquecer de colocar o **`item++`** no final do `for` (ou o `i = i + 5` no `while`)?
> 
> Se o `item++` não existir, a variável `item` ficará **presa no número 0 para sempre**. A condição `0 < 4` continuará sendo `true` eternamente. O JavaScript tentará rodar o código bilhões de vezes por segundo sem parar, resultando no **Loop Infinito Horroroso**:
> 
> *  A aba do navegador trava completamente e para de responder.
> *  O uso de CPU do computador vai para 100%.
> *  O navegador é forçado a fechar a aba ou exibir o aviso "A página não está respondendo".

---

## 2. O loop enquanto: repetidor baseado em condição

O **`while`** é usado quando você **não sabe o número exato de repetições**, mas quer que a máquina continue rodando enquanto uma condição for verdadeira.

### Sintaxe:
```javascript
while (condicao) {
  // Código a ser executado enquanto a condição for verdadeira
  // IMPORTANTE: Atualize o contador aqui dentro para não criar um loop infinito!
}
```

### Exemplo com passo customizado (`i = i + 5`):
Você não precisa incrementar apenas de 1 em 1 (`i++`). Pode avançar de 5 em 5 ou qualquer outro passo:

```javascript
let i = 0;

// Imprimindo números de 5 em 5 até 10
while (i <= 10) {
  console.log(i);
  i = i + 5; // Passo de 5 em 5 (0, 5, 10)
}
// Saída no console:
// 0
// 5
// 10
```

---

## 3. O loop do...while: garanta pelo menos uma execução

O **`do...while`** garante que o código dentro do bloco será **executado pelo menos 1 vez** antes de testar a condição no final.

```javascript
let tentativas = 0;

do {
  tentativas++;
  console.log(`Tentativa de conexão número: ${tentativas}`);
} while (tentativas < 3);
```

---

## 4. Loops modernos para coleções (for...of e for...in)

No desenvolvimento moderno de software, o [[javascript/Introdução ao JavaScript\|JavaScript]] oferece formas muito mais limpas para percorrer [[javascript/03-manipulacao/02-Arrays e métodos de array\|Arrays]] e [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]]:

### A. `For...of` (para percorrer valores de arrays)
Usado para iterar diretamente sobre os elementos de um Array sem precisar gerenciar o contador manualmente.

```javascript
const cores = ["Vermelho", "Verde", "Azul"];

for (const cor of cores) {
  console.log(`Cor selecionada: ${cor}`);
}
```

### B. `For...in` (para percorrer chaves de objetos)
Usado para percorrer os nomes das propriedades de um Objeto.

```javascript
const configuracaoTela = {
  largura: 1920,
  altura: 1080,
  tema: "Dark"
};

for (const propriedade in configuracaoTela) {
  console.log(`${propriedade}: ${configuracaoTela[propriedade]}`);
}
```

---

## 5. Instruções de controle (break e continue)

*   **`break`**: Interrompe e encerra o loop imediatamente, saltando para fora do bloco.
*   **`continue`**: Pula o restante do código da rodada atual e vai direto para a próxima volta do loop.

### Exemplo 1: usando `break` no loop `for` tradicional
Ao encontrar a condição desejada (ex: o `'PS4'`), o `break` encerra o `for` e não processa os itens seguintes (`XBOX`, `3DS`):

```javascript
const videoGames = ['Switch', 'PS4', 'XBOX', '3DS'];

for (let i = 0; i < videoGames.length; i++) {
  console.log(videoGames[i]);
  if (videoGames[i] === 'PS4') {
    console.log('Encontrou o PS4! Encerrando o loop com break.');
    break; // Sai do for imediatamente
  }
}
// Saída no console:
// Switch
// PS4
// Encontrou o PS4! Encerrando o loop com break.
```

### Exemplo 2: usando `continue` no loop `for` tradicional
O `continue` pula apenas a volta atual. Se a condição for `'PS4'`, ele salta para a próxima iteração sem executar o `console.log`:

```javascript
for (let i = 0; i < videoGames.length; i++) {
  if (videoGames[i] === 'PS4') {
    continue; // Pula o PS4 e vai direto para o XBOX!
  }
  console.log(videoGames[i]);
}
// Saída no console:
// Switch
// XBOX
// 3DS
```

---

## Comparativo exaustivo das estruturas de repetição

| Estrutura | Quando usar? | Avaliação da Condição |
| :--- | :--- | :--- |
| **`for`** | Quando o número exato de repetições é conhecido com antecedência. | No início de cada repetição. |
| **`while`** | Quando a repetição depende de uma condição dinâmica (número de voltas incerto). | No início de cada repetição. |
| **`do...while`** | Quando o bloco precisa rodar obrigatoriamente pelo menos uma vez. | No final de cada repetição. |
| **`for...of`** | Para iterar sobre valores de [[javascript/03-manipulacao/02-Arrays e métodos de array\|Arrays]] e coleções iteráveis. | Automática para cada item. |
| **`for...in`** | Para percorrer as chaves/propriedades de um [[javascript/02-funcoes-e-objetos/03-Objetos\|Objeto]]. | Automática para cada chave. |

---

## 6. Mini-projeto prático: gerador de galeria e processador de estoque

Veja um exemplo prático demonstrando o uso combinado das estruturas de repetição para processar um lote de produtos em uma loja virtual:

```javascript
// Lista de produtos no carrinho
const carrinho = [
  { nome: "Monitor 4K", preco: 2500, quantidade: 1 },
  { nome: "Teclado Mecânico", preco: 350, quantidade: 2 },
  { nome: "Mouse Gamer", preco: 200, quantidade: 0 }, // Sem estoque
  { nome: "Headset Pro", preco: 600, quantidade: 1 }
];

let totalGeral = 0;
const relatorioItens = [];

// 1. Usando for...of para processar os produtos do carrinho
for (const item of carrinho) {
  // Se o item estiver sem estoque, pule para o próximo (CONTINUE)
  if (item.quantidade === 0) {
    console.log(`Aviso: ${item.nome} está esgotado e foi pulado.`);
    continue;
  }

  const subtotal = item.preco * item.quantidade;
  totalGeral += subtotal;

  relatorioItens.push(`${item.quantidade}x ${item.nome} (Subtotal: R$ ${subtotal})`);
}

console.log("--- RESUMO DO PEDIDO ---");
// 2. Usando for tradicional para exibir o relatório numerado
for (let i = 0; i < relatorioItens.length; i++) {
  console.log(`${i + 1}. ${relatorioItens[i]}`);
}

console.log(`Valor Total a Pagar: R$ ${totalGeral}`);
```

---

## Resumo para memorizar

*   **`for`**: Use quando souber o limite de voltas do contador.
*   **`while`**: Use enquanto uma condição for verdadeira.
*   **`for...of`**: O jeito moderno de percorrer os valores de um array.
*   **`for...in`**: O jeito de percorrer as chaves de um objeto.
*   **`break`**: Freia o loop imediatamente.
*   **`continue`**: Pula a rodada atual e vai para a próxima.
