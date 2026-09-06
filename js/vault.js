// js/vault.js - Gerenciamento de Dados, Áreas e Fallback do Vault de Programação

export const informacoesAreas = {
    "Geral": {
        numero: "01",
        nome: "Geral",
        descricao: "Conceitos-base, atalhos, linha do tempo e referências para o dia a dia do desenvolvimento."
    },
    "csharp": {
        numero: "02",
        nome: "C#",
        descricao: "Lógica, orientação a objetos, coleções, LINQ e integração de aplicações."
    },
    "javascript": {
        numero: "03",
        nome: "JavaScript",
        descricao: "Fundamentos da linguagem, DOM, eventos, APIs e projetos práticos no navegador."
    },
    "react": {
        numero: "04",
        nome: "React",
        descricao: "Componentes, ecossistema e práticas para interfaces modernas com React."
    },
    "css": {
        numero: "05",
        nome: "CSS",
        descricao: "Layouts, responsividade, seletores, animações e acabamento visual para a web."
    },
    "git": {
        numero: "06",
        nome: "Git",
        descricao: "Versionamento, GitHub, fluxo de trabalho e integração com APIs."
    },
    "python": {
        numero: "07",
        nome: "Python",
        descricao: "Fundamentos, sintaxe e experimentos com a linguagem Python."
    },
    "mermaid": {
        numero: "08",
        nome: "Mermaid",
        descricao: "Diagramas em texto para explicar fluxos, arquiteturas e decisões técnicas."
    },
    "llm": {
        numero: "09",
        nome: "LLMs",
        descricao: "Grandes modelos de linguagem, Transformers, embeddings, engenharia de prompt e integrações de IA."
    },
    "tutoriais": {
        numero: "10",
        nome: "Tutoriais",
        descricao: "Guias passo a passo, soluções de problemas e materiais de apoio."
    },
    "web": {
        numero: "11",
        nome: "Web",
        descricao: "Internet, domínios, protocolos e fundamentos da publicação de aplicações."
    }
};

export const arquivosFallback = [
    { titulo: "Atalhos VS Code", path: "./Atalhos%20VS%20Code.md" },
    { titulo: "Evolução da Programação", path: "./Evolu%C3%A7%C3%A3o%20da%20Programa%C3%A7%C3%A3o.md" },
    { titulo: "ASP e SQL Server", path: "./ASP%20e%20SQL%20Server.md" },
    // csharp
    { titulo: "00-Guia de estudos", path: "./csharp/00-Guia%20de%20estudos.md" },
    { titulo: "01-Introdução ao Csharp", path: "./csharp/01-Introdu%C3%A7%C3%A3o%20ao%20Csharp.md" },
    { titulo: "02-O método Main", path: "./csharp/02-O%20m%C3%A9todo%20Main.md" },
    { titulo: "03-Console.Write e Console.WriteLine", path: "./csharp/03-Console.Write%20e%20Console.WriteLine.md" },
    { titulo: "04-Variáveis, operadores e tipos de dados", path: "./csharp/04-Vari%C3%A1veis%2C%20operadores%20e%20tipos%20de%20dados.md" },
    { titulo: "05-Segurança de tipos", path: "./csharp/05-Seguran%C3%A7a%20de%20tipos.md" },
    { titulo: "06-Métodos de string (ToUpper e ToLower)", path: "./csharp/06-M%C3%A9todos%20de%20string%20%28ToUpper%20e%20ToLower%29.md" },
    { titulo: "07-Estruturas condicionais e de repetição", path: "./csharp/07-Estruturas%20condicionais%20e%20de%20repeti%C3%A7%C3%A3o.md" },
    { titulo: "08-O switch em Csharp", path: "./csharp/08-O%20switch%20em%20Csharp.md" },
    { titulo: "09-Estruturas de repetição (for e while)", path: "./csharp/09-Estruturas%20de%20repeti%C3%A7%C3%A3o%20%28for%20e%20while%29.md" },
    { titulo: "10-O loop do-while em Csharp", path: "./csharp/10-O%20loop%20do-while%20em%20Csharp.md" },
    { titulo: "11-O loop foreach em Csharp", path: "./csharp/11-O%20loop%20foreach%20em%20Csharp.md" },
    { titulo: "12-Arrays em Csharp", path: "./csharp/12-Arrays%20em%20Csharp.md" },
    { titulo: "13-Métodos de arrays", path: "./csharp/13-M%C3%A9todos%20de%20arrays.md" },
    { titulo: "14-Coleções em Csharp", path: "./csharp/14-Cole%C3%A7%C3%B5es%20em%20Csharp.md" },
    { titulo: "15-Capacity em coleções", path: "./csharp/15-Capacity%20em%20cole%C3%A7%C3%B5es.md" },
    { titulo: "16-Tipos abstratos de dados", path: "./csharp/16-Tipos%20abstratos%20de%20dados.md" },
    { titulo: "17-Lista, pilha e fila", path: "./csharp/17-Lista%2C%20pilha%20e%20fila.md" },
    { titulo: "18-Métodos (funções)", path: "./csharp/18-M%C3%A9todos%20%28fun%C3%A7%C3%B5es%29.md" },
    { titulo: "19-Programação orientada a objetos", path: "./csharp/19-Programa%C3%A7%C3%A3o%20orientada%20a%20objetos.md" },
    { titulo: "20-Herança e interfaces", path: "./csharp/20-Heran%C3%A7a%20e%20interfaces.md" },
    { titulo: "21-Tratamento de erros", path: "./csharp/21-Tratamento%20de%20erros.md" },
    { titulo: "22-Manipulação de arquivos", path: "./csharp/22-Manipula%C3%A7%C3%A3o%20de%20arquivos.md" },
    { titulo: "23-LINQ buscas e filtros", path: "./csharp/23-LINQ%20buscas%20e%20filtros.md" },
    { titulo: "24-Csharp no Frontend e Backend", path: "./csharp/24-Csharp%20no%20Frontend%20e%20Backend.md" },
    { titulo: "25-Consumindo APIs em Csharp", path: "./csharp/25-Consumindo%20APIs%20em%20Csharp.md" },
    { titulo: "26-Como conectar Csharp no HTML (Backend + Frontend JS)", path: "./csharp/26-Como%20conectar%20Csharp%20no%20HTML%20%28Backend%20%2B%20Frontend%20JS%29.md" },
    // css
    { titulo: "Guia de CSS", path: "./css/Guia%20de%20CSS.md" },
    { titulo: "Bootstrap - Introducao", path: "./css/Bootstrap%20-%20Introducao.md" },
    { titulo: "Bootstrap - Sistema de Grid", path: "./css/Bootstrap%20-%20Sistema%20de%20Grid.md" },
    { titulo: "Bootstrap - Componentes", path: "./css/Bootstrap%20-%20Componentes.md" },
    { titulo: "Flexbox", path: "./css/Flexbox.md" },
    { titulo: "Posicionamento e Alinhamento no CSS", path: "./css/Posicionamento%20e%20Alinhamento%20no%20CSS.md" },
    { titulo: "Transições e Animações", path: "./css/Transi%C3%A7%C3%B5es%20e%20Anima%C3%A7%C3%B5es.md" },
    { titulo: "Pseudo-classes e Pseudo-elementos", path: "./css/Pseudo-classes%20e%20Pseudo-elementos.md" },
    // git
    { titulo: "Introdução ao Git", path: "./git/Introdu%C3%A7%C3%A3o%20ao%20Git.md" },
    { titulo: "Git", path: "./git/01-fundamentos/Git.md" },
    { titulo: "Guia exaustivo de comandos Git", path: "./git/01-fundamentos/Guia%20exaustivo%20de%20comandos%20Git.md" },
    { titulo: "Integrando a API do GitHub", path: "./git/01-fundamentos/Integrando%20a%20API%20do%20GitHub.md" },
    // javascript
    { titulo: "Introdução ao JavaScript", path: "./javascript/Introdu%C3%A7%C3%A3o%20ao%20JavaScript.md" },
    { titulo: "Guia de Estudos", path: "./javascript/00-Guia%20de%20Estudos.md" },
    { titulo: "Consumindo APIs e Fetch", path: "./javascript/Consumindo%20APIs%20e%20Fetch.md" },
    { titulo: "Pesquisa Semântica no Vault", path: "./javascript/Pesquisa%20Sem%C3%A2ntica%20no%20Vault.md" },
    { titulo: "01. Criando uma Busca Simples no DOM", path: "./javascript/01.%20Criando%20uma%20Busca%20Simples%20no%20DOM.md" },
    { titulo: "Var, let e const", path: "./javascript/01-fundamentos/01-Var%2C%20let%20e%20const.md" },
    { titulo: "Console.log", path: "./javascript/01-fundamentos/02-Console.log.md" },
    { titulo: "Tipos de dados", path: "./javascript/01-fundamentos/03-Tipos%20de%20dados.md" },
    { titulo: "Operadores e operações", path: "./javascript/01-fundamentos/04-Operadores%20e%20opera%C3%A7%C3%B5es.md" },
    { titulo: "Condicionais (if-else)", path: "./javascript/01-fundamentos/05-Condicionais%20%28if-else%29.md" },
    { titulo: "Switch", path: "./javascript/01-fundamentos/06-Switch.md" },
    { titulo: "Truthy e falsy", path: "./javascript/01-fundamentos/07-Truthy%20e%20falsy.md" },
    { titulo: "Hoisting", path: "./javascript/01-fundamentos/08-Hoisting.md" },
    { titulo: "Estruturas de repetição (for e while)", path: "./javascript/01-fundamentos/09-Estruturas%20de%20repeti%C3%A7%C3%A3o%20%28for%20e%20while%29.md" },
    { titulo: "Debug (depuração)", path: "./javascript/01-fundamentos/10-Debug%20%28depura%C3%A7%C3%A3o%29.md" },
    { titulo: "Funções", path: "./javascript/02-funcoes-e-objetos/01-Fun%C3%A7%C3%B5es.md" },
    { titulo: "Arrow functions", path: "./javascript/02-funcoes-e-objetos/02-Arrow%20functions.md" },
    { titulo: "Objetos", path: "./javascript/02-funcoes-e-objetos/03-Objetos.md" },
    { titulo: "Dot notation e propriedades", path: "./javascript/02-funcoes-e-objetos/04-Dot%20notation%20e%20propriedades.md" },
    { titulo: "Entendendo o this", path: "./javascript/02-funcoes-e-objetos/05-Entendendo%20o%20this.md" },
    { titulo: "Funções construtoras", path: "./javascript/02-funcoes-e-objetos/06-Fun%C3%A7%C3%B5es%20construtoras.md" },
    { titulo: "Protótipos e proto", path: "./javascript/02-funcoes-e-objetos/07-Prot%C3%B3tipos%20e%20proto.md" },
    { titulo: "Herança e objetos aninhados", path: "./javascript/02-funcoes-e-objetos/08-Heran%C3%A7a%20e%20objetos%20aninhados.md" },
    { titulo: "Classes", path: "./javascript/02-funcoes-e-objetos/09-Classes.md" },
    { titulo: "Get e set", path: "./javascript/02-funcoes-e-objetos/10-Get%20e%20set.md" },
    { titulo: "Template strings", path: "./javascript/03-manipulacao/01-Template%20strings.md" },
    { titulo: "Arrays e métodos de array", path: "./javascript/03-manipulacao/02-Arrays%20e%20m%C3%A9todos%20de%20array.md" },
    { titulo: "Métodos de array", path: "./javascript/03-manipulacao/03-M%C3%A9todos%20de%20array.md" },
    { titulo: "O método forEach em detalhes", path: "./javascript/03-manipulacao/04-O%20m%C3%A9todo%20forEach%20em%20detalhes.md" },
    { titulo: "Propriedades e métodos de string", path: "./javascript/03-manipulacao/05-Propriedades%20e%20m%C3%A9todos%20de%20string.md" },
    { titulo: "Math", path: "./javascript/03-manipulacao/06-Math.md" },
    { titulo: "Regex", path: "./javascript/03-manipulacao/07-Regex.md" },
    { titulo: "JSON", path: "./javascript/03-manipulacao/08-JSON.md" },
    { titulo: "Como converter markdown do obsidian em html", path: "./javascript/03-manipulacao/09-Como%20converter%20markdown%20do%20obsidian%20em%20html.md" },
    { titulo: "DOM", path: "./javascript/04-dom-e-browser/01-DOM.md" },
    { titulo: "Métodos do objeto document", path: "./javascript/04-dom-e-browser/02-M%C3%A9todos%20do%20objeto%20document.md" },
    { titulo: "Navegação na árvore do DOM", path: "./javascript/04-dom-e-browser/03-Navega%C3%A7%C3%A3o%20na%20%C3%A1rvore%20do%20DOM.md" },
    { titulo: "Manipulando elementos e atributos", path: "./javascript/04-dom-e-browser/04-Manipulando%20elementos%20e%20atributos.md" },
    { titulo: "Manipulando estilos e classes no DOM", path: "./javascript/04-dom-e-browser/05-Manipulando%20estilos%20e%20classes%20no%20DOM.md" },
    { titulo: "Eventos no navegador", path: "./javascript/04-dom-e-browser/06-Eventos%20no%20navegador.md" },
    { titulo: "Event bubbling e delegation", path: "./javascript/04-dom-e-browser/07-Event%20bubbling%20e%20delegation.md" },
    { titulo: "Formulários e validação no DOM", path: "./javascript/04-dom-e-browser/08-Formul%C3%A1rios%20e%20valida%C3%A7%C3%A3o%20no%20DOM.md" },
    { titulo: "Criando e inserindo elementos no DOM", path: "./javascript/04-dom-e-browser/09-Criando%20e%20inserindo%20elementos%20no%20DOM.md" },
    { titulo: "Removendo elementos do DOM", path: "./javascript/04-dom-e-browser/10-Removendo%20elementos%20do%20DOM.md" },
    { titulo: "Dimensões e posições de elementos", path: "./javascript/04-dom-e-browser/11-Dimens%C3%B5es%20e%20posi%C3%A7%C3%B5es%20de%20elementos.md" },
    { titulo: "Janela e tela", path: "./javascript/04-dom-e-browser/12-Janela%20e%20tela.md" },
    { titulo: "Temporizadores", path: "./javascript/04-dom-e-browser/13-Temporizadores.md" },
    { titulo: "Scroll e navegação suave", path: "./javascript/04-dom-e-browser/14-Scroll%20e%20navega%C3%A7%C3%A3o%20suave.md" },
    { titulo: "Intersection Observer API", path: "./javascript/04-dom-e-browser/15-Intersection%20Observer%20API.md" },
    { titulo: "Mutation Observer API", path: "./javascript/04-dom-e-browser/16-Mutation%20Observer%20API.md" },
    { titulo: "Canvas e gráficos", path: "./javascript/04-dom-e-browser/17-Canvas%20e%20gr%C3%A1ficos.md" },
    { titulo: "SVG com JavaScript", path: "./javascript/04-dom-e-browser/18-SVG%20com%20JavaScript.md" },
    { titulo: "Clipboard API", path: "./javascript/04-dom-e-browser/19-Clipboard%20API.md" },
    { titulo: "Fullscreen API", path: "./javascript/04-dom-e-browser/20-Fullscreen%20API.md" },
    { titulo: "Local Storage e Session Storage", path: "./javascript/05-armazenamento/01-Local%20Storage%20e%20Session%20Storage.md" },
    { titulo: "Cookies", path: "./javascript/05-armazenamento/02-Cookies.md" },
    { titulo: "IndexedDB", path: "./javascript/05-armazenamento/03-IndexedDB.md" },
    { titulo: "Callbacks", path: "./javascript/06-assincrono/01-Callbacks.md" },
    { titulo: "Promises", path: "./javascript/06-assincrono/02-Promises.md" },
    { titulo: "Async e await", path: "./javascript/06-assincrono/03-Async%20e%20await.md" },
    { titulo: "Fetch API", path: "./javascript/06-assincrono/04-Fetch%20API.md" },
    { titulo: "Axios", path: "./javascript/06-assincrono/05-Axios.md" },
    { titulo: "Manipulação de erros assíncronos", path: "./javascript/06-assincrono/06-Manipula%C3%A7%C3%A3o%20de%20erros%20ass%C3%ADncronos.md" },
    { titulo: "Event Loop e Call Stack", path: "./javascript/06-assincrono/07-Event%20Loop%20e%20Call%20Stack.md" },
    { titulo: "Microtasks e Macrotasks", path: "./javascript/06-assincrono/08-Microtasks%20e%20Macrotasks.md" },
    { titulo: "Aborting requests com AbortController", path: "./javascript/06-assincrono/09-Aborting%20requests%20com%20AbortController.md" },
    { titulo: "WebSockets", path: "./javascript/06-assincrono/10-WebSockets.md" },
    { titulo: "Projeto Lista de Tarefas (DOM)", path: "./javascript/07-projetos-praticos/01-Projeto%20Lista%20de%20Tarefas%20%28DOM%29.md" },
    { titulo: "Projeto Mini E-commerce (Array e DOM)", path: "./javascript/07-projetos-praticos/02-Projeto%20Mini%20E-commerce%20%28Array%20e%20DOM%29.md" },
    { titulo: "Projeto Consumo de API (GitHub Users)", path: "./javascript/07-projetos-praticos/03-Projeto%20Consumo%20de%20API%20%28GitHub%20Users%29.md" },
    // mermaid
    { titulo: "00-Guia de estudos", path: "./mermaid/00-Guia%20de%20estudos.md" },
    { titulo: "01-Mermaid como linguagem de modelagem visual", path: "./mermaid/01-Mermaid%20como%20linguagem%20de%20modelagem%20visual.md" },
    { titulo: "02-Flowcharts e fundamentos de grafos", path: "./mermaid/02-Flowcharts%20e%20fundamentos%20de%20grafos.md" },
    { titulo: "03-Direção, hierarquia e organização espacial", path: "./mermaid/03-Dire%C3%A7%C3%A3o%2C%20hierarquia%20e%20organiza%C3%A7%C3%A3o%20espacial.md" },
    { titulo: "04-Nós, relações, subgraphs e semântica visual", path: "./mermaid/04-N%C3%B3s%2C%20rela%C3%A7%C3%B5es%2C%20subgraphs%20e%20sem%C3%A2ntica%20visual.md" },
    { titulo: "05-Como escolher o tipo de diagrama", path: "./mermaid/05-Como%20escolher%20o%20tipo%20de%20diagrama.md" },
    { titulo: "06-Diagramas de sequência", path: "./mermaid/06-Diagramas%20de%20sequ%C3%AAncia.md" },
    { titulo: "07-Diagramas de classes e UML com Mermaid", path: "./mermaid/07-Diagramas%20de%20classes%20e%20UML%20com%20Mermaid.md" },
    { titulo: "08-Diagramas de estado", path: "./mermaid/08-Diagramas%20de%20estado.md" },
    { titulo: "09-ER e modelagem de dados", path: "./mermaid/09-ER%20e%20modelagem%20de%20dados.md" },
    { titulo: "10-Arquitetura de software com Mermaid", path: "./mermaid/10-Arquitetura%20de%20software%20com%20Mermaid.md" },
    { titulo: "11-Controle de complexidade em diagramas grandes", path: "./mermaid/11-Controle%20de%20complexidade%20em%20diagramas%20grandes.md" },
    { titulo: "12-Padrões, antipadrões e refatoração de diagramas", path: "./mermaid/12-Padr%C3%B5es%2C%20antipadr%C3%B5es%20e%20refatora%C3%A7%C3%A3o%20de%20diagramas.md" },
    { titulo: "13-Mermaid dinâmico com JavaScript", path: "./mermaid/13-Mermaid%20din%C3%A2mico%20com%20JavaScript.md" },
    { titulo: "Sintaxe e possibilidades com Mermaid", path: "./mermaid/Sintaxe%20e%20possibilidades%20com%20Mermaid.md" },
    // llm
    { titulo: "00-Guia de estudos", path: "./llm/00-Guia%20de%20estudos.md" },
    { titulo: "Glossário de LLMs", path: "./llm/Gloss%C3%A1rio%20de%20LLMs.md" },
    { titulo: "Fundamentos — vetores, matrizes, tensores e shapes", path: "./llm/Fundamentos%20%E2%80%94%20vetores%2C%20matrizes%2C%20tensores%20e%20shapes.md" },
    { titulo: "01-Dinâmica de treino e inferência em LLMs", path: "./llm/01-Din%C3%A2mica%20de%20treino%20e%20infer%C3%AAncia%20em%20LLMs.md" },
    { titulo: "02-Tokenização, embeddings e representações contextuais", path: "./llm/02-Tokeniza%C3%A7%C3%A3o%2C%20embeddings%20e%20representa%C3%A7%C3%B5es%20contextuais.md" },
    { titulo: "03-Arquitetura do Transformer e mecanismo de atenção", path: "./llm/03-Arquitetura%20do%20Transformer%20e%20mecanismo%20de%20aten%C3%A7%C3%A3o.md" },
    { titulo: "04-Engenharia de contexto e controle de inferência", path: "./llm/04-Engenharia%20de%20contexto%20e%20controle%20de%20infer%C3%AAncia.md" },
    { titulo: "05-Sistemas de produção com LLMs, tool calling e streaming", path: "./llm/05-Sistemas%20de%20produ%C3%A7%C3%A3o%20com%20LLMs%2C%20tool%20calling%20e%20streaming.md" },
    { titulo: "06-LLM Wiki conhecimento compilado para humanos e agentes", path: "./llm/06-LLM%20Wiki%20conhecimento%20compilado%20para%20humanos%20e%20agentes.md" },
    { titulo: "07-Por que LLMs precisam de conhecimento externo", path: "./llm/07-Por%20que%20LLMs%20precisam%20de%20conhecimento%20externo.md" },
    { titulo: "08-O que é RAG e como funciona", path: "./llm/08-O%20que%20%C3%A9%20RAG%20e%20como%20funciona.md" },
    { titulo: "09-Chunking e estratégias de fragmentação", path: "./llm/09-Chunking%20e%20estrat%C3%A9gias%20de%20fragmenta%C3%A7%C3%A3o.md" },
    { titulo: "10-Embeddings aplicados ao RAG", path: "./llm/10-Embeddings%20aplicados%20ao%20RAG.md" },
    { titulo: "11-Vector stores, índices e algoritmos de busca", path: "./llm/11-Vector%20stores%2C%20%C3%ADndices%20e%20algoritmos%20de%20busca.md" },
    { titulo: "12-Estratégias de retrieval e busca híbrida", path: "./llm/12-Estrat%C3%A9gias%20de%20retrieval%20e%20busca%20h%C3%ADbrida.md" },
    { titulo: "13-Reranking e modelos de pontuação cruzada", path: "./llm/13-Reranking%20e%20modelos%20de%20pontua%C3%A7%C3%A3o%20cruzada.md" },
    { titulo: "14-Engenharia de contexto para RAG", path: "./llm/14-Engenharia%20de%20contexto%20para%20RAG.md" },
    { titulo: "15-Construindo um RAG em JavaScript", path: "./llm/15-Construindo%20um%20RAG%20em%20JavaScript.md" },
    { titulo: "16-Avaliando um sistema RAG", path: "./llm/16-Avaliando%20um%20sistema%20RAG.md" },
    { titulo: "17-RAG avançado e limites arquiteturais", path: "./llm/17-RAG%20avan%C3%A7ado%20e%20limites%20arquiteturais.md" },
    // python
    { titulo: "Python", path: "./python/Python.md" },
    // react
    { titulo: "React", path: "./react/React.md" },
    // tutoriais
    { titulo: "Adicionando Fontes Customizadas", path: "./tutoriais/Adicionando%20Fontes%20Customizadas.md" },
    { titulo: "Centralizando Elementos com CSS", path: "./tutoriais/Centralizando%20Elementos%20com%20CSS.md" },
    { titulo: "Como Usar o Git e GitHub", path: "./tutoriais/Como%20Usar%20o%20Git%20e%20GitHub.md" },
    { titulo: "Deploy com GitHub Pages", path: "./tutoriais/Deploy%20com%20GitHub%20Pages.md" },
    { titulo: "Resolvendo o Erro 404 no GitHub Pages", path: "./tutoriais/Resolvendo%20o%20Erro%20404%20no%20GitHub%20Pages.md" },
    // web
    { titulo: "DNS", path: "./web/DNS.md" },
    { titulo: "Hospedagem", path: "./web/Hospedagem.md" },
    { titulo: "O que é Registro de Domínio", path: "./web/O%20que%20%C3%A9%20Registro%20de%20Dom%C3%ADnio.md" },
    { titulo: "O que é Servidor Web", path: "./web/O%20que%20%C3%A9%20Servidor%20Web.md" },
    { titulo: "Propagação de Domínio", path: "./web/Propaga%C3%A7%C3%A3o%20de%20Dom%C3%ADnio.md" },
    { titulo: "Registros DNS", path: "./web/Registros%20DNS.md" },
    { titulo: "Tipos de Hospedagem", path: "./web/Tipos%20de%20Hospedagem.md" }
];

export async function obterListaDeArquivos() {
    try {
        const resposta = await fetch("https://api.github.com/repos/leorruas/programacao/git/trees/main?recursive=1", { cache: "no-cache" });
        if (!resposta.ok) throw new Error("Erro na API do GitHub");

        const dados = await resposta.json();

        return dados.tree
            .filter(item => {
                const pathLower = item.path.toLowerCase();
                const fileName = pathLower.split("/").pop();
                
                if (!item.path.endsWith(".md")) return false;
                if (item.path.includes(".obsidian") || item.path.includes(".git") || item.path.includes(".gemini") || item.path.includes(".agents")) return false;
                if (fileName === "agents.md" || fileName === "index.md" || fileName === "me.md" || fileName === "log.md" || fileName === "gemini.md") return false;
                
                return true;
            })
            .map(item => {
                const nomeSemExtensao = item.path.split("/").pop().replace(".md", "");
                const pathCodificado = item.path.split("/").map(seg => encodeURIComponent(seg)).join("/");
                return {
                    titulo: nomeSemExtensao,
                    path: `./${pathCodificado}`,
                    sourcePath: item.path
                };
            });
    } catch (erro) {
        console.warn("Não foi possível listar via GitHub, usando lista padrão completa:", erro);
        return arquivosFallback.map(item => ({
            ...item,
            sourcePath: decodeURIComponent(item.path.replace(/^\.\//, ""))
        }));
    }
}
