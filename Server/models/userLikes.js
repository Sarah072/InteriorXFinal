
const mongoose = require('mongoose');

const UserLikesSchema = new mongoose.Schema({
  articleName: String,
  username: String,
});

const UserLikes = mongoose.model('UserLikes', UserLikesSchema);

module.exports = UserLikes;
