const expressUnless = require('express-unless');

module.exports = function(options) {
    let CORsMiddleware = function(request, response, next) {
        if(request.application) {
            request.application.origins.split(',').forEach(origin => {
                response.header("Access-Control-Allow-Origin", origin)
            })
        } else {
            response.header("Access-Control-Allow-Origin", "*");
        }
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Application");
        next();
    }

    CORsMiddleware.unless = expressUnless;
    return CORsMiddleware;
}