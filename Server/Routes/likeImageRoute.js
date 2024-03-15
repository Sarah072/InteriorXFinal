
const express = require('express');
const router = express.Router();
const Image = require('../models/Image');

router.post('/:imageId', async (req, res) => {
  try {
    const imageId = req.params.imageId;
    const likedImage = await Image.findById(imageId);

    if (!likedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Increment the likes count for the image
    likedImage.likes += 1;
    await likedImage.save();

    res.json({ message: 'Image liked successfully', likes: likedImage.likes });
  } catch (error) {
    console.error('Error liking image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
