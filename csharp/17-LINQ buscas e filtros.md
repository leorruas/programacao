# LINQ buscas e filtros em C#
#csharp

Imagine que você tem uma caixa cheia de pecinhas de LEGO misturadas. Se você quiser encontrar apenas as peças vermelhas que são quadradas, de forma manual, você teria que pegar pecinha por pecinha, olhar a cor, olhar o formato, e separar em outra pilha. Dá muito trabalho!

O **LINQ** (que significa *Language Integrated Query*, ou Consulta Integrada à Linguagem) é como uma **peneira inteligente com sensores de inteligência artificial**. Você simplesmente diz: *"Peneira, separe para mim as peças vermelhas e quadradas"* e, em um piscar de olhos, ela faz todo o trabalho duro e te entrega o resultado pronto!

---

## 1. Importando o LINQ

Para usar as ferramentas do LINQ, precisamos adicionar o namespace correspondente no topo do arquivo:

```csharp
using System.Linq;
```

---

## 2. Exemplos práticos dos métodos mais usados

Vamos fingir que temos uma lista de números e queremos filtrá-la:

```csharp
using System;
using System.Collections.Generic;
using System.Linq; // SUPER IMPORTANTE!

class Program
{
    static void Main()
    {
        List<int> numeros = new List<int> { 1, 8, 3, 12, 5, 20, 7 };

        // 1. Where: Filtra elementos com base em uma condição
        // A expressão 'n => n > 5' lê-se: "para cada número 'n', pegue se n for maior que 5"
        var maioresQueCinco = numeros.Where(n => n > 5);
        Console.WriteLine("Maiores que 5: " + string.Join(", ", maioresQueCinco)); // Saída: 8, 12, 20, 7

        // 2. OrderBy: Ordena os elementos
        var ordenados = numeros.OrderBy(n => n);
        Console.WriteLine("Ordenados: " + string.Join(", ", ordenados)); // Saída: 1, 3, 5, 7, 8, 12, 20

        // 3. FirstOrDefault: Pega o primeiro elemento que atende à condição ou null/padrão se não achar
        int primeiroMaiorQueDez = numeros.FirstOrDefault(n => n > 10);
        Console.WriteLine("Primeiro maior que 10: " + primeiroMaiorQueDez); // Saída: 12

        // 4. Any: Verifica se existe pelo menos um elemento que atende à condição (retorna true ou false)
        bool temNegativos = numeros.Any(n => n < 0);
        Console.WriteLine("Tem números negativos? " + temNegativos); // Saída: False

        // 5. Select: Transforma os elementos em outra coisa (ex: dobrar os valores)
        var dobro = numeros.Select(n => n * 2);
        Console.WriteLine("Valores dobrados: " + string.Join(", ", dobro));
    }
}
```

---

## 3. Filtrando objetos reais

O LINQ brilha de verdade quando filtramos listas de objetos complexos (como contas, produtos ou jogadores de um jogo):

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class Produto
{
    public string Nome { get; set; }
    public double Preco { get; set; }
    public string Categoria { get; set; }
}

class Program
{
    static void Main()
    {
        List<Produto> vitrine = new List<Produto>
        {
            new Produto { Nome = "Teclado Gamer", Preco = 150.00, Categoria = "Eletronicos" },
            new Produto { Nome = "Mouse", Preco = 80.00, Categoria = "Eletronicos" },
            new Produto { Nome = "Caderno", Preco = 15.00, Categoria = "Papelaria" },
            new Produto { Nome = "Monitor 4K", Preco = 1200.00, Categoria = "Eletronicos" }
        };

        // Queremos apenas os eletrônicos que custam menos de R$ 200, ordenados pelo preço
        var eletronicosBaratos = vitrine
            .Where(p => p.Categoria == "Eletronicos" && p.Preco < 200)
            .OrderBy(p => p.Preco);

        Console.WriteLine("--- Eletrônicos em promoção ---");
        foreach (var prod in eletronicosBaratos)
        {
            Console.WriteLine($"{prod.Nome} - R$ {prod.Preco:F2}");
        }
        // Saída:
        // Mouse - R$ 80.00
        // Teclado Gamer - R$ 150.00
    }
}
```

---

## Artigos relacionados:
* **[[09-Coleções em C#.md|09-Coleções em C#.md]]**
* **[[08-Métodos de arrays|08-Métodos de arrays.md]]**
