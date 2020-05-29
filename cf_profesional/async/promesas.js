const rp = require('request-promise');

rp('http://google.com').then(function(html) {
  console.log('Termine la petición al sitio');
}).catch(function(err) {
  console.log(err);
});
