// src/components/RestaurantsNear.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api';

const RestaurantsNear = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const radius = searchParams.get('radius');

  useEffect(() => {
    if (lat && lng && radius) {
      api.get(`/restaurants/near?lat=${lat}&lng=${lng}&radius=${radius}`)
        .then((response) => {
          setRestaurants(response.data);
          setError("");
        })
        .catch((error) => {
          setError("No restaurants found in this area or server error");
        });
    }
  }, [lat, lng, radius]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Restaurants Near ({lat}, {lng})</h1>
      {restaurants.length > 0 ? (
        <div className="restaurant-grid">
          {restaurants.map((restaurant) => (
            <div className="restaurant-card" key={restaurant["Restaurant ID"]}>
              <img src={restaurant.featured_image} alt={restaurant["Restaurant Name"]} />
              <h2>{restaurant["Restaurant Name"]}</h2>
              <p>City: {restaurant.City}</p>
              <p>Cuisines: {restaurant.Cuisines}</p>
              <p>Rating: {restaurant["Aggregate rating"]}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No restaurants found</p>
      )}
    </div>
  );
};

export default RestaurantsNear;
