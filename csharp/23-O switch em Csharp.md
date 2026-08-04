# O switch em Csharp (Escolha múltipla)
#csharp

Quando precisamos que o computador escolha um caminho entre várias opções possíveis, usar muitos blocos de "se" (if) e "senão se" (else if) deixa o nosso código confuso e cansativo de ler. 

Para resolver isso, o Csharp nos dá uma ferramenta chamada **switch**.

---

## 1. A Analogia do Painel do Elevador

Imagine que você entra no elevador de um prédio de 5 andares. Se você quer ir para o 3o andar, você não pergunta andar por andar: "Este é o andar 1? Não. Este é o andar 2? No...". Você simplesmente olha para o painel de botões, aperta o botão "3" e o elevador vai diretamente para lá.

O `switch` funciona exatamente como esse painel de botões do elevador. Em vez de testar várias condições uma por uma, o computador olha para o valor que você escolheu e vai direto para a ação correspondente.

---

## 2. O switch clássico (switch-case)

Veja como escrevemos esse painel de controle no código:

```csharp
int andarEscolhido = 3;

switch (andarEscolhido)
{
    case 1:
        Console.WriteLine("Você chegou ao Primeiro Andar: Recepção.");
        break;

    case 2:
        Console.WriteLine("Você chegou ao Segundo Andar: Escritórios.");
        break;

    case 3:
        Console.WriteLine("Você chegou ao Terceiro Andar: Praça de Alimentação.");
        break;

    default:
        Console.WriteLine("Esse andar não existe no painel!");
        break;
}
// Saída no terminal: Você chegou ao Terceiro Andar: Praça de Alimentação.
```

### O que significa cada palavra técnica?

* **switch (andarEscolhido):** Diz para o computador iniciar a avaliação da variável andarEscolhido.
* **case 3:** É o mesmo que dizer "Caso o botão apertado seja o 3, faça isso".
* **break;** Significa "Parar". Ele avisa ao computador que a tarefa daquele andar acabou e que ele deve sair do elevador (fechar o bloco switch). Se você esquecer de colocar o break, o Csharp não deixará o programa compilar para evitar que você execute ações de outros andares por engano.
* **default:** É o botão de emergência ou ação padrão. Ele só é executado se o número digitado não bater com nenhum dos casos listados anteriormente (funciona igual ao "else" no fim de um bloco condicional).

---

## 3. O Express (Switch Expressions)

A partir do Csharp 8, a Microsoft criou um atalho para deixar o switch ainda mais curto e limpo quando a nossa única intenção é devolver uma resposta baseada na escolha. Chamamos isso de **Switch Expressions** (Expressões Switch).

Imagine que você quer apenas traduzir a sigla do estado para o nome completo:

```csharp
string sigla = "MG";

string estado = sigla switch
{
    "SP" => "São Paulo",
    "RJ" => "Rio de Janeiro",
    "MG" => "Minas Gerais",
    _ => "Outro Estado" // O sublinhado "_" funciona como o "default"
};

Console.WriteLine(estado);
// Saída no terminal: Minas Gerais
```

### Por que usar essa versão curta?
* Não precisamos escrever as palavras `case`, `break` ou usar chaves para cada bloco.
* Usamos a seta `=>` para dizer "se for essa entrada, entregue esse resultado".
* Usamos o caractere `_` (descarte) para representar a opção padrão quando nada coincide com as anteriores.

---

## 4. Quando usar switch e quando usar if-else?

Use o **switch** quando você tiver uma única variável e quiser comparar ela com vários valores exatos (como números, textos ou opções de um menu).

Use o **if-else** quando precisar testar condições mais complexas ou intervalos de números (como checar se a idade é maior ou igual a 18, ou se um número está entre 10 e 20).

---

## Artigos relacionados:
* **[[05-Estruturas condicionais e de repetição|Estruturas condicionais e de repetição]]**
* **[[06-Estruturas de repetição (for e while)|Estruturas de repetição (for, foreach e while)]]**
