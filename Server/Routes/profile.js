const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/users');
const router = express.Router();


// Endpoint to fetch user details based on username
router.get('/user/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Search for the user in the "users" collection by the provided username
    const user = await User.findOne({ username });

    if (!user) {
      // If user not found, send an appropriate response
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user details back to the client
    res.status(200).json(user);
  } catch (error) {
    // Handle any errors that occurred during the database query
    res.status(500).json({ message: 'An error occurred', error });
  }
});

router.put('/user/:username', async (req, res) => {
  const { username } = req.params;
  const updatedUserData = req.body;

  try {
    // Find the user in the "users" collection by the provided username
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If the request includes a new username, check if it's already taken by another user
    if (updatedUserData.username && updatedUserData.username !== user.username) {
      const existingUser = await User.findOne({ username: updatedUserData.username });
      if (existingUser) {
        return res.status(409).json({ message: 'Username already taken' });
      }
    }

    // Update the user object with the new data
    Object.assign(user, updatedUserData);

    // Save the updated user document to the database
    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});





const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // Corrected destination path
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${req.params.username}_profile${ext}`);
  },
});

// Multer file filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
};


// Multer upload instance
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/user/:username/profile-pic', upload.single('profilePic'), async (req, res) => {
  try {
    const { username } = req.params;
    const profilePicPath = `uploads/${req.file.filename}`;

    // Find the user in the "users" collection by the provided username
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's profilePic field with the path to the uploaded image
    user.profilePic = profilePicPath;

    // Save the updated user document to the database
    await user.save();

    res.status(200).json({ message: 'Profile picture uploaded successfully', profilePic: profilePicPath });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});


module.exports = router;

    
   

