# O método Main (A porta de entrada do Csharp)
#csharp

Quando você clica no botão "Executar" de um programa em C#, o computador precisa saber exatamente por onde começar. Imagine que o seu programa é um shopping gigante: tem várias lojas, elevadores e corredores, mas você só consegue entrar se passar pela **porta da frente**. 

Em C#, essa porta da frente é o [[12-Métodos (funções)|método]] **`Main`**.

---

## 1. Desmontando o código da porta de entrada

A linha clássica que você viu na imagem é esta:
```csharp
public static void Main(string[] args)
```

Para uma criança entender, vamos quebrar essa frase palavra por palavra:

### `public` (Público)
Significa que qualquer um tem acesso a essa porta. Ela está aberta e destrancada na rua. O computador precisa que ela seja pública para conseguir abrir o programa do lado de fora.

### `static` (Estático)
Em C#, para usar um molde ([[13-Programação orientada a objetos|Classe]]), geralmente precisamos criar um [[13-Programação orientada a objetos|objeto]] real na memória (usando `new`). Mas o `static` diz: **"Você não precisa criar nada antes para usar este botão"**. O computador pode apertar o botão `Main` imediatamente, mesmo se o programa estiver completamente vazio.

### `void` (Vazio / Sem retorno)
Diz que esse [[12-Métodos (funções)|método]] faz as suas tarefas, mas **não devolve nenhum objeto físico** de volta para quem o chamou. Ele apenas realiza a ação e encerra.

### `Main` (Principal)
É o nome oficial da porta. C# é rigoroso: ele sempre vai procurar por um método com a primeira letra maiúscula escrita exatamente como **`Main`**. Se você escrever `main` (com "m" minúsculo), o compilador vai ficar confuso e o programa não vai ligar.

### `(string[] args)` (Os argumentos)
São **instruções extras** (uma [[09-Coleções em Csharp|coleção]] de palavras) que você pode mandar para o programa no exato momento em que você o inicia pelo terminal do computador.
* *Exemplo real:* Ao digitar no terminal `meuapp.exe leonardo`, o valor `"leonardo"` entra no programa dentro dessa gaveta `args` e pode ser usado pelo código!

---

## 2. É obrigatório usar sempre?

**Sim e não.**
* **No fundo da máquina:** O C# **sempre** precisa de um método `Main` para iniciar um programa executável.
* **No código moderno (C# 9+):** A Microsoft criou as chamadas *Top-level statements*. Elas permitem que você escreva o seu código diretamente na folha em branco, sem precisar escrever `class Program` ou `public static void Main` de forma visível. Porém, o C# faz esse trabalho por você por trás dos panos! Na hora de rodar, ele cria o `Main` secretamente para você não ter que digitar tanto texto.

---

## Artigos relacionados:
* **[[01-Introdução ao Csharp.md|Introdução ao Csharp]]**
* **[[12-Métodos (funções)|Métodos (funções)]]**
* **[[13-Programação orientada a objetos|Programação orientada a objetos]]**
