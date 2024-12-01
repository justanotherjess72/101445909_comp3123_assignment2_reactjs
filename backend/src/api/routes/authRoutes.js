const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust path if needed

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Username' });
    }

    // Check if the password matches directly (no hashing)
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid Password' });
    }

    // Generate JWT token (or any other authentication token)
    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
