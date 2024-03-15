const express = require('express');
const path = require('path');
const itemReviews = require('../models/itemReviews');
const cors = require('cors');
const router = express.Router();
router.use(cors());

// Endpoint to handle image upload
router.post('/', async (req, res) => {
  const comment = req.body.comment;
  const username = req.body.username;
  const item = req.body.item;

  try {
      // If the item doesn't exist, create a new Rating document
      const newReview = new itemReviews({ username: username, comment: comment, item: item});
      await newReview.save();
      res.status(500).json({ message: 'Review Submitted.' });
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// GET request to fetch favorite items based on username
router.get('/get', async (req, res) => {
    const item = req.query.item;
 
 
  try {
    const allReviews = await itemReviews.find({item: item});
    // Extract both username and comment from each review
    const commentsWithUsernames = allReviews.map(review => ({
        username: review.username,
        comment: review.comment
      }));
  
      res.status(200).json({ comments: commentsWithUsernames });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


module.exports = router;