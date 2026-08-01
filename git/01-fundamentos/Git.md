# Entendendo o Git - método Feynman

No desenvolvimento de software (como no nosso repositório de estudos de [[javascript/Introdução ao JavaScript\|JavaScript]]), arquivos de código mudam o tempo todo e são editados por várias pessoas simultaneamente.

O **Git** é um **Sistema de Controle de Versão**. Para um designer, ele é o equivalente profissional ao **Histórico de Versões (Version History)** do Figma, mas em esteroides.

---

## A analogia dos arquivos duplicados

Antes de existir controle de versão automática, designers e desenvolvedores salvavam seus arquivos assim:
*   `layout_site.psd`
*   `layout_site_final.psd`
*   `layout_site_final_v2_ajustes.psd`
*   `layout_site_final_aprovado_pelo_cliente.psd`

Isso gera bagunça, consome espaço e torna impossível saber o que mudou exatamente de um arquivo para o outro.

O Git resolve isso de forma elegante. Em vez de duplicar a pasta do seu projeto, o Git monitora o seu projeto e salva apenas as alterações linha por linha. Você mantém um único arquivo ou pasta física, mas consegue viajar no tempo para qualquer versão anterior sempre que precisar.

---

## Os três conceitos básicos do Git

Para usar o Git no dia a dia, você precisa entender três pilares fundamentais:

### 1. Commit (o ponto de restauração)
Um commit é como tirar uma foto (snapshot) do estado atual do seu projeto e dar um nome a ela. 

No Figma, seria o equivalente a ir no histórico de versão e clicar em "Name this version" para salvar um momento importante do seu design. Cada commit vem com uma mensagem explicativa (ex: "Ajuste na cor do botão primário").

### 2. Branch (o espaço de trabalho paralelo)
Uma branch (ramificação) permite que você trabalhe em uma cópia paralela do projeto sem alterar a versão principal que está funcionando.

No Figma, isso equivale exatamente à funcionalidade de **Branches** (disponível nos planos corporativos). Você duplica o arquivo original para testar uma nova ideia de layout sem correr o risco de estragar o design atual. Se a nova ideia der errado, você apenas descarta a branch.

### 3. Merge (a fusão de alterações)
Depois de testar suas alterações em uma branch e garantir que tudo funciona, você faz um **Merge** (fusão). 

Isso significa juntar as suas alterações da branch de testes de volta para a branch principal (geralmente chamada de `main` ou `master`), unindo o trabalho de forma limpa.

---

## Git vs. GitHub (a diferença comum)

É muito comum confundir Git com GitHub, mas eles são ferramentas diferentes:

*   **Git (A ferramenta local):** É o software instalado no seu computador que rastreia as alterações e cria o histórico localmente. Ele roda inteiramente no seu terminal de comando.
*   **GitHub (A nuvem):** É uma rede social e serviço de hospedagem na nuvem onde você envia o histórico do seu Git. Pense no GitHub como o **Figma Cloud / Creative Cloud**. O Git gerencia o arquivo na sua máquina, e o GitHub guarda esse arquivo online para que outros desenvolvedores possam baixar, colaborar e revisar o código.

---

## Resumo para memorizar

*   **Git:** Ferramenta que gerencia o histórico de alterações dos seus arquivos sem precisar duplicá-los.
*   **Commit:** Um registro permanente das alterações salvas com uma mensagem explicativa.
*   **Branch:** Uma ramificação segura para criar novas [[javascript/01-fundamentos/Funções\|Funções]] sem quebrar o código principal.
*   **Merge:** A ação de combinar as novidades de uma branch de volta para a principal.
*   **GitHub:** O servidor na nuvem usado para guardar e compartilhar os repositórios Git.
