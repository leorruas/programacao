# Entendendo tratamento de erros (try, catch e throw) - método Feynman

Em programação, erros vão acontecer: a conexão com a internet pode cair, o usuário pode digitar dados inválidos em um formulário ou um servidor pode ficar fora do ar. Se um erro ocorre no [[javascript/Introdução ao JavaScript\|JavaScript]] e você não o gerencia, o site trava por completo.

O tratamento de erros funciona como o design de **Estados de Erro (Error States)** e **Redes de Segurança** no desenvolvimento do código.

---

## A analogia dos estados de erro em formulários

Imagine que você desenhou uma tela de login no Figma:
*   **O fluxo feliz:** O usuário digita o e-mail correto, clica em entrar e acessa a conta.
*   **O fluxo de erro (Fallback):** O usuário digita um e-mail sem a arroba `@`. O sistema não deve fechar ou travar o Figma da pessoa. Em vez disso, o sistema deve exibir uma mensagem vermelha abaixo do campo dizendo: *"E-mail inválido. Por favor, corrija"*.

O bloco `try/catch` no [[javascript/Introdução ao JavaScript\|JavaScript]] é a ferramenta que permite prever que algo pode dar errado (muito comum em requisições assíncronas com [[javascript/05-assincrono/Async await|Async Await]]), capturar a falha antes que ela quebre o sistema e dar uma instrução alternativa (o estado de erro) para o usuário. Para entender como achar a causa dos erros, veja [[javascript/01-fundamentos/Debug (depuração)|Debug (Depuração)]].

---

## Como funciona no JavaScript

Usamos três palavras-chave para criar essa rede de proteção:

1.  **try (tentar):** É o bloco onde você coloca o código que você espera rodar normalmente, mas que corre o risco de falhar.
2.  **catch (capturar):** É o bloco que roda apenas se ocorrer algum erro dentro do bloco `try`. Ele recebe as informações do erro para você tratar de forma segura.
3.  **throw (lançar/disparar):** É o comando que você usa para criar e disparar o seu próprio erro customizado de propósito quando uma regra de negócios for violada.

### Exemplo prático:

```javascript
function validarIdade(idade) {
  if (idade < 18) {
    // Disparando um erro customizado de propósito
    throw new Error("Acesso permitido apenas para maiores de 18 anos.");
  }
  return "Acesso autorizado!";
}

try {
  // Tenta executar o código que pode dar erro
  const resultado = validarIdade(15);
  console.log(resultado);
} catch (erro) {
  // Se houver erro acima, o JavaScript pula imediatamente para cá
  // O "erro" contém a mensagem que criamos no throw
  console.log("Erro de Validação: " + erro.message); 
  // Saída: Erro de Validação: Acesso permitido apenas para maiores de 18 anos.
}
```

---

## Resumo para memorizar

*   **Try:** O bloco onde você coloca o código que pode falhar (o fluxo principal).
*   **Catch:** O bloco de contingência que é ativado se algo der errado no Try, evitando que o site trave.
*   **Throw:** A ação de criar e disparar manualmente um erro com uma mensagem descritiva.
