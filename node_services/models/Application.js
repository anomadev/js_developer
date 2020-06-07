const mongoose = require('mongoose');
const randomstring = require('randomstring');

function assignRandomAndUniqueValueToFields(app, field, next) {
    const randomString = randomstring.generate(20);

    let searchCriteria = {};
    searchCriteria[field] = randomString;

    Application.count(searchCriteria).then(count => {
        if(count > 0) return assignRandomAndUniqueValueToFields(app, field, next);
        app[field] = randomString;
        next();
    });
}

let applicationSchema = new mongoose.Schema({
    applicationId: {
        type: String,
        required: true,
        unique: true
    },
    secret: {
        type: String,
        required: true,
        unique: true
    },
    origins: String,
    name: String
});

applicationSchema.pre('validate', function(next){
    assignRandomAndUniqueValueToFields(this, 'applicationId', () => {
        assignRandomAndUniqueValueToFields(this, 'secret', next);
    });
});

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;