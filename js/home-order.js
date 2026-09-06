(function () {
    function numeroDaPasta(item) {
        var elemento = item.querySelector('.pasta-numero');
        if (!elemento) return 9999;
        var numero = parseInt(elemento.textContent, 10);
        return isNaN(numero) ? 9999 : numero;
    }

    function obterItens(container) {
        return Array.prototype.slice.call(container.children).filter(function (item) {
            return item.classList && item.classList.contains('pasta-item');
        });
    }

    function ordenarPastas() {
        var container = document.getElementById('pastas-container');
        if (!container) return;

        var itens = obterItens(container);
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
