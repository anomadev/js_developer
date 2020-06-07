const Application = require('../models/Application');

module.exports = function(request, response, next) {
    if(request.application) return next();

    const applicationId = request.headers.application;

    if(!applicationId) return next();

    Application.findOne({applicationId}).then(app => {
        if(!app) return next(new Error('Invalid Application'));
        request.application = app;

        request.validRequest = request.application.origins.split(",").find(origin => {
            origin = origin.replace('/\s/g', '');
            console.log(request.headers.origin);
            return origin == request.headers.origin;
        })
        next();
    }).catch(next);
}