
import React, { useState } from 'react'
import RatingStars from './RatingStars'
export default function ProductCard({product,navigate,onAddToCart}){
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-100">
      <div 
        className="h-48 w-full bg-gray-50 flex items-center justify-center cursor-pointer" 
        onClick={() => navigate('product', product)}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x400/CCCCCC/333333?text=Image+Non+Trouvée"; }} 
        />
      </div>
      <div className="p-4">
        <p className="text-xs text-orange-500 font-medium uppercase mb-1">{product.category}</p>
        <h3 className="text-lg font-semibold text-gray-800 truncate cursor-pointer hover:text-orange-500" onClick={() => navigate('product', product)}>{product.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xl font-bold text-gray-900">{product.price.toFixed(2)} Ar</span>
        </div>
        <div className="mt-1 mb-3">
          <RatingStars rating={product.rating} />
        </div>
        <button 
          onClick={() => onAddToCart(product)}
          className="mt-2 w-full bg-gray-800 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-500 transition-colors transform hover:scale-[1.01]"
        >
          Ajouter au Panier
        </button>
      </div>
    </div>
  )
}