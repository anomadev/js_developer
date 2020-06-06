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

module.exports = { create }