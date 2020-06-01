const express = require('express');
let TasksController = require('../controllers/tasks');
let router = express.Router();

// recurso de tipo colección porque identifica a un grupo de recursos
router.route('/tasks').get(TasksController.index).post(TasksController.create);
router.get('/tasks/new', TasksController.new);
router.get('/tasks/:id/edit', TasksController.edit);
router.route('/tasks/:id').get(TasksController.show).put(TasksController.update).delete(TasksController.destroy);

module.exports = router;