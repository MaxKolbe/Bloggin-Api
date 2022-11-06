const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = "mongodb+srv://Maxmilian:Theodd3sout@cluster0.9l99fwv.mongodb.net/?retryWrites=true&w=majority";

// connect to mongodb
function connectToMongoDB() {
    mongoose.connect(MONGODB_URI);

    mongoose.connection.on('connected', () => {
        // console.log('Connected to MongoDB successfully');
    });

    mongoose.connection.on('error', (err) => {
        // console.log('Error connecting to MongoDB', err);
    })
}

module.exports = { connectToMongoDB };
