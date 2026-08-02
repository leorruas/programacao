# Arrays em C#
#csharp

Um **Array** (ou vetor) é uma estrutura de dados que armazena uma coleção de elementos de mesmo tipo em uma sequência de tamanho fixo.

---

## 1. Declaração e Inicialização

Existem várias formas de declarar e inicializar um array em C#:

```csharp
// 1. Declarar sem inicializar (tamanho definido, elementos com valor padrão: 0 para int)
int[] numeros = new int[5];

// 2. Declarar e inicializar com valores
int[] valores = new int[] { 1, 2, 3, 4, 5 };

// 3. Sintaxe simplificada (mais comum)
string[] nomes = { "Ana", "Carlos", "Beatriz" };
```

---

## 2. Acesso aos Elementos

Os arrays em C# utilizam **índice baseado em zero** (o primeiro elemento fica no índice `0` e o último no índice `tamanho - 1`).

```csharp
string[] frutas = { "Maçã", "Banana", "Laranja" };

// Acessar um elemento
Console.WriteLine(frutas[0]); // Saída: Maçã

// Alterar um elemento
frutas[1] = "Pêra";
Console.WriteLine(frutas[1]); // Saída: Pêra
```

---

## 3. Propriedades e Métodos Úteis

### Tamanho do Array (`Length`)
Para saber quantos elementos o array possui:
```csharp
int[] numeros = { 10, 20, 30, 40 };
Console.WriteLine(numeros.Length); // Saída: 4
```

### Classe `System.Array`
O C# fornece a classe utilitária `Array` com vários métodos estáticos úteis:

```csharp
int[] numeros = { 5, 2, 8, 1 };

// Ordenar o array (crescente)
Array.Sort(numeros); // numeros agora é { 1, 2, 5, 8 }

// Inverter a ordem
Array.Reverse(numeros); // numeros agora é { 8, 5, 2, 1 }

// Localizar o índice de um elemento
int indice = Array.IndexOf(numeros, 5); // Retorna 1
```

---

## 4. Percorrendo Arrays (Loops)

### Usando o Loop `for` (Útil se precisar do índice)
```csharp
string[] nomes = { "Ana", "Carlos", "Beatriz" };

for (int i = 0; i < nomes.Length; i++)
{
    Console.WriteLine($"Índice {i}: {nomes[i]}");
}
```

### Usando o Loop `foreach` (Mais limpo, ideal para leitura)
```csharp
string[] nomes = { "Ana", "Carlos", "Beatriz" };

foreach (string nome in nomes)
{
    Console.WriteLine(nome);
}
```

---

## 5. Arrays Multidimensionais e Jagged Arrays

### Array Bidimensional (Matriz)
```csharp
// Linhas e Colunas definidas
int[,] matriz = new int[2, 3] 
{
    { 1, 2, 3 },
    { 4, 5, 6 }
};

Console.WriteLine(matriz[0, 1]); // Linha 0, Coluna 1 = Saída: 2
```

### Jagged Array (Array de Arrays - tamanhos de linhas diferentes)
```csharp
int[][] jaggedArray = new int[2][];
jaggedArray[0] = new int[] { 1, 2 };
jaggedArray[1] = new int[] { 3, 4, 5 };

Console.WriteLine(jaggedArray[1][2]); // Saída: 5
```
