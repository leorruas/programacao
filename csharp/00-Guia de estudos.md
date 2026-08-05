# Guia de Estudos de Csharp
#csharp

Aprender programação é como construir uma torre de blocos de montar. Você não pode colocar o teto antes de erguer as paredes e fazer uma boa base no chão. 

Para ajudar você a aprender C# de forma sólida e sem se perder, aqui está o mapa de estudos ideal, organizado na sequência lógica do básico ao avançado com os links de todas as notas do seu vault!

---

## Passo 1: A base da torre (Fundamentos & E/S)

Aqui você aprende a conversar com o computador, ler e exibir mensagens e guardar informações na memória.

1. **[[01-Introdução ao Csharp|01 - Introdução ao Csharp]]:** Entenda de onde veio a linguagem, para que serve (jogos, aplicativos, empresas) e como é a estrutura inicial de um programa.
2. **[[02-O método Main|02 - O método Main]]:** Entenda a "porta da frente" clássica por onde o computador entra para rodar o seu código.
3. **[[03-Console.Write e Console.WriteLine|03 - Console.Write e Console.WriteLine]]:** Compreenda a diferença prática entre exibir dados pulando linha ou mantendo o cursor na mesma linha para interações de terminal.
4. **[[04-Variáveis, operadores e tipos de dados|04 - Variáveis, operadores e tipos de dados]]:** Aprenda sobre as caixas organizadoras de dados (inteiros, decimais, palavras) e como fazer contas básicas com elas.
5. **[[05-Segurança de tipos|05 - Segurança de tipos]]:** Descubra por que o C# é tão protetor e exige regras rígidas sobre o que guardar em cada caixa.
6. **[[06-Métodos de string (ToUpper e ToLower)|06 - Métodos de string (ToUpper e ToLower)]]:** Aprenda como converter textos em maiúsculas ou minúsculas e o conceito fundamental de imutabilidade de strings.

**Projeto Prático Recomendado:** [[[Csharp] • Projeto 1 - O Assistente de Terminal|Projeto 1 - O Assistente de Terminal]]

---

## Passo 2: O controle do robô (Decisões e Loops)

Aqui você ensina o programa a tomar decisões, escolher caminhos e fazer tarefas repetitivas.

1. **[[07-Estruturas condicionais e de repetição|07 - Estruturas condicionais e de repetição]]:** Aprenda a usar o GPS do código (`if`/`else`) para fazer escolhas.
2. **[[08-O switch em Csharp|08 - O switch em Csharp]]:** Aprenda como tomar decisões de múltipla escolha com a analogia do painel de elevador e a sintaxe moderna das Switch Expressions.
3. **[[09-Estruturas de repetição (for e while)|09 - Estruturas de repetição (for e while)]]:** Aprofunde-se nos loops de contagem (`for`) e loops baseados em regras (`while`).
4. **[[10-O loop do-while em Csharp|10 - O loop do-while em Csharp]]:** Aprenda como garantir que um bloco de código rode pelo menos uma vez (analogia do fliperama).
5. **[[11-O loop foreach em Csharp|11 - O loop foreach em Csharp]]:** Domine a estrutura de leitura de coleções mais limpa e segura do C# (analogia da esteira de produção).

**Projeto Prático Recomendado:** [[[Csharp] • Projeto 2 - O Jogo de Adivinhação|Projeto 2 - O Jogo de Adivinhação]]

---

## Passo 3: Organizando gaveteiros (Arrays e Coleções)

Aqui você aprende a guardar e manipular grandes quantidades de dados agrupados.

1. **[[12-Arrays em Csharp|12 - Arrays em Csharp]]:** Saiba como criar gaveteiros de tamanho fixo na memória e evite o erro de estouro de índice (`IndexOutOfRangeException`).
2. **[[13-Métodos de arrays|13 - Métodos de arrays]]:** Sua caixa de ferramentas para ordenar (`Sort`), inverter (`Reverse`) e buscar dados em arrays.
3. **[[14-Coleções em Csharp|14 - Coleções em Csharp]]:** Conheça os gaveteiros flexíveis que esticam e encolhem sozinhos (`List<T>`, `Dictionary<K, V>` e `HashSet<T>`).
4. **[[15-Capacity em coleções|15 - Capacity em coleções]]:** Entenda a diferença de performance entre a quantidade de itens (`Count`) e a capacidade alocada na memória (`Capacity`).
5. **[[16-Tipos abstratos de dados|16 - Tipos abstratos de dados]]:** Introdução conceitual a Filas, Pilhas e Dicionários.
6. **[[17-Lista, pilha e fila|17 - Lista, pilha e fila]]:** Guia prático de implementação de estruturas de dados lineares.

**Projeto Prático Recomendado:** [[[Csharp] • Projeto 3 - O Gerenciador de Tarefas|Projeto 3 - O Gerenciador de Tarefas]]

---

## Passo 4: Estruturando o código (Funções, POO e Arquivos)

Aqui você aprende a organizar códigos maiores em módulos reaproveitáveis e modelar o mundo real.

1. **[[18-Métodos (funções)|18 - Métodos (funções)]]:** Crie comandos personalizados para automatizar ações repetitivas.
2. **[[19-Programação orientada a objetos|19 - Programação orientada a objetos]]:** Aprenda a usar fôrmas de bolo (classes) para criar objetos reais com propriedades e comportamentos.
3. **[[20-Herança e interfaces|20 - Herança e interfaces]]:** Evite duplicação de código usando classes pai e contratos reutilizáveis (interfaces).
4. **[[21-Tratamento de erros|21 - Tratamento de erros]]:** Crie redes de segurança com `try`, `catch` e `finally` para evitar travamentos.
5. **[[22-Manipulação de arquivos|22 - Manipulação de arquivos]]:** Aprenda a ler e escrever arquivos no disco com `System.IO`.
6. **[[23-LINQ buscas e filtros|23 - LINQ buscas e filtros]]:** Use a peneira inteligente do C# para filtrar, ordenar e transformar dados em poucas linhas.

**Projetos Práticos Recomendados:** 
* [[[Csharp] • Projeto 4 - O Simulador de Conta Bancária|Projeto 4 - O Simulador de Conta Bancária]]
* [[[Csharp] • Projeto 5 - O Diário Digital|Projeto 5 - O Diário Digital]]

---

## Passo 5: Conectando com a Web (Full Stack e APIs)

Aqui você cruza a ponte entre o C# no servidor e a Web.

1. **[[24-Csharp no Frontend e Backend|24 - Csharp no Frontend e Backend]]:** Entenda o ecossistema full stack do .NET com ASP.NET Core no servidor e Blazor no navegador.
2. **[[25-Consumindo APIs em Csharp|25 - Consumindo APIs em Csharp]]:** Como usar o `HttpClient` para conversar com serviços externos e deserializar JSON.
3. **[[26-Como conectar Csharp no HTML (Backend + Frontend JS)|26 - Como conectar Csharp no HTML (Backend + Frontend JS)]]:** O artigo integrador definitivo mostrando passo a passo como o C# (backend) se conecta com HTML, CSS e JavaScript (frontend) usando APIs REST e `fetch()`.
