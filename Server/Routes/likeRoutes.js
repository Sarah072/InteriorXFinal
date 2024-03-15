// routes/likesRoute.js
const express = require('express');
const Like = require('../models/likes');

const router = express.Router();

// Get all likes
router.get('/', async (req, res) => {
  try {
    const likes = await Like.find();
    res.json(likes);
  } catch (error) {
    console.error('Error fetching likes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new like
router.post('/', async (req, res) => {
  const { username } = req.body;
  try {
    const existingLike = await Like.findOne({ username });
    if (!existingLike) {
      const newLike = new Like({ username });
      await newLike.save();
      res.json({ message: 'Like added successfully' });
    } else {
      res.status(400).json({ error: 'You have already liked this article' });
    }
  } catch (error) {
    console.error('Error adding like:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
