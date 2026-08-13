# Interligação Automática de Notas (Modus Operandi)

Sempre que criar uma nova nota ou fizer edições extensas em notas existentes no vault, você deve analisar o texto e criar Wikilinks (`[[NomeDaNota|Texto]]`) apontando para as notas relacionadas relevantes mencionadas no conteúdo.

## Diretrizes:
1. **Evitar Excesso de Links (Overlinking):** Crie o link apenas na **primeira ocorrência** de cada termo relevante no texto. Repetir o mesmo link várias vezes na mesma nota polui a leitura.
2. **Proteção de Sintaxe:** Nunca insira links dentro de blocos de código (fenced ou inline), cabeçalhos/headings (H1, H2, etc.) ou dentro de outros links existentes.
3. **Sem Auto-Links:** Nunca linke uma nota para ela mesma (link circular).
4. **Alvos Limpos:** Use sempre o nome exato do arquivo no Wikilink (ex: `[[07-Arrays em Csharp|arrays]]` em vez de `[[Arrays em Csharp|arrays]]` se o arquivo físico começar com o prefixo numérico).
