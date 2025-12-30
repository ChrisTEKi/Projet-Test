import React, { useEffect, useState } from 'react';
import { CATEGORIES, MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';
import { Star, Truck, ShieldCheck, Headset, ArrowRight, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MockAPI } from '../services/mockBackend';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    MockAPI.getProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12 md:py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Tout ce dont vous avez besoin, <br/>
              <span className="text-yellow-300">livré chez vous.</span>
            </h1>
            <p className="text-lg opacity-90">
              Tech, Alimentation, Mode, Meubles. Profitez de la livraison rapide à Antananarivo et en province.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/category/all" className="bg-white text-red-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
                Commencer mes achats
              </Link>
              <Link to="/join" className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition">
                Devenir Vendeur
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
             {/* Abstract Hero Image Placeholder */}
             <div className="relative w-80 h-80 md:w-96 md:h-96 bg-white/10 rounded-full backdrop-blur-sm flex items-center justify-center animate-pulse">
                <div className="text-center">
                  <span className="text-6xl">🛍️</span>
                  <p className="mt-4 font-bold">Domygo Market</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100 -mt-10 relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-full"><Truck size={24}/></div>
            <div>
              <h4 className="font-bold text-gray-800">Livraison Express</h4>
              <p className="text-xs text-gray-500">Partout à Madagascar</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="p-3 bg-red-100 text-red-600 rounded-full"><ShieldCheck size={24}/></div>
            <div>
              <h4 className="font-bold text-gray-800">Paiement Sécurisé</h4>
              <p className="text-xs text-gray-500">Mobile Money & Visa</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="p-3 bg-red-100 text-red-600 rounded-full"><Wallet size={24}/></div>
            <div>
              <h4 className="font-bold text-gray-800">Cashback Fidélité</h4>
              <p className="text-xs text-gray-500">Gagnez des points</p>
            </div>
          </div>
           <div className="flex items-center gap-4">
             <div className="p-3 bg-red-100 text-red-600 rounded-full"><Headset size={24}/></div>
            <div>
              <h4 className="font-bold text-gray-800">Support 24/7</h4>
              <p className="text-xs text-gray-500">Chat & Téléphone</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          Catégories Populaires <ArrowRight size={20} className="text-red-600"/>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES.map(cat => (
             <Link key={cat.id} to={`/category/${cat.id}`} className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 hover:border-red-200 group">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-red-600 group-hover:text-white transition-colors mb-3">
                   {/* We would render dynamic icons here based on cat.icon string, simplified for now */}
                   <span className="text-lg font-bold">{cat.name[0]}</span>
                </div>
                <span className="text-sm font-medium text-center text-gray-700 group-hover:text-red-600">{cat.name}</span>
             </Link>
          ))}
        </div>
      </section>

      {/* Recommended Products */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Recommandé pour vous</h2>
            <p className="text-sm text-gray-500">Basé sur vos recherches récentes (Algorithm)</p>
          </div>
          <Link to="/category/all" className="text-red-600 text-sm font-semibold hover:underline">Voir tout</Link>
        </div>

        {loading ? (
          <div className="text-center py-20">Chargement des produits...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {products.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition group border border-gray-100 overflow-hidden flex flex-col">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                  {product.isPromo && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">-{(100 - (product.promoPrice!/product.price * 100)).toFixed(0)}%</span>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{product.category}</div>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-red-600">{product.name}</h3>
                  
                  <div className="mt-auto">
                    <div className="flex items-baseline gap-2 mb-2">
                       <span className="text-lg font-bold text-red-600">
                         {product.isPromo ? product.promoPrice?.toLocaleString() : product.price.toLocaleString()} Ar
                       </span>
                       {product.isPromo && (
                         <span className="text-xs text-gray-400 line-through">{product.price.toLocaleString()} Ar</span>
                       )}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                       <Star size={12} className="text-yellow-400 fill-yellow-400 mr-1"/>
                       <span>{product.rating} ({product.reviewCount})</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Banner App Mobile */}
      <section className="container mx-auto px-4 mt-8">
        <div className="bg-slate-900 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden">
          <div className="relative z-10 md:w-2/3">
             <h2 className="text-3xl font-bold mb-4">Téléchargez l'application Domygo</h2>
             <p className="text-gray-300 mb-6 max-w-lg">
               Accédez à des offres exclusives, suivez vos commandes en temps réel et gérez votre Wallet directement depuis votre mobile.
             </p>
             <div className="flex gap-4">
               <button className="bg-white text-slate-900 px-6 py-2 rounded-lg font-bold text-sm hover:bg-gray-100">App Store</button>
               <button className="bg-transparent border border-white text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-white/10">Google Play</button>
             </div>
          </div>
          <div className="md:w-1/3 relative z-10 mt-8 md:mt-0 flex justify-center">
             {/* Mock Phone */}
             <div className="w-40 h-64 bg-gray-800 rounded-3xl border-4 border-gray-600 shadow-2xl flex items-center justify-center">
                <span className="font-bold text-2xl">App</span>
             </div>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/20 rounded-full blur-3xl"></div>
        </div>
      </section>

    </div>
  );
};

export default Home;
