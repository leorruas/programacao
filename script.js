const listaDeArquivos = [
    { titulo: "Atalhos VS Code", path: "./Atalhos VS Code.md" },
    { titulo: "Introdução ao Git", path: "./git/Introdução ao Git.md" },
    { titulo: "Guia de CSS", path: "./css/Guia de CSS.md" },
    { titulo: "Flexbox", path: "./css/Flexbox.md" },
    { titulo: "Transições e Animações", path: "./css/Transições e Animações.md" }
];


const botao = document.querySelector("button")

const campoTexto = document.querySelector("input")
const containerResultados = document.querySelector(".cards-container")


botao.addEventListener("click", () => {
    const pesquise = campoTexto.value;
    console.log(pesquise)
    buscar(pesquise)

}
);

async function buscar(termo) {
    containerResultados.innerHTML = "";
    const termoLimpo = termo.trim().toLowerCase()

    if (termoLimpo === "") { return };
    containerResultados.innerHTML = `<div class="card"> <h2> Buscando...</h2></div>`;
    let encontrouResultado = false;
    containerResultados.innerHTML = "";


    for (const arquivo of listaDeArquivos) {
        try {
            const resposta = await fetch(arquivo.path)
            const conteudoTexto = await resposta.text();

            const temNoTitulo = arquivo.titulo.toLowerCase().includes(termoLimpo);
            const temNoConteudo = conteudoTexto.toLowerCase().includes(termoLimpo);

            if (temNoTitulo || temNoConteudo) {
                encontrouResultado = true;
                const resumo = conteudoTexto.substring(0, 150) + "...";
                containerResultados.innerHTML += `
                    <div class="card">
            <h2> ${arquivo.titulo}</h2>
            <div class="conteudo"> ${resumo}</div>
            </div>
                    `;
            }

        }
        catch (erro) {
            console.error("Erro ao ler arquivo: ", arquivo.path, erro);
        }
    }
    if (!encontrouResultado) {
        containerResultados.innerHTML = `
            <div class="card">
                <h2>Nenhum resultado encontrado</h2>
                <p>Tente pesquisar por outra palavra.</p>
            </div>
        `;
    }

}