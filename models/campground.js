const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let campSchema = new Schema({
  name: String,
  image: String,
  description: String
});

module.exports = mongoose.model('Campground', campSchema);