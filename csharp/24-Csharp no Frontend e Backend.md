# C# no Frontend e Backend (Full Stack com uma linguagem so)
#csharp

A maioria das pessoas que começa a aprender programação web assume que precisa aprender pelo menos duas linguagens: uma para o **backend** (o servidor, a logica, o banco de dados) e outra para o **frontend** (a interface, o visual, o que o usuario ve). JavaScript domina o frontend, Python ou Java dominam o backend, e parece que voce sempre vai precisar de pelo menos dois mundos diferentes.

O C# quebra essa logica. Com ele, e possivel construir o sistema inteiro, desde o servidor ate a interface do navegador, usando uma unica linguagem.

---

## A Analogia do Restaurante

Para entender a divisao entre frontend e backend, pense em um restaurante:

* **Frontend (O Salao):** E tudo que o cliente ve e interage diretamente. As mesas, o cardapio, o garcom que anota o pedido. E a experiencia visual e de navegacao.
* **Backend (A Cozinha):** E tudo que acontece por baixo, longe dos olhos do cliente. O chef preparando o prato, o estoque de ingredientes, as receitas e as regras de como cada prato e feito.
* **A Linguagem de Comunicacao:** O garcom e o intermediario. Ele leva o pedido do cliente (frontend) para a cozinha (backend) e traz de volta o resultado (os dados do servidor).

Normalmente, o salao fala uma lingua (JavaScript) e a cozinha fala outra (Java, Python). Com C# e o ecossistema .NET, voce pode ter o mesmo chef gerenciando tanto a cozinha quanto treinando o garcom para falar a mesma lingua.

---

## 1. C# no Backend com ASP.NET Core

A ferramenta principal para usar C# no servidor e o **ASP.NET Core**, um framework gratuito e de alto desempenho da Microsoft para construir APIs, sites e servicos web.

### O que e uma API?

Uma API (Application Programming Interface) e o garcom do nosso restaurante: ela recebe pedidos do frontend (ou de qualquer outro cliente), executa a logica no servidor e devolve uma resposta, normalmente em formato JSON.

```csharp
// Arquivo: Program.cs - Uma API minima com ASP.NET Core
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Define uma rota: quando alguem acessar "/saudacao", retorna esse texto
app.MapGet("/saudacao", () => "Ola, mundo! Resposta do servidor C#.");

app.Run();
```

Com apenas esse codigo, voce tem um servidor web funcional rodando em C#. Quando alguem acessa `/saudacao` no navegador, o servidor responde.

### Retornando dados estruturados (JSON)

Na pratica, as APIs retornam dados estruturados. Em vez de texto puro, devolvemos objetos que o frontend pode interpretar:

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

O **Blazor** e a resposta da Microsoft para construir interfaces web interativas usando C# no lugar de JavaScript. Em vez de escrever scripts `.js`, voce escreve componentes `.razor` com logica em C# diretamente.

### Como o Blazor funciona?

Existem dois modos principais:

* **Blazor Server:** O C# roda no servidor. O navegador se comunica com o servidor em tempo real via uma conexao persistente (SignalR). Cada clique do usuario envia uma mensagem para o servidor que recalcula a interface e manda de volta apenas as mudancas.
* **Blazor WebAssembly:** O C# roda **diretamente no navegador** do usuario. O .NET e compilado para WebAssembly (um formato binario que todos os navegadores modernos entendem), e o codigo C# executa na maquina do cliente, sem precisar de servidor para cada interacao.

### Exemplo de um componente Blazor

Um componente Blazor e como uma pagina com HTML e C# juntos no mesmo arquivo:

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

Nesse exemplo, o botao e HTML, mas o evento de clique (`@onclick`) chama o metodo `Incrementar()`, que e C# puro. O Blazor cuida de atualizar o numero na tela automaticamente.

---

## 3. A Vantagem de Compartilhar Codigo

A maior vantagem de usar C# no frontend e backend nao e apenas usar a mesma linguagem: e poder **reutilizar o mesmo codigo nos dois lados**.

Imagine que voce criou uma classe `Produto` para validar os dados no seu servidor. Com Blazor WebAssembly, voce pode usar essa mesma classe no frontend para validar o formulario do usuario antes mesmo de enviar para o servidor, sem duplicar nenhuma linha de codigo.

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

| Cenario | Ferramenta recomendada |
| :--- | :--- |
| API para servir dados para qualquer cliente (mobile, web, etc.) | ASP.NET Core (API REST) |
| Site com muito conteudo dinamico e foco em SEO | ASP.NET Core MVC ou Razor Pages |
| Aplicativo web complexo, como um painel de controle interno | Blazor Server |
| Aplicativo web que precisa funcionar offline ou com baixa latencia | Blazor WebAssembly |
| Projeto que quer reutilizar codigo C# entre servidor e cliente | Blazor WebAssembly + ASP.NET Core |

---

## 5. O Ecossistema .NET como ponto de partida

Ao escolher C# para full stack, voce herda todo o ecossistema .NET:

* **Entity Framework Core:** Para se comunicar com bancos de dados (SQL Server, PostgreSQL, SQLite) escrevendo C# em vez de SQL bruto.
* **SignalR:** Para comunicacao em tempo real entre servidor e cliente (chats, dashboards ao vivo).
* **Identity:** Autenticacao e autorizacao de usuarios ja pronta para usar.
* **NuGet:** O gerenciador de pacotes do .NET, com milhares de bibliotecas disponiveis.

---

## Artigos relacionados:
* **[[01-Introdução ao Csharp|Introdução ao Csharp]]**
* **[[13-Programação orientada a objetos|Programacao orientada a objetos]]**
* **[[14-Tratamento de erros|Tratamento de erros]]**
* **[[17-LINQ buscas e filtros|LINQ buscas e filtros]]**
