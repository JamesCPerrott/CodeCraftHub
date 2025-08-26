/**
 * src/utils/errorHandler.js
 *
 * This is a global error-handling middleware for Express.
 * It catches errors that occur in routes or other middleware and
 * returns a standardized HTTP 500 response to the client.
 *
 * Usage:
 * app.use(errorHandler); // Should be registered after all routes
 */

module.exports = (err, req, res, next) => {
  // Log the full error stack to the server console for debugging
  console.error(err.stack);

  // Respond to the client with a generic error message
  // HTTP status 500 indicates an internal server error
  res.status(500).json({ message: 'Something went wrong!' });

  // Note: 'next' is included as a parameter to comply with Express error-handling signature,
  // but it is not used here since this middleware ends the response.
};
