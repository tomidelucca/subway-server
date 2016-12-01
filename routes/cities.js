var express = require('express');
var router = express.Router();
var Lines = require('../models/line.js');
var City = require('../models/city.js');

/* GET all cities. */
router.get('/', function(req, res, next) {
    City.find({}, function(err, cities) {
        res.send(cities.map(function(city) {
            var c = city.toObject();
            c.number_of_lines = city.lines.length;
            delete c.lines;
            return c;
        }));
    });
});

/* GET city */
router.get('/:id', function(req, res, next) {
    City.findById(req.params.id).populate('lines', '-stations -past_status').exec(function(err, city) {
        if (err) {
            res.status(404).send({ error: 'City not found', code: 404 })
        } else {
            res.send(city);
        }
    });
});

module.exports = router;
