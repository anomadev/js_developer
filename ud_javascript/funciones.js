// Funciones
function helloWorld() {
  console.log("Hello World!!");
}

helloWorld();

// Funciones Flecha
const sum = (num1, num2) => (num1 + num2);
const result = sum(10, 20);
console.log(result);

const message = name => 'Hola soy ' + name;
const grettings = message('Cristhofer');
console.log(grettings);

const square = (base = 1) => {
  console.log(base * base);
}
square();

// Template Strings
const multiplicate = (num1, num2) => {
  return `el resultado es: ${num1 * num2}`;
}
const multiplication = multiplicate(4, 5);
console.log(multiplication);