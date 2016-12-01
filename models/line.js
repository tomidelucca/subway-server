var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// state = {I, N}
// days = {M, T, W, X, F, S, Y}

var lineSchema = new Schema({
  name: String,
  line_code: String,
  color_code: String,
  status: {
    message: String,
    state: String,
    last_updated: Date,
  },
  past_status: {
    message: String,
    state: String,
  },
  stations: [{ type : ObjectId, ref: 'Station' }]
});

var remove_id = function (doc, ret, options) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
}

lineSchema.set('toJSON', { transform: remove_id });
lineSchema.set('toObject', { transform: remove_id });

var Line = mongoose.model('Line', lineSchema, 'Line');

module.exports = Line;
