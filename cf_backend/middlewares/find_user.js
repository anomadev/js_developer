const User = require('../models').User;

module.exports = function(request, response, next) {
    if(!request.session.userId) return next();

    User.findByPk(request.session.userId).then(user => {
        if(user) {
            request.user = user;
            next();
        }
    });
}