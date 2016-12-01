var express = require('express');
var router = express.Router();
var Line = require('../models/line.js');
var Station = require('../models/station.js');

/* GET line */
router.get('/:id', function(req, res, next) {
    Line.findById(req.params.id, '-past_status').populate('stations', '-line').exec(function(err, line) {
        if (err) {
            res.status(404).send({
                error: 'Line not found',
                code: 404
            })
        } else {
            Line.populate(line.stations, {
                path: 'combines',
                select: 'name line_code color_code'
            }, function(err, result) {
                if (err) throw err;
                res.send(line);
            });
        }
    });
});

module.exports = router;
