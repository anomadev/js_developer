const Task = require('../models').Task;

module.exports = {
    index: function(request, response) {
        Task.findAll().then((tasks) => {
            response.render('tasks/index', {tasks: request.user.tasks});
        });
    },

    create: function(request, response) {
        Task.create({
            description: request.body.description,
            userId: request.user.id
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
        Task.findByPk(request.params.id, {
            include: ['user', 'categories']
        }).then(function(task) {
            response.render('tasks/show', {task: task});
        });
    },

    edit: function(request, response) {
        Task.findByPk(request.params.id).then(function(task) {
            response.render('tasks/edit', {task: task});
        });
    },

    update: function(request, response) {
        let task = Task.findByPk(request.params.id).then(task => {
            task.description = request.body.description;
            task.save().then(() => {
                let categoryIds = request.body.categories.split(",");
                task.addCategories(categoryIds).then(() => {
                    response.redirect(`/tasks/${task.id}`);
                });
            });
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