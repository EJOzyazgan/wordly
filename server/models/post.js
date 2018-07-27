const mongoose = require('mongoose');

let PostSchema = new mongoose.Schema({
    text: {
        type: String,
        default: ""
    },
    picture: {
        type: String,
        default: ""
    },
    locationID: {
        type: String,
        required: true
    }
});

let Post = mongoose.model('Trip', PostSchema);

module.exports = {Post};
