// models/Image.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  image: String,
  username: String,
  date: String,
  likes: {
    type: Number,
    default: 0, // Initialize likes count to 0
  },
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;

