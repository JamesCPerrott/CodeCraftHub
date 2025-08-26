/**
 * src/middlewares/auth.middleware.js
 *
 * This middleware handles JWT (JSON Web Token) authentication.
 * It verifies the validity of the token sent in the `Authorization` header
 * and attaches the decoded user ID to the request object for use in subsequent routes.
 */

const jwt = require('jsonwebtoken'); // Import JWT library

/**
 * Middleware: verifyToken
 *
 * Steps:
 * 1. Extract the token from the `Authorization` header.
 *    - Expected format: "Bearer <token>"
 * 2. If no token is provided, return HTTP 403 (Forbidden).
 * 3. Verify the token using the secret key from environment variables.
 * 4. If verification fails, return HTTP 401 (Unauthorized).
 * 5. If successful, attach the decoded user ID to `req.userId` and call `next()`
 *    to allow the request to continue to the protected route.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Callback to pass control to the next middleware
 */
exports.verifyToken = (req, res, next) => {
  // Step 1: Get token from Authorization header ("Bearer <token>")
  const token = req.headers['authorization']?.split(' ')[1];

  // Step 2: If token is missing, block access
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // Step 3: Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Step 4: If verification fails, block access
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Step 5: Attach decoded user ID to request for downstream usage
    req.userId = decoded.id;

    // Allow request to continue
    next();
  });
};
