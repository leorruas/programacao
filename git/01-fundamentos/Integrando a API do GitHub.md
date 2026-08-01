# Como Integrar a API do GitHub no seu Frontend

A **API REST do GitHub** permite que você interaja com dados públicos e privados do GitHub (repositórios, perfis, commits, etc.) diretamente pelo seu código. Como seu projeto já utiliza JavaScript assíncrono com `fetch` e `async/await`, integrar a API do GitHub será muito simples!

Neste artigo, vamos aprender:
1. Como acessar dados públicos (como seus repositórios).
2. Como fazer a requisição usando `fetch`.
3. Como integrar esses resultados na interface de cards do seu app.
4. Cuidados importantes (como limites de requisições).

---

## 1. O Endpoint Público

Para consultar os repositórios públicos de qualquer usuário, o GitHub disponibiliza a seguinte URL (endpoint):
```text
https://api.github.com/users/{USERNAME}/repos
```

No seu caso, para buscar os seus repositórios públicos, a URL será:
```text
https://api.github.com/users/leorruas/repos
```

Se você abrir essa URL no seu navegador, verá um arquivo JSON contendo uma lista de objetos, onde cada objeto representa um repositório seu com informações como `name` (nome), `description` (descrição), `html_url` (link) e `stargazers_count` (estrelas).

---

## 2. Fazendo a Requisição com `fetch`

Assim como você fez para ler os arquivos locais do seu vault, usaremos `fetch` com `async/await`. 

Aqui está uma função simples para buscar e listar seus repositórios no console:

```javascript
async function buscarRepositoriosDoGitHub(usuario) {
    try {
        const resposta = await fetch(`https://api.github.com/users/${usuario}/repos`);
        
        // Verifica se a requisição foi bem sucedida
        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status}`);
        }

        const repositorios = await resposta.json();
        console.log(repositorios); // Lista de repositórios obtida com sucesso!
        return repositorios;
    } catch (erro) {
        console.error("Erro ao buscar repositórios no GitHub:", erro);
    }
}
```

---

## 3. Integrando no seu App de Pesquisa

Podemos adaptar a sua função `buscar` para que, além dos arquivos locais, ela também pesquise seus repositórios no GitHub ou mostre-os dinamicamente.

Aqui está um exemplo prático de como você pode reescrever a função para listar seus repositórios do GitHub na tela em formato de **cards**:

```javascript
// Selecionando os elementos do seu HTML
const containerResultados = document.querySelector(".cards-container");

async function carregarRepositoriosDoGitHub(usuario) {
    containerResultados.innerHTML = `<div class="card"><h2>Buscando no GitHub...</h2></div>`;
    
    try {
        const resposta = await fetch(`https://api.github.com/users/${usuario}/repos`);
        
        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os repositórios.");
        }

        const repos = await resposta.json();
        containerResultados.innerHTML = ""; // Limpa a mensagem de busca

        if (repos.length === 0) {
            containerResultados.innerHTML = `<div class="card"><h2>Nenhum repositório encontrado.</h2></div>`;
            return;
        }

        // Adiciona um card para cada repositório encontrado
        repos.forEach(repo => {
            const descricao = repo.description || "Sem descrição disponível.";
            containerResultados.innerHTML += `
                <div class="card">
                    <h2>${repo.name}</h2>
                    <div class="conteudo">
                        <p>${descricao}</p>
                        <a href="${repo.html_url}" target="_blank" class="repo-link">Ver no GitHub</a>
                    </div>
                </div>
            `;
        });

    } catch (erro) {
        containerResultados.innerHTML = `
            <div class="card">
                <h2>Erro ao carregar dados</h2>
                <p>${erro.message}</p>
            </div>
        `;
    }
}
```

---

## 4. Cuidados importantes: Limites de Requisição (Rate Limit)

A API do GitHub possui regras para evitar abusos:
* **Sem autenticação**: Você pode fazer no máximo **60 requisições por hora** por endereço de IP.
* **Com autenticação**: Se você usar um token de acesso pessoal (PAT), esse limite sobe para **5.000 requisições por hora**.

### Como gerar um Token (Se precisar de mais requisições):
1. No GitHub, vá em **Settings** > **Developer Settings** > **Personal Access Tokens** > **Tokens (classic)**.
2. Gere um novo token apenas com permissões de leitura pública (`read:user`, `repo`).
3. Para usar no `fetch`, envie o token nos cabeçalhos (headers):

```javascript
const resposta = await fetch(`https://api.github.com/users/${usuario}/repos`, {
    headers: {
        "Authorization": `token SEU_TOKEN_AQUI`
    }
});
```

> ⚠️ **ATENÇÃO:** Nunca faça o commit do seu Token diretamente no código se o repositório for público, pois robôs varrem o GitHub buscando tokens expostos e o GitHub irá cancelá-lo instantaneamente por segurança.
