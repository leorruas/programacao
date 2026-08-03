# Entendendo async e await - método Feynman

No desenvolvimento web, o [[javascript/Introdução ao JavaScript\|JavaScript]] executa tarefas que demoram para responder (como carregar uma imagem pesada ou puxar dados de um servidor distante). Para evitar que o site trave enquanto espera, usamos o assincronismo.

O **Async/Await** é a forma moderna e legível de gerenciar esse tempo de espera, fazendo com que o código pareça seguir um fluxo de leitura comum.

---

## A analogia do menu no restaurante

Imagine que você está em um restaurante self-service versus um restaurante à la carte com um garçom (o [[javascript/05-assincrono/03-Fetch|Fetch]]):

*   **Com [[javascript/01-fundamentos/Fetch\|Fetch]] e Promessas tradicionais (.then):** Você faz o pedido ao garçom. Ele vai para a cozinha. Você precisa programar uma resposta para quando ele voltar: *"Quando (then) ele trouxer a comida, eu como. Se (catch) ele derrubar o prato, eu reclamo"*. O código pode ficar cheio de blocos encadeados e difíceis de ler.
*   **Com Async/Await (A pausa inteligente):** Você escreve o código como se estivesse vivendo uma conversa normal. Você diz ao garçom: *"Vou fazer o pedido"* e, na linha seguinte, você adiciona uma regra de **espera (await)**. O seu código congela temporariamente naquela linha exata até que o prato chegue, e depois continua a execução de forma linear.

---

## Como funciona no JavaScript

Para usar essa estrutura, precisamos de duas palavras-chave:
1.  **async:** Colocamos antes da declaração da [[javascript/01-fundamentos/Funções\|Funções]] para avisar ao [[javascript/Introdução ao JavaScript\|JavaScript]] que dentro dela haverá tarefas demoradas.
2.  **await:** Colocamos logo antes da instrução que precisa esperar a resposta (como a busca com o [[javascript/05-assincrono/03-Fetch|Fetch]]).

```javascript
// O "async" prepara a função para lidar com esperas
async function buscarDadosDoUsuario() {
  
  // O "await" pausa a execução até que o Fetch traga os dados
  const resposta = await fetch("https://api.exemplo.com/usuario");
  
  // Espera a conversão do texto em dados estruturados (JSON)
  const dados = await resposta.json(); // Formato [[javascript/03-manipulacao/08-JSON|JSON]]
  
  // Agora que temos os dados prontos, o código continua
  console.log("Nome do usuário:", dados.nome);
}

// Ativando a função
buscarDadosDoUsuario();
```

---

## Como capturar erros com async/Await?

Como não usamos o método `.catch()` diretamente, usamos uma estrutura padrão de controle chamada **[[javascript/06-arquitetura-e-avancado/Tratamento de erros\|Tratamento de Erros]]** (tentar/capturar), explicada em [[javascript/06-arquitetura-e-avancado/06-Tratamento de erros|Tratamento de erros]]:

```javascript
async function carregarDesign() {
  try {
    // Tente executar este bloco de código
    const design = await fetch("https://api.exemplo.com/layout");
    const dados = await design.json();
    console.log("Layout carregado com sucesso!");
  } catch (erro) {
    // Se qualquer linha acima der erro, o JavaScript pula direto para cá
    console.log("Falha ao carregar o layout. Erro:", erro);
  }
}
```

---

## Resumo para memorizar

*   **async:** Indica que uma [[javascript/01-fundamentos/Funções\|Funções]] é assíncrona e permite o uso da palavra `await` dentro dela.
*   **await:** Pausa a leitura da [[javascript/01-fundamentos/Funções\|Funções]] até que a promessa (Promise) seja resolvida (dados entregues).
*   **[[javascript/06-arquitetura-e-avancado/Tratamento de erros\|Tratamento de Erros]]:** A estrutura usada para envelopar o código assíncrono e gerenciar erros de forma limpa.
