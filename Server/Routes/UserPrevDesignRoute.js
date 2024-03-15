const express = require('express');
const UserModel = require('../models/ProjectRooms');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { username } = req.body;

    // Query the users database to find all documents with the matching username
    const users = await UserModel.find({ username });

    if (users && users.length > 0) {
      // If users are found, extract the reactplannerv0 field from each document
      const projectDataArray = users.map(user => JSON.parse(user.reactplannerv0));
      
      res.json({
        success: true,
        projectData: projectDataArray,
      });
    } else {
      res.json({
        success: false,
        error: 'User not found',
      });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

module.exports = router;
