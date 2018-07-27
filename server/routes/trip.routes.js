const express = require('express');
const router = express.Router();
const {mongoose, ObjectID} = require('./../db/mongoose');
const {Trip} = require('../models/trip');
const {Location} = require('../models/location');
const {Post} = require('../models/post');

router.post('/create', async(req, res) => {
    let trip = new Trip({
        name: req.body.name,
        userID: req.body.userID
    });

    trip.save().then(trip => {
        for(let locName of req.body.locations){
            let loc = new Location({
                name: locName,
                tripID: trip._id
            });
            loc.save();
        }
        res.send(trip);
    });
});

router.post('/get/userId', async(req, res) => {
   Trip.find({userID: req.body.userID}).then(trips => {
       res.send(trips);
   })
});

router.post('/delete', async(req, res) => {
    Trip.deleteOne({_id: req.body.tripID}).then(trips => {

    });
    Location.find({tripID: req.body.tripID}).then(locs => {
        for(let loc of locs) {
            Post.deleteMany({locationID: loc._id}).then(post => {

            });
            Location.deleteOne({_id: loc._id}).then(loc => {

            });
        }
    });
    res.send("Done");
});

module.exports = router;