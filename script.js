// script.js - Coordenador Principal da Aplicação
import { informacoesAreas, obterListaDeArquivos } from "./js/vault.js";
import { renderizarDiagramasMermaid } from "./js/mermaid.js?v=estrutura-v26";

// Cache global para armazenar os conteúdos dos arquivos em memória
let cacheArquivos = null;
let debounceTimer = null;
let todosOsArtigos = [];
let todasAsPastas = {};
let categoriaAtual = null;

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
                if (!resposta.ok) return null;
                const conteudoTexto = await resposta.text();
                const categoria = extrairCategoria(arquivo.path);

                const itemProcessado = {
                    arquivo,
                    titulo: arquivo.titulo,
                    conteudo: conteudoTexto,
                    conteudoTexto,
                    path: arquivo.path,
                    sourcePath: arquivo.sourcePath || arquivo.path,
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
        if (artigoCorpo) renderizarDiagramasMermaid(artigoCorpo);
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
    llm: "LLMs",
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
    llm: "Grandes modelos de linguagem, Transformers, embeddings, engenharia de prompt e integrações de IA.",
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

function processarLaTeXSetas(md) {
    if (!md) return "";
    return md
        .replace(/\$\s*\\rightarrow\s*\$/gi, "→")
        .replace(/\$\s*\\to\s*\$/gi, "→")
        .replace(/\$\s*\\leftarrow\s*\$/gi, "←")
        .replace(/\$\s*\\leftrightarrow\s*\$/gi, "↔")
        .replace(/\$\s*\\Rightarrow\s*\$/gi, "⇒")
        .replace(/\$\s*\\Leftarrow\s*\$/gi, "⇐")
        .replace(/\$\s*\\Leftrightarrow\s*\$/gi, "⇔")
        .replace(/\\rightarrow(?![a-zA-Z])/gi, "→")
        .replace(/\\leftarrow(?![a-zA-Z])/gi, "←")
        .replace(/\\leftrightarrow(?![a-zA-Z])/gi, "↔");
}

function configurarZoomImagens() {
    if (!artigoCorpo) return;
    const imagens = artigoCorpo.querySelectorAll("img");
    imagens.forEach(img => {
        img.addEventListener("click", () => {
            const modalExistente = document.querySelector(".imagem-modal");
            if (modalExistente) modalExistente.remove();

            const modal = document.createElement("div");
            modal.className = "imagem-modal";
            modal.innerHTML = `
                <button class="imagem-modal-fechar" aria-label="Fechar">&times;</button>
                <img src="${img.src}" alt="${img.alt || 'Imagem ampliada'}">
            `;

            modal.addEventListener("click", (e) => {
                if (e.target === modal || e.target.classList.contains("imagem-modal-fechar")) {
                    modal.remove();
                }
            });

            document.body.appendChild(modal);
        });
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

    // 2. Converte Highlights do Obsidian ==texto== fora de código
    const markdownComHighlight = converterHighlightsObsidian(markdownLimpo);

    // 3. Protege pipes em tabelas fora de código
    const markdownProtegido = protegerPipesObsidian(markdownComHighlight);

    // 4. Processa setas LaTeX fora de código
    const markdownComSetas = processarLaTeXSetas(markdownProtegido);

    // 5. Normaliza indentação de listas
    const markdownNormalizado = normalizarListasObsidian(markdownComSetas);

    // 6. Converte Markdown para HTML com marked
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

    // 7. Processa WikiLinks do Obsidian com segurança em nós de texto
    processarLinksObsidian();

    // 8. Processa Callouts do Obsidian ([!NOTE], [!TIP], [!IMPORTANT], etc.)
    processarCalloutsObsidian();

    // 9. Formata Checkboxes interativas
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

    // 10. Formata blocos de código com linhas e numeração
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

    // 11. Processa e renderiza diagramas Mermaid via pipeline modular com explorador
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

        setTimeout(() => renderizarDiagramasMermaid(artigoCorpo), 40);
    }

    // 12. Renderização matemática com KaTeX se disponível
    if (typeof renderMathInElement !== 'undefined') {
        try {
            renderMathInElement(artigoCorpo, {
                delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '$', right: '$', display: false },
                    { left: '\\(', right: '\\)', display: false },
                    { left: '\\[', right: '\\]', display: true }
                ],
                throwOnError: false,
                ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
            });
        } catch (eMath) {
            console.warn("Erro ao renderizar KaTeX:", eMath);
        }
    }

    // 13. Inclui cópia direta nos blocos de código
    configurarCopiaDeCodigo();

    // 14. Configura Lightbox interativo de imagens
    configurarZoomImagens();

    // 15. Gera a Table of Contents (TOC) com ScrollSpy
    gerarTableOfContents();

    leitorDeArtigo.classList.remove("escondido");

    // Scroll imediato para o topo exato
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
        const info = informacoesAreas[pasta] || informacoesAreas[pasta.toLowerCase()] || {
            numero: String(indice + 1).padStart(2, "0"),
            nome: formatarArea(pasta),
            descricao: descricoesDeAreas[pasta] || descricoesDeAreas[pasta.toLowerCase()] || "Artigos, anotações e referências desta área de estudo."
        };

        const pastaItem = document.createElement("div");
        pastaItem.className = "pasta-item";

        const header = document.createElement("button");
        header.className = "pasta-header";
        header.type = "button";
        header.innerHTML = `
            <span class="pasta-numero">${info.numero}</span>
            <span class="pasta-info">
                <span class="pasta-nome">${formatarArea(pasta)}</span>
                <span class="pasta-descricao">${info.descricao}</span>
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
