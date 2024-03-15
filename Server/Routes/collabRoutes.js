const express = require('express');
const router = express.Router();
const SavedDesign = require('../models/savedDesigns'); 
const cors = require('cors');
router.use(cors());

// Endpoint to save a design
router.post('/', async (req, res) => {
    try {
      const { projectID, projectData } = req.body;
  
      // Check if the username already exists in the database
      const existingDesign = await SavedDesign.findOne({ projectID: projectID });
  
      if (existingDesign) {
        // If the username exists, update the projectData field
        existingDesign.projectData = projectData;
        await existingDesign.save();
        res.json({ success: true, message: 'Design updated successfully' });
      } else {
        // If the username does not exist, save a new design
        const newDesign = new SavedDesign({
          projectID,
          projectData,
        });
        await newDesign.save();
        res.json({ success: true, message: 'Design saved successfully' });
      }
    } catch (error) {
      console.error('Error saving design:', error);
      res.status(500).json({ success: false, message: 'Error saving design' });
    }
  });
  
  
router.post('/getUpdatedState', async (req, res) => {
  const projectID = req.body.projectID;

    try {
        const savedDesigns = await SavedDesign.findOne({ projectID: projectID }).lean();
        res.json(savedDesigns.projectData);
    } catch (error) {
        console.error('Error fetching saved designs:', error);
        res.status(500).json({ error: 'Error fetching saved designs' });
    }
});

module.exports = router;
