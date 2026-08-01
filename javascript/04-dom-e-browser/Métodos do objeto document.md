# Métodos do objeto document no JavaScript - método Feynman

No desenvolvimento web, o objeto **`document`** é o ponto de entrada principal para interagir com o [[javascript/04-dom-e-browser/DOM\|DOM]] (Modelo de Objeto do Documento). Ele representa a página web carregada no navegador e contém dezenas de métodos para buscar, criar, modificar e deletar elementos HTML.

Sob a perspectiva da **Administração de Edifícios**, o `document` funciona exatamente como o **Gerente Geral de um Prédio com a Planta Baixa na Mesa**.

---

## A analogia do gerente de edifício

Imagine a administração de um condomínio comercial:

*   **O `document` (O Gerente Geral):** É a autoridade máxima no prédio. Ele tem a planta arquitetônica completa do edifício em mãos.
*   **Métodos de Seleção (`querySelector`, `getElementById`):** São os interfones da recepção para chamar uma sala específica pelo número da porta ou pelo andar.
*   **Métodos de Criação (`createElement`):** É a equipe de obras construindo uma nova sala ou adicionando uma parede nova no prédio.
*   **Métodos de Evento (`addEventListener`):** São os alarmes de incêndio e sensores de presença instalados nos corredores para reagir quando alguém passa.

---

## 1. Métodos de seleção e busca de elementos (localizadores)

Estes métodos servem para encontrar elementos existentes no HTML para poder manipulá-los:

| Método | Descrição | Retorno | Exemplo de Uso |
| :--- | :--- | :--- | :--- |
| **`document.getElementById(id)`** | Busca um único elemento pelo seu atributo `id`. É o método de busca mais rápido. | Elemento HTML único | `document.getElementById('botao-enviar')` |
| **`document.querySelector(seletor)`** | Busca o **primeiro** elemento que corresponda ao seletor CSS informado. | Elemento HTML único (ou `null`) | `document.querySelector('.card > h2')` |
| **`document.querySelectorAll(seletor)`** | Busca **todos** os elementos que correspondam ao seletor CSS. | NodeList (coleção iterável) | `document.querySelectorAll('li.item')` |
| **`document.getElementsByClassName(classe)`** | Busca todos os elementos que possuem determinada classe CSS. | HTMLCollection viva | `document.getElementsByClassName('ativo')` |
| **`document.getElementsByTagName(tag)`** | Busca todos os elementos de determinada tag HTML (`div`, `p`, `button`). | HTMLCollection viva | `document.getElementsByTagName('button')` |
| **`document.getElementsByName(nome)`** | Busca elementos pelo atributo `name` (muito usado em formulários). | NodeList | `document.getElementsByName('genero')` |

---

## 2. Métodos de criação de nós e elementos (construtores)

Usados para criar novos elementos e conteúdos em tempo de execução antes de inseri-los na tela:

| Método | Descrição | Exemplo de Uso |
| :--- | :--- | :--- |
| **`document.createElement(tagName)`** | Cria um novo elemento HTML na memória (ex: `div`, `p`, `button`). | `const btn = document.createElement('button')` |
| **`document.createTextNode(texto)`** | Cria um nó de texto puro para ser inserido em um elemento. | `const texto = document.createTextNode('Olá')` |
| **`document.createDocumentFragment()`** | Cria um recipiente leve invisível na memória para montar múltiplos elementos em lote de alta performance. | `const fragmento = document.createDocumentFragment()` |
| **`document.createComment(comentario)`** | Cria um nó de comentário HTML (`<!-- comentário -->`). | `document.createComment('Seção de compras')` |
| **`document.createAttribute(nome)`** | Cria um novo nó de atributo (ex: `src`, `href`). | `document.createAttribute('disabled')` |
| **`document.createRange()`** | Cria um objeto Range que representa um trecho contínuo do documento. | `const range = document.createRange()` |
| **`document.importNode(noExterno, deep)`** | Importa uma cópia de um nó de outro documento (como de um `<iframe>`). | `document.importNode(noExtero, true)` |
| **`document.adoptNode(noExterno)`** | Remove o nó de outro documento e o adota no documento atual. | `document.adoptNode(noExtero)` |

---

## 3. Métodos de evento (sensores do documento)

 herdados da interface `EventTarget`, permitem escutar e disparar [[javascript/04-dom-e-browser/Eventos\|Eventos]] em nível global na página:

*   **`document.addEventListener(tipo, callback, opcoes)`**: Adiciona um escutador de eventos no documento inteiro (ex: escutar teclas pressionadas ou cliques globais).
    ```javascript
    document.addEventListener('keydown', (e) => {
      console.log('Tecla pressionada:', e.key);
    });
    ```
*   **`document.removeEventListener(tipo, callback)`**: Remove um escutador de eventos registrado anteriormente.
*   **`document.dispatchEvent(evento)`**: Dispara um evento personalizado manualmente no documento.

---

## 4. Métodos de posição, ponto e foco (geometria)

*   **`document.elementFromPoint(x, y)`**: Retorna o elemento HTML localizado nas coordenadas exatas `(x, y)` da tela.
    ```javascript
    const elementoNoPonto = document.elementFromPoint(100, 200);
    ```
*   **`document.elementsFromPoint(x, y)`**: Retorna um array com **todos** os elementos empilhados naquela coordenada espacial.
*   **`document.hasFocus()`**: Retorna `true` se o usuário estiver interagindo ativamente com a janela/aba atual do documento.
*   **`document.getSelection()`**: Retorna um objeto `Selection` representando o trecho de texto selecionado pelo usuário na tela.

---

## 5. Métodos de escrita e execução de documento (Legados/Avançados)

*   **`document.write(conteudo)`**: Escreve código HTML diretamente no fluxo de carregamento da página. *(Obsoleto: limpa a página inteira se executado após o carregamento).*
*   **`document.writeln(conteudo)`**: Semelhante ao `write()`, mas adiciona uma quebra de linha ao final.
*   **`document.open()`**: Abre um fluxo para escrever um novo documento.
*   **`document.close()`**: Fecha o fluxo de escrita aberto por `document.open()`.
*   **`document.execCommand(comando)`**: Executa comandos de edição de texto formatado (Obsoleto).

---

## 6. Principais propriedades do objeto `document`

Além dos métodos, o `document` possui propriedades fundamentais que dão acesso direto a partes essenciais da página:

| Propriedade | O que acessa? |
| :--- | :--- |
| **`document.documentElement`** | Retorna a tag raiz `<html>`. |
| **`document.head`** | Retorna a tag `<head>`. |
| **`document.body`** | Retorna a tag `<body>`. |
| **`document.title`** | Lê ou altera o título da aba do navegador. |
| **`document.cookie`** | Lê ou altera os cookies armazenados na página. |
| **`document.activeElement`** | Retorna o elemento que está atualmente em foco (ex: o campo de input onde o cursor está piscando). |
| **`document.hidden`** | Retorna `true` se a aba do navegador estiver oculta ou minimizada. |
| **`document.forms`** | Coleção com todos os formulários da página. |
| **`document.images`** | Coleção com todas as imagens da página. |
| **`document.links`** | Coleção com todos os links (`<a>`) da página. |

---

## Resumo para memorizar

*   **Visão Geral:** Para entender a árvore de camadas completa da página, veja a nota sobre [[javascript/04-dom-e-browser/DOM\|DOM]].
*   **Seleção:** Use `querySelector` (para um único item) e `querySelectorAll` (para múltiplos).
*   **Criação:** Use `createElement` para gerar novas tags na memória antes de usar `appendChild` ou `append`.
*   **Eventos:** Use `addEventListener` no `document` para capturar interações globais de teclado e mouse.
*   **Performance:** Use `createDocumentFragment()` ao inserir dezenas de elementos de uma vez para evitar re-renderizações desnecessárias.
