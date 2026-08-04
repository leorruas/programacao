# Regra: Nunca use "C#" em nomes de arquivo ou links do vault

## Problema

O caractere `#` tem significado especial no Obsidian e na maioria dos sistemas de link (Markdown, URLs, sistemas de arquivo). Usar "C#" literal em nomes de arquivo ou em wikilinks quebra a navegação e cria links inválidos.

## Regra

- Em **nomes de arquivo** (`.md`): sempre use `Csharp` no lugar de `C#`
  - Correto: `23-O switch em Csharp.md`
  - Errado: `23-O switch em C#.md`

- Em **wikilinks do Obsidian**: sempre use `Csharp` no lugar de `C#`
  - Correto: `[[csharp/23-O switch em Csharp|O switch em Csharp]]`
  - Errado: `[[csharp/23-O switch em C#|O switch em C#]]`

- Em **texto corrido** de artigos e conversas: pode usar `C#` normalmente, pois é apenas texto exibido, não um link ou nome de arquivo.

## Aplicação

Esta regra vale para qualquer arquivo dentro do vault, incluindo:
- A pasta `csharp/`
- O arquivo `log.md`
- O arquivo `00-Guia de estudos.md`
- Qualquer artigo que faça referência a arquivos C#
