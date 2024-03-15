const mongoose = require('mongoose');

const reviewchema = new mongoose.Schema({

  username: String,
  comment: String,
  item: String,
 
});

const itemReviews = mongoose.model('itemReviews', reviewchema);
module.exports = itemReviews;
