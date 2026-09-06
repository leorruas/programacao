(function () {
    function numeroDaPasta(item) {
        var elemento = item.querySelector('.pasta-numero');
        if (!elemento) return Number.MAX_SAFE_INTEGER;
        var numero = parseInt(elemento.textContent, 10);
        return Number.isNaN(numero) ? Number.MAX_SAFE_INTEGER : numero;
    }

    function ordenarPastas() {
        var container = document.getElementById('pastas-container');
        if (!container) return;

        var itens = Array.prototype.slice.call(container.querySelectorAll(':scope > .pasta-item'));
        if (itens.length < 2) return;

        var ordenados = itens.slice().sort(function (a, b) {
            return numeroDaPasta(a) - numeroDaPasta(b);
        });

        var mudou = ordenados.some(function (item, indice) {
            return item !== itens[indice];
        });

        if (!mudou) return;

        ordenados.forEach(function (item) {
            container.appendChild(item);
        });
    }

    function iniciar() {
        var container = document.getElementById('pastas-container');
        if (!container) return;

        ordenarPastas();

        var observer = new MutationObserver(function () {
            ordenarPastas();
        });

        observer.observe(container, { childList: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciar);
    } else {
        iniciar();
    }
}());
