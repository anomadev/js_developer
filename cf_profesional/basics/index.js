/**
 *
 * Variables y constantes en Javascript
 * El nombre de las variables se puede declarar con "_", "$" o cualquier caracter alfanumerico
 */

console.log('VARIABLES Y CONSTANTES');
console.log('====================================================================================');

let name = "Cristhofer";
const PI = 3.1416;
console.log(name)

/**
 *
 * En javascript los numeros son de tipo Number así sean enteros o decimales
 */

console.log('\nNUMEROS Y OPERACIONES ARITMETICAS');
console.log('====================================================================================');

let age = 24;
let factor = 2.5;

console.log(Math.PI);
console.log(Math.pow(10, 2));
console.log(Math.round(6.5));
console.log(Math.sqrt(25));

/**
 *
 * Los boolean son datos de pueden contener solo dos valores "true" o "false"
 * son muy utiles al momento de hacer comparaciones, en ciclos y condiciones.
 */

console.log('\nBOOLEANOS');
console.log('====================================================================================');

let booleano =  new Boolean(1);
console.log(booleano);

/**
 *
 * Los operadores de comparación se utilizan al querer evaluar si dos valores son iguales
 * o distintos entre si.
 */

console.log('\nOPERADORES DE COMPARACIÓN');
console.log('====================================================================================');

let edad = 24;
console.log(edad == 24);
console.log(edad == 20);
console.log(edad != 18);
console.log(edad > 24);
console.log(edad < 24);
console.log(edad >= 24);
console.log(edad <= 24);
console.log(edad == "24");
console.log(edad === "24");

/**
 *
 * Los operadores lógicos nos permiten concatenar expresiones que en conjunto retornar true o false
 * && devuelve true, solo si ambas expresiones devuelven true
 * || devuelve true, si alguna de las expresiones devuelve true
 * ! niega la expresión a la cual evalua
 */

console.log('\nOPERADORES LÓGICOS');
console.log('====================================================================================');

console.log(24 == 24 && "hola" == "hola");
console.log(24 == 24 || 13 === "13");
console.log(!true);

/**
 *
 * El condicional if evalua una expresión booleana la cual si devuelve true ejecutara
 * el bloque de código definido entre llaves, para evaluear multiples condiciones se
 * utiliza la condicional else if, en caso de no cumplirse ninguna condición se utiliza
 * else, este sería el caso por defecto.
 */

console.log('\nCONDICIONALES');
console.log('====================================================================================');

let calificacion = 10;

if(calificacion == 10) {
  console.log('Excelente');
} else if(calificacion > 7) {
  console.log('Muy bien');
} else if(calificacion > 5) {
  console.log('Puedes mejorar');
} else {
  console.log('Reprobado');
}

/**
 *
 * Los ciclos son instrucciones que ejecutan un bloque de código un numero especifico
 * de veces siempre y cuando la expresión booleana que estan eveluando devuelva un true
 */

console.log('\nCICLOS');
console.log('====================================================================================');

for(let i = 1; i <= 10; i++) {
  console.log(i);
}

for(let i = 1; i <= 10; i++) {
  if(i >= 5) break;
  console.log(i);
}

for(let i = 1; i <= 10; i++) {
  if(i%2 == 0) continue;
  console.log(i);
}

let i = 0;
while(i <= 10) {
  console.log(i);
  i++;
}

i = 0;
do {
  console.log(i);
  i++;
} while(i <= 10);

/**
 *
 * undefined indica que no se le ha asignado valor a un espacio de memoria declarado.
 * null indica la ausencia de valor, pero este puede ser asignable
 * NaN indica que el valor no es un numero
 */

console.log('\nUNDEFINED, NULL, NAN');
console.log('====================================================================================');

let numero;
console.log(typeof numero);

numero = null;
console.log(typeof numero);

console.log('numero' * 3);
console.log(100 / 0);
