# Programação Orientada a Objetos (Classes, Objetos e Construtores) em C#

A **Programação Orientada a Objetos** (POO) é apenas uma forma de programar que tenta imitar a vida real. Na vida real, o mundo é cheio de objetos físicos: carros, cachorros, pessoas e celulares.

Cada um desses objetos tem:
1. **Características** (Atributos/Propriedades): Cores, marcas, tamanhos.
2. **Ações** (Comportamentos/[Métodos](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/M%C3%A9todos%20(Fun%C3%A7%C3%B5es).md)): Ligar, correr, latir.

---

## 1. O que é uma Classe e um Objeto?

* **Classe (O Molde):** Pense na classe como uma **planta arquitetônica** ou uma **fôrma de bolo**. A fôrma de bolo não é o bolo em si, ela apenas define o formato e o tamanho que o bolo terá.
* **Objeto (O Bolo real):** É o bolo de verdade feito a partir da fôrma. Em programação, dizemos que criamos uma **instância** da classe.

### Exemplo no código:
```csharp
// 1. Criamos a Classe (o molde/fôrma)
class Celular
{
    // Características (Propriedades)
    public string marca;
    public string modelo;

    // Ações (Métodos)
    public void Ligar()
    {
        Console.WriteLine("O celular está ligando...");
    }
}
```

Para usar essa classe e criar celulares de verdade (objetos):
```csharp
// Criamos dois objetos reais a partir da mesma classe 'Celular'
Celular celularDoLeo = new Celular();
celularDoLeo.marca = "Apple";
celularDoLeo.modelo = "iPhone 15";

Celular celularDaMaria = new Celular();
celularDaMaria.marca = "Samsung";
celularDaMaria.modelo = "Galaxy S23";

// Cada um pode realizar ações independentes
celularDoLeo.Ligar();
```

---

## 2. O que é um Construtor?

O **Construtor** é um método especial que é executado **automaticamente** no momento exato em que criamos o objeto (quando usamos a palavra-chave `new`). 
Ele serve para preparar o objeto e garantir que ele comece com as informações básicas já preenchidas (ex: todo celular novo precisa de uma marca e um modelo ao sair da fábrica).

```csharp
class Celular
{
    public string marca;
    public string modelo;

    // Este é o Construtor! Tem o mesmo nome da Classe e não tem tipo de retorno.
    public Celular(string marcaInicial, string modeloInicial)
    {
        marca = marcaInicial;
        modelo = modeloInicial;
    }
}
```

Agora, ao criar um novo celular, somos obrigados a passar os dados iniciais exigidos pelo construtor:

```csharp
// Muito mais simples! Criamos e configuramos em uma única linha
Celular meuCelular = new Celular("Apple", "iPhone 15");
```

---

## Artigos Relacionados:
* **[Introdução ao C#](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/Introducao.md)**
* **[Métodos (Funções)](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/M%C3%A9todos%20(Fun%C3%A7%C3%B5es).md)**
* **[Segurança de Tipos](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/Seguran%C3%A7a%20de%20Tipos.md)**
* **[Variáveis, Operadores e Tipos de Dados](file:///Users/leoruas/Library/Mobile%20Documents/iCloud~md~obsidian/Documents/programac%CC%A7a%CC%83o/csharp/Vari%C3%A1veis,%20Operadores%20e%20Tipos%20de%20Dados.md)**
