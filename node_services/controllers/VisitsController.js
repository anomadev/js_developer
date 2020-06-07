const buildParams = require('./helpers').paramsBuilder;
const validParams = ['_place', 'reaction', 'observation'];

const Visit = require('../models/Visit');
const User = require('../models/User');

function find(request, response, next) {
    Visit.findById(request.params.visit_id).then(visit => {
        request.mainObj = visit;
        request.favorite = visit;
        next();
    }).catch(next);
}

function index(request, response) {
    let promise = null;
    if(request.place) {
        promise = request.place.visits;
    } else if(request.user) {
        promise = Visit.forUser(request.user.id, request.query.page || 1);
    }

    if(promise) {
        promise.then(visits => {
            response.json(visits);
        }).catch(error => {
            response.status(500).json({error});
        });
    } else {
        response.status(404).json({});
    }
}

function create(request, response) {
    let params = buildParams(validParams, request.body);
    params['_user'] = request.user.id;

    Visit.create(params).then(visit => {
        response.json(visit);
    }).catch(error => {
        response.status(422).json({error});
    });
}

function destroy(request, response) {
    request.visit.remove().then(doc => {
        response.json({});
    }).catch(error => {
        response.status(500).json({error});
    });
}

module.exports = {find, index, create, destroy}