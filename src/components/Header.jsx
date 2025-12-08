
import React, { useState } from 'react'
import Sidebar from './Sidebar';
import { ShoppingCart, User, Menu, X, Search, ChevronRight } from 'lucide-react'

export default function Header({ navigate, cartItemCount }){
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (page, props = {}) => {
    navigate(page, props);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center max-w-7xl">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavigate('home')}>
            <img
              src="/assets/DM2.png" // remplace par le bon chemin
              alt="DOMYGO Logo"
              width="120"
              height="auto"
              //className="h-8 w-auto max-w-[120px] object-contain"
            />
        </div>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <button onClick={() => handleNavigate('catalog')} className="text-gray-600 hover:text-orange-500 transition-colors">Catalogue</button>
          <button onClick={() => handleNavigate('about')} className="text-gray-600 hover:text-orange-500 transition-colors">À Propos</button>
        </nav>

        {/* Icônes de droite (Mobile & Desktop) */}
        <div className="flex items-center space-x-4">
          <button onClick={() => handleNavigate('account', { action: 'login' })} className="flex items-center text-gray-600 hover:text-orange-500 transition-colors p-2 rounded-full hover:bg-gray-100">
            <User size={20} />
            <span className="hidden sm:inline ml-1 text-sm">Compte</span>
          </button>
          
          <button onClick={() => handleNavigate('cart')} className="relative text-gray-600 hover:text-orange-500 transition-colors p-2 rounded-full hover:bg-gray-100">
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">{cartItemCount}</span>
            )}
          </button>

          {/* Bouton Menu Mobile (Burger) */}
          <button className="md:hidden p-2 text-gray-600 hover:text-orange-500 rounded-full hover:bg-gray-100" onClick={() => setIsMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </div>
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} navigate={navigate} />
    </header>
  );
}