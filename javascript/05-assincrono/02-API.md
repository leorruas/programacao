# API

**API** é a sigla de *Application Programming Interface* (interface de programação de aplicações). Em desenvolvimento web, uma API define um contrato pelo qual um programa pode solicitar dados ou ações de outro serviço. O conceito existe em diversas linguagens.

A explicação sobre **o que é uma API e como ela funciona**, com requisições HTTP (*Hypertext Transfer Protocol*, protocolo de transferência de hipertexto), respostas, segurança e exemplos comparados, está no artigo [[sintaxe-multilinguagem/01-API|O que é uma API e como funciona]], da área de sintaxe multilinguagem.

## Como isso aparece no JavaScript

A função `fetch()` é uma das maneiras de consumir APIs. Ela devolve uma `Promise` (promessa de resultado futuro). Este exemplo busca informações públicas do repositório:

```javascript
async function carregarRepositorio() {
    try {
        const resposta = await fetch("https://api.github.com/repos/leorruas/programacao");
        if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);

        const dados = await resposta.json();
        console.log(dados.full_name);
    } catch (erro) {
        console.error("Falha na consulta:", erro);
    }
}

carregarRepositorio();
```

A URL indica o recurso; `GET` é o método padrão nesse `fetch()`; `resposta.ok` permite verificar se o servidor indicou sucesso. Erros de rede e respostas HTTP de falha são situações diferentes.

## Artigos relacionados

* [[sintaxe-multilinguagem/01-API|O que é uma API e como funciona]]: fundamento e comparação entre linguagens.
* [[javascript/05-assincrono/03-Fetch|Fetch]]: requisições em JavaScript.
* [[javascript/05-assincrono/04-Async await|Async e await]]: fluxo assíncrono.
* [[javascript/Consumindo APIs e Fetch|Consumindo APIs e Fetch]]: aplicação prática.

## Resumo para memorizar

**API define o contrato; `fetch()` é uma das formas de acessá-lo com JavaScript.**
