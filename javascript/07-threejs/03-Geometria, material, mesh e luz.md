# Geometria, material, mesh e luz

Em [[javascript/07-threejs/02-Cena, câmera, renderer e coordenadas|Cena, câmera, renderer e coordenadas]], a preocupação principal era onde os objetos existem e como a câmera os observa. Agora a pergunta muda para: **do que um objeto visual é feito?**

Em Three.js, a separação mais importante é:

**Geometry + Material = Mesh**

A luz entra depois, porque alguns materiais precisam dela para revelar sua aparência.

---

## 1. Geometria é a forma

A geometria descreve vértices, faces e atributos que formam um objeto.

```javascript
const geometry = new THREE.BoxGeometry(2, 1, 0.2);
```

Outras geometrias prontas incluem:

```javascript
new THREE.SphereGeometry(1, 32, 16);
new THREE.PlaneGeometry(4, 3);
new THREE.CylinderGeometry(1, 1, 2, 32);
new THREE.TorusGeometry(1, 0.15, 16, 100);
```

A geometria responde principalmente: **qual é a estrutura da forma?**

---

## 2. Material é a aparência da superfície

Um material define como a superfície será desenhada.

O mais simples é `MeshBasicMaterial`:

```javascript
const material = new THREE.MeshBasicMaterial({
  color: 0x111111
});
```

Ele não depende de luz. Isso o torna ótimo para depuração e objetos gráficos planos.

Um material mais físico é `MeshStandardMaterial`:

```javascript
const material = new THREE.MeshStandardMaterial({
  color: 0xd9d9d9,
  roughness: 0.65,
  metalness: 0.05
});
```

Esse material reage à iluminação.

Dois controles importantes:

* `roughness`: quão fosca ou polida parece a superfície;
* `metalness`: quanto o material se comporta como metal.

Eles não são apenas "efeitos". Mudam como a luz participa da leitura formal do objeto.

---

## 3. Mesh junta forma e superfície

```javascript
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

O `Mesh` é um `Object3D`, então também possui:

```javascript
mesh.position;
mesh.rotation;
mesh.scale;
```

Você pode reutilizar uma geometria ou um material em vários meshes.

```javascript
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

const a = new THREE.Mesh(geometry, material);
const b = new THREE.Mesh(geometry, material);

b.position.x = 2;

scene.add(a, b);
```

Isso é parecido com componentes compartilhando uma base visual.

---

## 4. Luz não é sempre obrigatória

Este material aparece sem luz:

```javascript
new THREE.MeshBasicMaterial({ color: 0xff0000 });
```

Este depende de luz:

```javascript
new THREE.MeshStandardMaterial({ color: 0xff0000 });
```

Se você trocar de `MeshBasicMaterial` para `MeshStandardMaterial` e o objeto ficar preto, a primeira hipótese deve ser iluminação.

---

## 5. AmbientLight

A luz ambiente afeta tudo de forma uniforme:

```javascript
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);
```

Ela é útil para impedir sombras totalmente fechadas, mas sozinha costuma achatar a forma porque não cria direção clara.

---

## 6. DirectionalLight

Uma luz direcional funciona como uma fonte distante:

```javascript
const keyLight = new THREE.DirectionalLight(0xffffff, 2);
keyLight.position.set(4, 5, 6);
scene.add(keyLight);
```

Para objetos editoriais e composições abstratas, uma combinação simples pode funcionar muito bem:

```javascript
scene.add(new THREE.AmbientLight(0xffffff, 0.8));

const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
keyLight.position.set(4, 6, 5);
scene.add(keyLight);
```

Adicionar cinco luzes antes de entender uma geralmente dificulta o diagnóstico.

---

## 7. Wireframe não é uma geometria diferente

Você pode transformar um material em wireframe:

```javascript
const material = new THREE.MeshBasicMaterial({
  color: 0x111111,
  wireframe: true
});
```

O objeto continua usando a mesma geometria. Mudou a forma de representá-la.

Isso é útil para entender por que algumas cenas "3D" parecem apenas demos técnicas: wireframe, grid e partículas são recursos visuais fortes, mas não criam uma direção de arte por conta própria.

---

## 8. Transparência exige cuidado

```javascript
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.35
});
```

Superfícies transparentes sobrepostas podem gerar problemas de ordenação e leitura. Quanto mais camadas transparentes você adiciona, mais importante fica testar o resultado real.

Para uma linguagem visual de planos e estruturas, vale começar com poucas superfícies e opacidades controladas.

---

## 9. Groups

Vários objetos podem ser agrupados:

```javascript
const group = new THREE.Group();

group.add(panelA);
group.add(panelB);
group.add(panelC);

scene.add(group);
```

Agora você pode transformar o grupo inteiro:

```javascript
group.rotation.y = Math.PI / 6;
group.position.x = 1;
```

Essa ideia é importante para composições de design. Em vez de animar cinquenta objetos individualmente, você pode organizar níveis de transformação.

---

## 10. Exemplo completo e integrado

```javascript
import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf5f5f5);

const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(4, 3, 8);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

const material = new THREE.MeshStandardMaterial({
  color: 0xe7e7e7,
  roughness: 0.7,
  metalness: 0.05
});

const group = new THREE.Group();

for (let i = 0; i < 4; i += 1) {
  const geometry = new THREE.BoxGeometry(1.4, 1.4, 0.12);
  const panel = new THREE.Mesh(geometry, material);

  panel.position.x = (i - 1.5) * 1.55;
  panel.position.z = i * -0.25;
  panel.rotation.y = i * 0.08;

  group.add(panel);
}

scene.add(group);

const ambient = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambient);

const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
keyLight.position.set(4, 5, 6);
scene.add(keyLight);

renderer.render(scene, camera);
```

Esse exemplo já permite experimentar uma linguagem visual de camadas sem adicionar partículas, pós-processamento ou animação.

---

## Fontes principais

* [Three.js materials](https://threejs.org/manual/en/materials.html)
* [Three.js lights](https://threejs.org/manual/en/lights.html)
* [Mesh](https://threejs.org/docs/#Mesh)
* [MeshStandardMaterial](https://threejs.org/docs/#MeshStandardMaterial)

---

## Resumo para memorizar

**Geometry** define a forma. **Material** define como a superfície é desenhada. **Mesh** junta os dois em um objeto renderizável. Materiais como `MeshStandardMaterial` precisam de **luz**. Para aprender e dirigir uma cena, comece com poucos materiais e poucas luzes antes de acrescentar complexidade.