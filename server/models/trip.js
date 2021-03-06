const mongoose = require('mongoose');

let TripSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    }
});

let Trip = mongoose.model('Trip', TripSchema);
  
module.exports = {Trip};
