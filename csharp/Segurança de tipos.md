# Segurança de tipos (Por que o C# é tão protetor?)
#csharp

Sabe aqueles brinquedos de bebê que têm uma caixa com buracos em formato de estrela, círculo e quadrado? Se você tentar colocar a estrela de plástico no buraco do círculo, ela simplesmente não entra. 

O C# faz exatamente isso com as informações do seu computador! Ele é uma linguagem **fortemente tipada** (ou *Strongly Typed*).

---

## 1. O guarda das caixas

Em outras línguas de computador, as caixas são "mágicas" e aceitam qualquer coisa. Você pode guardar um número lá dentro e, logo depois, jogar o número fora e colocar uma palavra. Isso parece legal, mas causa uma bagunça danada quando você esquece o que colocou lá dentro e o programa trava.

No C#, quando você cria uma caixa para guardar números, **ela só aceita números**. Se você tentar colocar uma palavra lá dentro, o C# impede você na hora.

---

## 2. O fiscal de regras (compilador)

O C# tem um ajudante muito chato chamado **Compilador**. Ele é como um fiscal que lê o seu código antes de o programa rodar.

Se você escrever isso:
```csharp
int idade = 12; // Criou uma caixa de número inteiro
idade = "doze"; // Tentou colocar uma palavra lá dentro
```

O fiscal vai parar tudo e gritar: *"Ei! Você não pode colocar texto em uma caixa de números!"*. 

Isso é ótimo! É muito melhor o fiscal te avisar enquanto você está escrevendo o código do que o aplicativo quebrar na mão da pessoa que estiver usando o seu jogo ou programa.

---

## Artigos relacionados:
* **[Introdução ao C#](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/Introducao.md)**
* **[Variáveis, operadores e tipos de dados](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/Vari%C3%A1veis,%20operadores%20e%20tipos%20de%20dados.md)**
* **[Arrays em C#](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/Arrays.md)**
