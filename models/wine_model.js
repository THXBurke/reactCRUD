const mongoose = require('mongoose');

var wineSchema = new mongoose.Schema({
  name: String,
  description: String,
});

module.exports = mongoose.model('Wine', wineSchema);
