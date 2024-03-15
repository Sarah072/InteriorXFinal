const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users');
const Login = require('../models/logins');

// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regular expression for strong password validation
// Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//MyP@ssw0rd!
router.post('/', async (req, res) => {
  const { username, fname, lname, email, password } = req.body;

  console.log('Received POST request with data:', req.body); // Log the received data

  try {
    // Check if any required field is empty
    if (!fname || !lname || !email || !username || !password) {
      const errorMessage = 'All fields must be filled';
      console.log('Validation Error:', errorMessage); // Log the validation error
      return res.status(400).json({ errorMessage });
    }

    // Check if the email is valid using the regex
    if (!emailRegex.test(email)) {
      const errorMessage = 'Invalid email format';
      console.log('Validation Error:', errorMessage); // Log the validation error
      return res.status(400).json({ errorMessage });
    }

    // Check if the password is strong using the regex
    if (!strongPasswordRegex.test(password)) {
      const errorMessage =
        'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.';
      console.log('Validation Error:', errorMessage); // Log the validation error
      return res.status(400).json({ errorMessage });
    }

    // Check if an existing user with the same email exists
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      const errorMessage = 'User with this email already exists';
      console.log('Validation Error:', errorMessage); // Log the validation error
      return res.status(400).json({ errorMessage });
    }

    // Check if an existing user with the same first name and last name exists
    const existingUserFName = await User.findOne({ fname, lname });
    if (existingUserFName) {
      const errorMessage = 'User with this name already exists';
      console.log('Validation Error:', errorMessage); // Log the validation error
      return res.status(400).json({ errorMessage });
    }

    // Create and save the new user and login information
    const newUser = new User({
      username,
      fname,
      lname,
      email,
      password,
      phoneNo: "",
      address: "", 
      image:"",
    });
    await newUser.save();
    console.log('User saved successfully'); // Log success

    res.status(200).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Error during signup:', error);
    
    const errorMessage = 'Internal server error';
    console.log('Server Error:', errorMessage); // Log the server error
    res.status(500).send(errorMessage);
  }
});

module.exports = router;
