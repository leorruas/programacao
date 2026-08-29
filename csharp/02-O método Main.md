# O método Main (A porta de entrada do Csharp)
#csharp

Quando você clica no botão "Executar" de um programa em C#, o computador precisa saber exatamente por onde começar. Imagine que o seu programa é um shopping gigante: tem várias lojas, elevadores e corredores, mas você só consegue entrar se passar pela **porta da frente**. 

Em C#, essa porta da frente é o [[csharp/18-Métodos (funções)|método]] **`Main`**.

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
Em C#, para usar um molde ([[csharp/19-Programação orientada a objetos|Classe]]), geralmente precisamos criar um [[csharp/19-Programação orientada a objetos|objeto]] real na memória (usando `new`). Mas o `static` diz: **"Você não precisa criar nada antes para usar este botão"**. O computador pode apertar o botão `Main` imediatamente, mesmo se o programa estiver completamente vazio.

### `void` (Vazio / Sem retorno)
Diz que esse [[csharp/18-Métodos (funções)|método]] faz as suas tarefas, mas **não devolve nenhum objeto físico** de volta para quem o chamou. Ele apenas realiza a ação e encerra.

### `Main` (Principal)
É o nome oficial da porta. C# é rigoroso: ele sempre vai procurar por um método com a primeira letra maiúscula escrita exatamente como **`Main`**. Se você escrever `main` (com "m" minúsculo), o compilador vai ficar confuso e o programa não vai ligar.

### `(string[] args)` (Os argumentos)
São **instruções extras** (uma [[csharp/14-Coleções em Csharp|coleção]] de palavras) que você pode mandar para o programa no exato momento em que você o inicia pelo terminal do computador.

---

## 2. É obrigatório usar sempre?

**Sim e não.**
* **No fundo da máquina:** O C# **sempre** precisa de um método `Main` para iniciar um programa executável.
* **No código moderno (C# 9+):** A Microsoft criou as chamadas *Top-level statements*. Elas permitem que você escreva o seu código diretamente na folha em branco, sem precisar escrever `class Program` ou `public static void Main` de forma visível. Porém, o C# faz esse trabalho por você por trás dos panos! Na hora de rodar, ele cria o `Main` secretamente para você não ter que digitar tanto texto.

---

## 3. Quando usar argumentos `(string[] args)` e quando usar vazio `()`?

Em versões clássicas do C# e em sistemas robustos, você verá duas formas principais de declarar o método `Main`:
* `static void Main(string[] args)` (com argumentos)
* `static void Main()` (sem nenhum argumento)

###  Quando deixar vazio: `static void Main()`
Você pode deixar o método sem parâmetros sempre que o seu programa **não precisar receber instruções externas logo de cara** ao ser ligado pelo terminal. 
* **Onde é usado:** Aplicativos de console simples (onde o usuário digita os dados *depois* que o programa já abriu, via `Console.ReadLine()`), aplicativos com telas visuais (Windows Forms, WPF) ou sistemas web (APIs).
* **Exemplo do cotidiano:** Um aplicativo de calculadora simples. Você abre o aplicativo e ele te pergunta na tela: *"Digite o primeiro número"*. Ele não precisa de nenhuma informação prévia no terminal para ligar.

###  Quando usar argumentos: `static void Main(string[] args)`
Você deve declarar os argumentos quando estiver criando um programa utilitário que é chamado por outros programas, scripts automatizados ou via terminal, onde os parâmetros de entrada **devem ser passados no exato momento de ligar o app**.

* **Onde é usado:** Ferramentas de linha de comando (CLI), scripts de automação, rotinas automáticas de servidor (CRON jobs) e robôs de backup.
* **Exemplo do cotidiano:** Imagine um programa de backup automático chamado `backup.exe`. Para rodá-lo, você digita no terminal:
  ```bash
  backup.exe C:/fotos D:/pendrive
  ```
  O seu programa recebe essas duas pastas instantaneamente dentro da gaveta `args`:
  * `args[0]` recebe `"C:/fotos"`
  * `args[1]` recebe `"D:/pendrive"`
  
  O código em C# lê esses argumentos e faz o trabalho sem precisar perguntar nada na tela:
  ```csharp
  static void Main(string[] args)
  {
      if (args.Length < 2)
      {
          Console.WriteLine("Erro: Você precisa informar a pasta de origem e a de destino!");
          return;
      }
      string origem = args[0];
      string destino = args[1];
      Console.WriteLine($"Copiando arquivos de {origem} para {destino}...");
  }
  ```

---

## Artigos relacionados:
* **[[csharp/01-Introdução ao Csharp|Introdução ao Csharp]]**
* **[[csharp/18-Métodos (funções)|Métodos (funções)]]**
* **[[csharp/19-Programação orientada a objetos|Programação orientada a objetos]]**
