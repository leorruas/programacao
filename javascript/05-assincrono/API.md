# Entendendo o que é uma API - método Feynman

API significa Application Programming Interface (Interface de Programação de Aplicações). 

Para entender de forma simples: a API é a **Tomada Elétrica** ou o **Plug-in** que conecta dois sistemas diferentes.

---

## A analogia da tomada elétrica

Quando você precisa ligar o seu computador ou um carregador de celular na energia, você não precisa saber como a eletricidade é gerada na usina hidrelétrica, nem como os cabos passam por baixo da terra da sua cidade.

Tudo o que você precisa fazer é conectar o plugue do seu aparelho na tomada da parede.

A tomada é a **Interface** (o ponto de contato). Ela estabelece uma regra simples: se você tiver um plugue compatível, você receberá energia elétrica. 

A API faz exatamente a mesma coisa para o software: ela é uma porta padronizada que permite que um sistema use as [[javascript/01-fundamentos/Funções\|Funções]] ou dados de outro sistema sem precisar entender como ele foi construído por dentro.

---

## A analogia dos plug-ins no Figma

Se você usa o Figma, com certeza usa plug-ins para automatizar tarefas (como o Unsplash para buscar imagens ou o Map Maker para gerar mapas).

Quando você clica em "Gerar Mapa" dentro do plug-in do Figma:
1. O plug-in não guarda todos os mapas do mundo no seu computador.
2. Ele envia um pedido para a **API do Google Maps** dizendo: *"Preciso do mapa da Avenida Paulista"*.
3. A API do Google Maps processa o pedido nos servidores do Google, gera a imagem e envia de volta para o plug-in do Figma.
4. O plug-in insere o mapa na sua tela.

Você não precisou programar um sistema de satélites nem um mapa interativo. O Google Maps disponibilizou uma API para que você (ou o desenvolvedor do plug-in) pudesse acessar essa funcionalidade com uma linha de código simples.

---

## Como funciona na prática do desenvolvimento

As APIs na web costumam funcionar por meio de requisições HTTP enviando e recebendo dados em formato [[javascript/03-manipulacao/JSON|JSON]] (usando ferramentas como o [[javascript/05-assincrono/Fetch|Fetch]] para buscar e processar as informações). 

Pense nisso como um menu de restaurante: a API te dá uma lista de opções de pedidos que você pode fazer ao servidor.

*   **Endpoint (O Endereço):** É a URL onde o serviço está disponível (ex: `https://api.unsplash.com/photos/random`).
*   **Método (O Pedido):** Define o que você quer fazer (buscar dados, enviar novos dados, deletar algo).
*   **Parâmetros (Os Detalhes):** Especificações do seu pedido (ex: pedir apenas imagens do tema "natureza").

---

## Resumo para memorizar

*   **API:** Uma ponte de comunicação que permite a dois softwares trocarem dados e funcionalidades de forma segura e padronizada.
*   **Interface:** A regra de comunicação (como o formato do plugue da tomada). Você respeita a regra e a API te entrega o resultado.
*   **Independência:** O sistema que faz o pedido não precisa saber nada sobre o funcionamento interno do sistema que responde ao pedido.
