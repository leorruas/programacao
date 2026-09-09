(function () {
    "use strict";

    function normalizar(texto) {
        return (texto || "")
            .trim()
            .toLocaleLowerCase("pt-BR")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, " ");
    }

    function removerTituloDuplicado() {
        var corpo = document.getElementById("artigo-corpo");
        var titulo = document.getElementById("artigo-titulo");
        if (!corpo || !titulo) return;

        var primeiroElemento = corpo.firstElementChild;
        if (!primeiroElemento || primeiroElemento.tagName !== "H1") return;

        if (normalizar(primeiroElemento.textContent) === normalizar(titulo.textContent)) {
            primeiroElemento.remove();
        }
    }

    var corpo = document.getElementById("artigo-corpo");
    if (!corpo || typeof MutationObserver === "undefined") return;

    new MutationObserver(removerTituloDuplicado).observe(corpo, {
        childList: true
    });
}());
