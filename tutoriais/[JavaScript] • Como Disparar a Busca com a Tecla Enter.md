# [JavaScript] • Como Disparar a Busca com a Tecla Enter


Melhorar a experiência do usuário (UX) inclui permitir que ele pesquise apenas pressionando a tecla **Enter** no teclado, sem a obrigação de clicar manualmente no botão "Pesquisar".

Existem dois caminhos simples em JavaScript para alcançar esse resultado.

---

## Método 1: Escutando o Evento de Teclado no Input (`keyup`)

A forma mais direta sem alterar a estrutura do seu HTML é adicionar um ouvinte de evento `keyup` (tecla solta) ou `keydown` (tecla pressionada) no elemento `<input>`.

### Como Funciona:
Toda vez que o usuário pressiona e solta uma tecla no campo, o navegador dispara um objeto `evento` com a propriedade `evento.key`. Verificamos se o nome da tecla é `"Enter"`.

### Código em JavaScript (`script.js`):

```javascript
const campoTexto = document.querySelector("input");

// Escuta quando qualquer tecla é solta dentro do campo de busca
campoTexto.addEventListener("keyup", (evento) => {
    // Verifica se a tecla pressionada foi especificamente o Enter
    if (evento.key === "Enter") {
        const pesquise = campoTexto.value;
        buscar(pesquise);
    }
});
```

---

## Método 2: Usando Formulário HTML (`<form>`) e o Evento `submit`

Formulários HTML (`<form>`) possuem um comportamento nativo no navegador: ao apertar **Enter** em qualquer input interno ou clicar no botão, o formulário dispara o evento `submit`.

### Passo 1: Envolver os elementos no `index.html`

```html
<form id="form-busca">
    <input type="text" placeholder="o que você quer pesquisar hoje? ">
    <button type="submit">Pesquisar</button>
</form>
```

### Passo 2: Escutar o `submit` no `script.js`

> ️ **Atenção**: É fundamental usar `evento.preventDefault()` para evitar que o navegador recarregue a página!

```javascript
const formBusca = document.getElementById("form-busca");
const campoTexto = document.querySelector("input");

formBusca.addEventListener("submit", (evento) => {
    evento.preventDefault(); // Impede o recarregamento automático da página ao enviar
    
    const pesquise = campoTexto.value;
    buscar(pesquise);
});
```

---

## Comparativo dos Dois Métodos

| Método | Vantagens | O que atentar? |
| :--- | :--- | :--- |
| **Evento `keyup` no Input** | Não precisa alterar a estrutura do HTML. | Funciona especificamente quando o cursor está no input. |
| **Evento `submit` no Form** | Padrão nativo de acessibilidade da web. | Exige o uso obrigatório de `evento.preventDefault()`. |
