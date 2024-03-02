import React from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

const CountStartRating = ({ rating, reviews = "null" }) => {
  const starRating = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    if (reviews === "null") {
      return (
        <span key={index}>
          {rating >= index + 1 ? (
            <FaStar className="star_icon" size={12} />
          ) : rating >= number ? (
            <FaStarHalfAlt className="star_icon" size={12} />
          ) : (
            <FaRegStar className="star_icon" size={12} />
          )}
        </span>
      );
    }
    return (
      <span key={index}>
        {rating >= index + 1 ? (
          <FaStar className="star_icon" size={18} />
        ) : rating >= number ? (
          <FaStarHalfAlt className="star_icon" size={18} />
        ) : (
          <FaRegStar className="star_icon" size={18} />
        )}
      </span>
    );
  });
  if (reviews === "null") {
    return <div className="start_rating">{starRating}</div>;
  }
  return (
    <div className="start_rating">
      {starRating}
      <p className="text">({reviews} customers reviews)</p>
    </div>
  );
};

export default CountStartRating;
