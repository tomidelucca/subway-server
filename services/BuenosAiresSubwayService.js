var Request = require('request');
var Line = require('../models/line.js');
var City = require('../models/city.js');

var apiEndpoint = 'http://190.210.190.48/subway/all_lines';
var cityId = '57650ec15ca55e12b906d6fd';

var buenosAiresSubwayService = {};

var parse = function parse(body) {
  var input = JSON.parse(body);
  var parsed = {};

  input.forEach(function(item){
    parsed[item.line_code] = {
      'interrupted': item.interrupted,
      'message': item.line_state
    };
  });

  return parsed;
}

var updateDB = function updateDB(input) {
  City.findById(cityId).populate('lines', '-stations -color_code').exec( function(err, city) {
    if (err) throw err;
    city.lines.forEach(function(line){
        var remoteData = input[line.line_code];
        var old_status = line.status;
        if(old_status != null){
          line.past_status.message = old_status.message;
          line.past_status.state = old_status.state;
        }
        line.status.message = remoteData.message;
        line.status.state = (remoteData.interrupted==true)?'I':'N';
        line.status.last_updated = new Date();
        line.save();
    });
  });
}

buenosAiresSubwayService.update = function update() {
  Request(apiEndpoint, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            updateDB(parse(body));
          } else {
            reject(error);
          }
        });
}

module.exports = buenosAiresSubwayService;
