# ☕ Proyecto: Análisis de Ventas - Café Origen

Repositorio desarrollado como parte de las prácticas y miniretos de **Algoritmia y Desarrollo** (Riwi Tech Academy). Su objetivo principal es la exploración, validación y limpieza de un conjunto de datos de ventas utilizando Node.js.

---

## 📌 Fases del Proyecto

### 🟢 Fase 1: Exploración y Auditoría de Datos
* **Objetivo:** Conexión inicial de los datos (`datos.js`), inspección de registros e identificación de anomalías de calidad de datos.
* **Logros principales:**
  * Procesamiento y conteo de 12 registros de ventas.
  * Detección de inconsistencias de formato en ciudades (variaciones de mayúsculas/minúsculas y espacios invisibles al final) mediante técnicas de mapeo en consola con delimitadores (`[]`).
  * Identificación de anomalías numéricas (cantidades en 0).
  * Documentación de hallazgos, decisiones técnicas y diccionario de datos en la bitácora (`bitacora.md`).

*(Próximamente se agregarán las siguientes fases de desarrollo y filtrado de datos).*

---

## 🚀 Tecnologías y Herramientas
* **JavaScript (Node.js)**: Entorno de ejecución para la lógica y procesamiento de datos.
* **Git y GitHub**: Control de versiones y alojamiento del repositorio.
* **Markdown**: Documentación del proyecto.

---

# Café Origen — Motor de Analítica (v0.1)

Proyecto desarrollado para **Café Origen** (tostadora de café de especialidad en Medellín) por el equipo de **Nodo Digital**. Procesa el historial de ventas desde consola con Node.js para responder preguntas clave de negocio sin depender de hojas de cálculo manuales.

## Preguntas de negocio que responde
- ¿Cuánto dinero se ha vendido en total y cuántas unidades han salido?
- ¿Cuál fue la venta individual de mayor valor y cuál es el ticket promedio de compras válidas?
- ¿Cuánto se vende por ciudad (unificando variaciones de mayúsculas, minúsculas y espacios)?
- ¿Cuántas unidades se venden por producto y cuáles son los 3 productos que más dinero generan?
- ¿Cómo se comporta un día con ventas frente a un día sin ventas?

## Cómo ejecutar el proyecto
Asegúrate de tener **Node.js (LTS)** instalado y estar en la raíz del repositorio `cafe-origen-analitica`:

```bash
# 1. Explorar los datos y detectar anomalías/casos borde
node src/explorar.js

# 2. Verificar que las funciones con ciclos y con métodos den exactamente lo mismo ("OK")
node src/verificar.js

# 3. Generar el reporte ejecutivo por consola (v0.1)
node src/reporte.js



## 📂 Estructura del Proyecto
```text
cafe_origen/
│
├── src/
│   ├── datos.js        # Arreglo con los registros de ventas
│   └── explorar.js     # Script principal de auditoría y validación
│
├── bitacora.md         # Diario de proceso, problemas encontrados y decisiones
└── README.md           # Manual y descripción general del proyecto