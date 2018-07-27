const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {mongoose, ObjectID} = require('./../db/mongoose');
const {Trip} = require('../models/trip');
const {Location} = require('../models/location');

router.post('/location/create', async(req, res) => {
    let location = new Location({
        name: req.body.name,
        tripID: req.body.tripID
    });

    location.save().then(trip => {

    });
    res.send(location);
});

router.delete('/location/delete', async(req, res) => {
    res.send("Deleted location from trip");
});

module.exports = router;