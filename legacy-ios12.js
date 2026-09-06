(function () {
    "use strict";

    var AREAS = {
        "Geral": "Geral",
        "csharp": "C#",
        "css": "CSS",
        "git": "Git",
        "javascript": "JavaScript",
        "llm": "LLMs",
        "mermaid": "Mermaid",
        "python": "Python",
        "react": "React",
        "tutoriais": "Tutoriais",
        "web": "Web"
    };

    var artigos = [];
    var artigosPorArea = {};
    var areaAtual = null;

    var explorar = document.getElementById("explorar-pastas");
    var pastas = document.getElementById("pastas-container");
    var resultados = document.getElementById("resultados");
    var cards = document.getElementById("cards-container");
    var leitorDisciplina = document.getElementById("disciplina-leitor");
    var disciplinaTitulo = document.getElementById("disciplina-titulo");
    var disciplinaAcoes = document.getElementById("disciplina-acoes");
    var leitorArtigo = document.getElementById("leitor-artigo");
    var artigoTitulo = document.getElementById("artigo-titulo");
    var artigoCorpo = document.getElementById("artigo-corpo");
    var breadcrumbs = document.getElementById("artigo-breadcrumbs");
    var btnVoltar = document.getElementById("btn-voltar");
    var btnVoltarDisciplina = document.getElementById("btn-voltar-disciplina");
    var buscaMain = document.getElementById("main-search-input");
    var buscaNav = document.getElementById("nav-search-input");
    var temaBtn = document.getElementById("theme-toggle");
    var navLogo = document.getElementById("nav-logo");
    var masthead = document.getElementById("page-masthead");

    document.documentElement.className += " legacy-ios12";

    function textoArea(area) {
        return AREAS[area] || area;
    }

    function limparTitulo(titulo) {
        return String(titulo || "").replace(/^\d+[.\-_\s]+/, "");
    }

    function extrairArea(path) {
        var limpo = decodeURIComponent(String(path || "")).replace(/^\.\//, "");
        var partes = limpo.split("/");
        return partes.length > 1 ? partes[0] : "Geral";
    }

    function mostrar(elemento) {
        if (elemento) elemento.classList.remove("escondido");
    }

    function esconder(elemento) {
        if (elemento) elemento.classList.add("escondido");
    }

    function rolarTopo() {
        window.scrollTo(0, 0);
    }

    function temaSeguro() {
        var salvo = null;
        try { salvo = localStorage.getItem("tema-programacao"); } catch (e) {}
        var claro = false;
        try {
            claro = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
        } catch (e2) {}
        aplicarTema(salvo || (claro ? "light" : "dark"), false);
    }

    function aplicarTema(tema, persistir) {
        document.documentElement.setAttribute("data-theme", tema);
        if (persistir) {
            try { localStorage.setItem("tema-programacao", tema); } catch (e) {}
        }
        if (temaBtn) {
            temaBtn.textContent = tema === "light" ? "modo escuro" : "modo claro";
        }
    }

    function sincronizarBusca(valor) {
        if (buscaMain && buscaMain.value !== valor) buscaMain.value = valor;
        if (buscaNav && buscaNav.value !== valor) buscaNav.value = valor;
        buscar(valor);
    }

    function status(mensagem) {
        if (!pastas) return;
        pastas.innerHTML = '<p class="legacy-status">' + mensagem + "</p>";
    }

    function escaparHtml(valor) {
        return String(valor || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function montarCatalogo() {
        artigosPorArea = {};
        var i;
        for (i = 0; i < artigos.length; i += 1) {
            var item = artigos[i];
            var area = extrairArea(item.path);
            item.area = area;
            if (!artigosPorArea[area]) artigosPorArea[area] = [];
            artigosPorArea[area].push(item);
        }

        var ordem = ["Geral", "csharp", "javascript", "react", "css", "git", "python", "mermaid", "llm", "tutoriais", "web"];
        pastas.innerHTML = "";

        for (i = 0; i < ordem.length; i += 1) {
            var nomeArea = ordem[i];
            var lista = artigosPorArea[nomeArea];
            if (!lista || !lista.length) continue;

            var botao = document.createElement("button");
            botao.type = "button";
            botao.className = "legacy-area-link";
            botao.setAttribute("data-area", nomeArea);
            botao.textContent = textoArea(nomeArea) + " · " + lista.length + " artigos";
            botao.onclick = function () {
                abrirArea(this.getAttribute("data-area"));
            };
            pastas.appendChild(botao);
        }
    }

    function abrirHome() {
        areaAtual = null;
        mostrar(explorar);
        mostrar(masthead);
        esconder(resultados);
        esconder(leitorDisciplina);
        esconder(leitorArtigo);
        montarCatalogo();
        rolarTopo();
    }

    function abrirArea(area) {
        areaAtual = area;
        esconder(explorar);
        esconder(masthead);
        esconder(resultados);
        esconder(leitorArtigo);
        mostrar(leitorDisciplina);

        disciplinaTitulo.textContent = textoArea(area);
        disciplinaAcoes.innerHTML = "";

        var lista = (artigosPorArea[area] || []).slice();
        lista.sort(function (a, b) {
            return a.titulo.localeCompare(b.titulo);
        });

        var container = document.createElement("div");
        container.className = "legacy-area-lista";

        for (var i = 0; i < lista.length; i += 1) {
            var item = lista[i];
            var btn = document.createElement("button");
            btn.type = "button";
            btn.className = "legacy-area-link";
            btn.setAttribute("data-path", item.path);
            btn.textContent = limparTitulo(item.titulo);
            btn.onclick = function () {
                abrirArtigoPorPath(this.getAttribute("data-path"));
            };
            container.appendChild(btn);
        }

        disciplinaAcoes.appendChild(container);
        rolarTopo();
    }

    function buscar(termo) {
        termo = String(termo || "").toLowerCase().replace(/^\s+|\s+$/g, "");
        if (!termo) {
            abrirHome();
            return;
        }

        esconder(explorar);
        esconder(masthead);
        esconder(leitorDisciplina);
        esconder(leitorArtigo);
        mostrar(resultados);
        cards.innerHTML = "";

        var encontrados = [];
        for (var i = 0; i < artigos.length; i += 1) {
            if (artigos[i].titulo.toLowerCase().indexOf(termo) !== -1) {
                encontrados.push(artigos[i]);
            }
        }

        if (!encontrados.length) {
            cards.innerHTML = '<p class="legacy-status">Nenhum título encontrado. No modo de compatibilidade, a busca é por título para reduzir uso de memória.</p>';
            return;
        }

        for (var j = 0; j < encontrados.length; j += 1) {
            var item = encontrados[j];
            var btn = document.createElement("button");
            btn.type = "button";
            btn.className = "legacy-area-link";
            btn.setAttribute("data-path", item.path);
            btn.textContent = textoArea(item.area) + " · " + limparTitulo(item.titulo);
            btn.onclick = function () {
                abrirArtigoPorPath(this.getAttribute("data-path"));
            };
            cards.appendChild(btn);
        }
        rolarTopo();
    }

    function converterWikiLinks(md) {
        var partes = String(md || "").split(/(```[\s\S]*?```|`[^`\n]+`)/g);
        for (var i = 0; i < partes.length; i += 1) {
            if (i % 2 === 1) continue;
            partes[i] = partes[i].replace(/\[\[([^\]]+)\]\]/g, function (match, interno) {
                var conteudo = interno.replace(/\\\|/g, "|");
                var pedacos = conteudo.split("|");
                var destino = pedacos[0];
                var rotulo = pedacos.length > 1 ? pedacos.slice(1).join("|") : destino.split("/").pop();
                return "[" + rotulo + "](#wiki:" + encodeURIComponent(destino) + ")";
            });
        }
        return partes.join("");
    }

    function substituirMermaid(md) {
        return String(md || "").replace(/```mermaid\s*\n([\s\S]*?)```/g, function (_, codigo) {
            return '<div class="legacy-mermaid-fallback"><code>' + escaparHtml(codigo) + "</code></div>";
        });
    }

    function removerFrontmatter(md) {
        return String(md || "").replace(/^---[\s\S]*?---\s*/, "");
    }

    function renderizarMarkdown(md) {
        var preparado = substituirMermaid(removerFrontmatter(md));
        preparado = converterWikiLinks(preparado);
        if (window.marked) {
            try {
                return typeof window.marked.parse === "function" ? window.marked.parse(preparado) : window.marked(preparado);
            } catch (e) {}
        }
        return "<pre>" + escaparHtml(preparado) + "</pre>";
    }

    function instalarWikiLinks() {
        var links = artigoCorpo.querySelectorAll('a[href^="#wiki:"]');
        for (var i = 0; i < links.length; i += 1) {
            links[i].onclick = function (evento) {
                evento.preventDefault();
                var href = this.getAttribute("href");
                var destino = decodeURIComponent(href.substring(6));
                abrirWikiLink(destino);
            };
        }
    }

    function normalizarComparacao(valor) {
        return decodeURIComponent(String(valor || ""))
            .replace(/^\.\//, "")
            .replace(/\.md$/i, "")
            .toLowerCase();
    }

    function abrirWikiLink(destino) {
        var alvo = normalizarComparacao(destino);
        var melhor = null;
        for (var i = 0; i < artigos.length; i += 1) {
            var pathNormal = normalizarComparacao(artigos[i].path);
            if (pathNormal === alvo || pathNormal.indexOf(alvo) !== -1 || alvo.indexOf(pathNormal) !== -1) {
                melhor = artigos[i];
                break;
            }
        }
        if (melhor) abrirArtigoPorPath(melhor.path);
    }

    function abrirArtigoPorPath(path) {
        var item = null;
        for (var i = 0; i < artigos.length; i += 1) {
            if (artigos[i].path === path) {
                item = artigos[i];
                break;
            }
        }
        if (!item) return;

        areaAtual = item.area || extrairArea(item.path);
        esconder(explorar);
        esconder(masthead);
        esconder(resultados);
        esconder(leitorDisciplina);
        mostrar(leitorArtigo);

        artigoTitulo.textContent = limparTitulo(item.titulo);
        artigoCorpo.innerHTML = '<p class="legacy-status">Carregando artigo...</p>';
        breadcrumbs.innerHTML = '<a href="#" id="legacy-home-link">início</a> / <a href="#" id="legacy-area-link">' +
            escaparHtml(textoArea(areaAtual)) + "</a>";
        document.getElementById("legacy-home-link").onclick = function (e) { e.preventDefault(); abrirHome(); };
        document.getElementById("legacy-area-link").onclick = function (e) { e.preventDefault(); abrirArea(areaAtual); };

        fetch(item.path, { cache: "no-cache" })
            .then(function (resposta) {
                if (!resposta.ok) throw new Error("HTTP " + resposta.status);
                return resposta.text();
            })
            .then(function (md) {
                artigoCorpo.innerHTML = renderizarMarkdown(md);
                instalarWikiLinks();
                if (window.renderMathInElement) {
                    try {
                        window.renderMathInElement(artigoCorpo, {
                            delimiters: [
                                { left: "$$", right: "$$", display: true },
                                { left: "$", right: "$", display: false },
                                { left: "\\(", right: "\\)", display: false },
                                { left: "\\[", right: "\\]", display: true }
                            ],
                            throwOnError: false
                        });
                    } catch (e) {}
                }
                rolarTopo();
            })
            .catch(function () {
                artigoCorpo.innerHTML = '<p class="legacy-status">Não foi possível carregar este artigo neste navegador.</p>';
            });
    }

    function extrairCatalogo(texto) {
        var regex = /\{\s*titulo:\s*"([^"]+)"\s*,\s*path:\s*"([^"]+)"\s*\}/g;
        var match;
        artigos = [];
        while ((match = regex.exec(texto)) !== null) {
            artigos.push({ titulo: match[1], path: match[2] });
        }
        montarCatalogo();
    }

    function carregarCatalogo() {
        status("Carregando catálogo compatível...");
        fetch("./js/vault.js?v=ios12-1", { cache: "no-cache" })
            .then(function (resposta) {
                if (!resposta.ok) throw new Error("HTTP " + resposta.status);
                return resposta.text();
            })
            .then(function (texto) {
                extrairCatalogo(texto);
                if (!artigos.length) throw new Error("Catálogo vazio");
                abrirHome();
            })
            .catch(function () {
                status("Não foi possível carregar o catálogo do vault.");
            });
    }

    if (buscaMain) {
        buscaMain.oninput = function () { sincronizarBusca(this.value); };
    }
    if (buscaNav) {
        buscaNav.oninput = function () { sincronizarBusca(this.value); };
    }
    if (btnVoltarDisciplina) {
        btnVoltarDisciplina.onclick = function () { abrirHome(); };
    }
    if (btnVoltar) {
        btnVoltar.onclick = function () { abrirArea(areaAtual); };
    }
    if (navLogo) {
        navLogo.onclick = function () { abrirHome(); };
    }
    if (temaBtn) {
        temaBtn.onclick = function () {
            var atual = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
            aplicarTema(atual === "light" ? "dark" : "light", true);
        };
    }

    temaSeguro();
    carregarCatalogo();
}());
