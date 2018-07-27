const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const app = express();

const trip = require('./routes/trip.routes');
const location = require('./routes/location.routes');
const user = require('./routes/user.routes');

app.use(bodyParser.json());

app.use(function (req,res,next) {
    res.setHeader("Access-Control-Allow-Origin",  "*");
    res.setHeader('Access-Control-Allow-Methods', "PUT, PATCH, GET, POST, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/trip', trip);
app.use('/location', location);
app.use('/user', user);

app.listen(port, () => {
    console.log(`server is listening on ${port}`)
});

module.exports = app;
