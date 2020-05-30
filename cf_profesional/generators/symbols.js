let simbolo =  Symbol('miSimbolo');
let obj = {};

obj[simbolo] = function() {
  console.log("Mi nombre es un simbolo");
}
obj[simbolo]();
