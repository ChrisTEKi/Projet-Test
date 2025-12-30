import React, { useState, useEffect } from 'react';
import { Truck, CheckCircle, MapPin, Package, MessageCircle, Send, Phone } from 'lucide-react';

const Tracking: React.FC = () => {
  const [status, setStatus] = useState(0); // 0: Validated, 1: Preparing, 2: Shipping, 3: Delivered
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    // Simulate progression
    const timer = setInterval(() => {
      setStatus(prev => prev < 2 ? prev + 1 : prev);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Suivi de commande #CMD-8392</h1>
        <p className="text-gray-500 mb-8">Date estimée de livraison: Aujourd'hui à 14h00</p>

        {/* Status Bar */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
           <div className="relative flex justify-between items-center z-10">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10"></div>
              <div className={`absolute top-1/2 left-0 h-1 bg-green-500 -z-10 transition-all duration-1000`} style={{width: `${status * 33}%`}}></div>
              
              {[
                { icon: CheckCircle, label: 'Validée' },
                { icon: Package, label: 'Préparation' },
                { icon: Truck, label: 'En cours' },
                { icon: MapPin, label: 'Livrée' }
              ].map((step, idx) => (
                <div key={idx} className={`flex flex-col items-center gap-2 ${idx <= status ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 bg-white ${idx <= status ? 'border-green-600' : 'border-gray-200'}`}>
                    <step.icon size={20} />
                  </div>
                  <span className="text-xs font-bold">{step.label}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Map & Driver Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           
           <div className="bg-gray-200 rounded-xl min-h-[300px] flex items-center justify-center relative overflow-hidden">
              {/* Fake Map */}
              <div className="absolute inset-0 bg-slate-200 opacity-50"></div>
              <div className="relative z-10 text-gray-500 text-center">
                 <MapPin size={48} className="mx-auto text-red-600 mb-2 animate-bounce" />
                 <p className="font-bold">Le livreur est à Ankorondrano</p>
                 <p className="text-sm">Arrivée dans 15 min</p>
              </div>
           </div>

           <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                 <h3 className="font-bold text-gray-800 mb-4">Votre Livreur</h3>
                 <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-bold text-lg">Hery N.</p>
                      <p className="text-sm text-gray-500">Scooter • MAT-4932-TAB</p>
                      <div className="flex items-center gap-1 text-yellow-500 text-sm">
                        <span>★ 4.9</span>
                        <span className="text-gray-400">(240 livraisons)</span>
                      </div>
                    </div>
                    <button className="ml-auto p-3 bg-green-100 text-green-600 rounded-full hover:bg-green-200">
                      <Phone size={20} />
                    </button>
                 </div>
              </div>

              {/* Driver Chat */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-80">
                 <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
                    <span className="font-bold flex items-center gap-2"><MessageCircle size={18}/> Chat avec Hery</span>
                 </div>
                 <div className="flex-1 bg-gray-50 p-4 overflow-y-auto space-y-3">
                    <div className="flex justify-start">
                       <div className="bg-white p-3 rounded-lg rounded-tl-none border text-sm shadow-sm max-w-[80%]">
                         Bonjour, je suis en route. J'arrive dans 15 minutes.
                       </div>
                    </div>
                    <div className="flex justify-end">
                       <div className="bg-red-600 text-white p-3 rounded-lg rounded-tr-none text-sm max-w-[80%]">
                         D'accord merci, appelez-moi quand vous êtes là.
                       </div>
                    </div>
                 </div>
                 <div className="p-3 border-t bg-white flex gap-2">
                    <input type="text" placeholder="Écrire un message..." className="flex-1 border rounded-full px-4 text-sm focus:outline-none focus:border-red-600"/>
                    <button className="bg-red-600 text-white p-2 rounded-full"><Send size={16}/></button>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default Tracking;
