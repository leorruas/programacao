# Entendendo var, let e const - método Feynman

Em [[javascript/Introdução ao JavaScript\|JavaScript]], declarar variáveis é como o uso de **pronomes na gramática**.

Em vez de repetir o nome "Leonardo" vinte vezes ao longo de um longo texto, você usa o pronome "ele" para se referir à mesma pessoa. A variável funciona exatamente assim: ela é uma referência substituta que aponta para um dado, evitando que você precise redigitar a mesma informação repetidamente no seu código.

A forma como essa referência se comporta e a região do texto onde ela é válida dependem de qual palavra usamos para criá-la: `var`, `let` ou `const`.

---

## 1. Var: o pronome sem contexto (vazamento)

Imagine escrever uma redação onde um pronome usado dentro de uma citação específica vaza para fora e muda o sentido de todo o restante do texto da página.

*   **[[javascript/06-arquitetura-e-avancado/03-Escopo e closures\|Escopo e Closures]] de [[javascript/02-funções-e-objetos/01-Funções\|Funções]] (Vazamento):** O `var` ignora blocos de código locais (como blocos `if`). Se você cria um `var` dentro de uma condição temporária, ele vaza para o resto do arquivo, podendo ser lido e alterado de qualquer lugar, gerando bugs difíceis de rastrear.
*   **Redeclaração sem Alertas:** Se você acidentalmente declarar duas variáveis com o mesmo nome usando `var`, o [[javascript/Introdução ao JavaScript\|JavaScript]] aceita silenciosamente e sobrescreve o valor anterior sem emitir avisos de erro.

### Exemplo prático:
```javascript
if (true) {
  var brinquedo = "Bola";
}
// A variável "brinquedo" deveria existir apenas dentro da condição, mas ela vaza para fora.
console.log(brinquedo); // Saída: Bola
```

---

## 2. Let: o pronome local (contexto de parágrafo)

O `let` respeita estritamente o parágrafo ou o bloco `{}` onde foi escrito (o chamado [[javascript/06-arquitetura-e-avancado/03-Escopo e closures\|Escopo e Closures]] de bloco).

*   **[[javascript/06-arquitetura-e-avancado/03-Escopo e closures\|Escopo e Closures]] Protegido:** A variável só existe e faz sentido dentro das chaves `{}` onde foi criada. Se você tentar lê-la fora do bloco, o sistema acusa erro, garantindo que as informações fiquem isoladas.
*   **Sem Sobrescrita Acidental:** O sistema impede que você crie duas gavetas de nomes idênticos no mesmo bloco, evitando colisões de nomes.
*   **Conteúdo Mutável:** O valor ao qual o `let` aponta pode ser alterado ao longo do tempo (você pode reatribuir o pronome para apontar para outra palavra).

### Exemplo prático:
```javascript
if (true) {
  let ferramenta = "Martelo";
  console.log(ferramenta); // Saída: Martelo
}
// Fora do bloco, a variável ferramenta não existe.
// console.log(ferramenta); // Erro: ferramenta não está definida
```

---

## 3. Const: o substantivo fixo (cofre semântico)

O `const` funciona como o `let` (respeita os limites do bloco `{}`), mas com uma trava rígida: a referência que você criou é permanente e inalterável.

*   **Inalterável:** Uma vez definida para apontar para um valor, a variável não pode ser reatribuída para apontar para outro valor.
*   **O Caso Especial ([[javascript/02-funções-e-objetos/03-Objetos\|Objetos]] e Arrays):** Pense na variável como um documento em papel guardado no cofre. Você não pode trocar o papel por outro documento, mas pode escrever novas anotações nas linhas em branco daquele mesmo papel (ou seja, você pode alterar as propriedades internas de [[javascript/02-funções-e-objetos/03-Objetos\|Objetos]] e arrays declarados com `const`).

### Exemplo prático:
```javascript
const gravidade = 9.8;
// gravidade = 10; // Erro: Não é permitido alterar o valor de um const

const usuario = { nome: "Ana" };
usuario.nome = "Carlos"; // Permitido: Alterou uma propriedade do mesmo objeto.
// usuario = { nome: "Beto" }; // Erro: Tentativa de reatribuir o objeto inteiro.
```

---

## Conceitos Fundamentais: Escopo, Redeclaração e Reatribuição

Para consolidar e não confundir as regras do jogo, precisamos dominar três conceitos fundamentais:

### 1. Escopo (Onde a variável vive)
O escopo determina a visibilidade e a "fronteira de segurança" da sua variável:
*   **Escopo de Bloco (`let` e `const`):** A variável fica restrita e protegida dentro de qualquer par de chaves `{}` (como blocos de `if`, loops `for` e `while`, ou funções). Se você tentar acessá-la de fora daquele bloco, o JavaScript acusa erro.
*   **Escopo de Função (`var`):** O `var` ignora blocos de chaves (como `if`), vazando e espalhando-se por todo o arquivo, a menos que ele seja declarado especificamente dentro do corpo de uma **função**.

---

### 2. Redeclaração vs. Reatribuição (Criar de novo vs. Mudar o conteúdo)

Muitas pessoas confundem esses dois comportamentos. A diferença é simples:

*   **Redeclaração (Criar uma nova gaveta com o mesmo nome):**
    Significa tentar criar novamente a variável no mesmo escopo usando as palavras-chave (`var` ou `let`).
    *   O `var` **permite** redeclaração silenciosa (o que gera bugs ocultos, pois você pode sobrescrever um valor sem saber).
    *   O `let` e o `const` **proíbem** redeclaração (o navegador impede a execução e mostra um erro de sintaxe imediatamente).

    ```javascript
    // Com var (Permitido, mas perigoso):
    var nome = "Ana";
    var nome = "Beatriz"; // Funciona sem erros!
    
    // Com let (Proibido):
    let idade = 20;
    let idade = 25; //  Erro: Identifier 'idade' has already been declared
    ```

*   **Reatribuição (Substituir o valor dentro da gaveta existente):**
    Significa apenas mudar o dado guardado na variável já existente (sem redigitar as palavras-chave `let` ou `var`).
    *   O `var` e o `let` **permitem** reatribuição livremente.
    *   O `const` **proíbe** reatribuição (sua referência é permanente).

    ```javascript
    // Com let (Permite reatribuição):
    let saldo = 100;
    saldo = 150; // Funciona perfeitamente!
    
    // Com const (Proíbe reatribuição):
    const pi = 3.14;
    pi = 3.1415; //  Erro: Assignment to constant variable.
    ```

---

### Tabela Comparativa

| Palavra-chave | Escopo | Permite Redeclarar? | Permite Reatribuir? |
| :--- | :--- | :--- | :--- |
| `var` | Função | **Sim** | **Sim** |
| `let` | Bloco | Não | **Sim** |
| `const` | Bloco | Não | Não |

---

## O que é hoisting (içamento) na prática?

Para entender detalhadamente como o [[javascript/Introdução ao JavaScript\|JavaScript]] processa essas caixas antes de rodar o código, veja a nota sobre [[javascript/01-fundamentos/08-Hoisting|Hoisting]]. Em resumo:

*   **Com Var:** O [[javascript/Introdução ao JavaScript\|JavaScript]] é tolerante. Ele sabe que a caixa vai chegar, então ele diz "a caixa existe, mas está vazia por enquanto" (retorna undefined).
*   **Com Let e Const:** O [[javascript/Introdução ao JavaScript\|JavaScript]] é rigoroso. Se você tentar procurar pela gaveta ou pelo cofre antes de a linha que os cria ser executada, ele gera um erro de leitura imediato. Esse período de espera entre o início do código e a criação real da gaveta é chamado de Zona Morta Temporal.

---

## Resumo para memorizar

*   **Var:** Evite sempre. É uma caixa sem segurança que pode ser mexida por qualquer um e de qualquer lugar.
*   **Let:** Use quando você sabe que o valor guardado vai precisar mudar ao longo do tempo (como um contador de cliques).
*   **Const:** Use por padrão para tudo. Se o valor não precisa mudar, mantenha-o seguro em um cofre.
