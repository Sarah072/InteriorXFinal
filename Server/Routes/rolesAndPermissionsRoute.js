const express = require('express');
const Roles = require('../models/rolesAndPermissions');
const cors = require('cors');
const router = express.Router();
router.use(cors());


// API endpoint to save user to MongoDB
router.post('/', async (req, res) => {
    try {
      const newRoles = new Roles(req.body);
      await newRoles.save();
      res.status(201).json(newRoles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  // API endpoint to save user to MongoDB
router.post('/get', async (req, res) => {
  try {
    // Assuming req.body.projectID contains the projectID to search for
    const projectID = req.body.projectID;

    // Query the database for documents with the specified projectID
    const documents = await Roles.find({ projectID: projectID });

    // Extract the username field from the documents
    const usernames = documents.map(doc => doc.username);

    // Return the array of usernames
    res.json(usernames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


 // API endpoint to save user to MongoDB
 router.post('/getProjectID', async (req, res) => {
  try {
    // Assuming req.body.projectID contains the projectID to search for
    const name = req.body.name;
    console.log(name);
    // Query the database for documents with the specified projectID
    const documents = await Roles.findOne({ username: name });

    // Extract the username field from the documents
    const id = documents.projectID;
    console.log(id);

    // Return the array of usernames
    res.json(id);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




module.exports = router;
