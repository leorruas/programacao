# Guia de estudos de JavaScript - trilha Feynman para designers

Este guia organiza todas as notas do seu vault em uma **sequência lógica de leitura**, permitindo que você aprenda [[javascript/Introdução ao JavaScript\|JavaScript]] passo a passo usando analogias visuais baseadas no Figma e na sua mentalidade de Designer.

---

## Mapa de leitura

```mermaid
flowchart TD
    F1["Fase 1: Fundamentos"] --> F2["Fase 2: Componentização"]
    F2 --> F3["Fase 3: Design System (POO)"]
    F3 --> F4["Fase 4: Interface e Navegador (DOM)"]
    F4 --> F5["Fase 5: JS Avançado & Debug"]
    F5 --> F6["Fase 6: APIs & Assincronismo"]
    F6 --> F7["Fase 7: TypeScript"]
```

---

## Sequência de leitura das notas

### Fase 1: os fundamentos primitivos (o "Figma básico")
Nesta fase, você vai aprender a guardar informações e entender como o computador faz cálculos e toma decisões.
1. [[javascript/Introdução ao JavaScript|Introdução ao JavaScript]] - A visão geral do que é a linguagem.
2. [[javascript/01-fundamentos/Var, let e const|Var, Let e Const]] - Como funcionam os "estilos de cores/textos" do código para reutilizar valores.
3. [[javascript/01-fundamentos/Console.log]] - A telemetria do seu código (painel de instrumentos).
4. [[javascript/01-fundamentos/Tipos de dados]] - Os inputs permitidos (Strings, Numbers, Booleanos, Symbols).
5. [[javascript/03-manipulacao/Template strings|Template Strings]] - A criação de textos dinâmicos de maneira simples (como Text Variables).
6. [[javascript/01-fundamentos/Operadores e operações|Operadores e Operações]] - Fazendo contas de layout e testes lógicos (se A for verdade, faça B).
7. [[javascript/01-fundamentos/Condicionais (if-else)|Condicionais (If-Else)]] - A tomada de decisões no código (regras condicionais de receitas).
8. [[javascript/01-fundamentos/Switch]] - O desvio de fluxo em canais de triagem (braços mecânicos e desvios).
9. [[javascript/01-fundamentos/Truthy e falsy|Truthy e Falsy]] - A triagem burocrática dos valores equivalentes a verdadeiro e falso.
10. [[javascript/01-fundamentos/Hoisting]] - Como a ordem de leitura do [[javascript/Introdução ao JavaScript\|JavaScript]] funciona.

---

### Fase 2: componentização básica (criando elementos reutilizáveis)
Começando a agrupar propriedades e a automatizar comportamentos e modificações de dados.
11. [[javascript/02-funcoes-e-objetos/Funções]] - Suas ações interativas (o motor das suas interações).
12. [[javascript/02-funcoes-e-objetos/Arrow functions|Arrow Functions]] - A escrita moderna e simplificada (o freelancer terceirizado).
13. [[javascript/02-funcoes-e-objetos/Objetos]] - A ficha de especificações (propriedades) de um componente.
14. [[javascript/03-manipulacao/Arrays e métodos de array|Arrays e métodos de array]] - Como alterar propriedades de vários itens de uma vez (Map e Filter).

---

### Fase 3: organização avançada (o design system - poo)
Como organizar o código usando o paradigma mais forte do desenvolvimento, baseado em modelos e instâncias de componentes.
15. [[javascript/02-funcoes-e-objetos/Funções construtoras|Funções Construtoras]] - A maneira clássica de criar moldes de [[javascript/02-funcoes-e-objetos/Objetos\|Objetos]].
16. [[javascript/02-funcoes-e-objetos/Classes]] - O equivalente moderno aos Componentes Master no Figma.
17. [[javascript/02-funcoes-e-objetos/Get e set|Get e Set]] - Controlando e travando propriedades de componentes.
18. [[javascript/06-arquitetura-e-avancado/Programação orientada a objetos]] - O ecossistema completo e seus 4 pilares explicados.

---

### Fase 4: o navegador e interatividade (tornando o protótipo vivo)
Hora de conectar a lógica do [[javascript/Introdução ao JavaScript\|JavaScript]] com elementos visuais da tela de um site real.
19. [[javascript/04-dom-e-browser/DOM]] - A árvore de camadas (Layers panel) da sua interface web.
20. [[javascript/04-dom-e-browser/O objeto window|O objeto window]] - O complexo de janelas do navegador (métodos e escopo global).
21. [[javascript/06-arquitetura-e-avancado/Node.js]] - A anatomia de cada camada individual do site.
22. [[javascript/04-dom-e-browser/Eventos]] - Triggers de prototipagem (On Click, On Hover) capturados por Event Listeners.
23. [[javascript/04-dom-e-browser/O console do navegador|O console do navegador]] - A central de comando em tempo real para executar código e alterar páginas ao vivo.
24. [[javascript/04-dom-e-browser/Animações com scroll|Animações com Scroll]] - Efeitos visuais disparados pelo movimento de rolagem da página (como Intersection Observer e Parallax).

---

### Fase 5: js avançado & resolução de problemas
Como o [[javascript/06-arquitetura-e-avancado/Escopo e closures\|Escopo e Closures]] protege as variáveis, atalhos de código para agilizar a criação, e como consertar erros.
25. [[javascript/06-arquitetura-e-avancado/Escopo e closures]] - Onde as variáveis podem ou não ser vistas.
26. [[javascript/06-arquitetura-e-avancado/Desestruturação e spread]] - Atalhos rápidos para destrinchar e duplicar [[javascript/02-funcoes-e-objetos/Objetos\|Objetos]]/arrays.
27. [[javascript/03-manipulacao/Regex]] - Os filtros inteligentes de texto (gabarito e descriptografia).
28. [[javascript/06-arquitetura-e-avancado/Módulos import e export]] - Como quebrar o código em múltiplos arquivos e componentes separados.
29. [[javascript/01-fundamentos/Debug (depuração)|Debug (Depuração)]] - O modo de inspeção frame a frame para arrumar o que quebrou.
30. [[javascript/06-arquitetura-e-avancado/Tratamento de erros]] - Mecanismos de segurança para o site não cair se algo der errado.

---

### Fase 6: APIs e assincronismo (integrações reais de dados)
Como carregar dados dinâmicos da internet (como a previsão do tempo ou lista de produtos) sem travar a tela do usuário.
31. [[javascript/03-manipulacao/JSON]] - O formato padrão universal de transporte de textos e dados.
32. [[javascript/05-assincrono/API]] - A ponte de comunicação com serviços externos.
33. [[javascript/05-assincrono/Fetch]] - O carteiro do JS que vai buscar as informações das [[javascript/05-assincrono/API\|API]].
34. [[javascript/05-assincrono/Async await|Async Await]] - Lógica assíncrona ("espere carregar antes de mostrar").
35. [[javascript/06-arquitetura-e-avancado/Event loop e call stack]] - Como o JS gerencia essa fila de tarefas paralelas.
36. [[javascript/04-dom-e-browser/Local storage|Local Storage]] - Salvando dados no navegador do usuário (como preferência de Tema Escuro).

---

### Fase 7: segurança de tipo no front-end
O próximo passo lógico para criar projetos consistentes e sem bugs de desenvolvimento.
37. [[javascript/06-arquitetura-e-avancado/TypeScript introdução]] - O "design system rígido" que impede você de usar componentes de forma errada no código.
