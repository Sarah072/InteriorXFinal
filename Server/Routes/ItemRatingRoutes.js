const express = require('express');
const path = require('path');
const Rating = require('../models/ItemRating');
const cors = require('cors');
const router = express.Router();
router.use(cors());

// Endpoint to handle image upload
router.post('/', async (req, res) => {
  const item = req.body.title;
  const count = req.body.count;
  const username = req.body.username;

  try {
    let updateQuery = { $inc: { rating: 1 } }; // Default update query
    let message = 'Rating Updated.';

    // Check if the item already exists
    const existingRating = await Rating.findOne({ item: item });

    if (existingRating) {
      // Check if the username already exists in the array
      const userExists = existingRating.users.includes(username);

      if (!userExists) {
        // If the username doesn't exist, add it to the array
        updateQuery.$push = { users: username };
      } else {
        // If the username already exists, do not update the rating
        updateQuery = {}; // Reset the update query
        message = 'Already rated.';
      }
    } else {
      // If the item doesn't exist, create a new Rating document
      const newRating = new Rating({ item: item, rating: 0, users: [username] });
      await newRating.save();
    }

    // Update the rating if necessary
    const updatedRating = await Rating.findOneAndUpdate(
      { item: item },
      updateQuery,
      { new: true }
    );

    res.status(200).json({ message, updatedRating });
  } catch (error) {
    // Handle other errors
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// GET request to fetch favorite items based on username
router.get('/get', async (req, res) => {
  const item = req.query.item; // Use req.query to get query parameters
  console.log(item);
 
  try {
    // Use the 'favorites' model to find items associated with the provided username
    const rates = await Rating.find({ item: item });
    // Calculate the sum of ratings for the item
    const totalRating = rates.reduce((acc, curr) => acc + curr.rating, 0);

    res.status(200).json({ data: totalRating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


module.exports = router;