# Tomando decisões e repetindo tarefas (condicionais e loops)
#csharp

Programar é como dar ordens a um robozinho. Às vezes você quer que ele faça escolhas, e às vezes quer que ele repita a mesma tarefa várias vezes.

---

## 1. Condicionais: o caminho do GPS (if e else)

Imagine que você está jogando videogame e chega numa bifurcação. O jogo diz: **Se** você tiver a chave, a porta abre. **Senão**, você precisa dar a volta.

No código, usamos `if` (Se) e `else` (Senão) baseados nas caixas de perguntas (`bool`):

```csharp
bool tenhoChave = true;

if (tenhoChave)
{
    Console.WriteLine("A porta abriu! Pode passar.");
}
else
{
    Console.WriteLine("Porta trancada. Vá procurar a chave!");
}
```

---

## 2. Repetição (loops): lavando a louça

Se sua mãe te mandar lavar 5 pratos, você não vai ler uma instrução diferente para cada prato. Você faz um loop: lava um prato, conta "1", lava outro, conta "2"... até chegar a 5.

### O loop for (sabendo a quantidade exata)
Usamos o `for` quando sabemos exatamente quantas vezes vamos repetir a tarefa.

```csharp
// Começamos no prato 1; continuamos enquanto for menor ou igual a 5; somamos 1 prato de cada vez
for (int prato = 1; prato <= 5; prato++)
{
    Console.WriteLine($"Lavei o prato número {prato}!");
}
```

### O loop while (enquanto uma regra for verdade)
Usamos o `while` quando não sabemos quantas vezes vamos repetir, apenas que devemos continuar até a regra mudar.
*Analogia: Continue correndo ENQUANTO você não estiver cansado.*

```csharp
bool cansado = false;
int energia = 100;

while (cansado == false)
{
    Console.WriteLine("Correndo...");
    energia = energia - 20; // Perde energia

    if (energia <= 0)
    {
        cansado = true; // Agora cansei! O loop vai parar.
    }
}
```

### O loop foreach (para cada item de um gaveteiro)
Usamos o `foreach` para vasculhar uma coleção inteira, como um [Array](Arrays.md), sem precisar contar de 1 em 1.
*Analogia: Abra e coma cada chocolate que está dentro de uma caixa.*

```csharp
string[] frutas = { "Maçã", "Banana", "Laranja" };

foreach (string fruta in frutas)
{
    Console.WriteLine($"Comi a fruta: {fruta}");
}
```

---

## Artigos relacionados:
* **[Introdução ao C#](Introducao.md)**
* **[Variáveis, operadores e tipos de dados](Vari%C3%A1veis,%20operadores%20e%20tipos%20de%20dados.md)**
* **[Arrays em C#](Arrays.md)**
* **[Métodos (funções)](M%C3%A9todos%20%28fun%C3%A7%C3%B5es%29.md)**
