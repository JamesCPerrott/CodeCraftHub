const express = require('express');
const mongoose = require('./config/db.config');
const userRoutes = require('./routes/user.routes');
const authMiddleware = require('./middlewares/auth.middleware');
const errorHandler = require('./utils/errorHandler');
const app = express();

app.use(express.json()); // Parse JSON bodies
app.use('/api/users', userRoutes); // User management routes
app.use(authMiddleware.verifyToken); // JWT authentication middleware
app.use(errorHandler); // Error handling middleware

const PORT = require('./config/env').PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
