# Entendendo o JSON - método Feynman

JSON significa [[javascript/Introdução ao JavaScript\|JavaScript]] Object Notation (Notação de [[javascript/02-funções-e-objetos/03-Objetos\|Objetos]] [[javascript/Introdução ao JavaScript\|JavaScript]]). 

Para entender de forma simples: o JSON é a **Ficha de Cadastro Universal** da internet, baseado na estrutura de [[javascript/02-funções-e-objetos/03-Objetos|Objetos]] do [[javascript/Introdução ao JavaScript\|JavaScript]]. Ele é o formato de texto padrão usado para transmitir dados entre computadores e consultar dados de uma [[javascript/05-assincrono/02-API|API]] usando o [[javascript/05-assincrono/03-Fetch|Fetch]].

---

## A analogia dos design tokens no Figma

Se você é designer, provavelmente já ouviu falar de **Design Tokens**. 

Imagine que você quer enviar as especificações de cores e fontes do seu design system para um desenvolvedor.
*   Você não envia um print da tela, pois o computador do desenvolvedor não consegue ler uma imagem para extrair os códigos hexadecimais automaticamente.
*   Você também não envia um arquivo de projeto inteiro do Figma, pois seria pesado e complexo demais para o código ler de forma simples.

Em vez disso, você exporta um arquivo de texto simples contendo chaves (nomes) e valores (dados). Isso é o JSON.

### Exemplo de especificação de design em JSON:
```json
{
  "corPrimaria": "#0a84ff",
  "espacamentoPadrao": 16,
  "fonteTitulo": "Archivo"
}
```

Qualquer linguagem de programação do mundo consegue ler esse bloco de texto simples e aplicar as configurações no código do site ou aplicativo.

---

## As regras básicas do JSON (como ler a ficha)

Diferente do [[javascript/Introdução ao JavaScript\|JavaScript]], o JSON é apenas um texto e tem regras de escrita muito rígidas para garantir que nenhum computador interprete errado:

1.  **Dados em Pares (Chave e Valor):** Toda informação tem um nome (chave) à esquerda e o dado real (valor) à direita.
2.  **Aspas Duplas Obrigatórias:** Tanto as chaves quanto os valores do tipo texto (strings) precisam obrigatoriamente estar entre aspas duplas `"`. Aspas simples `'` não funcionam no JSON.
3.  **Vírgulas Separadoras:** Cada linha de dado é separada por uma vírgula, exceto a última linha antes de fechar as chaves.

### Um exemplo completo de cadastro de produto:
```json
{
  "nome": "Teclado Mecânico",
  "preco": 349.90,
  "disponivel": true,
  "teclas": ["A", "B", "C", "D"],
  "dimensoes": {
    "largura": 35,
    "altura": 4
  }
}
```

Observe que o JSON aceita textos, números, valores verdadeiro/falso (booleanos), listas (arrays) e até mesmo outras fichas menores dentro dele ([[javascript/02-funções-e-objetos/03-Objetos\|Objetos]] aninhados).

---

## Por que ele é tão popular?

*   **Leve:** Como é feito apenas de texto simples, os arquivos são extremamente pequenos e viajam muito rápido pela internet.
*   **Universal:** Praticamente todas as tecnologias, bancos de dados e linguagens de programação sabem ler e escrever JSON. Ele é o idioma oficial de comunicação entre o navegador e o servidor.
