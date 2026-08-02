# Lista, pilha e fila em C#
#csharp

Agora que você já conhece o conceito teórico de [Tipos abstratos de dados](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/Tipos%20abstratos%20de%20dados.md), vamos ver como criar e mexer com as três estruturas de dados mais famosas do C#: a **Lista**, a **Pilha** e a **Fila**.

Todas elas servem para guardar coleções de dados, mas cada uma tem a sua própria regra de organização.

---

## 1. A Lista (`List<T>`) - O caderno flexível
A Lista é o gaveteiro mais livre de todos. Você pode colocar coisas no fim, tirar coisas do meio, ou enfiar um item novo bem no início (furando a fila!).

***Analogia:** Um caderno de anotações. Você pode adicionar tarefas no fim da página, apagar uma linha no meio, ou escrever algo entre duas linhas existentes.*

```csharp
using System;
using System.Collections.Generic; // Necessário para todas as coleções!

List<string> tarefas = new List<string>();

// 1. Adicionar no final (.Add)
tarefas.Add("Lavar a louça");
tarefas.Add("Estudar C#");

// 2. Inserir em qualquer posição (.Insert)
// Insere "Jogar videogame" na posição 1, empurrando "Estudar C#" para frente
tarefas.Insert(1, "Jogar videogame"); 

// 3. Remover de qualquer posição (.RemoveAt)
tarefas.RemoveAt(0); // Apaga o item no índice 0 ("Lavar a louça")
```

---

## 2. A Fila (`Queue<T>`) - O caixa do mercado
A Fila é justa e muito organizada. O primeiro elemento a entrar será, obrigatoriamente, o primeiro a ser retirado. Ninguém fura fila aqui!

***Analogia:** A esteira de compras de um supermercado. O primeiro produto que você coloca na esteira é o primeiro que a atendente vai passar no leitor de código de barras.*

No C#, usamos comandos especiais para filas:
* **`Enqueue` (Enfileirar):** Coloca o item no fim da fila.
* **`Dequeue` (Desenfileirar):** Tira o primeiro da fila da frente e nos entrega.
* **`Peek` (Espiar):** Dá uma olhada em quem é o primeiro da fila, sem tirá-lo de lá.

```csharp
Queue<string> filaDoBanco = new Queue<string>();

// 1. Adicionar no fim da fila (Enqueue)
filaDoBanco.Enqueue("Leonardo");
filaDoBanco.Enqueue("Ana");
filaDoBanco.Enqueue("Bia");

// 2. Espiar quem é o primeiro (Peek)
Console.WriteLine($"Quem é o próximo? {filaDoBanco.Peek()}"); // Saída: Leonardo

// 3. Atender e retirar da fila (Dequeue)
string atendido = filaDoBanco.Dequeue(); // Tira "Leonardo" da fila
Console.WriteLine($"Atendido: {atendido}");

Console.WriteLine($"Próximo da fila agora: {filaDoBanco.Peek()}"); // Saída: Ana
```

---

## 3. A Pilha (`Stack<T>`) - A lata de batatas Pringles
A Pilha é o oposto da Fila: o último item que você coloca em cima é obrigatoriamente o primeiro que você tem que retirar. 

***Analogia:** Uma lata de batatas Pringles. A última batata colocada no topo da fábrica é a primeira que você consegue pegar e comer ao abrir o tubo.*

No C#, usamos estes comandos para pilhas:
* **`Push` (Empilhar):** Coloca o item no topo.
* **`Pop` (Desempilhar):** Retorna e remove o item que está no topo.
* **`Peek` (Espiar):** Dá uma espiada em qual item está no topo, sem removê-lo.

```csharp
Stack<string> historicoNavegador = new Stack<string>();

// 1. Empilhar novas páginas (Push)
historicoNavegador.Push("google.com");
historicoNavegador.Push("github.com");
historicoNavegador.Push("youtube.com"); // Fica no topo!

// 2. Espiar o topo (Peek)
Console.WriteLine($"Página atual: {historicoNavegador.Peek()}"); // Saída: youtube.com

// 3. Voltar página (Pop - remove e retorna o topo)
string paginaRemovida = historicoNavegador.Pop(); // Tira "youtube.com"
Console.WriteLine($"Voltei da página: {paginaRemovida}");

Console.WriteLine($"Nova página no topo: {historicoNavegador.Peek()}"); // Saída: github.com
```

---

## Artigos relacionados:
* **[Tipos abstratos de dados](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/Tipos%20abstratos%20de%20dados.md)**
* **[Coleções em C#](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/Cole%C3%A7%C3%B5es.md)**
* **[Arrays em C#](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/Arrays.md)**
