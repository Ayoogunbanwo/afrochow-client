import React from "react";
import { User, ChevronDown } from "lucide-react";
import { useAuthContext } from "@/app/context/AuthContext";

const UserMenu = ({ isMenuOpen, setIsMenuOpen, user }) => {
  const { logout } = useAuthContext();

  return (
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
          <div className="px-4 py-2 text-sm text-gray-700">
            {user ? `Hello, ${user.firstname}` : "Hello, Guest"}
          </div>
          <a href="customer/displayProfile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Profile
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Settings
          </a>
          <button onClick={logout} className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
