const request = require('request');

request('http://google.com', function() {
  console.log('Termine la peticion al sitio');
});

console.log('Me ejecuto despues del request al sitio');
