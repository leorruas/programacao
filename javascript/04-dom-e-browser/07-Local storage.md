# Entendendo o local storage - método Feynman

Normalmente, quando o usuário atualiza (dá F5) na página do seu site, todas as variáveis salvas no [[javascript/Introdução ao JavaScript\|JavaScript]] são limpas e voltam ao estado inicial. 

O **Local Storage** é o recurso que permite ao navegador salvar informações simples de forma permanente na máquina do usuário.

---

## A analogia das preferências do Figma

Quando você abre o Figma no seu computador:

*   Você não precisa selecionar o tema escuro toda vez que abre o aplicativo.
*   Você não precisa fazer o login toda santa vez que acessa o site.
*   O painel de camadas mantém o tamanho que você definiu da última vez que usou.

O Figma armazena essas pequenas preferências locais no seu próprio computador. O **Local Storage** é exatamente a gaveta de preferências que os navegadores disponibilizam para que os sites lembrem de escolhas simples do usuário (como o tema escuro/claro, itens no carrinho de compras ou se ele já leu um aviso na tela).

---

## Como usar o local storage no JavaScript

O funcionamento do Local Storage é baseado em chave e valor, de forma muito semelhante a um dicionário de dados ([[javascript/Consumindo APIs e Fetch\|JSON]], explicado em [[javascript/Consumindo APIs e Fetch|JSON]]). Ele armazena apenas dados em formato de **texto (string)**.

Temos três comandos fundamentais para interagir com o Local Storage:

### 1. Salvar um dado (setitem)
Para salvar uma informação, você dá um nome (chave) e coloca o valor desejado.
```javascript
// Salvando o tema de cor favorito do usuário
localStorage.setItem("temaFavorito", "dark");
```

### 2. Ler um dado (getitem)
Para recuperar a informação salva em um acesso futuro, você busca pelo nome da chave.
```javascript
// Lendo a preferência que foi salva anteriormente
const temaDefinido = localStorage.getItem("temaFavorito");

console.log(temaDefinido); // Saída: dark
```

### 3. Remover um dado (removeitem)
Se o usuário quiser redefinir ou limpar as configurações, você pode excluir a chave.
```javascript
// Deletando o registro do tema favorito
localStorage.removeItem("temaFavorito");
```

---

## O limite importante: apenas strings

O Local Storage só aceita textos simples. Se você tentar salvar um [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] complexo (como as propriedades de um [[javascript/02-funcoes-e-objetos/03-Objetos\|objeto]] ou array), o navegador vai salvar como `"[object Object]"`, estragando os dados.

Para salvar [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] ou arrays no Local Storage, precisamos transformá-los em texto usando o **[[javascript/Consumindo APIs e Fetch\|JSON]]** antes de salvar, e convertê-los de volta para [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] na hora de ler:

```javascript
const usuario = {
  nome: "Léo",
  profissao: "Designer"
};

// 1. Convertemos o objeto em texto JSON e salvamos
localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

// 2. Lemos o texto e convertemos de volta para objeto JavaScript
const dadosTexto = localStorage.getItem("usuarioLogado");
const usuarioObjeto = JSON.parse(dadosTexto);

console.log(usuarioObjeto.nome); // Saída: Léo
```

---

## Resumo para memorizar

*   **Local Storage:** Um banco de dados simples integrado ao navegador que guarda informações em formato de texto.
*   **Persistência:** Os dados não expiram; eles continuam lá mesmo se o usuário fechar a aba ou desligar o computador.
*   **Armazenamento em texto:** Guarda apenas strings. Use `JSON.stringify` para salvar [[javascript/02-funcoes-e-objetos/03-Objetos\|Objetos]] e `JSON.parse` para convertê-los de volta.
