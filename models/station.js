var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// days = {MON, TUE, WED, THU, FRI, SAT, SUN}

var stationSchema = new Schema({
  name: String,
  line: { type : ObjectId, ref: 'Line' },
  working_hours: [{
      days: [String],
      open: String,
      close: String
  }],
  central_dock: Boolean,
  combines: [{ type : ObjectId, ref: 'Line' }],
  address : {
   coord : [Number]
  }
});

var remove_id = function (doc, ret, options) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
}

stationSchema.set('toJSON', { transform: remove_id });
stationSchema.set('toObject', { transform: remove_id });

var Station = mongoose.model('Station', stationSchema, 'Station');

module.exports = Station;
