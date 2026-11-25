const ventas = require("./Datos.js");

console.log("registros:", ventas.length);
console.log("Primero:", ventas[0]);
console.log("Ultimo:", ventas[ventas.length - 1]);
console.log("Producto en la posicion 4:", ventas[3].producto);
console.table(ventas);
console.log(ventas.map(v => `[${v.ciudad}]`).join(" "));