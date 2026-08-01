// Função para buscar automaticamente todos os arquivos .md do seu GitHub (sem precisar de token)
async function obterListaDeArquivos() {
    try {
        const resposta = await fetch("https://api.github.com/repos/leorruas/programacao/git/trees/main?recursive=1");
        if (!resposta.ok) throw new Error("Erro na API do GitHub");

        const dados = await resposta.json();

        // Filtra apenas os arquivos Markdown (.md), ignorando pastas internas do Obsidian/Git
        return dados.tree
            .filter(item => item.path.endsWith(".md") && !item.path.startsWith(".obsidian") && !item.path.startsWith(".git"))
            .map(item => {
                const nomeSemExtensao = item.path.split("/").pop().replace(".md", "");
                return {
                    titulo: nomeSemExtensao,
                    path: encodeURI(`./${item.path}`) // Usa encodeURI para preservar barras de subpastas
                };
            });
    } catch (erro) {
        console.warn("Não foi possível listar via GitHub, usando lista padrão completa:", erro);
        // Fallback local completo com todos os arquivos do vault
        return [
            { titulo: "Atalhos VS Code", path: "./Atalhos VS Code.md" },
            { titulo: "Evolução da Programação", path: "./Evolução da Programação.md" },
            { titulo: "log", path: "./log.md" },
            { titulo: "me", path: "./me.md" },
            { titulo: "Guia de CSS", path: "./css/Guia de CSS.md" },
            { titulo: "Flexbox", path: "./css/Flexbox.md" },
            { titulo: "Transições e Animações", path: "./css/Transições e Animações.md" },
            { titulo: "Pseudo-classes e Pseudo-elementos", path: "./css/Pseudo-classes e Pseudo-elementos.md" },
            { titulo: "Introdução ao Git", path: "./git/Introdução ao Git.md" },
            { titulo: "Git", path: "./git/01-fundamentos/Git.md" },
            { titulo: "Integrando a API do GitHub", path: "./git/01-fundamentos/Integrando a API do GitHub.md" },
            { titulo: "Introdução ao JavaScript", path: "./javascript/Introdução ao JavaScript.md" },
            { titulo: "Guia de Estudos", path: "./javascript/Guia de Estudos.md" },
            { titulo: "Consumindo APIs e Fetch", path: "./javascript/Consumindo APIs e Fetch.md" },
            { titulo: "Pesquisa Semântica no Vault", path: "./javascript/Pesquisa Semântica no Vault.md" },
            { titulo: "01. Criando uma Busca Simples no DOM", path: "./javascript/01. Criando uma Busca Simples no DOM.md" },
            { titulo: "Console.log", path: "./javascript/01-fundamentos/Console.log.md" },
            { titulo: "Var, let e const", path: "./javascript/01-fundamentos/Var, let e const.md" },
            { titulo: "Tipos de dados", path: "./javascript/01-fundamentos/Tipos de dados.md" },
            { titulo: "Operadores e operações", path: "./javascript/01-fundamentos/Operadores e operações.md" },
            { titulo: "Condicionais (if-else)", path: "./javascript/01-fundamentos/Condicionais (if-else).md" },
            { titulo: "Switch", path: "./javascript/01-fundamentos/Switch.md" },
            { titulo: "Estruturas de repetição (for e while)", path: "./javascript/01-fundamentos/Estruturas de repetição (for e while).md" },
            { titulo: "Hoisting", path: "./javascript/01-fundamentos/Hoisting.md" },
            { titulo: "Debug (depuração)", path: "./javascript/01-fundamentos/Debug (depuração).md" },
            { titulo: "Truthy e falsy", path: "./javascript/01-fundamentos/Truthy e falsy.md" },
            { titulo: "Funções", path: "./javascript/02-funcoes-e-objetos/Funções.md" },
            { titulo: "Arrow functions", path: "./javascript/02-funcoes-e-objetos/Arrow functions.md" },
            { titulo: "Objetos", path: "./javascript/02-funcoes-e-objetos/Objetos.md" },
            { titulo: "Dot notation e propriedades", path: "./javascript/02-funcoes-e-objetos/Dot notation e propriedades.md" },
            { titulo: "Entendendo o this", path: "./javascript/02-funcoes-e-objetos/Entendendo o this.md" },
            { titulo: "Funções construtoras", path: "./javascript/02-funcoes-e-objetos/Funções construtoras.md" },
            { titulo: "Protótipos e proto", path: "./javascript/02-funcoes-e-objetos/Protótipos e proto.md" },
            { titulo: "Classes", path: "./javascript/02-funcoes-e-objetos/Classes.md" },
            { titulo: "Herança e objetos aninhados", path: "./javascript/02-funcoes-e-objetos/Herança e objetos aninhados.md" },
            { titulo: "Get e set", path: "./javascript/02-funcoes-e-objetos/Get e set.md" },
            { titulo: "Arrays e métodos de array", path: "./javascript/03-manipulacao/Arrays e métodos de array.md" },
            { titulo: "Métodos de array", path: "./javascript/03-manipulacao/Métodos de array.md" },
            { titulo: "O método forEach em detalhes", path: "./javascript/03-manipulacao/O método forEach em detalhes.md" },
            { titulo: "Propriedades e métodos de string", path: "./javascript/03-manipulacao/Propriedades e métodos de string.md" },
            { titulo: "Template strings", path: "./javascript/03-manipulacao/Template strings.md" },
            { titulo: "Math", path: "./javascript/03-manipulacao/Math.md" },
            { titulo: "JSON", path: "./javascript/03-manipulacao/JSON.md" },
            { titulo: "Regex", path: "./javascript/03-manipulacao/Regex.md" },
            { titulo: "DOM", path: "./javascript/04-dom-e-browser/DOM.md" },
            { titulo: "Métodos do objeto document", path: "./javascript/04-dom-e-browser/Métodos do objeto document.md" },
            { titulo: "Eventos", path: "./javascript/04-dom-e-browser/Eventos.md" },
            { titulo: "O objeto window", path: "./javascript/04-dom-e-browser/O objeto window.md" },
            { titulo: "O console do navegador", path: "./javascript/04-dom-e-browser/O console do navegador.md" },
            { titulo: "Local storage", path: "./javascript/04-dom-e-browser/Local storage.md" },
            { titulo: "Animações com scroll", path: "./javascript/04-dom-e-browser/Animações com scroll.md" },
            { titulo: "Callbacks", path: "./javascript/05-assincrono/Callbacks.md" },
            { titulo: "Fetch", path: "./javascript/05-assincrono/Fetch.md" },
            { titulo: "Async await", path: "./javascript/05-assincrono/Async await.md" },
            { titulo: "API", path: "./javascript/05-assincrono/API.md" },
            { titulo: "Escopo e closures", path: "./javascript/06-arquitetura-e-avancado/Escopo e closures.md" },
            { titulo: "Desestruturação e spread", path: "./javascript/06-arquitetura-e-avancado/Desestruturação e spread.md" },
            { titulo: "Módulos import e export", path: "./javascript/06-arquitetura-e-avancado/Módulos import e export.md" },
            { titulo: "Tratamento de erros", path: "./javascript/06-arquitetura-e-avancado/Tratamento de erros.md" },
            { titulo: "Programação orientada a objetos", path: "./javascript/06-arquitetura-e-avancado/Programação orientada a objetos.md" },
            { titulo: "Event loop e call stack", path: "./javascript/06-arquitetura-e-avancado/Event loop e call stack.md" },
            { titulo: "Node.js", path: "./javascript/06-arquitetura-e-avancado/Node.js.md" },
            { titulo: "TypeScript introdução", path: "./javascript/06-arquitetura-e-avancado/TypeScript introdução.md" },
            { titulo: "Ordem de Carregamento do DOM e Script", path: "./javascript/conceitos/Ordem de Carregamento do DOM e Script.md" },
            { titulo: "Introdução ao Python", path: "./python/Introdução ao Python.md" },
            { titulo: "Comparativo de sintaxe e tipos", path: "./python/01-fundamentos/Comparativo de sintaxe e tipos.md" },
            { titulo: "Introdução ao React", path: "./react/Introdução ao React.md" },
            { titulo: "Hooks principais - useState, useRef, useMemo", path: "./react/01-fundamentos/Hooks principais - useState, useRef, useMemo.md" },
            { titulo: "Bibliotecas de UI e estilização", path: "./react/01-fundamentos/Bibliotecas de UI e estilização.md" },
            { titulo: "Pacotes e ecossistema do React", path: "./react/01-fundamentos/Pacotes e ecossistema do React.md" },
            { titulo: "01. Criando uma Busca Simples no DOM", path: "./tutoriais/01. Criando uma Busca Simples no DOM.md" },
            { titulo: "Como Criar um Modal Leitor de Artigos", path: "./tutoriais/Como Criar um Modal Leitor de Artigos.md" },
            { titulo: "Como Substituir os Resultados pelo Artigo no Main", path: "./tutoriais/Como Substituir os Resultados pelo Artigo no Main.md" },
            { titulo: "Como Converter Markdown do Obsidian em HTML", path: "./javascript/03-manipulacao/Como Converter Markdown do Obsidian em HTML.md" },
            { titulo: "Posicionamento e Alinhamento no CSS", path: "./css/Posicionamento e Alinhamento no CSS.md" },
            { titulo: "Como Disparar a Busca com a Tecla Enter", path: "./tutoriais/Como Disparar a Busca com a Tecla Enter.md" }
        ];
    }
}

const botao = document.querySelector("button");
const campoTexto = document.querySelector("input");
const containerResultados = document.querySelector(".cards-container");

botao.addEventListener("click", () => {
    const pesquise = campoTexto.value;
    console.log(pesquise);
    buscar(pesquise);
});

campoTexto.addEventListener("keyup", (evento) => {
    // Verifica se a tecla pressionada foi especificamente o Enter
    if (evento.key === "Enter") {
        const pesquise = campoTexto.value;
        buscar(pesquise);
    }
});





const divResultados = document.querySelector(".resultados");
const leitorDeArtigo = document.getElementById("leitor-artigo");
const artigoTitulo = document.getElementById("artigo-titulo");
const artigoCorpo = document.getElementById("artigo-corpo");
const btnVoltar = document.getElementById("btn-voltar");



// Remove os símbolos do Markdown e transforma em texto corrido
function limparMarkdown(texto) {
    return texto
        .replace(/```[\s\S]*?```/g, "")       // Remove blocos de código inteiros
        .replace(/^#+\s+/gm, "")              // Remove os # dos títulos
        .replace(/(\*\*|__|\*|_)(.*?)\1/g, "$2") // Remove **negrito** e *itálico*
        .replace(/`([^`]+)`/g, "$1")          // Remove código em linha ` `
        .replace(/^\>\s+/gm, "")              // Remove citações >
        .replace(/\[(.*?)\]\((.*?)\)/g, "$1")  // Mantém só o texto dos links
        .replace(/\n+/g, " ")                 // Troca quebras de linha por espaços (texto corrido!)
        .trim();
}


function abrirArtigo(titulo, conteudo) {
    artigoTitulo.textContent = titulo;

    artigoCorpo.innerHTML = marked.parse(conteudo);
    divResultados.classList.add("escondido");
    leitorDeArtigo.classList.remove("escondido");
}

btnVoltar.addEventListener("click", () => {
    leitorDeArtigo.classList.add("escondido");    // Esconde o leitor
    divResultados.classList.remove("escondido"); // Mostra os cards da busca de volta
});

async function buscar(termo) {
    const termoLimpo = termo.trim().toLowerCase();
    if (termoLimpo === "") return;
    divResultados.classList.remove("escondido");
    leitorDeArtigo.classList.add("escondido");

    containerResultados.innerHTML = `<h2>Buscando...</h2>`;

    const arquivos = await obterListaDeArquivos();
    let encontrouResultado = false;
    containerResultados.innerHTML = "";

    for (const arquivo of arquivos) {
        try {
            const resposta = await fetch(arquivo.path);
            const conteudoTexto = await resposta.text();
            const temNoTitulo = arquivo.titulo.toLowerCase().includes(termoLimpo);
            const temNoConteudo = conteudoTexto.toLowerCase().includes(termoLimpo);

            if (temNoTitulo || temNoConteudo) {
                encontrouResultado = true;
                const resumoBruto = conteudoTexto.substring(0, 250) + "...";
                const resumo = limparMarkdown(resumoBruto);
                // Criamos a div do card via JavaScript
                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `
        <h2>${arquivo.titulo}</h2>
        <div class="conteudo">${resumo}</div>
    `;

                // Quando clicar no card, troca a visão para o artigo completo!
                card.addEventListener("click", () => {
                    abrirArtigo(arquivo.titulo, conteudoTexto);
                });

                containerResultados.appendChild(card);
            }
        } catch (erro) {
            console.error("Erro ao ler arquivo: ", arquivo.path, erro);
        }
    }

    if (!encontrouResultado) {
        containerResultados.innerHTML = `
            
                <h2>Nenhum resultado encontrado</h2>
                <p>Tente pesquisar por outra palavra.</p>
            
        `;
    }
}

