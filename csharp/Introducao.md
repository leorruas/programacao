# Introdução ao C# (Como se fosse para uma criança de 12 anos!)

Imagine que o computador é um assistente super obediente, mas que não sabe fazer nada sozinho. Para falar com ele e dar instruções, precisamos de uma língua que ambos entendam. O **C#** (pronuncia-se *C-Sharp*) é exatamente essa língua!

---

## 1. O que faz o C# ser tão legal?

* **Fácil de ler:** O código se parece muito com o inglês do dia a dia.
* **Organizado (Orientado a Objetos):** Você pode organizar o código usando "moldes" do mundo real. Por exemplo, se quiser criar um jogo, pode ter um molde chamado "Jogador" com características (vida, força) e ações (correr, pular).
* **Segurança total:** O C# funciona como um pai protetor. Ele avisa se você tentar colocar texto onde deveria ser um número antes mesmo de você rodar o programa, evitando que o aplicativo quebre depois.
* **Limpeza Automática:** Sabe quando você brinca e deixa os brinquedos espalhados? No C#, há um limpador automático (chamado *Garbage Collector*) que junta e joga fora a memória que você não está mais usando.

---

## 2. A Receita Básica de um Programa

Em C#, escrever um programa é como escrever uma receita de bolo. Veja a receita mais simples de todas para mostrar uma mensagem na tela:

```csharp
using System; // Avisa que vamos usar as ferramentas básicas do sistema

// Este é o nosso livro de receitas chamado "Introducao"
namespace Introducao
{
    // Esta é a cozinha onde o bolo é feito
    class Program
    {
        // O método Main é o "passo 1" da receita, por onde tudo começa
        static void Main(string[] args)
        {
            // Diz para o computador: "Escreva na tela: Olá, Mundo!"
            Console.WriteLine("Olá, Mundo!");
        }
    }
}
```

---

## 3. Caixas de Guardar Coisas (Variáveis)

Pense nas variáveis como **caixas organizadoras** com etiquetas. Você só pode guardar o objeto certo dentro da caixa com a etiqueta correspondente:

```csharp
// Caixa para números inteiros (sem vírgula)
int idade = 12;

// Caixa para números quebrados (com vírgula)
double altura = 1.65;

// Caixa para um único caractere/letra
char inicial = 'L';

// Caixa para perguntas de Sim ou Não (Verdadeiro ou Falso)
bool gostaDeJogar = true;

// Caixa para textos longos (palavras ou frases)
string nomeCompleto = "Leonardo Ruas";
```

---

## 4. Tomando Decisões (Se... Senão...)

Assim como na vida real, o computador precisa tomar decisões básicas. Nós usamos o `if` (Se) e o `else` (Senão):

```csharp
int moedas = 10;

// SE eu tiver 10 moedas ou mais...
if (moedas >= 10)
{
    Console.WriteLine("Você pode comprar o sorvete!");
}
// SENÃO (se tiver menos de 10)...
else
{
    Console.WriteLine("Moedas insuficientes.");
}
```

---

## 5. Próximos Passos
Agora que você já conhece o básico de como dar ordens para o computador, que tal ver como guardar várias caixas juntas?
* **[Aprender sobre Arrays (Gaveteiros de caixas)](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/Arrays.md)**
