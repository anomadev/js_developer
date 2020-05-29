let p1 = new Promise((resolve, reject) => setTimeout(resolve, 500, 'Hola Mundo'));
let p2 = new Promise((resolve, reject) => setTimeout(resolve, 600, 'Segundo Hola Mundo'));
let p3 = Promise.reject();

Promise.all([p1, p2, p3]).then(resultados => {
  console.log(resultados);
  saluda();
}).catch(() => console.log('Falle!! :('));
