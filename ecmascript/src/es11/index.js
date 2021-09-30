const button = document.getElementById("btn");

button.addEventListener("click", async function () {
  const module = await import("./file.js");
  module.hello();
});

/**
 * Big Int
 */

const bigNumberOne = 9007199254740991n;
const bigNumberTwo = BigInt(9007199254740991);

console.log(bigNumberOne);
console.log(bigNumberTwo);

/**
 * Promise All Settled
 */

const promise1 = new Promise((resolve,reject) => reject("reject"));
const promise2 = new Promise((resolve,reject) => resolve("resolve"));
const promise3 = new Promise((resolve,reject) => resolve("resolve 1"));

Promise.allSettled([promise1, promise2, promise3])
  .then(response => console.log(response));

/**
 * Global This
 */

console.log(globalThis);

/**
 * Null Operator
 */

const foo = null ?? 'default string';
console.log(foo);

/**
 * Optional chaining
 */

const user = {};
console.log(user?.profile?.email);

if (user?.profile?.email) {
  console.log('Email');
} else {
  console.log('Fail');
}