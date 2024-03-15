// routes/comments.js
const express = require('express');
const Annotation = require('../models/annotations'); 

const router = express.Router();

// Get comments
router.get('/get', async (req, res) => {
    try {
      const { projectID  } = req.query; // Get the articleName from the query parameter
     
      const comments = await Annotation.find({ projectID: projectID }); // Fetch comments for the specified articleName
      res.json(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ error: 'Error fetching comments' });
    }
  });


  router.post('/', async (req, res) => {
    const { username, comment, projectID, timestamp  } = req.body;
    console.log(username, comment, projectID, timestamp );
  

    try {
      const newComment = new Annotation({ username, comment, projectID, timestamp  });
      await newComment.save();
      res.status(201).json({ message: 'Comment posted successfully' });
    } catch (error) {
      console.error('Error posting comment:', error);
      res.status(500).json({ error: 'Error posting comment' });
    }
  });
  
  
  module.exports = router;