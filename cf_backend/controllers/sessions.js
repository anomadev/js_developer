const User = require('../models').User;

module.exports = {
    new: function(request, response) {
        response.render('sessions/new');
    },

    create: function(request, response) {
        User.login(request.body.email, request.body.password).then(user => {
            if(user) {
                request.session.userId = user.id;
            }
            response.json(user);
        }).catch(err => {
            response.json(err);
        });
    },

    destroy: function(request, response) {
        request.session.destroy(function() {
            response.redirect('/sessions');
        });
    }
}