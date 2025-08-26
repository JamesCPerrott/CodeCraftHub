/**
 * src/models/user.model.js
 *
 * This file defines the User schema and model using Mongoose.
 * The User model represents users in the MongoDB database and includes
 * fields for username, password, and email.
 * 
 * It also defines instance methods for the User model, such as comparing passwords.
 */

const mongoose = require('mongoose'); // Import Mongoose

/**
 * User schema definition
 *
 * Fields:
 * - username: String, required, must be unique
 * - password: String, required
 * - email: String, required, must be unique
 *
 * Options:
 * - timestamps: automatically adds `createdAt` and `updatedAt` fields
 */
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
}, { timestamps: true });

/**
 * Instance method to compare a provided password with the stored password.
 *
 * NOTE: This is a placeholder. In a production app, you should use a library
 * like bcrypt to hash passwords and perform secure comparisons.
 *
 * @param {string} password - The password to compare
 * @returns {Promise<boolean>} - True if passwords match, false otherwise
 */
userSchema.methods.comparePassword = async function(password) {
  // TODO: Replace this with bcrypt.compare(password, this.password)
  return password === this.password; // Placeholder
};

/**
 * Export the User model based on the schema.
 * This model will be used to interact with the "users" collection in MongoDB.
 */
module.exports = mongoose.model('User', userSchema);
