import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Banner from '@/components/Banner';
import DisplayRestaurant from '@/components/displayrestuarant';
import FeaturedDishes from '@/components/Featureddishes';
import { ChevronRight, Star, TrendingUp, MapPin } from 'lucide-react';
import Image from 'next/image';

const Restaurantpage = () => {


  return (
    <div className="flex flex-col min-h-screen bg-orange-50">
      <Navbar />
      <main className="flex-col">
        <Hero />
        <Banner />
        <FeaturedDishes />
        <DisplayRestaurant />
        {/* Newsletter */}
        <section className="py-12 text-orange-900">
          <div className="max-w-2xl px-4 mx-auto text-center">
            <h2 className="mb-4 text-3xl font-bold">Stay Updated</h2>
            <p className="mb-6 text-orange-900">
              Get notified about new restaurants and exclusive offers
            </p>
            <div className="flex flex-col space-y-4 text-bold md:flex-row md:space-y-0 md:space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-6 py-3 text-gray-800 rounded-full text-bold focus:ring-2 focus:ring-orange-500"
              />
              <button className="px-8 py-3 text-orange-900 bg-orange-500 rounded-full hover:bg-orange-600">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Restaurantpage;