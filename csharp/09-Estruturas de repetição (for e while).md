# Estruturas de repetição (for, foreach e while)
#csharp

Repetir tarefas é um dos maiores superpoderes dos computadores. Eles podem fazer a mesma ação milhões de vezes sem se cansar, sem errar e em frações de segundo. 

No C#, as ferramentas mais importantes para fazer repetições são os loops **`for`**, **`foreach`** e **`while`**.

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
Use o `for` sempre que você souber **exatamente o limite** ou a quantidade de vezes que precisa repetir antes mesmo de começar (ex: ler 5 nomes, repetir 10 vezes, varrer um [[csharp/12-Arrays em Csharp|array]] de tamanho fixo).

---

## 2. O loop `foreach` (Leitura simplificada de coleções)

Pense no `foreach` como **folhear um álbum de figurinhas**. O álbum já tem todas as figurinhas colocadas. Sua regra é simples: *"Para cada (`foreach`) figurinha que estiver no álbum, dê uma olhada nela"*.

O `foreach` dispensa qualquer controle de índice ou contador manual. Ele percorre a [[csharp/14-Coleções em Csharp|coleção]] de forma direta e segura:

```csharp
string[] nomes = { "Leonardo", "Ana", "Bia" };

// Para cada nome dentro da coleção nomes:
foreach (string nome in nomes)
{
    Console.WriteLine($"Nome: {nome}");
}
```

> [!NOTE]
> A [[csharp/04-Variáveis, operadores e tipos de dados|variável]] usada dentro do `foreach` (no exemplo, `nome`) é de **apenas leitura**. Você não pode modificar os elementos do [[csharp/12-Arrays em Csharp|array]] usando ela. Para aprender mais detalhes de performance e regras de uso, veja o artigo exclusivo sobre o **[[csharp/11-O loop foreach em Csharp|loop foreach em Csharp]]**.

---

## 3. O loop `while` (Repetição por regra)

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

## 4. O loop `do while` (Garantia de rodar pelo menos uma vez)

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

## 5. Tabela comparativa

| Critério | `for` | `foreach` | `while` | `do while` |
| :--- | :--- | :--- | :--- | :--- |
| **Foco principal** | Contagem controlada por índice | Leitura limpa de coleções | Condição lógica simples | Executar antes de checar |
| **Quantas vezes roda** | 0 ou mais vezes | 0 ou mais vezes (tamanho da coleção) | 0 ou mais vezes | **Pelo menos 1 vez** |
| **Saber limite antes** | Sim | Sim (percorre tudo) | Não | Não |
| **Apenas Leitura?** | Não (pode alterar valores) | **Sim (somente leitura)** | Não | Não |

---

## Artigos relacionados:
* **[[csharp/11-O loop foreach em Csharp|O loop foreach em Csharp]]**
* **[[csharp/12-Arrays em Csharp|Arrays em Csharp]]**
* **[[csharp/14-Coleções em Csharp|Coleções em Csharp]]**
* **[[csharp/07-Estruturas condicionais e de repetição|Estruturas condicionais e de repetição]]**
