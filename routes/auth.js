const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Render the signup page
router.get('/signup', authController.renderSignup);

// Render the login page
router.get('/login', authController.renderLogin);

// Handle signup form submission
router.post('/signup', authController.signup);

// Handle login form submission
router.post('/login', authController.login);

// Handle logout
router.post('/logout', authController.logout);

module.exports = router;
