# [Csharp] • Projeto 5 - O Diário Digital

#csharp #tutorial #avancado #arquivos #try-catch #linq

Neste quinto e último projeto prático da trilha, você vai criar um **Diário Digital Persistente** completo. Diferente dos projetos anteriores (em que todos os dados sumiam ao fechar o console), este programa vai **salvar as suas anotações em um arquivo de texto (.txt) real** no seu computador. Além disso, você usará **Tratamento de Erros (Try-Catch)** para evitar quebras se o arquivo estiver bloqueado, e o **LINQ** para pesquisar palavras-chave dentro do seu diário.

Este projeto consolida os conceitos avançados de **Manipulação de Arquivos (`System.IO`), Tratamento de Erros e LINQ**.

---

## 1. O Código Completo do Programa

Crie o aplicativo console como ensinado no final deste arquivo, abra o `Program.cs` e cole o código abaixo:

```csharp
using System;
using System.IO;   // Necessário para lidar com arquivos (Input/Output)
using System.Linq; // Necessário para usar LINQ (buscas e filtros rápidos)

class Program
{
    // Define o nome do arquivo de texto onde as anotações do diário serão gravadas fisicamente
    static readonly string caminhoArquivo = "diario.txt";

    static void Main(string[] args)
    {
        bool executando = true;

        while (executando)
        {
            Console.WriteLine("========================================");
            Console.WriteLine(" MEU DIÁRIO DIGITAL CSHARP");
            Console.WriteLine("========================================");
            Console.WriteLine("1. Escrever Nova Página (Anotação)");
            Console.WriteLine("2. Ler Diário Completo");
            Console.WriteLine("3. Buscar Palavra-Chave no Diário");
            Console.WriteLine("4. Sair");
            Console.WriteLine("========================================");
            Console.Write("Escolha uma opção (1 a 4): ");

            string opcao = Console.ReadLine();
            Console.WriteLine();

            switch (opcao)
            {
                case "1":
                    EscreverAnotacao();
                    break;
                case "2":
                    LerDiarioCompleto();
                    break;
                case "3":
                    BuscarTermoNoDiario();
                    break;
                case "4":
                    executando = false;
                    Console.WriteLine("Diário fechado com chave de ouro! Até mais.");
                    break;
                default:
                    Console.WriteLine("️ Opção inválida! Escolha de 1 a 4.");
                    break;
            }

            Console.WriteLine("\nPressione qualquer tecla para continuar...");
            Console.ReadKey();
            Console.Clear();
        }
    }

    // 2. Método para Escrever no Arquivo de Texto (Escrita com System.IO)
    static void EscreverAnotacao()
    {
        Console.Write("Escreva a sua anotação de hoje: ");
        string texto = Console.ReadLine();

        if (string.IsNullOrWhiteSpace(texto))
        {
            Console.WriteLine("️ Não é possível salvar uma anotação vazia!");
            return;
        }

        // Formata a linha adicionando a data e a hora atual
        string linhaFormatada = $"[{DateTime.Now:dd/MM/yyyy HH:mm}] - {texto}\n";

        // Tratamento de Erros caso haja problemas ao acessar o disco físico
        try
        {
            // O AppendAllText cria o arquivo se não existir, e adiciona a linha ao final
            File.AppendAllText(caminhoArquivo, linhaFormatada);
            Console.WriteLine(" Página salva no diário físico com sucesso!");
        }
        catch (IOException ex)
        {
            Console.WriteLine($" Erro de Gravação: Não foi possível escrever no disco. Detalhe: {ex.Message}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($" Erro inesperado: {ex.Message}");
        }
    }

    // 3. Método para Ler do Arquivo (Leitura com System.IO)
    static void LerDiarioCompleto()
    {
        try
        {
            // Verifica primeiro se o arquivo já existe no disco
            if (!File.Exists(caminhoArquivo))
            {
                Console.WriteLine(" O seu diário ainda está em branco! Escreva algo primeiro.");
                return;
            }

            Console.WriteLine(" LEITURA DAS PÁGINAS DO DIÁRIO:");
            Console.WriteLine("----------------------------------------");
            string conteudo = File.ReadAllText(caminhoArquivo);
            Console.Write(conteudo);
            Console.WriteLine("----------------------------------------");
        }
        catch (Exception ex)
        {
            Console.WriteLine($" Erro ao ler o arquivo: {ex.Message}");
        }
    }

    // 4. Método para Buscar Termos (Buscas Rápidas com LINQ)
    static void BuscarTermoNoDiario()
    {
        if (!File.Exists(caminhoArquivo))
        {
            Console.WriteLine(" O diário não existe no disco para ser pesquisado.");
            return;
        }

        Console.Write("Digite a palavra-chave que deseja buscar: ");
        string termo = Console.ReadLine().Trim().ToLower();

        if (string.IsNullOrEmpty(termo)) return;

        try
        {
            // Lê todas as linhas do arquivo e gera uma coleção na memória
            string[] linhas = File.ReadAllLines(caminhoArquivo);

            // Usa LINQ para filtrar apenas as linhas que contêm o termo pesquisado (case insensitive)
            var linhasEncontradas = linhas.Where(linha => linha.ToLower().Contains(termo)).ToList();

            Console.WriteLine();
            Console.WriteLine($" RESULTADOS ENCONTRADOS ({linhasEncontradas.Count}):");
            Console.WriteLine("----------------------------------------");

            if (linhasEncontradas.Count == 0)
            {
                Console.WriteLine("Nenhum registro correspondente foi encontrado.");
            }
            else
            {
                foreach (string linha in linhasEncontradas)
                {
                    Console.WriteLine(linha);
                }
            }
            Console.WriteLine("----------------------------------------");
        }
        catch (Exception ex)
        {
            Console.WriteLine($" Erro ao realizar a busca: {ex.Message}");
        }
    }
}
```

---

## 2. Explicação Passo a Passo

* **Persistência Física (`System.IO`)**: O comando `File.AppendAllText` e `File.ReadAllText` comunicam-se diretamente com o disco rígido do computador. Os dados agora persistem e o arquivo `diario.txt` pode ser aberto em qualquer programa externo (como o Bloco de Notas).
* **Tratamento de Exceções (`try-catch`)**: Lidar com discos e arquivos físicos é perigoso (o disco pode estar cheio, o arquivo bloqueado, etc.). O bloco `try` tenta rodar o código e, se algo quebrar, a execução pula imediatamente para o bloco `catch` correspondente para exibir um erro amigável sem derrubar ou travar o programa.
* **LINQ (`Where`)**: O método `Where` filtra elementos de coleções em tempo recorde de forma declarativa. Em uma linha, lemos todo o arquivo de texto e selecionamos apenas as linhas contendo a palavra buscada.

---

## 3. Como Executar este Programa?

Siga o passo a passo no seu terminal:

1. **Crie a pasta do projeto:**
   ```bash
   dotnet new console -o DiarioDigital
   ```
2. **Entre na pasta:**
   ```bash
   cd DiarioDigital
   ```
3. Abra o arquivo `Program.cs`, substitua todo o código original por este, e execute com:
   ```bash
   dotnet run
   ```
4. *Dica:* Depois de digitar algumas páginas no diário, abra a pasta `DiarioDigital` no seu computador e veja o arquivo `diario.txt` criado fisicamente ao lado do seu código C#!

---

## Artigos relacionados:
* **[[csharp/21-Tratamento de erros|Tratamento de erros]]**
* **[[csharp/22-Manipulação de arquivos|Manipulação de arquivos]]**
* **[[csharp/23-LINQ buscas e filtros|LINQ buscas e filtros]]**
