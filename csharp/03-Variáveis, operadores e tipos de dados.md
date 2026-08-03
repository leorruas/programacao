# Variáveis, operadores e tipos de dados
#csharp

Para dar instruções ao computador, você precisa saber duas coisas: como guardar informações e como fazer contas com elas. Vamos usar analogias simples para entender isso!

---

## 1. Variáveis são caixas com formatos diferentes

Uma **variável** é apenas uma caixinha com uma etiqueta na memória do computador. Graças à [[04-Segurança de tipos|Segurança de tipos]], você precisa escolher o formato certo da caixa para cada objeto:

* **Caixa `int` (inteiros):** Pense nela como um pote de vidro para guardar bolinhas de gude inteiras. Guarda números como `5`, `10` ou `-3`. Não dá para guardar meia bolinha.
* **Caixa `double` (decimais):** Pense nela como um copo de medição de água. Você pode guardar valores quebrados como `1.75` (sua altura) ou `3.5` (litros).
* **Caixa `string` (textos):** Pense nela como uma faixa comprida onde você escreve palavras ou frases inteiras (ex: `"Leonardo"`, `"C# é muito divertido!"`). Ela sempre usa aspas duplas `" "`.
* **Caixa `bool` (sim/não):** Pense nela como um interruptor de luz. Só tem duas posições: ligado (`true` / verdadeiro) ou desligado (`false` / falso).

---

## 2. Operadores são as ações

Os **operadores** são apenas ferramentas que usamos para mexer no conteúdo das caixas.

* **Fazer contas:** Usamos `+` (somar), `-` (subtrair), `*` (multiplicar) e `/` (dividir).
* **Fazer perguntas (comparar):** Usamos `==` para perguntar se duas caixas são iguais, `>` para saber se uma é maior que a outra, ou `!=` para ver se são diferentes.

```csharp
int moedasNaMao = 5;
int moedasNoChao = 10;

// Somamos as duas caixas e guardamos em uma nova
int total = moedasNaMao + moedasNoChao; // Guarda 15

// Perguntamos: "O total é maior que 10?"
bool possoComprarDoce = (total > 10); // Guarda true (verdadeiro)!
```

---

## Artigos relacionados:
* **[[01-Introdução ao Csharp.md|Introdução ao C#]]**
* **[[04-Segurança de tipos|Segurança de tipos]]**
* **[[05-Estruturas condicionais e de repetição|Estruturas condicionais e de repetição]]**
* **[[07-Arrays em C#.md|Arrays em C#]]**
