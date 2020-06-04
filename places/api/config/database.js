const mongoose = require('mongoose');
const dbName = 'placesApi';

module.exports = {
    connect: () => mongoose.connect('mongodb://mongo:27017/' + dbName, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
        console.log('MongoDB Connected...');
    }).catch((err) => console.log(err)),
    dbName: dbName,
    connetion: () => {
        if(mongoose.connection)
            return mongoose.connection;
        return mongoose.connect();
    }
}