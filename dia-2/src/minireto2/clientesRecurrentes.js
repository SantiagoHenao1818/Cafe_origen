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


const ventasDia1 = [
    { cliente: "C01", producto: "Origen Huila 500 g", cantidad: 1, precio: 42000 },
    { cliente: "C02", producto: "Origen Nariño 250 g", cantidad: 1, precio: 26000 },
    { cliente: "C03", producto: "Prensa francesa", cantidad: 1, precio: 95000 },
    { cliente: "C01", producto: "Origen Sierra 500 g", cantidad: 1, precio: 45000 },
    { cliente: "C04", producto: "Molino manual", cantidad: 1, precio: 120000 },
    { cliente: "C02", producto: "Origen Huila 500 g", cantidad: 2, precio: 42000 },
    { cliente: "C05", producto: "Origen Nariño 250 g", cantidad: 1, precio: 26000 },
    { cliente: "C03", producto: "Origen Sierra 500 g", cantidad: 1, precio: 45000 },
    { cliente: "C06", producto: "Prensa francesa", cantidad: 1, precio: 95000 },
    { cliente: "C07", producto: "Origen Huila 500 g", cantidad: 1, precio: 42000 },
    { cliente: "C08", producto: "Molino manual", cantidad: 1, precio: 120000 },
    { cliente: "C09", producto: "Origen Nariño 250 g", cantidad: 1, precio: 26000 },
];

console.log("Recurrentes Día 1:", clientesRecurrentes(ventasDia1));
