// Função para buscar automaticamente todos os arquivos .md do seu GitHub (sem precisar de token)
async function obterListaDeArquivos() {
    try {
        const resposta = await fetch("https://api.github.com/repos/leorruas/programacao/git/trees/main?recursive=1");
        if (!resposta.ok) throw new Error("Erro na API do GitHub");

        const dados = await resposta.json();

        // Filtra apenas os arquivos Markdown (.md), ignorando pastas internas do Obsidian/Git
        return dados.tree
            .filter(item => item.path.endsWith(".md") && !item.path.includes(".obsidian") && !item.path.includes(".git") && !item.path.includes(".gemini") && item.path !== "me.md" && item.path !== "log.md")
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
            { titulo: "Guia de Estudos", path: "./javascript/Guia de Estudos.md" },
            { titulo: "Consumindo APIs e Fetch", path: "./javascript/Consumindo APIs e Fetch.md" },
            { titulo: "Pesquisa Semântica no Vault", path: "./javascript/Pesquisa Semântica no Vault.md" },
            { titulo: "01. Criando uma Busca Simples no DOM", path: "./javascript/01. Criando uma Busca Simples no DOM.md" },
            { titulo: "Console.log", path: "./javascript/01-fundamentos/Console.log.md" },
            { titulo: "Var, let e const", path: "./javascript/01-fundamentos/Var, let e const.md" },
            { titulo: "Tipos de dados", path: "./javascript/01-fundamentos/Tipos de dados.md" },
            { titulo: "Operadores e operações", path: "./javascript/01-fundamentos/Operadores e operações.md" },
            { titulo: "Condicionais (if-else)", path: "./javascript/01-fundamentos/Condicionais (if-else).md" },
            { titulo: "Switch", path: "./javascript/01-fundamentos/Switch.md" },
            { titulo: "Estruturas de repetição (for e while)", path: "./javascript/01-fundamentos/06-Estruturas de repetição (for e while).md" },
            { titulo: "Hoisting", path: "./javascript/01-fundamentos/Hoisting.md" },
            { titulo: "Debug (depuração)", path: "./javascript/01-fundamentos/Debug (depuração).md" },
            { titulo: "Truthy e falsy", path: "./javascript/01-fundamentos/Truthy e falsy.md" },
            { titulo: "Funções", path: "./javascript/02-funcoes-e-objetos/Funções.md" },
            { titulo: "Arrow functions", path: "./javascript/02-funcoes-e-objetos/Arrow functions.md" },
            { titulo: "Objetos", path: "./javascript/02-funcoes-e-objetos/Objetos.md" },
            { titulo: "Dot notation e propriedades", path: "./javascript/02-funcoes-e-objetos/Dot notation e propriedades.md" },
            { titulo: "Entendendo o this", path: "./javascript/02-funcoes-e-objetos/Entendendo o this.md" },
            { titulo: "Funções construtoras", path: "./javascript/02-funcoes-e-objetos/Funções construtoras.md" },
            { titulo: "Protótipos e proto", path: "./javascript/02-funcoes-e-objetos/Protótipos e proto.md" },
            { titulo: "Classes", path: "./javascript/02-funcoes-e-objetos/Classes.md" },
            { titulo: "Herança e objetos aninhados", path: "./javascript/02-funcoes-e-objetos/Herança e objetos aninhados.md" },
            { titulo: "Get e set", path: "./javascript/02-funcoes-e-objetos/Get e set.md" },
            { titulo: "Arrays e métodos de array", path: "./javascript/03-manipulacao/Arrays e métodos de array.md" },
            { titulo: "Métodos de array", path: "./javascript/03-manipulacao/Métodos de array.md" },
            { titulo: "O método forEach em detalhes", path: "./javascript/03-manipulacao/O método forEach em detalhes.md" },
            { titulo: "Propriedades e métodos de string", path: "./javascript/03-manipulacao/Propriedades e métodos de string.md" },
            { titulo: "Template strings", path: "./javascript/03-manipulacao/Template strings.md" },
            { titulo: "Math", path: "./javascript/03-manipulacao/Math.md" },
            { titulo: "JSON", path: "./javascript/03-manipulacao/JSON.md" },
            { titulo: "Regex", path: "./javascript/03-manipulacao/Regex.md" },
            { titulo: "DOM", path: "./javascript/04-dom-e-browser/DOM.md" },
            { titulo: "Métodos do objeto document", path: "./javascript/04-dom-e-browser/Métodos do objeto document.md" },
            { titulo: "Eventos", path: "./javascript/04-dom-e-browser/Eventos.md" },
            { titulo: "O objeto window", path: "./javascript/04-dom-e-browser/O objeto window.md" },
            { titulo: "O console do navegador", path: "./javascript/04-dom-e-browser/O console do navegador.md" },
            { titulo: "Local storage", path: "./javascript/04-dom-e-browser/Local storage.md" },
            { titulo: "Animações com scroll", path: "./javascript/04-dom-e-browser/Animações com scroll.md" },
            { titulo: "Callbacks", path: "./javascript/05-assincrono/Callbacks.md" },
            { titulo: "Fetch", path: "./javascript/05-assincrono/Fetch.md" },
            { titulo: "Async await", path: "./javascript/05-assincrono/Async await.md" },
            { titulo: "API", path: "./javascript/05-assincrono/API.md" },
            { titulo: "Escopo e closures", path: "./javascript/06-arquitetura-e-avancado/Escopo e closures.md" },
            { titulo: "Desestruturação e spread", path: "./javascript/06-arquitetura-e-avancado/Desestruturação e spread.md" },
            { titulo: "Módulos import e export", path: "./javascript/06-arquitetura-e-avancado/Módulos import e export.md" },
            { titulo: "Tratamento de erros", path: "./javascript/06-arquitetura-e-avancado/Tratamento de erros.md" },
            { titulo: "Programação orientada a objetos", path: "./javascript/06-arquitetura-e-avancado/13-Programação orientada a objetos.md" },
            { titulo: "Event loop e call stack", path: "./javascript/06-arquitetura-e-avancado/Event loop e call stack.md" },
            { titulo: "Node.js", path: "./javascript/06-arquitetura-e-avancado/Node.js.md" },
            { titulo: "TypeScript introdução", path: "./javascript/06-arquitetura-e-avancado/TypeScript introdução.md" },
            { titulo: "Ordem de Carregamento do DOM e Script", path: "./javascript/conceitos/Ordem de Carregamento do DOM e Script.md" },
            { titulo: "Introdução ao Python", path: "./python/Introdução ao Python.md" },
            { titulo: "Comparativo de sintaxe e tipos", path: "./python/01-fundamentos/Comparativo de sintaxe e tipos.md" },
            { titulo: "Introdução ao React", path: "./react/Introdução ao React.md" },
            { titulo: "Hooks principais - useState, useRef, useMemo", path: "./react/01-fundamentos/Hooks principais - useState, useRef, useMemo.md" },
            { titulo: "Bibliotecas de UI e estilização", path: "./react/01-fundamentos/Bibliotecas de UI e estilização.md" },
            { titulo: "Pacotes e ecossistema do React", path: "./react/01-fundamentos/Pacotes e ecossistema do React.md" },
            { titulo: "01. Criando uma Busca Simples no DOM", path: "./tutoriais/01. Criando uma Busca Simples no DOM.md" },
            { titulo: "Como Criar um Modal Leitor de Artigos", path: "./tutoriais/Como Criar um Modal Leitor de Artigos.md" },
            { titulo: "Como Substituir os Resultados pelo Artigo no Main", path: "./tutoriais/Como Substituir os Resultados pelo Artigo no Main.md" },
            { titulo: "Como Converter Markdown do Obsidian em HTML", path: "./javascript/03-manipulacao/Como Converter Markdown do Obsidian em HTML.md" },
            { titulo: "Posicionamento e Alinhamento no CSS", path: "./css/Posicionamento e Alinhamento no CSS.md" },
            { titulo: "Como Disparar a Busca com a Tecla Enter", path: "./tutoriais/Como Disparar a Busca com a Tecla Enter.md" },
            { titulo: "Marcadores de Lista e Glifos no CSS", path: "./css/Marcadores de Lista e Glifos no CSS.md" },
            { titulo: "Como Suportar WikiLinks do Obsidian", path: "./tutoriais/Como Suportar WikiLinks do Obsidian.md" },
            { titulo: "Decifrando Regex e Flags no JavaScript", path: "./javascript/03-manipulacao/Decifrando Regex e Flags no JavaScript.md" },
            { titulo: "Entendendo encodeURI e decodeURIComponent no JavaScript", path: "./javascript/03-manipulacao/Entendendo encodeURI e decodeURIComponent no JavaScript.md" },
            { titulo: "Como Renderizar Diagramas Mermaid no Web App", path: "./tutoriais/Como Renderizar Diagramas Mermaid no Web App.md" },
            { titulo: "Guia de tutoriais", path: "./tutoriais/Guia de tutoriais.md" },
            { titulo: "Introdução ao C#", path: "./csharp/01-Introdução ao C#.md" },
            { titulo: "Arrays em C#", path: "./csharp/07-Arrays em C#.md" },
            { titulo: "Segurança de Tipos", path: "./csharp/04-Segurança de tipos.md" },
            { titulo: "Variáveis, Operadores e Tipos de Dados", path: "./csharp/03-Variáveis, operadores e tipos de dados.md" },
            { titulo: "Estruturas Condicionais e de Repetição", path: "./csharp/05-Estruturas condicionais e de repetição.md" },
            { titulo: "Métodos (Funções)", path: "./csharp/12-Métodos (funções).md" },
            { titulo: "Programação Orientada a Objetos", path: "./csharp/13-Programação orientada a objetos.md" },
            { titulo: "O método Main", path: "./csharp/02-O método Main.md" },
            { titulo: "Estruturas de repetição (for e while)", path: "./csharp/06-Estruturas de repetição (for e while).md" },
            { titulo: "Métodos de arrays", path: "./csharp/08-Métodos de arrays.md" },
            { titulo: "Guia de estudos", path: "./csharp/00-Guia de estudos.md" },
            { titulo: "Coleções em C#", path: "./csharp/09-Coleções em C#.md" },
            { titulo: "Tipos abstratos de dados", path: "./csharp/10-Tipos abstratos de dados.md" },
            { titulo: "Lista, pilha e fila", path: "./csharp/11-Lista, pilha e fila.md" }
        ];
    }
}

const botao = document.querySelector("button");
const campoTexto = document.getElementById("main-search-input");
const campoTextoNav = document.getElementById("nav-search-input");
const containerResultados = document.querySelector(".cards-container");

function sincronizarBusca(valor) {
    if (campoTexto) campoTexto.value = valor;
    if (campoTextoNav) campoTextoNav.value = valor;
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

botao.addEventListener("click", () => {
    const pesquise = campoTexto ? campoTexto.value : "";
    buscar(pesquise);
});





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
        .replace(/\[\[(.*?)\|(.*?)\]\]/g, '<a class="obsidian-link" data-artigo="$1">$2</a>')
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
    // AND decodes the HTML entities (like &gt; or &lt;) so Mermaid can parse it correctly!
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

    // 4. Renderiza os diagramas Mermaid automaticamente com o tema rosa!
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
    leitorDeArtigo.classList.add("escondido");    // Esconde o leitor
    divResultados.classList.remove("escondido"); // Mostra os cards da busca de volta
    const pastasContainer = document.getElementById("pastas-container");
    if (pastasContainer) {
        const termo = campoTexto ? campoTexto.value.trim() : "";
        if (termo === "") {
            pastasContainer.classList.remove("escondido");
        } else {
            pastasContainer.classList.add("escondido");
        }
    }
});

async function buscar(termo) {
    const termoLimpo = termo.trim().toLowerCase();
    if (termoLimpo === "") return;
    divResultados.classList.remove("escondido");
    leitorDeArtigo.classList.add("escondido");
    const pastasContainer = document.getElementById("pastas-container");
    if (pastasContainer) pastasContainer.classList.add("escondido");

    containerResultados.innerHTML = `<h2>Buscando...</h2>`;

    const arquivos = await obterListaDeArquivos();
    let encontrouResultado = false;
    containerResultados.innerHTML = "";

    for (const arquivo of arquivos) {
        try {
            const resposta = await fetch(arquivo.path);
            const conteudoTexto = await resposta.text();
            const temNoTitulo = arquivo.titulo.toLowerCase().includes(termoLimpo);
            const temNoConteudo = conteudoTexto.toLowerCase().includes(termoLimpo);

            if (temNoTitulo || temNoConteudo) {
                encontrouResultado = true;
                const resumoBruto = conteudoTexto.substring(0, 250) + "...";
                const resumo = limparMarkdown(resumoBruto);
                // Criamos a div do card via JavaScript
                const pasta = obterPastaDoCaminho(arquivo.path);
                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `
        <span class="card-tag">${pasta}</span>
        <h2>${arquivo.titulo}</h2>
        <div class="conteudo">${resumo}</div>
    `;

                // Quando clicar no card, troca a visão para o artigo completo!
                card.addEventListener("click", () => {
                    abrirArtigo(arquivo.titulo, conteudoTexto);
                });

                containerResultados.appendChild(card);
            }
        } catch (erro) {
            console.error("Erro ao ler arquivo: ", arquivo.path, erro);
        }
    }

    if (!encontrouResultado) {
        containerResultados.innerHTML = `
            
                <h2>Nenhum resultado encontrado</h2>
                <p>Tente pesquisar por outra palavra.</p>
            
        `;
    }
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

    console.log("Buscando pela nota:", nomeLimpo);

    const arquivos = await obterListaDeArquivos();

    const arquivoEncontrado = arquivos.find(a => {
        const tLimpo = decodeURIComponent(a.titulo).toLowerCase().replace(".md", "").trim();
        const pLimpo = decodeURIComponent(a.path).toLowerCase().replace(".md", "").trim();
        return tLimpo === nomeLimpo ||
            pLimpo.endsWith("/" + nomeLimpo) ||
            pLimpo === nomeLimpo ||
            tLimpo.includes(nomeLimpo) ||
            nomeLimpo.includes(tLimpo);
    });

    if (arquivoEncontrado) {
        try {
            const resposta = await fetch(arquivoEncontrado.path);
            const conteudo = await resposta.text();
            abrirArtigo(arquivoEncontrado.titulo, conteudo);
        } catch (erro) {
            console.error("Erro ao carregar nota:", erro);
        }
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

async function mostrarTodosOsArtigos() {
    divResultados.classList.remove("escondido");
    leitorDeArtigo.classList.add("escondido");
    containerResultados.innerHTML = `<h2>Carregando todos os artigos...</h2>`;

    const arquivos = await obterListaDeArquivos();
    containerResultados.innerHTML = "";

    for (const arquivo of arquivos) {
        try {
            const resposta = await fetch(arquivo.path);
            const conteudoTexto = await resposta.text();
            
            const resumoBruto = conteudoTexto.substring(0, 250) + "...";
            const resumo = limparMarkdown(resumoBruto);
            
            const pasta = obterPastaDoCaminho(arquivo.path);
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <span class="card-tag">${pasta}</span>
                <h2>${arquivo.titulo}</h2>
                <div class="conteudo">${resumo}</div>
            `;

            card.addEventListener("click", () => {
                abrirArtigo(arquivo.titulo, conteudoTexto);
            });

            containerResultados.appendChild(card);
        } catch (erro) {
            console.error("Erro ao ler arquivo: ", arquivo.path, erro);
        }
    }
}

async function renderizarPastas() {
    const pastasContainer = document.getElementById("pastas-container");
    if (!pastasContainer) return;

    pastasContainer.innerHTML = "<span>Carregando pastas...</span>";

    const arquivos = await obterListaDeArquivos();
    
    // Agrupa os arquivos por pasta
    const pastasAgrupadas = {};
    arquivos.forEach(arquivo => {
        const pasta = obterPastaDoCaminho(arquivo.path);
        if (!pastasAgrupadas[pasta]) {
            pastasAgrupadas[pasta] = [];
        }
        pastasAgrupadas[pasta].push(arquivo);
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
        pastasAgrupadas[pasta].sort((a, b) => a.titulo.localeCompare(b.titulo)).forEach(arquivo => {
            const linkArtigo = document.createElement("a");
            linkArtigo.className = "artigo-lista-link";
            linkArtigo.textContent = arquivo.titulo.toLowerCase();
            
            linkArtigo.addEventListener("click", async (e) => {
                e.preventDefault();
                e.stopPropagation(); // Evita que feche o accordion no clique do link
                try {
                    const resposta = await fetch(arquivo.path);
                    const conteudoTexto = await resposta.text();
                    abrirArtigo(arquivo.titulo, conteudoTexto);
                } catch (erro) {
                    console.error("Erro ao carregar artigo:", erro);
                }
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
    divResultados.classList.remove("escondido");
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
        divResultados.classList.remove("escondido");
        const pastasContainer = document.getElementById("pastas-container");
        if (pastasContainer) {
            pastasContainer.classList.remove("escondido");
            pastasContainer.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
}

// Inicializar na carga da página
renderizarPastas();

