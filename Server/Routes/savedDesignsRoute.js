// savedDesignsRoute.js
const express = require('express');
const router = express.Router();
const SavedDesign = require('../models/savedDesigns'); 

router.get('/', async (req, res) => {
    const username = req.query.username;

    try {
        const savedDesigns = await SavedDesign.find({ username }).lean();
        res.json(savedDesigns);
    } catch (error) {
        console.error('Error fetching saved designs:', error);
        res.status(500).json({ error: 'Error fetching saved designs' });
    }
});


module.exports = router;
