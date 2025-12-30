import React, { useState } from 'react';
import { User } from '../types';
import { Wallet as WalletIcon, ArrowRightLeft, CreditCard, Gift, Phone, Smartphone, Copy, Check } from 'lucide-react';
import { REFERRAL_BONUS_REFERRER, REFERRAL_BONUS_REFEREE } from '../constants';

interface WalletPageProps {
  user: User;
}

const WalletPage: React.FC<WalletPageProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'topup' | 'referral'>('overview');
  const [copied, setCopied] = useState(false);

  const copyReferral = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Mon Domygo Wallet</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sidebar Nav */}
        <div className="lg:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left p-4 rounded-xl font-medium flex items-center gap-3 transition ${activeTab === 'overview' ? 'bg-red-600 text-white shadow-lg' : 'bg-white hover:bg-gray-50'}`}
          >
            <WalletIcon size={20}/> Vue d'ensemble
          </button>
          <button 
            onClick={() => setActiveTab('topup')}
            className={`w-full text-left p-4 rounded-xl font-medium flex items-center gap-3 transition ${activeTab === 'topup' ? 'bg-red-600 text-white shadow-lg' : 'bg-white hover:bg-gray-50'}`}
          >
            <CreditCard size={20}/> Recharger / Retirer
          </button>
          <button 
            onClick={() => setActiveTab('referral')}
            className={`w-full text-left p-4 rounded-xl font-medium flex items-center gap-3 transition ${activeTab === 'referral' ? 'bg-red-600 text-white shadow-lg' : 'bg-white hover:bg-gray-50'}`}
          >
            <Gift size={20}/> Parrainage
          </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-2">
          
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Balance Card */}
              <div className="bg-slate-900 text-white rounded-2xl p-8 relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-gray-400 text-sm mb-1">Solde actuel</p>
                  <h2 className="text-4xl font-bold mb-6">{user.walletBalance.toLocaleString()} Ar</h2>
                  
                  <div className="flex gap-4">
                    <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-bold text-sm transition">Recharger</button>
                    <button className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-lg font-bold text-sm transition">Transférer</button>
                  </div>
                </div>
                <div className="absolute right-0 top-0 w-64 h-64 bg-red-600/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
              </div>

              {/* Points Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                   <div>
                     <h3 className="font-bold text-gray-800 text-lg">Points de Fidélité</h3>
                     <p className="text-sm text-gray-500">1 Point = 500 Ar</p>
                   </div>
                   <span className="text-2xl font-bold text-red-600">{user.loyaltyPoints} Pts</span>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                   <div className="text-sm">
                     Valeur convertible : <span className="font-bold">{(user.loyaltyPoints * 500).toLocaleString()} Ar</span>
                   </div>
                   <button className="text-sm bg-gray-900 text-white px-3 py-1.5 rounded hover:bg-black flex items-center gap-2">
                     <ArrowRightLeft size={14}/> Convertir
                   </button>
                </div>
              </div>

              {/* History */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4">Historique récent</h3>
                <div className="space-y-4">
                  {[1,2,3].map((_, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-green-100 text-green-600 rounded-full">
                           <ArrowRightLeft size={16}/>
                         </div>
                         <div>
                           <p className="text-sm font-medium">Achat #cmd-293{i}</p>
                           <p className="text-xs text-gray-500">22 Oct 2023</p>
                         </div>
                      </div>
                      <span className="font-bold text-red-600">- 45 000 Ar</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'topup' && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
               <h3 className="font-bold text-xl mb-6">Recharger mon compte</h3>
               <div className="grid grid-cols-3 gap-4 mb-6">
                 <button className="border-2 border-gray-200 hover:border-red-600 rounded-xl p-4 flex flex-col items-center gap-2 transition">
                   <Smartphone className="text-yellow-500" size={32} />
                   <span className="font-bold text-sm">Mvola</span>
                 </button>
                 <button className="border-2 border-gray-200 hover:border-red-600 rounded-xl p-4 flex flex-col items-center gap-2 transition">
                   <Smartphone className="text-orange-500" size={32} />
                   <span className="font-bold text-sm">Orange Money</span>
                 </button>
                 <button className="border-2 border-gray-200 hover:border-red-600 rounded-xl p-4 flex flex-col items-center gap-2 transition">
                   <CreditCard className="text-blue-600" size={32} />
                   <span className="font-bold text-sm">Visa / MC</span>
                 </button>
               </div>
               
               <div className="mb-6">
                 <label className="block text-sm font-medium text-gray-700 mb-2">Montant (Ar)</label>
                 <input type="number" placeholder="5000" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-red-600 font-bold text-lg" />
               </div>

               <button className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700">
                 Procéder au paiement
               </button>
            </div>
          )}

          {activeTab === 'referral' && (
             <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-8 border border-red-100">
                <div className="text-center mb-8">
                   <Gift size={48} className="mx-auto text-red-600 mb-4" />
                   <h2 className="text-2xl font-bold text-gray-900 mb-2">Invitez vos amis</h2>
                   <p className="text-gray-600">
                     Gagnez <span className="font-bold text-red-600">{REFERRAL_BONUS_REFERRER.toLocaleString()} Ar</span> pour chaque ami invité.
                     <br/>Votre ami reçoit <span className="font-bold text-red-600">{REFERRAL_BONUS_REFEREE.toLocaleString()} Ar</span> sur son premier achat !
                   </p>
                </div>

                <div className="bg-white border-2 border-dashed border-red-200 rounded-xl p-6 flex flex-col items-center gap-4 mb-8">
                   <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Votre code de parrainage</p>
                   <div className="flex items-center gap-2 w-full max-w-xs">
                      <div className="flex-1 bg-gray-100 p-3 rounded-lg text-center font-mono font-bold text-lg tracking-widest select-all">
                        {user.referralCode}
                      </div>
                      <button 
                        onClick={copyReferral}
                        className="p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      >
                        {copied ? <Check size={20}/> : <Copy size={20} />}
                      </button>
                   </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                   <h4 className="font-bold text-blue-800 mb-2 text-sm">Comment ça marche ?</h4>
                   <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                     <li>Partagez votre code unique.</li>
                     <li>Votre ami s'inscrit et entre le code.</li>
                     <li>Dès son premier achat, vous recevez tous les deux vos bonus !</li>
                   </ul>
                </div>
             </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default WalletPage;
