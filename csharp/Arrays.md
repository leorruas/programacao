# Arrays em C#
#csharp

Um **Array** (ou vetor) é uma estrutura de dados que armazena uma coleção de elementos de mesmo tipo em uma sequência de tamanho fixo.

---

## 1. Declaração e inicialização

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

## 2. Acesso aos elementos

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

## 3. Propriedades e métodos úteis

### Tamanho do array (Length)
Para saber quantos elementos o array possui:
```csharp
int[] numeros = { 10, 20, 30, 40 };
Console.WriteLine(numeros.Length); // Saída: 4
```

### Classe System.Array
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

## 4. Percorrendo arrays (loops)

### Usando o loop for (útil se precisar do índice)
```csharp
string[] nomes = { "Ana", "Carlos", "Beatriz" };

for (int i = 0; i < nomes.Length; i++)
{
    Console.WriteLine($"Índice {i}: {nomes[i]}");
}
```

### Usando o loop foreach (mais limpo, ideal para leitura)
```csharp
string[] nomes = { "Ana", "Carlos", "Beatriz" };

foreach (string nome in nomes)
{
    Console.WriteLine(nome);
}
```

---

## 5. Arrays multidimensionais e jagged arrays

Até agora vimos gavetas simples. Mas e se precisarmos de estruturas mais complexas? Temos duas formas de organizar caixas maiores no C#:

### Array multidimensional (A matriz perfeita)
* **O que é:** Imagine um **tabuleiro de xadrez** ou de **jogo da velha**. Ele é uma grade perfeita, com linhas e colunas fixas. Todas as linhas têm exatamente o mesmo número de colunas.
* **Para que serve:** Serve para representar tabelas perfeitas (como um mapa de pixels da tela do jogo, coordenadas geográficas ou notas escolares de alunos em bimestres fixos).

No código:
```csharp
// Uma matriz com 2 linhas e 3 colunas fixas
int[,] tabuleiro = new int[2, 3] 
{
    { 10, 20, 30 }, // Linha 0
    { 40, 50, 60 }  // Linha 1
};

// Acessamos informando a [linha, coluna]
Console.WriteLine(tabuleiro[0, 1]); // Linha 0, Coluna 1 = Saída: 20
```

### Jagged array (O gaveteiro irregular)
* **O que é:** É um "array de arrays". Imagine um **gaveteiro de roupas** onde cada gaveta tem divisórias de tamanhos diferentes. A primeira gaveta tem espaço para 2 itens, a segunda para 3 itens, e a terceira para apenas 1 item. Ele é "dentado" (irregular).
* **Para que serve:** Serve para economizar memória quando as sublistas têm tamanhos diferentes. 
  * *Exemplo real:* Guardar os dias de tarefas de cada mês do ano. Janeiro tem 31 dias, Fevereiro tem 28, Abril tem 30. Usar uma matriz perfeita forçaria todos os meses a gastarem 31 espaços na memória de forma inútil. O Jagged Array resolve isso!

No código:
```csharp
// Criamos um gaveteiro com 2 gavetas principais
int[][] gaveteiro = new int[2][];

// Configuramos o tamanho diferente de cada gaveta
gaveteiro[0] = new int[] { 1, 2 };       // Gaveta 0 tem 2 espaços
gaveteiro[1] = new int[] { 3, 4, 5 };    // Gaveta 1 tem 3 espaços

// Acessamos informando primeiro a gaveta e depois a divisória: [gaveta][divisoria]
Console.WriteLine(gaveteiro[1][2]); // Gaveta 1, Divisória 2 = Saída: 5
```
