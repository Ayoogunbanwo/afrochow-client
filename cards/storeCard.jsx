import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Heart, Star } from 'lucide-react';
import Image from 'next/image';

const useStoreOpenStatus = (openingHour, closingHour) => {
  return useMemo(() => {
    const now = new Date();
    const currentHour = now.getHours();

    return openingHour >= closingHour
      ? currentHour >= openingHour || currentHour < closingHour
      : currentHour >= openingHour && currentHour < closingHour;
  }, [openingHour, closingHour]);
};

const StoreCard = ({ store }) => {
  if (!store) return null;

  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { storeId, name, rating, openingHour, closingHour, categories, deliveryTime, popularItems } = store;

  const isOpen = useStoreOpenStatus(openingHour, closingHour);
  const imageUrl = popularItems?.length > 0 ? popularItems[0].imageUrl : '/amala.jpg';
  const categoryDisplay = Array.isArray(categories) && categories.length > 0 ? categories.join(' • ') : 'No categories';
  const placeholderBlur = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQAB"; // Replace with a real blur data URL

  const formatTime = (hour) => `${hour.toString().padStart(1, '0')}`;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    setIsFavorite((prev) => !prev);
  };

  const renderImage = () => (
    <div className="relative w-full h-48">
      <Image
        src={imageUrl}
        alt={name}
        layout="fill"
        objectFit="cover"
        placeholder="blur"
        blurDataURL={placeholderBlur}
        onLoadingComplete={() => setImageLoaded(true)}
        onError={() => console.error("Image failed to load")}
        className={`transition duration-300 hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
      {!imageLoaded && (
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
      <span className="text-sm font-semibold text-black-800">{rating.toFixed(1)}</span>
    </div>
  );

  const renderStoreDetails = () => (
    <div className="p-4 space-y-2">
      <h2 className="text-lg font-semibold text-orange-500 line-clamp-1">{name}</h2>
      <p className="text-sm text-black-500">{categories}</p>
      <div className="flex items-center space-x-2 text-sm">
        <span className="text-black-600">{formatTime(openingHour)} - {formatTime(closingHour)}</span>
        <span className={`font-semibold ${isOpen ? 'text-green-500' : 'text-red-500'}`}>{isOpen ? 'Open' : 'Closed'}</span>
      </div>
      <div className="text-sm text-black-600">Delivery: {deliveryTime} minutes</div>
    </div>
  );

  return (
    <Link href={`/restaurant/store/${storeId}`} className="block">
      <div className="relative overflow-hidden transition duration-300 bg-white rounded-lg shadow-md hover:shadow-lg">
        {renderImage()}
        {renderFavoriteButton()}
        {renderRating()}
        {renderStoreDetails()}
      </div>
    </Link>
  );
};

StoreCard.propTypes = {
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
    })),
  }),
};

export default StoreCard;