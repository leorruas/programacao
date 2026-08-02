# Introdução ao C#

**C#** (pronuncia-se *C-Sharp*) é uma linguagem de programação moderna, orientada a objetos e fortemente tipada, desenvolvida pela Microsoft como parte da sua plataforma .NET.

---

## 1. Características Principais

* **Simplicidade e Modernidade:** Sintaxe limpa, muito parecida com C++, Java e JavaScript.
* **Orientação a Objetos (POO):** Suporta pilares como Encapsulamento, Herança e Polimorfismo.
* **Segurança de Tipos (Strongly Typed):** O compilador garante que os tipos de dados sejam respeitados, evitando erros comuns em tempo de execução.
* **Gerenciamento de Memória Automático:** Possui um **Garbage Collector** que limpa a memória de objetos não mais utilizados.
* **Multiplataforma:** Com o **.NET Core** (e versões do .NET 5+), você pode rodar C# no Windows, macOS e Linux.

---

## 2. A Estrutura Básica de um Programa

Abaixo está o exemplo clássico de um programa "Olá Mundo" em C#:

```csharp
using System; // Importa o namespace que contém classes básicas como Console

namespace Introducao
{
    class Program
    {
        // O método Main é o ponto de entrada de qualquer aplicação C#
        static void Main(string[] args)
        {
            Console.WriteLine("Olá, Mundo!");
        }
    }
}
```

*Nas versões mais modernas do C# (C# 9+), você pode usar **Top-level statements**, reduzindo a estrutura acima para apenas:*
```csharp
using System;
Console.WriteLine("Olá, Mundo!");
```

---

## 3. Variáveis e Tipos de Dados Comuns

C# exige que você declare o tipo da variável ou use a palavra-chave `var` para inferência de tipos.

```csharp
// Tipos Primitivos
int idade = 25;
double altura = 1.75;
char genero = 'M';
bool ativo = true;

// Texto
string nome = "Leonardo";

// Inferência de tipo (o compilador define o tipo com base no valor atribuído)
var sobrenome = "Ruas"; // Entende-se como string
```

---

## 4. Estruturas de Controle

### Condicionais (`if-else`)
```csharp
int idade = 18;

if (idade >= 18)
{
    Console.WriteLine("Maior de idade.");
}
else
{
    Console.WriteLine("Menor de idade.");
}
```

### Loops (`for`, `while`)
```csharp
// Loop For
for (int i = 0; i < 5; i++)
{
    Console.WriteLine($"Número: {i}");
}

// Loop While
int contador = 0;
while (contador < 3)
{
    Console.WriteLine(contador);
    contador++;
}
```

---

## 5. Próximos Passos
Para continuar aprendendo C#, o fluxo ideal de tópicos é:
1. Variáveis, Operadores e Tipos de Dados
2. Estruturas Condicionais e de Repetição
3. **[Arrays](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/Arrays.md)** e Coleções (`List`, `Dictionary`)
4. Métodos (Funções)
5. Programação Orientada a Objetos (Classes, Objetos, Construtores)
