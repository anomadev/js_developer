/**
 * Replace All
 */

const string = "JavaScript es maravilloso, con JavaScript puedo crear el futuro de la web";
const replacedString = string.replaceAll("JavaScript", "Python");
console.log(replacedString);

/**
 * Metodos privados
 */

class Messages {
  #show (val) {
    console.log(val);
  }
}

const message = new Messages();
message.show('Hola!');

/**
 * Promise.any
 */

const promise1 = new Promise((resolve, reject) => reject("1"));
const promise2 = new Promise((resolve, reject) => resolve("2"));
const promise3 = new Promise((resolve, reject) => resolve("3"));

Promise.any([promise1, promise2, promise3])
  .then(response => console.log(response));

/**
 * WeakRef
 */

class anyClass {
  constructor(element) {
    this.ref = new WeakRef(element);
  }
}

/**
 * Operadores Logicos Nuevos
 */

let isTrue = true;
let isFalse = false;

console.log(isTrue &&= isFalse);
console.log(isTrue ||= isFalse);

let isTrue = undefined;
console.log(isTrue ??= isFalse);