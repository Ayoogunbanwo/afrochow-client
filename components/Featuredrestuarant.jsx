"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Heart, Star } from 'lucide-react';
import Image from 'next/image';
import MenuItem from "@/components/restaurantcard"; // Import the MenuItem component
import stores from '@/Data/newdata10.json'; // Import the store data

const useStoreOpenStatus = (openingHour, closingHour) => {
  return useMemo(() => {
    const now = new Date();
    const currentHour = now.getHours();

    return openingHour >= closingHour
      ? currentHour >= openingHour || currentHour < closingHour
      : currentHour >= openingHour && currentHour < closingHour;
  }, [openingHour, closingHour]);
};

const FeaturedStoreCard = ({ store }) => {
  if (!store) return null;

  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { storeId, name, rating, openingHour, closingHour, categories, deliveryTime, popularItems } = store;

  const isOpen = useStoreOpenStatus(openingHour, closingHour);
  const imageUrl = popularItems?.length > 0 ? popularItems[0].imageUrl : '/default-image.jpg';
  const categoryDisplay = Array.isArray(categories) && categories.length > 0 ? categories.join(' • ') : 'No categories';
  const placeholderBlur = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQAB"; // Replace with a real blur data URL

  const formatTime = (hour) => `${hour.toString().padStart(2, '0')}:00`;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    setIsFavorite((prev) => !prev);
  };

  const renderImage = () => (
    <div className="relative w-full h-48 overflow-hidden">
      {!error ? (
        <Image
          src={imageUrl || "/fallback-image.jpg"}
          alt={name || "Image"}
          fill
          placeholder="blur"
          blurDataURL={placeholderBlur || "/fallback-placeholder.jpg"}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setError(true)}
          className={`transition-transform duration-300 ease-in-out hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
      )}
    </div>
  );

  const renderFavoriteButton = () => (
    <button
      onClick={handleFavoriteClick}
      className="absolute z-10 p-2 transition rounded-full top-4 left-4 bg-white/90 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} fill={isFavorite ? 'currentColor' : 'none'} />
    </button>
  );

  const renderRating = () => (
    <div className="absolute flex items-center px-2 py-1 space-x-1 rounded-full top-4 right-4 bg-white/90 backdrop-blur-sm">
      <Star className="w-4 h-4 text-amber-400" fill="currentColor" />
      <span className="text-sm font-semibold text-gray-800">{rating.toFixed(1)}</span>
    </div>
  );

  const renderStoreDetails = () => (
    <div className="p-4 space-y-2">
      <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{name}</h3>
      <p className="text-sm text-gray-500">{categoryDisplay}</p>
      <div className="flex items-center space-x-2 text-sm">
        <span className="text-gray-600">{formatTime(openingHour)} - {formatTime(closingHour)}</span>
        <span className={`font-semibold ${isOpen ? 'text-green-500' : 'text-red-500'}`}>{isOpen ? 'Open' : 'Closed'}</span>
      </div>
      <div className="text-sm text-gray-600">Delivery: {deliveryTime}</div>
    </div>
  );

  return (
    <Link href={`/restaurant/${storeId}`} className="block">
      <div className="relative overflow-hidden transition duration-300 bg-white rounded-lg shadow-md hover:shadow-lg">
        {renderImage()}
        {renderFavoriteButton()}
        {renderRating()}
        {renderStoreDetails()}

        {/* Render 3 MenuItem cards */}
         <div className="p-4 mt-4 space-y-4"> {/* Added padding and margin top */}
          {popularItems?.slice(0,3).map((item) => ( // Display 3 popular items or less. No random stores here.
            <MenuItem
              key={item.name} // Use a more stable key like item.name or a unique ID if available
              image={item.imageUrl || '/default-image.jpg'}
              title={item.name}
              deliveryduration={deliveryTime} // Use the store's delivery time
              productype={categories?.join(' • ') || 'General'} // Use the store's categories
            />
          ))}
        </div>
      </div>
    </Link>
  );
};

FeaturedStoreCard.propTypes = {
  store: PropTypes.shape({
    storeId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    openingHour: PropTypes.number.isRequired,
    closingHour: PropTypes.number.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string),
    deliveryTime: PropTypes.string.isRequired,
    popularItems: PropTypes.arrayOf(PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired, // Make sure popular items have names
    })),
  }),
};

export default FeaturedStoreCard;
