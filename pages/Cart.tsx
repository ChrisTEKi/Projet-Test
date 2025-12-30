import React from 'react';
import { CartItem } from '../types';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartProps {
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ cart, updateQuantity, removeFromCart }) => {
  const subtotal = cart.reduce((sum, item) => {
      const price = item.isPromo ? item.promoPrice! : item.price;
      return sum + (price * item.quantity);
  }, 0);
  
  const shipping = subtotal > 100000 ? 0 : 5000;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <ShoppingBag size={64} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Votre panier est vide</h2>
        <p className="text-gray-500 mb-6">Découvrez nos milliers de produits et commencez à magasiner.</p>
        <Link to="/" className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition">
          Retour à la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Mon Panier ({cart.length} articles)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => {
             const price = item.isPromo ? item.promoPrice! : item.price;
             return (
               <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center">
                 <img src={item.images[0]} alt={item.name} className="w-24 h-24 object-cover rounded-lg bg-gray-100" />
                 
                 <div className="flex-1">
                   <h3 className="font-bold text-gray-800 line-clamp-1">{item.name}</h3>
                   <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                   <div className="flex items-center gap-2">
                     <span className="font-bold text-red-600">{price.toLocaleString()} Ar</span>
                     {item.isPromo && <span className="text-xs line-through text-gray-400">{item.price.toLocaleString()} Ar</span>}
                   </div>
                 </div>

                 <div className="flex flex-col items-end gap-3">
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-600">
                      <Trash2 size={18} />
                    </button>
                    <div className="flex items-center border rounded-lg">
                      <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 hover:bg-gray-100">-</button>
                      <span className="px-2 font-bold text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 hover:bg-gray-100">+</button>
                    </div>
                 </div>
               </div>
             );
          })}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="font-bold text-lg mb-4">Résumé de la commande</h3>
              
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-medium">{subtotal.toLocaleString()} Ar</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Livraison</span>
                  <span className="font-medium text-green-600">{shipping === 0 ? 'Gratuite' : `${shipping.toLocaleString()} Ar`}</span>
                </div>
                {shipping === 0 && <div className="text-xs text-green-600 bg-green-50 p-2 rounded">Livraison offerte pour votre commande !</div>}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-2xl text-red-600">{total.toLocaleString()} Ar</span>
                </div>
              </div>

              <Link to="/checkout" className="w-full bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition flex items-center justify-center gap-2">
                Commander <ArrowRight size={20} />
              </Link>

              <div className="mt-4 text-center text-xs text-gray-500">
                 Paiement sécurisé par Domygo
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
