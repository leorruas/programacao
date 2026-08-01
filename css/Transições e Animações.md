# Transições e Animações em CSS ⚡

As transições no CSS permitem mudar suavemente o valor de uma propriedade ao longo de um determinado tempo (em vez de uma mudança abrupta).

---

## 1. A Regra de Ouro do `transition`

> [!IMPORTANT]
> **Coloque a regra `transition` no seletor base do elemento (ex: `h1`), NUNCA apenas no `:hover`.**

- **No seletor base (`h1`)**: A transição funciona tanto quando o mouse **entra** (hover in) quanto quando ele **sai** (hover out).
- **Apenas no `:hover`**: A transição só funciona ao colocar o mouse. Ao retirar o mouse, o elemento volta de forma seca e abrupta.

---

## 2. Sintaxe do `transition`

A sintaxe reduzida do `transition` aceita 4 valores principais:

```css
transition: [propriedade] [duração] [curva de velocidade] [atraso];
```

### Exemplo Prático:

```css
h1 {
    font-size: 4em;
    color: gray;
    /* Transiciona APENAS a cor em 2 segundos com suavidade personalizada */
    transition: color 2s cubic-bezier(0.075, 0.82, 0.165, 1);
}

h1:hover {
    color: pink;
}
```

---

## 3. Entendendo os Parâmetros

1. **Propriedade (`color`, `transform`, `opacity`, `all`)**:
   - Especifique a propriedade que vai mudar (ex: `color`).
   - Se usar `all`, todas as propriedades que mudarem no `:hover` serão animadas.

2. **Duração (`0.3s`, `1s`, `2s`)**:
   - O tempo que a animação levará para completar (em segundos `s` ou milissegundos `ms`).

3. **Curva de Velocidade (Timing Function)**:
   - `linear`: Velocidade constante do início ao fim.
   - `ease`: Começa devagar, acelera e termina devagar (padrão).
   - `ease-in`: Começa devagar e acelera.
   - `ease-out`: Começa rápido e desacelera no final.
   - `cubic-bezier(x1, y1, x2, y2)`: Permite criar uma curva personalizada de aceleração e desaceleração.

---

## 4. Combinando `transition` com `transform` (Muito Usado!)

Transicionar cor é ótimo, mas transicionar posição/tamanho cria efeitos de interface incríveis:

```css
button {
    background-color: transparent;
    color: white;
    border: 2px solid pink;
    padding: 10px 20px;
    
    /* Transição para transformar escala e cor */
    transition: transform 0.3s ease, background-color 0.3s ease;
}

button:hover {
    /* Aumenta 10% do tamanho ao passar o mouse */
    transform: scale(1.1);
    background-color: pink;
    color: black;
}
```
