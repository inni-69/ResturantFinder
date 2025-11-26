import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import './RestaurantList.css';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  // Array of gradient colors for cards
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  ];

  useEffect(() => {
    setLoading(true);
    api.get(`/restaurants?page=${page}&limit=10`)
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
          restaurants.map((restaurant, index) => (
            <Link
              to={`/restaurant/${restaurant["Restaurant ID"]}`}
              className="restaurant-card-modern"
              key={restaurant["Restaurant ID"]}
            >
              <div 
                className="card-header-gradient"
                style={{ background: gradients[index % gradients.length] }}
              >
                <div className="rating-badge-top">
                  ⭐ {restaurant["Aggregate rating"]}
                </div>
                <div className="restaurant-icon">🍽️</div>
              </div>
              
              <div className="card-content-modern">
                <h3 className="card-title-modern">{restaurant["Restaurant Name"]}</h3>
                
                <div className="card-details-grid">
                  <div className="detail-item">
                    <span className="detail-icon">📍</span>
                    <span className="detail-text">{restaurant.City}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-icon">🍽️</span>
                    <span className="detail-text">{restaurant.Cuisines?.substring(0, 30)}{restaurant.Cuisines?.length > 30 ? '...' : ''}</span>
                  </div>
                  
                  {restaurant["Average Cost for two"] && (
                    <div className="detail-item">
                      <span className="detail-icon">💰</span>
                      <span className="detail-text">{restaurant["Average Cost for two"]} {restaurant.Currency}</span>
                    </div>
                  )}
                </div>
                
                <div className="card-footer-badges">
                  {restaurant["Has Online delivery"] === 'Yes' && (
                    <span className="badge delivery">🚚 Delivery</span>
                  )}
                  {restaurant["Has Table booking"] === 'Yes' && (
                    <span className="badge booking">📅 Booking</span>
                  )}
                </div>
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
