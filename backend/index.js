const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const geolib = require('geolib');
const cors = require("cors");
const restaurantRoutes = require('./routes/restaurantRoutes.js');

const app = express();
app.use(bodyParser.json());
app.use(cors());


// Connect to MongoDB (remove deprecated options)
// NEW - Local MongoDB connection
mongoose.connect('mongodb://localhost:27017/zomato_db')
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
// Use the restaurant routes
app.use('/api', restaurantRoutes);

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});