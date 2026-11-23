const ventas = require("../src/Datos.js");
const {
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  totalPorCiudad,
  unidadesPorProducto,
  topProductosPorValor,
  ventasDelDia,
} = require("./analitica.js");

const formatoCOP = (valor) => `$${Number(valor || 0).toLocaleString("es-CO")}`;


console.log("CAFÉ ORIGEN - REPORTE DE ANALÍTICA v0.1");


const mayor = ventaMayor(ventas);
console.log("--- 1. RESUMEN GENERAL ---");
console.log(`Total vendido:    ${formatoCOP(totalVendido(ventas))}`);
console.log(`Unidades salidas: ${unidadesVendidas(ventas)}`);
console.log(`Ticket promedio:  ${formatoCOP(Math.round(ticketPromedio(ventas)))}`);
if (mayor) {
  console.log(
    `Venta mayor:      ${mayor.producto} (${mayor.ciudad}) -> ${formatoCOP(mayor.cantidad * mayor.precio)}`
  );
} else {
  console.log("Venta mayor:      Sin ventas registradas");
}
console.log("");


console.log("--- 2. VENTAS POR CIUDAD ---");
const porCiudad = totalPorCiudad(ventas);
const filasCiudad = Object.entries(porCiudad).map(([ciudad, total]) => ({
  Ciudad: ciudad,
  "Total Vendido": formatoCOP(total),
}));
console.table(filasCiudad);


console.log("--- 3. UNIDADES POR PRODUCTO ---");
const porProducto = unidadesPorProducto(ventas);
const filasProducto = Object.entries(porProducto).map(([producto, unidades]) => ({
  Producto: producto,
  Unidades: unidades,
}));
console.table(filasProducto);


console.log("--- 4. TOP 3 PRODUCTOS POR VALOR ---");
const top3 = topProductosPorValor(ventas, 3);
const filasTop3 = top3.map((item, idx) => ({
  Puesto: idx + 1,
  Producto: item.producto,
  "Valor Generado": formatoCOP(item.totalValor),
}));
console.table(filasTop3);

console.log("--- 5. RESUMEN POR DÍA ---");
function mostrarResumenDia(fecha) {
  const delDia = ventasDelDia(ventas, fecha);
  if (delDia.length === 0) {
    console.log(`Fecha ${fecha}: Sin ventas registradas (Total: ${formatoCOP(0)}, Unidades: 0, Ticket: ${formatoCOP(0)}).`);
    return;
  }
  console.log(
    `Fecha ${fecha}: ${delDia.length} registro(s) | Total: ${formatoCOP(totalVendido(delDia))} | Unidades: ${unidadesVendidas(delDia)} | Ticket promedio: ${formatoCOP(Math.round(ticketPromedio(delDia)))}`
  );
}

mostrarResumenDia("2026-09-01");
mostrarResumenDia("2026-09-10");
