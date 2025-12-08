// src/pages/CatalogPage.jsx
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import { mockProducts } from '../data/mock';

const CatalogPage = ({ navigate, onAddToCart, initialCategory, initialSearch }) => {
  const [filter, setFilter] = useState(initialCategory || '');
  const [sort, setSort] = useState('rating_desc');
  const [search, setSearch] = useState(initialSearch || '');

  useEffect(() => {
    if (initialCategory) setFilter(initialCategory);
    if (initialSearch) setSearch(initialSearch);
  }, [initialCategory, initialSearch]);

  // Filtrage et tri des produits
  const filteredProducts = mockProducts
    .filter(p => !filter || p.category === filter)
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));
  
  const sortedProducts = filteredProducts.sort((a, b) => {
    switch (sort) {
      case 'price_asc': return a.price - b.price;
      case 'price_desc': return b.price - a.price;
      case 'rating_desc': return b.rating - a.rating;
      default: return 0;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Catalogue des Produits</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Colonne de filtres */}
        <div className="w-full md:w-1/4">
          <Filters filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
        </div>

        {/* Grille des produits */}
        <div className="w-full md:w-3/4">
          {/* Note: SearchBar ici utilise une mise en page différente de celle de la HomePage */}
          <div className="mb-4">
            <SearchBar onSearch={setSearch} initialQuery={search} />
          </div>
          {search && <p className="text-gray-600 mb-4 mt-2">Résultats pour: <span className="font-semibold">{search}</span></p>}

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} navigate={navigate} onAddToCart={onAddToCart} />
              ))}
            </div>
          ) : (
            <div className="text-center p-12 bg-white rounded-xl shadow-lg mt-4">
              <p className="text-lg text-gray-600">Aucun produit trouvé correspondant aux critères.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;







/*import React, { useState, useEffect } from 'react'
import Filters from "../components/Filter"
import SearchBar from "../components/SearchBar"
import { mockProducts, mockCategories } from '../data/mock'
import ProductCard from '../components/ProductCard'

export default function CataloguePage({navigate,onAddToCart,initialCategory, initialSearch}){
  const [filter, setFilter] = useState(initialCategory || '');
  const [sort, setSort] = useState('rating_desc');
  const [search, setSearch] = useState(initialSearch || '');

  useEffect(() => {
    // Synchronise les props initiales avec l'état local au chargement
    if (initialCategory) setFilter(initialCategory);
    if (initialSearch) setSearch(initialSearch);
  }, [initialCategory, initialSearch]);

  // Filtrage et tri des produits
  const filteredProducts = mockProducts
    .filter(p => !filter || p.category === filter)
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));
  
  const sortedProducts = filteredProducts.sort((a, b) => {
    switch (sort) {
      case 'price_asc': return a.price - b.price;
      case 'price_desc': return b.price - a.price;
      case 'rating_desc': return b.rating - a.rating;
      default: return 0;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Catalogue des Produits</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Colonne de filtres (src/components/Filters.jsx) }*/
        /*<div className="w-full md:w-1/4">
            <Filters filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
        </div>

        {/* Grille des produits }*//*
        <div className="w-full md:w-3/4">
            <SearchBar onSearch={setSearch} />
            {search && <p className="text-gray-600 mb-4 mt-2">Résultats pour: <span className="font-semibold">{search}</span></p>}

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedProducts.map(product => (
                        <ProductCard key={product.id} product={product} navigate={navigate} onAddToCart={onAddToCart} />
                    ))}
                </div>
            ) : (
                <div className="text-center p-12 bg-white rounded-xl shadow-lg">
                    <p className="text-lg text-gray-600">Aucun produit trouvé correspondant aux critères.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}*/