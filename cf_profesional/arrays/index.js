/**
 *
 * Recorrer un arreglo
 */

console.log("ARREGLOS");
console.log("===============================================================");

let arreglo = [1, 34, 19, 28, 10];
for(let i = 0; i < arreglo.length; i++) {
  console.log(i);
}

/**
 *
 * forEach nos permite recorrer el arreglo y se ejecuta una vez por cada elemento
 */

console.log("\nFOREACH");
console.log("===============================================================");

let arregloLanguages = ['php', 'python', 'java', 'javascript'];
arregloLanguages.forEach(function(elemento) {
  console.log(elemento);
});

/**
 *
 * filter nos sirve para quitar elementos de un arreglo basados en criterios de filtro
 */

console.log("\nFILTER");
console.log("===============================================================");

arregloLanguages = arregloLanguages.filter((elemento) => elemento != 'php');
console.log(arregloLanguages);

/**
 *
 * find sirve para saber si un elemnto existe dentro del arreglo
 */

console.log("\nFIND");
console.log("===============================================================");

let elemento = arregloLanguages.find((elemento) => elemento == 'javascript');
console.log(elemento);

/**
 *
 * cualquier cosa que enviemos como argumento a map se inserta en un nuevo arreglo
 */

console.log("\nMAP");
console.log("===============================================================");

let numeros = [2, 35, 6, 20];
let cuadrados = numeros.map(numero => numero * numero);
console.log(cuadrados);


