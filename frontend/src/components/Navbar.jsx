import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [searchId, setSearchId] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [radius, setRadius] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleSearchById = () => {
    if (searchId.trim() !== "") {
      navigate(`/restaurant/${searchId}`);
    }
  };

  const handleSearchByCoordinates = () => {
    if (latitude.trim() && longitude.trim() && radius.trim()) {
      navigate(`/restaurants/near?lat=${latitude}&lng=${longitude}&radius=${radius}`);
    }
  };

  return (
    <nav className={`navbar ${isVisible ? 'navbar-visible' : 'navbar-hidden'}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🍽️ Restaurant Finder
        </Link>
        
        <div className="search-container">
          <div className="search-group">
            <input
              type="text"
              placeholder="Restaurant ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="search-input"
            />
            <button onClick={handleSearchById} className="search-btn">
              Search
            </button>
          </div>

          <div className="search-group location-search">
            <input
              type="text"
              placeholder="Lat"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="search-input small"
            />
            <input
              type="text"
              placeholder="Lng"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="search-input small"
            />
            <input
              type="text"
              placeholder="Radius"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              className="search-input small"
            />
            <button onClick={handleSearchByCoordinates} className="search-btn">
              📍 Nearby
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
