## Método de resolución: optimización de `clientesRecurrentes`

1. **Entender:**
   * *Entradas:* un arreglo `ventas` donde cada elemento tiene al menos `cliente` (y `cantidad`, `precio`, `ciudad`, etc.).
   * *Salida:* un arreglo con los identificadores de clientes que aparecen más de una vez (sin repetir clientes en el resultado).
   * *Restricciones:* el reporte debe responder en menos de 1 segundo con `100.000` ventas; el arreglo puede estar vacío o tener un solo elemento.

2. **Ejemplos y casos borde:**
   * *Día 1 (12 ventas):* `C01`, `C02` y `C03` compran más de una vez → devuelve `["C01", "C02", "C03"]` (en cualquier orden).
   * *Arreglo vacío `[]`:* devuelve `[]`.
   * *Una sola venta o todos clientes distintos:* ningún cliente repite → devuelve `[]`.
   * *Un mismo cliente compra 4 veces:* debe aparecer **una sola vez** en el resultado.

3. **Fuerza bruta y su complejidad:**
   * Comparar cada venta `i` con todas las ventas posteriores `j` (`for` anidado) y revisar `!recurrentes.includes(...)`.
   * Complejidad temporal: **$O(n^2)$** en el tiempo de bucles (y peor aún por el recorrido interno de `.includes()`), lo que vuelve el proceso lento en volúmenes grandes.

4. **Idea de optimización:**
   * En vez de comparar pares `(i, j)` y buscar en un arreglo con `.includes()`, hacer un solo recorrido lineal usando estructuras con búsqueda promedio $O(1)$: un `Set` de `vistos` y otro `Set` de `recurrentes`, o un `Map` que cuente cuántas compras tiene cada cliente.

5. **Implementar:**
   * Escribir `clientesRecurrentesSet(ventas)` y `comprasPorCliente(ventas)` + extracción de recurrentes.

6. **Probar:**
   * Verificar igualdad de resultados (ordenados) en los datos del Día 1 y en `5.000` ventas generadas, y medir tiempos con `console.time`.

   const { generarVentas } = require("./generador"); // Ajusta la ruta si está en otra carpeta

## Método de resolución: optimización de clientesRecurrentes
function clientesRecurrentes(ventas) {
    const recurrentes = [];

    for (let i = 0; i < ventas.length; i++) {
        for (let j = i + 1; j < ventas.length; j++) {
            if (
                ventas[i].cliente === ventas[j].cliente &&
                !recurrentes.includes(ventas[i].cliente)
            ) {
                recurrentes.push(ventas[i].cliente);
            }
        }
    }

    return recurrentes;
}

// Paso 2: Optimización con dos Set (vistos y recurrentes)
function clientesRecurrentesSet(ventas) {
    const vistos = new Set();
    const recurrentes = new Set();

    for (const venta of ventas) {
        const cliente = venta.cliente;

        if (vistos.has(cliente)) {
            recurrentes.add(cliente);
        } else {
            vistos.add(cliente);
        }
    }

    return Array.from(recurrentes);
}

// Paso 3: Conteo con Map y obtención de recurrentes
function comprasPorCliente(ventas) {
    const conteo = new Map();

    for (const venta of ventas) {
        const cliente = venta.cliente;
        const actual = conteo.get(cliente) || 0;
        conteo.set(cliente, actual + 1);
    }

    return conteo;
}

function recurrentesDesdeMap(mapaCompras) {
    const recurrentes = [];

    for (const [cliente, cantidadCompras] of mapaCompras.entries()) {
        if (cantidadCompras > 1) {
            recurrentes.push(cliente);
        }
    }

    return recurrentes;
}

// Paso 4: Verificación con resultados ordenados
function sonIgualesOrdenados(a, b) {
    const ordA = [...a].sort();
    const ordB = [...b].sort();

    if (ordA.length !== ordB.length) return false;
    return ordA.every((valor, idx) => valor === ordB[idx]);
}

const ventasDia1 = [
    { cliente: "C01", producto: "Origen Huila 500 g", cantidad: 1, precio: 42000 },
    { cliente: "C02", producto: "Origen Nariño 250 g", cantidad: 1, precio: 26000 },
    { cliente: "C03", producto: "Prensa francesa", cantidad: 1, precio: 95000 },
    { cliente: "C01", producto: "Origen Sierra 500 g", cantidad: 1, precio: 45000 },
    { cliente: "C04", producto: "Molino manual", cantidad: 1, precio: 120000 },
    { cliente: "C02", producto: "Origen Huila 500 g", cantidad: 2, precio: 42000 },
    { cliente: "C05", producto: "Origen Nariño 250 g", cantidad: 1, precio: 26000 },
    { cliente: "C03", producto: "Origen Sierra 500 g", cantidad: 1, precio: 45000 },
    { cliente: "C06", producto: "Prensa francesa", cantidad: 1, precio: 95000 },
    { cliente: "C07", producto: "Origen Huila 500 g", cantidad: 1, precio: 42000 },
    { cliente: "C08", producto: "Molino manual", cantidad: 1, precio: 120000 },
    { cliente: "C09", producto: "Origen Nariño 250 g", cantidad: 1, precio: 26000 },
];

const rOrigDia1 = clientesRecurrentes(ventasDia1);
const rSetDia1 = clientesRecurrentesSet(ventasDia1);
const rMapDia1 = recurrentesDesdeMap(comprasPorCliente(ventasDia1));

console.log("Día 1 iguales (Set vs Original):", sonIgualesOrdenados(rSetDia1, rOrigDia1));
console.log("Día 1 iguales (Map vs Original):", sonIgualesOrdenados(rMapDia1, rOrigDia1));

const ventas5000 = generarVentas(5000);
const rOrig5k = clientesRecurrentes(ventas5000);
const rSet5k = clientesRecurrentesSet(ventas5000);
const rMap5k = recurrentesDesdeMap(comprasPorCliente(ventas5000));

console.log("5.000 ventas iguales (Set vs Original):", sonIgualesOrdenados(rSet5k, rOrig5k));
console.log("5.000 ventas iguales (Map vs Original):", sonIgualesOrdenados(rMap5k, rOrig5k));