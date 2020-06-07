const Application = require('../models/Application');

module.exports = function(request, response, next) {
    if(request.xhr) return next();

    const secret = request.headers.secret;
    if(!secret) return next();

    Application.findOne({secret}).then(application => {
        if(!application) return next(new Error('Invalid Application'));
        request.application = application;
        request.validRequest = true;
        next();
    }).catch(error => {
        next(error);
    });
}