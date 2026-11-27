
const productos = [
    { nombre: "Origen Huila 500 g", precio: 42000 },
    { nombre: "Origen Nariño 250 g", precio: 26000 },
    { nombre: "Prensa francesa", precio: 95000 },
    { nombre: "Origen Sierra 500 g", precio: 45000 },
    { nombre: "Molino manual", precio: 120000 }
];


const ciudades=[
    "Medellin",
    "Bogota",
    "Cali",
    "pereira"
];
function generarVentas(n){
    if(!Number.isInteger(n) || n<1 ){
        throw new Error("N debe ser un entero positivo.");
        return;
    }

    const ventas=[]

    const cantidadClientes= Math.max (1, Math.floor(n/3));
    const TOTALCANTIDAD=5;
    for(let i=0; i<n; i++){
        const cliente=Math.floor(Math.random()* cantidadClientes)+1;
        const producto=productos[Math.floor(Math.random()*productos.length)];
        const ciudad=ciudades[Math.floor(Math.random()*ciudades.length)];
        const cantidad=Math.floor(Math.random()*TOTALCANTIDAD)+1;                   
        ventas.push({
            cliente,
            producto: producto.nombre,
            ciudad,
            cantidad,
            precio: producto.precio,
        })
    }
    return ventas;
    
}

module.exports={generarVentas};







