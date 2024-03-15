const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware to protect the route
function authenticate(req, res, next) {
  // Check if the request contains the JWT in the headers
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Verify the JWT
  jwt.verify(token, 'yourSecretKeyHere', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Decoded object will contain the user ID if the token is valid
    // You can use this information to fetch the user data or perform other tasks
    req.userId = decoded.id;
    next();
  });
}

// Protected route example
router.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'Protected route', userId: req.userId });
});

module.exports = router;
