const express = require('express');
const jwtMiddleware = require('express-jwt');
const secrets = require('../config/secrets');
let router = express.Router();

const authenticateOwner = require('../middlewares/authenticateOwner');
const visitsController = require('../controllers/VisitsController');

router.route('/')
    .get(jwtMiddleware({secret: secrets.jwtSecret}), visitsController.index)
    .post(visitsController.create);

router.route('/:visit_id')
    .delete(visitsController.find, authenticateOwner, visitsController.destroy);

module.exports = router;