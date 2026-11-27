Bitácora de Análisis de Algoritmos

1. Predicción antes de medir

Antes de correr las pruebas con los contadores, mi predicción es que si multiplico el tamaño de entrada n por 10, el número total de operaciones de las tres funciones también se va a multiplicar aproximadamente por 10.

Esto pasa porque todas recorren el arreglo de ventas de principio a fin una sola vez (es decir, tienen un comportamiento lineal):

totalVendido: Recorre las n ventas una por una para ir sumando cantidad * precio. No hace comparaciones entre elementos, así que si n crece 10 veces, las visitas también van a crecer exactamente 10 veces.

ventaMayor: Toma la primera venta como referencia y luego revisa las demás haciendo una comparación en cada paso. Si n se multiplica por 10, las visitas se multiplican por 10 y las comparaciones (que son n - 1) también van a subir casi exactamente 10 veces (a 10n - 1).

totalPorCiudad: Pasa por cada una de las n ventas y revisa si la ciudad ya existe en el objeto acumulador antes de sumar. Tanto las visitas como esas comprobaciones dependen directo del tamaño del arreglo, así que al multiplicar n por 10, las operaciones van a ser 10 veces mayores.

En resumen, espero ver una relación de 10 a 1 en los resultados cuando pase de n a 10n en las mediciones.

## Comparación, clasificación y justificación

Lo que predije antes de correr las pruebas coincidió con los números que me dio `src/medir.js`: cuando `n` se multiplica por 10, la función constante se queda igual (`1x`) y las funciones que recorren el arreglo suben más o menos `10x`.

### Comparación entre predicción y resultados
* **`primeraVenta`**: predije que no cambiaría sin importar cuánto creciera `n`. En las pruebas siempre dio `1` operación (`1` en `100`, `1.000`, `10.000` y `100.000`).
* **`totalVendido`**: predije que se multiplicaría por `~10`. Los números dieron `100` → `1.000` → `10.000` → `100.000`, o sea que creció exactamente `10x` cada vez.
* **`ventaMayor`**: predije un crecimiento de `~10x`. Los resultados fueron `199` → `1.999` → `19.999` → `199.999`, que sube cerca de `10` veces en cada salto.
* **`totalPorCiudad`**: predije un crecimiento de `~10x`. Los resultados dieron `200` → `2.000` → `20.000` → `200.000`, multiplicándose por `10` en cada paso.

### Clasificación y justificación
* **`primeraVenta` — $O(1)$:**
  * *Código:* toma `ventas[0]` directo y no tiene ciclos que dependan de `n`.
  * *Números:* hace `1` operación para `100` ventas y sigue haciendo `1` operación para `100.000` ventas.
* **`totalVendido` — $O(n)$:**
  * *Código:* usa un solo ciclo que pasa una vez por cada elemento del arreglo y suma `cantidad * precio`.
  * *Números:* pasa de `100` a `1.000`, luego a `10.000` y a `100.000` operaciones, igual que `n`.
* **`ventaMayor` — $O(n)$:**
  * *Código:* toma el primer elemento y luego recorre el resto con un solo ciclo haciendo una visita y una comparación por venta.
  * *Números:* pasa de `199` a `1.999`, `19.999` y `199.999` operaciones, creciendo de forma lineal con `n`.
* **`totalPorCiudad` — $O(n)$:**
  * *Código:* recorre el arreglo con un solo ciclo y en cada venta revisa si la ciudad ya existe en el objeto acumulador para sumar el monto.
  * *Números:* pasa de `200` a `2.000`, `20.000` y `200.000` operaciones, escalando linealmente con `n`.

### ¿Por qué ninguna es $O(n^2)$?
Para que alguna fuera $O(n^2)$ tendría que haber ciclos anidados sobre las ventas (por ejemplo, comparar cada venta contra todas las demás dentro de otro ciclo). Aquí todas las funciones que recorren datos hacen un solo recorrido por el arreglo, así que su crecimiento es lineal y no cuadrático.