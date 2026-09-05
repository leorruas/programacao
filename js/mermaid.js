// js/mermaid.js - Renderização e exploração de diagramas Mermaid com identidade rosa

let proximoIdDeRenderizacao = 0;

function obterTokensTemaMermaid() {
    const escuro = document.documentElement.dataset.theme !== "light";
    return escuro ? {
        fontFamily: "Archivo, sans-serif", fontSize: "14px", darkMode: true,
        background: "transparent", primaryColor: "#1c1c1e", primaryTextColor: "#f1f5f9",
        primaryBorderColor: "#ffb6c1", secondaryColor: "#141416", secondaryTextColor: "#f1f5f9",
        secondaryBorderColor: "#475569", tertiaryColor: "#1e2229", tertiaryTextColor: "#f1f5f9",
        tertiaryBorderColor: "#475569", clusterBkg: "#1e2229", clusterBorder: "rgba(255, 182, 193, 0.4)",
        lineColor: "#ffb6c1", arrowheadColor: "#ffb6c1", textColor: "#f1f5f9", edgeLabelBackground: "#14161a"
    } : {
        fontFamily: "Archivo, sans-serif", fontSize: "14px", darkMode: false,
        background: "transparent", primaryColor: "#ffffff", primaryTextColor: "#0f172a",
        primaryBorderColor: "#c2255c", secondaryColor: "#f8fafc", secondaryTextColor: "#0f172a",
        secondaryBorderColor: "#cbd5e1", tertiaryColor: "#f1f5f9", tertiaryTextColor: "#0f172a",
        tertiaryBorderColor: "#94a3b8", clusterBkg: "#f1f5f9", clusterBorder: "rgba(194, 37, 92, 0.4)",
        lineColor: "#c2255c", arrowheadColor: "#c2255c", textColor: "#0f172a", edgeLabelBackground: "#ffffff"
    };
}

function obterCssSemanticoMermaid() {
    const claro = document.documentElement.dataset.theme === "light";
    const estilos = claro ? {
        core: ["#fff0f3", "#c2255c", "2.2px"],
        component: ["#f1f5f9", "#94a3b8", "1.5px"],
        data: ["#ecfdf5", "#059669", "1.8px"],
        warning: ["#fffbeb", "#d97706", "2px"],
        external: ["#f8fafc", "#94a3b8", "1.5px"]
    } : {
        core: ["#24141c", "#ffb6c1", "2.2px"],
        component: ["#1e2229", "#475569", "1.5px"],
        data: ["#0d291e", "#10b981", "1.8px"],
        warning: ["#2d1f06", "#f59e0b", "2px"],
        external: ["#14161a", "#64748b", "1.5px"]
    };
    const formas = ["rect", "polygon", "circle", "ellipse", "path"];
    return Object.entries(estilos).map(function ([classe, valores]) {
        const fundo = valores[0];
        const borda = valores[1];
        const espessura = valores[2];
        const tracejado = classe === "external" ? " stroke-dasharray: 4 3;" : "";
        const seletor = formas.map(function (forma) {
            return ".node." + classe + " > " + forma;
        }).join(", ");
        return seletor + " { fill: " + fundo + "; stroke: " + borda + "; stroke-width: " + espessura + ";" + tracejado + " }";
    }).join("\n");
}

export function configurarMermaid() {
    if (typeof mermaid === "undefined") return;
    mermaid.initialize({
        startOnLoad: false, theme: "base", fontFamily: "Archivo, sans-serif", fontSize: 14,
        flowchart: { curve: "linear", htmlLabels: true, nodeSpacing: 46, rankSpacing: 52, padding: 18 },
        themeVariables: obterTokensTemaMermaid(),
        themeCSS: obterCssSemanticoMermaid()
    });
}

async function aguardarFontes() {
    if (!document.fonts?.ready) return;
    try { await document.fonts.ready; } catch (_) {}
}

async function renderizarSvgMermaid(codigo) {
    configurarMermaid();
    return mermaid.render(`mermaid-explorer-${++proximoIdDeRenderizacao}`, codigo);
}

function dimensoesDoSvg(svg) {
    const viewBox = svg.viewBox?.baseVal;
    if (viewBox?.width > 0 && viewBox.height > 0) return { largura: viewBox.width, altura: viewBox.height };
    const largura = Number.parseFloat(svg.getAttribute("width"));
    const altura = Number.parseFloat(svg.getAttribute("height"));
    return {
        largura: Number.isFinite(largura) && largura > 0 ? largura : 800,
        altura: Number.isFinite(altura) && altura > 0 ? altura : 600
    };
}

/** Abre uma nova renderização do código Mermaid no explorador interativo fullscreen. */
export async function abrirModalExploradorMermaid(codigo) {
    if (!codigo || typeof mermaid === "undefined") return;
    document.querySelector(".mermaid-modal")?.remove();

    const modal = document.createElement("div");
    modal.className = "mermaid-modal";
    modal.innerHTML = `
        <header class="mermaid-modal-header">
            <div class="mermaid-modal-title"><span>Explorador de diagrama</span></div>
            <div class="mermaid-modal-controls">
                <button type="button" class="btn-mermaid-zoom-out" title="Reduzir zoom (ou scroll)">−</button>
                <span class="mermaid-modal-zoom-display">ajustado</span>
                <button type="button" class="btn-mermaid-zoom-in" title="Aumentar zoom (ou scroll)">+</button>
                <button type="button" class="btn-mermaid-fit" title="Ajustar à tela inteira (f)">ajustar</button>
                <button type="button" class="btn-mermaid-reset" title="Tamanho real (100%)">1:1</button>
                <button type="button" class="btn-mermaid-fechar" title="Fechar (Esc)">&times; fechar</button>
            </div>
        </header>
        <div class="mermaid-modal-body"><div class="mermaid-modal-stage" aria-live="polite"></div></div>`;
    document.body.appendChild(modal);

    const stage = modal.querySelector(".mermaid-modal-stage");
    const body = modal.querySelector(".mermaid-modal-body");
    const zoomDisplay = modal.querySelector(".mermaid-modal-zoom-display");
    try {
        await aguardarFontes();
        const resultado = await renderizarSvgMermaid(codigo);
        stage.innerHTML = resultado.svg;
        resultado.bindFunctions?.(stage);
    } catch (erro) {
        console.error("Erro ao renderizar Mermaid no explorador:", erro);
        stage.textContent = "Não foi possível renderizar este diagrama.";
        return;
    }

    const svg = stage.querySelector("svg");
    if (!svg) return;
    const { largura, altura } = dimensoesDoSvg(svg);
    stage.style.width = `${Math.ceil(largura)}px`;
    stage.style.height = `${Math.ceil(altura)}px`;

    let escala = 1;
    let deslocamentoX = 0;
    let deslocamentoY = 0;
    let arrastando = false;
    let origemX = 0;
    let origemY = 0;
    let ajustado = true;

    function aplicarTransformacao() {
        stage.style.transform = `translate(calc(-50% + ${deslocamentoX}px), calc(-50% + ${deslocamentoY}px)) scale(${escala})`;
        zoomDisplay.textContent = ajustado ? `ajustado · ${Math.round(escala * 100)}%` : `${Math.round(escala * 100)}%`;
    }
    function ajustar() {
        const area = body.getBoundingClientRect();
        const margem = 64;
        escala = Math.min(
            Math.max(0.1, (area.width - margem * 2) / largura),
            Math.max(0.1, (area.height - margem * 2) / altura),
            4.5
        );
        deslocamentoX = 0; deslocamentoY = 0; ajustado = true;
        aplicarTransformacao();
    }
    function alterarZoom(fator, x, y) {
        const anterior = escala;
        escala = Math.min(6, Math.max(0.1, escala * fator));
        if (x !== undefined && y !== undefined) {
            const area = body.getBoundingClientRect();
            const relativoX = x - area.left - area.width / 2;
            const relativoY = y - area.top - area.height / 2;
            deslocamentoX = (deslocamentoX - relativoX) * (escala / anterior) + relativoX;
            deslocamentoY = (deslocamentoY - relativoY) * (escala / anterior) + relativoY;
        }
        ajustado = false;
        aplicarTransformacao();
    }
    const tamanhoReal = () => {
        escala = 1; deslocamentoX = 0; deslocamentoY = 0; ajustado = false; aplicarTransformacao();
    };
    const fechar = () => { limparListeners(); modal.remove(); };
    const aoTeclar = evento => {
        if (evento.key === "Escape") fechar();
        else if (evento.key.toLowerCase() === "f") ajustar();
        else if (evento.key === "0") tamanhoReal();
        else if (evento.key === "+" || evento.key === "=") alterarZoom(1.25);
        else if (evento.key === "-") alterarZoom(0.8);
    };
    const aoRolar = evento => {
        evento.preventDefault();
        alterarZoom(evento.deltaY < 0 ? 1.15 : 0.87, evento.clientX, evento.clientY);
    };
    const aoIniciarArrasto = evento => {
        if (evento.button !== 0) return;
        arrastando = true; origemX = evento.clientX - deslocamentoX; origemY = evento.clientY - deslocamentoY;
        body.classList.add("is-dragging"); body.setPointerCapture(evento.pointerId);
    };
    const aoArrastar = evento => {
        if (!arrastando) return;
        deslocamentoX = evento.clientX - origemX; deslocamentoY = evento.clientY - origemY; ajustado = false;
        aplicarTransformacao();
    };
    const encerrarArrasto = evento => {
        if (!arrastando) return;
        arrastando = false; body.classList.remove("is-dragging");
        try { body.releasePointerCapture(evento.pointerId); } catch (_) {}
    };
    const botoes = {
        aproximar: modal.querySelector(".btn-mermaid-zoom-in"),
        afastar: modal.querySelector(".btn-mermaid-zoom-out"),
        ajustar: modal.querySelector(".btn-mermaid-fit"),
        real: modal.querySelector(".btn-mermaid-reset"),
        fechar: modal.querySelector(".btn-mermaid-fechar")
    };
    const aoRedimensionar = () => ajustar();
    botoes.aproximar.addEventListener("click", () => alterarZoom(1.25));
    botoes.afastar.addEventListener("click", () => alterarZoom(0.8));
    botoes.ajustar.addEventListener("click", ajustar);
    botoes.real.addEventListener("click", tamanhoReal);
    botoes.fechar.addEventListener("click", fechar);
    window.addEventListener("keydown", aoTeclar);
    window.addEventListener("resize", aoRedimensionar);
    body.addEventListener("wheel", aoRolar, { passive: false });
    body.addEventListener("pointerdown", aoIniciarArrasto);
    body.addEventListener("pointermove", aoArrastar);
    body.addEventListener("pointerup", encerrarArrasto);
    body.addEventListener("pointercancel", encerrarArrasto);
    function limparListeners() {
        window.removeEventListener("keydown", aoTeclar);
        window.removeEventListener("resize", aoRedimensionar);
        body.removeEventListener("wheel", aoRolar);
        body.removeEventListener("pointerdown", aoIniciarArrasto);
        body.removeEventListener("pointermove", aoArrastar);
        body.removeEventListener("pointerup", encerrarArrasto);
        body.removeEventListener("pointercancel", encerrarArrasto);
    }
    requestAnimationFrame(ajustar);
}

export function equiparDiagramasMermaidInterativos(container) {
    if (!container) return;
    container.querySelectorAll(".mermaid").forEach(diagrama => {
        if (!diagrama.querySelector("svg") || diagrama.closest(".mermaid-wrapper")) return;
        const wrapper = document.createElement("div");
        wrapper.className = "mermaid-wrapper";
        const toolbar = document.createElement("div");
        toolbar.className = "mermaid-toolbar";
        toolbar.innerHTML = `<button type="button" class="mermaid-btn btn-explorar" title="Abrir em tela cheia com zoom e navegação"><span>ampliar</span></button>`;
        const viewport = document.createElement("div");
        viewport.className = "mermaid-viewport";
        diagrama.parentNode.insertBefore(wrapper, diagrama);
        viewport.appendChild(diagrama);
        wrapper.append(toolbar, viewport);
        toolbar.querySelector(".btn-explorar").addEventListener("click", () => abrirModalExploradorMermaid(diagrama.dataset.mermaidSource));
    });
}

export async function renderizarDiagramasMermaid(container) {
    if (typeof mermaid === "undefined" || !container) return;
    await aguardarFontes();
    configurarMermaid();
    const diagramas = container.querySelectorAll(".mermaid");
    diagramas.forEach(diagrama => {
        const codigo = diagrama.dataset.mermaidSource || diagrama.textContent;
        diagrama.dataset.mermaidSource = codigo;
        diagrama.removeAttribute("data-processed");
        diagrama.textContent = codigo;
    });
    try {
        await mermaid.run({ nodes: diagramas });
        equiparDiagramasMermaidInterativos(container);
    } catch (erro) {
        console.error("Erro ao renderizar Mermaid:", erro);
    }
}
