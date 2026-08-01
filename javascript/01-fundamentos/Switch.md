# O desvio de fluxo com switch: a central de triagem - método Feynman

A estrutura condicional **`switch`** é usada em [[javascript/Introdução ao JavaScript\|JavaScript]] para desviar o fluxo de execução do código comparando uma única variável contra múltiplos valores possíveis. Ela serve como uma alternativa mais limpa e organizada a escrever dezenas de blocos `else if` repetitivos.

Sob a perspectiva da **Administração e Logística**, a estrutura `switch` funciona exatamente como uma **central de triagem de encomendas**.

---

## A analogia da central de triagem de pacotes

Imagine uma esteira de separação em um centro de distribuição dos Correios:

*   **A encomenda (A variável avaliada):** É o pacote que chega na esteira contendo uma etiqueta de destino (ex: `estado = "SP"`).
*   **Os desvios (Os blocos `case`):** São os portões de saída da esteira. Cada portão representa um destino cadastrado (*caso* seja "SP", desvie para o caminhão A; *caso* seja "RJ", desvie para o caminhão B).
*   **A trava de saída (A palavra-chave `break`):** É o braço mecânico que empurra o pacote para fora da esteira assim que ele entra no portão correto. **Atenção:** Se você esquecer de colocar o `break`, a esteira não para e o pacote continuará deslizando por todos os portões seguintes, caindo nos caminhões errados (o efeito de *fall-through* no [[javascript/Introdução ao JavaScript\|JavaScript]]).
*   **O portão padrão (O bloco `default`):** É a caixa de encomendas sem etiqueta ou com destinos não identificados. Se o pacote não corresponder a nenhum portão cadastrado, ele cai no caminhão de triagem manual (fallback).

---

## Como escrever o switch no JavaScript

A sintaxe organiza os testes em casos e exige o uso de travas (`break`) para fechar cada caminho:

```javascript
const destino = "SP";

switch (destino) {
  case "RJ":
    console.log("Enviar para o caminhão do Rio de Janeiro.");
    break; // Trava a execução e sai do switch
    
  case "SP":
    console.log("Enviar para o caminhão de São Paulo.");
    break; // Trava a execução e sai do switch
    
  case "MG":
    console.log("Enviar para o caminhão de Minas Gerais.");
    break;
    
  default:
    // Executado se o destino não corresponder a nenhum dos "cases" acima
    console.log("Destino não identificado. Enviar para triagem manual.");
}
// Saída no console: Enviar para o caminhão de São Paulo.
```

---

## Switch vs. if-else: quando escolher?

Use **`switch`** quando:
*   Você estiver testando uma única variável contra uma lista de valores de texto ou números discretos e exatos (ex: estados de botão, rotas de URL, perfis de acesso).

Use **`if-else`** quando:
*   As suas condições envolverem faixas de números complexas (ex: `temperatura > 30 && temperatura < 40`), comparações de maior/menor ou testes compostos com vários operadores lógicos.

---

## Conexões com o restante do vault

*   O `switch` recebe avaliações baseadas nos operadores de igualdade estrita (`===`) detalhados em **[[javascript/01-fundamentos/Operadores e operações|Operadores e Operações]]**.
*   Ele é a estrutura ideal para gerenciar modificações de estados simples, frequentemente chamados por **[[javascript/04-dom-e-browser/Eventos|Eventos]]** na tela.

---

## Resumo para memorizar

*   **Switch:** Uma central de triagem para guiar uma variável por diferentes caminhos.
*   **Case (Caso):** Cada um dos valores específicos que você deseja comparar.
*   **Break (Interromper):** A trava obrigatória para o código sair do switch após encontrar a resposta certa.
*   **Default (Padrão):** O caminho alternativo executado caso nenhuma das opções anteriores seja atendida.
