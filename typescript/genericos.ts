/**
 * 
 * Un tipo flexible que nos permiten trabajar con varios tipos de datos
 * distintos sin perder la integridad del tipado estatico.
 * 
 */

function genericReceptor<T>(obj: T) :T {
    return obj;
}

let cadena = genericReceptor<string>("Cristhofer");
let numero = genericReceptor<number>(29);

function printAll<T>(arr: T[]) {
    console.log(arr.length);
}

printAll<string>(["Hola", "Mundo"]);
printAll<number>([20, 25, 12]);
printAll<boolean>([true]);

/**
 * 
 * Genericos e Interfaces
 * Podemos usar cualquier tipo que cumpla con la estructura de la 
 * interface espeficada.
 */

interface Asset {
    x, y: number;
}

function generic<T extends Asset>(obj: T) {}

class Point {
    x: number;
    y: number;
}

generic<Point>(new Point());
