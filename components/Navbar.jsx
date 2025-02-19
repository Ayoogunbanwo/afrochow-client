"use client"
import React, { useState } from "react"
import { User, ShoppingCart, ChevronDown, Search } from "lucide-react"
import Link from "next/link"
import SearchBar from "@/cards/SearchBar"
import Logo from "@/components/Logo"
import UserMenu from "@/components/UserMenu"
import useWindowSize from "@/hooks/useWindowSize"

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isSmallScreen = useWindowSize(768)

  return (
    <nav className="sticky top-0 z-50 w-full h-24 p-3 border-b shadow-sm bg-white/90 backdrop-blur-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />
          {/* Profile and Cart Icons */}
          <div className="flex items-center space-x-4">
            {isSmallScreen && (
              <button
                className="p-2 text-orange-600 transition duration-300 rounded-full bg-orange-500/10 hover:bg-orange-500/20 focus:outline-none focus:ring-2 focus:ring-orange-300"
                aria-label="Search"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
              </button>
            )}
            <UserMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
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

