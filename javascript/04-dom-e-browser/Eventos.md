# Entendendo eventos - método Feynman

Em desenvolvimento web, um **Evento** é qualquer ação ou acontecimento detectado pelo navegador, geralmente provocado pelo usuário (como um clique em um botão, a rolagem da página ou o ato de digitar no teclado).

Pense nos eventos como os **Gatilhos de [[javascript/01-fundamentos/Protótipos e Proto\|Protótipos e Proto]] (Triggers)** do Figma.

---

## A analogia da prototipagem no Figma

Ao criar uma interação no modo de [[javascript/01-fundamentos/Protótipos e Proto\|Protótipos e Proto]] do Figma, você puxa uma linha azul de um elemento para outro e define duas coisas essenciais:

1.  **O Gatilho (Trigger):** É a ação do usuário que dispara a mudança. Exemplos no Figma: *"On Click"* (Ao clicar), *"While Hovering"* (Enquanto passa o mouse por cima) ou *"On Drag"* (Ao arrastar).
2.  **A Transição:** O que acontece quando o gatilho é disparado (ex: abrir um modal, ir para outra tela).

No [[javascript/Introdução ao JavaScript\|JavaScript]], os **Eventos** são os gatilhos, e as [[javascript/02-funcoes-e-objetos/Funções|Funções]] que associamos a eles são as transições que mudam a interface em tempo real (como ao criar [[javascript/04-dom-e-browser/Animações com scroll|Animações com Scroll]]).

---

## O fluxo de funcionamento no navegador

Para capturar e reagir a uma ação do usuário, o [[javascript/Introdução ao JavaScript\|JavaScript]] usa uma estrutura chamada **Ouvinte de Evento (Event Listener)**. Ela funciona como um sensor ativo monitorando o elemento da tela.

### Exemplo prático:

Imagine que temos um botão de salvar na página. Queremos que ele mude de cor quando o usuário clicar nele.

```javascript
// Passo 1: Selecionar o botão (equivalente a clicar no elemento no Figma)
const botaoSalvar = document.querySelector("#botao-salvar");

// Passo 2: Criar a função com a ação que deve acontecer (a transição)
function aplicarSucesso() {
  botaoSalvar.style.backgroundColor = "green";
  botaoSalvar.textContent = "Salvo com Sucesso";
}

// Passo 3: Conectar o gatilho à ação (adicionar o Event Listener)
// Estamos dizendo: "Monitore o clique. Quando acontecer, ative a função"
botaoSalvar.addEventListener("click", aplicarSucesso);
```

---

## Principais eventos (os gatilhos mais comuns)

Assim como no Figma temos diferentes opções de triggers, no desenvolvimento web monitoramos vários tipos de interações:

### Eventos de mouse
*   **click:** Quando o usuário clica com o botão esquerdo sobre o elemento.
*   **dblclick:** Quando o usuário dá um clique duplo sobre o elemento.
*   **mouseenter:** Quando o cursor do mouse entra na área do elemento (início do hover).
*   **mouseleave:** Quando o cursor do mouse sai da área do elemento (fim do hover).
*   **mousemove:** Conforme o cursor se move dentro dos limites do elemento.

### Eventos de teclado
*   **keydown:** Quando o usuário pressiona qualquer tecla do teclado (útil para detectar atalhos ou a tecla Enter em formulários).
*   **keyup:** Quando o usuário solta uma tecla que estava pressionada.
*   **keypress:** Quando uma tecla que produz caractere é mantida pressionada (obsoleto, mas ainda encontrado; prefira keydown).

### Eventos de formulário (inputs)
*   **submit:** Disparado quando um formulário é enviado (ótimo para interceptar o envio e validar dados antes).
*   **change:** Quando o valor de um elemento é alterado (ex: selecionar uma opção diferente em um menu dropdown).
*   **input:** Dispara em tempo real a cada caractere que o usuário digita ou apaga dentro de um campo de texto.
*   **focus:** Quando o cursor entra em um campo de texto (início da digitação).
*   **blur:** Quando o cursor sai de um campo de texto (fim da digitação/foco perdido).

### Eventos de carregamento e janela
*   **DOMContentLoaded:** Quando o navegador terminou de carregar e montar a árvore do [[javascript/01-fundamentos/DOM\|DOM]] (o HTML), antes de baixar imagens ou estilos externos.
*   **load:** Quando a página inteira carregou completamente (incluindo imagens, CSS e arquivos externos).
*   **scroll:** Quando o usuário rola a página para cima ou para baixo (usado para animar elementos no scroll).
*   **resize:** Quando o tamanho da janela do navegador é alterado (útil para adaptar layouts de forma responsiva).

### Eventos de toque (mobile/telas touch)
*   **touchstart:** Disparado quando um dedo é colocado sobre uma tela sensível ao toque.
*   **touchmove:** Conforme o dedo é arrastado pela tela.
*   **touchend:** Quando o dedo é retirado da tela.

### Eventos de rede
*   **online:** Quando o navegador ganha acesso à internet.
*   **offline:** Quando a conexão com a internet é perdida.

### Eventos de mídia (áudio e vídeo)
*   **play:** Quando o vídeo ou áudio é iniciado.
*   **pause:** Quando a reprodução é pausada.
*   **ended:** Quando a reprodução da mídia chega ao fim.
*   **volumechange:** Quando o volume da mídia é alterado.

### Eventos de arrasto (drag and drop)
*   **dragstart:** Quando o usuário começa a arrastar um elemento na tela.
*   **dragover:** Disparado continuamente enquanto um elemento arrastado é movido por cima de uma área de destino de soltura.
*   **drop:** Quando o elemento arrastado é solto na área de destino correta.

### Eventos de visibilidade e foco do navegador
*   **visibilitychange:** Disparado quando o usuário muda de aba no navegador ou minimiza a janela (excelente para pausar vídeos ou animações pesadas automaticamente e economizar processamento).

### Eventos de CSS (transições e animações)
*   **transitionend:** Quando uma transição CSS suave (como opacidade ou cor) terminou completamente de ser executada (útil para executar códigos de JS logo após uma animação visual do CSS acabar).
*   **animationend:** Quando uma animação CSS baseada em `@keyframes` termina.

---

## Resumo para memorizar

*   **Evento:** O sinal que o navegador emite quando algo relevante acontece (o gatilho/trigger).
*   **Event Listener:** A [[javascript/01-fundamentos/Funções\|Funções]] que fica ativamente "escutando" e vigiando um elemento na tela para disparar uma ação.
*   **Event Handler:** A [[javascript/01-fundamentos/Funções\|Funções]] que é executada como resposta direta ao evento que aconteceu.
