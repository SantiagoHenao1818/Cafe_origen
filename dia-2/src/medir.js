function primeraVenta(ventas, contador) {
    if (!Array.isArray(ventas) || ventas.length === 0) {
        return null;
    }

    contador.visitas += 1;
    return ventas[0];
}

function totalVendido(ventas, contador) {
    let total = 0;

    for (const venta of ventas) {
        contador.visitas += 1;
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

    for (const venta of ventas) {
        contador.visitas += 1;
        const monto = venta.cantidad * venta.precio;

        contador.comparaciones += 1;
        if (!Object.prototype.hasOwnProperty.call(totales, venta.ciudad)) {
            totales[venta.ciudad] = 0;
        }

        totales[venta.ciudad] += monto;
    }

    return totales;
}

function ejecutarMediciones() {
    const tamanos = [100, 1000, 10000, 100000];
    const resultados = [];

    for (const n of tamanos) {
        const ventas = generarVentas(n);

        const cPrimera = { visitas: 0, comparaciones: 0 };
        primeraVenta(ventas, cPrimera);

        const cTotal = { visitas: 0, comparaciones: 0 };
        totalVendido(ventas, cTotal);

        const cMayor = { visitas: 0, comparaciones: 0 };
        ventaMayor(ventas, cMayor);

        const cCiudad = { visitas: 0, comparaciones: 0 };
        totalPorCiudad(ventas, cCiudad);

        resultados.push({
            n,
            "primeraVenta (ops)": cPrimera.visitas + cPrimera.comparaciones,
            "totalVendido (ops)": cTotal.visitas + cTotal.comparaciones,
            "ventaMayor (ops)": cMayor.visitas + cMayor.comparaciones,
            "totalPorCiudad (ops)": cCiudad.visitas + cCiudad.comparaciones,
        });
    }

    console.table(resultados);
}

ejecutarMediciones();