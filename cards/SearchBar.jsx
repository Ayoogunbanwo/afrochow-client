import React from "react"
import { Search } from "lucide-react"

const SearchBar = ({ placeholder = "Search...", className = "" }) => {
  return (
    <div className="relative w-full">
      <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
      <input
        type="search"
        placeholder={placeholder}
        className={`w-full py-2 pl-10 pr-3 text-sm leading-5 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${className}`}
      />
    </div>
  )
}

export default SearchBar

