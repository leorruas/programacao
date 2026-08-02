# Métodos (como ensinar truques ao computador)
#csharp

Imagine que você tem um cachorro de estimação. Toda vez que você quiser que ele dê a patinha, você não quer ter que explicar passo a passo: *"Levante a perna direita, dobre o joelho, estique para a minha mão"*. 

Você só ensina um comando chamado **"DarAPatinha"**. Depois disso, basta falar esse nome e ele faz o truque sozinho!

Um **Método** (também chamado de Função) é exatamente esse comando ou truque que você ensina ao computador.

---

## 1. Os três passos do truque

Um método geralmente funciona em três etapas:
1. **Ingredientes (Parâmetros):** O que você dá ao método (ex: um petisco).
2. **Ação (Corpo):** O que ele faz com os ingredientes (dar a patinha).
3. **Recompensa (Retorno):** O resultado que ele te entrega de volta.

---

## 2. Criando o comando no código

Vamos criar um método para somar dois números:

```csharp
// int: é o tipo de dado que ele nos DEVOLVE (a recompensa)
// Somar: é o nome do nosso comando (o truque)
// (int numeroA, int numeroB): são as coisas que ele precisa receber para funcionar (ingredientes)
int Somar(int numeroA, int numeroB)
{
    int resultado = numeroA + numeroB;
    return resultado; // devolve o resultado final de volta
}
```

E para usar o comando em outro lugar:
```csharp
int total = Somar(5, 7); // Apertamos o botão e guardamos o 12 na caixa 'total'
```

---

## 3. Comandos sem recompensa (`void`)

Alguns métodos servem apenas para fazer uma tarefa sem precisar te devolver nada. É o caso de mandar o cachorro sentar (ele só senta, não te devolve um objeto). No código, chamamos isso de `void` (vazio).

```csharp
void Latir()
{
    Console.WriteLine("Au Au!"); // Só faz barulho, não devolve nenhum dada!
}
```

---

## Artigos relacionados:
* **[Introdução ao C#](Introducao.md)**
* **[Variáveis, operadores e tipos de dados](Vari%C3%A1veis,%20operadores%20e%20tipos%20de%20dados.md)**
* **[Programação orientada a objetos](Programa%C3%A7%C3%A3o%20orientada%20a%20objetos.md)**
