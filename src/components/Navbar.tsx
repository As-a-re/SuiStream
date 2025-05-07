"use client"

import { useState } from "react"
import { Menu, X, Search } from "lucide-react"

// Simplified Navbar component without complex TypeScript features
const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-sui-dark/80 backdrop-blur-md border-b border-white/10">
      <div className="container flex justify-between items-center h-16 px-4 mx-auto">
        <div className="flex items-center space-x-1">
          <a href="#" className="text-xl font-bold text-white flex items-center">
            <span className="text-sui-blue mr-1">Sui</span>Stream
          </a>

          <div className="hidden md:flex items-center ml-10 space-x-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Movies
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              TV Shows
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              My Collection
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white p-2 rounded-full">
            <Search className="h-5 w-5" />
          </button>

          <button className="bg-sui-blue hover:bg-sui-blue-dark text-white px-4 py-2 rounded-md">Connect Wallet</button>

          {/* Mobile menu button */}
          <button className="md:hidden text-gray-400 hover:text-white p-2" onClick={toggleMobileMenu}>
            {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {showMobileMenu && (
        <div className="md:hidden bg-sui-dark-accent border-b border-white/10">
          <div className="py-2 px-4 space-y-1">
            <a href="#" className="block py-2 text-white hover:bg-white/10 rounded px-2">
              Home
            </a>
            <a href="#" className="block py-2 text-white hover:bg-white/10 rounded px-2">
              Movies
            </a>
            <a href="#" className="block py-2 text-white hover:bg-white/10 rounded px-2">
              TV Shows
            </a>
            <a href="#" className="block py-2 text-white hover:bg-white/10 rounded px-2">
              My Collection
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
