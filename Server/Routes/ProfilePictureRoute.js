// Import necessary modules and models
const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/users');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploadsDP'); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit (adjust as needed)
  },
});

// Endpoint to upload a profile picture
router.post('/', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const imagePath = req.file.path.replace(/\\/g, '/');

  try {
    // Find the user by username and update their image field
    const user = await User.findOne({ username: req.body.username });
  
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
  
    user.image = imagePath;
    await user.save();
  
    res.status(201).json({ image: user.image });
  } catch (error) {
    console.error('Error saving image to the database:', error);
    res.status(500).json({ message: 'Internal server error. Could not save image.' });
  }
});


router.get('/:username', async (req, res) => {
    const username = req.params.username;
    console.log('Fetching image for username:', username);
  
    try {
      // Find the user by username and return their image
      const user = await User.findOne({ username });
  
      if (!user || !user.image) {
        console.log('User or image not found.');
        return res.status(404).json({ message: 'User or image not found.' });
      }
  
      res.json({ image: user.image });
    } catch (error) {
      console.error('Error fetching image:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });
  
module.exports = router;
