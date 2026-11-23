FUNCIÓN valorVenta(venta):
  RETORNAR venta.cantidad * venta.precio

FUNCIÓN totalVendido(ventas):
  SI ventas.length == 0:
    RETORNAR 0
  INICIAR total = 0
  PARA CADA venta EN ventas:
    total = total + valorVenta(venta)
  RETORNAR total

FUNCIÓN unidadesVendidas(ventas):
  SI ventas.length == 0:
    RETORNAR 0
  INICIAR unidades = 0
  PARA CADA venta EN ventas:
    unidades = unidades + venta.cantidad
  RETORNAR unidades

FUNCIÓN ventaMayor(ventas):
  SI ventas.length == 0:
    RETORNAR null
  INICIAR mejorVenta = null
  INICIAR mayorValor = -1   // o 0 si no hay ventas negativas; con -1 cubrimos incluso ventas de valor 0
  PARA CADA venta EN ventas:
    actualValor = valorVenta(venta)
    SI mejorVenta == null O actualValor > mayorValor:
      mayorValor = actualValor
      mejorVenta = venta
  RETORNAR mejorVenta



## 🔍 Análisis y Validación de Datos (Café Origen)

Tras ejecutar el script de exploración de datos (`node ./src/explorar.js`), se procesó un total de **12 registros** de ventas (desde el `2026-09-01` hasta el `2026-09-06`). Tras la revisión, se identificaron las siguientes inconsistencias y problemas en los datos:

1. **Inconsistencias en las Ciudades:**
   - Hay variaciones en el uso de mayúsculas y minúsculas (ej. `'Medellín'` vs `'medellín'` en el índice 4).
   - Se detectaron espacios en blanco adicionales al final de los valores en algunas ciudades (ej. `'Medellín '` en el índice 10 y `'Bogotá '` en el índice 11), lo que afectaría futuras agrupaciones o filtros si no se normalizan.

2. **Anomalías en las Cantidades:**
   - El registro con `id: 8` (cliente `C06`, fecha `2026-09-04`) presenta una `cantidad: 0`. Esto representa una incoherencia lógica para un reporte de ventas activo, por lo que se decide no tenerlo en cuenta para los tickets de venta.

3. **Estandarización y Validación de Registros:**
   - Aunque la nomenclatura de los clientes sigue una secuencia base (`C01` a `C08` reutilizados en las transacciones), se validó la estructura de los objetos incluyendo la nueva propiedad `fecha` para mantener la trazabilidad temporal correcta de cada pedido.


# Bitácora de Análisis de Datos - Café Origen

| Problema | Decisión |
| :--- | :--- |
| venta 8 con cantidad 0 | no cuenta en el ticket |
| ciudades con espacios y minúsculas | normalizar antes de comparar |
| clientes repetidos | es válido: se usa en S5 y S6 |
| Diccionario de datos | propiedad · tipo · significado |

## 📚 Diccionario de Datos

| Propiedad | Tipo | Significado |
| :--- | :--- | :--- |
| **id** | Número entero (`Number`) | Identificador único de la transacción o venta. |
| **fecha** | Texto (`String`) | Fecha en la que se realizó la venta (Formato: AAAA-MM-DD). |
| **cliente** | Texto (`String`) | Código identificador del cliente que realiza la compra (ej. C01). |
| **producto** | Texto (`String`) | Nombre o descripción del artículo de café o accesorio vendido. |
| **ciudad** | Texto (`String`) | Ciudad de destino donde se despacha el pedido. |
| **cantidad** | Número entero (`Number`) | Unidades del producto adquiridas en la transacción. |
| **precio** | Número (`Number`) | Valor unitario del producto en pesos. |

### 🕵️ Auditoría de Ciudades (Detección de Anomalías)

Para verificar la integridad de los datos en la columna `ciudad` y detectar errores de tipeo o espacios ocultos que no se ven a simple vista en la tabla tradicional, se ejecutó la siguiente línea de código de mapeo en consola:

```javascript
console.log(ventas.map(v => `[${v.ciudad}]`).join(" "));


#### `bitacora.md`
```markdown
# Bitácora — Café Origen Analítica

## 1. Diccionario de datos
- `id` (number): identificador único de cada venta.
- `fecha` (string, `YYYY-MM-DD`): fecha en la que se registró la venta.
- `cliente` (string): código del cliente (ej. `"C01"`).
- `producto` (string): nombre o presentación del producto vendida.
- `ciudad` (string): ciudad de origen/destino de la venta.
- `cantidad` (number): cantidad de unidades vendidas en la transacción.
- `precio` (number): precio unitario en pesos colombianos (COP).

## 2. Casos borde y decisiones
1. **Arreglo vacío `[]` o sin ventas válidas:** `totalVendido([])` y `unidadesVendidas([])` retornan `0`; `ventaMayor([])` retorna `null` (no puede inventar un registro); `ticketPromedio([])` o ventas con solo `cantidad: 0` retornan `0` para evitar `NaN` o `Infinity`.
2. **Venta con `cantidad: 0` (`id: 8`):** se mantiene en el historial bruto, aporta `0` al valor total, pero no cuenta como compra válida al calcular `ticketPromedio`.
3. **Inconsistencias de texto en `ciudad` (`"medellín"`, `"Medellín "`, `"Bogotá "`):** se limpian con `.trim().toLowerCase()` y se mapean al nombre canónico para que no aparezcan ciudades duplicadas.
4. **No mutar el arreglo original `ventas`:** antes de ordenar o agrupar con métodos que alteran o encadenan, se trabaja sobre copias (`[...ventas]`) para preservar el orden original del historial.

## 3. Plan en pseudocódigo (indicadores con ciclos)
- `valorVenta(venta)`: retornar `venta.cantidad * venta.precio`.
- `totalVendido(ventas)`: si `ventas.length === 0` retornar `0`; iniciar `total = 0`; recorrer `venta` de `ventas` con `for...of` y acumular `valorVenta(venta)`; retornar `total`.
- `unidadesVendidas(ventas)`: si `ventas.length === 0` retornar `0`; iniciar `unidades = 0`; recorrer `venta` de `ventas` y acumular `venta.cantidad`; retornar `unidades`.
- `ventaMayor(ventas)`: si `ventas.length === 0` retornar `null`; iniciar `mejorVenta = ventas[0]` y `mayorValor = valorVenta(ventas[0])`; recorrer `ventas` y si `valorVenta(venta) > mayorValor`, actualizar ambos; retornar `mejorVenta`.
- `ticketPromedio(ventas)`: acumular `totalDinero` de `valorVenta(venta)` y contar `ventasValidas` cuando `venta.cantidad > 0`; si `ventasValidas === 0` retornar `0`, si no retornar `totalDinero / ventasValidas`.
- `ventasPorCiudad(ventas, ciudad)`: normalizar `ciudad` con `trim().toLowerCase()`; recorrer `ventas` y si `venta.ciudad.trim().toLowerCase()` coincide, acumular `valorVenta(venta)`; retornar total.

## 4. Tablas de traza manual vs. programa

### Traza 1: `totalVendido` sobre los primeros 3 registros
| Paso | Registro (`id`) | `cantidad` | `precio` | `valorVenta` | `total` acumulado |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Inicio | - | - | - | - | `0` |
| 1 | `1` | `2` | `42000` | `84000` | `84000` |
| 2 | `2` | `1` | `26000` | `26000` | `110000` |
| 3 | `3` | `1` | `95000` | `95000` | `205000` |

Resultado manual en 3 registros: `205000` (y sobre los 12 registros completos: `985000`, coincidente con el programa).

### Traza 2: `ventasPorCiudad(ventas, "Medellín")` en registros con variación de texto (`id: 1, 4, 5, 11`)
| Paso | `id` | `ciudad` original | Normalizada | ¿Coincide con `"medellín"`? | `valorVenta` | `totalCiudad` |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Inicio | - | - | - | - | - | `0` |
| 1 | `1` | `"Medellín"` | `"medellín"` | Sí | `84000` | `84000` |
| 4 | `4` | `"Medellín"` | `"medellín"` | Sí | `42000` | `126000` |
| 5 | `5` | `"medellín"` | `"medellín"` | Sí | `135000` | `261000` |
| 11 | `11` | `"Medellín "` | `"medellín"` | Sí | `95000` | `356000` |

Resultado manual para Medellín: `356000`, coincidente con `ventasPorCiudad(ventas, "Medellín")`.

## 5. Preguntas sobre colecciones (MiniReto 3)
- **`totalVendidoM`:** recorre `ventas`; no filtra; transforma cada venta a su valor con `valorVenta`; acumula la suma con `reduce` (valor inicial `0`).
- **`unidadesVendidasM`:** recorre `ventas`; no filtra; toma `venta.cantidad`; acumula unidades con `reduce` (valor inicial `0`).
- **`ventasPorCiudadM`:** recorre `ventas`; filtra por ciudad normalizada; transforma a `valorVenta`; acumula el total con `reduce` (valor inicial `0`).
- **`totalPorCiudad`:** recorre copia de `ventas`; normaliza ciudad; agrupa acumulando totales en un objeto diccionario por ciudad.
- **`unidadesPorProducto`:** recorre copia de `ventas`; agrupa por `producto` sumando `cantidad` en un objeto diccionario.
- **`topProductosPorValor`:** agrupa valor por producto, transforma entradas con `Object.entries`, ordena de mayor a menor con `.sort` sobre copia y recorta los primeros `k` con `.slice(0, k)`.

## 6. Depuración de errores reportados (v0.1)

### Error 1: Bogotá duplicada en el reporte por ciudad
- **Síntoma:** `"Bogotá"` aparecía dos veces en la agrupación por ciudad.
- **Entrada que lo produce:** registros con `"Bogotá"` (`id: 2, 6, 7`) y `"Bogotá "` con espacio al final (`id: 12`).
- **Hipótesis:** las claves del objeto agrupador se crean sin limpiar espacios en blanco.
- **Prueba realizada:** inspeccionar las ciudades con `explorar.js` (`[Bogotá ]`) y ejecutar `totalPorCiudad(ventas)`.
- **Causa:** falta de `.trim()` y normalización de mayúsculas/minúsculas al agrupar.
- **Corrección:** normalizar cada ciudad con `.trim().toLowerCase()` y mapearla a su nombre canónico (`"Bogotá"`), dejando exactamente 4 ciudades (`Medellín`, `Bogotá`, `Cali`, `Pereira`).

### Error 2: `ticketPromedio` devolviendo `NaN` en un día sin ventas
- **Síntoma:** al consultar un día sin ventas, el ticket promedio mostraba `NaN`.
- **Entrada que lo produce:** `ticketPromedio(ventasDelDia(ventas, "2026-09-10"))` (recibe `[]`).
- **Hipótesis:** dividir `total / cantidad` cuando no hay ventas válidas produce `0 / 0`, que en JavaScript es `NaN`.
- **Prueba realizada:** ejecutar `node src/reporte.js` evaluando `"2026-09-10"`.
- **Causa:** no validar `ventasValidas === 0` antes de realizar la división.
- **Corrección:** retornar `0` explícitamente cuando `ventas.length === 0` o `ventasValidas === 0`.
