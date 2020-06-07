const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const User = require('../models/User');

function authenticate(request, response, next) {
    User.findOne({email: request.body.email}).then(user => {
        user.verifyPassword(request.body.password).then(valid => {
            if(valid) {
                request.user = user;
                next();
            } else {
                next(new Error('Invalid Credentials'));
            }
        })
    }).catch(error => {
        console.log(error);
        next(error);
    });
}

function generateToken(request, response, next) {
    if(!request.user) return next();
    request.token = jwt.sign({id: request.user.id}, secrets.jwtSecret);
    next();
}

function sendToken(request, response) {
    if(request.user) {
        response.json({
            user: request.user,
            jwt: request.token
        });
    } else {
        response.status(422).json({
            error: 'Could not create user'
        });
    }
}

module.exports = { generateToken, sendToken, authenticate }