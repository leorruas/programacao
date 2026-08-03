# Métodos de arrays (O dicionário de ferramentas)
#csharp

Em C#, os arrays não são apenas gaveteiros estáticos para guardar coisas. Eles vêm acompanhados de uma caixa de ferramentas muito poderosa! A classe **`System.Array`** e os métodos de extensão do **`LINQ`** (ferramentas de consulta de dados) facilitam muito a nossa vida.

Aqui está a lista exaustiva dos métodos mais utilizados, o que cada um faz e como usá-los:

---

## 1. Métodos clássicos da classe `Array`

Esses métodos pertencem à própria caixa de ferramentas do C# e são chamados escrevendo `Array.NomeDoMetodo(...)`.

### `Array.Sort()`
* **Para que serve:** Ordena os itens do array de forma crescente (do menor para o maior, ou em ordem alfabética).
* **Exemplo:**
  ```csharp
  int[] numeros = { 5, 2, 8 };
  Array.Sort(numeros); // numeros agora é { 2, 5, 8 }
  ```

### `Array.Reverse()`
* **Para que serve:** Inverte a ordem das gavetas. O que estava no fim vai para o começo.
* **Exemplo:**
  ```csharp
  int[] numeros = { 1, 2, 3 };
  Array.Reverse(numeros); // numeros agora é { 3, 2, 1 }
  ```

### `Array.IndexOf()`
* **Para que serve:** Procura um item no array e devolve a posição (índice) dele. Se não encontrar, devolve `-1`.
* **Exemplo:**
  ```csharp
  string[] frutas = { "Uva", "Maçã", "Pera" };
  int posicao = Array.IndexOf(frutas, "Maçã"); // Retorna 1
  ```

### `Array.Clear()`
* **Para que serve:** Limpa uma parte ou todo o array, resetando os valores para o padrão (números viram `0`, textos viram `null`). O tamanho do array não muda.
* **Exemplo:**
  ```csharp
  int[] numeros = { 10, 20, 30 };
  Array.Clear(numeros, 0, numeros.Length); // numeros agora é { 0, 0, 0 }
  ```

### `Array.Resize()`
* **Para que serve:** Redimensiona o tamanho de um array existente criando uma nova caixa por baixo dos panos com o tamanho desejado e copiando os dados antigos.
* **Exemplo:**
  ```csharp
  int[] numeros = { 1, 2 };
  Array.Resize(ref numeros, 4); // numeros agora tem tamanho 4: { 1, 2, 0, 0 }
  ```

### `Array.Exists()`
* **Para que serve:** Verifica se existe pelo menos um elemento no array que atende a uma condição (devolve `true` ou `false`).
* **Exemplo:**
  ```csharp
  int[] notas = { 4, 8, 5 };
  bool temNotaDez = Array.Exists(notas, n => n == 10); // Retorna false
  ```

---

## 2. Métodos de busca LINQ (Extensões)

Para usar estes métodos, você deve importar a biblioteca LINQ escrevendo `using System.Linq;` no topo do código. Eles são chamados diretamente a partir da variável do array (ex: `meuArray.NomeDoMetodo()`).

### `Min()`
* **Para que serve:** Encontra o menor valor numérico do array.
* **Exemplo:** `int menor = numeros.Min();`

### `Max()`
* **Para que serve:** Encontra o maior valor numérico do array.
* **Exemplo:** `int maior = numeros.Max();`

### `Sum()`
* **Para que serve:** Soma todos os números dentro do array.
* **Exemplo:** `int total = numeros.Sum();`

### `Average()`
* **Para que serve:** Calcula a média matemática de todos os valores do array.
* **Exemplo:** `double media = numeros.Average();`

### `Contains()`
* **Para que serve:** Checa se o array contém o item especificado (devolve `true` ou `false`).
* **Exemplo:** `bool temBanana = frutas.Contains("Banana");`

### `First()`
* **Para que serve:** Pega o primeiro item do array. Se o array estiver vazio, dá erro.
* **Exemplo:** `string primeiro = frutas.First();`

### `FirstOrDefault()`
* **Para que serve:** Pega o primeiro item do array. Se estiver vazio, devolve o valor padrão (ex: `null` para texto) em vez de estourar um erro.
* **Exemplo:** `string primeiro = frutas.FirstOrDefault();`

### `Last()`
* **Para que serve:** Pega o último item do array.
* **Exemplo:** `string ultimo = frutas.Last();`

### `Where()`
* **Para que serve:** Filtra o array devolvendo apenas os elementos que passam em um teste (como encontrar todos os números maiores que 10).
* **Exemplo:**
  ```csharp
  int[] numeros = { 5, 12, 18, 3 };
  var maioresQueDez = numeros.Where(n => n > 10).ToArray(); // Retorna { 12, 18 }
  ```

---

## Artigos relacionados:
* **[[01-Introdução ao Csharp.md|Introdução ao Csharp]]**
* **[[07-Arrays em Csharp.md|Arrays em Csharp]]**
* **[[06-Estruturas de repetição (for e while)|Estruturas de repetição (for e while)]]**
