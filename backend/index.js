const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const geolib = require('geolib');
const cors = require("cors");
const restaurantRoutes = require('./routes/restaurantRoutes.js');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB using env variable from Render
mongoose
  .connect(process.env.MONGODB_URI)
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
