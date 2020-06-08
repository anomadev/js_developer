/**
 *
 * Cuando se declara un tipo de dato unión espeficamos los tipos de datos que
 * puede contener la variable, el caracter "|" separa cada uno de los tipos 
 *
 */

let age: number | string;
age = 20;
age = "30";

age.toString();

/**
 *
 * Los guardianes tipo lo que hace a una función un guardian de tipo es el
 * tipo de valor que retorna, a esta parte se llama predicado de tipo.
 * La siguiente función se convierte en un guardian de tipo para number.
 *
 */

function isNumber(obj: number | string): obj is number {
  // al usar typeof en una función creamos un guardian de tipo
  return typeof obj === 'number';
}

function isString(obj: number | string): obj is string {
  return typeof obj === 'string';
}

function printAge(age: number | string ) {
  if (isNumber(age)) {
    // typescript empieza a manejar el dato como number y no como union
  } else {
    age.charAt(0);
    // typescript empieza a manejar el dato como string y no como union
  }
}

/**
 *
 * Podemos combinar dos tipos de datos en una sola variable con los datos de
 * tipo intersección, el cual adopta las propiedades y metodos de ambos tipos
 *
 * Los type assertions no cambian el objeto solo cambian el tipo que el 
 * compilador les habia dado.
 */

class User {
  name: string;
}

class Admin {
  permission: number;
}

let user: User & Admin;
user.name = "Cristhofer";
user.permission = 5;

user = new User() as User&Admin; // type assertion

/**
 *
 * Los alias de tipo son un alias para el tipo de dato presente
 *
 */

type numero = number;
let edad: numero;
edad = 20


type NumberOrString = number | string;
let _age: NumberOrString;

type FuncString = () => string;
function executor(f: FuncString) {}
executor(() => "Hola");

/**
 *
 * Son un tipo de arreglo particular en el que se definen los tipos para las
 * primeras posiciones y para los siguientes se usa la unión de los primeros tipos
 *
 */

let tupla: [string, number];

tupla[0] = "20";
tupla[1] = 20;

/**
 *
 * El proposito de los enum es tomar un conjunto de valores numericos y asignarles
 * un nombre que nos permita ubicarlo de una manera mas clara y expresiva
 *
 */

enum Tallas {Chica = 1, Mediana = 2, Grande = 3}

class Pedido {
  talla: number;
}

let pedido: Pedido = new Pedido();
pedido.talla = Tallas.Mediana;

enum PaymentState {Creado, Pagado, Deuda}
console.log(PaymentState.Pagado);
