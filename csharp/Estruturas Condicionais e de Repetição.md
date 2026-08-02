# Estruturas Condicionais e de Repetição em C#

Programar computadores é basicamente ensinar o seu código a tomar decisões e a fazer tarefas repetitivas sem reclamar. Para isso, usamos dois conceitos principais: **Decisões** (Condições) e **Loops** (Repetições).

---

## 1. Condicionais: Tomando Decisões (O "GPS" do Código)

Imagine que você está dirigindo e o GPS avisa: *"Se a ponte estiver aberta, continue reto. Senão, pegue o desvio à direita"*. No código, usamos `if` (Se) e `else` (Senão) para representar isso baseados em [Variáveis e Operadores](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/Vari%C3%A1veis,%20Operadores%20e%20Tipos%20de%20Dados.md).

```csharp
bool ponteAberta = true;

if (ponteAberta)
{
    Console.WriteLine("Continue reto!");
}
else
{
    Console.WriteLine("Pegue o desvio à direita.");
}
```

### O `switch` (O Painel de Escolhas)
Se você tiver muitas opções, o `if-else` pode ficar confuso. O `switch` funciona como escolher o andar no elevador: você clica no botão do andar desejado e ele te leva direto para lá.

```csharp
int andarDesejado = 2;

switch (andarDesejado)
{
    case 1:
        Console.WriteLine("Você chegou ao Primeiro Andar.");
        break;
    case 2:
        Console.WriteLine("Você chegou ao Segundo Andar.");
        break;
    default:
        Console.WriteLine("Esse andar não existe.");
        break;
}
```

---

## 2. Repetição: Loops (Fazendo a mesma tarefa várias vezes)

Imagine que você precisa escrever a frase *"Não vou conversar na aula"* 100 vezes no quadro negro. Em vez de escrever manualmente 100 linhas de código, você pode criar uma máquina que escreve para você até que termine.

### O Loop `while` (Enquanto)
O `while` repete uma tarefa **enquanto** uma condição for verdadeira.
*Analogia: Continue comendo o chocolate ENQUANTO ainda tiver pedaços no pacote.*

```csharp
int pedacosChocolate = 5;

while (pedacosChocolate > 0)
{
    Console.WriteLine("Comi um pedaço!");
    pedacosChocolate--; // Diminui em 1 o chocolate
}
```

### O Loop `for` (Contagem Controlada)
O `for` é perfeito quando você já sabe **exatamente** quantas vezes quer repetir uma tarefa. Ele cria um contador interno próprio.
*Analogia: Dê exatamente 5 voltas correndo ao redor do quarteirão.*

```csharp
for (int volta = 1; volta <= 5; volta++)
{
    Console.WriteLine($"Concluí a volta {volta}!");
}
```

### O Loop `foreach` (Para Cada Elemento)
O `foreach` é a melhor forma de ler coleções como [Arrays](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/Arrays.md). Ele visita cada item da coleção, um por um, sem precisar de contadores.
*Analogia: Abra cada presente que está na pilha de presentes.*

```csharp
string[] convidados = { "Ana", "Bia", "Carlos" };

foreach (string convidado in convidados)
{
    Console.WriteLine($"Seja bem-vindo, {convidado}!");
}
```

---

## Artigos Relacionados:
* **[Introdução ao C#](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/Introducao.md)**
* **[Variáveis, Operadores e Tipos de Dados](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/Vari%C3%A1veis,%20Operadores%20e%20Tipos%20de%20Dados.md)**
* **[Arrays em C#](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/Arrays.md)**
* **[Métodos (Funções)](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/M%C3%A9todos%20(Fun%C3%A7%C3%B5es).md)**
