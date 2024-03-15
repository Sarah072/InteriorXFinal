// routes/comments.js
const express = require('express');
const userComments = require('../models/userComments'); 

const router = express.Router();

// Get comments
router.get('/', async (req, res) => {
    try {
      const { articleName } = req.query; // Get the articleName from the query parameter
      
      if (!articleName) {
        return res.status(400).json({ error: 'Missing articleName query parameter' });
      }
  
      const comments = await userComments.find({ articleName }); // Fetch comments for the specified articleName
      res.json(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ error: 'Error fetching comments' });
    }
  });


  router.post('/', async (req, res) => {
    const { articleName, comment, timestamp } = req.body;
  
    // Retrieve username from authorization header
    const username = req.headers.authorization;
  
    try {
      const newComment = new userComments({ articleName, username, comment, timestamp });
      await newComment.save();
      res.status(201).json({ message: 'Comment posted successfully' });
    } catch (error) {
      console.error('Error posting comment:', error);
      res.status(500).json({ error: 'Error posting comment' });
    }
  });
  
  
  module.exports = router;