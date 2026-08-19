# ASP e Microsoft SQL Server: A Fundação das Aplicações Web Corporativas

O desenvolvimento web moderno é sustentado por arquiteturas que separam a apresentação visual, a lógica de negócios e o armazenamento de dados. No ecossistema da Microsoft, a combinação entre **ASP** (tanto o lendário *Classic ASP* quanto o robusto *ASP.NET / ASP.NET Core*) e o **Microsoft SQL Server** é uma das duplas mais históricas e influentes da tecnologia corporativa.

Este artigo detalha o funcionamento dessa integração, a evolução histórica, exemplos práticos de código e as melhores práticas para construir aplicações dinâmicas e seguras.

---

## 1. O Mapa da Arquitetura: Servidor de Aplicação + Banco de Dados

Para entender a relação entre o ASP e o SQL Server, é preciso visualizar como os dados fluem da requisição do usuário no navegador até o disco rígido do servidor.

```mermaid
flowchart LR
    Client["Navegador (Cliente)\nHTML / CSS / JS"] -->|1. Requisição HTTP| IIS["Servidor Web (IIS)\nExecuta ASP / ASP.NET"]
    IIS -->|2. Consulta SQL (T-SQL)| SQLServer[("Microsoft SQL Server\nTabelas / Stored Procedures")]
    SQLServer -->|3. Conjunto de Dados (Recordset/Objects)| IIS
    IIS -->|4. Renderiza HTML / JSON| Client
```

1. **Cliente (Navegador):** Envia uma requisição HTTP (ex: enviando um formulário de login ou buscando uma lista de produtos).
2. **Servidor Web (IIS + ASP):** O script ASP processa a lógica de negócios no lado do servidor (Server-Side).
3. **Banco de Dados (SQL Server):** O ASP estabelece uma conexão via protocolo TDS (Tabular Data Stream) ou drivers de banco, enviando comandos T-SQL.
4. **Resposta:** O SQL Server retorna os registros; o ASP formata esses dados (seja montando páginas HTML dinâmicas ou enviando JSON para APIs) e entrega ao cliente.

---

## 2. Entendendo as Tecnologias

### O que é o ASP?
* **Classic ASP (1996):** Lançado com o IIS 3.0, foi a primeira tecnologia de servidor da Microsoft para criar páginas HTML dinâmicas usando linguagens de script como **VBScript** ou JScript. Os scripts eram interpretados linha por linha dentro de páginas `.asp`.
* **ASP.NET & ASP.NET Core (2002 - Presente):** Evolução completa baseada em código compilado (**C#** / VB.NET). O ASP.NET Core atual é de altíssima performance, multiplataforma (roda em Windows, Linux e macOS) e é líder em benchmarks de APIs corporativas.

### O que é o SQL Server?
O **Microsoft SQL Server** é um Sistema Gerenciador de Banco de Dados Relacional (SGBDR) corporativo. Ele utiliza a linguagem **T-SQL** (Transact-SQL), oferecendo recursos avançados como:
* Transações ACID rigorosas.
* Stored Procedures (Procedimentos Armazenados) e Triggers.
* Suporte nativo a tipos JSON, XML e dados espaciais.
* Segurança granular e criptografia de dados em repouso (TDE).

---

## 3. Classic ASP com SQL Server (A Era Legada)

No Classic ASP, a comunicação com o SQL Server era realizada através da tecnologia **ADO** (*ActiveX Data Objects*) conectando via OLE DB ou ODBC.

### Exemplo em VBScript (Classic ASP com Consulta Parametrizada)

> [!IMPORTANT]
> Em aplicações legadas, era comum ver concatenação direta de strings na SQL, o que gerava vulnerabilidades críticas de **SQL Injection**. Abaixo está a forma correta usando `ADODB.Command` e parâmetros:

```asp
<%@ Language=VBScript %>
<%
Option Explicit

Dim conn, cmd, rs, connectionString, idCategoria

idCategoria = Request.QueryString("cat")

' 1. String de Conexão com o SQL Server
connectionString = "Provider=MSOLEDBSQL;Data Source=localhost;Initial Catalog=MinhaLoja;Integrated Security=SSSS;"

' 2. Criar e abrir conexão
Set conn = Server.CreateObject("ADODB.Connection")
conn.Open connectionString

' 3. Criar comando parametrizado para evitar SQL Injection
Set cmd = Server.CreateObject("ADODB.Command")
Set cmd.ActiveConnection = conn
cmd.CommandText = "SELECT IdProduto, Nome, Preco FROM Produtos WHERE IdCategoria = ? AND Ativo = 1"
cmd.CommandType = 1 ' adCmdText

' Adicionar parâmetro
cmd.Parameters.Append cmd.CreateParameter("@IdCategoria", 3, 1, , idCategoria) ' 3 = adInteger, 1 = adParamInput

' 4. Executar e obter o Recordset
Set rs = cmd.Execute()
%>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Lista de Produtos - Classic ASP</title>
</head>
<body>
    <h1>Produtos da Categoria</h1>
    <ul>
    <%
    Do Until rs.EOF
        Response.Write "<li>" & Server.HTMLEncode(rs("Nome")) & " - R$ " & FormatNumber(rs("Preco"), 2) & "</li>"
        rs.MoveNext
    Loop
    
    ' Fechar objetos
    rs.Close
    conn.Close
    Set rs = Nothing
    Set cmd = Nothing
    Set conn = Nothing
    %>
    </ul>
</body>
</html>
```

---

## 4. ASP.NET Core & SQL Server (A Era Moderna)

Nas aplicações modernas em **C#**, o ASP.NET Core interage com o SQL Server de duas maneiras principais:
1. **ADO.NET Puro / `Microsoft.Data.SqlClient`:** Para controle total da SQL e máxima performance em operações de baixo nível.
2. **Object-Relational Mapping (ORM) com Entity Framework Core:** Para mapear tabelas diretamente em classes C#, permitindo consultas fortemente tipadas via LINQ.

### Exemplo Moderno: C# + Entity Framework Core em ASP.NET Core API

#### 1. Definindo a Entidade e o Contexto (`DbContext`)

```csharp
using Microsoft.EntityFrameworkCore;

namespace MinhaApi.Models
{
    // Mapeamento da Tabela [Produtos] do SQL Server
    public class Produto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public decimal Preco { get; set; }
        public int IdCategoria { get; set; }
        public bool Ativo { get; set; }
    }

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Produto> Produtos => Set<Produto>();
    }
}
```

#### 2. Configurando a Injeção de Dependência (`Program.cs`)

```csharp
using Microsoft.EntityFrameworkCore;
using MinhaApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Obter a string de conexão configurada no appsettings.json
var connectionString = builder.Configuration.GetConnectionString("SqlDefaultConnection");

// Registrar o DbContext com SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddControllers();

var app = builder.Build();

app.UseAuthorization();
app.MapControllers();

app.Run();
```

#### 3. Controller com Operações Assíncronas (Injeção de Dependência + LINQ)

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MinhaApi.Models;

namespace MinhaApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProdutosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/produtos/categoria/5
        [HttpGet("categoria/{idCategoria:int}")]
        public async Task<ActionResult<IEnumerable<Produto>>> GetPorCategoria(int idCategoria)
        {
            // O Entity Framework traduz esta consulta LINQ para T-SQL parametrizado no SQL Server
            var produtos = await _context.Produtos
                .Where(p => p.IdCategoria == idCategoria && p.Ativo)
                .AsNoTracking() // Otimização de leitura
                .ToListAsync();

            return Ok(produtos);
        }
    }
}
```

---

## 5. Boas Práticas de Integração ASP + SQL Server

Para garantir disponibilidade, segurança e alta performance em ambientes de produção corporativos:

### 1. Prevenção de SQL Injection
* **Nunca** concatene dados fornecidos pelo usuário em strings SQL (`"SELECT * FROM Users WHERE Email = '" + email + "'"`).
* Utilize **consultas parametrizadas**, **Stored Procedures** ou um **ORM** (como EF Core ou Dapper), que tratam a sanitização automaticamente.

### 2. Gerenciamento do Pool de Conexões (Connection Pooling)
* Abrir uma conexão física de rede com o SQL Server é uma operação dispendiosa.
* O driver do ASP/ADO.NET reutiliza conexões transparentemente via Pool.
* **Regra de Ouro:** Abra a conexão o mais tarde possível e feche-a (ou dê `dispose`) o mais rápido possível (`using` em C# / `conn.Close` em VBScript).

### 3. Programação Assíncrona (`async/await`) no ASP.NET
* Consultas a bancos de dados envolvem E/S (Entrada/Saída) de rede.
* Usar `async/await` libera as threads do servidor de aplicação (IIS) enquanto o SQL Server processa a resposta, permitindo que o servidor atenda a milhares de requisições concorrentes adicionais.

### 4. Uso Estratégico de Stored Procedures
* Para operações complexas com múltiplas regras de negócio e alto volume de dados, crie Stored Procedures diretamente no SQL Server. Isso pré-compila o plano de execução e reduz a trafegabilidade de texto SQL pela rede.

---

## 6. Resumo e Conclusão

| Característica | Classic ASP + ADO | ASP.NET Core + EF Core / SQL Server |
| :--- | :--- | :--- |
| **Linguagem** | VBScript / JScript (Interpretada) | C# (Compilada e Multiplataforma) |
| **Acesso a Dados** | ADO Recordset / Command | Entity Framework Core / Dapper / SqlClient |
| **Segurança por Padrão** | Manual (Requer atenção com SQLi) | Alta (LINQ e parâmetros automáticos) |
| **Desempenho** | Limitado a Single-Thread no IIS | Ultra performático, suporte Assíncrono (`async`) |
| **Uso Atual** | Manutenção de sistemas legados | Novo desenvolvimento de APIs e portais corporativos |

A união de **ASP** e **SQL Server** moldou a web corporativa da virada do milênio e continua extremamente relevante. Enquanto o *Classic ASP* permanece em manutenção em sistemas legados, o *ASP.NET Core com SQL Server* lidera o desenvolvimento de software de alta escala moderno com segurança, tipagem forte e performance de ponta.
