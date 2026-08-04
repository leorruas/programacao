# Bootstrap: Componentes Prontos
#css #bootstrap

Com o grid no lugar, a segunda grande vantagem do Bootstrap são os **componentes**: blocos de interface pré-construídos que você copia, cola e personaliza. Em vez de construir um menu de navegação do zero com CSS e JavaScript, você usa o componente `navbar` do Bootstrap e ele já funciona, incluindo o menu hambúrguer no mobile.

---

## A Analogia das Peças de Lego

Se o grid é a base onde você monta a planta da sua casa, os componentes são as peças de Lego com formas definidas. Você não precisa modelar um tijolo do zero: pega a peça certa, encaixa no lugar certo, e o resultado é um conjunto coeso.

O Bootstrap garante que todas as peças seguem o mesmo padrão visual, então elas sempre vao combinar entre si.

---

## 1. Botoes (Buttons)

Os botoes do Bootstrap usam a classe base `btn` combinada com uma classe de cor semântica:

```html
<!-- Botões por cor semântica -->
<button class="btn btn-primary">Ação Principal</button>
<button class="btn btn-secondary">Ação Secundária</button>
<button class="btn btn-success">Confirmação</button>
<button class="btn btn-danger">Excluir</button>
<button class="btn btn-warning">Atenção</button>
<button class="btn btn-info">Informação</button>

<!-- Botões com borda (outline) -->
<button class="btn btn-outline-primary">Outline Primário</button>

<!-- Tamanhos -->
<button class="btn btn-primary btn-lg">Grande</button>
<button class="btn btn-primary btn-sm">Pequeno</button>
```

---

## 2. Alertas (Alerts)

Para exibir mensagens de feedback ao usuário:

```html
<div class="alert alert-success" role="alert">
    Operação realizada com sucesso.
</div>

<div class="alert alert-danger" role="alert">
    Erro: não foi possível concluir a operação.
</div>

<!-- Alerta que pode ser fechado pelo usuário -->
<div class="alert alert-warning alert-dismissible fade show" role="alert">
    Atenção: você tem mensagens não lidas.
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>
```

---

## 3. Cards

Cards são caixas com sombra e cantos arredondados usadas para agrupar conteúdo relacionado:

```html
<div class="card" style="width: 20rem;">
    <img src="imagem.jpg" class="card-img-top" alt="Imagem do card">
    <div class="card-body">
        <h5 class="card-title">Título do Card</h5>
        <p class="card-text">Descrição breve do conteúdo deste card.</p>
        <a href="#" class="btn btn-primary">Ver mais</a>
    </div>
</div>
```

Cards combinam bem com o grid. Para criar uma galeria de cards responsivos:

```html
<div class="container">
    <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">Card 1</h5>
                    <p class="card-text">Conteúdo do card.</p>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">Card 2</h5>
                    <p class="card-text">Conteúdo do card.</p>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">Card 3</h5>
                    <p class="card-text">Conteúdo do card.</p>
                </div>
            </div>
        </div>
    </div>
</div>
```

---

## 4. Barra de navegação (Navbar)

A navbar é um dos componentes mais usados. Ela já inclui o comportamento responsivo de colapsar em um menu hambúrguer no mobile:

```html
<nav class="navbar navbar-expand-lg bg-dark navbar-dark">
    <div class="container">

        <!-- Logo / Nome do site -->
        <a class="navbar-brand" href="#">MeuSite</a>

        <!-- Botão hamburguer (aparece apenas no mobile) -->
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menuPrincipal"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Os links do menu (colapsam no mobile) -->
        <div class="collapse navbar-collapse" id="menuPrincipal">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link active" href="#">Início</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Sobre</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Contato</a>
                </li>
            </ul>
        </div>

    </div>
</nav>
```

---

## 5. Formulários

O Bootstrap estiliza todos os campos de formulário de forma consistente:

```html
<form>
    <div class="mb-3">
        <label for="email" class="form-label">E-mail</label>
        <input type="email" class="form-control" id="email" placeholder="seu@email.com">
    </div>

    <div class="mb-3">
        <label for="senha" class="form-label">Senha</label>
        <input type="password" class="form-control" id="senha">
    </div>

    <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="lembrar">
        <label class="form-check-label" for="lembrar">Lembrar de mim</label>
    </div>

    <button type="submit" class="btn btn-primary w-100">Entrar</button>
</form>
```

---

## 6. Classes utilitárias: ajuste fino sem CSS

Além dos componentes, o Bootstrap tem centenas de classes utilitárias para ajuste fino:

### Espaçamento (margin e padding)
O formato é: `{propriedade}{lado}-{tamanho}`

```html
<!-- m = margin, p = padding -->
<!-- t = top, b = bottom, s = start (left), e = end (right), x = horizontal, y = vertical -->
<!-- Tamanhos: 0, 1, 2, 3, 4, 5, auto -->

<div class="mt-3">margin-top: 1rem</div>
<div class="px-4">padding-left e padding-right: 1.5rem</div>
<div class="mb-0">margin-bottom: 0</div>
```

### Texto

```html
<p class="text-center">Centralizado</p>
<p class="text-end">Alinhado à direita</p>
<p class="fw-bold">Negrito</p>
<p class="text-muted">Texto cinza discreto</p>
<p class="fs-1">Tamanho de fonte 1 (maior)</p>
```

### Display e visibilidade

```html
<div class="d-flex justify-content-between align-items-center">
    Flexbox direto com utilitários
</div>

<!-- Visivel apenas em telas médias para cima -->
<div class="d-none d-md-block">Conteúdo desktop</div>

<!-- Visivel apenas em telas pequenas -->
<div class="d-md-none">Conteúdo mobile</div>
```

---

## Artigos relacionados:
* **[[css/Bootstrap - Introducao|Bootstrap: Introducao]]**
* **[[css/Bootstrap - Sistema de Grid|Bootstrap: Sistema de Grid]]**
* **[[css/Flexbox|Flexbox]]**
