const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
 phoneNo: { type: String, required: false },
 address: { type: String, required: false },
 image: { type: String, required: false },
});

const User = mongoose.model('users', userSchema);

module.exports = User;
