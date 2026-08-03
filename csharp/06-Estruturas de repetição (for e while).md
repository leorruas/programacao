# Estruturas de repetição (for e while)
#csharp

Repetir tarefas é um dos maiores superpoderes dos computadores. Eles podem fazer a mesma ação milhões de vezes sem se cansar, sem errar e em frações de segundo. 

No C#, as duas ferramentas mais importantes para fazer repetições são os loops **`for`** e **`while`**.

---

## 1. O loop `for` (Repetição com contagem)

Pense no `for` como um **exercício físico de polichinelos**. O treinador te diz: *"Faça polichinelos começando no 1, pare quando passar de 10, e conte de 1 em 1"*.

O `for` organiza todas essas regras de contagem em uma única linha, dividida em 3 partes separadas por ponto e vírgula `;`:

```csharp
// 1. Início: Criamos a variável do contador (int i = 1)
// 2. Condição: Até quando o loop vai rodar (i <= 10)
// 3. Passo: O que acontece a cada volta (i++ soma 1 ao i)
for (int i = 1; i <= 10; i++)
{
    Console.WriteLine($"Polichinelo número {i}");
}
```

### Quando usar o `for`?
Use o `for` sempre que você souber **exatamente o limite** ou a quantidade de vezes que precisa repetir antes mesmo de começar (ex: ler 5 nomes, repetir 10 vezes, varrer um [[07-Arrays em Csharp|array]] de tamanho fixo).

---

## 2. O loop `while` (Repetição por regra)

Pense no `while` como **comer colheradas de sopa**. Você não conta quantas colheradas vai dar antes de sentar à mesa. Sua regra é simples: *"Enquanto (`while`) o prato não estiver vazio, continue comendo"*.

O `while` só precisa de **uma única condição** para rodar:

```csharp
bool pratoVazio = false;
int colheradasRestantes = 5;

// Enquanto o prato não estiver vazio, faça:
while (pratoVazio == false)
{
    Console.WriteLine("Comi uma colherada de sopa!");
    colheradasRestantes--; // Diminui as colheradas

    if (colheradasRestantes == 0)
    {
        pratoVazio = true; // Muda a regra! Agora o loop vai parar na próxima volta.
    }
}
```

### Quando usar o `while`?
Use o `while` quando você **não sabe o número exato de repetições** antes do loop iniciar, dependendo de uma condição que pode mudar a qualquer momento (ex: esperar o usuário digitar "sair", ler dados de um arquivo até chegar ao fim, continuar o jogo até o jogador perder a vida).

---

## 3. O loop `do while` (Garantia de rodar pelo menos uma vez)

O `do while` (faça... enquanto) é muito parecido com o `while`, mas com uma diferença crucial: ele faz a ação **primeiro** e só depois checa se deve continuar.
*Analogia: Experimente a comida primeiro, e depois decida se quer continuar comendo.*

```csharp
int moedas = 0;

do
{
    Console.WriteLine("Joguei uma partida no fliperama!");
    moedas--;
} while (moedas > 0); // Só checa depois de jogar a primeira vez!
```

---

## 4. Tabela comparativa

| Critério | `for` | `while` | `do while` |
| :--- | :--- | :--- | :--- |
| **Foco principal** | Contagem numérica controlada | Condição lógica simples | Executar e depois checar |
| **Quantas vezes roda** | 0 ou mais vezes | 0 ou mais vezes | **Pelo menos 1 vez** |
| **Saber limite antes** | Sim | Não | Não |

---

## Artigos relacionados:
* **[[01-Introdução ao Csharp.md|Introdução ao Csharp]]**
* **[[07-Arrays em Csharp.md|Arrays em Csharp]]**
* **[[05-Estruturas condicionais e de repetição|Estruturas condicionais e de repetição]]**
