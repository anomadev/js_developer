/**
 * Default Params
 */

function createUser(name = "Cristhofer", age = 30, country = "MX") {
  console.log(name, age, country);
}

createUser();
createUser("anomadev", 30, "NZ");

/**
 * Templates Literal
 */

let hello = "Hello";
let world = "World";
let phrase = `${hello} ${world}`;

console.log(phrase);

/**
 * Multilinea
 */

let lorem = `Magna pariatur ex velit mollit magna enim veniam minim.
Voluptate officia eiusmod consequat incididunt officia dolore labore voluptate aliqua proident sint.
Ad mollit duis excepteur exercitation irure consequat sit ipsum anim proident commodo excepteur eiusmod excepteur.`;

console.log(lorem);

/**
 * Desestructuracion de elementos
 */

let person = {
  'name': 'anomadev',
  'age': 30,
  'country': 'MX'
}

let {name, age, country} = person;
console.log(name, age, country);

/**
 * Spread Operator
 */

let teamOne = ['Charmander', 'Bulbasaur', 'Squirtle'];
let teamTwo = ['Cyndaquil', 'Chikorita', 'Totodile'];
let pokemon = ['Pikachu', ...teamOne, ...teamTwo];

console.log(pokemon);

/**
 * Propiedad de objetos mejorada
 */

let name = 'Cristhofer';
let age = 30;

obj = {name, age};
console.log(obj);

/**
 * Arrow functions
 */

let digimons = [
  {name: 'Agumon', level: 'child'},
  {name: 'Gabumon', level: 'child'}
];

let digiNames = digimons.map(item => console.log(item.name));

/**
 * Promesas
 */

const helloPromise = () => {
  return new Promise((resolve, reject) => {
    if (true) {
      resolve('Hey!');
    } else {
      reject('Ups!');
    }
  });
}

helloPromise()
  .then(response => console.log(response))
  .catch(error => console.log(error));

  /**
   * Clases
   */

class calculator {
  constructor() {
    this.valueA = 0;
    this.valueB = 0;
  }

  sum(valueA, valueB) {
    this.valueA = valueA;
    this.valueB = valueB;

    return this.valueA + this.valueB;
  }
}

const calc = new calculator();
console.log(calc.sum(2,2));

/**
 * Modulos
 */

import {hello} from './module';
hello();

/**
 * Generadores
 */

function* helloWorld() {
  if (true) {
    yield 'Hello, ';
  }

  if (true) {
    yield 'World';
  }
};

const generatorHello = helloWorld();
console.log(generatorHello.next().value);
console.log(generatorHello.next().value);
console.log(generatorHello.next().value);