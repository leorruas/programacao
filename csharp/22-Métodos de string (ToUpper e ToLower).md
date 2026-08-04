# Métodos de String (ToUpper e ToLower)
#csharp

Ao programar, frequentemente precisamos manipular textos (strings). Dois dos métodos mais comuns e úteis para isso são o **`ToUpper()`** e o **`ToLower()`**, que servem para alterar a capitalização (caixa alta ou baixa) das letras.

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

## ⚠️ Detalhe Crucial: Imutabilidade das Strings

Em Csharp, as strings são **imutáveis**. Isso significa que uma string nunca pode ser alterada diretamente na memória depois de criada. 

Quando você chama `original.ToUpper()`, o Csharp **não altera** a variável `original`. Ele cria e entrega uma **cópia nova** com as letras maiúsculas. 

* **Exemplo do erro comum:**
  ```csharp
  string nome = "leonardo";
  nome.ToUpper(); // Isso gera a cópia maiúscula, mas ela é jogada fora porque não a guardamos!

  Console.WriteLine(nome); 
  // Saída ainda será minúscula: leonardo
  ```

* **Forma correta de alterar a própria variável (Reatribuição):**
  ```csharp
  string nome = "leonardo";
  nome = nome.ToUpper(); // Guardamos a cópia de volta na variável 'nome'

  Console.WriteLine(nome); 
  // Saída correta: LEONARDO
  ```

---

## 3. Caso de Uso Real: Comparação Sem Distinção de Maiúsculas/Minúsculas

Imagine que você está criando um sistema de login e quer validar se o usuário digitou o e-mail certo, mas não importa se ele digitou letras maiúsculas ou minúsculas (ex: `L@email.com` é igual a `l@email.com`).

Para comparar de forma segura, convertemos ambos para minúsculas antes de checar:

```csharp
string emailCadastrado = "usuario@provedor.com";
string emailDigitado = "UsUaRiO@pRoVeDoR.cOm"; // Usuário digitou bagunçado

// Transforma o e-mail digitado em minúsculo antes de comparar
if (emailDigitado.ToLower() == emailCadastrado)
{
    Console.WriteLine("✓ E-mail válido! Login autorizado.");
}
else
{
    Console.WriteLine("❌ E-mail incorreto.");
}
```

---

## Artigos relacionados:
* **[[03-Variáveis, operadores e tipos de dados|Variáveis, operadores e tipos de dados]]**
* **[[12-Métodos (funções)|Métodos (funções)]]**
