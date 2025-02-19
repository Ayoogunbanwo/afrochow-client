import React, { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ 
  placeholder = "Search...", 
  className = "",
  onSearch = () => {},
  debounceMs = 300,
  minLength = 2,
  maxLength = 50,
  autoFocus = false,
  expandOnMobile = true
}) => {
  const [query, setQuery] = useState('');
  const [timer, setTimer] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Debounced search handler
  const handleSearch = useCallback((value) => {
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => {
      if (value.length >= minLength) {
        onSearch(value);
      }
    }, debounceMs);
    setTimer(newTimer);
  }, [debounceMs, minLength, onSearch, timer]);

  // Input change handler
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  // Clear search handler
  const handleClear = () => {
    setQuery('');
    onSearch('');
    if (expandOnMobile) {
      setIsExpanded(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.length >= minLength) {
      onSearch(query);
    }
  };

  // Toggle search expansion on mobile
  const toggleExpand = () => {
    if (expandOnMobile) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`relative ${expandOnMobile ? 'sm:w-full' : 'w-full'} ${className}`}
      role="search"
    >
      <div className={`
        relative
        transition-all
        duration-300
        ease-in-out
        ${expandOnMobile ? `
          sm:w-64
          md:w-80
          ${isExpanded ? 'w-full' : 'w-10'}
        ` : 'w-full'}
      `}>
        {/* Search Icon/Button */}
        <button
          type="button"
          onClick={toggleExpand}
          className={`
            absolute
            left-3
            top-1/2
            transform
            -translate-y-1/2
            text-gray-400
            hover:text-gray-600
            focus:outline-none
            focus:text-gray-600
            z-10
            ${expandOnMobile ? 'sm:pointer-events-none' : 'pointer-events-none'}
          `}
          aria-label={isExpanded ? "Collapse search" : "Expand search"}
        >
          <Search className="w-4 h-4" aria-hidden="true" />
        </button>

        {/* Search Input */}
        <input
          type="search"
          value={query}
          onChange={handleChange}
          placeholder={isExpanded || !expandOnMobile ? placeholder : ""}
          className={`
            py-2
            text-sm
            leading-5
            text-gray-900
            placeholder-gray-500
            bg-white
            border
            border-gray-300
            rounded-full
            transition-all
            duration-300
            ease-in-out
            focus:outline-none
            focus:ring-2
            focus:ring-orange-500
            focus:border-orange-500
            ${expandOnMobile ? `
              ${isExpanded ? 'w-full pl-10 pr-8 opacity-100' : 'w-10 pl-10 pr-3 opacity-0 sm:opacity-100 sm:w-full'}
              sm:pl-10
              sm:pr-8
            ` : 'w-full pl-10 pr-8'}
          `}
          aria-label={placeholder}
          autoFocus={autoFocus}
          minLength={minLength}
          maxLength={maxLength}
          style={{
            visibility: (!expandOnMobile || isExpanded) ? 'visible' : 'hidden'
          }}
        />

        {/* Clear Button */}
        {query && (isExpanded || !expandOnMobile) && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;