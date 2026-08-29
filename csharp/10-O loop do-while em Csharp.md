# O loop do-while em Csharp (A garantia de execução)
#csharp

O `do-while` (faça... enquanto) é um parente muito próximo do loop `while`, mas com uma diferença crucial: ele garante que o seu bloco de código seja executado **pelo menos uma vez** antes de testar se deve continuar ou parar.

No `while` tradicional, a condição é testada no topo. Se ela for falsa logo de cara, o loop nunca roda. No `do-while`, a condição é testada apenas no final.

---

## 1. Como funciona?

A estrutura do `do-while` é invertida. Primeiro escrevemos o `do` com o bloco de código e, no final, a condição com o `while` (terminando com ponto e vírgula `;`):

```csharp
do
{
    // O código aqui dentro vai rodar primeiro
} while (condicao); // E a condição só é checada aqui no final!
```

---

## 2. Exemplo Prático: O Fliperama

Imagine uma máquina de fliperama. Você insere suas moedas. Mesmo se você tiver 0 moedas no bolso agora, se você já inseriu uma ficha para começar a jogar, você joga a primeira partida de qualquer forma. A máquina só checa se você tem mais moedas *depois* que você termina a partida.

```csharp
int moedas = 0;

do
{
    Console.WriteLine("Você jogou uma partida de Fliperama!");
    moedas--; // Tenta gastar uma moeda
} while (moedas > 0); // Só checa depois de jogar!

Console.WriteLine("Fim de jogo.");
```

**Saída no console:**
```text
Você jogou uma partida de Fliperama!
Fim de jogo.
```
*Note que, mesmo começando com 0 moedas, a frase "Você jogou..." foi impressa uma vez! Se tivéssemos usado o `while` comum, nada teria sido impresso.*

---

## 3. Quando usar o `do-while` na vida real?

O `do-while` é perfeito para situações em que a ação inicial serve justamente para coletar os dados que a condição vai testar. O exemplo mais comum é a **validação de entradas do usuário**:

```csharp
int numeroDigitado;

do
{
    Console.Write("Digite um número entre 1 e 10 para continuar: ");
    numeroDigitado = int.Parse(Console.ReadLine());
} while (numeroDigitado < 1 || numeroDigitado > 10); // Continua perguntando se estiver fora do intervalo

Console.WriteLine($"Obrigado! Você escolheu o número {numeroDigitado}.");
```

---

## 4. Tabela de Comparação Rápida

| Estrutura | Onde testa a condição? | Mínimo de repetições |
| :--- | :--- | :--- |
| **`while`** | No **início** (topo) | 0 vezes (pode nem rodar) |
| **`do-while`** | No **fim** (rodapé) | **1 vez (sempre roda pelo menos uma)** |

---

## Artigos relacionados:
* **[[csharp/09-Estruturas de repetição (for e while)|Estruturas de repetição (for, foreach e while)]]**
* **[[csharp/11-O loop foreach em Csharp|O loop foreach em Csharp]]**
* **[[csharp/12-Arrays em Csharp|Arrays em Csharp]]**
