const express = require('express');
const multer = require('multer');
const path = require('path');
const Image = require('../models/Image'); // Import the Image model

const router = express.Router();

// Set up storage for uploaded images using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Create a folder named 'uploads' in your project root
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Endpoint to handle image upload
router.post('/', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const imagePath = req.file.path.replace(/\\/g, '/');

  // Save the image path to the database (Image model)
  try {
    const newImage = new Image({ image: imagePath, username: req.body.username, date: req.body.date });
    await newImage.save();
    res.status(201).json({ imagePath });
  } catch (error) {
    console.error('Error saving image to the database:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Endpoint to fetch images from the database
router.get('/', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


module.exports = router;
