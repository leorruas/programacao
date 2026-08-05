# Dot notation e propriedades no JavaScript - método Feynman

Em [[javascript/Introdução ao JavaScript\|JavaScript]], [[javascript/02-funções-e-objetos/03-Objetos\|objetos]] são coleções de dados armazenados como pares de chave e valor. As variáveis salvas dentro de um [[javascript/02-funções-e-objetos/03-Objetos\|Objetos]] são chamadas de **Propriedades**, e o ponto (`.`) usado para acessá-las é chamado de **[[javascript/02-funções-e-objetos/04-Dot notation e propriedades\|Dot Notation]]** ([[javascript/02-funções-e-objetos/04-Dot notation e propriedades\|Dot Notation]]).

Sob a perspectiva do **Organizador de Arquivos**, a [[javascript/02-funções-e-objetos/04-Dot notation e propriedades\|Dot Notation]] funciona exatamente como o caminho de **Navegação de Pastas no Computador**.

---

## A analogia da navegação por pastas

Imagine o seu computador gerenciando os arquivos de um projeto de design:

*   **O [[javascript/02-funções-e-objetos/03-Objetos\|Objetos]]:** É a pasta principal do projeto no seu sistema (ex: `ProjetoFigma`).
*   **As Propriedades:** São os arquivos de mídia ou subpastas salvas lá dentro (ex: `logo`, `corPrincipal`, `autor`).
*   **A [[javascript/02-funções-e-objetos/04-Dot notation e propriedades\|Dot Notation]] (`.`):** É o ato de clicar na barra para abrir a subpasta (`ProjetoFigma.logo`). O ponto funciona como um divisor que diz ao computador: *"Abra esta pasta e pegue este item que está lá dentro"*.
*   **A Bracket Notation (`[]`):** É a barra de pesquisa do sistema. Em vez de clicar diretamente no arquivo, você digita o nome dele em uma busca entre colchetes (`ProjetoFigma["logo"]`), o que te permite usar termos dinâmicos ou variáveis para encontrar o item.

---

## 1. Guia exaustivo de tipos de propriedades

No [[javascript/Introdução ao JavaScript\|JavaScript]], uma propriedade não é apenas um texto ou número. Ela pode assumir diferentes papéis dentro do [[javascript/02-funções-e-objetos/03-Objetos\|Objetos]]:

| Tipo de Propriedade | Descrição | Exemplo de Uso | Para que serve? |
| :--- | :--- | :--- | :--- |
| **Propriedade Primitiva** | Armazena dados simples como números, textos ou booleanos. | `usuario.idade = 25` | Guardar características diretas do [[javascript/02-funções-e-objetos/03-Objetos\|Objetos]]. |
| **Método ([[javascript/02-funções-e-objetos/01-Funções\|Funções]])** | Armazena uma [[javascript/02-funções-e-objetos/01-Funções\|função]] executável dentro do [[javascript/02-funções-e-objetos/03-Objetos\|Objetos]]. | `usuario.salvar = function() {}` | Definir ações que o [[javascript/02-funções-e-objetos/03-Objetos\|Objetos]] sabe realizar. |
| **[[javascript/02-funções-e-objetos/03-Objetos\|Objetos]] Aninhado** | Armazena outro [[javascript/02-funções-e-objetos/03-Objetos\|Objetos]] como valor da chave. | `usuario.endereco = { rua: "A" }` | Estruturar dados complexos e hierárquicos. |
| **Array de Propriedades** | Armazena listas de itens indexados. | `usuario.habilidades = ["JS", "CSS"]` | Guardar múltiplos valores ordenados. |
| **Propriedade Acessora (Get/Set)** | Propriedades dinâmicas controladas por [[javascript/02-funções-e-objetos/01-Funções\|Funções]] `get` e `set`. | `get nomeCompleto() { return ... }` | Interceptar leituras e modificações com lógica customizada. Veja [[javascript/02-funções-e-objetos/10-Get e set\|Get e Set]]. |
| **Chaves de Tipo Symbol** | Propriedades cujas chaves usam o tipo `Symbol()`. | `const id = Symbol(); obj[id] = 123` | Criar propriedades privadas ou ocultas que evitam colisão de nomes. |

---

## 2. Meta-propriedades: os atributos internos (property descriptors)

Por baixo dos panos, toda propriedade criada em um [[javascript/02-funções-e-objetos/03-Objetos\|Objetos]] possui 4 **atributos ocultos de configuração** (chamados de *Property Descriptors*). Eles determinam as permissões daquela propriedade:

```javascript
// Podemos inspecionar esses atributos usando Object.getOwnPropertyDescriptor:
const produto = { preco: 100 };
console.log(Object.getOwnPropertyDescriptor(produto, "preco"));
/*
Saída:
{
  value: 100,         // O valor real armazenado
  writable: true,     // Pode ser alterado?
  enumerable: true,   // Aparece em loops (for...in) e Object.keys?
  configurable: true  // Pode ser deletado ou ter suas regras alteradas?
}
*/
```

### Para que serve cada meta-atributo?

1.  **`value`**: O dado real contido na propriedade.
2.  **`writable`**: Se `false`, a propriedade torna-se somente leitura. Tentativas de alterá-la serão ignoradas (ou gerarão erro no Strict Mode).
3.  **`enumerable`**: Se `false`, a propriedade fica "invisível" para repetições como `for...in`, `Object.keys()` e `JSON.stringify()`.
4.  **`configurable`**: Se `false`, a propriedade não pode ser deletada com o operador `delete`, e suas regras (`writable`, `enumerable`) não podem mais ser alteradas.

---

## 3. Métodos nativos de manipulação exaustiva de propriedades

O [[javascript/Introdução ao JavaScript\|JavaScript]] oferece métodos estáticos no [[javascript/02-funções-e-objetos/03-Objetos\|Objetos]] global `Object` para inspecionar, extrair e modificar propriedades de forma avançada:

### Extração e inspeção
*   **`Object.keys(obj)`**: Retorna um array com os nomes de todas as propriedades públicas (enumeráveis).
*   **`Object.values(obj)`**: Retorna um array contendo apenas os valores de todas as propriedades.
*   **`Object.entries(obj)`**: Retorna um array de pares `[chave, valor]`, ideal para iterar com `forEach` ou `for...of`.
*   **`Object.getOwnPropertyNames(obj)`**: Retorna um array com TODAS as propriedades (mesmo as ocultas/não enumeráveis).
*   **`Object.getOwnPropertySymbols(obj)`**: Retorna apenas as propriedades cujas chaves são do tipo `Symbol`.

### Configuração fina
*   **`Object.defineProperty(obj, prop, descriptor)`**: Cria ou altera uma propriedade definindo manualmente seus atributos (`writable`, `enumerable`, `configurable`).
    ```javascript
    const usuario = {};
    Object.defineProperty(usuario, "cpf", {
      value: "123.456.789-00",
      writable: false,     // Não pode ser alterado
      enumerable: true,    // Aparece em buscas
      configurable: false  // Não pode ser deletado
    });
    ```

---

## 4. Bloqueio e proteção de propriedades (travar objetos)

Para evitar que propriedades sejam adicionadas, alteradas ou deletadas acidentalmente, o [[javascript/Introdução ao JavaScript\|JavaScript]] fornece 3 níveis de segurança:

1.  **`Object.preventExtensions(obj)`**: Impede a adição de **novas** propriedades. Permite alterar e deletar as existentes.
2.  **`Object.seal(obj)`**: "Sela" o [[javascript/02-funções-e-objetos/03-Objetos\|Objetos]]. Impede adicionar ou deletar propriedades, mas **permite alterar** os valores das propriedades existentes que forem `writable`.
3.  **`Object.freeze(obj)`**: "Congela" o [[javascript/02-funções-e-objetos/03-Objetos\|Objetos]] completamente. Impede adições, deleções e alterações de valores. O [[javascript/02-funções-e-objetos/03-Objetos\|Objetos]] torna-se 100% imutável.

---

## 5. Dot notation vs. bracket notation (notação de colchetes)

Apesar de a [[javascript/02-funções-e-objetos/04-Dot notation e propriedades\|Dot Notation]] ser a preferida no dia a dia, ela tem limitações sintáticas. Nesses casos, usamos a **Bracket Notation** (`objeto["propriedade"]`).

### Tabela de comparação

| Cenário | [[javascript/02-funções-e-objetos/04-Dot notation e propriedades\|Dot Notation]] (`.`) | Bracket Notation (`[]`) |
| :--- | :--- | :--- |
| **Nomes simples sem espaço** | `usuario.nome` | `usuario["nome"]` |
| **Nomes com espaços ou hífens** | Erro de Sintaxe | `usuario["nome completo"]` |
| **Nomes que começam com números** | Erro de Sintaxe | `usuario["2024_status"]` |
| **Chave vinda de uma variável** | Acessa a palavra literal | `usuario[chaveVariavel]` |

### Exemplo: acessando propriedades via variáveis dinâmicas

```javascript
const usuario = {
  nome: "Ana",
  funcao: "Desenvolvedora"
};

const campoBuscado = "funcao";

//  Procura literalmente pela propriedade chamada "campoBuscado" (retorna undefined)
console.log(usuario.campoBuscado); // undefined

//  Lê o VALOR da variável campoBuscado ("funcao") e acessa usuario.funcao
console.log(usuario[campoBuscado]); // Saída: "Desenvolvedora"
```

---

## 6. Deletando e verificando propriedades

*   **Deletar:** Use o operador `delete` (`delete objeto.propriedade`).
*   **Verificar existência:** Use o operador `'propriedade' in objeto` ou `objeto.hasOwnProperty('propriedade')`.

---

## Resumo para memorizar

*   **Propriedade:** Associação de chave e valor (primitivos, [[javascript/02-funções-e-objetos/03-Objetos\|Objetos]], arrays, métodos ou getters/setters).
*   **Property Descriptors:** Atributos invisíveis (`value`, `writable`, `enumerable`, `configurable`) que gerenciam a segurança de cada propriedade.
*   **[[javascript/02-funções-e-objetos/04-Dot notation e propriedades\|Dot Notation]] (`.`):** Forma direta para acessar propriedades simples.
*   **Bracket Notation (`[]`):** Forma obrigatória para variáveis dinâmicas ou chaves com caracteres especiais.
*   **Proteção de Objetos:** `freeze` (congelamento total), `seal` (selamento sem deleção/adição) e `preventExtensions` (impede apenas novos membros).
