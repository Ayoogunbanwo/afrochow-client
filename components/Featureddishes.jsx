"use client";
import React from 'react';
import StoreCard from '@/cards/storeCard';
import stores from '@/Data/newdata10.json';

const FeaturedDishes = () => {
  // Display only the first 3 stores
  const displayStores = stores.slice(0, 3);

  return (
<div className="py-8">
  <div className="container mx-auto">
    <h1 className="px-2 pt-4 pb-2 mb-2 text-3xl font-extrabold tracking-tight text-left text-orange-900 sm:text-4xl">
      Featured Products
    </h1>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {displayStores.map((store) => (
        <StoreCard key={store.storeId} store={store} />
      ))}
    </div>
  </div>
</div>

  );
};

export default FeaturedDishes;