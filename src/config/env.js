/**
 * src/config/env.js
 *
 * This module is responsible for loading and validating environment variables.
 * It ensures that required variables (e.g., database URI, JWT secret) are present
 * before the application starts. This avoids runtime errors caused by missing
 * configuration.
 */

require('dotenv').config(); // Load environment variables from .env file into process.env

// List of environment variables that are required for the app to function
const requiredVars = ["MONGODB_URI", "JWT_SECRET"];

// Validate each required variable
requiredVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

/**
 * Export a centralized configuration object.
 * This makes it easy to access configuration values across the project.
 */
module.exports = {
  // MongoDB connection string (required)
  MONGODB_URI: process.env.MONGODB_URI,

  // Server port (defaults to 3000 if not provided in .env)
  PORT: process.env.PORT || 3000,

  // Secret key for signing/verifying JWTs (required)
  JWT_SECRET: process.env.JWT_SECRET,
};
