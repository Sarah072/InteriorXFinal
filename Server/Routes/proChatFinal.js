const express = require('express');
const User = require('../models/users');
const cors = require('cors');
const router = express.Router();
router.use(cors());

router.post('/', async (req, res) => {
    const username = req.query.username;
    try{
    const foundUser = await User.findOne({ username: username }); // Find user by username
        if (foundUser) {
            // If user is found, return true
            res.json({ found: true });
        } else {
            // If user is not found, return false
            res.json({ found: false });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});


module.exports = router;