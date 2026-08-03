# Tratamento de erros em C#
#csharp

Imagine que você está assistindo a um espetáculo de circo. O trapezista salta lá no alto, dá piruetas e... erra o trapézio! Sem uma **rede de segurança**, seria um desastre completo. 

Na programação, os erros inesperados (chamados de **Exceções**) são as quedas do trapezista. Se você não colocar uma rede de segurança no seu código, o programa fecha na cara do usuário com uma mensagem assustadora. O tratamento de erros é a rede de proteção que segura o programa e avisa o que deu errado com calma.

---

## 1. A estrutura de segurança (`try`, `catch`, `finally`)

Para tratar erros em C#, nós dividimos o código em três partes:

```csharp
try
{
    // O TRAPEZO: Código arriscado que pode dar erro
}
catch (Exception ex)
{
    // A REDE: O que fazer se o erro acontecer (salvar o dia)
}
finally
{
    // O SHOW CONTINUA: Código que roda SEMPRE, dando erro ou não
}
```

### Exemplo prático: A divisão perigosa

Se você pedir para o computador dividir um número por zero, ele vai travar imediatamente. Veja como evitar isso:

```csharp
using System;

class Program
{
    static void Main()
    {
        try
        {
            Console.Write("Digite um número: ");
            int numero = int.Parse(Console.ReadLine()); // Pode dar FormatException se digitar texto

            int resultado = 10 / numero; // Pode dar DivideByZeroException se digitar 0
            Console.WriteLine($"10 dividido por {numero} é {resultado}");
        }
        catch (DivideByZeroException)
        {
            // Tratando erro específico de divisão por zero
            Console.WriteLine("Erro: Não é possível dividir um número por zero!");
        }
        catch (FormatException)
        {
            // Tratando erro se o usuário digitar letras em vez de números
            Console.WriteLine("Erro: Por favor, digite apenas números inteiros!");
        }
        catch (Exception ex)
        {
            // Rede genérica: Pega qualquer outro erro que não previmos
            Console.WriteLine($"Ocorreu um erro inesperado: {ex.Message}");
        }
        finally
        {
            Console.WriteLine("Obrigado por usar o nosso sistema!");
        }
    }
}
```

---

## 2. Capturando erros específicos vs. genéricos

É sempre melhor pegar os erros de forma **específica** (como `DivideByZeroException` ou `FormatException`) antes do erro genérico (`Exception`).
* Pensando como médico: É melhor saber que o paciente tem "gripe" (erro específico) do que apenas dizer que ele está "doente" (erro genérico).

---

## 3. Disparando seus próprios erros (`throw`)

Às vezes, você quer forçar a criação de um erro porque uma regra de negócio foi violada. Por exemplo, criar uma conta para alguém menor de idade:

```csharp
using System;

class Program
{
    static void VerificarIdade(int idade)
    {
        if (idade < 18)
        {
            // "Arremessa" um erro para quem chamou este método tratar
            throw new ArgumentOutOfRangeException("Apenas maiores de 18 anos podem se cadastrar.");
        }
        Console.WriteLine("Cadastro permitido!");
    }

    static void Main()
    {
        try
        {
            VerificarIdade(15);
        }
        catch (ArgumentOutOfRangeException ex)
        {
            Console.WriteLine($"Erro no cadastro: {ex.ParamName}");
        }
    }
}
```

---

## Artigos relacionados:
* **[[01-Introdução ao Csharp.md|01-Introdução ao Csharp.md]]**
* **[[03-Variáveis, operadores e tipos de dados|03-Variáveis, operadores e tipos de dados.md]]**
