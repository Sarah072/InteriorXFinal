
const mongoose = require('mongoose');

const UserCommentsSchema = new mongoose.Schema({
  articleName: String,
  username: String,
  comment: String,
  timestamp: String,
});

const UserComments = mongoose.model('UserComments', UserCommentsSchema);

module.exports = UserComments;
