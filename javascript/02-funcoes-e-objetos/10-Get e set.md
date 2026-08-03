# Entendendo get e set - método Feynman

Em [[javascript/Introdução ao JavaScript\|JavaScript]], **Get (Getter)** e **Set (Setter)** são [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] especiais que funcionam como **filtros inteligentes** de segurança e formatação para as propriedades de um [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]].

Pense neles como o **inspetor de qualidade** e o **formatador automático** de dados de uma camada do Figma.

---

## A analogia dos campos inteligentes

Imagine que você está criando um formulário de design system onde o desenvolvedor ou usuário pode configurar propriedades de um retângulo (como largura e altura):

*   **Sem Get/Set (Acesso direto):** O usuário pode digitar coisas impossíveis, como uma largura de `-200px` ou um preço negativo. O sistema aceita qualquer valor sem checar, o que quebra o layout.
*   **Com Set (O Inspetor de Qualidade):** Toda vez que alguém tenta alterar o valor da largura, a [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] **Set** entra em ação. Ela analisa o valor e diz: *"Espere, largura não pode ser menor que zero. Se tentarem colocar -200, vou ajustar automaticamente para 0"*.
*   **Com Get (O Formatador Automático):** Quando o sistema precisa mostrar o valor na tela, a [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] **Get** entra em ação. Se o valor real guardado for apenas o número `150`, o Get pode retornar automaticamente formatado como `"150px"` para exibição rápida.

---

## Como funciona no JavaScript

Os termos `get` e `set` são palavras-chave colocadas logo antes do nome da [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] dentro de uma classe:

```javascript
class Retangulo {
  constructor(largura) {
    // Usamos um underline (_) antes do nome para indicar que esta é a propriedade real interna
    this._largura = largura;
  }

  // GET: Chamado automaticamente quando alguém tenta LER o valor
  get largura() {
    // Retorna o valor interno formatado com a unidade de pixel
    return this._largura + "px";
  }

  // SET: Chamado automaticamente quando alguém tenta GRAVAR ou ALTERAR o valor
  set largura(novoValor) {
    if (novoValor < 0) {
      console.log("Erro: Largura não pode ser menor que zero. Valor mantido.");
    } else {
      this._largura = novoValor;
    }
  }
}
```

### Usando o get e o set na prática

O detalhe mais importante é que, do lado de fora, você usa essas [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] como se fossem propriedades normais (sem colocar os parênteses de [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] `()`):

```javascript
const banner = new Retangulo(800);

// Lendo o valor: Isso dispara o método GET
console.log(banner.largura); // Saída: 800px (com o "px" adicionado automaticamente)

// Alterando o valor para algo válido: Isso dispara o método SET
banner.largura = 1200;
console.log(banner.largura); // Saída: 1200px

// Tentando alterar para algo inválido
banner.largura = -50; // Saída no console: Erro: Largura não pode ser menor que zero. Valor mantido.
console.log(banner.largura); // Saída: 1200px (o valor inválido foi ignorado)
```

---

## Resumo para memorizar

*   **Get (Getter):** Uma [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] disfarçada de propriedade que serve para **ler** e formatar um dado antes de entregá-lo.
*   **Set (Setter):** Uma [[javascript/02-funcoes-e-objetos/01-Funções\|Funções]] disfarçada de propriedade que serve para **escrever**, validar e proteger as regras do seu [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] antes de aceitar um novo valor.
*   **Uso:** Evitam que dados inconsistentes quebrem a lógica e o funcionamento do seu código.
