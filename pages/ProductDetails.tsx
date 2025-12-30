import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types';
import { MockAPI } from '../services/mockBackend';
import { Star, Truck, RefreshCw, Shield, Heart, Share2, MessageCircle } from 'lucide-react';
import { POINT_CONVERSION_RATE } from '../constants';

interface ProductDetailsProps {
  addToCart: (product: Product, qty: number) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ addToCart }) => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (id) {
      MockAPI.getProductById(id).then(setProduct);
    }
  }, [id]);

  if (!product) return <div className="p-20 text-center">Chargement...</div>;

  const currentPrice = product.isPromo ? product.promoPrice! : product.price;
  const pointsEarned = Math.floor(currentPrice / POINT_CONVERSION_RATE);

  return (
    <div className="container mx-auto px-4 py-8">
       {/* Breadcrumb */}
       <div className="text-sm text-gray-500 mb-6">
         Accueil / {product.category} / <span className="text-gray-900">{product.name}</span>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
         {/* Images */}
         <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
              <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 ${activeImage === idx ? 'border-red-600' : 'border-transparent'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
         </div>

         {/* Info */}
         <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"} />)}
              </div>
              <span className="text-sm text-blue-600 underline cursor-pointer">{product.reviewCount} avis</span>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-green-600 font-medium">En Stock ({product.stock})</span>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl mb-6">
               <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-red-600">{currentPrice.toLocaleString()} Ar</span>
                  {product.isPromo && (
                    <span className="text-xl text-gray-400 line-through">{product.price.toLocaleString()} Ar</span>
                  )}
               </div>
               
               <div className="flex items-center gap-2 text-sm text-gray-600 bg-yellow-50 p-2 rounded border border-yellow-100 inline-block">
                  <span className="font-bold text-yellow-700">+{pointsEarned} Points</span>
                  <span>ajoutés à votre fidélité</span>
               </div>
               
               <div className="mt-4 text-sm text-gray-600 space-y-2">
                 <p className="flex items-center gap-2"><Truck size={16}/> Livraison estimée : 24h - 48h</p>
                 <p className="flex items-center gap-2"><RefreshCw size={16}/> Retours gratuits sous 15 jours</p>
               </div>
            </div>

            <p className="text-gray-700 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
               <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                  <button className="px-4 py-3 hover:bg-gray-100" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <input type="text" value={quantity} readOnly className="w-12 text-center outline-none font-bold" />
                  <button className="px-4 py-3 hover:bg-gray-100" onClick={() => setQuantity(quantity + 1)}>+</button>
               </div>
               <button 
                onClick={() => addToCart(product, quantity)}
                className="flex-1 bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
               >
                 Ajouter au panier
               </button>
               <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">
                 <Heart size={24} />
               </button>
            </div>

            {/* Vendor Info */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-3">
                   <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                   <div>
                     <p className="font-bold text-sm">Boutique Officielle Samsung</p>
                     <p className="text-xs text-gray-500">98% avis positifs</p>
                   </div>
                 </div>
                 <button className="text-sm border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 flex items-center gap-2">
                    <MessageCircle size={16}/> Contacter
                 </button>
              </div>
            </div>

         </div>
       </div>

       {/* Tabs: Description, Specs, Reviews */}
       <div className="mt-16">
          <div className="border-b border-gray-200 flex gap-8 mb-6">
             <button className="border-b-2 border-red-600 pb-2 font-bold text-red-600">Description</button>
             <button className="pb-2 text-gray-500 hover:text-gray-800">Spécifications</button>
             <button className="pb-2 text-gray-500 hover:text-gray-800">Avis Clients</button>
          </div>
          <div className="prose max-w-none text-gray-700">
             <p>
               Découvrez le summum de la technologie avec ce produit. Conçu pour durer et pour offrir une performance exceptionnelle.
               Idéal pour les utilisateurs exigeants.
             </p>
             <ul>
               <li>Qualité supérieure garantie</li>
               <li>Matériaux durables</li>
               <li>Design ergonomique</li>
             </ul>
          </div>
       </div>
    </div>
  );
};

export default ProductDetails;
