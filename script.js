// Cache global para armazenar os conteúdos dos arquivos em memória
let cacheArquivos = null;
let debounceTimer = null;
let todosOsArtigos = [];
let todasAsPastas = {};
let categoriaAtual = null;

// Função para buscar automaticamente todos os arquivos .md do seu GitHub (sem precisar de token)
async function obterListaDeArquivos() {
    try {
        const resposta = await fetch("https://api.github.com/repos/leorruas/programacao/git/trees/main?recursive=1");
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
            { titulo: "Guia de CSS", path: "./css/Guia%20de%20CSS.md" },
            { titulo: "Flexbox", path: "./css/Flexbox.md" },
            { titulo: "Transições e Animações", path: "./css/Transi%C3%A7%C3%B5es%20e%20Anima%C3%A7%C3%B5es.md" },
            { titulo: "Pseudo-classes e Pseudo-elementos", path: "./css/Pseudo-classes%20e%20Pseudo-elementos.md" },
            { titulo: "Introdução ao Git", path: "./git/Introdu%C3%A7%C3%A3o%20ao%20Git.md" },
            { titulo: "Git", path: "./git/01-fundamentos/Git.md" },
            { titulo: "Integrando a API do GitHub", path: "./git/01-fundamentos/Integrando%20a%20API%20do%20GitHub.md" },
            { titulo: "Introdução ao JavaScript", path: "./javascript/Introdu%C3%A7%C3%A3o%20ao%20JavaScript.md" },
            { titulo: "Guia de Estudos", path: "./javascript/00-Guia%20de%20Estudos.md" },
            { titulo: "Consumindo APIs e Fetch", path: "./javascript/Consumindo%20APIs%20e%20Fetch.md" },
            { titulo: "Pesquisa Semântica no Vault", path: "./javascript/Pesquisa%20Sem%C3%A2ntica%20no%20Vault.md" },
            { titulo: "01. Criando uma Busca Simples no DOM", path: "./javascript/01.%20Criando%20uma%20Busca%20Simples%20no%20DOM.md" },
            { titulo: "Console.log", path: "./javascript/01-fundamentos/02-Console.log.md" },
            { titulo: "Var, let e const", path: "./javascript/01-fundamentos/01-Var%2C%20let%20e%20const.md" },
            { titulo: "Tipos de dados", path: "./javascript/01-fundamentos/03-Tipos%20de%20dados.md" },
            { titulo: "Operadores e operações", path: "./javascript/01-fundamentos/04-Operadores%20e%20opera%C3%A7%C3%B5es.md" },
            { titulo: "Condicionais (if-else)", path: "./javascript/01-fundamentos/05-Condicionais%20%28if-else%29.md" },
            { titulo: "Switch", path: "./javascript/01-fundamentos/06-Switch.md" },
            { titulo: "Estruturas de repetição (for e while)", path: "./javascript/01-fundamentos/09-Estruturas%20de%20repeti%C3%A7%C3%A3o%20%28for%20e%20while%29.md" },
            { titulo: "Hoisting", path: "./javascript/01-fundamentos/08-Hoisting.md" },
            { titulo: "Debug (depuração)", path: "./javascript/01-fundamentos/10-Debug%20%28depura%C3%A7%C3%A3o%29.md" },
            { titulo: "Truthy e falsy", path: "./javascript/01-fundamentos/07-Truthy%20e%20falsy.md" },
            { titulo: "Funções", path: "./javascript/02-funcoes-e-objetos/01-Fun%C3%A7%C3%B5es.md" },
            { titulo: "Arrow functions", path: "./javascript/02-funcoes-e-objetos/02-Arrow%20functions.md" },
            { titulo: "Objetos", path: "./javascript/02-funcoes-e-objetos/03-Objetos.md" },
            { titulo: "Dot notation e propriedades", path: "./javascript/02-funcoes-e-objetos/04-Dot%20notation%20e%20propriedades.md" },
            { titulo: "Entendendo o this", path: "./javascript/02-funcoes-e-objetos/05-Entendendo%20o%20this.md" },
            { titulo: "Funções construtoras", path: "./javascript/02-funcoes-e-objetos/06-Fun%C3%A7%C3%B5es%20construtoras.md" },
            { titulo: "Protótipos e proto", path: "./javascript/02-funcoes-e-objetos/07-Prot%C3%B3tipos%20e%20proto.md" },
            { titulo: "Classes", path: "./javascript/02-funcoes-e-objetos/09-Classes.md" },
            { titulo: "Herança e objetos aninhados", path: "./javascript/02-funcoes-e-objetos/08-Heran%C3%A7a%20e%20objetos%20aninhados.md" },
            { titulo: "Get e set", path: "./javascript/02-funcoes-e-objetos/10-Get%20e%20set.md" },
            { titulo: "Manipulando o DOM", path: "./javascript/04-dom/01-Manipulando%20o%20DOM.md" },
            { titulo: "Seleção de elementos", path: "./javascript/04-dom/02-Sele%C3%A7%C3%A3o%20de%20elementos.md" },
            { titulo: "Criando e inserindo elementos", path: "./javascript/04-dom/03-Criando%20e%20inserindo%20elementos.md" },
            { titulo: "Eventos e event listeners", path: "./javascript/04-dom/04-Eventos%20e%20event%20listeners.md" },
            { titulo: "Event bubbling e delegation", path: "./javascript/04-dom/05-Event%20bubbling%20e%20delegation.md" },
            { titulo: "Manipulação de classes e estilos", path: "./javascript/04-dom/06-Manipula%C3%A7%C3%A3o%20de%20classes%20e%20estilos.md" },
            { titulo: "Formulários e validação", path: "./javascript/04-dom/07-Formul%C3%A1rios%20e%20valida%C3%A7%C3%A3o.md" },
            { titulo: "LocalStorage e SessionStorage", path: "./javascript/04-dom/08-LocalStorage%20e%20SessionStorage.md" },
            { titulo: "Animações com JS", path: "./javascript/04-dom/09-Anima%C3%A7%C3%B5es%20com%20JS.md" },
            { titulo: "Projeto Lista de Tarefas", path: "./javascript/04-dom/10-Projeto%20Lista%20de%20Tarefas.md" },
            { titulo: "01. Introdução ao Csharp", path: "./csharp/01-Introdu%C3%A7%C3%A3o%20ao%20Csharp.md" },
            { titulo: "02. Variáveis e tipos de dados", path: "./csharp/02-Vari%C3%A1veis%20e%20tipos%20de%20dados.md" },
            { titulo: "03. Operadores e expressões", path: "./csharp/03-Operadores%20e%20express%C3%B5es.md" },
            { titulo: "04. Entrada e saída de dados", path: "./csharp/04-Entrada%20e%20sa%C3%ADda%20de%20dados.md" },
            { titulo: "05. Console.Write e Console.WriteLine", path: "./csharp/05-Console.Write%20e%20Console.WriteLine.md" },
            { titulo: "06. Casting e conversões de tipos", path: "./csharp/06-Casting%20e%20convers%C3%B5es%20de%20tipos.md" },
            { titulo: "07. Estruturas condicionais e de repetição", path: "./csharp/07-Estruturas%20condicionais%20e%20de%20repeti%C3%A7%C3%A3o.md" },
            { titulo: "08. O switch em Csharp", path: "./csharp/08-O%20switch%20em%20Csharp.md" },
            { titulo: "09. Estruturas de repetição (for e while)", path: "./csharp/09-Estruturas%20de%20repeti%C3%A7%C3%A3o%20%28for%20e%20while%29.md" },
            { titulo: "10. O loop do-while em Csharp", path: "./csharp/10-O%20loop%20do-while%20em%20Csharp.md" },
            { titulo: "11. O loop foreach em Csharp", path: "./csharp/11-O%20loop%20foreach%20em%20Csharp.md" },
            { titulo: "12. Arrays em Csharp", path: "./csharp/12-Arrays%20em%20Csharp.md" },
            { titulo: "13. Métodos de arrays", path: "./csharp/13-M%C3%A9todos%20de%20arrays.md" },
            { titulo: "14. Coleções em Csharp", path: "./csharp/14-Cole%C3%A7%C3%B5es%20em%20Csharp.md" },
            { titulo: "15. Capacity em coleções", path: "./csharp/15-Capacity%20em%20cole%C3%A7%C3%B5es.md" },
            { titulo: "16. Tipos abstratos de dados", path: "./csharp/16-Tipos%20abstratos%20de%20dados.md" },
            { titulo: "17. Lista, pilha e fila", path: "./csharp/17-Lista%2C%20pilha%20e%20fila.md" },
            { titulo: "18. Métodos (funções)", path: "./csharp/18-M%C3%A9todos%20%28fun%C3%A7%C3%B5es%29.md" },
            { titulo: "19. Programação orientada a objetos", path: "./csharp/19-Programa%C3%A7%C3%A3o%20orientada%20a%20objetos.md" },
            { titulo: "20. Herança e interfaces", path: "./csharp/20-Heran%C3%A7a%20e%20interfaces.md" },
            { titulo: "21. Tratamento de erros", path: "./csharp/21-Tratamento%20de%20erros.md" },
            { titulo: "22. Manipulação de arquivos", path: "./csharp/22-Manipula%C3%A7%C3%A3o%20de%20arquivos.md" },
            { titulo: "23. LINQ buscas e filtros", path: "./csharp/23-LINQ%20buscas%20e%20filtros.md" },
            { titulo: "24. Csharp no Frontend e Backend", path: "./csharp/24-Csharp%20no%20Frontend%20e%20Backend.md" },
            { titulo: "25. Consumindo APIs em Csharp", path: "./csharp/25-Consumindo%20APIs%20em%20Csharp.md" },
            { titulo: "26. Como conectar Csharp no HTML (Backend + Frontend JS)", path: "./csharp/26-Como%20conectar%20Csharp%20no%20HTML%20%28Backend%20%2B%20Frontend%20JS%29.md" },
            { titulo: "Introdução ao Mermaid", path: "./mermaid/Introdu%C3%A7%C3%A3o%20ao%20Mermaid.md" },
            { titulo: "Sintaxe e possibilidades com Mermaid", path: "./mermaid/Sintaxe%20e%20possibilidades%20com%20Mermaid.md" },
            { titulo: "DNS e gerenciamento de domínios", path: "./web/01-fundamentos/DNS%20e%20gerenciamento%20de%20dom%C3%ADnios.md" }
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
                return {
                    arquivo,
                    titulo: arquivo.titulo,
                    conteudo: "",
                    conteudoTexto: "",
                    path: arquivo.path,
                    categoria: "geral"
                };
            }
        })
    );

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

// Configuração do Mermaid.js para combinar com a identidade visual (Dark / Rosa)
if (window.mermaid) {
    mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        fontFamily: 'Archivo, sans-serif',
        themeVariables: {
            fontFamily: 'Archivo, sans-serif',
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

const botao = document.getElementById("btn-pesquisar");
const campoTexto = document.getElementById("main-search-input");
const campoTextoNav = document.getElementById("nav-search-input");
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

function protegerPipesObsidian(md) {
    if (!md) return "";
    return md.replace(/\[\[([^\]]+)\]\]/g, (match, conteudoInterno) => {
        const protegido = conteudoInterno.replace(/\\?\|/g, "___OBSIDIAN_PIPE___");
        return "[[" + protegido + "]]";
    });
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

    // 2. Converte Highlights do Obsidian ==texto== para <mark class="obsidian-highlight">
    const markdownComHighlight = markdownLimpo.replace(/==([^=]+)==/g, '<mark class="obsidian-highlight">$1</mark>');

    // 3. Protege pipes em tabelas
    const markdownProtegido = protegerPipesObsidian(markdownComHighlight);

    // 4. Normaliza indentação de listas
    const markdownNormalizado = normalizarListasObsidian(markdownProtegido);

    // 5. Converte Markdown para HTML com marked
    if (typeof marked !== 'undefined') {
        artigoCorpo.innerHTML = marked.parse(markdownNormalizado);
    } else {
        artigoCorpo.innerText = markdownNormalizado;
    }

    // 6. Processa WikiLinks do Obsidian
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
            divMermaid.textContent = codigoMermaid;
            containerPre.replaceWith(divMermaid);
        });

        setTimeout(() => {
            try {
                mermaid.run({ nodes: artigoCorpo.querySelectorAll('.mermaid') });
            } catch (err) {
                console.warn("Erro ao renderizar Mermaid:", err);
            }
        }, 50);
    }

    // 11. Gera a Table of Contents (TOC) com ScrollSpy
    gerarTableOfContents();

    leitorDeArtigo.classList.remove("escondido");

    // Scroll para o topo
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
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
    [[artigos[indice - 1], "← anterior"], [artigos[indice + 1], "próximo →"]].forEach(([artigo, rotulo]) => {
        if (!artigo) return;
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "nav-card";
        botao.innerHTML = `<span>${rotulo}</span><strong>${formatarTitulo(artigo.titulo)}</strong>`;
        botao.addEventListener("click", () => abrirArtigo(artigo.titulo, artigo.conteudoTexto, categoriaAtual));
        artigoNavCards.appendChild(botao);
    });
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
    const htmlAtual = artigoCorpo.innerHTML;
    const regexObsidian = /\[\[([^\n\]]+)\]\]/g;

    artigoCorpo.innerHTML = htmlAtual.replace(regexObsidian, (match, conteudo) => {
        let caminho = "";
        let textoExibicao = "";

        if (conteudo.includes("___OBSIDIAN_PIPE___")) {
            const partes = conteudo.split("___OBSIDIAN_PIPE___");
            caminho = partes[0].trim();
            textoExibicao = partes[1].trim();
        } else {
            caminho = conteudo.trim();
            textoExibicao = conteudo.trim();
        }

        return `<a class="obsidian-link" data-destino="${caminho}">${textoExibicao}</a>`;
    });

    artigoCorpo.querySelectorAll(".obsidian-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const destino = link.getAttribute("data-destino");
            navegarParaLinkObsidian(destino);
        });
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

    if (tituloNorm === termoNorm) {
        score += 150;
    } else if (tituloNorm.includes(termoNorm)) {
        score += 80;
    }

    if (conteudoNorm.includes(termoNorm)) {
        score += 40;
        const regexTermo = new RegExp(escapeRegExp(termoNorm), "g");
        const matchesTermo = conteudoNorm.match(regexTermo);
        if (matchesTermo) {
            score += matchesTermo.length * 10;
        }
    }

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

function limparMarkdown(texto) {
    return texto
        .replace(/```[\s\S]*?```/g, "")
        .replace(/^#+\s+/gm, "")
        .replace(/(\*\*|__|\*|_)(.*?)\1/g, "$2")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/^\>\s+/gm, "")
        .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
        .replace(/\[\[(.*?)(?:\||&#124;)?(.*?)\]\]/g, "$2")
        .replace(/\n+/g, " ")
        .trim();
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

    const arquivosComConteudo = await carregarTodosArquivosEmCache();
    const resultados = [];

    for (const item of arquivosComConteudo) {
        const score = calcularScore(item.titulo, item.conteudoTexto, termoLimpo);
        if (score > 0) {
            resultados.push({
                arquivo: item.arquivo,
                titulo: item.titulo,
                conteudoTexto: item.conteudoTexto,
                path: item.path,
                categoria: item.categoria,
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

    resultados.sort((a, b) => b.score - a.score);

    const grupos = {};
    resultados.forEach(item => {
        const pasta = item.categoria || "Geral";
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

    const gruposOrdenados = Object.values(grupos).sort((a, b) => b.maxScore - a.maxScore);

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
            
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <span class="card-tag">${item.categoria}</span>
                <h2>${item.titulo}</h2>
                <div class="conteudo">${resumo}</div>
            `;

            card.addEventListener("click", () => {
                abrirArtigo(item.titulo, item.conteudoTexto, item.categoria);
            });

            cardsContainer.appendChild(card);
        });

        grupoDiv.appendChild(cardsContainer);
        containerResultados.appendChild(grupoDiv);
    });
}

async function renderizarPastas() {
    const pastasContainer = document.getElementById("pastas-container");
    if (!pastasContainer) return;

    pastasContainer.innerHTML = "<span>Carregando pastas...</span>";

    const arquivosComConteudo = await carregarTodosArquivosEmCache();
    
    const pastasAgrupadas = {};
    arquivosComConteudo.forEach(item => {
        const pasta = item.categoria || "Geral";
        if (!pastasAgrupadas[pasta]) {
            pastasAgrupadas[pasta] = [];
        }
        pastasAgrupadas[pasta].push(item);
    });

    pastasContainer.innerHTML = "";

    Object.keys(pastasAgrupadas).sort().forEach((pasta, indice) => {
        const pastaItem = document.createElement("div");
        pastaItem.className = "pasta-item";

        const header = document.createElement("button");
        header.className = "pasta-header";
        header.type = "button";
        header.innerHTML = `
            <span class="pasta-numero">${String(indice + 1).padStart(2, "0")}</span>
            <span class="pasta-nome">${formatarArea(pasta)}</span>
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

// Inicializar pré-carregamento imediato e renderização das pastas
carregarTodosArquivosEmCache().then(() => {
    renderizarPastas();
    tratarRotaDaUrl();
});
