const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

let UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    friends: {
        type: [String],
        default: []
    },
    profile: {
        type: String,
        default: ""
    }
});

UserSchema.pre('save', function (next) {
    let user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

UserSchema.statics.findByCredentials = function (email, password) {
    let User = this;

    return User.findOne({email}).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {

                    resolve(user);
                } else {
                    reject();
                }
            })
        });
    }).catch((e) => {
    });
};

let User = mongoose.model('User', UserSchema);

module.exports = {User}; 
