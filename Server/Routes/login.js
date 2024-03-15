const express = require('express');
const User = require('../models/users'); // Import the User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password, keepLoggedIn } = req.body;

  try {
    const user = await User.findOne({ username }); // Find the user by username in the users collection
    if (!user || (password != user.password)) {
      res.status(401).json({ message: 'Invalid username or password' });
    } else {
      // User is authenticated; create and send a JWT as a response
      const token = jwt.sign({ id: user._id }, 'yourSecretKeyHere', { expiresIn: keepLoggedIn ? '7d' : '1h' });
      res.status(200).json({ message: 'Login successful', token });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
});

module.exports = router;


