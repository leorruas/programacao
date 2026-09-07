(function () {
    "use strict";

    var ORDEM_JAVASCRIPT = [
        "Guia de Estudos",
        "Introdução ao JavaScript",

        "Var, let e const",
        "Console.log",
        "Tipos de dados",
        "Operadores e operações",
        "Condicionais (if-else)",
        "Switch",
        "Truthy e falsy",
        "Estruturas de repetição (for e while)",
        "Hoisting",
        "Debug (depuração)",

        "Funções",
        "Arrow functions",
        "Objetos",
        "Dot notation e propriedades",

        "Arrays e métodos de array",
        "Métodos de array",
        "O método forEach em detalhes",
        "Template strings",
        "Propriedades e métodos de string",
        "Math",
        "Regex",
        "JSON",
        "Como converter markdown do obsidian em html",

        "DOM",
        "Métodos do objeto document",
        "Navegação na árvore do DOM",
        "Manipulando elementos e atributos",
        "Criando e inserindo elementos no DOM",
        "Removendo elementos do DOM",
        "Manipulando estilos e classes no DOM",
        "Eventos no navegador",
        "Event bubbling e delegation",
        "Formulários e validação no DOM",
        "Dimensões e posições de elementos",
        "Janela e tela",
        "Temporizadores",
        "Scroll e navegação suave",
        "Intersection Observer API",
        "Mutation Observer API",
        "Canvas e gráficos",
        "SVG com JavaScript",
        "Clipboard API",
        "Fullscreen API",
        "Criando uma Busca Simples no DOM",

        "Local Storage e Session Storage",
        "Cookies",
        "IndexedDB",

        "Callbacks",
        "Promises",
        "Event Loop e Call Stack",
        "Microtasks e Macrotasks",
        "Async e await",
        "Fetch API",
        "Aborting requests com AbortController",
        "Manipulação de erros assíncronos",
        "Axios",
        "WebSockets",
        "Consumindo APIs e Fetch",

        "Entendendo o this",
        "Funções construtoras",
        "Protótipos e proto",
        "Herança e objetos aninhados",
        "Classes",
        "Get e set",

        "Projeto Lista de Tarefas (DOM)",
        "Projeto Mini E-commerce (Array e DOM)",
        "Projeto Consumo de API (GitHub Users)",
        "Pesquisa Semântica no Vault"
    ];

    function normalizarTitulo(texto) {
        return String(texto || "")
            .replace(/^\s*\d+[.\-_\s]+/, "")
            .replace(/^\s+|\s+$/g, "")
            .toLowerCase();
    }

    var indiceOrdem = {};
    for (var i = 0; i < ORDEM_JAVASCRIPT.length; i += 1) {
        indiceOrdem[normalizarTitulo(ORDEM_JAVASCRIPT[i])] = i;
    }

    function tituloDoBotao(botao) {
        var spans = botao.getElementsByTagName("span");
        if (spans.length > 1) {
            return normalizarTitulo(spans[spans.length - 1].textContent);
        }
        return normalizarTitulo(botao.textContent);
    }

    function estaNaAreaJavascript() {
        var titulo = document.getElementById("disciplina-titulo");
        return titulo && normalizarTitulo(titulo.textContent) === "javascript";
    }

    function encontrarContainer() {
        var acoes = document.getElementById("disciplina-acoes");
        if (!acoes) return null;
        var listaLegada = acoes.querySelector(".legacy-area-lista");
        return listaLegada || acoes;
    }

    function obterBotoesOrdenados() {
        var container = encontrarContainer();
        if (!container) return [];

        var botoes = Array.prototype.slice.call(container.querySelectorAll("button"));
        botoes.sort(function (a, b) {
            var tituloA = tituloDoBotao(a);
            var tituloB = tituloDoBotao(b);
            var ordemA = Object.prototype.hasOwnProperty.call(indiceOrdem, tituloA) ? indiceOrdem[tituloA] : 9999;
            var ordemB = Object.prototype.hasOwnProperty.call(indiceOrdem, tituloB) ? indiceOrdem[tituloB] : 9999;

            if (ordemA !== ordemB) return ordemA - ordemB;
            return tituloA < tituloB ? -1 : tituloA > tituloB ? 1 : 0;
        });
        return botoes;
    }

    function ordenarListaJavascript() {
        if (!estaNaAreaJavascript()) return;

        var container = encontrarContainer();
        if (!container) return;

        var botoes = obterBotoesOrdenados();
        if (botoes.length < 2) return;

        var precisaReordenar = false;
        for (var i = 0; i < botoes.length; i += 1) {
            if (container.children[i] !== botoes[i]) {
                precisaReordenar = true;
                break;
            }
        }

        for (var j = 0; j < botoes.length; j += 1) {
            var numero = botoes[j].querySelector(".disciplina-acao-numero");
            if (numero) {
                numero.textContent = String(j + 1).length < 2 ? "0" + (j + 1) : String(j + 1);
            }
        }

        if (!precisaReordenar) return;

        for (var k = 0; k < botoes.length; k += 1) {
            container.appendChild(botoes[k]);
        }
    }

    function criarCardNavegacao(botaoAlvo, direcao) {
        if (!botaoAlvo) return document.createElement("span");

        var botao = document.createElement("button");
        botao.type = "button";
        botao.className = "nav-card nav-card-" + direcao;
        botao.innerHTML = '<span class="nav-card-label">' +
            (direcao === "anterior" ? "← artigo anterior" : "próximo artigo →") +
            '</span><strong class="nav-card-title"></strong>';
        botao.querySelector(".nav-card-title").textContent = botaoAlvo.textContent.replace(/^\s*\d+\s*/, "").trim();
        botao.onclick = function () {
            botaoAlvo.click();
        };
        return botao;
    }

    function alinharNavegacaoArtigo() {
        if (!estaNaAreaJavascript()) return;

        var leitor = document.getElementById("leitor-artigo");
        var tituloAtual = document.getElementById("artigo-titulo");
        var navegacao = document.getElementById("artigo-nav-cards");
        if (!leitor || !tituloAtual || !navegacao) return;
        if (leitor.className.indexOf("escondido") !== -1) return;

        var atual = normalizarTitulo(tituloAtual.textContent);
        var botoes = obterBotoesOrdenados();
        var indice = -1;

        for (var i = 0; i < botoes.length; i += 1) {
            if (tituloDoBotao(botoes[i]) === atual) {
                indice = i;
                break;
            }
        }

        if (indice === -1) return;

        var anterior = indice > 0 ? botoes[indice - 1] : null;
        var proximo = indice < botoes.length - 1 ? botoes[indice + 1] : null;
        var assinatura = atual + "|" + (anterior ? tituloDoBotao(anterior) : "") + "|" + (proximo ? tituloDoBotao(proximo) : "");
        if (navegacao.getAttribute("data-js-reading-signature") === assinatura) return;

        navegacao.innerHTML = "";
        var grade = document.createElement("div");
        grade.className = "artigo-nav-cards-grid";
        grade.appendChild(criarCardNavegacao(anterior, "anterior"));
        grade.appendChild(criarCardNavegacao(proximo, "proximo"));
        navegacao.appendChild(grade);
        navegacao.setAttribute("data-js-reading-signature", assinatura);
    }

    function processarTrilha() {
        ordenarListaJavascript();
        alinharNavegacaoArtigo();
    }

    function observarMudancas() {
        if (!window.MutationObserver) return;

        var raiz = document.body;
        if (!raiz) return;

        var agendado = false;
        var observer = new MutationObserver(function () {
            if (agendado) return;
            agendado = true;
            setTimeout(function () {
                agendado = false;
                processarTrilha();
            }, 0);
        });

        observer.observe(raiz, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["class"] });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function () {
            observarMudancas();
            processarTrilha();
        });
    } else {
        observarMudancas();
        processarTrilha();
    }
}());