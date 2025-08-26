/**
 * src/utils/logger.js
 *
 * This module configures and exports a Winston logger instance.
 * It provides a centralized way to log information, errors, and other messages
 * across the application.
 *
 * Winston is a popular logging library for Node.js that supports multiple
 * transports, log levels, and structured logging.
 */

const winston = require('winston'); // Import Winston logging library

/**
 * Logger configuration
 */
const logger = winston.createLogger({
  // Minimum log level to output (e.g., 'info', 'warn', 'error')
  level: 'info',

  // Format of logs (JSON format in this case)
  format: winston.format.json(),

  // Define transports (where logs are sent)
  transports: [
    new winston.transports.Console(), // Output logs to the console
    // You can add more transports here, e.g., file or remote logging
  ],
});

// Export the logger instance to use throughout the app
module.exports = logger;
