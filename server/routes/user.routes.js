const express = require('express');
const router = express.Router();
const {mongoose, ObjectID} = require('./../db/mongoose');
const {Location} = require('../models/location');
const {User} = require('../models/user');

router.post('/create', async(req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        friends: req.body.friends,
        profile: req.body.profile
    });

    user.save();
    res.send(user);
});

router.post('/login', async (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);

    await User.findByCredentials(body.email, body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            res.status(200).json({
                message: 'User Logged In Successfully',
                token: token,
                userId: user.id,
                user: user
            });
        });
    }).catch((e,doc) => {
        res.status(400).send();
    });
});

module.exports = router;