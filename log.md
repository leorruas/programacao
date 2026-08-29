# Log de alterações do vault

Este arquivo registra o histórico de criações, modificações, edições e reorganizações estruturais realizadas no vault em **ordem cronológica decrescente (mais recente no topo)**.

## 2026-08-29

* **Atualização visual do Web App (`index.html`, `style.css` e `script.js`)**:
  * Alinhada a interface à estrutura editorial dos vaults PUC e Guia do Portal: masthead com título e busca, navegação fixa com pesquisa e catálogo de áreas em linhas de leitura.
  * Mantida a identidade visual rosa (`var(--accent-pink)`) e adicionada busca sincronizada na sidebar dos artigos.

## 2026-08-19

* **Criação de Artigo de Infraestrutura e Redes Web**:
  * [[web/01-fundamentos/DNS e gerenciamento de domínios|DNS e gerenciamento de domínios (A, CNAME, TXT, MX e NS)]]: Guia exaustivo e didático explicando o funcionamento do DNS (analogia da agenda de contatos), resolução recursiva e servidores raiz/TLD/autoritativos com diagramas Mermaid, dicionário completo dos tipos de registros (A, AAAA, CNAME, TXT, MX, NS, CAA, SRV, SOA), autenticação de e-mails com SPF/DKIM/DMARC, validação de posse de domínio, os 3 cenários de movimentação de DNS (apontamento simples vs troca de NS vs transferência de custódia), impacto do TTL e estratégia de migração sem queda (Zero Downtime).
* **Atualização do Web App (`script.js`)**:
  * Adicionada a nova nota [[web/01-fundamentos/DNS e gerenciamento de domínios|DNS e gerenciamento de domínios]] à lista de busca e fallback do leitor.

---

## 2026-08-16

* **Atualização Pedagógica de Tratamento de Erros**:
  * [[javascript/06-arquitetura-e-avancado/06-Tratamento de erros|Tratamento de erros (try, catch e finally)]]: Explicação detalhada da sintaxe `try / catch / finally` com analogia da máquina de cartão por aproximação, fluxograma Mermaid, propriedades do objeto `erro` (`message`, `name`, `stack`), exemplos de UI com desligamento de loaders no `finally` e emissão de exceções com `throw`.
* **Importação e Atualização do Web App (`index.html`, `style.css` e `script.js`)**:
  * Importadas as melhorias do motor de renderização da PUC, preservando a identidade visual Dark / Rosa (`#ffb6c1` / `var(--accent-pink)`).
  * **Sumário Dinâmico (TOC)**: Adicionada sidebar de Table of Contents (`#artigo-toc-sidebar`) à esquerda com navegação suave e destaque em tempo real via `IntersectionObserver` (ScrollSpy).
  * **Renderização Aprimorada do Obsidian**: Suporte a Callouts estilizados (`[!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`, `[!CAUTION]`), marcações de highlight (`==texto==`), proteção de links com pipes em tabelas e normalização de identação de listas.
  * **Listas de Tarefas**: Formatação e renderização de checkboxes customizadas (`[ ]` e `[x]`).
  * **Numeração de Código e Diagramas Mermaid**: Linhas numeradas em blocos `<pre>` e integração com o motor do Mermaid configurado no tema Dark/Rosa.
* **Novo Artigo de Sintaxe do Mermaid**:
  * [[mermaid/Sintaxe e possibilidades com Mermaid|Sintaxe e possibilidades com Mermaid]]: Guia aprofundado com a sintaxe completa de nós geométricos, estilos de setas e conectores (com sintaxe de rótulo compatível com Mermaid v11+), sub-grafos (`subgraph`), diagramas de sequência com mensagens síncronas/assíncronas, modelagem de classes (`classDiagram`), máquinas de estado (`stateDiagram-v2`), mapas mentais (`mindmap`) e gráficos de pizza (`pie`).
* **Nova Pasta e Artigo Introdutório de Mermaid**:
  * Criação da pasta `mermaid/` e da nota [[mermaid/Introdução ao Mermaid|Introdução ao Mermaid]]: Explicação conceitual de Diagrams as Code com analogia ao Auto Layout / Figma vs softwares gráficos, funcionamento do motor parser/SVG, sintaxe de `flowchart`, `sequenceDiagram`, `erDiagram` e `gantt`, com regras para o Obsidian.

---

## 2026-08-13

* **Otimização de Performance da Busca (`script.js`)**:
  * Implementado sistema de pré-carregamento concorrente com `Promise.all` para cachear todo o conteúdo das notas `.md` na memória durante a inicialização.
  * Adicionada busca instantânea em tempo real acionada diretamente no evento de digitação (`input`), com controle de *debounce* (150ms).
* **Ajuste de Layout Responsivo e Mobile (`style.css`)**:
  * Aplicada trava global (`overflow-x: hidden` e `box-sizing: border-box`) no `html` e `body` para resolver a rolagem horizontal indesejada em smartphones e tablets.
  * Adicionado suporte a `word-break: break-word` e rolagem horizontal em container próprio (`overflow-x: auto`) para blocos de código (`<pre>`), tabelas e elementos visuais no leitor de artigos.
* **Padronização de Regras de IA (`AGENTS.md` & `.agents/`)**:
  * Criado o arquivo [`AGENTS.md`](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/AGENTS.md) na raiz do repositório para centralizar as instruções globais do agente (obrigando a leitura prévia de `AGENTS.md` e `me.md`, registro em log, commit automático, uso de WikiLinks, técnica Feynman e proibição de emojis).
  * Migrada a estrutura de regras da pasta `.gemini/` para `.agents/rules/`.



---

## 2026-08-05


* **Reorganização Estrutural do Csharp**:
  * Reordenamento e renumeração de todos os 26 artigos de Csharp em uma sequência pedagógica contínua (01 a 26), dividida em 5 fases de aprendizado (Fundamentos & E/S -> Condicionais & Loops -> Coleções -> POO & Arquivos -> Web & Full Stack).
  * Atualização completa da lista de busca no `script.js` e do `00-Guia de estudos.md`.
* **Novo Artigo Integrador**:
  * [[csharp/26-Como conectar Csharp no HTML (Backend + Frontend JS)\|26-Como conectar Csharp no HTML (Backend + Frontend JS)]]: Artigo integrador explicando a arquitetura C# (Backend) + HTML/CSS/JS (Frontend), a analogia do Drive-Thru, troca de JSON via REST API e consumo com `fetch()`.
* **Revisão Ortográfica Geral**:
  * Correção e normalização automatizada de acentuação em português em 50 arquivos do vault (incluindo artigos de C#, JavaScript, CSS, Python e Git).

---

## 2026-08-04

* **Novos Artigos de Csharp**:
  * [[csharp/18-Capacity em coleções\|18-Capacity em coleções]]: Explicação de performance e alocação de memória de coleções.
  * [[csharp/19-O loop foreach em Csharp\|19-O loop foreach em Csharp]]: Estrutura de iteração sobre coleções e funcionamento do `IEnumerable`. Revisado com método Feynman (analogia da esteira de produção).
  * [[csharp/20-O loop do-while em Csharp\|20-O loop do-while em Csharp]]: Garantia de execução mínima de bloco de repetição e validação.
  * [[csharp/21-Console.Write e Console.WriteLine\|21-Console.Write e Console.WriteLine]]: Revisado com método Feynman (analogia da máquina de escrever) e emojis removidos.
  * [[csharp/22-Métodos de string (ToUpper e ToLower)\|22-Métodos de string (ToUpper e ToLower)]]: Revisado com método Feynman (analogia do filtro de voz e da foto impressa) e emojis removidos.
  * [[csharp/23-O switch em Csharp\|23-O switch em Csharp]]: Explicação com método Feynman (analogia do elevador) para controle de fluxo condicional múltiplo e Switch Expressions, sem o uso de emojis.
  * [[csharp/24-Csharp no Frontend e Backend\|24-Csharp no Frontend e Backend]]: Visão geral do ecossistema .NET para desenvolvimento full stack com ASP.NET Core (backend/API) e Blazor (frontend).
  * [[csharp/25-Consumindo APIs em Csharp\|25-Consumindo APIs em Csharp]]: Como usar o HttpClient para integrar APIs externas, deserializar JSON e a diferença entre consumir APIs no backend vs no frontend.
* **Criação de Regras (.gemini)**:
  * [[.gemini/rules/no_emojis\|no_emojis]]: Nova regra estabelecida proibindo o uso de emojis em qualquer contexto do projeto (tanto no chat quanto nos arquivos do vault).
* **Atualização de Notas**:
  * [[csharp/01-Introdução ao Csharp\|Introdução ao Csharp]]: Adicionada seção de transição para outras linguagens e realizada a remoção completa de emojis decorativos dos cabeçalhos.
  * [[csharp/02-O método Main\|O método Main]]
  * Adicionada seção detalhada explicando quando usar o método Main com argumentos `(string[] args)` (CLI, scripts, automações) e quando usar sem parâmetros `()` (Console simples, UI, Web).
* **Organização de Tutoriais (Trilha Csharp Prática)**:
  * Criados **5 novos tutoriais práticos** baseados em projetos para consolidar as fases de estudo:
    1. [[tutoriais/[Csharp] • Projeto 1 - O Assistente de Terminal|[Csharp] • Projeto 1 - O Assistente de Terminal]] (Fundamentos, Entrada/Saída).
    2. [[tutoriais/[Csharp] • Projeto 2 - O Jogo de Adivinhação|[Csharp] • Projeto 2 - O Jogo de Adivinhação]] (Condicionais, Repetições, Random).
    3. [[tutoriais/[Csharp] • Projeto 3 - O Gerenciador de Tarefas|[Csharp] • Projeto 3 - O Gerenciador de Tarefas]] (Menu CLI, Listas Dinâmicas, Switch).
    4. [[tutoriais/[Csharp] • Projeto 4 - O Simulador de Conta Bancária|[Csharp] • Projeto 4 - O Simulador de Conta Bancária]] (Classes, Objetos, Construtor, Encapsulamento).
    5. [[tutoriais/[Csharp] • Projeto 5 - O Diário Digital|[Csharp] • Projeto 5 - O Diário Digital]] (Arquivos System.IO, Try-Catch, LINQ).
  * Adicionado o tutorial [[tutoriais/[Csharp] • Como Usar ArrayList, For e Foreach para Calcular Médias\|[Csharp] • Como Usar ArrayList, For e Foreach para Calcular Médias]] com guia de terminal.
* **Manutenção do Web App e Links**:
  * Registrados os novos arquivos e os 5 projetos práticos em `script.js`.
  * Atualizado o [[csharp/00-Guia de estudos|Guia de estudos]] ligando as fases teóricas com os novos projetos recomendados.
  * Aplicada a regra de links cruzados e limpeza de extensões `.md` em todos os artigos relacionados das novas notas.

## 2026-08-03


* **Reorganização de C#**:
  * Renomeação e numeração lógica dos 13 arquivos de C# (`00-` a `13-`) conforme recomendação do Guia de Estudos.
  * Atualização de todos os links e referências cruzadas internos no vault.
* **Interligação de Artigos de Csharp**:
  * Realizada uma varredura geral e inseridos Wikilinks cruzados em **15 arquivos de Csharp** conectando termos-chave (como arrays, POO, métodos, coleções, exceções, etc.) às suas respectivas notas explicativas.
* **Regra de Interligação Automática (Modus Operandi)**:
  * Criada a regra [[.gemini/rules/auto_interlinking\|auto_interlinking.md]] definindo o comportamento padrão de linkagem inteligente cruzada para qualquer nova criação ou atualização de notas no vault.
* **Atualização de Nota**: [[csharp/01-Introdução ao Csharp\|Introdução ao Csharp]]
  * Adicionada seção explicativa com exemplos cotidianos e práticos de utilização do C# (McDonald's, Pix e automação) sob a ótica do Método Feynman.
* **Codificação de URLs em Links**:
  * Codificados todos os caminhos (URLs) em links markdown (`[[caminho|texto]]`) que contêm espaços e caracteres especiais em todas as notas do C# para garantir compatibilidade com o leitor do Web App (`marked.js`).
* **Regra de Preferência de Wikilinks**:
  * Criada a regra [[.gemini/rules/prefer_wikilinks\|prefer_wikilinks.md]] para tornar obrigatório o uso de Wikilinks do Obsidian para links internos, garantindo compatibilidade multiplataforma.
* **Organização de Tutoriais**:
  * Renomeados os 4 arquivos na pasta `tutoriais/` adicionando o prefixo da linguagem correspondente (ex: `[JavaScript] • `) no nome dos arquivos e nos títulos principais (H1).
  * Atualizados os respectivos títulos e caminhos de arquivos no `script.js`.
* **Reorganização de JavaScript**:
  * Renomeação e numeração de todos os arquivos de notas dentro das subpastas lógicas (`01-fundamentos`, `02-funcoes-e-objetos`, `03-manipulacao`, `04-dom-e-browser`, `05-assincrono` e `06-arquitetura-e-avancado`) seguindo a sequência de fases do Guia de Estudos.
  * Atualização de todos os links internos, Wikilinks e caminhos de fallback no script `script.js`.
* **Criação de Notas Avançadas de C#**:
  * [[csharp/14-Tratamento de erros\|14-Tratamento de erros]]: Tratamento com `try`, `catch`, `finally` e `throw`.
  * [[csharp/15-Manipulação de arquivos\|15-Manipulação de arquivos]]: Manipulação de diretórios e arquivos com `System.IO`.
  * [[csharp/16-Herança e interfaces\|16-Herança e interfaces]]: Conceitos avançados de POO, herança de classes e contratos de interface.
  * [[csharp/17-LINQ buscas e filtros\|17-LINQ buscas e filtros]]: Consultas eficientes em coleções com métodos LINQ (`Where`, `Select`, `OrderBy`, etc.).

* **Atualização de Nota**: [[csharp/Arrays\|Arrays em Csharp]]
  * Adicionada dica explicativa diferenciando as condições de limite do loop (`i < nomes.Length` vs `i < nomes.Length - 1`) para evitar confusões comuns com índices de array.

* **Atualização de Regra do Vault**:
  * Atualizada a regra [[.gemini/rules/log_changes\|log_changes.md]] para incluir a obrigatoriedade de commit e push imediato ao GitHub após qualquer alteração no vault.

* **Atualização de Nota**: [[csharp/Introdução\|Introdução ao Csharp]]
  * Adicionada seção explicando o uso de namespaces extras (como `System.Collections.Generic`, `System.IO`, `System.Linq` e `System.Text`) para importar outras caixas de ferramentas no C#.

## 2026-08-02

* **Atualização de Regra do Vault**:
  * Atualizada a regra [[.gemini/rules/linking_articles\|linking_articles.md]] para proibir caminhos locais absolutos do sistema e impor o uso exclusivo de links relativos ou Wikilinks para portabilidade em dispositivos móveis.

* **Padronização de Links do Vault**:
  * Conversão coletiva de todos os links de markdown locais absolutos (iCloud / Local paths) nas notas de C# para caminhos relativos de alta compatibilidade multi-dispositivo no Obsidian.

* **Criação de Nota**: [[csharp/11-Lista, pilha e fila\|Lista, pilha e fila em C#]]
  * Criação do guia de implementação prática contendo sintaxes, operações (Enqueue, Dequeue, Push, Pop, Add, Insert) e analogias do Método Feynman.

* **Criação de Notas de C#**:
  * [[csharp/Coleções\|Coleções em Csharp]]: Explicação sobre coleções flexíveis (`List<T>`, `Dictionary<K, V>`, `HashSet<T>`).
  * [[csharp/10-Tipos abstratos de dados\|Tipos abstratos de dados]]: Introdução conceitual sobre TADs (Filas, Pilhas e Dicionários) e sua representação no código.
* **Atualização de Nota**: [[javascript/00-Guia de Estudos\|Guia de estudos de C#]]
  * Atualização da nota para incluir Coleções em Csharp e ajustar a ordenação de roteiro de estudos sugerido.

* **Melhoria no Layout de Código do Web App**:
  * Implementadas quebras de linha automáticas (`pre-wrap`) nos blocos de código (`pre`) para evitar barras de rolagem horizontais no mobile e desktop.
  * Criada numeração de linhas dinâmica e flexível integrada nos blocos de código de artigos do leitor.

* **Criação de Nota**: [[javascript/00-Guia de Estudos\|Guia de estudos de C#]]
  * Criação do mapa e roteiro de aprendizagem sequencial sugerido para C#, interligando todos os artigos do vault.

* **Criação de Notas de C#**:
  * [[csharp/02-O método Main\|O método Main]]: Explicação detalhada sobre a estrutura `public static void Main(string[] args)`.
  * [[javascript/01-fundamentos/09-Estruturas de repetição (for e while)\|Estruturas de repetição (for e while)]]: Explicação detalhada sobre loops `for`, `while` e `do while`.
  * [[csharp/08-Métodos de arrays\|Métodos de arrays]]: Dicionário exaustivo de funções para arrays.
* **Atualização de Nota**: [[csharp/Arrays\|Arrays em Csharp]]
  * Adicionada seção detalhada sobre o erro `IndexOutOfRangeException` (estouro de índice), explicando causas comuns e como evitar.

* **Correção de Links de Artigos**:
  * Ajuste na codificação de caracteres de parênteses (`(` para `%28` e `)` para `%29`) nas URIs de markdown para corrigir links quebrados para o arquivo `12-Métodos (funções).md`.
  * Adicionado rodapé de artigos relacionados ao arquivo [[csharp/Arrays\|Arrays em Csharp]].

* **Atualização de Nota**: [[csharp/Arrays\|Arrays em Csharp]]
  * Adicionadas explicações intuitivas sob o Método Feynman (tabuleiros vs gaveteiros irregulares) e as finalidades práticas para Arrays multidimensionais e Jagged Arrays.

* **Comportamento de Busca no Web App**:
  * Modificada a função de busca no [[script.js]] para ocultar automaticamente o contêiner de pastas (`#pastas-container`) ao disparar pesquisas, evitando poluição visual.

* **Ajustes de Responsividade no Web App**:
  * Reduzido o tamanho da fonte do título `h1` ("pesquisa de programação") e do input de busca no mobile.
  * Mantido o alinhamento horizontal lado a lado (estilo desktop) para o input e botão de busca em telas móveis.

* **Atualização de Nota**: [[csharp/Introdução\|Introdução ao Csharp]]
  * Adicionada a contextualização histórica de sua origem, áreas de uso prático (como Unity para jogos, mobile e corporativo) e a relevância de mercado da linguagem.

* **Padronização de Títulos e Cabeçalhos (Sentence Case)**:
  * Criação da regra [[.gemini/rules/title_capitalization\|title_capitalization.md]] exigindo que títulos e cabeçalhos em português mantenham apenas a primeira letra em maiúsculo (Sentence Case).
  * Renomeação dos 5 arquivos do C# para seguir a grafia Sentence Case.
  * Revisão e atualização de todos os cabeçalhos internos e links cruzados em todas as 7 notas na pasta [[csharp/]].
  * Sincronização da lista de caminhos de fallback no [[script.js]].

* **Atualização de Notas**: Todas as notas da pasta [[csharp/]]
  * Adicionada a hashtag `#csharp` logo abaixo do título de cada um dos 7 artigos de C# para categorização nativa no Obsidian.

* **Criação de Pasta e Notas de C#**:
  * Criação da pasta [[csharp/]] contendo os primeiros artigos explicativos.
  * [[csharp/Introdução\|Introdução ao Csharp]]: Guia conceitual sobre a linguagem.
  * [[csharp/Arrays\|Arrays em Csharp]]: Explicação sobre vetores.
  * [[csharp/04-Segurança de tipos\|Segurança de Tipos]]: Detalhamento didático sobre tipagem estática e forte.
  * [[csharp/03-Variáveis, operadores e tipos de dados\|Variáveis, Operadores e Tipos de Dados]]: Dicionário das caixas de tipos de dados.
  * [[csharp/05-Estruturas condicionais e de repetição\|Estruturas Condicionais e de Repetição]]: Tomada de decisões e loops.
  * [[csharp/12-Métodos (funções)\|Métodos (Funções)]]: Automatização de blocos de comando.
  * [[javascript/06-arquitetura-e-avancado/01-Programação orientada a objetos\|Programação Orientada a Objetos]]: Moldes e fôrmas (classes), objetos e construtores.
  * Todas as notas de C# foram escritas sob o rigor do **Método Feynman** e interconectadas com links bidirecionais/cruzados.

* **Melhorias e Ajustes no Web App**:
  * Adicionado suporte a **Accordions** para a listagem categorizada por pastas na tela inicial.
  * Criada a barra de navegação flutuante **`sticky-nav`** contendo busca sincronizada, logo clicável e link direto para focar nas pastas.
  * Otimizado todo o CSS para tornar o layout **mobile friendly** (responsivo para celulares/tablets).
  * Ocultação dos arquivos de sistema (`me.md`, `log.md` e pasta `.gemini/`) na listagem de visualização do index.
  * Adicionadas tags de linguagem/pasta estilizadas nos cards de resultados de busca.

## 2026-07-25

* **Criação de Nota**: [[javascript/03-manipulacao/04-O método forEach em detalhes\|O método forEach em detalhes]]
  * Guia 100% exaustivo sobre o método `forEach()` no JavaScript.
  * Análise exaustiva dos 4 parâmetros: `currentValue` (`item`), `index`, `array` (array original) e `thisArg`.
  * Regras de ouro (retorno `undefined`, proibição de `break`/`continue`, comportamento com slots vazios).
  * Tabela comparativa (`forEach` vs `map` vs `for` tradicional).
  * Mini-projeto real de Central de Notificações de Pedidos no DOM.
  * Validação pós-processada: 734 wikilinks 100% válidos.

* **Atualização de Nota**: [[javascript/01-fundamentos/09-Estruturas de repetição (for e while)\|Estruturas de repetição (for e while)]]
  * Adicionados exemplos explícitos de uso do **`break`** e do **`continue`** diretamente dentro do loop `for` tradicional varrendo um array.
  * Validação pós-processada: 729 wikilinks 100% válidos.

* **Atualização de Nota**: [[javascript/01-fundamentos/09-Estruturas de repetição (for e while)\|Estruturas de repetição (for e while)]]
  * Adicionadas 3 estratégias avançadas de iteração com arrays:
    1. **Interrupção antecipada com `break`** (para parar o loop assim que encontrar o item desejado, como o `'PS4'`, otimizando performance).
    2. **Iteração funcional com `forEach`** (passando automaticamente item, índice e array).
    3. **Contagem regressiva decremental** (`i = array.length - 1; i >= 0; i--`).
  * Pós-processamento automatizado aplicado com sucesso (728 wikilinks válidos).

* **Atualização de Nota**: [[javascript/01-fundamentos/09-Estruturas de repetição (for e while)\|Estruturas de repetição (for e while)]]
  * Adicionado o padrão clássico de iteração em arrays (`videoGames[item]`) usando `.length`.
  * Adicionada seção de alerta `> [!CAUTION]` sobre o **Perigo do Loop Infinito** se o `item++` ou `i = i + 5` for omitido.
  * Validação pós-processada: 727 wikilinks 100% válidos.

* **Criação de Nota**: [[javascript/01-fundamentos/09-Estruturas de repetição (for e while)\|Estruturas de repetição (for e while)]]
  * Guia completo e exaustivo sobre estruturas de repetição no JavaScript (`for`, `while`, `do...while`, `for...of`, `for...in`, `break` e `continue`).
  * Incluído um **Mini-projeto Prático Real** de Gerador de Galeria e Processador de Estoque de Loja Virtual.
  * Pós-processamento automatizado aplicado com sucesso (Sentence Case estrito e Linter com 726 wikilinks válidos).

* **Protocolo de Pós-Processamento Automatizado de Títulos**:
  * Atualizado o script `fix_title_capitalization.py` para tratar automaticamente palavras após dois-pontos (`:`) nos subcabeçalhos (`## 1. Tailwind CSS: estilização por classes utilitárias`).
  * Aplicada a regra estrita em todas as notas e salvos os testes com **721 wikilinks 100% validados**.

* **Expansão Exaustiva de Nota**: [[javascript/03-manipulacao/02-Arrays e métodos de array\|Arrays e métodos de array]]
  * Atualizada a nota para conter a lista exaustiva de mais de **40 métodos e propriedades de Array** (estáticos, mutáveis, busca, iteração, transformação e novidades imutáveis do ES2023 como `toSorted`, `toReversed`, `toSpliced` e `with`).
  * Preservado o **Mini-projeto Prático Real** de Motor de Carrinho de E-commerce.

* **Criação de Nota**: [[javascript/03-manipulacao/02-Arrays e métodos de array\|Arrays e métodos de array]]
  * Guia exaustivo de Arrays e seus métodos divididos por categorias (Mutação, Busca, Iteração/Transformação e Ordenação/Fatiamento).
  * Incluído um **Mini-projeto Prático Real** de Motor de Carrinho de Compras de E-commerce utilizando `filter`, `map`, `find`, `reduce` e `join`.
  * Aplicação do Método Feynman (analogia da Prateleira de Estoque Numerada).

* **Enriquecimento do [[me]]**:
  * Adicionadas seções de **Preferências Técnicas e Estilo de Código** (JS ES6+, React funcional, Tailwind/CSS limpo).
  * Expandido o **Dicionário de Analogias** (Design Tokens, Regras de Negócio/MVP, Jornada do Usuário -> Lógica de Código).

* **Atualização do [[me]]**:
  * Detalhada a formação acadêmica completa no perfil: **Comunicação (Publicidade)**, **Design de Produto**, **MBA em Gestão de Negócios** e **Análise e Desenvolvimento de Sistemas (ADS)**.
  * Refinado o superpoder para unir pensamento visual, experiência do usuário (UX/UI), código e visão estratégica de negócios.

* **Interconexão Bidirecional**: [[javascript/04-dom-e-browser/01-DOM\|DOM]] <-> [[javascript/04-dom-e-browser/02-Métodos do objeto document\|Métodos do objeto document]]
  * Adicionados links cruzados bidirecionais entre a nota conceitual do DOM (árvore de camadas) e a nota exaustiva dos métodos de `document`.
  * Validação pelo linter: 721 wikilinks 100% válidos.

* **Atualização do [[me]]**:
  * Adicionado aviso no topo destacando o arquivo `me.md` como de **leitura obrigatória para todos os agentes de IA**.
  * Incorporadas as 7 diretrizes oficiais do vault diretamente no corpo do `me.md`.

* **Padronização Estrita de Cabeçalhos Internos (Sentence Case)**:
  * Correção automatizada dos cabeçalhos internos (`#`, `##`, `###`) em 30 arquivos do vault (incluindo `Métodos do objeto document.md`).
  * Todos os títulos secundários foram ajustados para manter apenas a primeira palavra com a inicial maiúscula (ex: `## 1. Métodos de seleção e busca de elementos`), preservando nomes próprios e tecnologias.

* **Criação de Nota**: [[javascript/04-dom-e-browser/02-Métodos do objeto document\|Métodos do objeto document]]
  * Dicionário exaustivo de todos os métodos e propriedades do objeto `document` (seleção, criação, eventos, geometria, escrita e propriedades globais).
  * Aplicação do Método Feynman (analogia do Gerente Geral de Edifício).

* **Reorganização Estrutural do Vault**:
  * Eliminação da pasta genérica `conceitos/` e redistribuição de 52 arquivos por pilares funcionais.

* **Criação de Nota**: [[react/01-fundamentos/Pacotes e ecossistema do React\|Pacotes e ecossistema do React]]
  * Guia de bibliotecas e pacotes terceiros para o React (Lucide, React Router, React Hook Form, Framer Motion, Zustand, etc.).
