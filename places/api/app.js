var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Models
const Place = require('./models/Place');

// Database
const db = require('./config/database');
db.connect();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/places', (request, response) => {
  Place.create({
    title: request.body.title,
    description: request.body.description,
    acceptsCreditCard: request.body.acceptsCreditCard,
    openHour: request.body.openHour,
    closeHour: request.body.closeHour
  }).then(doc =>{
    response.json(doc);
  }).catch(err => {
    console.log(err);
    response.json(err);
  });
});

app.get('/places', (request, response) => {
  Place.find({}).then(docs => {
    response.json(docs);
  }).catch(err => response.json(err));
});

app.get('/places/:id', (request, response) => {
  Place.findById(request.params.id).then(result => {
    response.json(result);
  }).catch(err => response.json(err));
});

app.put('/places/:id', (request, response) => {
  let attributes = ['title', 'description', 'acceptsCreditCard', 'openHour', 'closeHour'];
  let placeParams = {};

  attributes.forEach(attr => {
    if(Object.prototype.hasOwnProperty.call(request.body, attr))
      placeParams[attr] = request.body[attr];
  });

  Place.findByIdAndUpdate(request.params.id, placeParams, { new: true }).then(result => {
    response.json(result);
  }).catch(err => response.json(err));
});

app.delete('/places/:id', (request, response) => {
  Place.findByIdAndRemove(request.params.id).then(result => {
    response.json({});
  }).catch(err => response.json(err));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
