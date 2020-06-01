const Task = require('../models').Task;

module.exports = {
    index: function(request, response) {
        Task.findAll().then((tasks) => {
            response.render('tasks/index', {tasks: tasks});
        });
    },
    create: function(request, response) {
        Task.create({
            description: request.body.description
        }).then(result => {
            response.json(result);
        }).catch(err => {
            console.log(err);
            response.json(err);
        })
    },

    new: function(request, response) {
        response.render('tasks/new');
    },

    show: function(request, response) {
        Task.findByPk(request.params.id).then(function(task) {
            response.render('tasks/show', {task: task});
        });
    },

    edit: function(request, response) {
        Task.findByPk(request.params.id).then(function(task) {
            response.render('tasks/edit', {task: task});
        });
    },

    update: function(request, response) {
        Task.update({description: request.body.description}, {
            where: {
                id: request.params.id
            }
        }).then(function(result) {
            response.redirect('/tasks/' + request.params.id);
        });
    },

    destroy: function(request, response) {
        Task.destroy({
            where: {
                id: request.params.id
            }
        }).then(function(result) {
            response.redirect('/tasks');
        });
    }
};