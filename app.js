// Import Basic modules
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./dbconn');
// Import routes
const authRoutes = require('./routes/auth');
// Initialize app
const app = express();

// Set neccessary headers (to prevent CORS errors)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Connect to database
db.connect().then(() => {
  console.log('Successfully connected to postgresSQL!');
}).catch((error) => {
  console.log('Unable to connect to postgresSQL!', error);
});

// Parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes requests to specific URI
app.use('/auth', authRoutes);

// Handle error
app.use((req, res, next) => {
  // If this middleware is executed then endpoint requested for wasn't expected
  const error = new Error('NOT FOUND');
  error.status = 404;
  next(error);
});
app.use((error, req, res) => {
  res.status(error.status || 500).json({
    status: 'error',
    error: error.message,
  });
});

// Export app
module.exports = app;
