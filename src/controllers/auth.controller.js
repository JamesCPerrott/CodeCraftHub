/**
 * src/controllers/auth.controller.js
 *
 * This controller handles user authentication logic.
 * It verifies user credentials and generates a JSON Web Token (JWT)
 * for authenticated sessions.
 */

const jwt = require('jsonwebtoken');          // Import JSON Web Token library for signing/verifying tokens
const User = require('../models/user.model'); // Import the User model

/**
 * User login controller.
 *
 * Steps:
 * 1. Extract `username` and `password` from the request body.
 * 2. Find a matching user in the database.
 * 3. Validate the provided password against the stored password.
 * 4. If valid, generate a JWT containing the user’s ID as payload.
 * 5. Return the token to the client.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.login = async (req, res) => {
  const { username, password } = req.body; // Destructure credentials from request body

  try {
    // Step 1: Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // User does not exist
    }

    // Step 2: Check if provided password matches (using custom comparePassword method from model)
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' }); // Wrong password
    }

    // Step 3: Generate JWT (expires in 1 hour)
    const token = jwt.sign(
      { id: user._id },               // Payload: store user ID
      process.env.JWT_SECRET,         // Secret key for signing token
      { expiresIn: '1h' }             // Expiration time
    );

    // Step 4: Respond with the token
    res.json({ token });
  } catch (error) {
    // Handle unexpected errors (e.g., DB connection issue)
    res.status(500).json({ message: 'Server error' });
  }
};
