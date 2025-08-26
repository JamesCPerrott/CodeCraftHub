/**
 * src/config/db.config.js
 *
 * This module is responsible for connecting to the MongoDB database
 * using the Mongoose library. It establishes a single database
 * connection that can be reused across the entire application.
 */

const mongoose = require('mongoose');  // Import Mongoose (MongoDB ORM/ODM)
const dbConfig = require('./env');     // Import environment configuration (MONGODB_URI)

/**
 * Connect to MongoDB using the connection string provided in environment variables.
 *
 * Options used:
 * - useNewUrlParser: ensures the new MongoDB connection string parser is used.
 * - useUnifiedTopology: enables the new unified topology layer (removes deprecation warnings).
 */
mongoose
  .connect(dbConfig.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('✅ MongoDB connected successfully'); // Log success
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err); // Log failure
  });

/**
 * Export the mongoose instance so that it can be used
 * throughout the application (e.g., in models).
 */
module.exports = mongoose;
