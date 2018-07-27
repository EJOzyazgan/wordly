var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/worldly');

module.exports = {mongoose};