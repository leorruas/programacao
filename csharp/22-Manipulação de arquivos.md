# Manipulação de arquivos em Csharp
#csharp

Imagine que seu computador é um **escritório físico** com um grande arquivo de gavetas de aço. Toda vez que seu programa roda, é como se ele fizesse anotações em uma folha de papel na mesa. Mas quando o programa fecha, alguém limpa a mesa e joga tudo fora! 

Para que as informações durem para sempre (sejam persistentes), precisamos guardá-las em pastas dentro das gavetas do arquivo de aço. Em C#, fazemos isso manipulando **Arquivos e Diretórios** usando a caixa de ferramentas chamada **`System.IO`** (IO significa *Input/Output*, ou Entrada/Saída).

---

## 1. Abrindo a gaveta de arquivos (`System.IO`)

Para poder mexer nos arquivos do seu computador, você precisa colocar este aviso no topo do código:

```csharp
using System.IO;
```

---

## 2. Escrevendo em um arquivo (Salvar informações)

A forma mais simples de criar um arquivo e escrever algo nele é com a ferramenta `File.WriteAllText` (que cria ou substitui tudo) ou `File.AppendAllText` (que adiciona texto ao final sem apagar o que já existia).

```csharp
using System;
using System.IO;

class Program
{
    static void Main()
    {
        string caminho = "diario.txt";

        // 1. Escrever e substituir o conteúdo
        File.WriteAllText(caminho, "Querido diário, hoje aprendi C#!\n");
        Console.WriteLine("Texto salvo com sucesso!");

        // 2. Adicionar novas linhas sem apagar o anterior
        File.AppendAllText(caminho, "Mais tarde: Aprendi a manipular arquivos também!\n");
        Console.WriteLine("Nova mensagem adicionada!");
    }
}
```

---

## 3. Lendo de um arquivo (Carregar informações)

Para ler tudo o que está dentro de um arquivo de texto de uma vez só, usamos `File.ReadAllText`:

```csharp
using System;
using System.IO;

class Program
{
    static void Main()
    {
        string caminho = "diario.txt";

        // Sempre verifique se o arquivo existe antes de ler, para não quebrar o programa!
        if (File.Exists(caminho))
        {
            string conteudo = File.ReadAllText(caminho);
            Console.WriteLine("--- Conteúdo do Diário ---");
            Console.WriteLine(conteudo);
        }
        else
        {
            Console.WriteLine("O arquivo de diário ainda não existe.");
        }
    }
}
```

---

## 4. O gerenciador de recursos (`using` block)

Quando abrimos um arquivo muito grande para ler ou escrever linha por linha, usamos canais de comunicação chamados `StreamReader` (para ler) e `StreamWriter` (para escrever).
O computador precisa fechar esses canais depois de terminar de usar, caso contrário, o arquivo fica travado e nenhum outro programa consegue abri-lo.

Para garantir que o C# feche o arquivo automaticamente (mesmo se ocorrer um erro no meio do caminho), usamos o bloco **`using`**:

```csharp
using System;
using System.IO;

class Program
{
    static void Main()
    {
        string caminho = "notas.txt";

        // O 'using' garante que o StreamWriter seja fechado e limpo da memória ao final!
        using (StreamWriter escritor = new StreamWriter(caminho))
        {
            escritor.WriteLine("Nota 1: Estudar POO");
            escritor.WriteLine("Nota 2: Praticar arrays");
        } // Aqui o arquivo é fechado automaticamente pelo C#

        // Lendo linha por linha
        using (StreamReader leitor = new StreamReader(caminho))
        {
            string linha;
            while ((linha = leitor.ReadLine()) != null)
            {
                Console.WriteLine($"Lido do arquivo: {linha}");
            }
        }
    }
}
```

---

## Artigos relacionados:
* **[[csharp/01-Introdução ao Csharp|Introdução ao Csharp.md]]**
* **[[csharp/21-Tratamento de erros|Tratamento de erros.md]]**
