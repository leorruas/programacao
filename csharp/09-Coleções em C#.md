# Coleções em C# (Os gaveteiros mágicos)
#csharp

Até agora, vimos os [Arrays](07-Arrays%20em%20C#.md), que servem para guardar uma lista de itens. Mas os arrays têm um problema: eles são como gaveteiros de madeira rígidos. Se você construiu um com 5 gavetas, terá 5 gavetas para sempre. Se precisar de uma sexta, terá que construir um armário novo do zero.

No C#, as **Coleções** (do pacote `System.Collections.Generic`) resolvem isso. Elas são como **gaveteiros elásticos mágicos** que esticam e encolhem sozinhos conforme você adiciona ou remove itens!

---

## 1. A Coleção mais usada: `List<T>` (A lista elástica)

A `List<T>` (pronuncia-se *List de T*) é uma lista ordenada onde os itens ficam em fila, muito parecida com um array, mas sem tamanho fixo. O `[T]` representa o tipo de dado que a lista vai aceitar.

***Analogia:** Uma lista de compras no papel. Você pode riscar itens ou adicionar novos no final da folha a qualquer momento.*

```csharp
using System;
using System.Collections.Generic; // IMPORTANTE: Necessário para usar coleções!

class Program
{
    static void Main()
    {
        // Criamos uma lista vazia de textos (string)
        List<string> compras = new List<string>();

        // 1. Adicionar itens (.Add)
        compras.Add("Leite");
        compras.Add("Pão");
        compras.Add("Café"); // A lista cresceu para tamanho 3!

        // 2. Remover itens (.Remove)
        compras.Remove("Pão"); // O C# tira o pão e reorganiza os outros itens na hora!

        // 3. Ver o tamanho (.Count - equivalente ao Length do Array)
        Console.WriteLine($"Total de itens: {compras.Count}"); // Saída: 2

        // 4. Acessar como se fosse um array
        Console.WriteLine($"Primeiro item: {compras[0]}"); // Saída: Leite
    }
}
```

---

## 2. A Coleção de etiquetas: `Dictionary<TKey, TValue>` (Chave e Valor)

O dicionário é uma coleção onde cada informação guardada (o **Valor**) está associada a uma etiqueta única (a **Chave**). Você não acessa os itens por números (0, 1, 2), mas sim pela chave correspondente.

***Analogia:** O cabideiro de uma festa. Você entrega o seu casaco (Valor) e recebe uma ficha com um número (Chave). Para pegar o casaco de volta, basta apresentar a ficha.*

```csharp
// Criamos um dicionário onde a Chave é um número (int) e o Valor é um nome (string)
Dictionary<int, string> usuarios = new Dictionary<int, string>();

// Adicionando usuários associados a um ID (Chave)
usuarios.Add(101, "Leonardo");
usuarios.Add(102, "Ana");

// Acessando diretamente pela Chave
Console.WriteLine($"Dono do ID 101: {usuarios[101]}"); // Saída: Leonardo
```

---

## 3. A Sacola sem repetições: `HashSet<T>` (Conjunto único)

O `HashSet` é como uma **sacola de figurinhas**. Ele não se importa com a ordem delas, mas tem uma regra rígida: **não são permitidas duplicatas**. Se você tentar colocar um item que já está na sacola, ele simplesmente ignora.

***Para que serve:** Fazer buscas ultra rápidas para saber se algo existe (ex: verificar se um nome de usuário já está cadastrado no sistema).*

```csharp
HashSet<string> convidados = new HashSet<string>();

convidados.Add("Ana");
convidados.Add("Bia");
convidados.Add("Ana"); // Ignorado automaticamente! Ana já está no conjunto.

Console.WriteLine(convidados.Count); // Saída: 2
```

---

## 4. Tabela comparativa rápida

| Coleção | Ordem fixa | Aceita duplicados | Como busca o item |
| :--- | :--- | :--- | :--- |
| **`Array`** | Sim | Sim | Pela posição (índice numérico) |
| **`List<T>`** | Sim | Sim | Pela posição (índice numérico) |
| **`Dictionary<K, V>`** | Não | Chaves únicas | Apresentando a Chave |
| **`HashSet<T>`** | Não | Não (apenas únicos) | Checando se existe na sacola |

---

## Artigos relacionados:
* **[Introdução ao C#](01-Introdu%C3%A7%C3%A3o%20ao%20C#.md)**
* **[Arrays em C#](07-Arrays%20em%20C#.md)**
* **[Guia de estudos de C#](00-Guia%20de%20estudos.md)**
