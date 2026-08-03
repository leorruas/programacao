# Herança e interfaces em Csharp
#csharp

Na Programação Orientada a Objetos, conforme nosso código cresce, começamos a ter muitos moldes (classes) parecidos. Para evitar que a gente tenha que redigitar as mesmas coisas várias vezes, usamos dois superpoderes de organização: **Herança** e **Interfaces**.

---

## 1. Herança: Reutilizando o que veio dos "pais"

Imagine que você está criando um jogo de RPG. Você tem o molde de um `Guerreiro` e o de um `Mago`. Ambos são personagens, têm `Nome`, `Vida` e realizam a ação de `Atacar`.
Em vez de programar vida e nome em cada um, nós criamos uma classe pai chamada `Personagem` (classe base) e fazemos as classes filhos `Guerreiro` e `Mago` (classes derivadas) **herdarem** dela usando o caractere `:`:

```csharp
using System;

// Classe Pai (Base)
class Personagem
{
    public string Nome { get; set; }
    public int Vida { get; set; }

    // O termo 'virtual' permite que os filhos modifiquem este método
    public virtual void Atacar()
    {
        Console.WriteLine($"{Nome} realizou um ataque básico!");
    }
}

// Classe Filho (Derivada)
class Guerreiro : Personagem
{
    public int ForcaFisica { get; set; }

    // O termo 'override' reescreve o método do pai
    public override void Atacar()
    {
        Console.WriteLine($"{Nome} atacou com sua espada causando {ForcaFisica} de dano físico!");
    }
}

class Program
{
    static void Main()
    {
        Guerreiro conan = new Guerreiro();
        conan.Nome = "Conan";
        conan.Vida = 100;
        conan.ForcaFisica = 25;

        conan.Atacar(); // Saída: Conan atacou com sua espada causando 25 de dano físico!
    }
}
```

---

## 2. Interfaces: O contrato de obrigações

Enquanto a herança define o que um objeto **É** (um guerreiro é um personagem), a **Interface** define o que um objeto **CONSEGUE FAZER**.
Uma interface é como um contrato ou manual de instruções que diz: *"Quem assinar este contrato é obrigado a criar estes métodos!"*. Ela não tem código dentro, apenas os nomes das regras.

Por exemplo, coisas diferentes como um `Carro`, um `Jogador` e uma `Porta` podem ser fechadas/abertas. Nós criamos a interface `IAbrivel` (por convenção, sempre começamos o nome com a letra `I` maiúscula):

```csharp
using System;

// A Interface não tem código, apenas a assinatura do que deve existir
interface IAbrivel
{
    void Abrir();
    void Fechar();
}

// O Carro assina o contrato da Interface
class Carro : IAbrivel
{
    public void Abrir()
    {
        Console.WriteLine("Abrindo a porta do carro.");
    }

    public void Fechar()
    {
        Console.WriteLine("Fechando a porta do carro.");
    }
}

// Um Baú do tesouro também pode assinar
class Bau : IAbrivel
{
    public void Abrir()
    {
        Console.WriteLine("O baú de ouro se abriu!");
    }

    public void Fechar()
    {
        Console.WriteLine("O baú foi trancado com cadeado.");
    }
}
```

---

## 3. Resumo da diferença

| Conceito | Pergunta que responde | Quantos posso usar? |
| :--- | :--- | :--- |
| **Herança (`class A : B`)** | O que o objeto **É** (Base) | Apenas **um** pai por classe |
| **Interface (`class A : I`)** | O que o objeto **FAZ** (Contrato) | Pode assinar **múltiplas** interfaces |

---

## Artigos relacionados:
* **[[13-Programação orientada a objetos|13-Programação orientada a objetos.md]]**
* **[[12-Métodos (funções)|12-Métodos (funções).md]]**
