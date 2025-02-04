import React from 'react';

const MenuItem = ({ image, title, deliveryduration, productype }) => {
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-lg">
      <img src={image} alt={title} className="object-cover w-full h-48" />
      <div className="p-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="flex items-center space-x-2 text-gray-500">
          <span>{deliveryduration} mins</span>
          <span className="text-green-500">{productype}</span>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;