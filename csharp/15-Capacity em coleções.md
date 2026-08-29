# Capacity em Coleções C# (Capacidade vs Contagem)
#csharp

Ao mexer com [[csharp/14-Coleções em Csharp|coleções dinâmicas]] no C# (como `List<T>`, `Queue<T>`, `Stack<T>` e até o `StringBuilder`), existem dois conceitos fundamentais que as pessoas costumam confundir, mas que são cruciais para a performance do código: **Count** (Contagem) e **Capacity** (Capacidade).

---

## 1. Qual é a diferença?

*   **`Count` (Quantos itens existem agora):** É a quantidade de elementos que estão **atualmente dentro** da [[csharp/14-Coleções em Csharp|coleção]]. Se a [[csharp/17-Lista, pilha e fila|lista]] está vazia, o `Count` é 0.
*   **`Capacity` (Quantos itens cabem na memória alocada):** É a quantidade de elementos que a coleção consegue guardar **na memória atualmente reservada** sem precisar se expandir.

***Analogia:** Imagine um ônibus de excursão com espaço para **40 passageiros** (isto é a **Capacity**). Se no momento apenas **15 pessoas** entraram no ônibus, o número de passageiros atual é 15 (isto é o **Count**).*

---

## 2. Como o C# gerencia a Capacity por baixo dos panos?

Por padrão, coleções como a `List<T>` utilizam um **[[csharp/12-Arrays em Csharp|array]] estático convencional** na memória para guardar os itens. Como o tamanho desse array precisa ser definido quando ele é criado, o C# faz uma "mágica" de redimensionamento automático:

1. Se você cria uma lista vazia, ela começa com `Capacity = 0`.
2. Ao adicionar o primeiro item com `.Add()`, o C# aloca internamente um array com uma capacidade padrão (geralmente **4**).
3. Quando você tenta adicionar o **5º item** (estourando o espaço disponível), o C# automaticamente:
    * Cria um **novo array interno** com o **dobro** do tamanho anterior (tamanho **8**).
    * **Copia** os 4 itens originais para esse novo array.
    * Adiciona o 5º item.
    * Descarta o array antigo de tamanho 4 para ser limpo pelo coletor de lixo (*Garbage Collector*).

Esse processo de duplicar de tamanho ocorre sempre que o limite é atingido (4 $\rightarrow$ 8 $\rightarrow$ 16 $\rightarrow$ 32 $\rightarrow$ ...).

```csharp
List<int> numeros = new List<int>();

Console.WriteLine($"Itens: {numeros.Count} | Capacidade: {numeros.Capacity}");
// Saída: Itens: 0 | Capacidade: 0

numeros.Add(1);
Console.WriteLine($"Itens: {numeros.Count} | Capacidade: {numeros.Capacity}");
// Saída: Itens: 1 | Capacidade: 4 (alocação inicial padrão)

// Adicionando até encher a capacidade atual...
numeros.Add(2);
numeros.Add(3);
numeros.Add(4);

numeros.Add(5); // Estourou a capacidade de 4!
Console.WriteLine($"Itens: {numeros.Count} | Capacidade: {numeros.Capacity}");
// Saída: Itens: 5 | Capacidade: 8 (a capacidade duplicou automaticamente)
```

---

## 3. Impacto de Performance e Boas Práticas

Copiar itens de um array para outro toda vez que o array enche consome processamento e gera lixo na memória. 

### Quando definir a Capacity manualmente?
Se você já sabe de antemão quantos itens vai guardar na sua coleção (ou tem uma estimativa próxima), você pode passar a capacidade inicial diretamente no **construtor** da coleção.

```csharp
// Ruim: Se carregar 10.000 itens, a lista vai duplicar de tamanho e copiar dados cerca de 12 vezes!
List<int> listaLenta = new List<int>();

// Excelente: Aloca memória exata para 10.000 itens de uma única vez. Zero redimensionamentos!
List<int> listaRapida = new List<int>(10000);
```

### O método `TrimExcess()`
Se você carregou uma lista gigante, removeu muitos itens dela e sabe que ela não vai mais crescer, você pode liberar a memória não utilizada forçando o C# a reduzir a `Capacity` para bater exatamente com o `Count`:

```csharp
List<string> nomes = new List<string>(1000); // Capacidade alocada: 1000
// ... adicionou nomes, depois removeu a maioria ...

Console.WriteLine($"Itens: {nomes.Count} | Capacidade: {nomes.Capacity}"); 
// Saída Exemplo: Itens: 50 | Capacidade: 1000

nomes.TrimExcess(); // Reduz a capacidade para o tamanho atual

Console.WriteLine($"Itens: {nomes.Count} | Capacidade: {nomes.Capacity}"); 
// Saída Exemplo: Itens: 50 | Capacidade: 50
```

---

## Artigos relacionados:
* **[[csharp/14-Coleções em Csharp|Coleções em Csharp]]**
* **[[csharp/12-Arrays em Csharp|Arrays em Csharp]]**
* **[[csharp/17-Lista, pilha e fila|Lista, pilha e fila em Csharp]]**
