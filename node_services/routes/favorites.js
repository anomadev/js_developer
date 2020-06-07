const express = require('express');
const jwtMiddleware = require('express-jwt');
const secrets = require('../config/secrets');

let router = express.Router();

const authenticateOwner = require('../middlewares/authenticateOwner');
const favoritesController = require('../controllers/FavoritesController');

router.route('/').get(jwtMiddleware({secret: secrets.jwtSecret}), favoritesController.index).post(favoritesController.create);
router.route('/:id').delete(favoritesController.find, authenticateOwner, favoritesController.destroy);

module.exports = router;