import React, { useState } from 'react';
import { User, CartItem } from '../types';
import { CreditCard, Smartphone, Wallet, MapPin, CheckCircle, Truck, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CheckoutProps {
  cart: CartItem[];
  user: User;
  clearCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, user, clearCart }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile' | 'wallet' | 'installments'>('mobile');
  const [processing, setProcessing] = useState(false);

  const subtotal = cart.reduce((sum, item) => {
    const price = item.isPromo ? item.promoPrice! : item.price;
    return sum + (price * item.quantity);
  }, 0);
  const shipping = subtotal > 100000 ? 0 : 5000;
  const total = subtotal + shipping;

  const handlePayment = () => {
    setProcessing(true);
    // Simulate backend processing
    setTimeout(() => {
      setProcessing(false);
      clearCart();
      navigate('/tracking'); // Redirect to tracking
    }, 2500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Paiement</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          
          {/* Address Confirmation */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><MapPin className="text-red-600"/> Adresse de Livraison</h2>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-bold">{user.name}</p>
              <p>{user.address?.street}</p>
              <p>{user.address?.postalCode} {user.address?.city}</p>
              <p className="text-sm text-gray-500 mt-2">{user.phone}</p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <h2 className="font-bold text-lg mb-4">Moyen de paiement</h2>
             
             <div className="space-y-3">
               
               {/* Mobile Money */}
               <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition ${paymentMethod === 'mobile' ? 'border-red-600 bg-red-50' : 'hover:bg-gray-50'}`}>
                 <input type="radio" name="payment" checked={paymentMethod === 'mobile'} onChange={() => setPaymentMethod('mobile')} className="accent-red-600 w-5 h-5"/>
                 <Smartphone className="text-gray-600" />
                 <div className="flex-1">
                   <p className="font-bold text-gray-800">Mobile Money</p>
                   <p className="text-xs text-gray-500">Mvola, Orange Money, Airtel Money</p>
                 </div>
                 <div className="flex gap-2">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
                    <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
                    <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                 </div>
               </label>

               {/* Credit Card */}
               <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition ${paymentMethod === 'card' ? 'border-red-600 bg-red-50' : 'hover:bg-gray-50'}`}>
                 <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="accent-red-600 w-5 h-5"/>
                 <CreditCard className="text-gray-600" />
                 <div className="flex-1">
                   <p className="font-bold text-gray-800">Carte Bancaire</p>
                   <p className="text-xs text-gray-500">Visa, Mastercard</p>
                 </div>
               </label>

               {/* Domygo Wallet */}
               <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition ${paymentMethod === 'wallet' ? 'border-red-600 bg-red-50' : 'hover:bg-gray-50'}`}>
                 <input type="radio" name="payment" checked={paymentMethod === 'wallet'} onChange={() => setPaymentMethod('wallet')} className="accent-red-600 w-5 h-5"/>
                 <Wallet className="text-gray-600" />
                 <div className="flex-1">
                   <p className="font-bold text-gray-800">Domygo Wallet</p>
                   <p className="text-xs text-gray-500">Solde: {user.walletBalance.toLocaleString()} Ar</p>
                 </div>
                 {user.walletBalance < total && <span className="text-xs text-red-500 font-bold">Solde insuffisant</span>}
               </label>

                {/* Installments */}
                <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition ${paymentMethod === 'installments' ? 'border-red-600 bg-red-50' : 'hover:bg-gray-50'}`}>
                 <input type="radio" name="payment" checked={paymentMethod === 'installments'} onChange={() => setPaymentMethod('installments')} className="accent-red-600 w-5 h-5"/>
                 <div className="p-2 bg-slate-900 text-white rounded font-bold text-xs">3x</div>
                 <div className="flex-1">
                   <p className="font-bold text-gray-800">Paiement en 3 ou 4 fois</p>
                   <p className="text-xs text-gray-500">Réservé aux clients fidèles</p>
                 </div>
               </label>

             </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="font-bold text-lg mb-4">Total à payer</h3>
              <div className="flex justify-between items-end mb-6">
                <span className="text-3xl font-bold text-red-600">{total.toLocaleString()} Ar</span>
              </div>
              
              <button 
                onClick={handlePayment}
                disabled={processing || (paymentMethod === 'wallet' && user.walletBalance < total)}
                className={`w-full text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 ${processing ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'}`}
              >
                {processing ? 'Traitement...' : 'Confirmer le paiement'}
              </button>
              
              <div className="mt-4 flex items-start gap-2 p-3 bg-blue-50 text-blue-700 text-xs rounded-lg">
                <Info size={16} className="mt-0.5 flex-shrink-0"/>
                <p>En confirmant, vous acceptez les conditions de vente. Vous gagnerez <strong>{Math.floor(total/500)} points</strong> de fidélité.</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
