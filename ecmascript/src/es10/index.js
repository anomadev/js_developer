/**
 * Array.flat
 */

let array = [1,2,3, [1,2,3, [1,2,3]]];
console.log(array.flat(2));

/**
 * Array.flatMap
 */

let array = [1,2,3,4,5];
console.log(array.flatMap(value => [value, value * 2]));

/**
 * trimStart & trimEnd
 */

let hello = '     hello world';
console.log(hello);
console.log(hello.trimStart);

let hello = 'hello world     ';
console.log(hello);
console.log(hello.trimEnd);

/**
 * fromEntries
 */

let entries = [['name', 'anomadev'], ['age', 32]];
console.log(Object.fromEntries(entries));

/**
 * Symbol.description
 */

let mySymbol = `My Symbol`;
let symbol = Symbol(mySymbol);
console.log(symbol.description);