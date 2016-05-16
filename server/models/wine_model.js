const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var wineSchema = new Schema({
  name: String,
  description: String
});

module.exports = mongoose.model('Wine', wineSchema);
