# Propriedades e métodos de string no JavaScript - método Feynman

Quando você digita uma palavra entre aspas no console do navegador (ex: `'Andre'`) e adiciona o ponto (`.`), o autocompletar exibe uma lista gigantesca com mais de 50 propriedades e métodos.

Isso acontece devido a um fenômeno do [[javascript/Introdução ao JavaScript\|JavaScript]] chamado **Autoboxing** (Empacotamento Automático). Embora a string seja um [[javascript/01-fundamentos/Tipos de dados\|tipo de dado primitivo]], o [[javascript/Introdução ao JavaScript\|JavaScript]] envelopa o texto temporariamente dentro do [[javascript/01-fundamentos/Objetos\|Objetos]] nativo `String`, liberando uma barra de ferramentas completa.

Sob a perspectiva da **Edição de Texto**, os métodos de String funcionam exatamente como a **Barra de Ferramentas Completa do Microsoft Word ou Figma**.

---

## A analogia da barra de ferramentas completa

*   **A String Bruta (`'Andre'`):** É a frase escrita em um papel.
*   **O Ponto (`.`):** É a ação de selecionar o texto, abrindo o menu suspenso de ferramentas.
*   **A Propriedade `length`:** O contador de caracteres da barra de status.
*   **Métodos Modernos:** Os botões de busca, corte, substituição e caixa alta/baixa.
*   **Métodos Legados (HTML):** Ferramentas antigas da década de 90 mantidas na gaveta do fundo apenas por compatibilidade com arquivos legados.

---

## 1. Dicionário exaustivo de todos os métodos e propriedades de string

Abaixo está a lista completa de tudo o que o [[javascript/Introdução ao JavaScript\|JavaScript]] disponibiliza no [[javascript/01-fundamentos/Protótipos e Proto\|Protótipos e Proto]] de String:

### A. Propriedade de informação
| Item | Tipo | Descrição e Exemplo |
| :--- | :--- | :--- |
| **`length`** | Propriedade | Retorna a quantidade de caracteres da string. Ex: `'Andre'.length` (Saída: `5`). |
| **`constructor`** | Propriedade | Retorna a [[javascript/01-fundamentos/Funções\|Funções]] construtora do [[javascript/01-fundamentos/Objetos\|Objetos]] (`function String() { [native code] }`). |

---

### B. Métodos de acesso e inspeção de caracteres
| Método | Descrição | Exemplo / Saída |
| :--- | :--- | :--- |
| **`at(index)`** | Retorna o caractere no índice especificado. Aceita números negativos para contar do final! | `'Andre'.at(-1)` -> `"e"` |
| **`charAt(index)`** | Retorna o caractere na posição informada (índice 0-indexed). | `'Andre'.charAt(0)` -> `"A"` |
| **`charCodeAt(index)`** | Retorna o código numérico UTF-16 do caractere. | `'Andre'.charCodeAt(0)` -> `65` |
| **`codePointAt(index)`** | Retorna o ponto de código Unicode completo (suporta emojis e caracteres especiais). | `'Andre'.codePointAt(0)` -> `65` |

---

### C. Métodos de busca, posição e validação
| Método | Descrição | Exemplo / Saída |
| :--- | :--- | :--- |
| **`includes(busca, inicio)`** | Retorna `true` se a string contém o texto buscado. | `'Andre'.includes('nd')` -> `true` |
| **`startsWith(busca, inicio)`** | Retorna `true` se a string começa com o texto. | `'Andre'.startsWith('A')` -> `true` |
| **`endsWith(busca, tamanho)`** | Retorna `true` se a string termina com o texto. | `'Andre'.endsWith('e')` -> `true` |
| **`indexOf(busca, inicio)`** | Retorna o índice da primeira ocorrência do texto (ou `-1` se não achar). | `'Andre'.indexOf('d')` -> `2` |
| **`lastIndexOf(busca, inicio)`** | Retorna o índice da última ocorrência do texto. | `'Andre'.lastIndexOf('e')` -> `4` |
| **`search(regex)`** | Busca uma correspondência via [[javascript/01-fundamentos/Regex\|Regex]] e retorna o índice. | `'Andre'.search(/d/)` -> `2` |
| **`match(regex)`** | Retorna um array com os resultados da busca por [[javascript/01-fundamentos/Regex\|Regex]]. | `'Andre'.match(/n./)` -> `["nd"]` |
| **`matchAll(regex)`** | Retorna um iterador com todas as correspondências detalhadas de uma [[javascript/01-fundamentos/Regex\|Regex]] global. | Usado com `for...of` |
| **`localeCompare(outraStr)`** | Compara duas strings considerando acentuação e idioma (retorna `-1`, `0` ou `1`). | `'a'.localeCompare('b')` -> `-1` |
| **`isWellFormed()`** | Retorna `true` se a string não contiver marcadores de código Unicode "orfãos". | Método moderno de validação |

---

### D. Métodos de recorte, extração e junção
| Método | Descrição | Exemplo / Saída |
| :--- | :--- | :--- |
| **`slice(inicio, fim)`** | Extrai uma fatia da string. Aceita números negativos. | `'Andre'.slice(1, 4)` -> `"ndr"` |
| **`substring(inicio, fim)`** | Extrai uma fatia da string. Não aceita índices negativos. | `'Andre'.substring(0, 3)` -> `"And"` |
| **`substr(inicio, tamanho)`** | Extrai a partir do início com um número de caracteres fixo (Obsoleto). | `'Andre'.substr(1, 3)` -> `"ndr"` |
| **`split(separador, limite)`** | Corta a string no separador e retorna um [[javascript/03-manipulacao/Métodos de array\|Array]]. | `'A-B'.split('-')` -> `["A", "B"]` |
| **`concat(str1, str2...)`** | Une duas ou mais strings (embora o operador `+` seja mais comum). | `'An'.concat('dre')` -> `"Andre"` |

---

### E. Métodos de transformação, limpeza e formatação
| Método | Descrição | Exemplo / Saída |
| :--- | :--- | :--- |
| **`toLowerCase()`** | Converte todas as letras para minúsculas. | `'Andre'.toLowerCase()` -> `"andre"` |
| **`toUpperCase()`** | Converte todas as letras para maiúsculas. | `'Andre'.toUpperCase()` -> `"ANDRE"` |
| **`toLocaleLowerCase()`** | Converte para minúsculas respeitando regras do idioma local. | `'i'.toLocaleLowerCase('tr')` |
| **`toLocaleUpperCase()`** | Converte para maiúsculas respeitando regras do idioma local. | `'i'.toLocaleUpperCase('tr')` |
| **`trim()`** | Remove espaços em branco do início e do fim. | `' Andre '.trim()` -> `"Andre"` |
| **`trimStart()` / `trimLeft()`** | Remove espaços em branco apenas do início. | `' Andre'.trimStart()` -> `"Andre"` |
| **`trimEnd()` / `trimRight()`** | Remove espaços em branco apenas do final. | `'Andre '.trimEnd()` -> `"Andre"` |
| **`replace(busca, substituto)`** | Substitui a primeira ocorrência do texto ou [[javascript/01-fundamentos/Regex\|Regex]]. | `'Andre'.replace('e', 'a')` -> `"Andra"` |
| **`replaceAll(busca, substituto)`** | Substitui TODAS as ocorrências do texto ou [[javascript/01-fundamentos/Regex\|Regex]]. | `'aba'.replaceAll('a', 'x')` -> `"xbx"` |
| **`repeat(vezes)`** | Repete o texto a quantidade de vezes especificada. | `'A'.repeat(3)` -> `"AAA"` |
| **`padStart(tamanho, texto)`** | Preenche o início do texto até atingir o comprimento desejado. | `'5'.padStart(3, '0')` -> `"005"` |
| **`padEnd(tamanho, texto)`** | Preenche o final do texto até atingir o comprimento desejado. | `'5'.padEnd(3, '0')` -> `"500"` |
| **`normalize(form)`** | Converte a string para a Forma de Normalização Unicode (NFC, NFD, etc.). | Unifica acentos compostos |
| **`toWellFormed()`** | Converte a string substituindo marcadores Unicode inválidos por caracteres de substituição. | Tratamento de emojis quebrados |

---

### F. Métodos estáticos (invocados direto em ___placeholder_114___)
Estes métodos não são chamados na instância `'texto'.metodo()`, mas sim no construtor `String`:

*   **`String.fromCharCode(code1, code2...)`**: Cria uma string a partir de códigos UTF-16.
    ```javascript
    String.fromCharCode(65, 66, 67); // "ABC"
    ```
*   **`String.fromCodePoint(code1, code2...)`**: Cria uma string a partir de pontos de código Unicode (incluindo emojis).
    ```javascript
    String.fromCodePoint(0x1F600); // 
    ```
*   **`String.raw`**: Retorna a string bruta sem processar sequências de escape (`\n`, `\t`).

---

### G. Métodos legados de HTML (os que aparecem na imagem do seu console)

Estes métodos foram criados nos anos 90 e inserem tags HTML puras envoltas da palavra. **Eles não devem ser usados em projetos modernos**, sendo mantidos pelos navegadores apenas para retrocompatibilidade:

*   **`anchor(name)`**: Retorna `<a name="name">Andre</a>`
*   **`big()`**: Retorna `<big>Andre</big>`
*   **`blink()`**: Retorna `<blink>Andre</blink>`
*   **`bold()`**: Retorna `<b>Andre</b>`
*   **`fixed()`**: Retorna `<tt>Andre</tt>`
*   **`fontcolor(color)`**: Retorna `<font color="color">Andre</font>`
*   **`fontsize(size)`**: Retorna `<font size="size">Andre</font>`
*   **`italics()`**: Retorna `<i>Andre</i>`
*   **`link(url)`**: Retorna `<a href="url">Andre</a>`
*   **`small()`**: Retorna `<small>Andre</small>`
*   **`strike()`**: Retorna `<strike>Andre</strike>`
*   **`sub()`**: Retorna `<sub>Andre</sub>`
*   **`sup()`**: Retorna `<sup>Andre</sup>`

---

## Resumo para memorizar

*   **Tamanho da Lista:** São mais de 50 itens disponíveis no autocompletar devido ao [[javascript/01-fundamentos/Protótipos e Proto\|Protótipos e Proto]] `String.prototype`.
*   **O que usar no dia a dia:** Foque em `length`, `includes`, `slice`, `split`, `trim`, `replace`, `toLowerCase` e `toUpperCase`.
*   **O que ignorar:** Ignore totalmente os métodos de formatação HTML (`bold`, `italics`, `blink`, etc.) e use CSS no lugar.
