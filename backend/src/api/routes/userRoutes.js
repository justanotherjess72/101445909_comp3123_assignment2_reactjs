const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// User signup route
router.post('/signup', userController.signup);

// User login route
router.post('/login', userController.login);

module.exports = router;
