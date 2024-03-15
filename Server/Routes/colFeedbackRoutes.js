const express = require('express');
const path = require('path');
const Feedback = require('../models/colFeedback');
const cors = require('cors');
const router = express.Router();
router.use(cors());


router.post('/', async (req, res) => {
    try {
      const feedbackData = req.body;
      const feedback = new Feedback(feedbackData);
      await feedback.save();
      res.status(201).json({ message: 'Feedback submitted successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = router;
