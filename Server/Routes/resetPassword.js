// resetPassword.js

const express = require('express');
const router = express.Router();
const User = require('../models/users');

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

router.post('/:email', async (req, res) => {
  const { email } = req.params;
  const { password } = req.body;

  try {
    // Search for the user in the users collection by email
    const user = await User.findOne({ email });

    // Check if the password is strong using the regex
    if (!strongPasswordRegex.test(password)) {
       
        return res.json({ message: 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.' });
      }
      if (user) {
        // If the user is found, update the password
        user.password = password;
        const username = user.username; // Assuming there's a 'username' field in the User model
        await user.save();
        
        console.log('Password updated successfully', username); // Add this line to see the username in the server logs
        
        return res.json({ message: 'Password updated successfully', username });
      }
      
     else {
      // If the user is not found, return an error message
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
});


module.exports = router;
