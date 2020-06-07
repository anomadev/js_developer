const Place = require('../models/Place');
const upload = require('../config/upload');
const helpers = require('./helpers');

const validParams = ['title', 'description', 'address', 'acceptsCreditCard', 'openHour', 'closeHour'];

function find(request, response, next) {
    Place.findOne({slug: request.params.id}).then(place => {
        request.place = place;
        request.mainObj = place;
        next();
    }).catch(err => {
        console.log(err);
        next(err);
    });
}

function index(request, response) {
    Place.paginate({}, {
        page: request.query.page || 1,
        limit: 8,
        sort: { '_id': -1 }
    }).then(docs => {
        response.json(docs);
    }).catch(err => {
        console.log(err);
        response.json(err);
    });
}

function create(request, response, next) {
    const params =  helpers.paramsBuilder(validParams, request.body);
    params['_user'] = request.user.id;
    Place.create(params).then(doc => {
        request.place = doc;
        next();
    }).catch(err => {
        console.log(err);
        next(err);
    });
}

function show(request, response) {
    response.json(request.place);
}

function update(request, response) {
    const params = helpers.paramsBuilder(validParams, request.body);
    request.place = Object.assign(request.place, params);
    request.place.save().then(result => {
        response.json(result);
    }).catch(err => {
        console.log(err);
        response.json(err);
    });
}

function destroy(request, response) {
    request.place.remove().then(result => {
        response.json({});
    }).catch(err => {
        console.log(err);
        response.json(err);
    });
}

function multerMiddleware() {
    return upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'cover', maxCount: 1 }
    ]);
}

function saveImage(request, response) {
    if(request.place) {
        const files = ['avatar', 'cover'];
        const promises = [];

        files.forEach(imageType => {
            if(request.files && request.files[imageType]) {
                const path = request.files[imageType][0].path;
                promises.push(request.place.updateImage(path, imageType));
            }
        });

        Promise.all(promises).then(results => {
            response.json(request.place);
        }).catch(err => {
            console.log(err);
            response.json(err);
        });
    } else {
        response.status(422).json({
            error: request.error || 'Could not save place'
        });
    }
}

module.exports = { index, create, show, update, destroy, find, multerMiddleware, saveImage };