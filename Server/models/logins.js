const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const loginSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});


// Hash the password before saving the user
loginSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});
const Login = mongoose.model('logins', loginSchema);

module.exports = Login;

