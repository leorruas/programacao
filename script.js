// Cache global para armazenar os conteúdos dos arquivos em memória
let cacheArquivos = null;
let debounceTimer = null;

// Função para buscar automaticamente todos os arquivos .md do seu GitHub (sem precisar de token)
async function obterListaDeArquivos() {
    try {
        const resposta = await fetch("https://api.github.com/repos/leorruas/programacao/git/trees/main?recursive=1");
        if (!resposta.ok) throw new Error("Erro na API do GitHub");

        const dados = await resposta.json();

        // Filtra apenas os arquivos Markdown (.md), ignorando pastas internas do Obsidian/Git
        return dados.tree
            .filter(item => item.path.endsWith(".md") && !item.path.includes(".obsidian") && !item.path.includes(".git") && !item.path.includes(".gemini") && !item.path.includes(".agents") && item.path !== "me.md" && item.path !== "log.md")
            .map(item => {
                const nomeSemExtensao = item.path.split("/").pop().replace(".md", "");
                return {
                    titulo: nomeSemExtensao,
                    path: encodeURI(`./${item.path}`) // Usa encodeURI para preservar barras de subpastas
                };
            });
    } catch (erro) {
        console.warn("Não foi possível listar via GitHub, usando lista padrão completa:", erro);
        // Fallback local completo com todos os arquivos do vault
        return [
            { titulo: "Atalhos VS Code", path: "./Atalhos VS Code.md" },
            { titulo: "Evolução da Programação", path: "./Evolução da Programação.md" },
            { titulo: "Guia de CSS", path: "./css/Guia de CSS.md" },
            { titulo: "Flexbox", path: "./css/Flexbox.md" },
            { titulo: "Transições e Animações", path: "./css/Transições e Animações.md" },
            { titulo: "Pseudo-classes e Pseudo-elementos", path: "./css/Pseudo-classes e Pseudo-elementos.md" },
            { titulo: "Introdução ao Git", path: "./git/Introdução ao Git.md" },
            { titulo: "Git", path: "./git/01-fundamentos/Git.md" },
            { titulo: "Integrando a API do GitHub", path: "./git/01-fundamentos/Integrando a API do GitHub.md" },
            { titulo: "Introdução ao JavaScript", path: "./javascript/Introdução ao JavaScript.md" },
            { titulo: "Guia de Estudos", path: "./javascript/00-Guia de Estudos.md" },
            { titulo: "Consumindo APIs e Fetch", path: "./javascript/Consumindo APIs e Fetch.md" },
            { titulo: "Pesquisa Semântica no Vault", path: "./javascript/Pesquisa Semântica no Vault.md" },
            { titulo: "01. Criando uma Busca Simples no DOM", path: "./javascript/01. Criando uma Busca Simples no DOM.md" },
            { titulo: "Console.log", path: "./javascript/01-fundamentos/02-Console.log.md" },
            { titulo: "Var, let e const", path: "./javascript/01-fundamentos/01-Var, let e const.md" },
            { titulo: "Tipos de dados", path: "./javascript/01-fundamentos/03-Tipos de dados.md" },
            { titulo: "Operadores e operações", path: "./javascript/01-fundamentos/04-Operadores e operações.md" },
            { titulo: "Condicionais (if-else)", path: "./javascript/01-fundamentos/05-Condicionais (if-else).md" },
            { titulo: "Switch", path: "./javascript/01-fundamentos/06-Switch.md" },
            { titulo: "Estruturas de repetição (for e while)", path: "./javascript/01-fundamentos/09-Estruturas de repetição (for e while).md" },
            { titulo: "Hoisting", path: "./javascript/01-fundamentos/08-Hoisting.md" },
            { titulo: "Debug (depuração)", path: "./javascript/01-fundamentos/10-Debug (depuração).md" },
            { titulo: "Truthy e falsy", path: "./javascript/01-fundamentos/07-Truthy e falsy.md" },
            { titulo: "Funções", path: "./javascript/02-funcoes-e-objetos/01-Funções.md" },
            { titulo: "Arrow functions", path: "./javascript/02-funcoes-e-objetos/02-Arrow functions.md" },
            { titulo: "Objetos", path: "./javascript/02-funcoes-e-objetos/03-Objetos.md" },
            { titulo: "Dot notation e propriedades", path: "./javascript/02-funcoes-e-objetos/04-Dot notation e propriedades.md" },
            { titulo: "Entendendo o this", path: "./javascript/02-funcoes-e-objetos/05-Entendendo o this.md" },
            { titulo: "Funções construtoras", path: "./javascript/02-funcoes-e-objetos/06-Funções construtoras.md" },
            { titulo: "Protótipos e proto", path: "./javascript/02-funcoes-e-objetos/07-Protótipos e proto.md" },
            { titulo: "Classes", path: "./javascript/02-funcoes-e-objetos/09-Classes.md" },
            { titulo: "Herança e objetos aninhados", path: "./javascript/02-funcoes-e-objetos/08-Herança e objetos aninhados.md" },
            { titulo: "Get e set", path: "./javascript/02-funcoes-e-objetos/10-Get e set.md" },
            { titulo: "Arrays e métodos de array", path: "./javascript/03-manipulacao/02-Arrays e métodos de array.md" },
            { titulo: "Métodos de array", path: "./javascript/03-manipulacao/03-Métodos de array.md" },
            { titulo: "O método forEach em detalhes", path: "./javascript/03-manipulacao/04-O método forEach em detalhes.md" },
            { titulo: "Propriedades e métodos de string", path: "./javascript/03-manipulacao/05-Propriedades e métodos de string.md" },
            { titulo: "Template strings", path: "./javascript/03-manipulacao/01-Template strings.md" },
            { titulo: "Math", path: "./javascript/03-manipulacao/06-Math.md" },
            { titulo: "JSON", path: "./javascript/03-manipulacao/08-JSON.md" },
            { titulo: "Regex", path: "./javascript/03-manipulacao/07-Regex.md" },
            { titulo: "DOM", path: "./javascript/04-dom-e-browser/01-DOM.md" },
            { titulo: "Métodos do objeto document", path: "./javascript/04-dom-e-browser/02-Métodos do objeto document.md" },
            { titulo: "Eventos", path: "./javascript/04-dom-e-browser/04-Eventos.md" },
            { titulo: "O objeto window", path: "./javascript/04-dom-e-browser/03-O objeto window.md" },
            { titulo: "O console do navegador", path: "./javascript/04-dom-e-browser/05-O console do navegador.md" },
            { titulo: "Local storage", path: "./javascript/04-dom-e-browser/07-Local storage.md" },
            { titulo: "Animações com scroll", path: "./javascript/04-dom-e-browser/06-Animações com scroll.md" },
            { titulo: "Callbacks", path: "./javascript/05-assincrono/01-Callbacks.md" },
            { titulo: "Fetch", path: "./javascript/05-assincrono/03-Fetch.md" },
            { titulo: "Async await", path: "./javascript/05-assincrono/04-Async await.md" },
            { titulo: "API", path: "./javascript/05-assincrono/02-API.md" },
            { titulo: "Escopo e closures", path: "./javascript/06-arquitetura-e-avancado/03-Escopo e closures.md" },
            { titulo: "Desestruturação e spread", path: "./javascript/06-arquitetura-e-avancado/04-Desestruturação e spread.md" },
            { titulo: "Módulos import e export", path: "./javascript/06-arquitetura-e-avancado/05-Módulos import e export.md" },
            { titulo: "Tratamento de erros", path: "./javascript/06-arquitetura-e-avancado/06-Tratamento de erros.md" },
            { titulo: "Programação orientada a objetos", path: "./javascript/06-arquitetura-e-avancado/01-Programação orientada a objetos.md" },
            { titulo: "Event loop e call stack", path: "./javascript/06-arquitetura-e-avancado/07-Event loop e call stack.md" },
            { titulo: "Node.js", path: "./javascript/06-arquitetura-e-avancado/02-Node.js.md" },
            { titulo: "TypeScript introdução", path: "./javascript/06-arquitetura-e-avancado/08-TypeScript introdução.md" },
            { titulo: "Ordem de Carregamento do DOM e Script", path: "./javascript/conceitos/Ordem de Carregamento do DOM e Script.md" },
            { titulo: "Introdução ao Python", path: "./python/Introdução ao Python.md" },
            { titulo: "Comparativo de sintaxe e tipos", path: "./python/01-fundamentos/Comparativo de sintaxe e tipos.md" },
            { titulo: "Introdução ao React", path: "./react/Introdução ao React.md" },
            { titulo: "Hooks principais - useState, useRef, useMemo", path: "./react/01-fundamentos/Hooks principais - useState, useRef, useMemo.md" },
            { titulo: "Bibliotecas de UI e estilização", path: "./react/01-fundamentos/Bibliotecas de UI e estilização.md" },
            { titulo: "Pacotes e ecossistema do React", path: "./react/01-fundamentos/Pacotes e ecossistema do React.md" },
            { titulo: "[JavaScript] • 01. Criando uma Busca Simples no DOM", path: "./tutoriais/%5BJavaScript%5D%20%E2%80%A2%2001.%20Criando%20uma%20Busca%20Simples%20no%20DOM.md" },
            { titulo: "[JavaScript] • Como Criar um Modal Leitor de Artigos", path: "./tutoriais/%5BJavaScript%5D%20%E2%80%A2%20Como%20Criar%20um%20Modal%20Leitor%20de%20Artigos.md" },
            { titulo: "[JavaScript] • Como Substituir os Resultados pelo Artigo no Main", path: "./tutoriais/%5BJavaScript%5D%20%E2%80%A2%20Como%20Substituir%20os%20Resultados%20pelo%20Artigo%20no%20Main.md" },
            { titulo: "Como Converter Markdown do Obsidian em HTML", path: "./javascript/03-manipulacao/09-Como converter markdown do obsidian em html.md" },
            { titulo: "Posicionamento e Alinhamento no CSS", path: "./css/Posicionamento e Alinhamento no CSS.md" },
            { titulo: "[JavaScript] • Como Disparar a Busca com a Tecla Enter", path: "./tutoriais/%5BJavaScript%5D%20%E2%80%A2%20Como%20Disparar%20a%20Busca%20com%20a%20Tecla%20Enter.md" },
            { titulo: "Marcadores de Lista e Glifos no CSS", path: "./css/Marcadores de Lista e Glifos no CSS.md" },
            { titulo: "Como Suportar WikiLinks do Obsidian", path: "./tutoriais/Como Suportar WikiLinks do Obsidian.md" },
            { titulo: "Decifrando Regex e Flags no JavaScript", path: "./javascript/03-manipulacao/Decifrando Regex e Flags no JavaScript.md" },
            { titulo: "Entendendo encodeURI e decodeURIComponent no JavaScript", path: "./javascript/03-manipulacao/Entendendo encodeURI e decodeURIComponent no JavaScript.md" },
            { titulo: "Como Renderizar Diagramas Mermaid no Web App", path: "./tutoriais/Como Renderizar Diagramas Mermaid no Web App.md" },
            { titulo: "Guia de tutoriais", path: "./tutoriais/Guia de tutoriais.md" },
            { titulo: "[Csharp] • Como Usar ArrayList, For e Foreach para Calcular Médias", path: "./tutoriais/%5BCsharp%5D%20%E2%80%A2%20Como%20Usar%20ArrayList%2C%20For%20e%20Foreach%20para%20Calcular%20M%C3%A9dias.md" },
            { titulo: "[Csharp] • Projeto 1 - O Assistente de Terminal", path: "./tutoriais/%5BCsharp%5D%20%E2%80%A2%20Projeto%201%20-%20O%20Assistente%20de%20Terminal.md" },
            { titulo: "[Csharp] • Projeto 2 - O Jogo de Adivinhação", path: "./tutoriais/%5BCsharp%5D%20%E2%80%A2%20Projeto%202%20-%20O%20Jogo%20de%20Adivinha%C3%A7%C3%A3o.md" },
            { titulo: "[Csharp] • Projeto 3 - O Gerenciador de Tarefas", path: "./tutoriais/%5BCsharp%5D%20%E2%80%A2%20Projeto%203%20-%20O%20Gerenciador%20de%20Tarefas.md" },
            { titulo: "[Csharp] • Projeto 4 - O Simulador de Conta Bancária", path: "./tutoriais/%5BCsharp%5D%20%E2%80%A2%20Projeto%204%20-%20O%20Simulador%20de%20Conta%20Banc%C3%A1ria.md" },
            { titulo: "[Csharp] • Projeto 5 - O Diário Digital", path: "./tutoriais/%5BCsharp%5D%20%E2%80%A2%20Projeto%205%20-%20O%20Di%C3%A1rio%20Digital.md" },
            { titulo: "00. Guia de estudos", path: "./csharp/00-Guia de estudos.md" },
            { titulo: "01. Introdução ao Csharp", path: "./csharp/01-Introdução ao Csharp.md" },
            { titulo: "02. O método Main", path: "./csharp/02-O método Main.md" },
            { titulo: "03. Console.Write e Console.WriteLine", path: "./csharp/03-Console.Write e Console.WriteLine.md" },
            { titulo: "04. Variáveis, operadores e tipos de dados", path: "./csharp/04-Variáveis, operadores e tipos de dados.md" },
            { titulo: "05. Segurança de tipos", path: "./csharp/05-Segurança de tipos.md" },
            { titulo: "06. Métodos de string (ToUpper e ToLower)", path: "./csharp/06-Métodos de string (ToUpper e ToLower).md" },
            { titulo: "07. Estruturas condicionais e de repetição", path: "./csharp/07-Estruturas condicionais e de repetição.md" },
            { titulo: "08. O switch em Csharp", path: "./csharp/08-O switch em Csharp.md" },
            { titulo: "09. Estruturas de repetição (for e while)", path: "./csharp/09-Estruturas de repetição (for e while).md" },
            { titulo: "10. O loop do-while em Csharp", path: "./csharp/10-O loop do-while em Csharp.md" },
            { titulo: "11. O loop foreach em Csharp", path: "./csharp/11-O loop foreach em Csharp.md" },
            { titulo: "12. Arrays em Csharp", path: "./csharp/12-Arrays em Csharp.md" },
            { titulo: "13. Métodos de arrays", path: "./csharp/13-Métodos de arrays.md" },
            { titulo: "14. Coleções em Csharp", path: "./csharp/14-Coleções em Csharp.md" },
            { titulo: "15. Capacity em coleções", path: "./csharp/15-Capacity em coleções.md" },
            { titulo: "16. Tipos abstratos de dados", path: "./csharp/16-Tipos abstratos de dados.md" },
            { titulo: "17. Lista, pilha e fila", path: "./csharp/17-Lista, pilha e fila.md" },
            { titulo: "18. Métodos (funções)", path: "./csharp/18-Métodos (funções).md" },
            { titulo: "19. Programação orientada a objetos", path: "./csharp/19-Programação orientada a objetos.md" },
            { titulo: "20. Herança e interfaces", path: "./csharp/20-Herança e interfaces.md" },
            { titulo: "21. Tratamento de erros", path: "./csharp/21-Tratamento de erros.md" },
            { titulo: "22. Manipulação de arquivos", path: "./csharp/22-Manipulação de arquivos.md" },
            { titulo: "23. LINQ buscas e filtros", path: "./csharp/23-LINQ buscas e filtros.md" },
            { titulo: "24. Csharp no Frontend e Backend", path: "./csharp/24-Csharp no Frontend e Backend.md" },
            { titulo: "25. Consumindo APIs em Csharp", path: "./csharp/25-Consumindo APIs em Csharp.md" },
            { titulo: "26. Como conectar Csharp no HTML (Backend + Frontend JS)", path: "./csharp/26-Como conectar Csharp no HTML (Backend + Frontend JS).md" },
            { titulo: "Introdução ao Mermaid", path: "./mermaid/Introdução ao Mermaid.md" },
            { titulo: "Sintaxe e possibilidades com Mermaid", path: "./mermaid/Sintaxe e possibilidades com Mermaid.md" }
        ];
    }
}

// Carrega todos os arquivos em paralelo e guarda na memória (cache)
async function carregarTodosArquivosEmCache() {
    if (cacheArquivos) return cacheArquivos;
    
    const lista = await obterListaDeArquivos();
    
    // Baixa todos os arquivos concorrentemente usando Promise.all
    cacheArquivos = await Promise.all(
        lista.map(async (arquivo) => {
            try {
                const resposta = await fetch(arquivo.path);
                const conteudoTexto = await resposta.text();
                return {
                    arquivo,
                    conteudoTexto
                };
            } catch (erro) {
                console.error("Erro ao pré-carregar arquivo:", arquivo.path, erro);
                return {
                    arquivo,
                    conteudoTexto: ""
                };
            }
        })
    );

    return cacheArquivos;
}

const botao = document.querySelector("button");
const campoTexto = document.getElementById("main-search-input");
const campoTextoNav = document.getElementById("nav-search-input");
const containerResultados = document.querySelector(".cards-container");

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

const divResultados = document.querySelector(".resultados");
const leitorDeArtigo = document.getElementById("leitor-artigo");
const artigoTitulo = document.getElementById("artigo-titulo");
const artigoCorpo = document.getElementById("artigo-corpo");
const btnVoltar = document.getElementById("btn-voltar");

function decodificarEntidadesHTML(str) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
}

function processarWikiLinksObsidian(markdown) {
    return markdown
        .replace(/\[\[(.*?)(?:\||&#124;)(.*?)\]\]/g, '<a class="obsidian-link" data-artigo="$1">$2</a>')
        .replace(/\[\[(.*?)\]\]/g, '<a class="obsidian-link" data-artigo="$1">$1</a>');
}

// Remove os símbolos do Markdown e transforma em texto corrido
function limparMarkdown(texto) {
    return texto
        .replace(/```[\s\S]*?```/g, "")       // Remove blocos de código inteiros
        .replace(/^#+\s+/gm, "")              // Remove os # dos títulos
        .replace(/(\*\*|__|\*|_)(.*?)\1/g, "$2") // Remove **negrito** e *itálico*
        .replace(/`([^`]+)`/g, "$1")          // Remove código em linha ` `
        .replace(/^\>\s+/gm, "")              // Remove citações >
        .replace(/\[(.*?)\]\((.*?)\)/g, "$1")  // Mantém só o texto dos links
        .replace(/\n+/g, " ")                 // Troca quebras de linha por espaços (texto corrido!)
        .trim();
}

// Configuração do Mermaid.js para combinar com a identidade visual (Dark / Rosa)
if (window.mermaid) {
    mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
            darkMode: true,
            background: '#0d0d0d',
            primaryColor: '#ffb6c1',
            primaryTextColor: '#ffffff',
            primaryBorderColor: '#ffb6c1',
            lineColor: '#ffb6c1',
            secondaryColor: '#1a1a1a',
            tertiaryColor: '#222222'
        }
    });
}

function abrirArtigo(titulo, conteudo) {
    artigoTitulo.textContent = titulo;

    // 1. Transforma o Markdown em HTML
    const htmlGerado = marked.parse(conteudo);

    // 2. Converte os blocos de código ```mermaid em <div class="mermaid">
    const htmlComMermaid = htmlGerado.replace(
        /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
        (match, codigoMermaid) => {
            const codigoLimpo = decodificarEntidadesHTML(codigoMermaid);
            return `<div class="mermaid">${codigoLimpo}</div>`;
        }
    );

    // 3. Transforma os [[WikiLinks]] do Obsidian
    artigoCorpo.innerHTML = processarWikiLinksObsidian(htmlComMermaid);

    // 3.5. Formata os blocos de código com quebra de linha e numeração
    artigoCorpo.querySelectorAll("pre").forEach(pre => {
        const codeElement = pre.querySelector("code");
        if (!codeElement) return;

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

    // 4. Renderiza os diagramas Mermaid
    if (window.mermaid) {
        setTimeout(() => {
            try {
                mermaid.run({ nodes: document.querySelectorAll('.mermaid') });
            } catch (e) {
                console.warn("Erro ao renderizar diagrama Mermaid:", e);
            }
        }, 50);
    }

    divResultados.classList.add("escondido");
    const pastasContainer = document.getElementById("pastas-container");
    if (pastasContainer) pastasContainer.classList.add("escondido");
    leitorDeArtigo.classList.remove("escondido");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

btnVoltar.addEventListener("click", () => {
    leitorDeArtigo.classList.add("escondido");
    divResultados.classList.remove("escondido");
    const pastasContainer = document.getElementById("pastas-container");
    if (pastasContainer) {
        const termo = campoTexto ? campoTexto.value.trim() : "";
        if (termo === "") {
            pastasContainer.classList.remove("escondido");
            divResultados.classList.add("escondido");
        } else {
            pastasContainer.classList.add("escondido");
        }
    }
});

function normalizarTexto(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function calcularScore(titulo, conteudo, termo) {
    const tituloNorm = normalizarTexto(titulo);
    const conteudoNorm = normalizarTexto(conteudo);
    const termoNorm = normalizarTexto(termo);

    if (termoNorm === "") return 0;

    let score = 0;

    // 1. Termo exato no título (maior relevância)
    if (tituloNorm === termoNorm) {
        score += 150;
    } else if (tituloNorm.includes(termoNorm)) {
        score += 80;
    }

    // 2. Termo exato no conteúdo
    if (conteudoNorm.includes(termoNorm)) {
        score += 40;
        const regexTermo = new RegExp(escapeRegExp(termoNorm), "g");
        const matchesTermo = conteudoNorm.match(regexTermo);
        if (matchesTermo) {
            score += matchesTermo.length * 10;
        }
    }

    // 3. Palavras individuais do termo de busca (busca parcial)
    const palavras = termoNorm.split(/\s+/).filter(p => p.length > 1);
    palavras.forEach(palavra => {
        if (tituloNorm.includes(palavra)) {
            score += 25;
        }
        if (conteudoNorm.includes(palavra)) {
            const regexPalavra = new RegExp(escapeRegExp(palavra), "g");
            const matchesPalavra = conteudoNorm.match(regexPalavra);
            if (matchesPalavra) {
                score += matchesPalavra.length * 2;
            }
        }
    });

    return score;
}

async function buscar(termo) {
    const termoLimpo = termo.trim();
    if (termoLimpo === "") {
        divResultados.classList.add("escondido");
        const pastasContainer = document.getElementById("pastas-container");
        if (pastasContainer) pastasContainer.classList.remove("escondido");
        return;
    }
    
    divResultados.classList.remove("escondido");
    leitorDeArtigo.classList.add("escondido");
    const pastasContainer = document.getElementById("pastas-container");
    if (pastasContainer) pastasContainer.classList.add("escondido");

    // Usa os dados já em cache (Instantâneo!)
    const arquivosComConteudo = await carregarTodosArquivosEmCache();
    const resultados = [];

    for (const item of arquivosComConteudo) {
        const score = calcularScore(item.arquivo.titulo, item.conteudoTexto, termoLimpo);
        if (score > 0) {
            resultados.push({
                arquivo: item.arquivo,
                conteudoTexto: item.conteudoTexto,
                score
            });
        }
    }

    if (resultados.length === 0) {
        containerResultados.innerHTML = `
            <h2>Nenhum resultado encontrado</h2>
            <p>Tente pesquisar por outra palavra.</p>
        `;
        return;
    }

    // Ordena os resultados pelo score de forma decrescente (Ranking)
    resultados.sort((a, b) => b.score - a.score);

    // Agrupa por assunto (pasta)
    const grupos = {};
    resultados.forEach(item => {
        const pasta = obterPastaDoCaminho(item.arquivo.path);
        if (!grupos[pasta]) {
            grupos[pasta] = {
                nome: pasta,
                maxScore: 0,
                itens: []
            };
        }
        grupos[pasta].itens.push(item);
        if (item.score > grupos[pasta].maxScore) {
            grupos[pasta].maxScore = item.score;
        }
    });

    // Ordena os grupos pelo maior score de seus itens
    const gruposOrdenados = Object.values(grupos).sort((a, b) => b.maxScore - a.maxScore);

    // Renderiza os resultados agrupados
    containerResultados.innerHTML = "";
    gruposOrdenados.forEach(grupo => {
        const grupoDiv = document.createElement("div");
        grupoDiv.className = "busca-grupo-assunto";

        const grupoTitulo = document.createElement("h3");
        grupoTitulo.className = "busca-assunto-titulo";
        grupoTitulo.textContent = `${grupo.nome} (${grupo.itens.length})`;
        grupoDiv.appendChild(grupoTitulo);

        const cardsContainer = document.createElement("div");
        cardsContainer.className = "cards-container";

        grupo.itens.forEach(item => {
            const resumoBruto = item.conteudoTexto.substring(0, 250) + "...";
            const resumo = limparMarkdown(resumoBruto);
            const pasta = obterPastaDoCaminho(item.arquivo.path);
            
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <span class="card-tag">${pasta}</span>
                <h2>${item.arquivo.titulo}</h2>
                <div class="conteudo">${resumo}</div>
            `;

            card.addEventListener("click", () => {
                abrirArtigo(item.arquivo.titulo, item.conteudoTexto);
            });

            cardsContainer.appendChild(card);
        });

        grupoDiv.appendChild(cardsContainer);
        containerResultados.appendChild(grupoDiv);
    });
}

artigoCorpo.addEventListener("click", async (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    e.preventDefault();

    let alvo = link.getAttribute("data-artigo") || link.getAttribute("href");
    if (!alvo) return;

    if (alvo.startsWith("http://") || alvo.startsWith("https://")) {
        window.open(alvo, "_blank");
        return;
    }

    const alvoDecodificado = decodeURIComponent(alvo);
    const nomeLimpo = alvoDecodificado.split("/").pop().replace(".md", "").toLowerCase().trim();

    const arquivosComConteudo = await carregarTodosArquivosEmCache();

    const itemEncontrado = arquivosComConteudo.find(item => {
        const tLimpo = decodeURIComponent(item.arquivo.titulo).toLowerCase().replace(".md", "").trim();
        const pLimpo = decodeURIComponent(item.arquivo.path).toLowerCase().replace(".md", "").trim();
        return tLimpo === nomeLimpo ||
            pLimpo.endsWith("/" + nomeLimpo) ||
            pLimpo === nomeLimpo ||
            tLimpo.includes(nomeLimpo) ||
            nomeLimpo.includes(tLimpo);
    });

    if (itemEncontrado) {
        abrirArtigo(itemEncontrado.arquivo.titulo, itemEncontrado.conteudoTexto);
    } else {
        alert(`A nota "${alvoDecodificado}" não foi encontrada no Vault de notas.`);
    }
});

// Funções para listar e filtrar pastas no Index
function obterPastaDoCaminho(caminho) {
    let limpo = caminho.replace(/^\.\//, "");
    const partes = limpo.split("/");
    if (partes.length > 1) {
        return partes[0];
    }
    return "geral";
}

async function renderizarPastas() {
    const pastasContainer = document.getElementById("pastas-container");
    if (!pastasContainer) return;

    pastasContainer.innerHTML = "<span>Carregando pastas...</span>";

    const arquivosComConteudo = await carregarTodosArquivosEmCache();
    
    // Agrupa os arquivos por pasta
    const pastasAgrupadas = {};
    arquivosComConteudo.forEach(item => {
        const pasta = obterPastaDoCaminho(item.arquivo.path);
        if (!pastasAgrupadas[pasta]) {
            pastasAgrupadas[pasta] = [];
        }
        pastasAgrupadas[pasta].push(item);
    });

    pastasContainer.innerHTML = "";

    // Para cada pasta, cria o item do Accordion
    Object.keys(pastasAgrupadas).sort().forEach(pasta => {
        const pastaItem = document.createElement("div");
        pastaItem.className = "pasta-item";

        const header = document.createElement("div");
        header.className = "pasta-header";
        header.innerHTML = `
            <span class="pasta-nome">${pasta}</span>
            <span class="pasta-icone">&plus;</span>
        `;

        const conteudo = document.createElement("div");
        conteudo.className = "pasta-conteudo";

        // Ordena os artigos pelo título e renderiza
        pastasAgrupadas[pasta].sort((a, b) => a.arquivo.titulo.localeCompare(b.arquivo.titulo)).forEach(item => {
            const linkArtigo = document.createElement("a");
            linkArtigo.className = "artigo-lista-link";
            linkArtigo.textContent = item.arquivo.titulo.toLowerCase();
            
            linkArtigo.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                abrirArtigo(item.arquivo.titulo, item.conteudoTexto);
            });
            
            conteudo.appendChild(linkArtigo);
        });

        pastaItem.appendChild(header);
        pastaItem.appendChild(conteudo);

        // Evento de clique para abrir/fechar o accordion
        header.addEventListener("click", () => {
            const jaAberta = pastaItem.classList.contains("aberta");
            
            // Fecha todos os outros accordions
            document.querySelectorAll(".pasta-item").forEach(item => {
                item.classList.remove("aberta");
            });

            // Se não estava aberta, abre esta
            if (!jaAberta) {
                pastaItem.classList.add("aberta");
            }
        });

        pastasContainer.appendChild(pastaItem);
    });
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

function voltarParaHome() {
    leitorDeArtigo.classList.add("escondido");
    divResultados.classList.add("escondido");
    const pastasContainer = document.getElementById("pastas-container");
    if (pastasContainer) {
        pastasContainer.classList.remove("escondido");
    }
    if (campoTexto) campoTexto.value = "";
    if (campoTextoNav) campoTextoNav.value = "";
    containerResultados.innerHTML = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Logo da nav e título principal clicam e retornam à página inicial
const navLogo = document.getElementById("nav-logo");
if (navLogo) {
    navLogo.addEventListener("click", voltarParaHome);
}

const mainTitle = document.querySelector("header h1");
if (mainTitle) {
    mainTitle.addEventListener("click", voltarParaHome);
}

// Link de pastas na nav retorna para a tela inicial e foca nas pastas
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

// Inicializar pré-carregamento imediato e renderização das pastas
carregarTodosArquivosEmCache().then(() => {
    renderizarPastas();
});


