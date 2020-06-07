const Application = require('../models/Application');

module.exports = function(options) {
    let AuthApp = function(request, response, next) {
        Application.count({}).then(appCount => {
            if(appCount > 0 && !request.application) return next(new Error('An application is required to consume this API'));
            if(!request.validRequest) return next(new Error('Origin Invalid'));
            next();
        }).catch(next);
    }

    AuthApp.unless = require('express-unless');
    return AuthApp;
}
