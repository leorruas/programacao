// Cache global para armazenar os conteúdos dos arquivos em memória
let cacheArquivos = null;
let debounceTimer = null;
let todosOsArtigos = [];
let todasAsPastas = {};
let categoriaAtual = null;

// Função para buscar automaticamente todos os arquivos .md do seu GitHub (sem precisar de token)
async function obterListaDeArquivos() {
    try {
        const resposta = await fetch("https://api.github.com/repos/leorruas/programacao/git/trees/main?recursive=1", { cache: "no-cache" });
        if (!resposta.ok) throw new Error("Erro na API do GitHub");

        const dados = await resposta.json();

        // Filtra apenas os arquivos Markdown (.md), ignorando pastas internas do Obsidian/Git/Agents
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
                    path: `./${pathCodificado}`
                };
            });
    } catch (erro) {
        console.warn("Não foi possível listar via GitHub, usando lista padrão completa:", erro);
        // Fallback local completo com todos os arquivos do vault
        return [
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
            { titulo: "O objeto window", path: "./javascript/04-dom-e-browser/03-O%20objeto%20window.md" },
            { titulo: "Eventos", path: "./javascript/04-dom-e-browser/04-Eventos.md" },
            { titulo: "O console do navegador", path: "./javascript/04-dom-e-browser/05-O%20console%20do%20navegador.md" },
            { titulo: "Animações com scroll", path: "./javascript/04-dom-e-browser/06-Anima%C3%A7%C3%B5es%20com%20scroll.md" },
            { titulo: "Local storage", path: "./javascript/04-dom-e-browser/07-Local%20storage.md" },
            { titulo: "Callbacks", path: "./javascript/05-assincrono/01-Callbacks.md" },
            { titulo: "API", path: "./javascript/05-assincrono/02-API.md" },
            { titulo: "Fetch", path: "./javascript/05-assincrono/03-Fetch.md" },
            { titulo: "Async await", path: "./javascript/05-assincrono/04-Async%20await.md" },
            { titulo: "Programação orientada a objetos", path: "./javascript/06-arquitetura-e-avancado/01-Programa%C3%A7%C3%A3o%20orientada%20a%20objetos.md" },
            { titulo: "Node.js", path: "./javascript/06-arquitetura-e-avancado/02-Node.js.md" },
            { titulo: "Escopo e closures", path: "./javascript/06-arquitetura-e-avancado/03-Escopo%20e%20closures.md" },
            { titulo: "Desestruturação e spread", path: "./javascript/06-arquitetura-e-avancado/04-Desestrutura%C3%A7%C3%A3o%20e%20spread.md" },
            { titulo: "Módulos import e export", path: "./javascript/06-arquitetura-e-avancado/05-M%C3%B3dulos%20import%20e%20export.md" },
            { titulo: "Tratamento de erros", path: "./javascript/06-arquitetura-e-avancado/06-Tratamento%20de%20erros.md" },
            { titulo: "Event loop e call stack", path: "./javascript/06-arquitetura-e-avancado/07-Event%20loop%20e%20call%20stack.md" },
            { titulo: "TypeScript introdução", path: "./javascript/06-arquitetura-e-avancado/08-TypeScript%20introdu%C3%A7%C3%A3o.md" },
            { titulo: "Ordem de Carregamento do DOM e Script", path: "./javascript/conceitos/Ordem%20de%20Carregamento%20do%20DOM%20e%20Script.md" },
            // mermaid
            { titulo: "Introdução ao Mermaid", path: "./mermaid/Introdu%C3%A7%C3%A3o%20ao%20Mermaid.md" },
            { titulo: "Sintaxe e possibilidades com Mermaid", path: "./mermaid/Sintaxe%20e%20possibilidades%20com%20Mermaid.md" },
            // python
            { titulo: "Introdução ao Python", path: "./python/Introdu%C3%A7%C3%A3o%20ao%20Python.md" },
            { titulo: "Comparativo de sintaxe e tipos", path: "./python/01-fundamentos/Comparativo%20de%20sintaxe%20e%20tipos.md" },
            // react
            { titulo: "Introdução ao React", path: "./react/Introdu%C3%A7%C3%A3o%20ao%20React.md" },
            { titulo: "Bibliotecas de UI e estilização", path: "./react/01-fundamentos/Bibliotecas%20de%20UI%20e%20estiliza%C3%A7%C3%A3o.md" },
            { titulo: "Hooks principais - useState, useRef, useMemo", path: "./react/01-fundamentos/Hooks%20principais%20-%20useState%2C%20useRef%2C%20useMemo.md" },
            { titulo: "Pacotes e ecossistema do React", path: "./react/01-fundamentos/Pacotes%20e%20ecossistema%20do%20React.md" },
            // tutoriais
            { titulo: "[Csharp] • Como Usar ArrayList, For e Foreach para Calcular Médias", path: "./tutoriais/%5BCsharp%5D%20%E2%80%A2%20Como%20Usar%20ArrayList%2C%20For%20e%20Foreach%20para%20Calcular%20M%C3%A9dias.md" },
            { titulo: "[Csharp] • Projeto 1 - O Assistente de Terminal", path: "./tutoriais/%5BCsharp%5D%20%E2%80%A2%20Projeto%201%20-%20O%20Assistente%20de%20Terminal.md" },
            { titulo: "[Csharp] • Projeto 2 - O Jogo de Adivinhação", path: "./tutoriais/%5BCsharp%5D%20%E2%80%A2%20Projeto%202%20-%20O%20Jogo%20de%20Adivinha%C3%A7%C3%A3o.md" },
            { titulo: "[Csharp] • Projeto 3 - O Gerenciador de Tarefas", path: "./tutoriais/%5BCsharp%5D%20%E2%80%A2%20Projeto%203%20-%20O%20Gerenciador%20de%20Tarefas.md" },
            { titulo: "[Csharp] • Projeto 4 - O Simulador de Conta Bancária", path: "./tutoriais/%5BCsharp%5D%20%E2%80%A2%20Projeto%204%20-%20O%20Simulador%20de%20Conta%20Banc%C3%A1ria.md" },
            { titulo: "[Csharp] • Projeto 5 - O Diário Digital", path: "./tutoriais/%5BCsharp%5D%20%E2%80%A2%20Projeto%205%20-%20O%20Di%C3%A1rio%20Digital.md" },
            { titulo: "[JavaScript] • 01. Criando uma Busca Simples no DOM", path: "./tutoriais/%5BJavaScript%5D%20%E2%80%A2%2001.%20Criando%20uma%20Busca%20Simples%20no%20DOM.md" },
            { titulo: "[JavaScript] • Como Criar um Modal Leitor de Artigos", path: "./tutoriais/%5BJavaScript%5D%20%E2%80%A2%20Como%20Criar%20um%20Modal%20Leitor%20de%20Artigos.md" },
            { titulo: "[JavaScript] • Como Disparar a Busca com a Tecla Enter", path: "./tutoriais/%5BJavaScript%5D%20%E2%80%A2%20Como%20Disparar%20a%20Busca%20com%20a%20Tecla%20Enter.md" },
            { titulo: "[JavaScript] • Como Substituir os Resultados pelo Artigo no Main", path: "./tutoriais/%5BJavaScript%5D%20%E2%80%A2%20Como%20Substituir%20os%20Resultados%20pelo%20Artigo%20no%20Main.md" },
            // web
            { titulo: "DNS e gerenciamento de domínios", path: "./web/01-fundamentos/DNS%20e%20gerenciamento%20de%20dom%C3%ADnios.md" }
        ];
    }
}

// Carrega todos os arquivos em paralelo e guarda na memória (cache)
async function carregarTodosArquivosEmCache() {
    if (cacheArquivos) return cacheArquivos;
    
    const lista = await obterListaDeArquivos();
    todosOsArtigos = [];
    todasAsPastas = {};
    
    // Baixa todos os arquivos concorrentemente usando Promise.all
    cacheArquivos = await Promise.all(
        lista.map(async (arquivo) => {
            try {
                const resposta = await fetch(arquivo.path, { cache: "no-cache" });
                const conteudoTexto = await resposta.text();
                const categoria = extrairCategoria(arquivo.path);

                const itemProcessado = {
                    arquivo,
                    titulo: arquivo.titulo,
                    conteudo: conteudoTexto,
                    conteudoTexto,
                    path: arquivo.path,
                    categoria
                };

                todosOsArtigos.push(itemProcessado);

                if (!todasAsPastas[categoria]) {
                    todasAsPastas[categoria] = [];
                }
                todasAsPastas[categoria].push(itemProcessado);

                return itemProcessado;
            } catch (erro) {
                console.error("Erro ao pré-carregar arquivo:", arquivo.path, erro);
                return null;
            }
        })
    );

    cacheArquivos = (cacheArquivos || []).filter(Boolean);
    return cacheArquivos;
}

function extrairCategoria(caminho) {
    const caminhoLimpo = decodeURIComponent(caminho).replace(/^\.\//, "");
    const partes = caminhoLimpo.split("/");
    if (partes.length > 1) {
        return partes[0];
    }
    return "Geral";
}

function configurarMermaid() {
    if (typeof mermaid === "undefined") return;

    const temaEscuro = document.documentElement.dataset.theme !== "light";
    mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        fontFamily: "Archivo, sans-serif",
        flowchart: { curve: "linear" },
        gantt: {
            titleTopMargin: 25,
            barHeight: 22,
            barGap: 6,
            topPadding: 50,
            sidePadding: 80,
            fontSize: 12
        },
        themeVariables: temaEscuro ? {
            fontFamily: 'Archivo, sans-serif',
            darkMode: true,
            background: '#0d0d0d',
            primaryColor: '#222222',
            primaryTextColor: '#ffffff',
            primaryBorderColor: '#ffb6c1',
            lineColor: '#ffb6c1',
            secondaryColor: '#1a1a1a',
            tertiaryColor: '#141414',
            textColor: '#ffffff',
            mainBkg: '#1a1a1a',
            nodeBorder: '#ffb6c1',
            nodeTextColor: '#ffffff',
            clusterBkg: '#111111',
            clusterBorder: 'rgba(255, 182, 193, 0.4)',
            titleColor: '#ffb6c1',
            edgeLabelBackground: '#0d0d0d',
            actorTextColor: '#ffffff',
            actorLineColor: '#ffb6c1',
            actorBkg: '#1c1c1c',
            signalColor: '#ffffff',
            signalTextColor: '#ffffff',
            labelTextColor: '#ffffff',
            loopTextColor: '#ffffff',
            noteTextColor: '#ffffff',
            noteBkgColor: '#222222',
            noteBorderColor: '#ffb6c1',
            activationBorderColor: '#ffb6c1',
            activationBkgColor: '#333333',
            sectionBkgColor: '#181818',
            altSectionBkgColor: '#222222',
            sectionBkgColor2: '#121212',
            taskBorderColor: '#ffb6c1',
            taskBkgColor: '#282828',
            taskTextDarkColor: '#ffffff',
            taskTextLightColor: '#ffffff',
            taskTextColor: '#ffffff',
            taskTextOutsideColor: '#ffffff',
            taskTextClickableColor: '#ffb6c1',
            activeTaskBorderColor: '#ffb6c1',
            activeTaskBkgColor: '#3a2028',
            gridColor: '#333333',
            doneTaskBkgColor: '#1a1a1a',
            doneTaskBorderColor: '#555555',
            critBorderColor: '#ff4d4f',
            critBkgColor: '#4d1417',
            todayLineColor: '#ffb6c1',
            quadrant1Fill: '#24141c',
            quadrant2Fill: '#1c1418',
            quadrant3Fill: '#141414',
            quadrant4Fill: '#181818',
            quadrant1TextFill: '#ffb6c1',
            quadrant2TextFill: '#ffb6c1',
            quadrant3TextFill: '#cccccc',
            quadrant4TextFill: '#cccccc',
            quadrantPointFill: '#ffb6c1',
            quadrantPointTextFill: '#ffffff',
            quadrantXAxisTextFill: '#ffffff',
            quadrantYAxisTextFill: '#ffffff',
            pie1: '#ffb6c1',
            pie2: '#ff94a6',
            pie3: '#e07a8f',
            pie4: '#b34d65',
            pie5: '#7a2e40',
            pieTitleTextColor: '#ffb6c1',
            pieSectionTextColor: '#000000',
            pieLegendTextColor: '#ffffff',
            pieStrokeColor: '#000000'
        } : {
            fontFamily: 'Archivo, sans-serif',
            darkMode: false,
            background: '#ffffff',
            primaryColor: '#fdf2f4',
            primaryTextColor: '#151515',
            primaryBorderColor: '#c2255c',
            lineColor: '#c2255c',
            secondaryColor: '#fff5f7',
            tertiaryColor: '#fce8ed',
            textColor: '#151515',
            mainBkg: '#ffffff',
            nodeBorder: '#c2255c',
            nodeTextColor: '#151515',
            clusterBkg: '#fafafa',
            clusterBorder: 'rgba(194, 37, 92, 0.4)',
            titleColor: '#c2255c',
            edgeLabelBackground: '#ffffff',
            actorTextColor: '#151515',
            actorLineColor: '#c2255c',
            actorBkg: '#fdf2f4',
            signalColor: '#151515',
            signalTextColor: '#151515',
            labelTextColor: '#151515',
            loopTextColor: '#151515',
            noteTextColor: '#151515',
            noteBkgColor: '#fce8ed',
            noteBorderColor: '#c2255c',
            activationBorderColor: '#c2255c',
            activationBkgColor: '#fce8ed',
            sectionBkgColor: '#f8fafc',
            altSectionBkgColor: '#f1f5f9',
            sectionBkgColor2: '#e2e8f0',
            taskBorderColor: '#c2255c',
            taskBkgColor: '#fdf2f4',
            taskTextDarkColor: '#151515',
            taskTextLightColor: '#151515',
            taskTextColor: '#151515',
            taskTextOutsideColor: '#151515',
            taskTextClickableColor: '#c2255c',
            activeTaskBorderColor: '#c2255c',
            activeTaskBkgColor: '#fce8ed',
            gridColor: '#e5e7eb',
            doneTaskBkgColor: '#f3f4f6',
            doneTaskBorderColor: '#9ca3af',
            critBorderColor: '#e03131',
            critBkgColor: '#ffe3e3',
            todayLineColor: '#c2255c',
            quadrant1Fill: '#fff0f3',
            quadrant2Fill: '#ffe3e8',
            quadrant3Fill: '#f8f9fa',
            quadrant4Fill: '#f1f3f5',
            quadrant1TextFill: '#c2255c',
            quadrant2TextFill: '#c2255c',
            quadrant3TextFill: '#495057',
            quadrant4TextFill: '#495057',
            quadrantPointFill: '#c2255c',
            quadrantPointTextFill: '#151515',
            quadrantXAxisTextFill: '#151515',
            quadrantYAxisTextFill: '#151515',
            pie1: '#c2255c',
            pie2: '#e64980',
            pie3: '#f783ac',
            pie4: '#fcc2d7',
            pie5: '#ffdeeb',
            pieTitleTextColor: '#c2255c',
            pieSectionTextColor: '#000000',
            pieLegendTextColor: '#151515',
            pieStrokeColor: '#ffffff'
        }
    });
}

function renderizarDiagramasMermaid() {
    if (typeof mermaid === "undefined" || !artigoCorpo) return;
    configurarMermaid();

    const diagramas = artigoCorpo.querySelectorAll(".mermaid");
    diagramas.forEach(diagrama => {
        const codigo = diagrama.dataset.mermaidSource || diagrama.textContent;
        diagrama.dataset.mermaidSource = codigo;
        diagrama.removeAttribute("data-processed");
        diagrama.textContent = codigo;
    });

    if (diagramas.length > 0) {
        setTimeout(() => {
            try {
                mermaid.run({ nodes: diagramas });
            } catch (err) {
                console.warn("Erro ao renderizar Mermaid:", err);
            }
        }, 30);
    }
}

const botao = document.getElementById("btn-pesquisar");
const campoTexto = document.getElementById("main-search-input");
const campoTextoNav = document.getElementById("nav-search-input");
const btnTema = document.getElementById("theme-toggle");

// Controle de Tema (Claro / Escuro)
function aplicarTema(tema, persistir = true) {
    document.documentElement.dataset.theme = tema;
    if (persistir) localStorage.setItem("tema-programacao", tema);
    if (btnTema) {
        const proximoTema = tema === "light" ? "modo escuro" : "modo claro";
        btnTema.textContent = proximoTema;
        btnTema.setAttribute("aria-label", `Alternar para ${proximoTema}`);
    }
}

function inicializarTema() {
    const temaSalvo = localStorage.getItem("tema-programacao");
    const temaDoSistema = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    aplicarTema(temaSalvo || temaDoSistema, false);
}

if (btnTema) {
    btnTema.addEventListener("click", () => {
        const temaAtual = document.documentElement.dataset.theme === "light" ? "light" : "dark";
        const novoTema = temaAtual === "dark" ? "light" : "dark";
        aplicarTema(novoTema, true);
        renderizarDiagramasMermaid();
    });
}
const containerResultados = document.querySelector(".cards-container");
const divResultados = document.querySelector(".resultados");
const leitorDeArtigo = document.getElementById("leitor-artigo");
const leitorDeDisciplina = document.getElementById("disciplina-leitor");
const disciplinaTitulo = document.getElementById("disciplina-titulo");
const disciplinaAcoes = document.getElementById("disciplina-acoes");
const artigoTitulo = document.getElementById("artigo-titulo");
const artigoCorpo = document.getElementById("artigo-corpo");
const artigoBreadcrumbs = document.getElementById("artigo-breadcrumbs");
const artigoContexto = document.getElementById("artigo-contexto");
const artigoNavCards = document.getElementById("artigo-nav-cards");
const btnVoltar = document.getElementById("btn-voltar");
const btnVoltarDisciplina = document.getElementById("btn-voltar-disciplina");

const nomesDeAreas = {
    csharp: "C#",
    css: "CSS",
    git: "Git",
    javascript: "JavaScript",
    mermaid: "Mermaid",
    python: "Python",
    react: "React",
    tutoriais: "Tutoriais",
    web: "Web"
};

const descricoesDeAreas = {
    "Geral": "Conceitos-base, atalhos e referências para o dia a dia do desenvolvimento.",
    csharp: "Lógica, orientação a objetos, coleções, LINQ e integração de aplicações.",
    css: "Layouts, responsividade, seletores, animações e acabamento visual para a web.",
    git: "Versionamento, GitHub, fluxo de trabalho e integração com APIs.",
    javascript: "Fundamentos da linguagem, DOM, eventos, APIs e projetos práticos no navegador.",
    mermaid: "Diagramas em texto para explicar fluxos, estruturas e decisões técnicas.",
    python: "Fundamentos, sintaxe e experimentos com a linguagem Python.",
    react: "Componentes, ecossistema e práticas para interfaces modernas com React.",
    tutoriais: "Guias passo a passo, soluções de problemas e materiais de apoio.",
    web: "Internet, domínios, protocolos e fundamentos da publicação de aplicações."
};

function formatarTitulo(titulo) {
    return titulo
        .replace(/^\d+[.\-_\s]+/, "")
        .replace(/\bCsharp\b/gi, "C#")
        .replace(/\bJavascript\b/gi, "JavaScript")
        .replace(/\bCss\b/g, "CSS")
        .replace(/\bHtml\b/g, "HTML")
        .replace(/\bApi\b/g, "API");
}

function formatarArea(area) {
    return nomesDeAreas[area.toLowerCase()] || formatarTitulo(area);
}

function sincronizarBusca(valor) {
    if (campoTexto && campoTexto.value !== valor) campoTexto.value = valor;
    if (campoTextoNav && campoTextoNav.value !== valor) campoTextoNav.value = valor;

    // Dispara a busca em tempo real com Debounce (150ms)
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        if (valor.trim() === "") {
            divResultados.classList.add("escondido");
            const pastasContainer = document.getElementById("pastas-container");
            if (pastasContainer) pastasContainer.classList.remove("escondido");
        } else {
            buscar(valor);
        }
    }, 150);
}

if (campoTexto) {
    campoTexto.addEventListener("input", (e) => sincronizarBusca(e.target.value));
    campoTexto.addEventListener("keyup", (evento) => {
        if (evento.key === "Enter") {
            buscar(campoTexto.value);
        }
    });
}

if (campoTextoNav) {
    campoTextoNav.addEventListener("input", (e) => sincronizarBusca(e.target.value));
    campoTextoNav.addEventListener("keyup", (evento) => {
        if (evento.key === "Enter") {
            buscar(campoTextoNav.value);
        }
    });
}

if (botao) {
    botao.addEventListener("click", () => {
        const pesquise = campoTexto ? campoTexto.value : "";
        buscar(pesquise);
    });
}

function removerFrontmatter(md) {
    if (!md) return "";
    return md.replace(/^---[\s\S]*?---\s*/, "");
}

function normalizarListasObsidian(md) {
    if (!md) return "";
    const linhas = md.split("\n");
    let dentroDeBlocoDeCodigo = false;

    return linhas.map(linha => {
        const linhaTrim = linha.trim();
        if (linhaTrim.startsWith("```")) {
            dentroDeBlocoDeCodigo = !dentroDeBlocoDeCodigo;
            return linha;
        }

        if (dentroDeBlocoDeCodigo) {
            return linha;
        }

        const match = linha.match(/^(\s+)([\*\-\+]|\d+\.|\w)/);
        if (match) {
            const spaces = match[1].length;
            const rest = linha.substring(spaces);
            const targetSpaces = Math.ceil(spaces / 4) * 4;
            return " ".repeat(targetSpaces) + rest;
        }
        return linha;
    }).join("\n");
}

function converterHighlightsObsidian(md) {
    if (!md) return "";
    const partes = md.split(/(```[\s\S]*?```|`[^`\n]+`)/g);
    return partes.map((parte, index) => {
        if (index % 2 === 1) return parte;
        return parte.replace(/(?<![=a-zA-Z0-9])==([^\n\r=]+?)==(?![=>a-zA-Z0-9])/g, '<mark class="obsidian-highlight">$1</mark>');
    }).join("");
}

function protegerPipesObsidian(md) {
    if (!md) return "";
    const partes = md.split(/(```[\s\S]*?```|`[^`\n]+`)/g);
    return partes.map((parte, index) => {
        if (index % 2 === 1) return parte;
        return parte.replace(/\[\[([^\]]+)\]\]/g, (match, conteudoInterno) => {
            const protegido = conteudoInterno
                .replace(/\\?\|/g, "___OBSIDIAN_PIPE___")
                .replace(/_/g, "___OBSIDIAN_UNDERSCORE___");
            return "[[" + protegido + "]]";
        });
    }).join("");
}

function abrirArtigo(titulo, conteudoMarkdown, categoria = null, atualizarHash = true) {
    if (categoria) categoriaAtual = categoria;
    if (atualizarHash && categoriaAtual) atualizarRota(rotaDoArtigo(categoriaAtual, titulo));
    if (btnVoltar) btnVoltar.textContent = categoriaAtual ? `← voltar para ${formatarArea(categoriaAtual)}` : "← voltar para as áreas";
    divResultados.classList.add("escondido");
    leitorDeDisciplina.classList.add("escondido");
    const pastasContainer = document.getElementById("pastas-container");
    if (pastasContainer) pastasContainer.classList.add("escondido");

    artigoTitulo.textContent = formatarTitulo(titulo);
    renderizarBreadcrumbs();
    renderizarNavegacaoArtigo(titulo);
    processarContextoArtigo(conteudoMarkdown);
    
    // 1. Remove Frontmatter YAML
    const markdownLimpo = removerContextoDoCorpo(removerFrontmatter(conteudoMarkdown));

    // 2. Converte Highlights do Obsidian ==texto== fora de código
    const markdownComHighlight = converterHighlightsObsidian(markdownLimpo);

    // 3. Protege pipes em tabelas fora de código
    const markdownProtegido = protegerPipesObsidian(markdownComHighlight);

    // 4. Normaliza indentação de listas
    const markdownNormalizado = normalizarListasObsidian(markdownProtegido);

    // 5. Converte Markdown para HTML com marked
    if (typeof marked !== 'undefined') {
        artigoCorpo.innerHTML = marked.parse(markdownNormalizado);
    } else {
        artigoCorpo.innerText = markdownNormalizado;
    }

    // Mantém tabelas compactas quando cabem no artigo e permite rolagem
    // horizontal somente quando as colunas excedem a largura disponível.
    artigoCorpo.querySelectorAll("table").forEach(tabela => {
        const contenedor = document.createElement("div");
        contenedor.className = "tabela-rolavel";
        tabela.replaceWith(contenedor);
        contenedor.appendChild(tabela);
    });

    // 6. Processa WikiLinks do Obsidian com segurança em nós de texto
    processarLinksObsidian();

    // 7. Processa Callouts do Obsidian ([!NOTE], [!TIP], [!IMPORTANT], etc.)
    processarCalloutsObsidian();

    // 8. Formata Checkboxes interativas
    artigoCorpo.querySelectorAll('li input[type="checkbox"]').forEach(checkbox => {
        const li = checkbox.parentElement;
        if (li) {
            li.classList.add('task-list-item');
            const textNodes = Array.from(li.childNodes).filter(node => node !== checkbox);
            const wrapper = document.createElement('span');
            wrapper.className = 'task-item-content';
            textNodes.forEach(node => wrapper.appendChild(node));
            li.appendChild(wrapper);
        }
    });

    // 9. Formata blocos de código com linhas e numeração
    artigoCorpo.querySelectorAll("pre").forEach(pre => {
        const codeElement = pre.querySelector("code");
        if (!codeElement) return;

        if (codeElement.classList.contains("language-mermaid") || pre.classList.contains("language-mermaid")) {
            return;
        }

        const rawText = codeElement.textContent;
        const lines = rawText.split("\n");

        if (lines.length > 1 && lines[lines.length - 1].trim() === "") {
            lines.pop();
        }

        pre.innerHTML = "";
        lines.forEach((lineText, index) => {
            const lineDiv = document.createElement("div");
            lineDiv.className = "code-line";

            const numSpan = document.createElement("span");
            numSpan.className = "line-number";
            numSpan.textContent = index + 1;

            const codeSpan = document.createElement("code");
            if (codeElement.className) {
                codeSpan.className = codeElement.className;
            }
            codeSpan.textContent = lineText || " ";

            lineDiv.appendChild(numSpan);
            lineDiv.appendChild(codeSpan);
            pre.appendChild(lineDiv);
        });
    });

    // 10. Processa e renderiza diagramas Mermaid
    if (typeof mermaid !== 'undefined') {
        const blocosMermaid = artigoCorpo.querySelectorAll('pre code.language-mermaid, pre.language-mermaid');
        blocosMermaid.forEach((bloco) => {
            const containerPre = bloco.tagName.toLowerCase() === 'pre' ? bloco : bloco.parentElement;
            const codigoMermaid = bloco.textContent;
            const divMermaid = document.createElement('div');
            divMermaid.className = 'mermaid';
            divMermaid.dataset.mermaidSource = codigoMermaid;
            divMermaid.textContent = codigoMermaid;
            containerPre.replaceWith(divMermaid);
        });

        renderizarDiagramasMermaid();
    }

    // 11. Inclui cópia direta nos blocos de código.
    configurarCopiaDeCodigo();

    // 12. Gera a Table of Contents (TOC) com ScrollSpy
    gerarTableOfContents();

    leitorDeArtigo.classList.remove("escondido");

    // Scroll para o topo
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

function configurarCopiaDeCodigo() {
    artigoCorpo.querySelectorAll("pre").forEach(pre => {
        if (pre.querySelector(".btn-copiar-codigo")) return;

        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "btn-copiar-codigo";
        botao.textContent = "copiar";
        botao.setAttribute("aria-label", "Copiar código para a área de transferência");

        botao.addEventListener("click", async event => {
            event.stopPropagation();
            const codigo = Array.from(pre.querySelectorAll("code"))
                .map(item => item.textContent)
                .join("\n")
                .trim() || pre.textContent.trim();

            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(codigo);
                } else {
                    const campoTemporario = document.createElement("textarea");
                    campoTemporario.value = codigo;
                    campoTemporario.style.position = "fixed";
                    campoTemporario.style.opacity = "0";
                    document.body.appendChild(campoTemporario);
                    campoTemporario.select();
                    document.execCommand("copy");
                    campoTemporario.remove();
                }

                botao.textContent = "copiado";
                botao.classList.add("copiado");
                setTimeout(() => {
                    botao.textContent = "copiar";
                    botao.classList.remove("copiado");
                }, 1800);
            } catch (erro) {
                console.error("Falha ao copiar código:", erro);
                botao.textContent = "erro";
                setTimeout(() => { botao.textContent = "copiar"; }, 1800);
            }
        });

        pre.appendChild(botao);
    });
}

function removerContextoDoCorpo(markdown) {
    return markdown.replace(/^>\s*\*\*Contexto:\*\*\s*[^\n\r]+(?:\r?\n>[^\n\r]+)*(?:\r?\n){1,2}/m, "");
}

function processarContextoArtigo(markdown) {
    if (!artigoContexto) return;
    const match = markdown.match(/^>\s*\*\*Contexto:\*\*\s*([^\n\r]+(?:\n>[^\n\r]+)*)/m);
    if (!match?.[1]) {
        artigoContexto.innerHTML = "";
        artigoContexto.hidden = true;
        return;
    }

    const texto = match[1].replace(/\n>/g, " ").replace(/\*\*/g, "").trim();
    artigoContexto.innerHTML = `<p><strong>Contexto:</strong> ${texto}</p>`;
    artigoContexto.hidden = false;
}

function renderizarBreadcrumbs() {
    if (!artigoBreadcrumbs) return;
    const categoria = categoriaAtual || "áreas de estudo";
    artigoBreadcrumbs.innerHTML = `<button type="button" data-destino="home">início</button><span>/</span><button type="button" data-destino="categoria">${formatarArea(categoria)}</button>`;
    artigoBreadcrumbs.querySelector('[data-destino="home"]')?.addEventListener("click", voltarParaHome);
    artigoBreadcrumbs.querySelector('[data-destino="categoria"]')?.addEventListener("click", () => categoriaAtual ? abrirDisciplina(categoriaAtual) : voltarParaHome());
}

function renderizarNavegacaoArtigo(titulo) {
    if (!artigoNavCards) return;
    artigoNavCards.innerHTML = "";
    const artigos = (todasAsPastas[categoriaAtual] || []).slice().sort((a, b) => a.titulo.localeCompare(b.titulo, "pt-BR", { numeric: true }));
    const indice = artigos.findIndex(artigo => artigo.titulo === titulo);
    const grade = document.createElement("div");
    grade.className = "artigo-nav-cards-grid";

    [[artigos[indice - 1], "anterior"], [artigos[indice + 1], "proximo"]].forEach(([artigo, direcao]) => {
        if (!artigo) {
            grade.appendChild(document.createElement("span"));
            return;
        }
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = `nav-card nav-card-${direcao}`;
        botao.innerHTML = `<span class="nav-card-label">${direcao === "anterior" ? "← artigo anterior" : "próximo artigo →"}</span><strong class="nav-card-title"></strong>`;
        botao.querySelector(".nav-card-title").textContent = formatarTitulo(artigo.titulo);
        botao.addEventListener("click", () => abrirArtigo(artigo.titulo, artigo.conteudoTexto, categoriaAtual));
        grade.appendChild(botao);
    });

    artigoNavCards.appendChild(grade);
}

function gerarTableOfContents() {
    const tocNavDesktop = document.getElementById("toc-nav");
    const tocSidebar = document.getElementById("artigo-toc-sidebar");

    if (!tocNavDesktop) return;

    tocNavDesktop.innerHTML = "";

    const headings = artigoCorpo.querySelectorAll("h2");

    if (headings.length === 0) {
        if (tocSidebar) tocSidebar.style.display = "none";
        return;
    }

    if (tocSidebar) tocSidebar.style.display = "";

    const ulDesktop = document.createElement("ul");
    ulDesktop.className = "toc-list";

    headings.forEach((heading, index) => {
        if (!heading.id) {
            const slug = heading.textContent
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-") || `secao-${index}`;
            heading.id = slug;
        }

        const texto = heading.textContent.trim();

        const liDesktop = document.createElement("li");
        liDesktop.className = "toc-item";
        const aDesktop = document.createElement("a");
        aDesktop.href = `#${heading.id}`;
        aDesktop.textContent = texto;
        aDesktop.setAttribute("data-heading-id", heading.id);
        aDesktop.addEventListener("click", (e) => {
            e.preventDefault();
            scrollParaHeading(heading.id);
        });
        liDesktop.appendChild(aDesktop);
        ulDesktop.appendChild(liDesktop);
    });

    tocNavDesktop.appendChild(ulDesktop);
    configurarFiltroDoSumario(ulDesktop);
    iniciarScrollSpy();
}

function configurarFiltroDoSumario(lista) {
    const campo = document.getElementById("toc-filter-input");
    if (!campo) return;

    campo.value = "";
    campo.oninput = () => {
        const termo = campo.value.trim().toLocaleLowerCase("pt-BR");
        lista.querySelectorAll(".toc-item").forEach(item => {
            item.hidden = Boolean(termo) && !item.textContent.toLocaleLowerCase("pt-BR").includes(termo);
        });
    };
}

function scrollParaHeading(id) {
    const el = document.getElementById(id);
    if (!el) return;
    
    const stickyNavEl = document.getElementById("sticky-nav");
    const navOffset = stickyNavEl ? stickyNavEl.offsetHeight + 20 : 80;
    
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
}

let scrollSpyObserver = null;
function iniciarScrollSpy() {
    if (scrollSpyObserver) {
        scrollSpyObserver.disconnect();
    }

    const headings = artigoCorpo.querySelectorAll("h2");
    if (headings.length === 0) return;

    const callback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                document.querySelectorAll(".toc-nav a").forEach(link => {
                    if (link.getAttribute("data-heading-id") === id) {
                        link.classList.add("toc-active");
                    } else {
                        link.classList.remove("toc-active");
                    }
                });
            }
        });
    };

    scrollSpyObserver = new IntersectionObserver(callback, {
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0.1
    });

    headings.forEach(h => scrollSpyObserver.observe(h));
}

function processarLinksObsidian() {
    const walker = document.createTreeWalker(
        artigoCorpo,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                if (node.parentElement && (node.parentElement.closest('pre') || node.parentElement.closest('code') || node.parentElement.closest('.mermaid'))) {
                    return NodeFilter.FILTER_REJECT;
                }
                return node.nodeValue && node.nodeValue.includes('[[') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
            }
        }
    );

    const nodesToReplace = [];
    while (walker.nextNode()) {
        nodesToReplace.push(walker.currentNode);
    }

    const regexObsidian = /\[\[([^\n\]]+)\]\]/g;

    nodesToReplace.forEach(textNode => {
        const text = textNode.nodeValue;
        if (!text.match(regexObsidian)) return;

        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        let match;

        regexObsidian.lastIndex = 0;
        while ((match = regexObsidian.exec(text)) !== null) {
            if (match.index > lastIndex) {
                fragment.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));
            }

            const conteudo = match[1];
            let caminho = "";
            let textoExibicao = "";
            const conteudoLimpo = conteudo.replace(/___OBSIDIAN_UNDERSCORE___/g, "_");

            if (conteudoLimpo.includes("___OBSIDIAN_PIPE___")) {
                const partes = conteudoLimpo.split("___OBSIDIAN_PIPE___");
                caminho = partes[0].trim();
                textoExibicao = partes[1].trim();
            } else {
                caminho = conteudoLimpo.trim();
                textoExibicao = conteudoLimpo.trim();
            }

            const a = document.createElement("a");
            a.className = "obsidian-link";
            a.setAttribute("data-destino", caminho);
            a.textContent = textoExibicao;
            a.addEventListener("click", (e) => {
                e.preventDefault();
                navegarParaLinkObsidian(caminho);
            });
            fragment.appendChild(a);

            lastIndex = regexObsidian.lastIndex;
        }

        if (lastIndex < text.length) {
            fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
        }

        textNode.parentNode.replaceChild(fragment, textNode);
    });
}

function processarCalloutsObsidian() {
    const blockquotes = artigoCorpo.querySelectorAll('blockquote');
    blockquotes.forEach(bq => {
        const conteudo = bq.innerHTML;
        const match = conteudo.match(/\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:\s*([^\n<]+))?/i);
        if (match) {
            const tipo = match[1].toUpperCase();
            const tituloCustomizado = match[2] ? match[2].trim() : '';
            
            let htmlLimpo = conteudo.replace(/\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:\s*[^\n<]+)?/i, '');
            htmlLimpo = htmlLimpo.replace(/<p>\s*<\/p>/g, '');

            const rotulos = {
                'NOTE': 'NOTA',
                'TIP': 'DICA',
                'IMPORTANT': 'IMPORTANTE',
                'WARNING': 'AVISO',
                'CAUTION': 'ATENÇÃO'
            };

            const tituloExibicao = tituloCustomizado || rotulos[tipo] || tipo;

            const divCallout = document.createElement('div');
            divCallout.className = `obsidian-callout callout-${tipo.toLowerCase()}`;

            divCallout.innerHTML = `
                <div class="callout-header">
                    <span class="callout-title">${tituloExibicao}</span>
                </div>
                <div class="callout-content">
                    ${htmlLimpo}
                </div>
            `;

            bq.replaceWith(divCallout);
        }
    });
}

async function navegarParaLinkObsidian(nomeOuCaminho) {
    if (!nomeOuCaminho) return;

    const [caminhoSemHash, hashSecao] = nomeOuCaminho.split("#");

    const normalizar = (str) => decodeURIComponent(decodeURI(str))
        .replace(/^\.\//, "")
        .trim()
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\.md$/i, "")
        .replace(/[(),:;+]/g, " ")
        .replace(/#/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const limpo = normalizar(caminhoSemHash || nomeOuCaminho);
    const limpoApenasNome = limpo.split("/").pop();

    const arquivosComConteudo = await carregarTodosArquivosEmCache();

    const encontrado = arquivosComConteudo.find(a => {
        const caminhoSemExtensao = normalizar(a.path);
        const nomeArquivo = normalizar(a.path.split("/").pop());
        const tituloNorm = normalizar(a.titulo);

        return caminhoSemExtensao === limpo ||
               nomeArquivo === limpo ||
               nomeArquivo === limpoApenasNome ||
               tituloNorm === limpo ||
               tituloNorm === limpoApenasNome;
    }) || arquivosComConteudo.find(a => {
        const nomeArquivo = normalizar(a.path.split("/").pop());
        const tituloNorm = normalizar(a.titulo);
        return nomeArquivo.includes(limpoApenasNome) || limpoApenasNome.includes(nomeArquivo) || tituloNorm.includes(limpoApenasNome);
    });

    if (encontrado) {
        abrirArtigo(encontrado.titulo, encontrado.conteudoTexto, encontrado.categoria);
        if (hashSecao) {
            setTimeout(() => {
                const slug = hashSecao
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-");
                scrollParaHeading(slug);
            }, 100);
        }
    } else {
        alert(`A nota "${decodeURIComponent(nomeOuCaminho)}" não foi encontrada no Vault de programação.`);
    }
}

btnVoltar.addEventListener("click", () => {
    if (categoriaAtual) {
        abrirDisciplina(categoriaAtual);
        return;
    }
    voltarParaHome(true);
});

if (btnVoltarDisciplina) {
    btnVoltarDisciplina.addEventListener("click", () => {
        voltarParaHome(true);
    });
}

function destacarTexto(texto, termo) {
    if (!termo) return texto;
    const regex = new RegExp(`(${termo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return texto.replace(regex, '<mark class="highlight">$1</mark>');
}

function escaparHtml(texto) {
    const elemento = document.createElement("span");
    elemento.textContent = texto;
    return elemento.innerHTML;
}

function extrairTrechoRelevante(conteudo, termo) {
    const conteudoSemFrontmatter = removerFrontmatter(conteudo);
    const textoLimpo = conteudoSemFrontmatter.replace(/==/g, '').replace(/[#*`_~\[\]]/g, ' ');
    const pos = textoLimpo.toLowerCase().indexOf(termo.toLowerCase());
    
    if (pos === -1) {
        return textoLimpo.substring(0, 140).trim() + "...";
    }
    
    const inicio = Math.max(0, pos - 50);
    const fim = Math.min(textoLimpo.length, pos + termo.length + 80);
    let trecho = textoLimpo.substring(inicio, fim).trim();
    
    if (inicio > 0) trecho = "..." + trecho;
    if (fim < textoLimpo.length) trecho = trecho + "...";
    
    return trecho;
}

async function buscar(termo) {
    const termoLimpo = (termo || "").trim();
    
    leitorDeArtigo.classList.add("escondido");
    leitorDeDisciplina.classList.add("escondido");

    if (termoLimpo === "") {
        divResultados.classList.add("escondido");
        containerResultados.innerHTML = "";
        document.getElementById("explorar-pastas")?.classList.remove("escondido");
        return;
    }

    document.getElementById("explorar-pastas")?.classList.add("escondido");
    divResultados.classList.remove("escondido");

    if (termoLimpo.length < 2) {
        containerResultados.innerHTML = `<p class="mensagem-busca">digite ao menos <strong>duas letras</strong> para pesquisar nos tópicos e artigos.</p>`;
        return;
    }

    await carregarTodosArquivosEmCache();

    const termoLower = termoLimpo.toLowerCase();
    const filtrados = todosOsArtigos
        .filter(artigo => {
            const tituloMatch = artigo.titulo.toLowerCase().includes(termoLower);
            const conteudoMatch = (artigo.conteudoTexto || "").toLowerCase().includes(termoLower);
            return tituloMatch || conteudoMatch;
        })
        .sort((a, b) => {
            const prioridadeA = a.titulo.toLowerCase().includes(termoLower) ? 0 : 1;
            const prioridadeB = b.titulo.toLowerCase().includes(termoLower) ? 0 : 1;
            return prioridadeA - prioridadeB || a.titulo.localeCompare(b.titulo, "pt-BR", { numeric: true });
        });

    containerResultados.innerHTML = "";

    if (filtrados.length === 0) {
        containerResultados.innerHTML = `<p class="mensagem-busca">nenhum artigo ou tópico encontrado para <strong>“${escaparHtml(termoLimpo)}”</strong>.</p>`;
        return;
    }

    const resumoBusca = document.createElement("p");
    resumoBusca.className = "resumo-busca";
    resumoBusca.innerHTML = `${filtrados.length} ${filtrados.length === 1 ? "artigo encontrado" : "artigos encontrados"} para <strong>“${escaparHtml(termoLimpo)}”</strong>`;
    containerResultados.appendChild(resumoBusca);

    // Agrupa por categoria/área
    const grupos = {};
    filtrados.forEach(artigo => {
        const cat = artigo.categoria || "Geral";
        if (!grupos[cat]) grupos[cat] = [];
        grupos[cat].push(artigo);
    });

    Object.keys(grupos)
        .sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true }))
        .forEach(categoria => {
            const grupoDiv = document.createElement("div");
            grupoDiv.className = "busca-grupo-assunto";

            const tituloGrupo = document.createElement("h3");
            tituloGrupo.className = "busca-assunto-titulo";
            tituloGrupo.textContent = `${formatarArea(categoria)} • ${grupos[categoria].length} ${grupos[categoria].length === 1 ? "artigo" : "artigos"}`;
            grupoDiv.appendChild(tituloGrupo);

            const subLista = document.createElement("div");
            subLista.className = "resultados-lista";

            grupos[categoria].forEach((artigo, indice) => {
                const itemLink = document.createElement("a");
                itemLink.className = "resultado-item";
                itemLink.href = rotaDoArtigo(artigo.categoria, artigo.titulo);

                const numero = document.createElement("span");
                numero.className = "resultado-numero";
                numero.textContent = String(indice + 1).padStart(2, "0");

                const conteudo = document.createElement("span");
                conteudo.className = "resultado-conteudo";

                const titulo = document.createElement("strong");
                titulo.innerHTML = destacarTexto(formatarTitulo(artigo.titulo), termoLimpo);

                const trecho = document.createElement("span");
                trecho.className = "resultado-trecho";
                const textoTrecho = extrairTrechoRelevante(artigo.conteudoTexto, termoLimpo);
                trecho.innerHTML = destacarTexto(textoTrecho, termoLimpo);

                conteudo.appendChild(titulo);
                conteudo.appendChild(trecho);
                itemLink.appendChild(numero);
                itemLink.appendChild(conteudo);

                itemLink.addEventListener("click", (e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
                    e.preventDefault();
                    abrirArtigo(artigo.titulo, artigo.conteudoTexto, artigo.categoria);
                });

                subLista.appendChild(itemLink);
            });

            grupoDiv.appendChild(subLista);
            containerResultados.appendChild(grupoDiv);
        });
}

async function renderizarPastas() {
    const pastasContainer = document.getElementById("pastas-container");
    if (!pastasContainer) return;

    pastasContainer.innerHTML = "<span>Carregando áreas de estudo...</span>";

    await carregarTodosArquivosEmCache();
    
    pastasContainer.innerHTML = "";

    const categoriasOrdenadas = Object.keys(todasAsPastas).sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true }));

    categoriasOrdenadas.forEach((pasta, indice) => {
        const pastaItem = document.createElement("div");
        pastaItem.className = "pasta-item";

        const header = document.createElement("button");
        header.className = "pasta-header";
        header.type = "button";
        header.innerHTML = `
            <span class="pasta-numero">${String(indice + 1).padStart(2, "0")}</span>
            <span class="pasta-info">
                <span class="pasta-nome">${formatarArea(pasta)}</span>
                <span class="pasta-descricao">${descricoesDeAreas[pasta] || descricoesDeAreas[pasta.toLowerCase()] || "Artigos, anotações e referências desta área de estudo."}</span>
            </span>
            <span class="pasta-icone">→</span>
        `;
        pastaItem.appendChild(header);
        header.addEventListener("click", () => abrirDisciplina(pasta));

        pastasContainer.appendChild(pastaItem);
    });
}

function abrirDisciplina(categoria, atualizarHash = true) {
    const artigos = (todasAsPastas[categoria] || []).slice().sort((a, b) => a.titulo.localeCompare(b.titulo, "pt-BR", { numeric: true }));
    if (!artigos.length) return;

    categoriaAtual = categoria;
    if (atualizarHash) atualizarRota(rotaDaDisciplina(categoria));
    disciplinaTitulo.textContent = formatarArea(categoria);
    disciplinaAcoes.innerHTML = "";
    artigos.forEach((artigo, indice) => {
        const acao = document.createElement("button");
        acao.className = "disciplina-acao";
        acao.type = "button";
        acao.innerHTML = `<span class="disciplina-acao-numero">${String(indice + 1).padStart(2, "0")}</span><span>${formatarTitulo(artigo.titulo)}</span>`;
        acao.addEventListener("click", () => abrirArtigo(artigo.titulo, artigo.conteudoTexto, categoria));
        disciplinaAcoes.appendChild(acao);
    });

    document.getElementById("explorar-pastas")?.classList.add("escondido");
    divResultados.classList.add("escondido");
    leitorDeArtigo.classList.add("escondido");
    leitorDeDisciplina.classList.remove("escondido");
    window.scrollTo({ top: 0, behavior: "instant" });
}

function rotaDaDisciplina(categoria) {
    return `#/area/${encodeURIComponent(categoria)}`;
}

function rotaDoArtigo(categoria, titulo) {
    return `#/artigo/${encodeURIComponent(categoria)}/${encodeURIComponent(titulo)}`;
}

function atualizarRota(rota) {
    if (window.location.hash !== rota) history.pushState({}, "", rota);
}

function tratarRotaDaUrl() {
    const partes = window.location.hash.replace(/^#\//, "").split("/").filter(Boolean).map(parte => decodeURIComponent(parte));
    if (!partes.length) return voltarParaHome(false);

    if (partes[0] === "area" && partes[1] && todasAsPastas[partes[1]]) {
        abrirDisciplina(partes[1], false);
        return;
    }

    if (partes[0] === "artigo" && partes[1] && partes[2]) {
        const categoria = partes[1];
        const artigo = (todasAsPastas[categoria] || []).find(item => normalizarTexto(item.titulo) === normalizarTexto(partes[2]));
        if (artigo) abrirArtigo(artigo.titulo, artigo.conteudoTexto, categoria, false);
    }
}

// Configuração do Sticky Navbar baseada no scroll
const headerEl = document.querySelector("header");
const stickyNav = document.getElementById("sticky-nav");

window.addEventListener("scroll", () => {
    if (!headerEl || !stickyNav) return;
    const headerHeight = headerEl.offsetHeight;
    if (window.scrollY > headerHeight) {
        stickyNav.classList.add("visible");
    } else {
        stickyNav.classList.remove("visible");
    }
});

function voltarParaHome(atualizarHash = true) {
    leitorDeArtigo.classList.add("escondido");
    leitorDeDisciplina.classList.add("escondido");
    divResultados.classList.add("escondido");
    document.getElementById("explorar-pastas")?.classList.remove("escondido");
    const pastasContainer = document.getElementById("pastas-container");
    if (pastasContainer) {
        pastasContainer.classList.remove("escondido");
        // A busca oculta a grade; ao usar o breadcrumb "início", recriamos
        // a lista para garantir que a página inicial nunca fique vazia.
        void renderizarPastas();
    }
    if (campoTexto) campoTexto.value = "";
    if (campoTextoNav) campoTextoNav.value = "";
    containerResultados.innerHTML = "";
    categoriaAtual = null;
    if (atualizarHash && window.location.hash) history.pushState({}, "", window.location.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
}

if (btnVoltarDisciplina) btnVoltarDisciplina.addEventListener("click", () => voltarParaHome());

window.addEventListener("hashchange", tratarRotaDaUrl);

const navLogo = document.getElementById("nav-logo");
if (navLogo) {
    navLogo.addEventListener("click", voltarParaHome);
}

const mainTitle = document.querySelector("header h1");
if (mainTitle) {
    mainTitle.addEventListener("click", voltarParaHome);
}

const navLinkPastas = document.getElementById("nav-link-pastas");
if (navLinkPastas) {
    navLinkPastas.addEventListener("click", (e) => {
        e.preventDefault();
        leitorDeArtigo.classList.add("escondido");
        divResultados.classList.add("escondido");
        const pastasContainer = document.getElementById("pastas-container");
        if (pastasContainer) {
            pastasContainer.classList.remove("escondido");
            pastasContainer.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
}

// Inicializar tema, pré-carregamento imediato e renderização das pastas
inicializarTema();
carregarTodosArquivosEmCache().then(() => {
    renderizarPastas();
    tratarRotaDaUrl();
});
