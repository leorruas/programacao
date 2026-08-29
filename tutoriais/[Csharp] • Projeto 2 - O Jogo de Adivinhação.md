# [Csharp] • Projeto 2 - O Jogo de Adivinhação

#csharp #tutorial #iniciante #loops

Neste segundo projeto prático, você vai programar um clássico: o **Jogo de Adivinhação (Acerte o Número Secreto)**. O computador vai escolher um número aleatório de 1 a 100, e você terá que chutar valores até acertar. A cada tentativa errada, o computador vai dar dicas se o número secreto é "Maior" ou "Menor" do que o seu palpite.

Este projeto consolida os conceitos de **Estruturas Condicionais, Estruturas de Repetição (Loops) e Validação de Dados com Do-While**.

---

## 1. O Código Completo do Programa

Abra o seu terminal, crie o console app como ensinado no final deste arquivo, abra o `Program.cs` e substitua pelo código a seguir:

```csharp
using System;

class Program
{
    static void Main(string[] args)
    {
        // 1. Gera o número secreto aleatório de 1 a 100
        Random geradorAleatorio = new Random();
        int numeroSecreto = geradorAleatorio.Next(1, 101); // O limite superior 101 é exclusivo (não conta)

        int tentativas = 0;
        int palpite = 0;
        bool acertou = false;

        Console.WriteLine("========================================");
        Console.WriteLine(" BEM-VINDO AO JOGO DA ADIVINHAÇÃO!");
        Console.WriteLine("========================================");
        Console.WriteLine("Estou pensando em um número de 1 a 100...");
        Console.WriteLine("Tente adivinhar qual é!");
        Console.WriteLine();

        // 2. Loop principal do jogo: roda até o jogador acertar
        while (!acertou)
        {
            // Validação de entrada: garante que o usuário digite um número válido entre 1 e 100
            do
            {
                Console.Write("Digite o seu palpite (1 a 100): ");
                string entrada = Console.ReadLine();

                // Tenta converter o texto para número. Se falhar, avisa e repete a pergunta.
                if (!int.TryParse(entrada, out palpite) || palpite < 1 || palpite > 100)
                {
                    Console.WriteLine("️ Entrada inválida! Digite apenas números inteiros entre 1 e 100.");
                    palpite = 0; // Reseta para continuar no loop de validação
                }

            } while (palpite == 0); // Continua perguntando se o palpite for inválido

            tentativas++; // Incrementa o número de tentativas

            // 3. Verifica o palpite do jogador
            if (palpite == numeroSecreto)
            {
                acertou = true; // Quebra a condição do loop while principal
            }
            else if (palpite < numeroSecreto)
            {
                Console.WriteLine($" O número secreto é MAIOR do que {palpite}. Tente novamente!");
            }
            else
            {
                Console.WriteLine($" O número secreto é MENOR do que {palpite}. Tente novamente!");
            }
            Console.WriteLine(); // Linha em branco para organização
        }

        // 4. Mensagem de vitória
        Console.WriteLine("========================================");
        Console.WriteLine(" PARABÉNS! VOCÊ VENCEU!");
        Console.WriteLine($" O número secreto era mesmo {numeroSecreto}.");
        Console.WriteLine($"⏱️ Você precisou de {tentativas} tentativa(s) para acertar!");
        Console.WriteLine("========================================");
    }
}
```

---

## 2. Explicação Passo a Passo

* **A Classe `Random`**: Usada para gerar números aleatórios. O método `Next(1, 101)` gera um número a partir de 1 até, no máximo, 100 (o 101 não entra na conta).
* **O Loop `while (!acertou)`**: O símbolo de exclamação `!` significa "NÃO". Ou seja, o loop lê-se: *"Enquanto o jogador NÃO acertou, repita o jogo"*.
* **O Loop `do-while` para Validação**: Usamos o `do-while` para garantir que o console pergunte o palpite pelo menos uma vez e continue repetindo caso a entrada seja texto inválido ou fora de 1 a 100.
* **`int.TryParse()`**: Diferente do `int.Parse()` (que dá erro de travamento no programa se você digitar letras), o `TryParse` tenta converter o texto. Se der certo, ele guarda na variável `palpite` e retorna `true`. Se falhar (usuário digitou letras), ele retorna `false` sem travar o aplicativo!

---

## 3. Como Executar este Programa?

Siga o passo a passo no seu terminal:

1. **Crie a pasta do projeto:**
   ```bash
   dotnet new console -o JogoAdivinhacao
   ```
2. **Entre na pasta:**
   ```bash
   cd JogoAdivinhacao
   ```
3. Abra o arquivo `Program.cs`, cole o código acima e execute com:
   ```bash
   dotnet run
   ```

---

## Artigos relacionados:
* **[[csharp/07-Estruturas condicionais e de repetição|Estruturas condicionais e de repetição]]**
* **[[csharp/09-Estruturas de repetição (for e while)|Estruturas de repetição (for, foreach e while)]]**
* **[[csharp/10-O loop do-while em Csharp|O loop do-while em Csharp]]**
