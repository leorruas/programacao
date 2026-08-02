# Segurança de Tipos (C# é Strongly Typed!)

Imagine que você está brincando com aqueles brinquedos de criança de encaixar formas geométricas. O triângulo só entra no buraco triangular, o círculo no buraco circular, e o quadrado no quadrado. 

Se você tentar empurrar à força um quadrado no buraco do círculo, simplesmente não dá certo.

A **Segurança de Tipos** (ou o fato do C# ser uma linguagem *Strongly Typed*) funciona exatamente assim!

---

## 1. O que isso significa na prática?

Em linguagens "fracamente tipadas" (como JavaScript), você pode criar uma caixa, colocar um número lá dentro e, logo depois, substituir esse número por um texto sem que ninguém te impeça. É como ter uma caixa onde cabe qualquer coisa, mas que pode causar uma bagunça se você esquecer o que colocou lá dentro.

No **C#**, quando você diz que uma "caixa" (uma [variável](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/VariaveisOperadoresTipos.md)) serve para guardar números inteiros (`int`), **ela só poderá guardar números inteiros**. O computador não vai deixar você colocar um texto nela de jeito nenhum.

---

## 2. Um exemplo do dia a dia do código

Veja o que acontece se tentarmos misturar as coisas:

```csharp
// Criamos uma caixa rotulada para guardar a idade (número inteiro)
int idade = 25;

// O compilador (o fiscal de regras do C#) vai dar erro se você tentar fazer isso:
idade = "Vinte e cinco"; // ERRO! Texto não cabe em caixa de número.
```

O fiscal do C# vai gritar imediatamente: *"Ei! Você não pode colocar um texto (string) dentro de uma caixa de número inteiro (int)!"*

---

## 3. Por que isso é ótimo? (Erros antes de rodar o programa)

A maior vantagem disso é que os erros são descobertos em **tempo de compilação** (antes mesmo de o programa começar a funcionar) e não em **tempo de execução** (quando o usuário já está usando o aplicativo e ele quebra do nada).

É muito melhor o seu editor de códigos piscar uma luz vermelha avisando que você errou, do que o seu aplicativo fechar na cara do seu cliente, certo?

---

## Artigos Relacionados:
* **[Introdução ao C#](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/Introducao.md)**
* **[Variáveis, Operadores e Tipos de Dados](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/VariaveisOperadoresTipos.md)**
* **[Arrays em C#](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/Arrays.md)**
