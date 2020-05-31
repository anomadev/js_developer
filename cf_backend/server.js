const express = require('express');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const sqlite = require('sqlite3');
const Sequelize = require('sequelize');

const app = express();
const sequelize = new Sequelize('cfbackend', null, null, {
   dialect: 'sqlite',
   storage: './db/cfbackend'
});

app.set('view engine', 'ejs');
app.use('/public', express.static('assets', {
   etag: false,
   maxAge: '5h'
}));
app.use(cookieSession({
   name: 'session',
   keys: ['5j3dsje438dsd', '303jr95jdj848wbeiso']
}));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(request, response) {
   response.render('index');
});

app.get('/html', function(request, response) {
   response.sendFile('index.html', {
      root: __dirname + "/html/"
   });
});

app.get('/visits', function(request, response) {
   request.session.visits = request.session.visits || 0;
   request.session.visits = request.session.visits + 1;
   response.send(`${request.session.visits} visita(s)`);
});

app.post('/pendientes', function(request, response) {
   response.send('Inserción Finalizada');
});

app.listen(3000);