# Hooks principais no React: useState, useRef e useMemo - método Feynman

No [[react/Introdução ao React|React]], os **Hooks** são funções especiais que permitem que componentes funcionais (que são apenas funções JS puras) tenham "superpoderes". Eles permitem gerenciar ciclos de vida, persistir dados, acessar elementos diretamente e otimizar a performance.

Seguindo a nossa analogia ecológica, os Hooks são como as **Ferramentas de Sobrevivência e Adaptação** que cada criatura (componente) usa para se adaptar ao clima do ecossistema.

---

## 1. Estado (`useState`): O Metabolismo Interno

O **Estado** é o coração da reatividade no React. Ele guarda informações que podem mudar ao longo do tempo (como se um menu está aberto, o texto de um campo de busca ou itens no carrinho).

*   **A Analogia:** É o **Metabolismo** de um animal. Se a temperatura do corpo muda (o estado muda), o corpo reage fisicamente para se adaptar (o React renderiza novamente o componente na tela).
*   **Comportamento:** Sempre que você atualiza o estado usando a função modificadora, o React reconstrói o componente na tela com o novo valor.

```jsx
import { useState } from 'react';

function Contador() {
  // valor inicial = 0
  // 'contador' é o valor atual, 'setContador' é a função para alterar esse valor
  const [contador, setContador] = useState(0);

  return (
    <button onClick={() => setContador(contador + 1)}>
      Cliques: {contador}
    </button>
  );
}
```

### ⚠️ Por que você NÃO deve abusar do `useState`?

Embora o `useState` seja fundamental, usá-lo em excesso ou de forma errada é um dos principais motivos de lentidão e bugs em aplicações React. Eis os porquês:

1. **Re-renderizações Excessivas (Desempenho):** Toda vez que um estado é alterado, o React reconstrói o componente inteiro e todos os seus componentes filhos. Se você tem muitos estados mudando a cada milissegundo, a tela vai travar.
2. **Estado Derivado Redundante:** Um erro comum é criar estados para coisas que podem ser calculadas diretamente na renderização.
   * *Errado:* Guardar `nome`, `sobrenome` e `nomeCompleto` em três estados diferentes.
   * *Certo:* Guardar apenas `nome` e `sobrenome` em estados. O `nomeCompleto` deve ser apenas uma variável comum: `const nomeCompleto = `${nome} ${sobrenome}`;`.
3. **Complexidade de Sincronização ("Spaghetti State"):** Se um componente tem 10 `useState` diferentes que dependem uns dos outros, fica muito difícil rastrear bugs. Nesses casos, prefira agrupar os dados em um único objeto de estado ou usar o hook `useReducer`.

---

## 2. Refs (`useRef`): O Apontador Laser para o DOM

Como vimos anteriormente, no React nós evitamos usar seletores diretos como `querySelector`. Em vez disso, usamos o **`useRef`**. Ele cria uma referência persistente a um elemento HTML real ou a um valor que não deve resetar.

*   **A Analogia:** É um **Apontador Laser**. Em vez de procurar no shopping inteiro por uma caixa (usando `querySelector`), você apenas aponta o laser diretamente para ela (`ref`).
*   **Comportamento Diferencial:** Alterar o valor de um `useRef` **NÃO faz o componente renderizar novamente na tela**. Ele serve para:
    1. Apontar e interagir diretamente com uma tag HTML real (focar inputs, dar play em vídeos).
    2. Guardar dados silenciosamente na memória (como IDs de timers) sem mexer no visual.

```jsx
import { useRef } from 'react';

function CampoDeTexto() {
  const inputRef = useRef(null); // Cria o laser apontando para o vazio

  const focarCampo = () => {
    // Acessa a tag HTML real diretamente em '.current'
    inputRef.current.focus(); 
  };

  return (
    <div>
      {/* Conecta a tag ao laser */}
      <input ref={inputRef} type="text" placeholder="Digite algo..." />
      <button onClick={focarCampo}>Focar no Input</button>
    </div>
  );
}
```

---

## 3. Memo (`useMemo` e `useCallback`): A Memória Cache

Quando o estado de um componente muda, o React roda toda a função do componente novamente. Se você tem cálculos matemáticos pesados ou formatação de dados complexa lá dentro, refazer isso a cada clique pode travar a aplicação.

*   **A Analogia:** É um **Caderno de Anotações**. Em vez de refazer uma conta de matemática gigante toda vez que alguém te pergunta o resultado, você faz uma vez, anota no caderno (`useMemo`) e apenas lê o resultado anotado dali em diante.
*   **Comportamento:** Ele guarda o resultado de uma computação na memória e só recalcula se um dos dados de entrada (suas dependências) mudar.

```jsx
import { useMemo, useState } from 'react';

function ListaFiltrada({ produtos }) {
  const [busca, setBusca] = useState('');

  // Só recalcula a busca se a lista 'produtos' ou o termo 'busca' mudar!
  const produtosFiltrados = useMemo(() => {
    console.log('Filtrando produtos pesadamente...');
    return produtos.filter(p => p.nome.includes(busca));
  }, [produtos, busca]); // Array de dependências

  return (
    <input value={busca} onChange={(e) => setBusca(e.target.value)} />
  );
}
```

---

## 4. O outro hook essencial: `useEffect` (O Sensor de Estímulos)

O hook que completa o grupo principal do React é o **`useEffect`**. Ele serve para lidar com **Efeitos Colaterais** (coisas que acontecem fora do fluxo puro do React, como buscar dados de um servidor, registrar eventos do teclado ou sincronizar com o banco de dados).

*   **A Analogia:** É o **Sensor de Estímulos de Clima**. Quando chove no ecossistema (um dado muda), o sensor dispara uma reação ecológica (uma função).
*   **Comportamento:** Executa uma função sempre que o componente aparece na tela pela primeira vez ou quando certas variáveis mudam.

```jsx
import { useEffect, useState } from 'react';

function PrevisaoTempo() {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    // Isso roda apenas UMA vez quando o componente aparece na tela (array de dependências vazio [])
    fetch('https://api.tempo.com/hoje')
      .then(res => res.json())
      .then(dados => setDados(dados));
  }, []); 

  return <div>{dados ? dados.temperatura : 'Carregando...'}</div>;
}
```

---

## Resumo Comparativo para Designers

| Hook | O que controla? | Causa Re-renderização? | Analogia |
| :--- | :--- | :--- | :--- |
| **`useState`** | Dados visuais e interativos | **Sim** | Metabolismo do corpo |
| **`useRef`** | Acesso ao HTML real e dados silenciosos | **Não** | Apontador Laser direto |
| **`useMemo`** | Cache de cálculos pesados de performance | **Não** (apenas armazena) | Caderno de anotações com respostas |
| **`useEffect`** | Ações externas e sincronização (APIs, eventos) | Depende (se ele alterar um estado) | Sensor de estímulos externos |
