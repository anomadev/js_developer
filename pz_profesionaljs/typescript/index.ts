// arreglos
let people: string[] = [];
people = ['Isabel', 'Nicole', 'Raul'];
// people.push(9000);

let peopleAndNumbers: Array<string | number> = [];
peopleAndNumbers.push("Ricardo")
peopleAndNumbers.push("Pablo")
peopleAndNumbers.push(700)

// enum: conjunto de valores denotados
enum Color {
  Rojo = "Rojo",
  Verde = "Verde",
  Azul = "Azul"
}

let colorFavorito:  Color = Color.Azul;
console.log(`Mi color favorito es ${colorFavorito}`);

// any
let comodin: any = "Jocker";
comodin = { type: "Wildcard" };

// funciones
function add(a: number, b: number): number {
  return a + b;
}

const sum = add(4, 6);

function createAdder(a: number): (number) => number {
  return function(b: number) {
    return a + b;
  };
}

const addFour = createAdder(4);
const fourPlusSix = addFour(6);

// funciones con parametros opcionales
function fullName(firstName: string, lastName?: string): string {
  return `${firstName} ${lastName}`;
}

const anomadev = fullName("Cristhofer");

// Interfaces
interface Rectangulo {
  ancho: number;
  alto: number;
  color?: Color,
}

let rect: Rectangulo = {
  ancho: 4,
  alto: 6,
}

function area(r: Rectangulo): number {
  return r.alto * r.ancho;
}

const areaRect = area(rect);
console.log(areaRect);

rect.toString = function() {
  return this.color ? `Un rectangulo ${this.color}`: `Un rectangulo`;
}

console.log(rect.toString());