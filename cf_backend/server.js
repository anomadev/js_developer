const express = require('express');
const cookieSession = require('cookie-session');
const app = express();

app.set('view engine', 'ejs');
app.use('/public', express.static('assets', {
   etag: false,
   maxAge: '5h'
}));
app.use(cookieSession({
   name: 'session',
   keys: ['5j3dsje438dsd', '303jr95jdj848wbeiso']
}));

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

app.listen(3000);