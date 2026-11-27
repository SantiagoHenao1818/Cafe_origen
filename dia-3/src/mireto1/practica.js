
const ventas=[
    {ciudad: "Medellin", valor:84000}, 
    {ciudad: "Bogota", valor: 26000},
    {ciudad: "Medellin", valor:135000}
];
const porCiudad={};
for(const v of ventas){
    porCiudad[v.ciudad]=(porCiudad[v.ciudad] || 0)+ v.valor;
}


console.log(Object.keys(porCiudad).length);


