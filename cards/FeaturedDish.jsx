import { Star, MapPin, Store } from "lucide-react";

const FeaturedDish = ({ name, price, rating, location, storeId, image }) => {
  return (
    <div className="overflow-hidden transition duration-300 bg-white rounded-lg shadow-sm hover:shadow-md">
      {/* Image Section */}
      <div className="relative h-48">
        <img 
          src={image || "/amala.jpg"} 
          alt={name || "Featured dish"} 
          className="object-cover w-full h-full" 
          loading="lazy"
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Name & Price */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">{name || "Unnamed Dish"}</h3>
          <span className="font-medium text-orange-500">
            {price ? `$${price}` : "N/A"}
          </span>
        </div>

        {/* Rating & Location */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <span className="flex items-center text-gray-600">
              <Star className="w-4 h-4 mr-1 text-yellow-400" aria-hidden="true" />
              {rating ?? "No Rating"}
            </span>
          </div>
          <div className="flex items-center text-gray-500">
            <MapPin className="w-4 h-4 mr-1" aria-hidden="true" />
            {location || "Unknown Location"}
          </div>
        </div>

        {/* Store ID */}
        {storeId && (
          <div className="flex items-center text-gray-500">
            <Store className="w-4 h-4 mr-1" aria-hidden="true" />
            <span className="text-sm">Store ID: {storeId}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedDish;
