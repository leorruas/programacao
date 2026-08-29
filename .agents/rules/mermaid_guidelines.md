# Diretrizes e boas práticas para diagramas Mermaid

1. **Orientação e layout vertical**:
   - Priorizar `flowchart TD` para manter o fluxo de cima para baixo, otimizando a leitura em dispositivos móveis e evitando diagramas excessivamente largos.
2. **Compatibilidade estrita com Mermaid v11+**:
   - Para setas e conectores com texto, utilizar exclusivamente a sintaxe com pipes `-->|Rótulo do conector|`. Nunca utilizar `-- Texto -->`.
3. **Quebra de linha em nós longos**:
   - Inserir `<br>` a cada 2 ou 3 palavras em textos de nós mais extensos (`Node["Texto com<br>quebra"]`) para manter os cartões compactos e a tipografia legível.
4. **Delimitação de texto com aspas**:
   - Todo texto dentro de delimitadores geométricos (`[]`, `()`, `{}`) deve ser envolvido por aspas duplas `["Texto"]` para prevenir erros com parênteses, barras e pontuação.
