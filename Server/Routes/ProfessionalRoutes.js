const express = require('express');
const path = require('path');
const Professional = require('../models/Professional');
const cors = require('cors');
const router = express.Router();
router.use(cors());

router.get('/', async (req, res) => {
    try {
        const { specializedIn, minimumBudget } = req.query;
    
        // Build the query based on the provided parameters
        const query = {};
        if (specializedIn) {
          query.specialized_In = specializedIn;
        }
        if (minimumBudget) {
            query.minimum_Budget = { $lte: minimumBudget }; // Use $lte for less than or equal to
          }
        console.log(query);
    
        // Use Mongoose to find professionals based on the query
        const professionals = await Professional.find(query);
    
        res.json(professionals);
      } catch (error) {
        console.error('Error fetching professionals:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});


module.exports = router;