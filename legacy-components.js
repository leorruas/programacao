(function () {
    "use strict";

    function modoLegadoAtivo() {
        return (" " + document.documentElement.className + " ").indexOf(" legacy-ios12 ") !== -1;
    }

    var TIPOS = {
        NOTE: "NOTA",
        ABSTRACT: "RESUMO",
        SUMMARY: "RESUMO",
        TLDR: "RESUMO",
        INFO: "INFO",
        TODO: "A FAZER",
        TIP: "DICA",
        HINT: "DICA",
        IMPORTANT: "IMPORTANTE",
        SUCCESS: "SUCESSO",
        CHECK: "SUCESSO",
        DONE: "CONCLUÍDO",
        QUESTION: "PERGUNTA",
        HELP: "AJUDA",
        FAQ: "FAQ",
        WARNING: "AVISO",
        CAUTION: "ATENÇÃO",
        ATTENTION: "ATENÇÃO",
        FAILURE: "FALHA",
        FAIL: "FALHA",
        MISSING: "AUSENTE",
        DANGER: "PERIGO",
        ERROR: "ERRO",
        BUG: "BUG",
        EXAMPLE: "EXEMPLO",
        QUOTE: "CITAÇÃO",
        CITE: "CITAÇÃO"
    };

    function primeiroNoDeTexto(elemento) {
        if (!elemento) return null;
        var pilha = [elemento];
        while (pilha.length) {
            var atual = pilha.shift();
            if (atual.nodeType === 3 && atual.nodeValue && atual.nodeValue.replace(/^\s+|\s+$/g, "")) {
                return atual;
            }
            if (atual.childNodes) {
                for (var i = 0; i < atual.childNodes.length; i += 1) {
                    pilha.push(atual.childNodes[i]);
                }
            }
        }
        return null;
    }

    function processarCallouts() {
        var corpo = document.getElementById("artigo-corpo");
        if (!corpo) return;

        var blocos = corpo.querySelectorAll("blockquote");
        for (var i = 0; i < blocos.length; i += 1) {
            var bloco = blocos[i];
            if (bloco.className && bloco.className.indexOf("obsidian-callout") !== -1) continue;

            var primeiro = primeiroNoDeTexto(bloco);
            if (!primeiro) continue;

            var valor = primeiro.nodeValue || "";
            var linhas = valor.split(/\r?\n/);
            var primeiraLinha = linhas[0].replace(/^\s+|\s+$/g, "");
            var match = primeiraLinha.match(/^\[!([A-Z]+)\][+-]?\s*(.*)$/i);
            if (!match) continue;

            var tipo = String(match[1] || "").toUpperCase();
            if (!TIPOS[tipo]) continue;

            var tituloCustomizado = String(match[2] || "").replace(/^\s+|\s+$/g, "");
            linhas.shift();
            primeiro.nodeValue = linhas.join("\n").replace(/^\s+/, "");

            var callout = document.createElement("div");
            callout.className = "obsidian-callout callout-" + tipo.toLowerCase();

            var cabecalho = document.createElement("div");
            cabecalho.className = "callout-header";
            cabecalho.textContent = tituloCustomizado || TIPOS[tipo];

            var conteudo = document.createElement("div");
            conteudo.className = "callout-content";

            while (bloco.firstChild) {
                conteudo.appendChild(bloco.firstChild);
            }

            var primeiroParagrafo = conteudo.querySelector("p");
            if (primeiroParagrafo && !primeiroParagrafo.textContent.replace(/^\s+|\s+$/g, "") && !primeiroParagrafo.children.length) {
                primeiroParagrafo.parentNode.removeChild(primeiroParagrafo);
            }

            callout.appendChild(cabecalho);
            callout.appendChild(conteudo);
            bloco.parentNode.replaceChild(callout, bloco);
        }
    }

    function processarBreadcrumbs() {
        var breadcrumbs = document.getElementById("artigo-breadcrumbs");
        var titulo = document.getElementById("artigo-titulo");
        if (!breadcrumbs || !titulo) return;
        if (breadcrumbs.getAttribute("data-legacy-enhanced") === "1") return;

        var links = breadcrumbs.querySelectorAll("a");
        if (!links.length) return;

        var preservados = [];
        for (var i = 0; i < links.length; i += 1) preservados.push(links[i]);

        while (breadcrumbs.firstChild) breadcrumbs.removeChild(breadcrumbs.firstChild);

        for (var j = 0; j < preservados.length; j += 1) {
            if (j > 0) {
                var sep = document.createElement("span");
                sep.className = "legacy-breadcrumb-separator";
                sep.textContent = "›";
                breadcrumbs.appendChild(sep);
            }
            breadcrumbs.appendChild(preservados[j]);
        }

        if (titulo.textContent) {
            var separadorFinal = document.createElement("span");
            separadorFinal.className = "legacy-breadcrumb-separator";
            separadorFinal.textContent = "›";
            breadcrumbs.appendChild(separadorFinal);

            var atual = document.createElement("span");
            atual.className = "legacy-breadcrumb-current";
            atual.textContent = titulo.textContent;
            atual.setAttribute("title", titulo.textContent);
            breadcrumbs.appendChild(atual);
        }

        breadcrumbs.setAttribute("data-legacy-enhanced", "1");
    }

    function observar() {
        if (!modoLegadoAtivo()) return;

        var corpo = document.getElementById("artigo-corpo");
        var breadcrumbs = document.getElementById("artigo-breadcrumbs");
        if (!corpo || !breadcrumbs || !window.MutationObserver) return;

        var observadorCorpo = new MutationObserver(function () {
            processarCallouts();
        });
        observadorCorpo.observe(corpo, { childList: true, subtree: true });

        var observadorBreadcrumbs = new MutationObserver(function () {
            if (!breadcrumbs.querySelector(".legacy-breadcrumb-current")) {
                breadcrumbs.removeAttribute("data-legacy-enhanced");
                processarBreadcrumbs();
            }
        });
        observadorBreadcrumbs.observe(breadcrumbs, { childList: true });

        processarCallouts();
        processarBreadcrumbs();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", observar);
    } else {
        observar();
    }
}());
