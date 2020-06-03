const express = require('express');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const sqlite = require('sqlite3');
const Sequelize = require('sequelize');
const methodOverride = require('method-override');
const session = require('express-session');

const app = express();

const tasksRoutes = require('./routes/tasks_routes');
const registrationsRoutes = require('./routes/registration_routes');
const categoriesRoutes = require('./routes/categories_routes');
const sessionsRoutes = require('./routes/sessions_routes');
const socketio = require('socket.io');

const findUserMiddleware = require('./middlewares/find_user');
const authUserMiddleware = require('./middlewares/auth_user');

app.set('view engine', 'pug');
/*app.use('/public', express.static('assets', {
   etag: false,
   maxAge: '5h'
}));
app.use(cookieSession({
   name: 'session',
   keys: ['5j3dsje438dsd', '303jr95jdj848wbeiso']
}));*/
app.use(session({
   secret: ['25svdi3c8rq98zxc', '2rm38d0ndoe1i3'],
   saveUninitialized: false,
   resave: false
}));
app.use(findUserMiddleware);
app.use(authUserMiddleware);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(tasksRoutes);
app.use(registrationsRoutes);
app.use(categoriesRoutes);
app.use(sessionsRoutes);

app.get('/', function(request, response) {
   response.render('home', { user: request.user });
});

/*app.get('/', function(request, response) {
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
});*/

let server = app.listen(3000);
let io = socketio(server);
let sockets = {};
let usersConn = 0;

io.on('connection', function (socket) {
   let userId = socket.request._query.loggeduser;
   if(userId) sockets[userId] = socket;
   console.log(sockets);

   usersConn++;
   io.emit('count_updated', { count: usersConn });
   socket.on('new_task', function (data) {
      if(data.userId) {
         let userSocket = sockets[userId];
         if(!userSocket) return;

         userSocket.emit('new_task', data);
      }
   });

   socket.on('disconnect', function() {
      Object.keys(sockets).forEach(userId => {
         let s = sockets[userId];
         if(s.id == socket.id) sockets[userId] = null;
      });

      console.log(sockets);

      usersConn--;
      io.emit('count_updated', { count: usersConn });
   });
});

const client = require('./realtime/client');