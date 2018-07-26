const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  friends: {
    type: [String],
    required: true
  },
  trips: {
    type: [String],
    required: true
  },
  profile: {
    type: String,
    required: true
  }
});

let User = mongoose.model('User', UserSchema);

module.exports = {User}; 
