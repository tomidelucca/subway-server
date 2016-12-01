var Cron = require('cron');
var BuenosAiresSubwayService = require('./BuenosAiresSubwayService.js');

var fetcherService = {};

/*
 * Runs every day
 * from 5:00:00 AM to 23:00:00 PM.
 * If we add new services this needs to be changed, but for now its OK to optimize heroku usage.
 */

fetcherService.start = function start() {
  console.log("Started Fetcher Service");
  var job = new Cron.CronJob({
     cronTime: '00 */5 5-23 * * *',
     onTick: onTick,
     start: false,
     timeZone: 'America/Argentina/Buenos_Aires'
   });
  job.start();
}

var onTick = function() {
  BuenosAiresSubwayService.update();
}

module.exports = fetcherService;
