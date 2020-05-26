/**
 *
 * let y const tienen alcance de bloque de código más proximo es decir al bloque
 * de la condición o función en la que es declarada en caso de hacerlo en scope local.
 *
 * var tiene alcance de la función más proxima, es decir todo el scope local.
 */


let alcanceGlobal = "Estoy en todo tu programa";

function saludo() {
  defaultGlobal = "No deberias declararme de esta manera";
  let alcanceLocal = "Solo puedes acceder desde la funcion saludo\n";
  console.log(alcanceLocal,"Hola por cierto!!");
}

console.log(alcanceGlobal);
saludo();
console.log(defaultGlobal);
