const express = require("express");
const router = express.Router();
const geolib = require("geolib");
const Restaurant = require("../models/restaurants");

// IMPORTANT: Define specific routes BEFORE parameterized routes
// This route MUST come before /restaurants/:id
router.get("/restaurants/near", async (req, res) => {
  const { lat, lng, radius } = req.query;

  if (!lat ||  !radius || !lng ) {
    return res
      .status(400)
      .json({ error: "Please provide latitude, longitude, and radius" });
  }

  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);
  const radiusInMeters = parseFloat(radius) * 1000;

  try {
    const allRestaurants = await Restaurant.find();

    const restaurantsWithinRadius = allRestaurants.filter((restaurant) => {
      if (!restaurant.Latitude || !restaurant.Longitude) return false;

      const distance = geolib.getDistance(
        { latitude, longitude },
        { latitude: restaurant.Latitude, longitude: restaurant.Longitude }
      );

      return distance <= radiusInMeters;
    });

    if (restaurantsWithinRadius.length === 0) {
      return res
        .status(404)
        .json({ message: "No restaurants found within this range" });
    }

    res.status(200).json(restaurantsWithinRadius);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// Get List of Restaurants with Pagination
router.get("/restaurants", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const restaurants = await Restaurant.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await Restaurant.countDocuments();
    res.json({
      restaurants,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalRestaurants: total
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Restaurant by ID (This should be LAST)
router.get("/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      "Restaurant ID": parseInt(req.params.id),
    });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
