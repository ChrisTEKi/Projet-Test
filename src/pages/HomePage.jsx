import React from 'react';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { mockProducts, mockCategories } from '../data/mock';

export default function HomePage({ navigate, onAddToCart }) {
  // Fonction simulée pour la barre de recherche sur la page d'accueil
  const handleHomeSearch = (query) => {
    // Redirige vers le catalogue avec le terme de recherche
    navigate('catalog', { search: query });
  };

  // Couleurs pour les Best-Sellers
  const colors = ['bg-orange-100', 'bg-blue-100', 'bg-green-100', 'bg-red-100'];

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative bg-gray-900 h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{
            backgroundImage:
              "url('/assets/hero.jpg')",
          }}
        ></div>
        <div className="relative z-10 text-center p-6 bg-white bg-opacity-90 rounded-xl shadow-2xl m-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            L'Élégance Minimaliste. L'Âme Malgache.
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Sélection haut de gamme pour un foyer d'exception.
          </p>
          <button
            onClick={() => navigate('catalog')}
            className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold uppercase tracking-wide rounded-full shadow-sm text-white bg-orange-500 hover:bg-orange-600 transition transform hover:scale-105"
          >
            Découvrir le Catalogue
          </button>
        </div>
      </div>

      {/* Barre de Recherche */}
      <SearchBar onSearch={handleHomeSearch} />

      {/* Catégories Principales */}
      <section className="container mx-auto px-8 mt-12 max-w-7xl">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Parcourez nos univers
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {mockCategories.map((cat) => (
            <div
              key={cat}
              onClick={() => navigate('catalog', { category: cat })}
              className="p-4 bg-white border border-gray-200 rounded-lg text-center hover:shadow-lg transition transform hover:scale-105 cursor-pointer hover:border-orange-500"
            >
              <span className="text-lg font-medium text-gray-700">{cat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Produits Phares */}
      <section className="container mx-auto px-4 mt-12 max-w-7xl">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Nos Best-Sellers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProducts.slice(0, 4).map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              navigate={navigate}
              onAddToCart={onAddToCart}
              bgColor={colors[index % colors.length]} // ✅ Couleur dynamique
            />
          ))}
        </div>
      </section>
    </div>
  );
}