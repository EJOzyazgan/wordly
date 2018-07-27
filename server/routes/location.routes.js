const express = require('express');
const router = express.Router();
const {mongoose, ObjectID} = require('./../db/mongoose');
const {Location} = require('../models/location');
const {Post} = require('../models/post');

router.post('/create', async(req, res) => {
    let location = new Location({
        name: req.body.name,
        tripID: req.body.tripID
    });

    location.save();
    res.send(location);
});

router.post('/post/create', async(req, res) => {
    let post = new Post({
        text: req.body.text,
        picture: req.body.picture,
        locationID: req.body.locationID
    });

    post.save();
    res.send(post);
});

router.post('/get/posts', async(req, res) => {
    Post.find({locationID: req.body.locationID}).then(posts => {
        res.send(posts);
    })
});

router.delete('/delete', async(req, res) => {
    res.send("Deleted location from trip");
});

module.exports = router;