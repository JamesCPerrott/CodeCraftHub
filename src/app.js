/**
 * src/app.js
 *
 * This is the main entry point of the Express application.
 * It sets up middleware, routes, error handling, and starts the server.
 *
 * Features:
 * - JSON body parsing
 * - User management routes
 * - JWT authentication middleware
 * - Global error handling
 * - MongoDB connection via Mongoose
 */

const express = require('express');                           // Import Express
const mongoose = require('./config/db.config');               // Import MongoDB connection configuration
const userRoutes = require('./routes/user.routes');           // Import user routes
const authMiddleware = require('./middlewares/auth.middleware'); // Import JWT authentication middleware
const errorHandler = require('./utils/errorHandler');         // Import global error handler

const app = express(); // Create Express app

/**
 * Middleware
 */
app.use(express.json());                 // Parse incoming JSON requests

// Mount user-related routes under /api/users
app.use('/api/users', userRoutes);

// JWT authentication middleware
// NOTE: Placed after public routes; you can also apply it selectively per route
app.use(authMiddleware.verifyToken);

// Global error handling middleware
app.use(errorHandler);

/**
 * Start server
 */
const PORT = require('./config/env').PORT; // Get port from environment configuration

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`); // Log that server is running
});

/**
 * Note:
 * - MongoDB connection is established automatically via ./config/db.config.js
 * - All routes, middleware, and error handling are registered before starting the server
 */
