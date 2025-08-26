/**
 * src/routes/user.routes.js
 *
 * This file defines the routes for user-related operations.
 * Routes are grouped under `/api/users` in the main app.
 * 
 * It includes routes for:
 * - Creating a new user
 * - Retrieving a user by ID
 * - Logging in (authentication)
 */

const express = require('express'); // Import Express
const userController = require('../controllers/user.controller'); // Import user-related controller functions
const authController = require('../controllers/auth.controller'); // Import auth-related controller functions

const router = express.Router(); // Create a new Express router

/**
 * User routes
 */

// POST /api/users/ - Create a new user
router.post('/', userController.createUser);

// GET /api/users/:id - Get user by ID
router.get('/:id', userController.getUserById);

// POST /api/users/login - User login (returns JWT)
router.post('/login', authController.login);

// Export the router to be used in the main app
module.exports = router;
