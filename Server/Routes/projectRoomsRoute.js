const express = require('express');
const router = express.Router();
const ProjectRooms = require('../models/ProjectRooms');

router.get('/:username/:roomName', async (req, res) => {
  const { username, roomName } = req.params;

  try {
    const userData = await ProjectRooms.findOne({ username, roomName }, 'reactplannerv0');
    console.log(userData);
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ reactplannerv0: userData.reactplannerv0 });
  } catch (error) {
    console.error('Error retrieving reactplannerv0 field:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/', async (req, res) => {
    const { username, roomName, reactplannerv0 } = req.body;
  
    try {
      // Check if a document with the given username and roomName exists
      const existingProjectRoom = await ProjectRooms.findOne({ username, roomName });
  
      if (existingProjectRoom) {
        // Update the existing document with the new project data
        existingProjectRoom.reactplannerv0 = reactplannerv0;
        await existingProjectRoom.save();
        res.json({ message: 'Project updated successfully' });
      } else {
        // Create a new document with the provided data
        const newProjectRoom = new ProjectRooms({
          username,
          roomName,
          reactplannerv0: reactplannerv0,
        });
        await newProjectRoom.save();
        res.json({ message: 'New project created and saved' });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
module.exports = router;
