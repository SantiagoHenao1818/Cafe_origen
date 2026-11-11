
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

