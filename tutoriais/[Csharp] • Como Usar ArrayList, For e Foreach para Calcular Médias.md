# [Csharp] • Como Usar ArrayList, For e Foreach para Calcular Médias

#csharp #tutorial

Neste tutorial, vamos aprender passo a passo a construir um programa em C# que resolve o seguinte problema:
> **Desafio:** Ler 5 números inteiros do teclado, salvá-los em um `ArrayList`, calcular a média matemática desses números e, no final, exibir apenas os números que ficaram acima da média calculada.
>
> **Regras:**
> 1. A leitura dos 5 números deve ser feita usando um loop **`for`**.
> 2. A exibição dos resultados acima da média deve ser feita usando um loop **`foreach`**.

---

## Passo 1: Preparando a estrutura

Para começar, precisamos importar o pacote de coleções antigas (`System.Collections`) que contém o `ArrayList`.

```csharp
using System;
using System.Collections; // IMPORTANTE: Necessário para usar o ArrayList!

class Program
{
    static void Main()
    {
        // 1. Inicializamos o ArrayList para guardar os números
        ArrayList listaNumeros = new ArrayList();
        
        // 2. Variável para somar todos os valores e calcular a média depois
        int somaTotal = 0;
```

---

## Passo 2: Lendo os números com o loop `for`

Usamos o `for` porque sabemos exatamente a quantidade de repetições (5 vezes). A cada repetição, vamos ler um valor do teclado, convertê-lo de texto para número, acumulá-lo na soma total e adicioná-lo ao `ArrayList` com `.Add()`.

```csharp
        Console.WriteLine("--- Digite 5 números inteiros ---");

        for (int i = 1; i <= 5; i++)
        {
            Console.Write($"Digite o {i}º número: ");
            
            // Lê o texto digitado e converte para número inteiro
            int numero = int.Parse(Console.ReadLine());
            
            // Adiciona o número ao ArrayList
            listaNumeros.Add(numero);
            
            // Acumula na soma total
            somaTotal += numero;
        }
```

---

## Passo 3: Calculando a média

Agora que temos a soma total de todos os números inseridos, dividimos por 5. 

> [!TIP]
> Para evitar que o C# faça uma divisão inteira (e corte as casas decimais), converta o cálculo para o tipo `double`:

```csharp
        // Convertemos somaTotal para double para permitir casas decimais na média
        double media = (double)somaTotal / 5;
        
        Console.WriteLine($"\nA média dos números é: {media:F2}");
        Console.WriteLine("---------------------------------------------");
```

---

## Passo 4: Filtrando os números maiores com o `foreach`

Para exibir na tela apenas aqueles números que foram maiores que a média calculada, usamos o loop `foreach` para varrer a lista.

> [!IMPORTANT]
> **Atenção com o ArrayList:** Como o `ArrayList` não é genérico, por padrão o C# trata todos os seus elementos guardados como o tipo genérico `object`. Por isso, dentro da declaração do `foreach`, precisamos converter explicitamente os itens de volta para `int` escrevendo `foreach (int numero in listaNumeros)`.

```csharp
        Console.WriteLine("Números que ficaram acima da média:");

        // Percorre cada elemento convertido para int
        foreach (int numero in listaNumeros)
        {
            // Verifica se o número atual é maior que a média calculada
            if (numero > media)
            {
                Console.WriteLine($" -> {numero}");
            }
        }
    }
}
```

---

## 3. Como Executar este Programa?

Para ver este código funcionando no seu próprio computador, siga os passos abaixo usando a ferramenta de linha de comando oficial do C# (o **.NET SDK**):

### Passo 1: Instale o .NET SDK
Se você ainda não tem, baixe e instale a versão mais recente do [.NET SDK](https://dotnet.microsoft.com/download) direto do site oficial da Microsoft.

### Passo 2: Crie um novo projeto de Console
Abra o seu terminal (Prompt de Comando, PowerShell ou Terminal do macOS/Linux) e digite o seguinte comando para criar a pasta do projeto:
```bash
dotnet new console -o CalculadorDeMedias
```
*Isso vai gerar uma pasta chamada `CalculadorDeMedias` com uma base pronta de projeto C#.*

### Passo 3: Acesse a pasta do projeto
```bash
cd CalculadorDeMedias
```

### Passo 4: Substitua o código
1. Abra a pasta do projeto em um editor de texto (como o VS Code ou até mesmo o bloco de notas).
2. Abra o arquivo chamado `Program.cs`.
3. Apague todo o conteúdo dele e **cole o código C# completo** mostrado neste tutorial.

### Passo 5: Execute o programa pelo terminal
No terminal (dentro da pasta do projeto), basta rodar o comando mágico:
```bash
dotnet run
```

O .NET vai ler o arquivo, compilar todo o código e rodar o programa imediatamente! Você verá as mensagens aparecendo na tela pedindo para você digitar os números.

---

## Artigos relacionados:
* **[[09-Coleções em Csharp|Coleções em Csharp (Array vs List vs ArrayList)]]**
* **[[06-Estruturas de repetição (for e while)|Estruturas de repetição (for, foreach e while)]]**
* **[[19-O loop foreach em Csharp|O loop foreach em Csharp]]**
