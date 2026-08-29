# Entendendo o event loop e call stack - método Feynman

O [[javascript/Introdução ao JavaScript\|JavaScript]] é uma linguagem de programação single-threaded, o que significa que ele possui apenas um "braço" de execução. Ele só consegue processar uma linha de código por vez. 

Para gerenciar tarefas lentas e cliques do usuário sem travar, ele usa o sistema de **[[javascript/06-arquitetura-e-avancado/07-Event loop e call stack\|Event Loop e Call Stack]]** (Pilha de Chamadas) e **[[javascript/06-arquitetura-e-avancado/07-Event loop e call stack\|Event Loop e Call Stack]]** (Laço de [[javascript/04-dom-e-browser/04-Eventos\|Eventos]]).

---

## A analogia da fila de carregamento de imagens do Figma

Imagine que você está abrindo um arquivo de design pesado no Figma:

1.  **A [[javascript/06-arquitetura-e-avancado/07-Event loop e call stack\|Event Loop e Call Stack]] (A Mesa do Designer):** É o seu espaço de trabalho imediato. Você só consegue segurar e editar um elemento de cada vez na sua mão. Quando você finaliza um elemento, você o devolve à tela e pega o próximo. Se chegar uma tarefa que demora 1 hora para processar na sua mesa, você ficaria travado sem fazer mais nada.
2.  **O Navegador (Os Assistentes em Segundo Plano):** Quando você precisa de uma tarefa demorada (como carregar uma imagem em altíssima resolução), você não fica parado esperando. Você entrega a tarefa para o assistente e diz: *"Carregue essa imagem em segundo plano para mim. Quando terminar, coloque o aviso na minha caixa de entrada"*.
3.  **A [[javascript/05-assincrono/01-Callbacks\|Callbacks]] Queue (A Caixa de Entrada):** Quando o assistente termina de carregar a imagem, ele coloca a tarefa finalizada em uma fila de tarefas concluídas, esperando você ler.
4.  **O [[javascript/06-arquitetura-e-avancado/07-Event loop e call stack\|Event Loop e Call Stack]] (O Coordenador de Fluxo):** É o coordenador que fica olhando para a sua mesa ([[javascript/06-arquitetura-e-avancado/07-Event loop e call stack\|Event Loop e Call Stack]]). Assim que a sua mesa fica vazia (você terminou o que estava fazendo), o [[javascript/06-arquitetura-e-avancado/07-Event loop e call stack\|Event Loop e Call Stack]] pega a primeira tarefa da fila da Caixa de Entrada ([[javascript/05-assincrono/01-Callbacks\|Callbacks]] Queue) e coloca na sua mesa para você desenhar na tela.

---

## Como o JavaScript executa as tarefas na prática

O navegador divide as tarefas em síncronas (execução imediata) e assíncronas (segundo plano):

```javascript
console.log("Tarefa 1: Início"); // Vai direto para a Call Stack e roda na hora

// Tarefa 2: Enviada para o navegador rodar em segundo plano
setTimeout(function() {
  console.log("Tarefa 2: Concluída em segundo plano");
}, 1000);

console.log("Tarefa 3: Fim"); // Vai para a Call Stack e roda imediatamente
```

### O que acontece por trás das cenas:
1.  `Tarefa 1: Início` é impresso imediatamente.
2.  O `setTimeout` (Tarefa 2) é enviado para o temporizador do navegador rodar em segundo plano.
3.  `Tarefa 3: Fim` é impresso imediatamente. A [[javascript/06-arquitetura-e-avancado/07-Event loop e call stack\|Event Loop e Call Stack]] fica vazia.
4.  Após 1 segundo, a [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] da `Tarefa 2` entra na [[javascript/05-assincrono/01-Callbacks\|Callbacks]] Queue.
5.  O **[[javascript/06-arquitetura-e-avancado/07-Event loop e call stack\|Event Loop e Call Stack]]** percebe que a [[javascript/06-arquitetura-e-avancado/07-Event loop e call stack\|Event Loop e Call Stack]] está vazia e joga a `Tarefa 2` na [[javascript/06-arquitetura-e-avancado/07-Event loop e call stack\|Event Loop e Call Stack]], imprimindo o texto final.

---

## Resumo para memorizar

*   **[[javascript/06-arquitetura-e-avancado/07-Event loop e call stack\|Event Loop e Call Stack]]:** A pilha de tarefas imediatas do [[javascript/Introdução ao JavaScript\|JavaScript]]. Só executa uma coisa por vez.
*   **Web [[csharp/25-Consumindo APIs em Csharp\|API]] (Navegador):** Os assistentes que cuidam de tarefas demoradas (temporizadores, [[javascript/05-assincrono/03-Fetch\|Fetch]]) em segundo plano.
*   **[[javascript/05-assincrono/01-Callbacks\|Callbacks]] Queue:** A lista de tarefas prontas que esperam para serem executadas.
*   **[[javascript/06-arquitetura-e-avancado/07-Event loop e call stack\|Event Loop e Call Stack]]:** O coordenador que vigia a [[javascript/06-arquitetura-e-avancado/07-Event loop e call stack\|Event Loop e Call Stack]]. Quando ela fica livre, ele puxa a próxima tarefa concluída da fila de espera.
