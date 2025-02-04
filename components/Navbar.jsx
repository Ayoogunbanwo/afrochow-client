"use client"
import React, { useState, useEffect } from "react"
import { User, ShoppingCart, ChevronDown, Search } from "lucide-react"
import Link from "next/link"
import SearchBar from "@/cards/SearchBar"

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768)
    }

    handleResize() // Initial check
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <nav className="sticky top-0 z-50 w-full h-24 p-3 border-b shadow-sm bg-white/90 backdrop-blur-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105">
              <div className="flex items-center justify-center w-8 h-8 text-white bg-orange-500 rounded-md">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L9 10H2L5 18L12 22L19 18L22 10H15L12 2Z" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-wider text-green-900">Afrochow</span>
            </Link>
          </div>

          {/* Search Bar (Desktop) */}
          {!isSmallScreen && (
            <div className="flex-1 max-w-2xl mx-4">
              <SearchBar placeholder="Filter by location" />
            </div>
          )}

          {/* Profile and Cart Icons */}
          <div className="flex items-center space-x-4">
            {isSmallScreen && (
              <button
                className="p-2 text-orange-600 transition duration-300 rounded-full bg-orange-500/10 hover:bg-orange-500/20 focus:outline-none focus:ring-2 focus:ring-orange-300"
                aria-label="Search"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            <div className="relative">
              <button
                className="flex items-center p-2 text-orange-600 transition duration-300 rounded-full bg-orange-500/10 hover:bg-orange-500/20 focus:outline-none focus:ring-2 focus:ring-orange-300"
                aria-label="User menu"
                aria-haspopup="true"
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <User className="w-5 h-5" />
                <ChevronDown
                  className={`w-4 h-4 ml-1 transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 w-48 py-2 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Logout
                  </a>
                </div>
              )}
            </div>

            <button
              className="p-2 text-orange-600 transition duration-300 rounded-full bg-orange-500/10 hover:bg-orange-500/20 focus:outline-none focus:ring-2 focus:ring-orange-300"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSmallScreen && isSearchOpen && (
          <div className="py-4">
            <SearchBar placeholder="Filter by location" />
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

