import React from 'react';
import './StarRating.css';

const StarRating = ({ rating, maxStars = 5 }) => {
  const fullStars = Math.floor(rating); // Full stars
  const hasHalfStar = rating % 1 >= 0.3; // Show half star if decimal is 0.3 or more
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="star-rating">
      {/* Full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <span key={`full-${index}`} className="star filled">★</span>
      ))}
      
      {/* Half star */}
      {hasHalfStar && <span className="star half">★</span>}
      
      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={`empty-${index}`} className="star empty">★</span>
      ))}
    </div>
  );
};

export default StarRating;
