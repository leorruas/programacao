# Consumindo APIs em C# (Frontend vs Backend)
#csharp

No artigo anterior, vimos que o C# pode tanto **servir** uma API (como servidor) quanto **renderizar** interfaces (como cliente). Mas existe uma terceira situação muito comum no dia a dia: você precisa que o seu código C# **consuma** uma API de terceiros, ou seja, que ele faça pedidos para outro servidor e use os dados que receber.

Pense em integrar um sistema de pagamento, buscar a previsão do tempo, ou consultar um banco de dados externo. Em todos esses casos, o seu código C# é o **cliente** que faz a requisição, não o servidor que responde.

---

## A Analogia do Telefone

Imagine que você quer pedir uma pizza. Você não vai até a pizzaria fabricar a pizza do zero. Você pega o telefone, liga para a pizzaria (a API), faz o seu pedido (a requisição), e espera eles trazerem a pizza pronta (a resposta com os dados).

O `HttpClient` do C# é o seu telefone. Ele é a ferramenta que você usa para se comunicar com qualquer servidor externo. A pizzaria não precisa saber se você ligou de um celular Android ou de um telefone fixo, ela só precisa entender o pedido. Da mesma forma, a API não sabe se quem está consumindo é um backend C#, um frontend Blazor, ou um app mobile.

---

## 1. O HttpClient: a ferramenta principal

O `HttpClient` é a classe nativa do .NET para fazer requisições HTTP. Ele existe tanto no backend (ASP.NET Core) quanto no frontend (Blazor), mas o comportamento muda ligeiramente em cada contexto.

### Configuração correta: nunca crie HttpClient diretamente em loop

Um erro muito comum é criar uma instância de `HttpClient` a cada requisição. Isso esgota as conexões disponíveis do sistema operacional (um problema chamado *socket exhaustion*).

A forma correta é usar a **injeção de dependência** para registrar o `HttpClient` uma vez e reutilizá-lo:

```csharp
// Registrando no Program.cs (funciona tanto em ASP.NET Core quanto em Blazor WASM)
builder.Services.AddHttpClient();
```

---

## 2. Consumindo uma API no Backend (ASP.NET Core)

No backend, o seu servidor C# age como intermediário: ele recebe uma requisição do frontend, consulta uma API externa, e devolve o resultado processado para quem perguntou.

### Quando faz sentido consumir a API no backend?

- Quando a API externa exige uma **chave secreta** (API Key) que não pode ser exposta ao usuário
- Quando você precisa **combinar ou transformar dados** de várias APIs antes de entregar ao frontend
- Quando a API externa tem **restrições de CORS** que impedem chamadas diretas do navegador
- Quando você quer **fazer cache** dos resultados para não bater na API externa a cada requisição

### Exemplo: buscando dados de uma API externa no servidor

```csharp
// Arquivo: Program.cs
var builder = WebApplication.CreateBuilder(args);

// Registra o HttpClient com a URL base da API externa
builder.Services.AddHttpClient("ViaCep", client =>
{
    client.BaseAddress = new Uri("https://viacep.com.br/");
});

var app = builder.Build();

// Rota do seu servidor que consulta a API externa de CEP
app.MapGet("/cep/{codigo}", async (string codigo, IHttpClientFactory factory) =>
{
    var client = factory.CreateClient("ViaCep");

    // Faz a requisição para a API externa
    var resposta = await client.GetAsync($"ws/{codigo}/json/");

    if (!resposta.IsSuccessStatusCode)
        return Results.NotFound("CEP não encontrado.");

    // Lê e retorna o JSON para o seu frontend
    var conteudo = await resposta.Content.ReadAsStringAsync();
    return Results.Content(conteudo, "application/json");
});

app.Run();
```

Nesse fluxo:
1. O **frontend** pede `/cep/01310100` para o **seu servidor**
2. O **seu servidor** liga para `viacep.com.br` com o HttpClient
3. A **API do ViaCEP** responde com o endereço
4. O **seu servidor** entrega o resultado ao frontend

A chave de API (se houvesse uma) ficaria somente no servidor, nunca exposta ao navegador.

---

## 3. Consumindo uma API no Frontend (Blazor WebAssembly)

No Blazor WebAssembly, o C# roda diretamente no navegador do usuário. O `HttpClient` nesse contexto funciona sobre o `fetch` do próprio navegador por baixo dos panos, seguindo todas as regras de segurança do browser, inclusive o **CORS**.

### Quando faz sentido consumir a API diretamente no frontend?

- Quando a API é **pública e não exige segredos** (sem API Keys sensíveis)
- Quando você quer **reduzir a carga no seu servidor** deixando o trabalho para o cliente
- Quando a API já tem **CORS configurado** para aceitar chamadas de qualquer origem

### Exemplo: buscando dados no componente Blazor

```razor
@* Arquivo: BuscaCep.razor *@
@inject HttpClient Http

<h3>Busca de CEP</h3>

<input @bind="cep" placeholder="Digite o CEP" />
<button @onclick="BuscarEndereco">Buscar</button>

@if (endereco != null)
{
    <p>Rua: @endereco.Logradouro</p>
    <p>Cidade: @endereco.Localidade / @endereco.Uf</p>
}

@code {
    private string cep = string.Empty;
    private Endereco? endereco;

    private async Task BuscarEndereco()
    {
        // O HttpClient aqui é o navegador fazendo a requisição diretamente
        endereco = await Http.GetFromJsonAsync<Endereco>(
            $"https://viacep.com.br/ws/{cep}/json/"
        );
    }

    // Classe que mapeia o JSON de resposta para um objeto C#
    private class Endereco
    {
        public string Logradouro { get; set; } = string.Empty;
        public string Localidade { get; set; } = string.Empty;
        public string Uf { get; set; } = string.Empty;
    }
}
```

Aqui a requisição parte do computador do usuário, não do seu servidor. Se a API do ViaCEP bloqueasse chamadas de navegadores (CORS), esse código falharia e você precisaria mover a chamada para o backend.

---

## 4. Deserialização: transformando JSON em objetos C#

Quando a API responde, ela normalmente devolve um texto em formato JSON. O processo de converter esse texto em um objeto C# que você pode usar no código se chama **deserialização**.

O .NET tem o `System.Text.Json` nativo para fazer isso:

```csharp
using System.Text.Json;

// JSON recebido da API como texto
string json = """{"nome": "Leonardo", "idade": 25}""";

// Converte o texto JSON para um objeto C#
var pessoa = JsonSerializer.Deserialize<Pessoa>(json);

Console.WriteLine(pessoa?.Nome); // Saída: Leonardo

public class Pessoa
{
    public string Nome { get; set; } = string.Empty;
    public int Idade { get; set; }
}
```

O método `GetFromJsonAsync<T>()` usado no exemplo do Blazor faz exatamente isso de forma automática: faz a requisição e já deserializa o resultado em uma única linha.

---

## 5. Comparação: API no Backend vs Frontend

| Criterio | Backend (ASP.NET Core) | Frontend (Blazor WASM) |
| :--- | :--- | :--- |
| **Segurança de chaves** | Chave fica protegida no servidor | Chave fica exposta no navegador |
| **CORS** | Sem restrições (servidor fala com servidor) | Limitado pelas regras de CORS da API |
| **Cache** | Pode cachear resultados no servidor | Sem cache compartilhado entre usuários |
| **Carga no servidor** | Maior (seu servidor faz o trabalho) | Menor (o cliente faz o trabalho) |
| **Latência** | Depende da rede servidor-to-API | Depende da rede cliente-to-API |
| **Uso ideal** | APIs com segredos, transformação de dados | APIs públicas, apps desconectados |

---

## 6. Tratamento de Erros em Requisições HTTP

Requisições de rede podem falhar. O servidor externo pode estar fora do ar, o CEP pode não existir, ou a conexão pode cair. Sempre trate os erros:

```csharp
try
{
    var cliente = new HttpClient();
    var resposta = await cliente.GetAsync("https://api.exemplo.com/dados");

    // Lança uma exceção se o status for 4xx ou 5xx
    resposta.EnsureSuccessStatusCode();

    var dados = await resposta.Content.ReadAsStringAsync();
    Console.WriteLine(dados);
}
catch (HttpRequestException ex)
{
    Console.WriteLine($"Erro na requisição: {ex.Message}");
}
catch (TaskCanceledException)
{
    Console.WriteLine("A requisição demorou demais e foi cancelada (timeout).");
}
```

---

## Artigos relacionados:
* **[[csharp/24-Csharp no Frontend e Backend|Csharp no Frontend e Backend]]**
* **[[csharp/21-Tratamento de erros|Tratamento de erros]]**
* **[[csharp/19-Programação orientada a objetos|Programação orientada a objetos]]**
