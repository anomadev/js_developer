console.log('ASYNC');
console.log('===============================================================');

async function sum(a, b) {
  return a + b;
}

console.log(sum(3, 3));

console.log('\nAWAIT');
console.log('===============================================================');

(async function() {
  let resultado = await new Promise((resolve, reject) => {
    setTimeout(resolve, 400, 5)
  });

  let resultadoDos = await new Promise((resolve, reject) => {
    setTimeout(resolve, 400, 10)
  });

  console.log(resultado +  resultadoDos);
})();

async function showGitHubRepos() {
  let response = await fetch('https://api.github.com/users/anomadev/repos');
  let repos = await response.json();
  console.log(repos);
}

showGitHubRepos();

console.log('\nERRORS');
console.log('===============================================================');

(async function() {
  try {
    let promesa = await Promise.reject("Error");
    let promesaDos = await Promise.reject("Error");
  } catch (err) {
    console.log(err);
  }
})();
