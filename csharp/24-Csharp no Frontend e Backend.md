# C# no Frontend e Backend (Full Stack com uma linguagem so)
#csharp

A maioria das pessoas que começa a aprender programação web assume que precisa aprender pelo menos duas linguagens: uma para o **backend** (o servidor, a lógica, o banco de dados) e outra para o **frontend** (a interface, o visual, o que o usuário ve). JavaScript domina o frontend, Python ou Java dominam o backend, e parece que você sempre vai precisar de pelo menos dois mundos diferentes.

O C# quebra essa lógica. Com ele, e possível construir o sistema inteiro, desde o servidor até a interface do navegador, usando uma única linguagem.

---

## A Analogia do Restaurante

Para entender a divisão entre frontend e backend, pense em um restaurante:

* **Frontend (O Salão):** E tudo que o cliente ve e interage diretamente. As mesas, o cardápio, o garçom que anota o pedido. E a experiência visual e de navegação.
* **Backend (A Cozinha):** E tudo que acontece por baixo, longe dos olhos do cliente. O chef preparando o prato, o estoque de ingredientes, as receitas e as regras de como cada prato e feito.
* **A Linguagem de Comunicação:** O garçom e o intermediario. Ele leva o pedido do cliente (frontend) para a cozinha (backend) e traz de volta o resultado (os dados do servidor).

Normalmente, o salão fala uma língua (JavaScript) e a cozinha fala outra (Java, Python). Com C# e o ecossistema .NET, você pode ter o mesmo chef gerenciando tanto a cozinha quanto treinando o garçom para falar a mesma língua.

---

## 1. C# no Backend com ASP.NET Core

A ferramenta principal para usar C# no servidor e o **ASP.NET Core**, um framework gratuito e de alto desempenho da Microsoft para construir APIs, sites e servicos web.

### O que e uma API?

Uma API (Application Programming Interface) e o garçom do nosso restaurante: ela recebe pedidos do frontend (ou de qualquer outro cliente), executa a lógica no servidor e devolve uma resposta, normalmente em formato JSON.

```csharp
// Arquivo: Program.cs - Uma API minima com ASP.NET Core
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Define uma rota: quando alguem acessar "/saudacao", retorna esse texto
app.MapGet("/saudacao", () => "Ola, mundo! Resposta do servidor C#.");

app.Run();
```

Com apenas esse código, você tem um servidor web funcional rodando em C#. Quando alguém acessa `/saudacao` no navegador, o servidor responde.

### Retornando dados estruturados (JSON)

Na prática, as APIs retornam dados estruturados. Em vez de texto puro, devolvemos objetos que o frontend pode interpretar:

```csharp
app.MapGet("/produto/{id}", (int id) =>
{
    // Simula buscar um produto do banco de dados pelo ID
    var produto = new { Id = id, Nome = "Teclado Mecanico", Preco = 350.00 };
    return Results.Ok(produto);
});
```

Quando o frontend acessa `/produto/1`, recebe de volta um JSON como:
```json
{
  "id": 1,
  "nome": "Teclado Mecanico",
  "preco": 350.00
}
```

---

## 2. C# no Frontend com Blazor

O **Blazor** e a resposta da Microsoft para construir interfaces web interativas usando C# no lugar de JavaScript. Em vez de escrever scripts `.js`, você escreve componentes `.razor` com lógica em C# diretamente.

### Como o Blazor funciona?

Existem dois modos principais:

* **Blazor Server:** O C# roda no servidor. O navegador se comunica com o servidor em tempo real via uma conexao persistente (SignalR). Cada clique do usuário envia uma mensagem para o servidor que recalcula a interface e manda de volta apenas as mudancas.
* **Blazor WebAssembly:** O C# roda **diretamente no navegador** do usuário. O .NET e compilado para WebAssembly (um formato binário que todos os navegadores modernos entendem), e o código C# executa na maquina do cliente, sem precisar de servidor para cada interação.

### Exemplo de um componente Blazor

Um componente Blazor e como uma página com HTML e C# juntos no mesmo arquivo:

```razor
@* Arquivo: Contador.razor *@

<h3>Contador: @contagem</h3>
<button @onclick="Incrementar">Clique aqui</button>

@code {
    private int contagem = 0;

    private void Incrementar()
    {
        contagem++;
    }
}
```

Nesse exemplo, o botão e HTML, mas o evento de clique (`@onclick`) chama o método `Incrementar()`, que e C# puro. O Blazor cuida de atualizar o número na tela automaticamente.

---

## 3. A Vantagem de Compartilhar Código

A maior vantagem de usar C# no frontend e backend não e apenas usar a mesma linguagem: e poder **reutilizar o mesmo código nos dois lados**.

Imagine que você criou uma classe `Produto` para validar os dados no seu servidor. Com Blazor WebAssembly, você pode usar essa mesma classe no frontend para validar o formulário do usuário antes mesmo de enviar para o servidor, sem duplicar nenhuma linha de código.

```csharp
// Arquivo: Produto.cs - Codigo compartilhado entre frontend e backend
public class Produto
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public decimal Preco { get; set; }

    // Essa validacao roda no servidor E no navegador, sem duplicar codigo
    public bool EhValido() => !string.IsNullOrEmpty(Nome) && Preco > 0;
}
```

---

## 4. Quando usar cada abordagem?

| Cenário | Ferramenta recomendada |
| :--- | :--- |
| API para servir dados para qualquer cliente (mobile, web, etc.) | ASP.NET Core (API REST) |
| Site com muito conteúdo dinâmico e foco em SEO | ASP.NET Core MVC ou Razor Pages |
| Aplicativo web complexo, como um painel de controle interno | Blazor Server |
| Aplicativo web que precisa funcionar offline ou com baixa latência | Blazor WebAssembly |
| Projeto que quer reutilizar código C# entre servidor e cliente | Blazor WebAssembly + ASP.NET Core |

---

## 5. O Ecossistema .NET como ponto de partida

Ao escolher C# para full stack, você herda todo o ecossistema .NET:

* **Entity Framework Core:** Para se comunicar com bancos de dados (SQL Server, PostgreSQL, SQLite) escrevendo C# em vez de SQL bruto.
* **SignalR:** Para comunicação em tempo real entre servidor e cliente (chats, dashboards ao vivo).
* **Identity:** Autenticação e autorização de usuários já pronta para usar.
* **NuGet:** O gerenciador de pacotes do .NET, com milhares de bibliotecas disponíveis.

---

## Artigos relacionados:
* **[[csharp/01-Introdução ao Csharp|Introdução ao Csharp]]**
* **[[csharp/19-Programação orientada a objetos|Programação orientada a objetos]]**
* **[[csharp/21-Tratamento de erros|Tratamento de erros]]**
* **[[csharp/23-LINQ buscas e filtros|LINQ buscas e filtros]]**
