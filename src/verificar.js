const ventas = require("../src/Datos.js");
const {
  totalVendido,
  unidadesVendidas,
  ventasPorCiudad,
  totalVendidoM,
  unidadesVendidasM,
  ventasPorCiudadM,
} = require("../src/analitica.js");

const ordenAntes = JSON.stringify(ventas);

function comparar(nombre, a, b) {
  console.log(`${nombre}: ${a === b ? "OK" : "DIFERENTE"}`);
}

comparar("totalVendido vs totalVendidoM", totalVendido(ventas), totalVendidoM(ventas));
comparar("unidadesVendidas vs unidadesVendidasM", unidadesVendidas(ventas), unidadesVendidasM(ventas));
comparar(
  "ventasPorCiudad vs ventasPorCiudadM (Medellín)",
  ventasPorCiudad(ventas, "Medellín"),
  ventasPorCiudadM(ventas, "Medellín")
);
comparar(
  "ventasPorCiudad vs ventasPorCiudadM (Bogotá)",
  ventasPorCiudad(ventas, "Bogotá"),
  ventasPorCiudadM(ventas, "Bogotá")
);

const ordenDespues = JSON.stringify(ventas);
console.log("ventas sin mutar:", ordenAntes === ordenDespues ? "OK" : "DIFERENTE");