const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {mongoose} = require('./../db/mongoose');
const {Trip} = require('./../models/Trip');

router.post('/trip/create', async(req, res) => {
    let body = _.pick(req.body, ['name', 'locations']);
    let trip = new Trip(body);


    res.send("Created new trip");
});

router.delete('/trip/delete', async(req, res) => {
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