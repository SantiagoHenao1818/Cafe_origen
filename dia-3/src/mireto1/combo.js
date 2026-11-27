const {catalogo} = requiere("./Catalogo");

function comboRegaloFuerzaBruta(catalogo, valor) {
    if (!Array.isArray(catalogo) || catalogo.length < 2) {
        return null;
    }

    for (let i = 0; i < catalogo.length; i++) {
        for (let j = i + 1; j < catalogo.length; j++) {
            if (catalogo[i].precio + catalogo[j].precio === valor) {
                return [catalogo[i], catalogo[j]];
            }
        }
    }

    return null;
}

function comboRegalo(catalogo, valor) {
    if (!Array.isArray(catalogo) || catalogo.length < 2) {
        return null;
    }

    const vistos = new Map(); 

    for (const producto of catalogo) {
        const complemento = valor - producto.precio;

        if (vistos.has(complemento)) {
            return [vistos.get(complemento), producto];
        }

        if (!vistos.has(producto.precio)) {
            vistos.set(producto.precio, producto);
        }
    }

    return null;
}

console.log("87.000:", comboRegalo(catalogo, 87000));
console.log("61.000:", comboRegalo(catalogo, 61000));
console.log("Sin combinacion (10.000):", comboRegalo(catalogo, 10000));

module.exports = { comboRegaloFuerzaBruta, comboRegalo };

function productoEstrellaPorCiudad(ventas) {
    if (!Array.isArray(ventas) || ventas.length === 0) {
        return {};
    }

    const conteoPorCiudad = new Map();

    for (const venta of ventas) {
        const ciudad = venta.ciudad;
        const producto = venta.producto;

        if (!conteoPorCiudad.has(ciudad)) {
            conteoPorCiudad.set(ciudad, new Map());
        }

        const conteoProductos = conteoPorCiudad.get(ciudad);
        conteoProductos.set(producto, (conteoProductos.get(producto) || 0) + 1);
    }

    const resultado = {};

    for (const [ciudad, conteoProductos] of conteoPorCiudad.entries()) {
        let estrella = null;
        let maxApariciones = 0;

        for (const [producto, apariciones] of conteoProductos.entries()) {
     
            if (apariciones > maxApariciones) {
                maxApariciones = apariciones;
                estrella = producto;
            }
        }

        resultado[ciudad] = {
            producto: estrella,
            apariciones: maxApariciones
        };
    }

    return resultado;
}