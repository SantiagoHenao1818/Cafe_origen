const { generarVentas } = require("./ventas");

function totalVendido(ventas, contador) {
    let total = 0;

    for (let i = 0; i < ventas.length; i++) {
        contador.visitas += 1;
        const venta = ventas[i];
        total += venta.cantidad * venta.precio;
    }

    return total;
}

function ventaMayor(ventas, contador) {
    if (ventas.length === 0) {
        return null;
    }

    let mayor = ventas[0];
    contador.visitas += 1;

    for (let i = 1; i < ventas.length; i++) {
        contador.visitas += 1;
        const actual = ventas[i];

        const montoActual = actual.cantidad * actual.precio;
        const montoMayor = mayor.cantidad * mayor.precio;

        contador.comparaciones += 1;
        if (montoActual > montoMayor) {
            mayor = actual;
        }
    }

    return mayor;
}

function totalPorCiudad(ventas, contador) {
    const totales = {};

    for (let i = 0; i < ventas.length; i++) {
        contador.visitas += 1;
        const venta = ventas[i];
        const monto = venta.cantidad * venta.precio;

        contador.comparaciones += 1;
        if (!Object.prototype.hasOwnProperty.call(totales, venta.ciudad)) {
            totales[venta.ciudad] = 0;
        }

        totales[venta.ciudad] += monto;
    }

    return totales;
}

const ventas = generarVentas(10);

const statsTotal = { visitas: 0, comparaciones: 0 };
const total = totalVendido(ventas, statsTotal);

const statsMayor = { visitas: 0, comparaciones: 0 };
const mayor = ventaMayor(ventas, statsMayor);

const statsCiudad = { visitas: 0, comparaciones: 0 };
const porCiudad = totalPorCiudad(ventas, statsCiudad);

console.log("Total vendido:", total, statsTotal);
console.log("Venta mayor:", mayor, statsMayor);
console.log("Total por ciudad:", porCiudad, statsCiudad);