import React from "react"
import Link from "next/link"

const Logo = () => (
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
)

export default Logo
