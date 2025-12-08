
import React, { useState } from 'react'
export default function RatingStars({rating}) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
    return (
      <div className="flex text-yellow-500 text-sm">
        {'★'.repeat(fullStars)}
        {hasHalfStar && <span className="relative inline-block overflow-hidden"><span className="absolute left-0 top-0 w-1/2 overflow-hidden">★</span><span className="opacity-30">★</span></span>}
        <span className="text-gray-300">{'★'.repeat(emptyStars)}</span>
        <span className="ml-2 text-gray-500">({rating.toFixed(1)})</span>
      </div>
    );
}