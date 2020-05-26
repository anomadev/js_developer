/**
 *
 * Declaración y ejecución de una función
 */

console.log('FUNCIONES');
console.log('===============================================================');

function saluda() {
  console.log("Hola developer");
}

saluda();

function cuadrado(numero) {
  return numero * numero;
}

console.log(cuadrado(5));

/**
 *
 * Argumentos a funciones: los argumentos son la forma en la que enviamos datos
 * a la funcion para que esta haga uso de ellos en la lógica que desempeña.
 */

console.log("\nARGUMENTOS A FUNCIONES");
console.log("===============================================================");

function suma() {
  return arguments[0] + arguments[1];
}

console.log(suma(3, 5));

/**
 *
 * Las funciones al ser ciudadanos de primera clase en javascript ser almacenadas
 * en variables o ser recibidas como argumentos por otras funciones.
 */

console.log("\nFUNCIONES ANONIMAS");
console.log("===============================================================");

function executor(funcion) {
  funcion();
}

executor(function() {
  console.log("Soy una función anonima!!");
});

/**
 *
 * Las funciones arrow provee de una sintaxis elegante en la cual pueden omitirse
 * las llaves en caso de que el cuerpo de la función consista en una sola linea
 * de código, retorna por default su ultima línea y no modifican el valor de this
 */

console.log("\nFUNCIONES FLECHA");
console.log("===============================================================");

let demo = () => {
  console.log('Soy una función de flecha');
};

demo();

let saludar = () => console.log("Hola desde una función de flecha");
saludar();

let sum = (a, b) => a + b;
console.log(sum(5, 37));

/**
 *
 * Javacript ofrece métodos a través los cuales podemos establecer el valor
 * de la variable this, call y apply asignan el valor de this y ejecutan 
 * la función de manera inmediata.
 */

console.log("\nCALL, APPLY Y BIND");
console.log("===============================================================");

let tutor = {
  nombre: "Cristhofer",
  apellido: "Ordaz",

  nombreCompleto: function() {
    console.log(this.nombre + " " + this.apellido);
  }
}

function exec(funcion) {
  // asignamos el valor del objeto tutor a la variable de contexto this
  funcion.call(tutor);
}
exec(tutor.nombreCompleto());

function saluda(nombre) { console.log("Hola " + nombre) }
// asignamos el valor de window a la variable this y los demas parametros se
// asignan al objeto arguments de la función
saluda.apply(window, ["Cristhofer"]);

// ejecutamos bind para asignar el contexto sin involucrar o ejecutar la función
exec(tutor.nombreCompleto.bind(tutor));
