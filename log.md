# Log de alterações do vault

Este arquivo registra o histórico de criações, modificações, edições e reorganizações estruturais realizadas no vault em **ordem cronológica decrescente (mais recente no topo)**.

---

## 2026-08-02

* **Atualização de Nota**: [[csharp/Introducao\|Introdução ao C#]]
  * Adicionada a contextualização histórica de sua origem, áreas de uso prático (como Unity para jogos, mobile e corporativo) e a relevância de mercado da linguagem.

* **Atualização de Notas**: Todas as notas da pasta [[csharp/]]
  * Adicionada a hashtag `#csharp` logo abaixo do título de cada um dos 7 artigos de C# para categorização nativa no Obsidian.

* **Criação de Pasta e Notas de C#**:
  * Criação da pasta [[csharp/]] contendo os primeiros artigos explicativos.
  * [[csharp/Introducao\|Introdução ao C#]]: Guia conceitual sobre a linguagem.
  * [[csharp/Arrays\|Arrays em C#]]: Explicação sobre vetores.
  * [[csharp/Segurança de Tipos\|Segurança de Tipos]]: Detalhamento didático sobre tipagem estática e forte.
  * [[csharp/Variáveis, Operadores e Tipos de Dados\|Variáveis, Operadores e Tipos de Dados]]: Dicionário das caixas de tipos de dados.
  * [[csharp/Estruturas Condicionais e de Repetição\|Estruturas Condicionais e de Repetição]]: Tomada de decisões e loops.
  * [[csharp/Métodos (Funções)\|Métodos (Funções)]]: Automatização de blocos de comando.
  * [[csharp/Programação Orientada a Objetos\|Programação Orientada a Objetos]]: Moldes e fôrmas (classes), objetos e construtores.
  * Todas as notas de C# foram escritas sob o rigor do **Método Feynman** e interconectadas com links bidirecionais/cruzados.

* **Melhorias e Ajustes no Web App**:
  * Adicionado suporte a **Accordions** para a listagem categorizada por pastas na tela inicial.
  * Criada a barra de navegação flutuante **`sticky-nav`** contendo busca sincronizada, logo clicável e link direto para focar nas pastas.
  * Otimizado todo o CSS para tornar o layout **mobile friendly** (responsivo para celulares/tablets).
  * Ocultação dos arquivos de sistema (`me.md`, `log.md` e pasta `.gemini/`) na listagem de visualização do index.
  * Adicionadas tags de linguagem/pasta estilizadas nos cards de resultados de busca.

## 2026-07-25

* **Criação de Nota**: [[javascript/03-manipulacao/O método forEach em detalhes\|O método forEach em detalhes]]
  * Guia 100% exaustivo sobre o método `forEach()` no JavaScript.
  * Análise exaustiva dos 4 parâmetros: `currentValue` (`item`), `index`, `array` (array original) e `thisArg`.
  * Regras de ouro (retorno `undefined`, proibição de `break`/`continue`, comportamento com slots vazios).
  * Tabela comparativa (`forEach` vs `map` vs `for` tradicional).
  * Mini-projeto real de Central de Notificações de Pedidos no DOM.
  * Validação pós-processada: 734 wikilinks 100% válidos.

* **Atualização de Nota**: [[javascript/01-fundamentos/Estruturas de repetição (for e while)\|Estruturas de repetição (for e while)]]
  * Adicionados exemplos explícitos de uso do **`break`** e do **`continue`** diretamente dentro do loop `for` tradicional varrendo um array.
  * Validação pós-processada: 729 wikilinks 100% válidos.

* **Atualização de Nota**: [[javascript/01-fundamentos/Estruturas de repetição (for e while)\|Estruturas de repetição (for e while)]]
  * Adicionadas 3 estratégias avançadas de iteração com arrays:
    1. **Interrupção antecipada com `break`** (para parar o loop assim que encontrar o item desejado, como o `'PS4'`, otimizando performance).
    2. **Iteração funcional com `forEach`** (passando automaticamente item, índice e array).
    3. **Contagem regressiva decremental** (`i = array.length - 1; i >= 0; i--`).
  * Pós-processamento automatizado aplicado com sucesso (728 wikilinks válidos).

* **Atualização de Nota**: [[javascript/01-fundamentos/Estruturas de repetição (for e while)\|Estruturas de repetição (for e while)]]
  * Adicionado o padrão clássico de iteração em arrays (`videoGames[item]`) usando `.length`.
  * Adicionada seção de alerta `> [!CAUTION]` sobre o **Perigo do Loop Infinito** se o `item++` ou `i = i + 5` for omitido.
  * Validação pós-processada: 727 wikilinks 100% válidos.

* **Criação de Nota**: [[javascript/01-fundamentos/Estruturas de repetição (for e while)\|Estruturas de repetição (for e while)]]
  * Guia completo e exaustivo sobre estruturas de repetição no JavaScript (`for`, `while`, `do...while`, `for...of`, `for...in`, `break` e `continue`).
  * Incluído um **Mini-projeto Prático Real** de Gerador de Galeria e Processador de Estoque de Loja Virtual.
  * Pós-processamento automatizado aplicado com sucesso (Sentence Case estrito e Linter com 726 wikilinks válidos).

* **Protocolo de Pós-Processamento Automatizado de Títulos**:
  * Atualizado o script `fix_title_capitalization.py` para tratar automaticamente palavras após dois-pontos (`:`) nos subcabeçalhos (`## 1. Tailwind CSS: estilização por classes utilitárias`).
  * Aplicada a regra estrita em todas as notas e salvos os testes com **721 wikilinks 100% validados**.

* **Expansão Exaustiva de Nota**: [[javascript/03-manipulacao/Arrays e métodos de array\|Arrays e métodos de array]]
  * Atualizada a nota para conter a lista exaustiva de mais de **40 métodos e propriedades de Array** (estáticos, mutáveis, busca, iteração, transformação e novidades imutáveis do ES2023 como `toSorted`, `toReversed`, `toSpliced` e `with`).
  * Preservado o **Mini-projeto Prático Real** de Motor de Carrinho de E-commerce.

* **Criação de Nota**: [[javascript/03-manipulacao/Arrays e métodos de array\|Arrays e métodos de array]]
  * Guia exaustivo de Arrays e seus métodos divididos por categorias (Mutação, Busca, Iteração/Transformação e Ordenação/Fatiamento).
  * Incluído um **Mini-projeto Prático Real** de Motor de Carrinho de Compras de E-commerce utilizando `filter`, `map`, `find`, `reduce` e `join`.
  * Aplicação do Método Feynman (analogia da Prateleira de Estoque Numerada).

* **Enriquecimento do [[me]]**:
  * Adicionadas seções de **Preferências Técnicas e Estilo de Código** (JS ES6+, React funcional, Tailwind/CSS limpo).
  * Expandido o **Dicionário de Analogias** (Design Tokens, Regras de Negócio/MVP, Jornada do Usuário -> Lógica de Código).

* **Atualização do [[me]]**:
  * Detalhada a formação acadêmica completa no perfil: **Comunicação (Publicidade)**, **Design de Produto**, **MBA em Gestão de Negócios** e **Análise e Desenvolvimento de Sistemas (ADS)**.
  * Refinado o superpoder para unir pensamento visual, experiência do usuário (UX/UI), código e visão estratégica de negócios.

* **Interconexão Bidirecional**: [[javascript/04-dom-e-browser/DOM\|DOM]] <-> [[javascript/04-dom-e-browser/Métodos do objeto document\|Métodos do objeto document]]
  * Adicionados links cruzados bidirecionais entre a nota conceitual do DOM (árvore de camadas) e a nota exaustiva dos métodos de `document`.
  * Validação pelo linter: 721 wikilinks 100% válidos.

* **Atualização do [[me]]**:
  * Adicionado aviso no topo destacando o arquivo `me.md` como de **leitura obrigatória para todos os agentes de IA**.
  * Incorporadas as 7 diretrizes oficiais do vault diretamente no corpo do `me.md`.

* **Padronização Estrita de Cabeçalhos Internos (Sentence Case)**:
  * Correção automatizada dos cabeçalhos internos (`#`, `##`, `###`) em 30 arquivos do vault (incluindo `Métodos do objeto document.md`).
  * Todos os títulos secundários foram ajustados para manter apenas a primeira palavra com a inicial maiúscula (ex: `## 1. Métodos de seleção e busca de elementos`), preservando nomes próprios e tecnologias.

* **Criação de Nota**: [[javascript/04-dom-e-browser/Métodos do objeto document\|Métodos do objeto document]]
  * Dicionário exaustivo de todos os métodos e propriedades do objeto `document` (seleção, criação, eventos, geometria, escrita e propriedades globais).
  * Aplicação do Método Feynman (analogia do Gerente Geral de Edifício).

* **Reorganização Estrutural do Vault**:
  * Eliminação da pasta genérica `conceitos/` e redistribuição de 52 arquivos por pilares funcionais.

* **Criação de Nota**: [[react/01-fundamentos/Pacotes e ecossistema do React\|Pacotes e ecossistema do React]]
  * Guia de bibliotecas e pacotes terceiros para o React (Lucide, React Router, React Hook Form, Framer Motion, Zustand, etc.).
