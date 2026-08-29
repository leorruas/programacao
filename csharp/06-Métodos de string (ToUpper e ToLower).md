# Métodos de String (ToUpper e ToLower)
#csharp

Ao programar, frequentemente precisamos manipular textos (strings). Dois dos métodos mais comuns e úteis para isso são o **`ToUpper()`** e o **`ToLower()`**, que servem para alterar a capitalização (caixa alta ou baixa) das letras.

---

## A Analogia do Filtro de Voz

Para entender esses métodos, imagine um microfone infantil de brinquedo que vem com filtros de voz:

* **ToUpper() (Gritar):** É o botão que ativa o modo "Megafone". Não importa se você falar sussurrando ou normal, o som sai todo em letras maiúsculas (gritando).
* **ToLower() (Sussurrar):** É o botão que ativa o modo "Sussurro". Mesmo que você dê um grito no microfone, a saída sai toda em letras minúsculas (baixas).

---

## 1. ToUpper() (Converter para Maiúsculas)

O método **`ToUpper()`** transforma todas as letras de um texto em **letras maiúsculas** (caixa alta).

* **Exemplo de código:**
  ```csharp
  string original = "olá, mundo!";
  string gritando = original.ToUpper();

  Console.WriteLine(gritando); 
  // Saída: OLÁ, MUNDO!
  ```

---

## 2. ToLower() (Converter para Minúsculas)

O método **`ToLower()`** faz o inverso: transforma todas as letras de um texto em **letras minúsculas** (caixa baixa).

* **Exemplo de código:**
  ```csharp
  string original = "PROGRAMAÇÃO CSHARP";
  string calmo = original.ToLower();

  Console.WriteLine(calmo);
  // Saída: programação csharp
  ```

---

## A Analogia da Foto Impressa (Imutabilidade)

Em Csharp, as strings são **imutáveis**. Isso significa que uma string nunca pode ser alterada diretamente na memória depois de criada. 

Imagine uma fotografia que você acabou de imprimir na impressora. Você não consegue mudar a imagem diretamente naquele papel físico. Se você quiser a mesma foto com um filtro preto e branco, você precisa escanear a foto original, aplicar o filtro no computador e imprimir uma **foto nova** em um novo papel.

Quando você chama `original.ToUpper()`, o Csharp não altera a variável `original`. Ele cria e entrega uma **cópia nova** com as letras maiúsculas, deixando o texto original intocado.

* **Exemplo do erro comum:**
  ```csharp
  string nome = "leonardo";
  nome.ToUpper(); // Isso gera a cópia maiúscula, mas ela é jogada fora porque não a guardamos!

  Console.WriteLine(nome); 
  // Saída ainda será minúscula: leonardo
  ```

* **Forma correta de guardar o resultado (Reatribuição):**
  ```csharp
  string nome = "leonardo";
  nome = nome.ToUpper(); // Guardamos a cópia nova de volta na variável 'nome'

  Console.WriteLine(nome); 
  // Saída correta: LEONARDO
  ```

---

## 3. Caso de Uso Real: Comparação Sem Distinção de Letras

Imagine que você está criando um sistema de login e quer validar se o usuário digitou o e-mail certo, mas não importa se ele digitou letras maiúsculas ou minúsculas (ex: "L@email.com" é igual a "l@email.com").

Para comparar de forma segura, convertemos ambos para minúsculas antes de checar:

```csharp
string emailCadastrado = "usuario@provedor.com";
string emailDigitado = "UsUaRiO@pRoVeDoR.cOm"; // Usuário digitou bagunçado

// Transforma o e-mail digitado em minúsculo antes de comparar
if (emailDigitado.ToLower() == emailCadastrado)
{
    Console.WriteLine("Sucesso: E-mail valido! Login autorizado.");
}
else
{
    Console.WriteLine("Erro: E-mail incorreto.");
}
```

---

## Artigos relacionados:
* **[[csharp/04-Variáveis, operadores e tipos de dados|Variáveis, operadores e tipos de dados]]**
* **[[csharp/18-Métodos (funções)|Métodos (funções)]]**
