# [Csharp] • Projeto 4 - O Simulador de Conta Bancária

#csharp #tutorial #poo #classes

Neste quarto projeto prático, você vai dar o passo mais importante no desenvolvimento de software moderno: você vai programar usando **Orientação a Objetos (POO)**. Vamos criar um **Simulador de Conta Bancária**, onde modelaremos uma conta real com regras rígidas de depósito, saque e consulta de saldo, impedindo que o saldo seja alterado diretamente por fora da classe (encapsulamento).

Este projeto é perfeito para praticar a criação de **Classes, Objetos, Construtores, Métodos e Encapsulamento**.

---

## 1. O Código Completo do Programa

Para manter a organização profissional da POO, vamos criar um único arquivo que contém a nossa classe `ContaBancaria` e a classe `Program` executora. Crie o aplicativo console como ensinado no final deste arquivo, abra o `Program.cs` e substitua pelo código abaixo:

```csharp
using System;

// 1. Definição da Classe "ContaBancaria" (Fôrma do Bolo)
class ContaBancaria
{
    // Propriedades Públicas (Qualquer um pode ler de fora da classe)
    public string Numero { get; }
    public string Titular { get; }

    // Atributo Privado (Segurança: ninguém de fora altera o saldo livremente!)
    private double saldo;

    // Propriedade para apenas leitura do Saldo
    public double Saldo
    {
        get { return saldo; }
    }

    // Método Construtor (Dita como a conta é criada no início)
    public ContaBancaria(string numero, string titular, double saldoInicial)
    {
        Numero = numero;
        Titular = titular;
        // Validação inicial
        if (saldoInicial >= 0)
        {
            saldo = saldoInicial;
        }
        else
        {
            saldo = 0;
        }
    }

    // Método para Depósito
    public void Depositar(double valor)
    {
        if (valor > 0)
        {
            saldo += valor; // Soma ao saldo
            Console.WriteLine($"✓ Depósito de R$ {valor:F2} realizado na conta {Numero}.");
        }
        else
        {
            Console.WriteLine("⚠️ Erro: O valor do depósito deve ser maior que zero!");
        }
    }

    // Método para Saque
    public bool Sacar(double valor)
    {
        if (valor <= 0)
        {
            Console.WriteLine("⚠️ Erro: O valor do saque deve ser maior que zero!");
            return false;
        }

        // Validação de segurança: verifica se há saldo suficiente
        if (valor <= saldo)
        {
            saldo -= valor; // Subtrai do saldo
            Console.WriteLine($"✓ Saque de R$ {valor:F2} realizado na conta {Numero}.");
            return true;
        }
        else
        {
            Console.WriteLine($"❌ Erro: Saldo insuficiente na conta {Numero}! Saldo atual: R$ {saldo:F2}");
            return false;
        }
    }
}

// 2. Classe Principal que roda o programa
class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("========================================");
        Console.WriteLine("🏦 SISTEMA DE SIMULAÇÃO BANCÁRIA CSHARP");
        Console.WriteLine("========================================");

        // Instanciando (criando) objetos da classe ContaBancaria a partir do molde
        ContaBancaria contaLeonardo = new ContaBancaria("12345-6", "Leonardo Ruas", 100.00);
        ContaBancaria contaMaria = new ContaBancaria("98765-4", "Maria Souza", 500.00);

        Console.WriteLine($"Contas criadas com sucesso!");
        Console.WriteLine($" -> Conta {contaLeonardo.Numero} de {contaLeonardo.Titular}");
        Console.WriteLine($" -> Conta {contaMaria.Numero} de {contaMaria.Titular}");
        Console.WriteLine("----------------------------------------\n");

        // 3. Testando as Operações Financeiras
        Console.WriteLine("💵 Movimentações na conta do Leonardo:");
        contaLeonardo.Depositar(150.00);  // Deposita 150 (Saldo vai para 250)
        contaLeonardo.Sacar(50.00);       // Saca 50 (Saldo vai para 200)
        contaLeonardo.Sacar(300.00);      // Tenta sacar 300 (Deve falhar: saldo é 200)
        Console.WriteLine($"Saldo final do Leonardo: R$ {contaLeonardo.Saldo:F2}");
        Console.WriteLine("----------------------------------------\n");

        Console.WriteLine("💵 Movimentações na conta da Maria:");
        contaMaria.Sacar(200.00);         // Saca 200 (Saldo vai para 300)
        contaMaria.Depositar(-10);        // Tenta depósito inválido (Deve falhar)
        Console.WriteLine($"Saldo final da Maria: R$ {contaMaria.Saldo:F2}");
        Console.WriteLine("========================================");
    }
}
```

---

## 2. Explicação Passo a Passo

* **Classes e Objetos**: A classe `ContaBancaria` é o molde ("fôrma do bolo"). O `new ContaBancaria(...)` cria um **objeto** físico (um "bolo" real na memória) com os dados que informamos.
* **Encapsulamento**: O atributo `private double saldo` impede que alguém modifique o saldo por fora da classe escrevendo coisas ilegais como `contaLeonardo.saldo = 999999;`. O saldo só pode ser alterado através das regras de negócio que colocamos nos métodos públicos `Depositar` e `Sacar`.
* **O Construtor**: O método público que tem exatamente o mesmo nome da classe `public ContaBancaria(...)` serve para exigir dados mínimos obrigatórios na hora de ligar e criar o objeto no computador.
* **`get` de Apenas Leitura**: A propriedade `Saldo` possui apenas o bloco `get`, o que significa que qualquer código externo pode consultar e ler o saldo, mas nunca alterá-lo diretamente de fora.

---

## 3. Como Executar este Programa?

Siga o passo a passo no seu terminal:

1. **Crie a pasta do projeto:**
   ```bash
   dotnet new console -o SimuladorBanco
   ```
2. **Entre na pasta:**
   ```bash
   cd SimuladorBanco
   ```
3. Abra o arquivo `Program.cs`, substitua todo o código original por este, e execute com:
   ```bash
   dotnet run
   ```

---

## Artigos relacionados:
* **[[12-Métodos (funções)|Métodos (funções)]]**
* **[[13-Programação orientada a objetos|Programação orientada a objetos]]**
* **[[16-Herança e interfaces|Herança e interfaces]]**
