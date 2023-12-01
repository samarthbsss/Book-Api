const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', true);

const mongodb = process.env.mongoURI;

const connection = mongoose.connect(mongodb)
module.exports = {
    connection
}