const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let places = [
  {
    'title': 'ECode SA de CV',
    'description': 'Lorem Ipsum',
    'address': 'Lorem Ipsum'
  },
  {
    'title': 'Ahicam SA de CV',
    'description': 'Lorem Ipsum',
    'address': 'Lorem Ipsum'
  },
  {
    'title': 'Utrack SA de CV',
    'description': 'Lorem Ipsum',
    'address': 'Lorem Ipsum'
  },
  {
    'title': 'CleanUp SA de CV',
    'description': 'Lorem Ipsum',
    'address': 'Lorem Ipsum'
  },
]

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));
// directorio para servir archivos estaticos
app.use(express.static('public'));

app.get('/', (request, response) => {
  response.json(places);
});

app.post('/', (request, response) => {
  response.json(request.body);
});

app.listen(3000, function() {
  console.log('Server Runs!!');
});
