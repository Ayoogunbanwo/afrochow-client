"use client"; // Ensure this is a client component

import React, { useState } from "react";
import { Menu, X, User, LogOut, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/context/Cartcontext"; // Import useCart hook
import Link from "next/link";

const Header = ({ name, logo, description }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart(); // Access cart state

  return (
    <header className="bg-white shadow-md">
      <div className="container px-6 py-4 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={logo} alt="Store Logo" className="w-12 h-12 rounded-full" />
            <div className="ml-4">
              <h1 className="text-2xl font-bold">{name}</h1>
              <p className="hidden text-sm text-gray-600 sm:block">{description}</p>
            </div>
          </div>

          {/* Desktop Navbar */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Fancy Restaurants Link */}
            <Link 
              href="/restaurant" 
              className="px-4 py-2 text-white bg-orange-500 rounded-full hover:bg-orange-600 transition duration-300 ease-in-out"
            >
              Continue Shopping
            </Link>

            <button className="p-2 rounded-full hover:bg-gray-100">
              <User className="w-6 h-6" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <LogOut className="w-6 h-6" />
            </button>
            <Link href="/Cart" className="relative p-2 rounded-full hover:bg-gray-100">
              <ShoppingCart className="w-6 h-6" />
              {/* Display cart count */}
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu (Dropdown) */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col space-y-2">
              {/* Fancy Restaurants Link */}
              <Link 
                href="/restaurant" 
                className="px-4 py-2 text-white bg-orange-500 rounded-full hover:bg-orange-600 transition duration-300 ease-in-out text-center"
              >
                Browse more Restaurants
              </Link>

              <button className="w-full px-4 py-2 text-left rounded-full hover:bg-gray-100 flex items-center space-x-2">
                <User className="w-6 h-6" />
                <span>Profile</span>
              </button>
              <button className="w-full px-4 py-2 text-left rounded-full hover:bg-gray-100 flex items-center space-x-2">
                <LogOut className="w-6 h-6" />
                <span>Log Out</span>
              </button>
              <Link 
                href="/Cart" 
                className="w-full px-4 py-2 text-left rounded-full hover:bg-gray-100 flex items-center space-x-2 relative"
              >
                <ShoppingCart className="w-6 h-6" />
                <span>Cart</span>
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;