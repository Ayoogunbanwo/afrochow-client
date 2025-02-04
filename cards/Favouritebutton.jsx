import React from 'react';

const FavoriteButton = ({ isFavorite, toggleFavorite, itemId }) => (
  <button
    className="absolute p-2 transition-opacity bg-white rounded-full opacity-0 top-2 right-2 group-hover:opacity-100"
    onClick={() => toggleFavorite(itemId)}
    aria-label={`${isFavorite ? "Remove from" : "Add to"} favorites`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={isFavorite ? "currentColor" : "none"}
      stroke="currentColor"
      className={`w-5 h-5 ${isFavorite ? "text-red-500" : ""}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  </button>
);
 export default FavoriteButton;