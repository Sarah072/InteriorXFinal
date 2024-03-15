const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({

  item: String,
  rating: Number,
  users: [String],
 
});

const Rating = mongoose.model('Rating', RatingSchema);
module.exports = Rating;

