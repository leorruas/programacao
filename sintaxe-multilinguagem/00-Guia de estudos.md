# Sintaxe multilinguagem: guia de estudos

Este espaço organiza **conceitos comuns** a várias linguagens e compara como cada uma os implementa. O objetivo é entender primeiro o problema e o contrato e depois enxergar o que muda na sintaxe.

O conceito de **API** (*Application Programming Interface*, interface de programação de aplicações) exemplifica essa divisão: uma API permite acessar operações e informações de outro componente de software. Em uma API web, a estrutura da comunicação é a mesma para um cliente escrito em JavaScript, C#, Python ou Java. O código usado para enviar as requisições muda.

## Fundamentos e sintaxe comparada

* [[sintaxe-multilinguagem/01-API|O que é uma API e como funciona]]: contratos, HTTP, endpoints, códigos de resposta, segurança e exemplos nas quatro linguagens.
* [[javascript/05-assincrono/02-API|API em JavaScript]]: aplicação da ideia ao navegador.
* [[javascript/05-assincrono/03-Fetch|Fetch]] e [[javascript/05-assincrono/04-Async await|Async e await]]: requisições e fluxo assíncrono.
* [[csharp/25-Consumindo APIs em Csharp|Consumindo APIs em C#]]: integração a serviços com `HttpClient`.
* [[javascript/03-manipulacao/08-JSON|JSON]]: representação dos dados trocados.
* [[git/01-fundamentos/Integrando a API do GitHub|Integração com o GitHub]]: contrato real.

## Como usar esta trilha

Para cada assunto, procure responder: **qual problema resolve**, **o que permanece igual entre as linguagens**, **qual sintaxe muda** e **como reconhecer falhas**.

Esta área nasce com a API como primeiro tema. Estruturas de dados, tratamento de erros, funções e requisições HTTP são candidatos a futuros artigos transversais, após verificar o que já existe em [[javascript/00-Guia de Estudos|JavaScript]] e [[csharp/00-Guia de estudos|C#]]. Isso evita repetir a mesma explicação em várias páginas.

## Resumo para memorizar

**O conceito é compartilhado; a implementação depende do ambiente.** Aprender as diferenças entre linguagens exige conhecer a ideia comum e depois comparar código que resolve a mesma tarefa.
