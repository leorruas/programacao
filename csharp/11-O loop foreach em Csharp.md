# O loop foreach em Csharp (O leitor automático)
#csharp

O `foreach` é a estrutura de repetição mais limpa e segura do C# quando o objetivo é **ler todos os elementos de uma [[csharp/14-Coleções em Csharp|coleção]]** (como [[csharp/12-Arrays em Csharp|Arrays]], [[csharp/14-Coleções em Csharp|Lists]], `Dictionary`, etc.). 

Diferente do `for` tradicional, você não precisa gerenciar um índice (`i`), se preocupar com o tamanho da [[csharp/17-Lista, pilha e fila|lista]], ou correr o risco de estourar o limite do array (`IndexOutOfRangeException`).

---

## A Analogia da Esteira de Produção

Imagine uma esteira de fábrica por onde passam caixas de bombom. Um inspetor de qualidade fica parado ao lado da esteira. Sua tarefa é simples: pegar cada bombom que passa, verificar se está correto, e deixá-lo seguir viagem.

O inspetor não precisa contar: "Este é o bombom número 1, este é o 2...". Ele simplesmente repete a ação: "Para cada bombom que passar na minha frente, eu inspeciono". 

O `foreach` funciona exatamente assim: ele pega cada item da sua coleção, de forma automática e sequencial, entrega para você ler e avança para o próximo até a coleção acabar.

---

## 1. Como usar o `foreach`

A sintaxe diz: "para cada **item** do tipo **X** dentro da **coleção**, faça algo":

```csharp
string[] nomes = { "Leonardo", "Ana", "Bia" };

// Lendo cada nome dentro do array nomes
foreach (string nome in nomes)
{
    Console.WriteLine(nome);
}
```

---

## 2. A Regra de Ouro: Apenas Leitura!

> [!WARNING]
> **Você não pode alterar os itens de uma coleção usando a [[csharp/04-Variáveis, operadores e tipos de dados|variável]] de iteração do `foreach`.**
> A variável que representa o item atual (como `nome` no exemplo acima) é de **apenas leitura** (*read-only*). Se você tentar mudar o valor dela, o compilador C# vai dar erro de compilação.

```csharp
int[] numeros = { 10, 20, 30 };

foreach (int num in numeros)
{
    // num = num * 2; // ERRO DE COMPILAÇÃO! Não é permitido alterar a variável de iteração.
}
```
*Se você precisar **modificar** os valores das gavetas do array/lista enquanto o percorre, você deve usar obrigatoriamente um loop **`for` tradicional** com índice.*

---

## 3. Como funciona por baixo dos panos? (O Segredo do `IEnumerable`)

O C# não faz mágica. Por baixo dos panos, o compilador traduz o seu simples `foreach` in um bloco `while` usando um **Enumerador**. 

Para que qualquer coleção possa usar o `foreach`, ela precisa implementar a [[csharp/20-Herança e interfaces|interface]] **`IEnumerable`** (que significa "capaz de ser enumerado"). 

O código que você escreve:
```csharp
foreach (var item in colecao) { /* código */ }
```

É traduzido pelo compilador para algo parecido com isto:
```csharp
var enumerador = colecao.GetEnumerator();
try
{
    while (enumerador.MoveNext())
    {
        var item = enumerador.Current;
        /* seu código aqui */
    }
}
finally
{
    // Garante que o enumerador seja descartado corretamente da memória
    (enumerador as IDisposable)?.Dispose();
}
```
*   **`MoveNext()`**: Avança para o próximo item e retorna `true`. Se não houver mais itens, retorna `false` e encerra o loop.
*   **`Current`**: Entrega o item da posição atual para leitura.

---

## 4. Tabela de Comparação: `for` vs `foreach` vs `while`

| Característica | `for` | `foreach` | `while` |
| :--- | :--- | :--- | :--- |
| **Foco principal** | Contagem por índice / Modificação | Leitura limpa e rápida | Repetição baseada em condição |
| **Segurança** | Média (risco de `IndexOutOfRangeException`) | Alta (impossível estourar o limite) | Média (risco de loop infinito) |
| **Performance** | Levemente mais rápido em [[csharp/12-Arrays em Csharp\|Arrays]] básicos | Muito rápido (mínima diferença) | Igual ao `for` |
| **Permite alterar itens** | Sim, via índice (`lista[i] = valor`) | Não, apenas leitura | Sim, via índice |
| **Controle** | Você decide o passo (ex: de 2 em 2, de trás pra frente) | Passa de 1 em 1 do início ao fim | Livre controle manual da condição |

---

## Artigos relacionados:
* **[[csharp/09-Estruturas de repetição (for e while)|Estruturas de repetição (for e while)]]**
* **[[csharp/12-Arrays em Csharp|Arrays em Csharp]]**
* **[[csharp/14-Coleções em Csharp|Coleções em Csharp]]**
