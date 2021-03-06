const express = require('express');
const router = express.Router();
const {mongoose, ObjectID} = require('./../db/mongoose');
const {Location} = require('../models/location');
const {Post} = require('../models/post');
const fs = require('fs');
const multer = require('multer');


router.post('/create', async(req, res) => {
    let location = new Location({
        name: req.body.name,
        tripID: req.body.tripID
    });
    location.save();
    res.send(location);
});

router.post('/post/create', async (req, res) => {
    let post = new Post({
        text: req.body.text,
        picture: req.body.picture,
        locationID: req.body.locationID
    });

    post.save();
    res.send(post);
});

router.post('/upload', async (req, res) => {
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/pics')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '.png') //Appending .jpg
        }
    });

    let upload = multer({ storage: storage }).single('photo');
    let path = "";
    await upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
            console.log(err);
            return res.status(422).send("an Error occured")
        }
        // No error occured.
        if(req.file){
            path = req.file.path;
        }
        return res.send(path);
    });
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

router.post('/delete', async(req, res) => {
    Post.deleteMany({locationID: req.body.locationID}).then(post => {

    });
    Location.deleteOne({_id: req.body.locationID}).then(loc => {
        res.send(loc);
    });
});

router.post('/post/delete', async(req, res) => {
    Post.deleteOne({_id: req.body.postID}).then(post => {
        res.send(post);
    });
});

module.exports = router;