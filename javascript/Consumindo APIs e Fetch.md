# Consumindo APIs e Fetch no JavaScript

Uma **API** (Application Programming Interface) é uma ponte que permite que duas aplicações conversem entre si. No JavaScript moderno, a principal ferramenta para se comunicar com APIs e carregar arquivos da rede é a função **`fetch()`**.

---

## 1. A Analogia Fundamental do Garçom

Pense na internet como um restaurante:

- **Você (Cliente / Browser)**: Quer um prato (dados, informações ou arquivos).
- **A Cozinha (Servidor / API)**: Onde os dados estão guardados.
- **O Garçom (API / `fetch`)**: Leva o seu pedido até a cozinha e traz o prato pronto para a sua mesa.

Você não entra na cozinha para pegar a comida diretamente; você faz um pedido ao garçom (`fetch`) e aguarda ele trazer a resposta.

---

## 2. Como Funciona o `fetch()` Assíncrono

Como requisições na rede levam tempo para viajar pela internet, o JavaScript executa o `fetch` de forma **assíncrona** (usando `async/await`), impedindo que a página trave enquanto espera a resposta.

```javascript
async function carregarDados() {
    // 1. O garçom leva o pedido até a URL
    const resposta = await fetch("https://api.github.com/repos/usuario/repositorio");
    
    // 2. Transforma a resposta em um formato legível (JSON)
    const dados = await resposta.json();
    
    console.log(dados);
}
```

---

## 3. As Duas Formas de Ler uma Resposta

Quando a API ou o servidor responde, o conteúdo pode vir em formatos diferentes:

1. **`resposta.json()`**: Usado quando a API devolve dados estruturados (listas, objetos, tabelas).
2. **`resposta.text()`**: Usado quando estamos lendo arquivos de texto puro (como documentos `.md`, arquivos `.html` ou `.txt`).

---

## 4. Estudo de Caso Prático: O Sistema de Busca do Projeto

No nosso projeto de busca de anotações, combinamos dois tipos de `fetch` em etapas diferentes:

### Etapa 1: A API do GitHub como "Índice de Livros"
A API pública do GitHub devolve apenas uma lista de metadados dos arquivos que existem no repositório. **Ela não traz o conteúdo de texto de dentro dos artigos**.

```javascript
// A API do GitHub apenas lista quais arquivos existem no repositório
const resposta = await fetch("https://api.github.com/repos/leorruas/programacao/git/trees/main?recursive=1");
const dados = await resposta.json(); // Retorna uma lista JSON de caminhos
```

### Etapa 2: A Leitura do Conteúdo Real (Arquivo por Arquivo)
Com a lista de arquivos em mãos, fazemos um segundo `fetch` dentro de um loop para abrir e ler o texto de cada arquivo Markdown:

```javascript
for (const arquivo of arquivos) {
    // Aqui sim lemos o texto de dentro do arquivo .md
    const resposta = await fetch(arquivo.path);
    const conteudoTexto = await resposta.text(); // Converte em texto puro
    
    // Verifica se a palavra pesquisada existe no título ou no texto
}
```

---

## 5. Cuidados Importantes e Segurança

### A) Nunca exponha Tokens Privados no Frontend
Chaves de API privadas ou Personal Access Tokens (como `ghp_...` do GitHub) **nunca devem ficar gravados no código JavaScript do navegador**. Qualquer visitante pode inspecionar a página e roubar seu token.

> **Regra prática**: Requisições de leitura em APIs públicas (como listar repositórios públicos no GitHub) não exigem nenhum token ou autenticação.

### B) Codificação de Caminhos (`encodeURI` vs `encodeURIComponent`)
Ao passar caminhos de arquivos com espaços e subpastas para o `fetch`:
- `encodeURI("./css/Flexbox.md")`: Mantém as barras `/` das pastas intactas e codifica apenas espaços e caracteres especiais.
- `encodeURIComponent("css/Flexbox.md")`: Transforma as barras em `%2F` (`css%2FFlexbox.md`), fazendo o servidor falhar ao procurar a pasta.

---

## 6. Resumo de Bolso

| Conceito | O que faz? | Exemplo |
| :--- | :--- | :--- |
| `fetch(url)` | Faz uma requisição de rede assíncrona. | `await fetch("./artigo.md")` |
| `resposta.json()` | Converte a resposta em objeto/lista JavaScript. | Usado em APIs de dados. |
| `resposta.text()` | Converte a resposta em texto puro. | Usado para ler arquivos Markdown. |
| `try...catch` | Captura erros se a rede falhar ou a URL não existir. | Garante que o app não quebre. |
