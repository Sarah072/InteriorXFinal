// forgotPassword.js
const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.post('/', async (req, res) => { // Change '/reset-password' to '/'
  const { email } = req.body;

  try {
    // Search for the user in the users collection by email
    const user = await User.findOne({ email });

    if (user) {
      // If the email is found, redirect the user to /reset-password page
      // Assuming you have a frontend route set up for the reset password page
      return res.json({ emailFound: true });
    } else {
      // If the email is not found, return a message indicating it to the client
      return res.json({ emailFound: false });
    }
  } catch (error) {
    console.error('Error searching for user:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
});

module.exports = router;
