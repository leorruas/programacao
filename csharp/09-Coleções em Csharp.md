# Coleções em Csharp (Os gaveteiros mágicos)
#csharp

Até agora, vimos os [[07-Arrays em Csharp|Arrays]], que servem para guardar uma lista de itens. Mas os [[07-Arrays em Csharp|arrays]] têm um problema: eles são como gaveteiros de madeira rígidos. Se você construiu um com 5 gavetas, terá 5 gavetas para sempre. Se precisar de uma sexta, terá que construir um armário novo do zero.

No C#, as **Coleções** resolvem isso. Elas são divididas em dois grandes grupos:
1. **Coleções Genéricas (`System.Collections.Generic`):** Fortemente tipadas, seguras e muito rápidas. **Sempre prefira estas.**
2. **Coleções Não Genéricas (`System.Collections`):** Antigas (legadas), guardam tudo como `object`, exigindo conversões (*boxing/unboxing*) que deixam o programa mais lento.

---

## 1. As Coleções Genéricas (Recomendadas)

### A. A mais usada: `List<T>` (A lista elástica)
Uma lista ordenada onde os itens ficam em sequência, muito parecida com um array, mas sem tamanho fixo. O `<T>` representa o tipo de dado que a lista vai aceitar.
* **Analogia:** Um caderno de anotações. Você pode adicionar tarefas no fim, riscar itens no meio, ou enfiar um item novo bem no início (furando a fila).
* **Quando usar:** Quando você precisa de uma lista flexível onde a ordem importa e você precisa acessar itens pelo índice (posição).

> [!TIP]
> **Como funciona o `.Add()`?**
> Ao contrário dos arrays normais, as coleções dinâmicas possuem o [[12-Métodos (funções)|método]] `.Add(item)`. Ele insere o item no fim da lista e gerencia automaticamente a alocação de memória. Se a lista estiver cheia, o C# aloca um espaço maior e copia os dados por baixo dos panos (veja mais em [[18-Capacity em coleções|Capacity em coleções]]).

```csharp
using System;
using System.Collections.Generic;

List<string> compras = new List<string>();
compras.Add("Leite");
compras.Add("Pão");
compras.Insert(1, "Café"); // Insere na posição 1, empurrando o Pão para frente

compras.Remove("Pão"); // Remove o item diretamente
Console.WriteLine(compras[0]); // Saída: Leite
```

### B. A Coleção de etiquetas: `Dictionary<TKey, TValue>` (Chave e Valor)
Associa uma informação guardada (o **Valor**) a uma etiqueta única (a **Chave**). Você não acessa os itens por números (0, 1, 2), mas sim pela chave correspondente.
* **Analogia:** O cabideiro de uma festa. Você entrega o seu casaco (Valor) e recebe uma ficha com um número (Chave). Para pegar o casaco de volta, basta apresentar a ficha.
* **Quando usar:** Quando você precisa buscar valores rapidamente usando uma identificação única (ex: buscar um usuário pelo CPF ou ID).

```csharp
Dictionary<int, string> usuarios = new Dictionary<int, string>();
usuarios.Add(101, "Leonardo");
usuarios.Add(102, "Ana");

Console.WriteLine(usuarios[101]); // Saída: Leonardo
```

### C. A Sacola sem repetições: `HashSet<T>` (Conjunto único)
Uma sacola que não se importa com a ordem dos itens, mas garante que **não existam duplicatas**.
* **Analogia:** Uma sacola de figurinhas. Se você tentar colocar uma figurinha repetida, ela é ignorada.
* **Quando usar:** Para buscas ultra rápidas de existência (saber se um elemento está lá dentro) e quando duplicatas não são permitidas (ex: lista de e-mails de destinatários).

```csharp
HashSet<string> convidados = new HashSet<string>();
convidados.Add("Ana");
convidados.Add("Ana"); // Ignorado automaticamente!

Console.WriteLine(convidados.Count); // Saída: 1
```

### D. A Fila: `Queue<T>` (O caixa do mercado)
Estrutura FIFO (*First-In, First-Out*): o primeiro a entrar é obrigatoriamente o primeiro a sair.
* **Analogia:** Fila de banco ou caixa de supermercado.
* **Quando usar:** Processamento de tarefas por ordem de chegada (ex: fila de impressão, fila de mensagens para processar).

```csharp
Queue<string> fila = new Queue<string>();
fila.Enqueue("Leonardo"); // Entra na fila
fila.Enqueue("Ana");

Console.WriteLine(fila.Peek()); // Espia o primeiro: Leonardo
string atendido = fila.Dequeue(); // Remove e retorna o primeiro (Leonardo)
```

### E. A Pilha: `Stack<T>` (A lata de Pringles)
Estrutura LIFO (*Last-In, First-Out*): o último item adicionado no topo é o primeiro a ser removido.
* **Analogia:** Uma lata de batatas Pringles ou uma [[11-Lista, pilha e fila|pilha]] de pratos.
* **Quando usar:** Histórico de navegação (botão Voltar), função de "Desfazer" (Ctrl+Z) ou caminhos de algoritmos (backtracking).

```csharp
Stack<string> paginas = new Stack<string>();
paginas.Push("google.com");
paginas.Push("github.com"); // Fica no topo

string ultima = paginas.Pop(); // Remove e retorna "github.com"
```

### F. A Lista Encadeada: `LinkedList<T>`
Diferente da `List<T>` (que usa um array por baixo dos panos), cada elemento (`LinkedListNode`) aponta fisicamente para o próximo e para o anterior na memória.
* **Analogia:** Um trem. Cada vagão está fisicamente engatado no vagão da frente e no de trás.
* **Quando usar:** Quando você precisa inserir ou remover itens frequentemente no meio da lista de forma muito rápida, sem ter que reorganizar todos os outros elementos na memória.

```csharp
LinkedList<string> playlist = new LinkedList<string>();
var no1 = playlist.AddLast("Música 1");
var no2 = playlist.AddAfter(no1, "Música 2"); // Adiciona logo após a primeira
```

---

## 2. As Coleções Não Genéricas (Legadas/Antigas)

Estas coleções aceitam qualquer [[13-Programação orientada a objetos|objeto]] (`object`) e devem ser evitadas em projetos novos devido à perda de performance com conversões e falta de segurança.

* **`ArrayList`:** O equivalente antigo de `List<T>`. Permite misturar tipos na mesma lista (o que geralmente causa erros de execução).
* **`Hashtable`:** O equivalente antigo de `Dictionary<TKey, TValue>`.

```csharp
using System.Collections; // Namespace das coleções antigas

ArrayList listaAntiga = new ArrayList();
listaAntiga.Add("Texto");
listaAntiga.Add(123); // Aceita tipos diferentes na mesma lista! (Perigoso)

Hashtable tabelaAntiga = new Hashtable();
tabelaAntiga.Add("Chave", "Valor");
```

---

## 2.1. Comparação Direta: Array vs `List<T>` vs `ArrayList`

Muitas vezes surge a dúvida: *"Quando devo usar um Array, uma `List<T>` ou um `ArrayList`?"*. Aqui estão os três pontos fundamentais que diferenciam eles:

### A. O tamanho (Fixo vs Dinâmico)
*   **Array (`T[]`):** Tem tamanho **fixo**. Uma vez criado com 5 posições, ele sempre terá 5 posições. Não é possível usar `.Add()`.
*   **`List<T>` e `ArrayList`:** Têm tamanho **dinâmico**. Eles começam vazios e esticam conforme você adiciona itens com `.Add()`.

### B. A Segurança de Tipos (Genérico vs Não Genérico)
*   **Array (`T[]`) e `List<T>`:** São **fortemente tipados (Genéricos)**. Se você cria uma `List<int>` ou um `int[]`, o C# te impede fisicamente de tentar inserir um texto (`string`) lá dentro. O erro é pego na hora de digitar o código (compilação).
*   **`ArrayList`:** É **fracamente tipado (Não Genérico)**. Ele guarda tudo como o tipo base `object`. Isso significa que você pode colocar uma `string`, um `int` e um `double` tudo misturado na mesma lista. O problema é que, ao ler o dado, você é obrigado a fazer uma conversão manual (*cast*), e se converter errado, o programa trava no meio da execução (Runtime).

### C. Performance (Boxing e Unboxing)
*   **Array (`T[]`) e `List<T>`:** Guardam o tipo exato diretamente. Muito rápidos.
*   **`ArrayList`:** Como guarda tudo como `object`, tipos primitivos (como `int`) precisam ser convertidos para objetos na memória heap (*boxing*) para entrar na lista, e depois convertidos de volta para número (*unboxing*) quando são lidos. Esse processo consome muito processamento.

> [!IMPORTANT]
> **Resumo da Regra Prática:**
> * Use **`List<T>`** para quase tudo no dia a dia (flexível e segura).
> * Use **Array (`T[]`)** apenas se o tamanho for estritamente fixo e você precisar de máxima performance de memória.
> * **Evite ao máximo o `ArrayList`**. Ele só é usado hoje em dia para dar manutenção em códigos muito antigos (legados).

---

## 3. Tabela Comparativa Geral

| Coleção | Tipo | Ordem / Sequência | Permite Duplicados | Acesso / Busca | Quando usar |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`List<T>`** | Genérica | Sim (índice) | Sim | Rápido por índice, lento por valor | Acesso rápido por índice, lista dinâmica comum |
| **`Dictionary<K, V>`** | Genérica | Não | Chaves únicas, Valores duplicados | Ultra rápido pela Chave | Busca rápida associando uma identificação ao objeto |
| **`HashSet<T>`** | Genérica | Não | Não (apenas únicos) | Ultra rápido (apenas checa se existe) | Garantir elementos únicos e checagem rápida de presença |
| **`Queue<T>`** | Genérica | Sim (ordem de entrada) | Sim | Apenas no início da fila (`Dequeue`/`Peek`) | Processamento FIFO (ordem de chegada) |
| **`Stack<T>`** | Genérica | Sim (inversa) | Sim | Apenas no topo (`Pop`/`Peek`) | Processamento LIFO (histórico, desfazer/Ctrl+Z) |
| **`LinkedList<T>`** | Genérica | Sim (encadeada) | Sim | Lento (precisa percorrer nó por nó) | Inserção/remoção frequente de elementos no meio |
| **`ArrayList`** | Legada | Sim | Sim | Igual `List<T>`, mas sem segurança de tipo | **Evitar.** Use `List<T>`. |
| **`Hashtable`** | Legada | Não | Chaves únicas | Igual `Dictionary`, mas sem segurança de tipo | **Evitar.** Use `Dictionary<K,V>`. |

---

## Artigos relacionados:
* **[[10-Tipos abstratos de dados|Tipos abstratos de dados]]**
* **[[11-Lista, pilha e fila.md|Lista, pilha e fila em Csharp]]**
* **[[07-Arrays em Csharp.md|Arrays em Csharp]]**
* **[[04-Segurança de tipos.md|Segurança de tipos]]**
