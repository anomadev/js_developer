/**
 * Object Entries
 */

const data = {
  jounin: 'Kakashi',
  chunin: 'Shikamaru',
  genin: 'Naruto'
}

const entries = Object.entries(data);
console.log(entries);
console.log(entries.length);

/**
 * Object Values
 */

const values = Object.values(data);
console.log(values);
console.log(values.length);

/**
 * Padding
 */

const string = 'hello';
console.log(string.padStart(7, 'hi'));
console.log(string.padEnd(12, ' -----'));

/**
 * Async Await
 */

const helloworld = () => {
  return new Promise((resolve, reject) => {
    (true)
      ? setTimeout(() => resolve('Hello World'), 3000)
      : reject(new Error('Test Error'))
  })
}

const helloAsyc = async() => {
  const hello = await helloworld();
  console.log(hello);
}

helloAsyc();

const anotherFunction = async () => {
  try {
    const hello = await helloworld();
    console.log(hello);
  } catch (error) {
    console.log(error);
  }
}

anotherFunction();