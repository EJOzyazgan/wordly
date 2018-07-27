const express = require('express');
const router = express.Router();
const {mongoose, ObjectID} = require('./../db/mongoose');
const {User} = require('../models/user');
const _ = require('lodash');
const {authenticate} = require('./../middleware/authenticate');

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
        console.log('Hello');
        res.status(400).send(e);
    });
});

router.post('/exists', (req, res) => {
    User.find({email: req.body.email}).then((users) => {
        res.send(users);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

router.post('/get', (req, res) => {
    User.findById(req.body.userID).then((user) => {
        res.send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

router.delete('/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

module.exports = router;