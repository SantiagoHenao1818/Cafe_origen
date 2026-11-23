

function valorVenta(venta) {
  return venta.cantidad * venta.precio;
}

function totalVendido(ventas) {
  if (!ventas || ventas.length === 0) {
    return 0;
  }

  let total = 0;
  for (const venta of ventas) {
    total += valorVenta(venta);
  }
  return total;
}

function unidadesVendidas(ventas) {
  if (!ventas || ventas.length === 0) {
    return 0;
  }

  let unidades = 0;
  for (const venta of ventas) {
    unidades += venta.cantidad;
  }
  return unidades;
}

function ventaMayor(ventas) {
  if (!ventas || ventas.length === 0) {
    return null;
  }

  let mejorVenta = ventas[0];
  let mayorValor = valorVenta(ventas[0]);

  for (const venta of ventas) {
    const total = valorVenta(venta);
    if (total > mayorValor) {
      mayorValor = total;
      mejorVenta = venta;
    }
  }

  return mejorVenta;
}

function ticketPromedio(ventas) {
  if (!ventas || ventas.length === 0) {
    return 0;
  }

  let totalDinero = 0;
  let ventasValidas = 0;

  for (const venta of ventas) {
    if (venta.cantidad > 0) {
      totalDinero += valorVenta(venta);
      ventasValidas += 1;
    }
  }

  if (ventasValidas === 0) {
    return 0;
  }

  return totalDinero / ventasValidas;
}

function ventasPorCiudad(ventas, ciudad) {
  if (!ventas || ventas.length === 0 || !ciudad) {
    return 0;
  }

  const ciudadBuscada = ciudad.trim().toLowerCase();
  let totalCiudad = 0;

  for (const venta of ventas) {
    const ciudadVenta = venta.ciudad.trim().toLowerCase();
    if (ciudadVenta === ciudadBuscada) {
      totalCiudad += valorVenta(venta);
    }
  }

  return totalCiudad;
}





function totalVendidoM(ventas) {
  if (!ventas || ventas.length === 0) {
    return 0;
  }

  return ventas.reduce((acc, venta) => acc + valorVenta(venta), 0);
}

function unidadesVendidasM(ventas) {
  if (!ventas || ventas.length === 0) {
    return 0;
  }

  return ventas.reduce((acc, venta) => acc + venta.cantidad, 0);
}

function ventasPorCiudadM(ventas, ciudad) {
  if (!ventas || ventas.length === 0 || !ciudad) {
    return 0;
  }

  const ciudadBuscada = ciudad.trim().toLowerCase();

  return ventas
    .filter((venta) => venta.ciudad.trim().toLowerCase() === ciudadBuscada)
    .reduce((acc, venta) => acc + valorVenta(venta), 0);
}




function normalizarNombreCiudad(ciudad) {
  const limpia = ciudad.trim().toLowerCase();
  const mapaNombres = {
    "medellín": "Medellín",
    "medellin": "Medellín",
    "bogotá": "Bogotá",
    "bogota": "Bogotá",
    "cali": "Cali",
    "pereira": "Pereira",
  };

  if (mapaNombres[limpia]) {
    return mapaNombres[limpia];
  }

  return limpia
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join(" ");
}

function totalPorCiudad(ventas) {
  if (!ventas || ventas.length === 0) {
    return {};
  }

  const copia = [...ventas];
  return copia.reduce((acc, venta) => {
    const ciudadLimpia = normalizarNombreCiudad(venta.ciudad);
    acc[ciudadLimpia] = (acc[ciudadLimpia] || 0) + valorVenta(venta);
    return acc;
  }, {});
}

function unidadesPorProducto(ventas) {
  if (!ventas || ventas.length === 0) {
    return {};
  }

  const copia = [...ventas];
  return copia.reduce((acc, venta) => {
    const producto = venta.producto.trim();
    acc[producto] = (acc[producto] || 0) + venta.cantidad;
    return acc;
  }, {});
}

function topProductosPorValor(ventas, k = 3) {
  if (!ventas || ventas.length === 0 || k <= 0) {
    return [];
  }

  const acumulador = [...ventas].reduce((acc, venta) => {
    const producto = venta.producto.trim();
    acc[producto] = (acc[producto] || 0) + valorVenta(venta);
    return acc;
  }, {});

  return Object.entries(acumulador)
    .map(([producto, totalValor]) => ({ producto, totalValor }))
    .sort((a, b) => b.totalValor - a.totalValor)
    .slice(0, k);
}





function ventasDelDia(ventas, fecha) {
  if (!ventas || ventas.length === 0 || !fecha) {
    return [];
  }

  const fechaBuscada = fecha.trim();
  return ventas.filter((venta) => venta.fecha === fechaBuscada);
}

module.exports = {
  valorVenta,
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  ventasPorCiudad,
  totalVendidoM,
  unidadesVendidasM,
  ventasPorCiudadM,
  totalPorCiudad,
  unidadesPorProducto,
  topProductosPorValor,
  ventasDelDia,
};