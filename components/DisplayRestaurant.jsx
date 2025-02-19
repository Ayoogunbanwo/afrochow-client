import React from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

const DisplayRestaurant = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container px-4 mx-auto">
        <h2 className="mb-6 text-3xl font-bold text-center text-orange-900">Restaurants Near You</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Example of a restaurant card */}
          <div className="overflow-hidden transition-transform duration-300 rounded-lg shadow-lg hover:scale-105">
            <div className="relative w-full h-64">
              <Image
                src="https://res.cloudinary.com/dntowouv0/image/upload/v1737919513/victoria-shes-UC0HZdUitWY-unsplash_wa1zr0.jpg"
                alt="Restaurant"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h3 className="mb-2 text-xl font-bold text-orange-900">Restaurant Name</h3>
              <p className="mb-4 text-gray-700">A brief description of the restaurant.</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-700" />
                  <span className="ml-2 text-gray-700">Location</span>
                </div>
                <button className="flex items-center px-4 py-2 text-white bg-orange-600 rounded-full hover:bg-orange-700">
                  View Menu <ChevronRight className="ml-2" />
                </button>
              </div>
            </div>
          </div>
          {/* Add more restaurant cards as needed */}
        </div>
      </div>
    </section>
  );
};

export default DisplayRestaurant;
