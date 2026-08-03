# Protótipos e __proto__ no JavaScript - método Feynman

No [[javascript/Introdução ao JavaScript\|JavaScript]], quase tudo é um [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]]. Para fazer com que um [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] herde propriedades e métodos de outro de maneira eficiente, o [[javascript/Introdução ao JavaScript\|JavaScript]] utiliza o conceito de **[[javascript/02-funcoes-e-objetos/07-Protótipos e proto\|Protótipos e Proto]] (Prototypes)**.

Sob a perspectiva das **Relações de Família**, o sistema de [[javascript/02-funcoes-e-objetos/07-Protótipos e proto\|Protótipos e Proto]] funciona exatamente como uma **Oficina de Ferramentas Compartilhada em Família**.

---

## A analogia da oficina familiar

Imagine uma família de marceneiros onde o conhecimento e as ferramentas são passados de geração em geração:

*   **As suas ferramentas pessoais (O [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] Atual):** São as ferramentas que você comprou e guardou na sua gaveta pessoal. Se você precisa de uma chave de fenda e ela está lá, você a usa imediatamente.
*   **A caixa de ferramentas do seu pai (O [[javascript/02-funcoes-e-objetos/07-Protótipos e proto\|Protótipos e Proto]] `__proto__`):** Se você precisa de um martelo e não o encontra na sua gaveta, você não compra um novo. Você vai até a oficina do seu pai para ver se ele tem. A ligação que te leva até a oficina do seu pai é o link `__proto__`.
*   **A caixa do seu avô (Cadeia de [[javascript/02-funcoes-e-objetos/07-Protótipos e proto\|Protótipos e Proto]] / Prototype Chain):** Se seu pai também não tiver a ferramenta, ele olha na caixa do pai dele (seu avô). Esse processo de subir de geração em geração continua até chegar ao patriarca original da família (`Object.prototype`). Se ninguém na família tiver a ferramenta, você desiste (retorna `undefined`).
*   **O Molde de Fábrica (O `prototype`):** É o blueprint, o manual de fabricação que a fábrica usa para criar as ferramentas que toda a família compra. Ele determina quais características o [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] terá por padrão ao ser criado.

---

## 1. __proto__ vs prototype (o link de herança vs o molde)

Uma das maiores confusões em [[javascript/Introdução ao JavaScript\|JavaScript]] é a diferença entre essas duas propriedades. Seguindo a analogia:

### __proto__ (a conexão com o pai)
*   Existe em **todos os [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] criados**.
*   É o caminho ou "ponte" que liga o seu [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] direto ao [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] pai de onde ele herda as coisas.
*   *Na analogia: É a trilha que você faz até a gaveta de ferramentas do seu pai.*

### Prototype (o molde da fábrica)
*   Existe **apenas em [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] construtoras** (e [[javascript/02-funcoes-e-objetos/09-Classes\|Classes]]).
*   É o molde usado para fabricar novos [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] quando usamos a palavra-chave `new`. Tudo que for colocado dentro deste molde será acessível pelo `__proto__` dos [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] gerados.
*   *Na analogia: É o desenho técnico usado na fábrica para criar novas caixas de ferramentas.*

---

## 2. Exemplo prático de cadeia de protótipos

Vamos ver na prática como criamos essa relação de herança usando [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] simples:

```javascript
// O "Pai" da família
const carpinteiroPai = {
  ferramenta: "Serra Circular",
  trabalhar() {
    console.log("Cortando madeira com a " + this.ferramenta);
  }
};

// O "Filho" da família
const carpinteiroFilho = {
  ferramenta: "Martelo Manual"
};

// Estabelecendo a ligação: O Filho herda do Pai
Object.setPrototypeOf(carpinteiroFilho, carpinteiroPai);

// 1. Usando ferramenta própria
console.log(carpinteiroFilho.ferramenta); // Saída: "Martelo Manual" (está na gaveta dele)

// 2. Buscando comportamento herdado do Pai
carpinteiroFilho.trabalhar(); // Saída: "Cortando madeira com a Martelo Manual"
```

### Como o JavaScript interpretou ___placeholder_12___?
1.  Buscou o método `trabalhar` dentro do próprio [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] `carpinteiroFilho`. Não encontrou.
2.  Seguiu o link `__proto__` até `carpinteiroPai`.
3.  Encontrou o método `trabalhar` no pai e o executou.
4.  O `this.ferramenta` referenciou a ferramenta do próprio filho ("Martelo Manual") porque ele foi o chamador da ação.

---

## 3. Visualizando o fim da cadeia

Toda herança no [[javascript/Introdução ao JavaScript\|JavaScript]] tem um fim. A cadeia de [[javascript/02-funcoes-e-objetos/07-Protótipos e proto\|Protótipos e Proto]] sempre termina no [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] raiz do [[javascript/Introdução ao JavaScript\|JavaScript]]:

```javascript
console.log(carpinteiroFilho.__proto__ === carpinteiroPai); // true
console.log(carpinteiroPai.__proto__ === Object.prototype);   // true
console.log(Object.prototype.__proto__);                     // null (Chegamos ao fim)
```

---

## 4. Métodos modernos (boas práticas)

Evite ler ou escrever diretamente na propriedade `__proto__` no seu código de produção, pois isso prejudica o desempenho do motor do [[javascript/Introdução ao JavaScript\|JavaScript]]. Utilize sempre os métodos oficiais:

*   **Para buscar o [[javascript/02-funcoes-e-objetos/07-Protótipos e proto\|Protótipos e Proto]] de um [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]]:**
    ```javascript
    Object.getPrototypeOf(objeto);
    ```
*   **Para definir o [[javascript/02-funcoes-e-objetos/07-Protótipos e proto\|Protótipos e Proto]] de um [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] existente:**
    ```javascript
    Object.setPrototypeOf(objeto, novoPrototipo);
    ```
*   **Para criar um [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] já herdando de outro:**
    ```javascript
    const novoObjeto = Object.create(objetoPai);
    ```

---

## Resumo para memorizar

*   **[[javascript/02-funcoes-e-objetos/07-Protótipos e proto\|Protótipos e Proto]]:** É o [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] do qual outro [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] herda propriedades e métodos.
*   **[[javascript/02-funcoes-e-objetos/07-Protótipos e proto\|Protótipos e Proto]]:** O link real de cada [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] apontando para o seu [[javascript/02-funcoes-e-objetos/07-Protótipos e proto\|Protótipos e Proto]] pai.
*   **[[javascript/02-funcoes-e-objetos/07-Protótipos e proto\|Protótipos e Proto]]:** A propriedade de [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] construtoras que serve de molde para gerar o `__proto__` das novas instâncias.
*   **Cadeia de [[javascript/02-funcoes-e-objetos/07-Protótipos e proto\|Protótipos e Proto]]:** A busca sequencial de propriedades subindo de pai em pai até chegar em `null`.
