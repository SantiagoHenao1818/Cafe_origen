# ☕ Café Origen — Análisis de Ventas y Rendimiento

Proyecto desarrollado para **Café Origen** (tostadora de café de especialidad en Medellín) por el equipo de **Nodo Digital**, como parte de las prácticas y miniretos de **Algoritmia y Desarrollo** (Riwi Tech Academy) usando **Node.js**.

---

## 📌 Fases del Proyecto

### Fase 1: Exploración, Auditoría y Motor de Analítica (v0.1)
* Exploración inicial de registros de ventas e identificación de anomalías (cantidades en `0`, variaciones de mayúsculas/minúsculas y espacios en ciudades).
* Verificación de métricas comparando ciclos manuales y métodos de arreglo (`"OK"`).
* Reporte ejecutivo por consola con totales, ticket promedio, ventas por ciudad, unidades por producto y top 3 productos.

### Fase 2: Análisis de Complejidad y Rendimiento
* Instrumentación de funciones (`totalVendido`, `ventaMayor`, `totalPorCiudad`, `primeraVenta`) para medir visitas y comparaciones al escalar `n`.
* Análisis de `clientesRecurrentes` con ciclos anidados y `.includes()`, medición de tiempos reales (`console.time` / `console.timeEnd`), estimaciones para volúmenes grandes y conclusión para gerencia.

---

## 🎯 Preguntas de negocio que responde
* ¿Cuánto dinero se ha vendido en total y cuántas unidades han salido?
* ¿Cuál fue la venta individual de mayor valor y cuál es el ticket promedio de compras válidas?
* ¿Cuánto se vende por ciudad (unificando mayúsculas, minúsculas y espacios)?
* ¿Cuántas unidades se venden por producto y cuáles son los 3 productos que más dinero generan?
* ¿Cómo se comporta un día con ventas frente a un día sin ventas?
* ¿Qué clientes son recurrentes y cómo escala el reporte al crecer el historial?

---

## 🚀 Cómo ejecutar los scripts

Asegúrate de tener **Node.js (LTS)** instalado y abre la terminal en la carpeta correspondiente:

```bash
# Auditoría, verificación y reporte (v0.1)
node src/explorar.js
node src/verificar.js
node src/reporte.js

# Medición de operaciones y escalado
node medir.js

# Prueba de clientes recurrentes y medición de tiempos
node clientesRecurrentes.js



Cafe_origen/
├── src/
│   ├── Datos.js
│   ├── analitica.js
│   ├── explorar.js
│   ├── verificar.js
│   ├── reporte.js
│   └── minireto2/
│       ├── generador.js
│       ├── funciones.js
│       ├── medir.js
│       └── clientesRecurrentes.js
├── bitacora-dia1.md
├── Bitacora.md
├── RENDIMIENTO.md
└── README.md
