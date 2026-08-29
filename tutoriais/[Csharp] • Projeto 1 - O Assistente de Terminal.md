# [Csharp] • Projeto 1 - O Assistente de Terminal

#csharp #tutorial #iniciante

Neste primeiro projeto prático, você vai construir um **Assistente de Terminal**. Ele vai interagir com você fazendo perguntas, guardando suas respostas na memória e realizando cálculos matemáticos simples (como calcular seu ano de nascimento ou seu consumo de água ideal).

Este projeto é excelente para praticar os conceitos de **Variáveis, Tipos de Dados e Entrada/Saída de dados** no console.

---

## 1. O Código Completo do Programa

Crie um novo projeto console seguindo o guia de execução no final deste arquivo, abra o arquivo `Program.cs` e substitua todo o conteúdo por este código abaixo:

```csharp
using System;

class Program
{
    static void Main(string[] args)
    {
        // 1. Mensagem de Boas-Vindas
        Console.WriteLine("========================================");
        Console.WriteLine(" BEM-VINDO AO ASSISTENTE DE TERMINAL!");
        Console.WriteLine("========================================");
        Console.WriteLine(); // Linha em branco

        // 2. Coleta de Informações (Entrada de Dados)
        Console.Write("Qual é o seu nome? ");
        string nome = Console.ReadLine(); // Guarda o nome como texto (string)

        Console.Write("Em que ano nós estamos? ");
        int anoAtual = int.Parse(Console.ReadLine()); // Converte a resposta para número inteiro (int)

        Console.Write("Quantos anos você vai fazer ou já fez este ano? ");
        int idade = int.Parse(Console.ReadLine());

        Console.Write("Qual é o seu peso em quilos? (Exemplo: 70,5): ");
        double peso = double.Parse(Console.ReadLine()); // Guarda número com casas decimais (double)

        // 3. Processamento de Dados (Cálculos Matemáticos)
        int anoNascimento = anoAtual - idade; // Subtração básica
        double aguaIdeal = peso * 35; // Cálculo recomendado: 35ml de água por quilo do corpo

        // 4. Exibição dos Resultados (Saída de Dados)
        Console.WriteLine();
        Console.WriteLine("----------------------------------------");
        Console.WriteLine($" RELATÓRIO DO ASSISTENTE PARA {nome.ToUpper()}:");
        Console.WriteLine("----------------------------------------");
        Console.WriteLine($" Com base na sua idade, você nasceu em: {anoNascimento}");
        Console.WriteLine($" Meta de hidratação diária: {aguaIdeal} ml de água (aproximadamente {aguaIdeal / 1000:F2} litros)");
        Console.WriteLine("----------------------------------------");
        Console.WriteLine(" Obrigado por usar o assistente! Até a próxima!");
        Console.WriteLine("========================================");
    }
}
```

---

## 2. Explicação Passo a Passo

* **`Console.Write()` vs `Console.WriteLine()`**: O `WriteLine` imprime o texto e pula para a próxima linha do console. O `Write` imprime o texto e deixa o cursor na mesma linha, ideal para o usuário digitar a resposta bem na frente da pergunta.
* **`Console.ReadLine()`**: Lê tudo o que o usuário digita no terminal como um texto simples (`string`).
* **`int.Parse()` e `double.Parse()`**: Como o terminal só lê texto bruto, precisamos "converter" a resposta digitada para números reais de modo que o C# consiga fazer contas matemáticas. O `Parse` faz essa conversão.
* **Interpolação de Strings (`$""`)**: O símbolo `$` antes do texto permite injetar variáveis diretamente no texto usando chaves `{variavel}`. A formatação `{aguaIdeal / 1000:F2}` converte os mililitros para litros exibindo apenas duas casas decimais (`F2` significa *Fixed-point com 2 casas*).

---

## 3. Como Executar este Programa?

Siga o passo a passo no seu terminal:

1. **Crie a pasta do projeto:**
   ```bash
   dotnet new console -o AssistenteTerminal
   ```
2. **Entre na pasta:**
   ```bash
   cd AssistenteTerminal
   ```
3. Abra a pasta no seu editor (VS Code ou bloco de notas), abra o arquivo `Program.cs`, apague o conteúdo original e cole o código acima.
4. **Rode o programa:**
   ```bash
   dotnet run
   ```

---

## Artigos relacionados:
* **[[csharp/01-Introdução ao Csharp|Introdução ao Csharp]]**
* **[[csharp/02-O método Main|O método Main]]**
* **[[csharp/04-Variáveis, operadores e tipos de dados|Variáveis, operadores e tipos de dados]]**
* **[[csharp/05-Segurança de tipos|Segurança de tipos]]**
