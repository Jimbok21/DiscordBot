const mongoose = require('mongoose');
require('dotenv').config();

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
        };

        mongoose.connect(`mongodb+srv://jimbok21:${process.env.PASS}@cluster0.warvu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, dbOptions);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log('connected to the database');
        });

        mongoose.connection.on('disconnected', () => {
            console.log('disconnected to the database');
        });

        mongoose.connection.on('err', () => {
            console.log('error connecting to database ' + err);
        });
    }
}