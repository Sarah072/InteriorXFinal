//userLikes
// routes/likesRoute.js
const express = require('express');
const userLikes = require('../models/userLikes');

const router = express.Router();

// Get all likes
router.get('/', async (req, res) => {
    try {
  
      const { articleName } = req.query; // Get the articleName from the query parameter
      
      if (!articleName) {
        return res.status(400).json({ error: 'Missing articleName query parameter' });
      }
  
      const likes = await userLikes.find({ articleName });
      res.json(likes);
    } catch (error) {
      console.error('Error fetching likes:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
     
// Add a new like
router.post('/', async (req, res) => {
  const { articleName, username } = req.body;
  try {
    const existingLike = await userLikes.findOne({articleName, username });
    if (!existingLike) {
      const newLike = new userLikes({ articleName, username });
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
