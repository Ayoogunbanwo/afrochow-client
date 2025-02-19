'use client';  // Add this for client-side rendering

import React from "react";
import Image from "next/image";
import { GiCookingPot, GiCakeSlice, GiBread, GiShop, GiChiliPepper, GiKnifeFork } from "react-icons/gi";

const Banner = () => {
  const categories = [
    { icon: GiKnifeFork, label: "African Kitchen" },
    { icon: GiCakeSlice, label: "Small Chops/Cake" },
    { icon: GiChiliPepper, label: "Farm Produce" },
    { icon: GiBread, label: "Naija Bread" },
    { icon: GiCookingPot, label: "African Soup" },
    { icon: GiShop, label: "African Store" },
  ];

  return (
    <div className="py-8">
      <div className="container px-4 mx-auto">
        {/* Title */}
        <h2 className="mb-6 text-4xl font-bold text-center text-orange-900 animate-fade-down">
          Explore African Cuisine
        </h2>

        {/* Categories Section */}
        <section className="grid grid-cols-2 gap-4 mb-8 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((item, index) => (
            <div
              key={index}
              className="p-4 text-center transition-all duration-300 bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-2xl hover:scale-105 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
              aria-label={`Explore ${item.label}`}
            >
              <div className="flex items-center justify-center mb-2">
                <div className="transition-transform duration-300 hover:rotate-6">
                  {React.createElement(item.icon, {
                    className:
                      "w-12 h-12 text-orange-600 transition-transform duration-300 transform hover:scale-110",
                  })}
                </div>
              </div>
              <p className="text-sm font-medium text-orange-800">{item.label}</p>
            </div>
          ))}
        </section>

        {/* Banner Section */}
        <section className="space-y-8">
          {["/ofada.jpg", "/ASORTED Food.jpg"].map((src, index) => (
            <div
              key={index}
              className="w-full overflow-hidden transition-transform duration-300 rounded-lg shadow-lg hover:scale-102 animate-fade-up"
              style={{ animationDelay: `${index * 300}ms` }}
            >
              <div className="relative w-full h-64">
                <Image
                  src={src}
                  alt={index === 0 ? "Ofada rice" : "Assorted dishes"}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Banner;
