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