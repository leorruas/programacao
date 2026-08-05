# [Csharp] • Projeto 3 - O Gerenciador de Tarefas

#csharp #tutorial #iniciante #coleções

Neste terceiro projeto prático, você vai construir um **Gerenciador de Tarefas (ToDo List)** no terminal. O programa exibirá um menu interativo onde você poderá adicionar tarefas, listar as tarefas salvas com seus respectivos índices, e marcar tarefas como concluídas (removendo-as da lista).

Este projeto é fantástico para praticar o uso de **Coleções Dinâmicas (`List<T>`), Loops para Listagem (`foreach`/`for`) e Estruturas de Seleção (`switch-case`)**.

---

## 1. O Código Completo do Programa

Crie o novo aplicativo console como ensinado no final deste arquivo, abra o `Program.cs` e cole o seguinte código:

```csharp
using System;
using System.Collections.Generic; // Necessário para usar a classe List<T>

class Program
{
    static void Main(string[] args)
    {
        // Cria uma lista dinâmica para armazenar as tarefas como texto
        List<string> tarefas = new List<string>();
        bool executando = true;

        while (executando)
        {
            // 1. Menu Principal
            Console.WriteLine("========================================");
            Console.WriteLine("📝 GERENCIADOR DE TAREFAS PESSOAIS");
            Console.WriteLine("========================================");
            Console.WriteLine("1. Adicionar Nova Tarefa");
            Console.WriteLine("2. Listar Todas as Tarefas");
            Console.WriteLine("3. Remover/Concluir Tarefa");
            Console.WriteLine("4. Sair");
            Console.WriteLine("========================================");
            Console.Write("Escolha uma opção (1 a 4): ");

            string opcao = Console.ReadLine();
            Console.WriteLine(); // Linha em branco

            // 2. Processa a opção escolhida pelo usuário
            switch (opcao)
            {
                case "1":
                    Console.Write("Digite o título da tarefa: ");
                    string novaTarefa = Console.ReadLine();
                    if (!string.IsNullOrWhiteSpace(novaTarefa))
                    {
                        tarefas.Add(novaTarefa); // Adiciona na lista dinâmica
                        Console.WriteLine("✓ Tarefa adicionada com sucesso!");
                    }
                    else
                    {
                        Console.WriteLine("⚠️ O nome da tarefa não pode estar vazio!");
                    }
                    break;

                case "2":
                    ListarTarefas(tarefas);
                    break;

                case "3":
                    ListarTarefas(tarefas);
                    if (tarefas.Count == 0) break; // Sai do caso se não houver tarefas

                    Console.Write("Digite o número da tarefa que deseja concluir: ");
                    if (int.TryParse(Console.ReadLine(), out int indice) && indice >= 1 && indice <= tarefas.Count)
                    {
                        // Remove o item da lista usando o índice correto (C# começa no 0, então subtraímos 1)
                        int indiceReal = indice - 1;
                        string tarefaRemovida = tarefas[indiceReal];
                        tarefas.RemoveAt(indiceReal);
                        Console.WriteLine($"✓ Parabéns! Tarefa '{tarefaRemovida}' marcada como concluída!");
                    }
                    else
                    {
                        Console.WriteLine("⚠️ Número inválido! Escolha um índice da lista.");
                    }
                    break;

                case "4":
                    executando = false; // Sair do loop principal
                    Console.WriteLine("Tchau! Tenha um dia produtivo!");
                    break;

                default:
                    Console.WriteLine("⚠️ Opção inválida! Escolha um número de 1 a 4.");
                    break;
            }

            Console.WriteLine("\nPressione qualquer tecla para continuar...");
            Console.ReadKey(); // Aguarda o clique para limpar a tela
            Console.Clear();   // Limpa o terminal para o menu ficar fixo no topo
        }
    }

    // 3. Método auxiliar para listar as tarefas
    static void ListarTarefas(List<string> lista)
    {
        Console.WriteLine("📋 SUAS TAREFAS ATUAIS:");
        Console.WriteLine("----------------------------------------");
        
        if (lista.Count == 0)
        {
            Console.WriteLine("(Nenhuma tarefa pendente por aqui. Tudo limpo! 🎉)");
            Console.WriteLine("----------------------------------------");
            return;
        }

        // Usamos o loop for clássico pois precisamos exibir o número do índice na tela
        for (int i = 0; i < lista.Count; i++)
        {
            Console.WriteLine($"{i + 1}. [ ] {lista[i]}");
        }
        Console.WriteLine("----------------------------------------");
    }
}
```

---

## 2. Explicação Passo a Passo

* **`List<string> tarefas`**: A classe `List<T>` do C# é uma coleção dinâmica (uma gaveta elástica). Ao contrário dos arrays normais que possuem tamanho fixo, a lista cresce e encolhe sozinha conforme adicionamos ou removemos elementos.
* **`tarefas.Add()`**: Adiciona um novo elemento de texto ao final da lista.
* **`tarefas.RemoveAt(indice)`**: Exclui o item que está na posição informada. Lembre-se que em C#, os índices começam em `0`, logo a primeira tarefa está na posição `0` e a segunda na `1`. Por isso o usuário digita `1`, mas o código remove em `i - 1`.
* **`switch(opcao)`**: Estrutura de escolha múltipla que funciona de forma muito mais elegante e limpa do que encadear vários blocos de `if/else`.
* **`Console.Clear()`**: Limpa todas as informações impressas na tela do terminal, permitindo criar a ilusão de um menu estático e interativo no topo.

---

## 3. Como Executar este Programa?

Siga o passo a passo no seu terminal:

1. **Crie a pasta do projeto:**
   ```bash
   dotnet new console -o GerenciadorTarefas
   ```
2. **Entre na pasta:**
   ```bash
   cd GerenciadorTarefas
   ```
3. Abra o arquivo `Program.cs`, cole o código acima e execute com:
   ```bash
   dotnet run
   ```

---

## Artigos relacionados:
* **[[07-Arrays em Csharp|Arrays em Csharp]]**
* **[[09-Coleções em Csharp|Coleções em Csharp]]**
* **[[11-Lista, pilha e fila|Lista, pilha e fila em Csharp]]**
* **[[18-Capacity em coleções|Capacity em coleções]]**
