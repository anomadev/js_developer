/**
 * "let": no nos permite declarar dos veces la misma variable pero si modificar
 * su valor, caso contrario de una constante. Tiene un alcance de bloque a
 * diferencia de "var" que tiene un scope global
 */

let edad = 10;

if (true) {
  let edad = 20;
  console.log(edad);
}

console.log(edad);

/**
 * cuando declaramos objetos o arrays y utilizamos funciones que estan modificando
 * esa raiz se nos permite realizar dicha acción incluso con una declaración const
 * pueden ser modificadas dentro de sus propiedades
 */

const arrayNumero = [10, 20, 30];
arrayNumero.push(40);
console.log(arrayNumero);

const persona = {
  nombre: "Cristhofer",
  edad: 29,
};

persona.edad = 28;
persona.pais = "México";
console.log(persona);
