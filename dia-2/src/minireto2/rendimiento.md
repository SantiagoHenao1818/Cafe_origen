## Medición de tiempo: `clientesRecurrentes` (duplicando `n`)

Medí el tiempo real que tarda `clientesRecurrentes` con `console.time` y `console.timeEnd` para `n = 1.000`, `2.000`, `4.000`, `8.000` y `16.000`:

| `n` (ventas) | Tiempo | Factor al duplicar `n` |
| :--- | :--- | :--- |
| `1.000` | `1.94 ms` | — |
| `2.000` | `3.878 ms` | `~2.00x` |
| `4.000` | `15.139 ms` | `~3.90x` |
| `8.000` | `70.048 ms` | `~4.63x` |
| `16.000` | `251.662 ms` | `~3.59x` |

### ¿Qué pasa cuando duplico `n`? (Relación con $O(n^2)$)
Cuando duplico `n`, el tiempo no sube al doble (`2x`), sino que se multiplica más o menos por **`4`** en los tramos grandes (`~3.9x`, `~4.6x`, `~3.6x`).

Esto encaja con una complejidad **$O(n^2)$**: como la función tiene un ciclo `for` dentro de otro ciclo `for` recorriendo las ventas, al duplicar la cantidad de datos (`2n`), el trabajo crece al cuadrado (`(2n)² = 4n²`), o sea, cerca de **4 veces más**. Por eso con `16.000` ventas ya va por `251.662 ms`.


## Estimación para 100.000 y 1.000.000 de ventas

Tomando como base mi medición real en `n = 16.000` (`251.662 ms`) y sabiendo que la función crece de forma cuadrática ($O(n^2)$):

* **Estimación para `100.000` ventas:**
  * `100.000 / 16.000 = 6.25` veces más datos.
  * Como es $O(n^2)$, el tiempo se multiplica por `6.25² = 39.06`:
  * `251.662 ms × 39.06 ≈ 9.830 ms` (**~9.8 segundos**).
  * Como es mucho menos de 2 minutos, sí se puede ejecutar para verificarlo.

* **Estimación para `1.000.000` de ventas:**
  * `1.000.000 / 16.000 = 62.5` veces más datos (10 veces más que `100.000`).
  * El tiempo se multiplica por `62.5² = 3.906.25` (o `100x` respecto a `100.000`):
  * `251.662 ms × 3.906.25 ≈ 983.055 ms` (**~16.4 minutos**).

## Costo oculto de `recurrentes.includes` (peor caso)

Dentro del doble ciclo se llama a `recurrentes.includes(ventas[i].cliente)`. Ese método no consulta un índice directo: recorre el arreglo `recurrentes` desde el inicio para ver si el cliente ya está guardado.

En el peor caso (cuando hay muchos clientes diferentes y `recurrentes` se hace grande), hacer esa búsqueda repetidamente dentro de ciclos anidados agrega un costo extra que también crece con el tamaño de los datos, empeorando el rendimiento en volúmenes altos.

## Conclusión para la gerente

El reporte no es que esté roto, sino que está hecho para revisar las ventas comparándolas unas con otras y verificando repetidamente la lista de clientes ya encontrados. Con pocos datos del día a día casi no se nota, pero al pasar todo el historial anual la cantidad de revisiones se dispara muchísimo y por eso el sistema tarda varios minutos en entregar el resultado.