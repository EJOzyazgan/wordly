const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {mongoose, ObjectID} = require('mongoose');
const {Trip} = require('../models/trip');
const {Location} = require('../models/location');

router.post('/location/create', async(req, res) => {
    let body = _.pick(req.body, ['name', 'tripId']);
    let location = new Location(body);

    location.save().then(trip => {

    });
    res.send(location);
});

router.delete('/location/delete', async(req, res) => {
    res.send("Deleted location from trip");
});

module.exports = router;