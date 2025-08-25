const mongoose = require('mongoose');
const dbConfig = require('./env');

// Connect to MongoDB using Mongoose
mongoose
  .connect(dbConfig.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

module.exports = mongoose;
