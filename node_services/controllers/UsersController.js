const User = require('../models/User');
const buildParams = require('./helpers').paramsBuilder;
const validParams = ['email', 'name', 'password'];

function create(request, response, next) {
    let params = buildParams(validParams, request.body);
    User.create(params).then(user => {
        request.user = user;
        next();
    }).catch(error => response.status(422).json({error}));
}

function myPlaces(request, response) {
    User.find({'_id': request.user.id}).then(user => {
        user.places.then(places => {
            response.json(places);
        }).catch(err => response.json(err));
    });
}

module.exports = { create, myPlaces }