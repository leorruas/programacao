# Programação orientada a objetos (Classes, objetos e construtores)
#csharp

A **Programação orientada a objetos** (POO) é apenas um nome chique para uma forma de programar que tenta organizar o código imitando a nossa vida real. 

No mundo real, tudo é um objeto: carros, cachorros, pessoas e celulares. Todos eles têm **características** (cor, tamanho, nome) e **ações** (andar, emitir som, ligar).

---

## 1. A fôrma de bolo (classe) e o bolo de verdade (objeto)

* **Classe (O Molde):** Imagine uma fôrma de silicone para fazer bolos em formato de dinossauro. A fôrma não é o bolo, você não pode comê-la. Ela apenas define o tamanho e o visual que o bolo terá quando ficar pronto.
* **Objeto (O Bolo real):** É o bolo de verdade que você assou usando aquela fôrma. Você pode criar 10 bolos usando a mesma fôrma: um de chocolate, um de baunilha, um rosa, etc.

No código do C#:
```csharp
// Criamos a classe (a fôrma do dinossauro)
class Dinossauro
{
    // Características (Propriedades)
    public string nome;
    public string cor;

    // Ações (Métodos)
    public void Rugir()
    {
        Console.WriteLine($"{nome} está rugindo: RAAAWR!");
    }
}
```

E para assar os bolos (criar objetos de verdade):
```csharp
// Criando dinossauros reais usando o molde
Dinossauro rex = new Dinossauro();
rex.nome = "Rex";
rex.cor = "Verde";

Dinossauro tito = new Dinossauro();
tito.nome = "Tito";
tito.cor = "Azul";

rex.Rugir(); // Saída: Rex está rugindo: RAAAWR!
```

---

## 2. O construtor: a decoração inicial

O **Construtor** é um [[12-Métodos (funções)|método]] especial que roda sozinho no exato momento em que você cria o seu objeto (quando usa a palavra `new`). Ele funciona como a decoração imediata do bolo assim que ele sai da fôrma (ex: colocar cobertura).

Ele serve para garantir que o seu objeto comece com as informações mais importantes já preenchidas logo de cara.

```csharp
class Dinossauro
{
    public string nome;
    public string cor;

    // Construtor: Tem o mesmo nome da classe e serve para preencher os dados iniciais
    public Dinossauro(string nomeInicial, string corInicial)
    {
        nome = nomeInicial;
        cor = corInicial;
    }
}
```

Agora, ao criar o dinossauro, você já passa as informações necessárias na mesma hora:
```csharp
// Muito mais simples! Criamos e configuramos o dinossauro em um passo só
Dinossauro rex = new Dinossauro("Rex", "Verde");
```

---

## 3. Quando usar classes?

Pense nas classes como os **Componentes Master no Figma**. Você deve criar e usar uma classe quando:

* **Precisar de moldes reutilizáveis:** Se você precisa instanciar vários objetos com a mesma estrutura (ex: vários `Usuarios`, `Produtos` ou `Inimigos`).
* **Agrupar dados e ações:** Em vez de ter [[03-Variáveis, operadores e tipos de dados|variáveis]] soltas (`string produtoNome; double produtoPreco;`), você agrupa a informação com a lógica de funcionamento dela dentro de um molde só.
* **Modelar o mundo real:** Quando precisar representar entidades complexas do negócio ou do jogo que têm propriedades (características) e realizam [[12-Métodos (funções)|métodos]] (ações).

---

## Artigos relacionados:
* **[[01-Introdução ao Csharp.md|Introdução ao Csharp]]**
* **[[12-Métodos (funções)|Métodos (funções)]]**
* **[[03-Variáveis, operadores e tipos de dados|Variáveis, operadores e tipos de dados]]**
