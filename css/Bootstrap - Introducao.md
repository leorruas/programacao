# Bootstrap: O que é e por que usar
#css #bootstrap

Aprender CSS puro é essencial, mas na prática do mercado você vai encontrar projetos que usam **frameworks CSS**: coleções de estilos e componentes prontos que aceleram o desenvolvimento. O Bootstrap é o mais popular do mundo, e entender como ele funciona muda a forma como você pensa em construir interfaces.

---

## A Analogia da Loja de Roupas

Construir uma interface do zero com CSS puro é como ser um alfaiate: você corta o tecido, costura cada peça e cria uma roupa completamente única. Leva tempo, mas o resultado é exatamente o que você queria.

O Bootstrap é como comprar em uma loja de roupas prêt-à-porter (pronto para vestir). As peças já estão cortadas, costuradas e bem acabadas. Você pega um paletó, uma calça, combina com uma camisa e sai de casa bem vestido em minutos. Se precisar de algum ajuste, você ainda pode ir ao alfaiate depois, mas o trabalho pesado já está feito.

---

## O que o Bootstrap entrega para você

O Bootstrap é uma coleção de três coisas principais:

1. **Um sistema de grid responsivo:** Uma grade de 12 colunas que divide a tela e reorganiza os elementos automaticamente dependendo do tamanho do dispositivo (celular, tablet, computador).
2. **Componentes prontos:** Botões, menus, cards, modais, formulários, alertas, tabelas, barras de navegação — tudo já estilizado e funcional.
3. **Utilitários:** Classes pequenas para ajuste fino, como margens, paddings, cores, textos e visibilidade, que você aplica diretamente no HTML sem escrever uma linha de CSS.

---

## Como adicionar o Bootstrap ao seu projeto

### Via CDN (a forma mais rápida)

Para projetos simples ou para aprendizado, você pode carregar o Bootstrap diretamente de um servidor externo, sem instalar nada. Basta adicionar os links no seu arquivo HTML:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Projeto Bootstrap</title>

    <!-- CSS do Bootstrap -->
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
    >
</head>
<body>

    <h1>Olá, Bootstrap!</h1>

    <!-- JavaScript do Bootstrap (necessário para componentes interativos) -->
    <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">
    </script>
</body>
</html>
```

Pronto. Com esses dois links, você tem acesso a todo o ecossistema do Bootstrap.

### Via NPM (para projetos com bundler)

Se você está em um projeto com Node.js, Vite ou webpack:

```bash
npm install bootstrap
```

---

## A filosofia do Bootstrap: classes no HTML

A ideia central do Bootstrap é que você estiliza os elementos **adicionando classes específicas diretamente no HTML**, sem precisar escrever CSS próprio para a maioria dos casos.

Compare as duas abordagens:

```html
<!-- CSS puro: você escreve o CSS e referencia a classe -->
<button class="meu-botao">Clique aqui</button>
```
```css
.meu-botao {
    background-color: #0d6efd;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
```

```html
<!-- Bootstrap: a classe já vem com todo o estilo incluído -->
<button class="btn btn-primary">Clique aqui</button>
```

O resultado visual é praticamente o mesmo, mas com Bootstrap você não escreve uma linha de CSS.

---

## Bootstrap 5 vs versões anteriores

A versão atual e recomendada é o **Bootstrap 5**. As principais mudanças em relação ao Bootstrap 4:

- **Removeu a dependência do jQuery:** O Bootstrap 5 usa JavaScript puro, sem precisar carregar a biblioteca jQuery separadamente.
- **Novo sistema de grid com CSS Grid:** Mais flexível e moderno.
- **Utilitários de API:** Você pode criar suas próprias classes utilitárias usando a configuração do Bootstrap.
- **Componentes melhorados:** Offcanvas, placeholders e melhorias nos formulários.

---

## Artigos relacionados:
* **[[css/Bootstrap - Sistema de Grid|Bootstrap: Sistema de Grid]]**
* **[[css/Bootstrap - Componentes|Bootstrap: Componentes Prontos]]**
* **[[css/Flexbox|Flexbox]]**
* **[[css/Guia de CSS|Guia de CSS]]**
