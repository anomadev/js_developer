// Una de las funcionalidades que brinfa fetch es el consumir un API
fetch('https://pokeapi.co/api/v2/pokemon')
  .then(response => response.json())
  .then(data => {
    console.log(data.results);
    data.results.forEach(element => {
      console.log(element.name);
    });
  })
  .catch(error => console.log(error));

  // async & await
  const obtenerPokemones = async() => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon');
      const data = await response.json();
      const arrayPokemon = data.results.map(pokemon => pokemon.name);
      console.log(arrayPokemon);
    } catch(error) {
      console.log(error);
    }
  }

  obtenerPokemones();