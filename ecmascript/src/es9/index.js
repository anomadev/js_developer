/**
 * Operador de reposo
 */

const saint = {
  name: 'seiya',
  level: 'bronze',
  cloth: 'pegasus'
}

let {cloth, ...all} = saint;
console.log(cloth, all);

/**
 * Promise.finally
 */

const helloworld = () => {
  return new Promise((resolve, reject) => {
    (true)
      ? resolve('Hello World')
      : reject(new Error('Test Error'))
  });
};

helloworld()
  .then(response => console.log(response))
  .catch(error => console.log(error))
  .finally(() => console.log('Proceso finalizado'))

/**
 * Regex
 */

const regexData = /([0-9]{4})-([0-9]{2})-([0-9]{2})/
const match = regexData.exec('2018-04-20');
const year = match[1];
const month = match[2];
const day = match[3];

console.log(year, month, day);