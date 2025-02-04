"use client";
import React, { useState } from 'react';
import StoreCard from '@/cards/storeCard';
import stores from '@/Data/newdata10.json';

const DisplayRestaurant = () => {


  const [visibleCount, setVisibleCount] = useState(9);
  const itemsPerPage = 9;

  const displayStores = stores.slice(0, visibleCount);
  const hasMore = visibleCount < stores.length;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + itemsPerPage, stores.length));
  };

  return (
    <div className="min-h-screen ">
      <div className="container px-4 mx-auto">
        <h1 className="py-8 text-3xl font-extrabold tracking-tight text-left text-orange-900 sm:text-4xl">
          All Restaurants
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayStores.map((store) => (
            <StoreCard key={store.storeId} store={store} />
          ))}
        </div>
        {hasMore && (
          <div className="mt-8 text-center">
            <button 
              onClick={loadMore}
              className="inline-block px-6 py-3 font-semibold text-orange-900 transition-colors duration-300 border-2 border-orange-900 rounded-lg hover:bg-orange-900 hover:text-white"
            >
              View More Restaurants
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayRestaurant;