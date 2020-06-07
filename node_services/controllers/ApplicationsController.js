const buildParams = require('./helpers').paramsBuilder;
const validParams = ['origins', 'name'];
const Application = require('../models/Application');

function find(request, response, next) {
    Application.findById(request.params.id).then(application => {
        request.mainObj = application;
        request.application = application;
        next();
    }).catch(next);
}

function index(request, response) {

}

function create(request, response) {
    let params = buildParams(validParams, request.body);
    Application.create(params).then(application => {
        response.json(application);
    }).catch(error => {
        response.status(422).json({error});
    })
}

function destroy(request, response) {
    request.application.remove().then(doc => {
        response.json({});
    }).catch(error => {
        response.status(500).json({error});
    });
}

module.exports = { find, index, create, destroy }