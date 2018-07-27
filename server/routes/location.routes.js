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

router.post('/get/tripId', async(req, res) => {
    Location.find({tripID: req.body.tripID}).then(locations => {
        res.send(locations);
    })
});

router.post('/get/location', async(req, res) => {
    Location.findById(req.body.locationID).then(location => {
        res.send(location);
    })
});

router.delete('/delete', async(req, res) => {
    res.send("Deleted trip");
});

module.exports = router;