// Spread Operator

let objeto = { clave: 3 }
let objetoDos = { claveDos: 4 }

console.log(objeto);
console.log(objetoDos);

let newObject = {
  ...objeto,
  ...objetoDos
}
console.log(newObject);

// For of

let arreglo = [1, 2, 3, 4];
for(numero of arreglo) {
  console.log(numero);
}

function saludaATodos() {
  for(nombre of arguments) {
    console.log("Hola " + nombre);
  }
}

saludaATodos("Cristhofer", "CodigoFacilito", "Usuarios");

// For in

let usuario = {
  nombre: "Cristhofer",
  edad: 29
}

for(propiedad in usuario) {
  console.log(propiedad);
}
