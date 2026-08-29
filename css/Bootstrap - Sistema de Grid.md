# Bootstrap: Sistema de Grid (As 12 Colunas)
#css #bootstrap

O sistema de grid é o coração do Bootstrap. Antes de tocar em qualquer componente ou botão, é preciso entender como ele organiza o espaço na tela, porque tudo no Bootstrap é construído em cima dessa grade.

---

## A Analogia da Prancheta de Arquiteto

Imagine uma prancheta de arquiteto dividida em **12 colunas verticais** iguais. Quando você vai desenhar um cômodo, você não diz "quero que este quarto tenha 300 pixels de largura". Você diz "quero que este quarto ocupe 6 das 12 colunas disponíveis", ou seja, metade da planta.

O Bootstrap funciona exatamente assim. Cada linha da sua página tem 12 colunas disponíveis, e você decide como distribuir os elementos dentro dessas colunas. Se um elemento ocupa 6 colunas, ele ocupa metade da largura. Se ocupa 12 colunas, ocupa a linha inteira.

---

## 1. A estrutura básica: container, row e col

O grid do Bootstrap é construído com três elementos empilhados:

- **`.container`:** Define a área central com largura máxima e margens laterais automáticas.
- **`.row`:** Uma linha da grade. Cria o espaço onde as colunas vão se encaixar.
- **`.col-*`:** Uma coluna que ocupa um número específico das 12 disponíveis.

```html
<div class="container">
    <div class="row">
        <div class="col-6">Coluna da esquerda (6/12 = 50%)</div>
        <div class="col-6">Coluna da direita (6/12 = 50%)</div>
    </div>
</div>
```

Resultado: dois blocos lado a lado, cada um ocupando metade da tela.

A regra é simples: os números das colunas dentro de uma `.row` devem somar 12:

```html
<div class="row">
    <div class="col-4">33%</div>   <!-- 4 colunas -->
    <div class="col-4">33%</div>   <!-- 4 colunas -->
    <div class="col-4">33%</div>   <!-- 4 colunas = total 12 -->
</div>

<div class="row">
    <div class="col-3">25%</div>  <!-- 3 colunas -->
    <div class="col-9">75%</div>  <!-- 9 colunas = total 12 -->
</div>
```

---

## 2. Responsividade: o grid que se adapta ao dispositivo

A verdadeira força do sistema de grid está nos **breakpoints responsivos**. Você pode definir comportamentos diferentes para cada tamanho de tela usando prefixos nas classes de coluna:

| Prefixo | Breakpoint | Tamanho de tela |
| :--- | :--- | :--- |
| `col-` | Extra small | Menos de 576px (celular pequeno) |
| `col-sm-` | Small | 576px ou mais |
| `col-md-` | Medium | 768px ou mais (tablet) |
| `col-lg-` | Large | 992px ou mais (notebook) |
| `col-xl-` | Extra large | 1200px ou mais (desktop) |
| `col-xxl-` | Extra extra large | 1400px ou mais (monitor grande) |

### Exemplo prático: um card que se adapta

```html
<div class="container">
    <div class="row">
        <!--
            No celular (col-12): ocupa a linha inteira, um card por linha.
            No tablet (col-md-6): dois cards por linha.
            No desktop (col-lg-4): três cards por linha.
        -->
        <div class="col-12 col-md-6 col-lg-4">Card 1</div>
        <div class="col-12 col-md-6 col-lg-4">Card 2</div>
        <div class="col-12 col-md-6 col-lg-4">Card 3</div>
    </div>
</div>
```

Você não precisa escrever nenhuma media query. O Bootstrap lê as classes e muda o layout automaticamente conforme a tela muda de tamanho.

---

## 3. col sem número: divisão automática

Se você usar `.col` sem especificar um número, o Bootstrap divide o espaço disponível igualmente entre todas as colunas sem número na mesma linha:

```html
<div class="row">
    <div class="col">Divide igualmente</div>
    <div class="col">Divide igualmente</div>
    <div class="col">Divide igualmente</div>
</div>
<!-- Resultado: cada div ocupa 1/3 da linha automaticamente -->
```

---

## 4. Offset: pulando colunas

Para criar recuos ou centralizar um elemento sem usar outra coluna, use `offset-*`:

```html
<div class="row">
    <!-- Pula 3 colunas, depois ocupa 6 colunas (centrado visualmente) -->
    <div class="col-6 offset-3">Elemento centralizado</div>
</div>
```

---

## 5. Containers

O Bootstrap tem três tipos de container:

```html
<!-- Largura maxima por breakpoint, com margens laterais -->
<div class="container"> ... </div>

<!-- Ocupa 100% da largura sempre, com margens laterais -->
<div class="container-fluid"> ... </div>

<!-- 100% de largura ate um breakpoint especifico, depois para de crescer -->
<div class="container-md"> ... </div>
```

---

## Exemplo completo: uma página simples com grid

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grid Bootstrap</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="p-3">

    <div class="container">

        <!-- Cabecalho: linha inteira -->
        <div class="row mb-3">
            <div class="col-12 bg-dark text-white p-3">
                Cabecalho (12 colunas)
            </div>
        </div>

        <!-- Conteudo principal + barra lateral -->
        <div class="row mb-3">
            <div class="col-12 col-md-8 bg-light p-3">
                Conteudo principal (8 colunas no desktop, 12 no celular)
            </div>
            <div class="col-12 col-md-4 bg-secondary text-white p-3">
                Barra lateral (4 colunas no desktop, 12 no celular)
            </div>
        </div>

        <!-- Rodape: linha inteira -->
        <div class="row">
            <div class="col-12 bg-dark text-white p-3 text-center">
                Rodape (12 colunas)
            </div>
        </div>

    </div>

</body>
</html>
```

---

## Artigos relacionados:
* **[[css/Bootstrap - Introducao|Bootstrap: Introdução]]**
* **[[css/Bootstrap - Componentes|Bootstrap: Componentes Prontos]]**
* **[[css/Flexbox|Flexbox]]**
