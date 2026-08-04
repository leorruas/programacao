# O switch em Csharp (Escolha múltipla)
#csharp

Quando precisamos fazer o programa escolher um caminho entre várias opções possíveis, usar muitos blocos de `if` e `else if` pode deixar o código bagunçado e difícil de ler. Para resolver isso de forma elegante, o Csharp nos oferece a estrutura **`switch`**.

---

## 1. O switch clássico (switch-case)

O `switch` avalia uma variável e direciona a execução para o bloco `case` correspondente ao seu valor. Cada caso deve terminar obrigatoriamente com a palavra-chave **`break`** para impedir que o Csharp continue executando os casos abaixo.

* **Exemplo de código:**
  ```csharp
  int diaSemana = 3;

  switch (diaSemana)
  {
      case 1:
          Console.WriteLine("Domingo");
          break;
      case 2:
          Console.WriteLine("Segunda-feira");
          break;
      case 3:
          Console.WriteLine("Terça-feira");
          break;
      default:
          Console.WriteLine("Dia inválido!");
          break; // O default roda se nenhum caso bater
  }
  // Saída: Terça-feira
  ```

### Elementos chave:
* **`switch (variavel)`**: O alvo que estamos avaliando.
* **`case valor:`**: O valor comparado com a variável.
* **`break;`**: Finaliza o caso e sai do bloco `switch`. Se esquecer o `break`, o compilador Csharp acusará um erro.
* **`default:`**: O caso "padrão", que roda se nenhum dos outros casos for atendido (funciona exatamente como o último `else`).

---

## 2. A Expressão Switch Moderna (Switch Expressions)

A partir do **Csharp 8**, foi criada uma sintaxe simplificada e extremamente poderosa chamada **Switch Expressions**. Ela serve para **retornar diretamente um valor** baseado na avaliação, dispensando o uso de `case`, `break` e chaves redundantes.

* **Exemplo de código:**
  ```csharp
  int codigoStatus = 1;

  // A expressão inteira devolve uma string que guardamos na variável 'mensagem'
  string mensagem = codigoStatus switch
  {
      1 => "Ativo",
      2 => "Inativo",
      3 => "Pendente",
      _ => "Desconhecido" // O caractere sublinhado '_' funciona como o 'default'
  };

  Console.WriteLine(mensagem);
  // Saída: Ativo
  ```

### Vantagens do Switch Expression:
* Código muito mais curto e legível.
* Usa a seta `=>` (lambda) para associar o valor de entrada ao resultado.
* Usa o descarte (`_`) para representar a opção padrão (`default`).

---

## 3. Quando usar switch no lugar de if-else?

| Situação | Usar `if-else` | Usar `switch` |
| :--- | :---: | :---: |
| Comparar intervalos (ex: `idade >= 18`) | **Sim** | Não |
| Múltiplas condições lógicas (ex: `a && b`) | **Sim** | Não |
| Comparar a mesma variável com vários valores exatos | Não | **Sim (Muito melhor!)** |

---

## Artigos relacionados:
* **[[05-Estruturas condicionais e de repetição|Estruturas condicionais e de repetição]]**
* **[[06-Estruturas de repetição (for e while)|Estruturas de repetição (for, foreach e while)]]**
