const mongoose = require('mongoose');

const favSchema = new mongoose.Schema({

  username: String,
  item: String,
  Image: String,
  description: String,
  carbonFootprint: String,
  ItemStyle: String,
  color: String,
 
});

const favorites = mongoose.model('favorites', favSchema);
module.exports = favorites;

