const { generarVentas } = require("../generador"); 

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

const tamanos = [1000, 2000, 4000, 8000, 16000];

for (const n of tamanos) {
    const ventas = generarVentas(n);
    const etiqueta = `n = ${n}`;

    console.time(etiqueta);
    clientesRecurrentes(ventas);
    console.timeEnd(etiqueta);
}