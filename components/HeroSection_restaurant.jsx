import React from "react";
import { Clock, Truck, MapPin, Star } from "lucide-react";

const HeroSection = ({ name, openingTime, closingTime, deliveryTime, deliveryFee, pickupAvailable, rating }) => {
  return (
    <section className="relative px-4 py-24 overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600">
      <div className="absolute inset-0 opacity-10 bg-pattern"></div>
      <div className="container relative z-10 max-w-6xl px-4 mx-auto">
        <div className="text-center text-white">
          <h2 className="mb-6 text-5xl font-extrabold tracking-tight">{name}</h2>
          
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span><span className="mr-2 font-medium">Hours:</span>{openingTime} - {closingTime}</span>
            </div>
            <div className="flex items-center">
              <Truck className="w-5 h-5 mr-2" />
              <span><span className="mr-2 font-medium">Delivery:</span>{deliveryTime} • ${deliveryFee}</span>
            </div>
            {rating && (
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-300" />
                <span><span className="mr-2 font-medium">Rating:</span>{rating}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 text-lg font-semibold text-orange-600 transition-all duration-300 bg-white rounded-full hover:bg-orange-50 hover:shadow-lg">
              Order Now
            </button>
            {pickupAvailable && (
              <button className="px-8 py-3 text-lg font-semibold transition-all duration-300 border-2 border-white rounded-full hover:bg-white/10">
                <MapPin className="inline w-5 h-5 mr-2" />
                Schedule Pickup
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;