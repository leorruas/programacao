(function () {
    "use strict";

    const corpo = document.getElementById("artigo-corpo");
    const tituloDaPagina = document.getElementById("artigo-titulo");
    if (!corpo || !tituloDaPagina) return;

    // O H1 do Markdown é o título do documento. O leitor já possui um
    // cabeçalho próprio, então exibimos esse texto uma única vez nele.
    function consolidarTitulo() {
        const primeiroElemento = corpo.firstElementChild;
        if (!primeiroElemento || primeiroElemento.tagName !== "H1") return;

        const tituloDoMarkdown = primeiroElemento.textContent.trim();
        if (tituloDoMarkdown) tituloDaPagina.textContent = tituloDoMarkdown;
        primeiroElemento.remove();
    }

    // Também cobre conteúdos renderizados antes da instalação do observador.
    consolidarTitulo();

    if (typeof MutationObserver === "undefined") return;

    // Observa apenas títulos novos. A remoção do H1 não dispara outra
    // remoção, inclusive se o documento tiver mais de um H1 consecutivo.
    new MutationObserver(function (alteracoes) {
        const recebeuH1 = alteracoes.some(function (alteracao) {
            return Array.from(alteracao.addedNodes).some(function (no) {
                return no.nodeType === 1 && no.tagName === "H1";
            });
        });
        if (recebeuH1) consolidarTitulo();
    }).observe(corpo, { childList: true });
}());
