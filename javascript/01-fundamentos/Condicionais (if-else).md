# Condicionais (if-else) - método Feynman

Estruturas condicionais (como o bloco `if-else`) são comandos que usamos no código para tomar decisões. Elas permitem que o programa execute caminhos diferentes baseados em testes lógicos (se algo for verdadeiro, faça isso; senão, faça aquilo).

Sob a perspectiva da **Culinária**, as condicionais funcionam exatamente como **regras de tomada de decisão em uma receita**. Um livro de receitas não é uma lista de passos cegos; ele é cheio de instruções condicionais baseadas no estado físico dos ingredientes:

*   **Se (if):** "A água está fervendo?"
*   **Então (then / bloco if):** "Jogue o macarrão na panela."
*   **Senão (else):** "Espere mais 2 minutos e teste novamente."

---

## Como escrever condicionais no JavaScript

No [[javascript/Introdução ao JavaScript\|JavaScript]], usamos a palavra `if` (se) para testar uma condição (que retorna `true` ou `false`). Se for verdadeira, o bloco dentro das chaves `{}` roda. Usamos o `else` (senão) para definir o caminho alternativo caso a condição seja falsa. 

Frequentemente encapsulamos essas decisões dentro de [[javascript/02-funcoes-e-objetos/Funções|Funções]] para reutilizar a regra em diferentes partes do código:

```javascript
function verificarCozimento(temperaturaAgua) {
  if (temperaturaAgua >= 100) {
    // Bloco "Then" (Então): Executado se a temperatura for maior ou igual a 100
    return "Jogue o macarrão!";
  } else {
    // Bloco "Else" (Senão): Executado se for menor que 100
    return "Aguarde a água ferver.";
  }
}

console.log(verificarCozimento(105)); // Saída: Jogue o macarrão!
```

---

## Adicionando mais opções (else if)

Assim como em uma receita você pode ter caminhos intermediários ("Se o forno estiver muito quente, diminua o fogo; senão, se estiver muito frio, aumente; senão, mantenha"), no código usamos a estrutura `else if`:

```javascript
const tempoForno = 35;

if (tempoForno < 30) {
  console.log("O bolo ainda está cru.");
} else if (tempoForno === 35) {
  console.log("O bolo está assado no ponto certo!");
} else {
  console.log("O bolo passou do ponto e pode queimar!");
}
```

---

## O atalho das condições: operador ternário
Para decisões muito simples (como definir se o frete é grátis ou não com base no valor da compra), os programadores usam um atalho chamado **Operador Ternário** (representado pelos símbolos `?` e `:`):

```javascript
const valorCompra = 150;

// Se valorCompra for maior que 100, frete é 0, senão é 15
const frete = valorCompra > 100 ? 0 : 15;

console.log("Valor do frete:", frete); // Saída: 0
```

---

## Resumo para memorizar

*   **If (Se):** O ponto de decisão. Se o teste retornar `true`, executa o bloco de código logo a seguir.
*   **Else If (Senão Se):** Caminhos intermediários para testar novas condições caso a primeira seja falsa.
*   **Else (Senão):** O caminho padrão executado se nenhuma das condições anteriores for atendida.
*   **Ternário (`? :`):** O atalho para escrever decisões rápidas de linha única.
