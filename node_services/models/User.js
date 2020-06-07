const mongoose = require('mongoose');
const mongooseBcrypt = require('mongoose-bcrypt');

// models
const Place = require('./Place');
const FavoritePlace = require('./FavoritePlace');

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    admin: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(mongooseBcrypt);

userSchema.post('save', function(user, next) {
    User.countDocuments({}).then(count => {
        if(count == 1) {
            User.update({'_id': user._id}, {admin:true}).then(result => {
                next();
            });
        }
    });
});

userSchema.virtual('places').get(function() {
    console.log(this._id);
   return Place.find({'_user': this._id });
});

userSchema.virtual('favorites').get(function() {
    return FavoritePlace.find({'_user': this._id}, {'_place': true}).then(favorites => {
        let placeIds = favorites.map(favorite => favorite.place);
        return Place.find({'_id': {$in: placeIds}});
    });
});

const User = mongoose.model('User', userSchema);
module.exports = User;