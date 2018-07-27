const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/worldly', { useNewUrlParser: true }, (err, db) => {
    if(err){
        console.log("DB Error", err);
        return;
    }

    console.log("Connected");
});

module.exports = {mongoose};