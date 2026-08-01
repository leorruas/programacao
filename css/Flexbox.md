# Flexbox (Flexible Box Layout) 📦

O **Flexbox** é um modelo de layout 1D (unidimensional) do CSS criado para alinhar, distribuir espaços e organizar elementos em **linhas** ou **colunas**, mesmo quando os tamanhos dos elementos são desconhecidos ou dinâmicos.

---

## 1. O Conceito Fundamental: Pai (Container) vs Filhos (Items)

No Flexbox, o controle começa **no elemento pai**. Ao aplicar `display: flex;` em um contêiner, todos os seus filhos diretos tornam-se "itens flexíveis".

```html
<main class="caixa-pai">
    <input type="text">
    <button>Pesquisar</button>
</main>
```

```css
.caixa-pai {
    display: flex; /* Ativa o Flexbox no pai! */
}
```

---

## 2. Entendendo os Eixos (Axes)

Tudo no Flexbox depende de 2 eixos:

1. **Eixo Principal (Main Axis)**: Direção padrão em que os itens são dispostos (por padrão, da esquerda para a direita na horizontal).
2. **Eixo Cruzado (Cross Axis)**: Eixo perpendicular ao principal (por padrão, da cima para baixo na vertical).

---

## 3. Propriedades do Pai (Container)

### `flex-direction` (Define o sentido dos itens)
- `row` *(padrão)*: Itens lado a lado (em linha).
- `column`: Itens um embaixo do outro (em coluna).
- `row-reverse` / `column-reverse`: Inverte a ordem dos itens.

```css
.container {
    display: flex;
    flex-direction: row; /* Ou column */
}
```

---

### `justify-content` (Alinhamento no Eixo Principal)
Controla como os itens se distribuem ao longo do eixo principal (horizontal quando `flex-direction: row`).

- `flex-start` *(padrão)*: Grudados no início.
- `center`: Centralizados.
- `flex-end`: Grudados no final.
- `space-between`: Primeiro item no início, último no final, espaço igual entre eles.
- `space-around`: Espaço igual ao redor de cada item.
- `space-evenly`: Espaço exatamente igual entre todos os itens e as bordas.

```css
.main-search {
    display: flex;
    justify-content: space-between; /* Mantém input e botão espaçados */
}
```

---

### `align-items` (Alinhamento no Eixo Cruzado)
Controla o alinhamento no eixo perpendicular (vertical quando `flex-direction: row`).

- `stretch` *(padrão)*: Estica os itens para ocuparem toda a altura do contêiner.
- `center`: Centraliza os itens verticalmente.
- `flex-start`: Alinha no topo.
- `flex-end`: Alinha na base.

```css
/* O famoso truque da Centralização Perfeita! */
.centro-perfeito {
    display: flex;
    justify-content: center; /* Centro Horizontal */
    align-items: center;     /* Centro Vertical */
}
```

---

### `gap` (Espaçamento entre itens)
Forma moderna e limpa de adicionar espaço entre os itens sem precisar de `margin`.

```css
.container {
    display: flex;
    gap: 15px; /* Adiciona 15px de espaço entre cada filho */
}
```

---

### `flex-wrap` (Quebra de linha)
Por padrão, os itens flex tentam se espremer numa linha só.

- `nowrap` *(padrão)*: Todos os itens ficam em uma única linha.
- `wrap`: Se não houver espaço, os itens passam para a próxima linha.

---

## 4. Propriedades dos Filhos (Items)

### `flex` (ou `flex-grow`, `flex-shrink`, `flex-basis`)
Permite que um item ocupe o espaço restante disponível.

- `flex: 1;`: O filho crescerá e ocupará todo o espaço vago no contêiner.

```css
main {
    display: flex;
    gap: 10px;
}

input {
    flex: 1; /* O input ocupa todo o espaço restante disponível */
}

button {
    /* O botão mantém apenas o tamanho do seu próprio conteúdo */
}
```

---

## 5. Resumo Visual de Bolso 🧠

| O que você quer fazer? | Propriedade a usar |
| :--- | :--- |
| Deixar elementos lado a lado | `display: flex;` |
| Centralizar tudo no meio da tela | `justify-content: center;` + `align-items: center;` |
| Espaçar elementos sem usar margin | `gap: 20px;` |
| Fazer elementos ficarem em coluna | `flex-direction: column;` |
| Empurrar elementos para os cantos opostos | `justify-content: space-between;` |
