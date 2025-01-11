import React from "react";
import { CiStar } from "react-icons/ci";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

export const StarRating = ({
  rating = 3.5,
  totalStars = 5,
  className,
}: any) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      const filled = i <= Math.floor(rating); // Full stars for integer part
      const partial = i === Math.ceil(rating); // Partial star for decimal part
      stars.push(
        <React.Fragment key={i}>
          {filled ? <FaStar /> : partial ? <FaStarHalfAlt /> : <CiStar />}
        </React.Fragment>,
      );
    }
    return stars;
  };

  return <div className={`flex ${className}`}>{renderStars()}</div>;
};
