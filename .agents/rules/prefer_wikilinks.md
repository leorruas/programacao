# Preferência por Wikilinks para Links Internos

Todos os links internos entre as notas do vault devem ser criados preferencialmente utilizando a sintaxe de **Wikilinks** do Obsidian (`[[caminho/do/artigo|Texto de exibição]]` ou `[[NomeDoArtigo|Texto de exibição]]`), em vez do formato de link Markdown tradicional `[texto](caminho)`.

## Raciocínio
1. **Obsidian:** Os Wikilinks são nativos do Obsidian. Eles resolvem arquivos com caracteres especiais como `#` (comum em arquivos de C#) e espaços sem a necessidade de codificar a URL, o que evita que o Obsidian se confunda e crie arquivos vazios indesejados (como `C%23.md`).
2. **Web App:** O leitor web possui um processador personalizado (`processarWikiLinksObsidian`) no JavaScript que intercepta Wikilinks e os transforma em tags HTML funcionais dinamicamente.

## Exemplo:
* **Incorreto (Link Markdown com caracteres especiais):** `[Introdução ao C#](01-Introdução ao C#.md)` (quebra no Web App devido a espaços) ou `[Introdução ao C#](01-Introdu%C3%A7%C3%A3o%20ao%20C%23.md)` (faz o Obsidian criar um arquivo duplicado com `%23` no nome ao ser clicado).
* **Correto (Wikilink nativo):** `[[csharp/01-Introdução ao Csharp|Introdução ao C#]]` (funciona perfeitamente em ambos os ambientes).

