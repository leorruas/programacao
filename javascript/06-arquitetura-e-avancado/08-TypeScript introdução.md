# Introdução ao TypeScript - método Feynman

O [[javascript/06-arquitetura-e-avancado/TypeScript introdução\|TypeScript]] não é uma nova linguagem de programação. Ele é uma **camada de regras e segurança (Tipagem Estática)** construída por cima do [[javascript/Introdução ao JavaScript\|JavaScript]]. 

Como diz a analogia comum: o [[javascript/06-arquitetura-e-avancado/TypeScript introdução\|TypeScript]] é o [[javascript/Introdução ao JavaScript\|JavaScript]] usando uma **armadura de proteção contra bugs**.

---

## A analogia das regras do design system

Imagine que você está estruturando uma biblioteca de componentes no Figma:

*   **Abordagem Livre ([[javascript/Introdução ao JavaScript\|JavaScript]] Puro):** Você cria um componente de avatar de usuário, mas deixa a imagem livre. Qualquer designer do time pode deletar a foto e escrever um texto qualquer lá dentro, ou mudar a largura para um tamanho que quebre o cabeçalho. Não existem travas de segurança.
*   **Abordagem Regrada ([[javascript/06-arquitetura-e-avancado/TypeScript introdução\|TypeScript]]):** Você usa as propriedades nativas de componente (Component Properties) do Figma e define regras estritas:
    *   A propriedade `tamanho` só aceita as opções: `"pequeno"`, `"medio"` ou `"grande"`.
    *   A propriedade `exibirFoto` é uma chave liga/desliga obrigatória (Boolean).
    *   Se qualquer designer do time tentar digitar `"gigante"` ou colocar uma cor onde deveria estar a foto, o Figma exibe um aviso de alerta na hora.

O [[javascript/06-arquitetura-e-avancado/TypeScript introdução\|TypeScript]] faz exatamente isso no código. Ele exige que você defina os tipos das variáveis e componentes antes de rodar o código. Se você tentar passar um texto para um campo que deveria receber apenas números, o [[javascript/06-arquitetura-e-avancado/TypeScript introdução\|TypeScript]] exibe um erro de compilação imediatamente, antes mesmo de você abrir o site no navegador.

---

## Exemplo prático de diferença

Veja como a mesma [[javascript/01-fundamentos/Funções\|Funções]] de cálculo de tamanho se comporta:

### Em JavaScript puro (livre de regras):
```javascript
function calcularPreco(valor, quantidade) {
  return valor * quantidade;
}

// O JavaScript aceita isso sem reclamar
calcularPreco("cem reais", 2); // Saída: NaN (Not a Number - quebra a conta)
```

### Em TypeScript (com especificações rígidas):
```typescript
// Especificamos que valor e quantidade precisam ser do tipo "number"
function calcularPreco(valor: number, quantidade: number): number {
  return valor * quantidade;
}

// O seu editor de código (VS Code) exibe uma linha vermelha de erro antes de rodar
calcularPreco("cem reais", 2); // Erro: Argument of type 'string' is not assignable to parameter of type 'number'.
```

---

## Como o TypeScript roda no navegador?

Os navegadores de internet (como Chrome, Safari ou Firefox) não sabem o que é [[javascript/06-arquitetura-e-avancado/TypeScript introdução\|TypeScript]]; eles só conseguem ler [[javascript/Introdução ao JavaScript\|JavaScript]] puro.

Por conta disso, o [[javascript/06-arquitetura-e-avancado/TypeScript introdução\|TypeScript]] passa por um processo chamado **Transpilação**. 

Fazendo uma analogia, é como você projetar um [[javascript/01-fundamentos/Protótipos e Proto\|Protótipos e Proto]] complexo no Figma com centenas de guias técnicas e depois exportar um arquivo final em formato de imagem estática SVG ou PNG leve para a entrega. O compilador do [[javascript/06-arquitetura-e-avancado/TypeScript introdução\|TypeScript]] remove todas as anotações de regras de tipos e gera um arquivo [[javascript/Introdução ao JavaScript\|JavaScript]] limpo e tradicional para rodar no navegador.

---

## Resumo para memorizar

*   **[[javascript/06-arquitetura-e-avancado/TypeScript introdução\|TypeScript]]:** Uma extensão do [[javascript/Introdução ao JavaScript\|JavaScript]] que adiciona tipagem estática (regras obrigatórias para dados).
*   **Segurança:** Detecta e avisa sobre erros e dados incompatíveis diretamente no editor de código, antes mesmo de o código ser executado.
*   **Transpilação:** O processo que converte o código [[javascript/06-arquitetura-e-avancado/TypeScript introdução\|TypeScript]] em [[javascript/Introdução ao JavaScript\|JavaScript]] puro para que os navegadores consigam ler.
