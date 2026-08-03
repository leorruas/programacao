# Entendendo callbacks - método Feynman

Uma **[[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] Callback** é uma [[javascript/02-funcoes-e-objetos/01-Funções\|função]] que é passada como argumento para outra [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]], para ser executada ("chamada de volta") mais tarde, quando um determinado [[javascript/04-dom-e-browser/04-Eventos\|Eventos]] acontecer ou uma tarefa for concluída.

Sob a perspectiva do **cotidiano**, imagine que você vai a uma cafeteria movimentada:
* Você faz o pedido do café (chama a [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] principal).
* O atendente lhe entrega um **pager / bip** (a [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] callback).
* Você não precisa ficar parado no balcão esperando. Você pode sentar, ler um livro ou mexer no celular (código assíncrono rodando).
* Quando o café fica pronto, o bip vibra (a [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] callback é finalmente executada).

---

## Por que usar callbacks?

No [[javascript/Introdução ao JavaScript\|JavaScript]], muitas tarefas levam tempo para terminar (como ler um arquivo, carregar uma imagem ou buscar dados de uma [[javascript/05-assincrono/02-API\|API]]). Se o código parasse tudo para esperar essas tarefas, a página iria travar. 

Os callbacks permitem que o código continue rodando e só execute a ação de resposta quando o trabalho demorado terminar.

---

## Como funciona na prática?

### 1. Criando e passando um callback manualmente

```javascript
// Função que recebe outra função (o callback) como parâmetro
function prepararCafe(tipo, callback) {
  console.log(`Preparando seu ${tipo}...`);
  
  // Simulando um tempo de preparo (ex: 2 segundos)
  setTimeout(() => {
    console.log(`Café ${tipo} pronto!`);
    
    // Executamos o callback que foi passado por argumento
    callback(); 
  }, 2000);
}

// Criando a função callback
function avisarCliente() {
  console.log("Bip bip! Seu café está pronto para retirada.");
}

// Chamamos a função principal passando a função callback por argumento
prepararCafe("Expresso", avisarCliente);
```

### 2. O uso mais comum: funções anônimas / arrow functions

Geralmente, não criamos uma [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] separada com nome apenas para usar como callback. Nós a escrevemos diretamente dentro dos argumentos da chamada (usando [[javascript/02-funcoes-e-objetos/02-Arrow functions\|Arrow Functions]]):

```javascript
prepararCafe("Cappuccino", () => {
  console.log("Pegando o cappuccino no balcão!");
});
```

---

## Onde você mais vai ver callbacks no JavaScript?

1. **Manipulando [[javascript/04-dom-e-browser/04-Eventos\|Eventos]]:**
   ```javascript
   const botao = document.querySelector("button");
   
   // O segundo argumento é uma função callback executada a cada clique
   botao.addEventListener("click", () => {
     console.log("O botão foi clicado!");
   });
   ```

2. **Temporizadores:**
   ```javascript
   // Executa o callback após 3 segundos
   setTimeout(() => {
     console.log("Tempo esgotado!");
   }, 3000);
   ```

3. **[[javascript/03-manipulacao/03-Métodos de array\|Métodos de Array]]:**
   ```javascript
   const precos = [10, 20, 30];
   // A função dentro do map é um callback
   const precosComDesconto = precos.map(preco => preco * 0.9);
   ```
