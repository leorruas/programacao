# Codificação de URLs em Links Markdown

Todos os links no formato Markdown `[texto](caminho)` no vault devem ter seus caminhos (URLs) codificados em formato URL-encoded sempre que contiverem espaços ou caracteres especiais (como acentos ou o caractere `#` nos nomes dos arquivos de C#).

## Raciocínio
Enquanto o Obsidian é tolerante com espaços e acentos em links markdown brutos, bibliotecas padrão de renderização (como a `marked.js` utilizada no Web App) falham ao interpretar caminhos com espaços como links válidos, exibindo-os como texto puro. A codificação URL-encoded garante total compatibilidade e funcionamento em ambos os ambientes.

## Exemplo:
* **Incorreto:** `[Introdução ao C#](01-Introdução ao C#.md)`
* **Correto:** `[Introdução ao C#](01-Introdu%C3%A7%C3%A3o%20ao%20C%23.md)`
