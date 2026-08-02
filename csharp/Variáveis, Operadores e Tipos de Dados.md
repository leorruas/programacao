# Variáveis, Operadores e Tipos de Dados
#csharp

Para dar instruções ao computador, você precisa saber duas coisas: como guardar informações e como fazer contas com elas. Vamos usar analogias simples para entender isso!

---

## 1. Variáveis são Caixas com Formatos Diferentes

Uma **variável** é apenas uma caixinha com uma etiqueta na memória do computador. Graças à [Segurança de Tipos](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/Seguran%C3%A7a%20de%20Tipos.md), você precisa escolher o formato certo da caixa para cada objeto:

* **Caixa `int` (Inteiros):** Pense nela como um pote de vidro para guardar bolinhas de gude inteiras. Guarda números como `5`, `10` ou `-3`. Não dá para guardar meia bolinha.
* **Caixa `double` (Decimais):** Pense nela como um copo de medição de água. Você pode guardar valores quebrados como `1.75` (sua altura) ou `3.5` (litros).
* **Caixa `string` (Textos):** Pense nela como uma faixa comprida onde você escreve palavras ou frases inteiras (ex: `"Leonardo"`, `"C# é muito divertido!"`). Ela sempre usa aspas duplas `" "`.
* **Caixa `bool` (Sim/Não):** Pense nela como um interruptor de luz. Só tem duas posições: ligado (`true` / verdadeiro) ou desligado (`false` / falso).

---

## 2. Operadores são as Ações

Os **operadores** são apenas ferramentas que usamos para mexer no conteúdo das caixas.

* **Fazer Contas:** Usamos `+` (somar), `-` (subtrair), `*` (multiplicar) e `/` (dividir).
* **Fazer Perguntas (Comparar):** Usamos `==` para perguntar se duas caixas são iguais, `>` para saber se uma é maior que a outra, ou `!=` para ver se são diferentes.

```csharp
int moedasNaMao = 5;
int moedasNoChao = 10;

// Somamos as duas caixas e guardamos em uma nova
int total = moedasNaMao + moedasNoChao; // Guarda 15

// Perguntamos: "O total é maior que 10?"
bool possoComprarDoce = (total > 10); // Guarda true (verdadeiro)!
```

---

## Artigos Relacionados:
* **[Introdução ao C#](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/Introducao.md)**
* **[Segurança de Tipos](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/Seguran%C3%A7a%20de%20Tipos.md)**
* **[Estruturas Condicionais e de Repetição](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/Estruturas%20Condicionais%20e%20de%20Repeti%C3%A7%C3%A3o.md)**
* **[Arrays em C#](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/Arrays.md)**
