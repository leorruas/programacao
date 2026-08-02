# Métodos (Funções) em C#

Imagine que você tem um robô na sua casa. Toda vez que você quer suco de laranja, você tem que dizer a ele: 
1. *Abra a geladeira.*
2. *Pegue a laranja.*
3. *Corte a laranja.*
4. *Esprema no copo.*

Falar tudo isso toda vez dá muito trabalho! Em vez disso, você programa um botão no robô chamado **"FazerSuco"** que já faz todos esses passos. Toda vez que quiser o suco, você só aperta esse botão.

Um **Método** (ou Função) é exatamente esse botão: um bloco de código com nome que realiza uma tarefa específica.

---

## 1. Como funciona um Método?

Um método geralmente precisa de 3 partes principais:
1. **Entrada (Parâmetros):** O que você precisa dar para o método funcionar (ex: laranjas).
2. **Processamento (Corpo):** As ações que o método faz (espremer, cortar).
3. **Saída (Retorno):** O resultado final que o método te devolve (o copo de suco).

---

## 2. Escrevendo um Método no Código

Vamos criar um botão/método simples que soma dois números inteiros:

```csharp
// int: é o tipo de dado que o método DEVOLVE (o copo de suco)
// Somar: é o nome do botão
// (int numeroA, int numeroB): são os ingredientes que colocamos (laranjas)
int Somar(int numeroA, int numeroB)
{
    int resultado = numeroA + numeroB;
    return resultado; // return devolve o resultado final para quem apertou o botão
}
```

E para usar o método em outro lugar do código:

```csharp
// Chamando o método e guardando o retorno em uma variável
int total = Somar(10, 5); // total agora guarda o valor 15
```

---

## 3. Métodos que não devolvem nada (`void`)

Às vezes, você só quer que o método faça uma ação, sem precisar te devolver nenhum valor físico. Por exemplo, limpar o quadro ou emitir um bipe. Para isso, usamos a palavra-chave `void` (que significa "vazio" ou "sem retorno").

```csharp
void MostrarMensagemDeBoasVindas(string nomeDoUsuario)
{
    Console.WriteLine($"Olá, {nomeDoUsuario}! Seja bem-vindo ao sistema.");
    // Não precisa de "return" pois é void!
}
```

---

## Artigos Relacionados:
* **[Introdução ao C#](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/Introducao.md)**
* **[Variáveis, Operadores e Tipos de Dados](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/VariaveisOperadoresTipos.md)**
* **[Segurança de Tipos](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/SegurancaDeTipos.md)**
* **[Programação Orientada a Objetos (Classes e Construtores)](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/ProgramacaoOrientadaObjetos.md)**
