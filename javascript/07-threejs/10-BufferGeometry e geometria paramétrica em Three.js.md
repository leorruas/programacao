# BufferGeometry e geometria paramétrica em Three.js

As geometrias prontas de Three.js resolvem muitos casos, mas cenas gráficas mais específicas exigem controlar vértices, índices, normais e atributos diretamente.

Este artigo aprofunda [[javascript/07-threejs/03-Geometria, material, mesh e luz|geometria, material, mesh e luz]] e prepara para [[javascript/07-threejs/11-InstancedMesh e desenho eficiente de muitas formas|InstancedMesh]] e [[javascript/07-threejs/12-Shaders, GLSL e materiais customizados|shaders e GLSL]].

---

## 1. O que BufferGeometry representa

Uma `BufferGeometry` é um conjunto de dados que descreve pontos e como esses pontos se conectam.

```javascript
const geometry = new THREE.BufferGeometry();
```

## 2. Atributo position

```javascript
const vertices = new Float32Array([
  -1, -1, 0,
   1, -1, 0,
   0,  1, 0
]);

geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
```

## 3. Índices evitam repetir vértices

```javascript
geometry.setIndex([0, 1, 2, 0, 2, 3]);
```

## 4. Normais

```javascript
geometry.computeVertexNormals();
```

## 5. Geometria paramétrica

Uma geometria paramétrica nasce de regras, não de coordenadas digitadas manualmente.

```javascript
const points = [];
const count = 64;
const radius = 2;

for (let i = 0; i < count; i += 1) {
  const angle = i / count * Math.PI * 2;
  points.push(new THREE.Vector3(
    Math.cos(angle) * radius,
    Math.sin(angle) * radius,
    0
  ));
}
```

## 6. Faixas entre pontos

Calcule direção, normal perpendicular e offsets laterais.

```javascript
const direction = end.clone().sub(start).normalize();
const normal = new THREE.Vector2(-direction.y, direction.x);
```

## 7. Junções

Junções exigem resolver a quina geometricamente. Para miter joins, use normais de entrada e saída, bissetriz e limite de miter.

## 8. Atualização dinâmica

```javascript
const position = geometry.attributes.position;
position.array[0] = newX;
position.needsUpdate = true;
position.setUsage(THREE.DynamicDrawUsage);
```

## 9. Quando usar BufferGeometry

Use quando a silhueta depende de junções específicas, a forma muda parametricamente ou você precisa compartilhar vértices entre segmentos.

## Resumo para memorizar

`BufferGeometry` é a camada em que você controla diretamente os dados geométricos. `position` define vértices, índices definem triângulos, normais influenciam iluminação e atributos podem ser atualizados sem recriar a malha.

Para formas gráficas complexas, pense parametricamente e corrija topologia na geometria antes de tentar esconder defeitos com renderização.