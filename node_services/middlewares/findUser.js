const User = require('../models/User');

module.exports = function(request, response, next) {
    if(request.user) {
        User.findById(request.user.id).then(user => {
            request.fullUser = user;
            next();
        });
    } else {
        next();
    }
}