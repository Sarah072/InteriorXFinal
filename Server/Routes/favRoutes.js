const express = require('express');
const path = require('path');
const Favourite = require('../models/favourite');
const cors = require('cors');
const router = express.Router();
router.use(cors());

// Endpoint to handle image upload
router.post('/', async (req, res) => {
  const username = req.body.username;
  const item = req.body.title;
  const image = req.body.image;
  const description = req.body.description;
  const carbonFootprint = req.body.carbonFootprint;
  const ItemStyle = req.body.ItemStyle;
  const color = req.body.color;

  try {
    // Check if the combination of username and item already exists
    const existingFav = await Favourite.findOne({ username: username, item: item, Image: image, description: description, carbonFootprint: carbonFootprint, ItemStyle: ItemStyle, color: color });

    if (existingFav) {
      // If the combination exists, return a conflict response
      return res.status(409).json({ message: 'Combination already exists in the collection.' });
    }

    // If the combination doesn't exist, save it to the database
    const fav = new Favourite({ username: username, item: item, Image: image, description: description, carbonFootprint: carbonFootprint, ItemStyle: ItemStyle, color: color });
    await fav.save();

    // Return a success response
    res.status(201).json({ message: 'Item added to favorites.' });
  } catch (error) {
    // Handle other errors
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// GET request to fetch favorite items based on username
router.get('/get', async (req, res) => {
  const username = req.query.username; // Use req.query to get query parameters
 
  try {
    // Use the 'favorites' model to find items associated with the provided username
    const FavItems = await Favourite.find({ username: username });

    res.status(200).json({ data: FavItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.delete('/delete', async (req, res) => {
  const { username, item } = req.query;

  try {
    // Use the 'favorites' model to find and delete the item associated with the provided username and item
    const deletedItem = await Favourite.findOneAndDelete({ username, item });

    if (!deletedItem) {
      // If the item was not found, respond with a 404 status
      return res.status(404).json({ message: 'Item not found.' });
    }

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// GET request to fetch favorite items based on username
router.get('/fetch', async (req, res) => {
  const username = req.query.username; // Use req.query to get query parameters
  const item = req.query.item;
 
  try {
    // Use the 'favorites' model to find items associated with the provided username
    const FavItems = await Favourite.find({ username: username, item: item });
    console.log(FavItems);
    
    res.status(200).json({ data: FavItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});
module.exports = router;
