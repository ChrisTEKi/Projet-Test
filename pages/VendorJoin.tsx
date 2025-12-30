import React, { useState } from 'react';
import { Upload, CheckCircle, FileText, Camera } from 'lucide-react';

const VendorJoin: React.FC = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Devenez Vendeur sur Domygo</h1>
        <p className="text-gray-600">Rejoignez des milliers de vendeurs à Madagascar et boostez votre chiffre d'affaires.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        
        {/* Progress */}
        <div className="flex justify-between items-center mb-10 text-sm font-bold text-gray-400">
           <div className={`flex items-center gap-2 ${step >= 1 ? 'text-red-600' : ''}`}>
             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-red-600 bg-red-600 text-white' : 'border-gray-200'}`}>1</div>
             Info
           </div>
           <div className="h-1 flex-1 bg-gray-100 mx-4">
             <div className={`h-full bg-red-600 transition-all ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
           </div>
           <div className={`flex items-center gap-2 ${step >= 2 ? 'text-red-600' : ''}`}>
             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-red-600 bg-red-600 text-white' : 'border-gray-200'}`}>2</div>
             Identité
           </div>
           <div className="h-1 flex-1 bg-gray-100 mx-4">
             <div className={`h-full bg-red-600 transition-all ${step >= 3 ? 'w-full' : 'w-0'}`}></div>
           </div>
           <div className={`flex items-center gap-2 ${step >= 3 ? 'text-red-600' : ''}`}>
             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-red-600 bg-red-600 text-white' : 'border-gray-200'}`}>3</div>
             Contrat
           </div>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Informations de la boutique</h2>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Nom de la boutique" className="col-span-2 border p-3 rounded-lg w-full" />
              <input type="text" placeholder="Prénom" className="border p-3 rounded-lg w-full" />
              <input type="text" placeholder="Nom" className="border p-3 rounded-lg w-full" />
              <input type="email" placeholder="Email professionnel" className="col-span-2 border p-3 rounded-lg w-full" />
              <input type="text" placeholder="Numéro Téléphone (Mvola/Orange)" className="col-span-2 border p-3 rounded-lg w-full" />
            </div>
            <button onClick={() => setStep(2)} className="w-full bg-red-600 text-white font-bold py-3 rounded-lg mt-6 hover:bg-red-700">Continuer</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Vérification d'identité (KYC)</h2>
            <p className="text-sm text-gray-500 bg-yellow-50 p-3 rounded border border-yellow-200">
              Pour assurer la sécurité de la marketplace, nous avons besoin d'une photo de votre CIN valide.
            </p>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 cursor-pointer transition">
               <Camera className="mx-auto text-gray-400 mb-4" size={48} />
               <p className="font-medium text-gray-700">Prendre une photo ou importer</p>
               <p className="text-xs text-gray-400 mt-2">Format JPG, PNG. Max 5Mo.</p>
               <input type="file" className="hidden" />
            </div>

            <div className="flex gap-4 mt-6">
              <button onClick={() => setStep(1)} className="w-1/3 bg-gray-100 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-200">Retour</button>
              <button onClick={() => setStep(3)} className="w-2/3 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700">Valider & Continuer</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Contrat Vendeur</h2>
            <div className="h-40 overflow-y-scroll bg-gray-50 p-4 text-xs text-gray-600 border rounded-lg">
               <p className="mb-2"><strong>ARTICLE 1 - OBJET</strong><br/>Le présent contrat a pour objet de définir les conditions dans lesquelles le Vendeur propose ses produits sur la Marketplace Domygo.</p>
               <p className="mb-2"><strong>ARTICLE 2 - COMMISSION</strong><br/>Domygo prélève une commission de 5% sur chaque vente réalisée.</p>
               <p className="mb-2"><strong>ARTICLE 3 - OBLIGATIONS</strong><br/>Le vendeur s'engage à livrer des produits conformes et authentiques.</p>
               <p>...</p>
            </div>
            
            <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 text-red-600 rounded focus:ring-red-500" />
              <span className="text-sm">J'ai lu et j'accepte les conditions générales de vente et le contrat partenaire.</span>
            </label>

             <div className="flex gap-4 mt-6">
              <button onClick={() => setStep(2)} className="w-1/3 bg-gray-100 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-200">Retour</button>
              <button onClick={() => alert("Dossier envoyé à l'administration pour validation !")} className="w-2/3 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
                <CheckCircle size={20}/> Soumettre mon dossier
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default VendorJoin;
