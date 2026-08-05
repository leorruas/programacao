# Tipos abstratos de dados (TAD)
#csharp

Imagine que você comprou um **controle remoto de televisão**. 

O controle remoto tem botões para:
1. Mudar de canal (`CanalMais`, `CanalMenos`).
2. Ajustar o volume (`VolumeMais`, `VolumeMenos`).
3. Ligar e desligar (`Ligar`).

Você não precisa saber como os chips de silício, fios e ondas de infravermelho funcionam por dentro do controle para conseguir mudar de canal. Você só precisa saber **o que cada botão faz**.

Isso é exatamente o que chamamos de **Tipo Abstrato de Dados (TAD)**!

---

## 1. O que é um TAD?

Um **Tipo Abstrato de Dados (TAD)** é um conceito teórico. Ele é a descrição de uma estrutura de dados focando apenas em **o que ela faz** (seus botões e [[12-Métodos (funções)|funções]] públicas) e **o que ela guarda**, e ignorando completamente **como ela faz** por baixo dos panos (a fiação elétrica interna).

No C#, nós criamos e representamos TADs usando **[[13-Programação orientada a objetos|Classes]]** (com seus [[12-Métodos (funções)|métodos]] públicos) ou **[[16-Herança e interfaces|Interfaces]]** (que são literalmente contratos/listas de botões sem nenhuma fiação dentro).

---

## 2. Três exemplos clássicos de TADs

Existem estruturas de dados teóricas famosas na computação que representam TADs:

### A. Fila (Queue)
* **Como funciona:** O primeiro que entra é o primeiro que sai (FIFO - *First In, First Out*).
* **Analogia:** Uma **fila de banco**. O cliente que chegou primeiro é atendido e vai embora primeiro. Quem chega por último vai para o fim da fila.
* **Operações do TAD:** `Enfileirar` (entrar na fila) e `Desenfileirar` (sair da fila).

### B. Pilha (Stack)
* **Como funciona:** O último que entra é o primeiro que sai (LIFO - *Last In, First Out*).
* **Analogia:** Uma **[[11-Lista, pilha e fila|pilha]] de pratos para lavar**. Você só consegue pegar o prato que está no topo (o último que foi colocado lá). Se tentar pegar o de baixo, a [[11-Lista, pilha e fila|pilha]] cai e quebra.
* **Operações do TAD:** `Empilhar` (colocar no topo) e `Desempilhar` (tirar do topo).

### C. Dicionário (Map / Dictionary)
* **Como funciona:** Associa uma chave de busca a um valor.
* **Analogia:** Um **armário de guarda-volumes**. Você guarda a mochila (Valor) na portinha e fica com a chave número 5 (Chave).
* **Operações do TAD:** `Adicionar` (guardar usando chave) e `Obter` (recuperar usando chave).

---

## 3. Qual a diferença entre TAD e Estrutura de dados?

Muitas pessoas confundem esses dois nomes, mas a diferença é simples:
* **TAD (A ideia / A casca):** É o desenho do controle remoto. Diz que ele tem os botões de volume e canal. É abstrato.
* **Estrutura de dados (A implementação real / A fiação):** É o circuito físico dentro do controle que faz a luz infravermelha acender. É o código C# real rodando na máquina.

Você pode implementar o TAD **Pilha** usando um [[07-Arrays em Csharp.md|Array]] fixo por baixo dos panos, ou usando uma [[09-Coleções em Csharp.md|Lista elástica]]. A ideia da pilha (só tirar do topo) continua a mesma, não importa a fiação escolhida!

---

## Artigos relacionados:
* **[[01-Introdução ao Csharp.md|Introdução ao Csharp]]**
* **[[09-Coleções em Csharp.md|Coleções em Csharp]]**
* **[[13-Programação orientada a objetos|Programação orientada a objetos]]**
