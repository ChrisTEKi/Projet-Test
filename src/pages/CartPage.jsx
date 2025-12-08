import React from 'react';
import Breadcrumbs from "../components/Breadcrumbs"
import { X, ShoppingCart } from 'lucide-react'
// src/pages/CartPage.jsx
import { Trash2 } from 'lucide-react';

const CartPage = ({ cart, navigate, onRemoveItem, onUpdateQuantity }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-7xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Votre Panier est Vide 😢</h1>
        <p className="text-lg text-gray-600 mb-8">Découvrez nos produits exceptionnels et remplissez votre panier.</p>
        <button 
          onClick={() => navigate('catalog')}
          className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors"
        >
          Commencer les Achats
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 border-b pb-4">Votre Panier</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Liste des Articles */}
        <div className="lg:w-3/4 space-y-6">
          {cart.map(item => (
            <div key={item.id} className="flex items-center p-4 bg-white rounded-xl shadow-lg border border-gray-100">
              <img 
                src={item.product.image} 
                alt={item.product.name} 
                className="w-20 h-20 object-cover rounded-md mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900">{item.product.name}</h3>
                <p className="text-sm text-gray-600">{item.product.category}</p>
                <p className="text-lg font-bold text-orange-500 mt-1">{(item.product.price * item.quantity).toFixed(2)} Ar</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                  className="w-16 p-2 border border-gray-300 rounded-lg text-center"
                />
                <button 
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Résumé de la Commande */}
        <div className="lg:w-1/4">
          <div className="bg-white p-6 rounded-xl shadow-lg sticky top-20 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Résumé</h2>
            
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Sous-total:</span>
                <span className="font-medium">{subtotal.toFixed(2)} Ar</span>
              </div>
              <div className="flex justify-between">
                <span>Livraison:</span>
                <span className="font-medium">10.00 Ar</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between text-xl font-extrabold text-gray-900">
                <span>Total:</span>
                <span className="text-orange-500">{(subtotal + 10.00).toFixed(2)} Ar</span>
              </div>
            </div>

            <button
              onClick={() => alert("Simuler la commande...")}
              className="mt-6 w-full bg-gray-800 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-500 transition-colors"
            >
              Passer la Commande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;