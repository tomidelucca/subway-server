var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var citySchema = new Schema({
  name: String,
  country: String,
  lines: [{ type : ObjectId, ref: 'Line' }]
});

var remove_id = function (doc, ret, options) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
}

citySchema.set('toJSON', { transform: remove_id });
citySchema.set('toObject', { transform: remove_id });

var City = mongoose.model('City', citySchema, 'City');

module.exports = City;
