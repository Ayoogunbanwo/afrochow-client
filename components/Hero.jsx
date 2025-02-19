import React from 'react';
import Image from 'next/image';
import { ShoppingCart, Search } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden text-center bg-white">
      {/* Static Background Layer with Before and After Pseudo-Elements */}
      <div className="absolute inset-0 bg-center bg-cover blur-sm before:absolute before:-top-8 before:left-0 before:w-full before:h-16 before:bg-white before:rounded-b-full before:z-10 after:absolute after:-bottom-8 after:left-0 after:w-full after:h-16 after:bg-white after:rounded-t-full after:z-10">
        <Image
          className="object-cover"
          src="/Jollof.jpg"  // Replace with your image path
          alt="Background Image"
          fill
          quality={75}  // Optional: adjust image quality
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-5"></div>

      {/* Hero content */}
      <div className="relative z-10 w-full max-w-4xl px-4">
        <h1 className="mb-6 text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-2xl animate-fade-in-down">
          <span className="block">Home Cooked</span>
          <span className="block text-green-400">Delivered Fresh</span>
        </h1>

        <p className="mb-10 text-lg text-gray-200 sm:text-xl md:text-2xl lg:text-3xl drop-shadow-lg animate-fade-in-up">
          Find African Food Wey Dey Your Area!!!
        </p>

        {/* Search and Action Buttons */}
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="relative w-full max-w-md">
            <input 
              type="text" 
              placeholder="Find restaurants, cuisines..."
              className="w-full px-4 py-3 text-gray-800 placeholder-gray-500 rounded-full bg-white/80 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Search restaurants and cuisines"
            />
            <Search className="absolute text-gray-500 transform -translate-y-1/2 right-4 top-1/2" />
          </div>
          <button className="flex items-center px-6 py-3 font-bold text-white transition duration-300 bg-orange-600 rounded-full hover:bg-orange-700 group">
            <ShoppingCart className="mr-2 group-hover:animate-bounce" />
            Order Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
