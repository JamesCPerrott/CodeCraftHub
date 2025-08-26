/**
 * src/controllers/user.controller.js
 *
 * This controller handles user-related operations such as:
 * - Creating new users
 * - Retrieving a user by their ID
 *
 * It interacts with the User model to communicate with the database.
 */

const User = require('../models/user.model'); // Import the User model

/**
 * Create a new user.
 *
 * Steps:
 * 1. Take the request body (req.body) and use it to create a new User instance.
 * 2. Save the user to the database.
 * 3. Return the created user in the response with status 201 (Created).
 * 4. If an error occurs (e.g., validation fails, duplicate keys), respond with 400 (Bad Request).
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body); // Create a new User instance with request body
    await user.save();               // Save user to MongoDB
    res.status(201).json(user);      // Respond with created user and status code 201
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle validation/database errors
  }
};

/**
 * Get user by ID.
 *
 * Steps:
 * 1. Extract the user ID from the request parameters.
 * 2. Search the database for a user with that ID.
 * 3. If found, return the user object.
 * 4. If not found, respond with 404 (Not Found).
 * 5. If an error occurs (e.g., invalid ID format), respond with 400 (Bad Request).
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Look up user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // User does not exist
    }
    res.json(user); // Return found user
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle errors (e.g., invalid ObjectId)
  }
};
