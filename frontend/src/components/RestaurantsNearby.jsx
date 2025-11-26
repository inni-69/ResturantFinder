import React, { useState } from "react";
import api from "../api";
import './RestaurantsNearby.css';

const RestaurantsNearby = () => {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [radius, setRadius] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  const findNearby = () => {
    api.get(`/restaurants/near?lat=${lat}&lng=${lng}&radius=${radius}`)
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => {
        console.error("Error fetching nearby restaurants:", error);
      });
  };

  return (
    <div>
      <h1>Find Nearby Restaurants</h1>
      <input
        type="text"
        placeholder="Latitude"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
      />
      <input
        type="text"
        placeholder="Longitude"
        value={lng}
        onChange={(e) => setLng(e.target.value)}
      />
      <input
        type="text"
        placeholder="Radius (in km)"
        value={radius}
        onChange={(e) => setRadius(e.target.value)}
      />
      <button onClick={findNearby}>Search</button>

      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant["Restaurant ID"]}>
            {restaurant["Restaurant Name"]} - {restaurant.City}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantsNearby;
