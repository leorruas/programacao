# Console.Write e Console.WriteLine (Escrevendo no terminal)
#csharp

A exibição de textos na tela do console é a ferramenta mais básica e essencial para interagir com o usuário em programas de terminal. Em Csharp, fazemos isso utilizando dois comandos parecidos, mas com comportamentos diferentes no cursor: `Console.Write()` e `Console.WriteLine()`.

---

## 1. Console.WriteLine() (Escrever e Pular Linha)

O comando **`Console.WriteLine()`** (escreve linha) imprime o texto que você colocou entre parênteses na tela e, em seguida, **pula automaticamente para a próxima linha** (como se você tivesse pressionado a tecla *Enter*).

* **Exemplo de código:**
  ```csharp
  Console.WriteLine("Primeira frase.");
  Console.WriteLine("Segunda frase.");
  ```
* **Saída no terminal:**
  ```text
  Primeira frase.
  Segunda frase.
  ```

---

## 2. Console.Write() (Escrever e Manter na Mesma Linha)

O comando **`Console.Write()`** imprime o texto na tela, mas **mantém o cursor exatamente onde o texto terminou**, sem pular linha. Qualquer comando de escrita executado depois continuará grudado na mesma linha.

* **Exemplo de código:**
  ```csharp
  Console.Write("Olá, ");
  Console.Write("visitante!");
  ```
* **Saída no terminal:**
  ```text
  Olá, visitante!
  ```

---

## 3. Quando usar cada um?

### 🟢 Use `Console.WriteLine` para mensagens e relatórios
Ideal para imprimir textos longos, parágrafos, listas e resultados que devem ficar organizados um abaixo do outro na tela.

### 🟡 Use `Console.Write` para formulários e perguntas
Perfeito para fazer perguntas em que o usuário deve digitar a resposta logo em seguida. Isso mantém o cursor na mesma linha do texto, criando uma interface de terminal muito mais limpa e intuitiva.

* **Exemplo prático de interface:**
  ```csharp
  Console.Write("Digite o seu nome: "); // Cursor para bem aqui esperando o usuário
  string nome = Console.ReadLine(); // O usuário digita o nome na frente da pergunta
  ```

---

## Artigos relacionados:
* **[[01-Introdução ao Csharp|Introdução ao Csharp]]**
* **[[02-O método Main|O método Main]]**
* **[[12-Métodos (funções)|Métodos (funções)]]**
