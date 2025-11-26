import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import './RestaurantList.css';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    api.get(`/restaurants?page=${page}&limit=16`)
      .then((response) => {
        setRestaurants(response.data.restaurants);
        setTotalPages(response.data.totalPages || 1);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
        setRestaurants([]);
        setLoading(false);
      });
  }, [page]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading delicious restaurants...</p>
      </div>
    );
  }

  return (
    <div className="restaurant-list-container">
      <h2 className="page-title">Discover Amazing Restaurants</h2>
      <div className="restaurant-grid">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <Link
              to={`/restaurant/${restaurant["Restaurant ID"]}`}
              className="restaurant-card"
              key={restaurant["Restaurant ID"]}
            >
              <div className="card-image-wrapper">
                {/* <img 
                  src={restaurant.featured_image || "https://via.placeholder.com/300x200?text=No+Image"} 
                  alt={restaurant["Restaurant Name"]}
                  className="card-image"
                /> */}
                <div className="rating-badge">
                  ⭐ {restaurant["Aggregate rating"]}
                </div>
              </div>
              <div className="card-content">
                <h3 className="card-title">{restaurant["Restaurant Name"]}</h3>
                <p className="card-detail">📍 {restaurant.City}</p>
                <p className="card-detail">🍽️ {restaurant.Cuisines}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="no-results">No restaurants found</p>
        )}
      </div>
      
      <div className="pagination">
        <button 
          onClick={() => setPage(page - 1)} 
          disabled={page === 1}
          className="pagination-btn"
        >
          ← Previous
        </button>
        <span className="page-indicator">Page {page} of {totalPages}</span>
        <button 
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          className="pagination-btn"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default RestaurantList;
