import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";  // <-- import de l'icône

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
    console.log("Recherche simulée pour:", query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className=" container mx-auto -mt-8 relative z-20 px-4 max-w-4xl"> 
      <div className="flex shadow-xl rounded-lg overflow-hidden border-4 border-white">
        <input
          type="text"
          placeholder="Rechercher: Décoration, Technologie, Artisanat..."
          className="w-full p-4 text-gray-700 focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handleSearch}
          className="bg-orange-500 hover:bg-orange-600 text-white p-4 transition-colors"
        >
          <FaSearch size={24} /> {/* utilisation correcte */}
        </button>
      </div>
    </div>
  );
}