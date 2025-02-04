import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Badge from '@/components/ui/badge';
import FavoriteButton from "@/cards/Favouritebutton";

const MenuItemCard = ({ 
  item, 
  isFavorite = false, 
  toggleFavorite, 
  storeId 
}) => {
  if (!item) return null;

  const { 
    itemid, 
    imageUrl, 
    name, 
    price, 
    description, 
    dietary 
  } = item;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md transition-shadow hover:shadow-lg">
        <div className="relative overflow-hidden mb-4">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={name || "Menu Item"}
            width={400}
            height={192}
            className="w-full h-48 object-cover rounded-lg transform transition-transform group-hover:scale-105"
            loading="lazy"
          />

          
          <div className="absolute top-2 right-2">
            <FavoriteButton
              isFavorite={isFavorite}
              toggleFavorite={() => toggleFavorite(itemid)}
              itemId={itemid}
            />
          </div>
        </div>

        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
          <span className="text-lg font-bold text-orange-500">
            ${price.toFixed(2)}
          </span>
        </div>

        {dietary?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {dietary.map((diet, index) => (
              <Badge 
                key={`${itemid}-${diet}-${index}`}
                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
              >
                {diet}
              </Badge>
            ))}
          </div>
        )}

        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {description}
          </p>
        )}

      <Link 
        href={`/restaurant/store/${storeId}/item/${itemid}`} 
        className="block mt-4"
      >
        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors">
          Order Now
        </Button>
      </Link>
    </div>
  );
};

export default MenuItemCard;