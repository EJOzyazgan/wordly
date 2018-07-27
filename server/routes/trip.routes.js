const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {mongoose, ObjectID} = require('../db/mongoose');
const {Trip} = require('../models/trip');
const {User} = require('../models/user');
const {Location} = require('../models/location');

router.post('/create', async(req, res) => {
    console.log(req.body);
    let trip = new Trip({
        name: req.body.name,
        userID: req.body.userID
    });
    console.log(trip);

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

router.delete('/delete', async(req, res) => {
    res.send("Deleted trip");
});

router.post('/location/create', async(req, res) => {
    res.send("Added new location to trip");
});

router.delete('/location/delete', async(req, res) => {
    res.send("Deleted location from trip");
});

router.post('/picture/add', async(req, res) => {
    res.send("Added new picture to trip");
});

router.delete('/picture/delete', async(req, res) => {
    res.send("Deleted picture from trip");
});

module.exports = router;