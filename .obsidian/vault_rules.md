# Diretrizes de Estilo e Formatação do Vault

Regras aprovadas pelo usuário para o desenvolvimento das notas no Obsidian Vault:

1. **Protocolo de Pós-Processamento Automatizado de Títulos**: Sempre executar o script `fix_title_capitalization.py` e `link_linter.py` imediatamente após qualquer criação ou edição de arquivo Markdown para impedir a presença de Title Case.
2. **Capitalização Estrita em Português (Sentence Case)**: Títulos e subcabeçalhos (incluindo palavras após dois-pontos `:`) devem ser minúsculos (ex: "1. Tailwind CSS: estilização por classes utilitárias"), exceto a primeira palavra do título e nomes próprios de marcas/tecnologias.
3. **Registro de Histórico em `log.md` (Ordem Decrescente)**: Registrar obrigatoriamente todas as criações, edições, movimentações de arquivos e reorganizações no arquivo `log.md` na raiz do vault, com as entradas mais recentes no topo.
4. **Lint de Links Obrigatório**: Sempre rodar a verificação de integridade de links (linter) após criar, mover, renomear ou modificar arquivos no vault.
5. **Links Protegidos em Tabelas**: Em tabelas Markdown, usar sempre `\|` para wikilinks (ex: `[[javascript/03-manipulacao/Regex\|Regex]]`) evitando a quebra de colunas pelo separador `|`.
6. **Método Feynman**: Explicar conceitos técnicos através de analogias simples do mundo real, didáticas e intuitivas.
7. **Cross-linking Exaustivo**: Conectar ativamente conceitos relacionados usando o formato de wikilink do Obsidian.
8. **Sem Emojis**: Manter a estética do vault estritamente textual e sem emojis.
