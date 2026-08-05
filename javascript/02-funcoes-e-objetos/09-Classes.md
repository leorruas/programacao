# Entendendo classes - método Feynman

Em [[javascript/Introdução ao JavaScript\|JavaScript]], uma **Classe** é uma evolução direta das [[javascript/02-funções-e-objetos/06-Funções construtoras|Funções Construtoras]]. Ela é um dos blocos fundamentais para aplicar o paradigma de [[javascript/06-arquitetura-e-avancado/01-Programação orientada a objetos|Programação orientada a objetos]].

Se a [[javascript/02-funções-e-objetos/01-Funções\|Funções]] Construtora é a forma antiga de criar um **Componente Master** no Figma, a **Classe** é a forma moderna e organizada (como quando o Figma atualizou a interface para gerenciar componentes e variantes de um jeito muito mais limpo).

Uma classe é simplesmente uma receita, molde ou gabarito estruturado para criar [[javascript/02-funções-e-objetos/03-Objetos\|Objetos]].

---

## A analogia dos componentes e variantes

Imagine que você está criando um componente de botão no seu design system:

*   **A Classe (O Componente Master):** É onde você define a estrutura do botão. Você decide que todo botão terá um texto (label), uma cor (color) e uma ação de clique.
*   **O Constructor (A Configuração Inicial):** É a etapa onde você preenche os dados específicos ao criar uma cópia. Seria o equivalente a arrastar o componente para a tela e digitar "Comprar Agora" no texto.
*   **Os Métodos (As Ações do [[javascript/02-funções-e-objetos/07-Protótipos e proto\|Protótipos e Proto]]):** São as [[javascript/02-funções-e-objetos/01-Funções\|Funções]] que o botão sabe executar. No Figma, seriam as regras de transição (ex: hover para mudar de cor, ou clique para mudar de tela).

---

## Como escrever uma classe no JavaScript

A sintaxe de classe organiza tudo em um único bloco visual, facilitando a leitura e a manutenção do código:

```javascript
class BotaoUI {
  // O construtor é a função executada no momento em que criamos o botão
  constructor(texto, cor) {
    this.texto = texto;
    this.cor = cor;
  }

  // Isso é um método (uma ação que o botão sabe fazer)
  renderizar() {
    console.log("Desenhando botão com texto '" + this.texto + "' na cor " + this.cor);
  }

  clicar() {
    console.log("Ação executada ao clicar no botão: " + this.texto);
  }
}
```

### Criando instâncias (arrastando cópias para a tela)

Assim como nas [[javascript/02-funções-e-objetos/06-Funções construtoras\|Funções Construtoras]], usamos a palavra-chave `new` para criar cópias independentes a partir da nossa classe:

```javascript
const botaoConfirmar = new BotaoUI("Confirmar", "verde");
const botaoCancelar = new BotaoUI("Cancelar", "vermelho");

// Executando as ações definidas na classe
botaoConfirmar.renderizar(); // Saída: Desenhando botão com texto 'Confirmar' na cor verde
botaoCancelar.clicar();      // Saída: Ação executada ao clicar no botão: Cancelar
```

---

## Qual a diferença entre classes e funções construtoras?

Por baixo dos panos, o [[javascript/Introdução ao JavaScript\|JavaScript]] faz exatamente a mesma coisa para ambos. A diferença é visual e estrutural:

*   **Açúcar Sintático (Syntactic Sugar):** A palavra `class` é apenas uma forma mais bonita, limpa e moderna de escrever o que antes era feito com [[javascript/02-funções-e-objetos/06-Funções construtoras\|Funções Construtoras]] tradicionais.
*   **Organização:** Nas [[javascript/02-funções-e-objetos/01-Funções\|Funções]] construtoras, os métodos muitas vezes eram adicionados do lado de fora da [[javascript/02-funções-e-objetos/01-Funções\|Funções]] usando [[javascript/02-funções-e-objetos/07-Protótipos e proto\|Protótipos e Proto]] (`Funcao.prototype.metodo = ...`). Com as classes, tudo fica contido dentro do mesmo par de chaves `{}`.

---

## Resumo para memorizar

*   **Classe:** O molde principal (Componente Master) que organiza propriedades e métodos de forma moderna.
*   **Constructor:** O método especial interno que roda automaticamente quando a palavra `new` é usada para criar uma cópia (instância).
*   **Método:** Uma [[javascript/02-funções-e-objetos/01-Funções\|Funções]] que pertence àquela classe e descreve o que os [[javascript/02-funções-e-objetos/03-Objetos\|Objetos]] criados por ela podem fazer.
