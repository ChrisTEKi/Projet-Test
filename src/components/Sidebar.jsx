import React from 'react';
import { X, ChevronRight, User, Phone } from 'react-feather'; 
// ou bien depuis react-icons :
// import { FaTimes, FaChevronRight, FaUser, FaPhone } from "react-icons/fa";

export default function Sidebar({ isMenuOpen, setIsMenuOpen, navigate }) {
  const handleNavigate = (page, props = {}) => {
    navigate(page, props);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Overlay pour fermer en cliquant à l'extérieur */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Le Menu qui Coulisse */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-2xl z-50 transform transition-transform duration-300 md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* En-tête du menu */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Navigation</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-gray-600 hover:text-orange-500 rounded-full hover:bg-gray-100"
            >
              <X size={24} />
            </button>
          </div>

          {/* Liens de Navigation */}
          <nav className="flex flex-col py-4 space-y-2 flex-grow">
            <button
              onClick={() => handleNavigate('home')}
              className="text-gray-800 hover:bg-orange-50 p-3 rounded text-left flex items-center justify-between"
            >
              Accueil <ChevronRight size={18} />
            </button>
            <button
              onClick={() => handleNavigate('catalog')}
              className="text-gray-800 hover:bg-orange-50 p-3 rounded text-left flex items-center justify-between"
            >
              Catalogue <ChevronRight size={18} />
            </button>
            <button
              onClick={() => handleNavigate('about')}
              className="text-gray-800 hover:bg-orange-50 p-3 rounded text-left flex items-center justify-between"
            >
              À Propos <ChevronRight size={18} />
            </button>
            <hr className="my-2 border-gray-100" />
            <button
              onClick={() => handleNavigate('account', { action: 'login' })}
              className="text-gray-800 hover:bg-orange-50 p-3 rounded text-left flex items-center justify-between"
            >
              Se connecter <User size={18} />
            </button>
            <button
              onClick={() => handleNavigate('account', { action: 'register' })}
              className="text-gray-800 hover:bg-orange-50 p-3 rounded text-left flex items-center justify-between"
            >
              S'inscrire <ChevronRight size={18} />
            </button>
          </nav>

          {/* Informations rapides en bas du menu */}
          <div className="pt-4 border-t border-gray-100 text-sm text-gray-600">
            <p className="font-semibold mb-2">Domygo</p>
            <p className="flex items-center">
              <Phone size={14} className="mr-2" /> +261 32...
            </p>
          </div>
        </div>
      </div>
    </>
  );
}