# Como Conectar Csharp no HTML (Backend C# + Frontend JS)
#csharp #web #backend #frontend

Quando começamos a estudar desenvolvimento web, vemos de um lado o **C#** rodando no terminal/servidor e, do outro, o **HTML, CSS e JavaScript** criando telas no navegador. A pergunta natural que surge é: *como exatamente essas duas pontas se conversam na prática?*

Este artigo é a peça integradora que explica o fluxo completo de comunicação entre um servidor backend em C# e uma interface frontend em HTML/JS.

---

## A Analogia do Drive-Thru

Para entender o fluxo de conexão, pense em uma lanchonete com sistema de Drive-Thru:

* **O Cliente no Carro (Frontend - HTML/CSS/JS):** Fica do lado de fora. Ele vê o painel com as fotos dos lanches (HTML/CSS) e usa a voz para fazer um pedido (JavaScript / `fetch()`).
* **A Janela de Pedidos (API HTTP / JSON):** É o ponto de contato oficial. O cliente fala o código do pedido, e a janela devolve uma caixinha fechada com a refeição dentro (dados em formato JSON).
* **A Cozinha (Backend - C# / ASP.NET Core):** Fica escondida nos fundos. O chef (código C#) recebe a comanda, consulta o estoque (banco de dados), prepara os ingredientes, valida as regras do negócio e embala o resultado para ser entregue na janela.

O cliente nunca entra na cozinha, e a cozinha não sabe qual marca de carro o cliente está dirigindo. Eles conversam exclusivamente através da mensagem passada pela janela.

---

## 1. O Papel de Cada Tecnologia no Sistema

| Camada | Tecnologias | Responsabilidade |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript | Estrutura visual, estilo, eventos de clique e chamadas de rede no navegador. |
| **Ponte de Comunicação** | HTTP / JSON | Formato padronizado de texto para transporte de dados pela rede. |
| **Backend** | C# (ASP.NET Core / Web API) | Regras de negócio, segurança, validações e comunicação com banco de dados. |

---

## 2. O Contrato de Comunicação: JSON

Para que o C# consiga enviar informações que o JavaScript no navegador entenda perfeitamente, usamos o formato **JSON** (JavaScript Object Notation). 

Um objeto de produto no C#:
```csharp
public class Produto
{
    public int Id { get; set; } = 1;
    public string Nome { get; set; } = "Teclado Mecanico";
    public decimal Preco { get; set; } = 250.00m;
}
```

É convertido automaticamente pelo ASP.NET Core para este texto JSON ao ser enviado para o navegador:
```json
{
  "id": 1,
  "nome": "Teclado Mecanico",
  "preco": 250.00
}
```

---

## 3. Passo 1: Criando o Backend em C# (API REST)

No C#, usando o **ASP.NET Core Minimal API**, criamos um servidor web que escuta requisições em uma porta (por exemplo, `http://localhost:5000`) e responde dados em JSON:

```csharp
// Arquivo: Program.cs (Backend C#)
var builder = WebApplication.CreateBuilder(args);

// Habilita o CORS para permitir que o navegador faça chamadas de outra porta
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirTudo", policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();
app.UseCors("PermitirTudo");

// Rota 1: Retorna uma lista de produtos
app.MapGet("/api/produtos", () =>
{
    var produtos = new[]
    {
        new { Id = 1, Nome = "Teclado Mecanico", Preco = 250.00 },
        new { Id = 2, Nome = "Mouse Gamut", Preco = 120.00 },
        new { Id = 3, Nome = "Monitor 144Hz", Preco = 990.00 }
    };

    return Results.Ok(produtos);
});

app.Run();
```

---

## 4. Passo 2: Criando o Frontend (HTML + CSS + JS)

No navegador, temos um arquivo HTML simples com um botão e uma lista vazia onde os produtos serão inseridos dinamicamente:

```html
<!-- Arquivo: index.html -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catálogo de Produtos</title>
    <style>
        body { font-family: sans-serif; padding: 20px; }
        .produto-card { border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; border-radius: 5px; }
    </style>
</head>
<body>

    <h1>Catálogo de Produtos</h1>
    <button id="btnCarregar">Carregar Produtos do Backend</button>

    <div id="listaProdutos" style="margin-top: 20px;"></div>

    <script src="app.js"></script>
</body>
</html>
```

---

## 5. Passo 3: O Momento da Conexão (O `fetch()` no JavaScript)

O código JavaScript no arquivo `app.js` escuta o clique do botão, dispara a requisição HTTP para o servidor C#, recebe o JSON e monta os elementos HTML na tela:

```javascript
// Arquivo: app.js (Frontend JS)
const btnCarregar = document.getElementById("btnCarregar");
const listaProdutos = document.getElementById("listaProdutos");

btnCarregar.addEventListener("click", async () => {
    try {
        // 1. Faz a ligação (HTTP GET) para o servidor C#
        const resposta = await fetch("http://localhost:5000/api/produtos");

        if (!resposta.ok) {
            throw new Error("Erro ao consultar o servidor em C#");
        }

        // 2. Converte a caixinha JSON recebida em um array JavaScript
        const produtos = await resposta.json();

        // 3. Limpa a lista anterior
        listaProdutos.innerHTML = "";

        // 4. Monta os elementos HTML para cada item recebido do C#
        produtos.forEach(produto => {
            const card = document.createElement("div");
            card.className = "produto-card";
            card.innerHTML = `
                <h3>${produto.nome}</h3>
                <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
            `;
            listaProdutos.appendChild(card);
        });

    } catch (erro) {
        listaProdutos.innerHTML = `<p style="color: red;">${erro.message}</p>`;
    }
});
```

---

## 6. Duas Formas de Conectar C# com HTML

Existem duas abordagens arquiteturais principais para conectar C# com HTML:

### Abordagem A: API Decoplada (Backend C# + Frontend JS) — O modelo moderno
* **Como funciona:** O C# só devolve JSON. O HTML/JS roda de forma totalmente independente no navegador ou em frameworks como React/Vue/Angular.
* **Vantagem:** A mesma API em C# serve a aplicação web, o aplicativo mobile Android/iOS e integrações com terceiros.

### Abordagem B: Renderização no Servidor (Razor Pages / ASP.NET MVC)
* **Como funciona:** O C# junta os dados com o HTML **dentro do próprio servidor** e envia o HTML já pronto e preenchido para o navegador.
* **Vantagem:** Mais simples de inicializar, excelente para SEO e não exige escrever muito código JavaScript para manipular a tela.

```html
<!-- Exemplo de arquivo Razor (.cshtml) onde C# e HTML se fundem no servidor -->
@model List<Produto>

<h1>Lista de Produtos</h1>
<ul>
    @foreach (var produto in Model)
    {
        <li>@produto.Nome - R$ @produto.Preco</li>
    }
</ul>
```

---

## 7. Cuidados Essenciais na Conexão

1. **CORS (Cross-Origin Resource Sharing):** Se o seu frontend HTML roda em uma porta (ex: `localhost:5500`) e o C# em outra (ex: `localhost:5000`), o navegador vai bloquear a chamada por segurança a menos que você habilite a política de CORS no C#.
2. **Métodos HTTP:** 
   - `GET` para buscar dados do C#
   - `POST` para enviar novos formulários ao C#
   - `PUT`/`PATCH` para atualizar dados
   - `DELETE` para remover informações
3. **Tratamento de Status:** Sempre trate respostas com código `404` (Não encontrado), `500` (Erro interno do C#) e `401` (Não autorizado).

---

## Artigos relacionados:
* **[[csharp/24-Csharp no Frontend e Backend|Csharp no Frontend e Backend]]**
* **[[csharp/25-Consumindo APIs em Csharp|Consumindo APIs em Csharp]]**
* **[[csharp/14-Coleções em Csharp|Coleções em Csharp]]**
* **[[csharp/19-Programação orientada a objetos|Programação orientada a objetos]]**
