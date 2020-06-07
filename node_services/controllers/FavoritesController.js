const buildParams = require('./helpers').paramsBuilder;
const validParams = ['_place'];
const FavoritePlace = require('../models/FavoritePlace');
const User = require('../models/User');

function find(request, response, next) {
    FavoritePlace.findById(request.params.id).then(favorite => {
        request.mainObj = favorite;
        request.favorite = favorite;
        next();
    }).catch(next);
}

function index(request, response) {
    if(!request.fullUser) return response.json({});
    request.fullUser.favorites.then(places => {
        response.json(places);
    }).catch(err => {
        console.log(err);
        response.json(err);
    });
}

function create(request, response) {
    let params = buildParams(validParams, request.body);
    params['_user'] = request.user.id;

    FavoritePlace.create(params).then(favorite => {
        response.json(favorite);
    }).catch(error => {
        console.log(error);
        response.status(422).json({error})
    });
}

function destroy(request, response) {
    request.favorite.remove().then(doc => {
        response.json({});
    }).catch(error => {
        console.log(error);
        response.status(500).json({error})
    });
}

module.exports = { create, find, destroy, index }