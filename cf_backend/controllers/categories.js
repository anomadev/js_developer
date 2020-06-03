const Category = require('../models').Category;

module.exports = {
    create: function(request, response) {
        Category.create({
            title: request.body.title,
            color: request.body.color
        }).then(result => {
            response.json(result);
        }).catch(err => {
            console.log(err);
            response.json(err);
        });
    },

    new: function(request, response) {
        response.render('categories/new');
    },

    index: function(request, response) {
        Category.findAll().then(function(categories) {
            response.render('categories/index', {categories: categories});
        });
    },

    show: function(request, response) {
        Category.findByPk(request.params.id).then(function(category) {
            response.render('categories/show', {category: category});
        });
    },

    update: function(request, response) {
        Category.update({
            title: request.body.title,
            color: request.body.color
        }, {
            where: {
                id: request.params.id
            }
        }).then(function(result) {
            response.redirect('/categories/' + request.params.id);
        });
    },

    edit: function(request, response) {
        Category.findByPk(request.params.id).then(function(category) {
            response.render('categories/edit', {category: category});
        });
    },

    destroy: function(request, response) {
        Category.destroy({
            where: {
                id: request.params.id
            }
        }).then(function(elementDeleted) {
            response.redirect('/categories');
        });
    }
};