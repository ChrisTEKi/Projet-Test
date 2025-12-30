import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserRole } from '../types';
import { Lock, Mail, MapPin, User as UserIcon, Phone, AlertCircle } from 'lucide-react';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate Backend Authentication Logic
    setTimeout(() => {
      let role = UserRole.CUSTOMER;
      let userName = name || "Client Domygo";
      let redirectPath = "/";
      let wallet = isLogin ? 150000 : 10000;
      let id = 'u-' + Math.random().toString(36).substr(2, 9);
      let avatar = `https://ui-avatars.com/api/?name=${userName.replace(" ", "+")}&background=random`;

      if (isLogin) {
          // ADMIN CREDENTIALS
          if (email === "domyadmi@domygo.com" && password === "123456") {
              role = UserRole.ADMIN;
              userName = "Administrateur Principal";
              redirectPath = "/admin";
              wallet = 10000000; 
              avatar = "https://ui-avatars.com/api/?name=Admin&background=dc2626&color=fff&bold=true";
          } 
          // VENDOR CREDENTIALS
          else if (email === "vend@patnerdomygo.com" && password === "123456") {
              role = UserRole.VENDOR;
              userName = "Partenaire Vendeur";
              redirectPath = "/dashboard";
              wallet = 5200000;
              avatar = "https://ui-avatars.com/api/?name=Vendeur&background=0d9488&color=fff&bold=true";
          }
          // CUSTOMER LOGIN
          else {
               // In a real app we would verify DB here.
               // For demo, we accept any other email/password as customer
               if (password.length < 4) {
                   setError("Mot de passe incorrect.");
                   setLoading(false);
                   return;
               }
               role = UserRole.CUSTOMER;
               userName = "Client Connecté";
               redirectPath = "/";
          }
      } else {
          // REGISTRATION (Always Customer initially)
          redirectPath = "/";
      }

      const mockUser: User = {
        id: id,
        name: userName,
        email: email,
        role: role,
        walletBalance: wallet,
        loyaltyPoints: isLogin ? 150 : 0,
        referralCode: 'DOMYGO-' + Math.random().toString(36).substr(2, 5).toUpperCase(),
        phone: phone || "034 00 000 00",
        address: {
          street: street || 'Rue Test',
          city: city || 'Antananarivo',
          postalCode: postalCode || '101'
        },
        avatar: avatar
      };
      
      onLogin(mockUser);
      navigate(redirectPath);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Bon retour !' : 'Créer un compte'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? 'Connectez-vous pour accéder à votre compte' : 'Rejoignez la meilleure marketplace de Madagascar'}
          </p>
        </div>

        {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
                <AlertCircle size={16} /> {error}
            </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            
            {!isLogin && (
              <>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input type="text" placeholder="Nom complet" required value={name} onChange={e => setName(e.target.value)} className="pl-10 w-full p-3 border rounded-lg focus:ring-red-500 focus:border-red-500" />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input type="tel" placeholder="Téléphone (ex: 034...)" required value={phone} onChange={e => setPhone(e.target.value)} className="pl-10 w-full p-3 border rounded-lg focus:ring-red-500 focus:border-red-500" />
                </div>
                
                {/* Address Section - Mandatory */}
                <div className="border-t pt-4">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Adresse de livraison (Obligatoire)</label>
                    <div className="grid grid-cols-2 gap-3">
                         <div className="relative col-span-2">
                            <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input type="text" placeholder="Rue / Lot" required value={street} onChange={e => setStreet(e.target.value)} className="pl-10 w-full p-3 border rounded-lg focus:ring-red-500 focus:border-red-500" />
                        </div>
                        <input type="text" placeholder="Ville" required value={city} onChange={e => setCity(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-red-500 focus:border-red-500" />
                        <input type="text" placeholder="Code Postal" required value={postalCode} onChange={e => setPostalCode(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-red-500 focus:border-red-500" />
                    </div>
                </div>
              </>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input type="email" placeholder="Adresse Email" required value={email} onChange={e => setEmail(e.target.value)} className="pl-10 w-full p-3 border rounded-lg focus:ring-red-500 focus:border-red-500" />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input type="password" placeholder="Mot de passe" required value={password} onChange={e => setPassword(e.target.value)} className="pl-10 w-full p-3 border rounded-lg focus:ring-red-500 focus:border-red-500" />
            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
          >
            {loading ? 'Connexion en cours...' : (isLogin ? 'Se connecter' : 'S\'inscrire')}
          </button>
        </form>

        <div className="text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-medium text-red-600 hover:text-red-500"
          >
            {isLogin ? "Pas encore de compte ? Créer un compte" : "Déjà un compte ? Se connecter"}
          </button>
        </div>
        
        {!isLogin && (
            <div className="bg-green-50 p-3 rounded text-center text-xs text-green-700 border border-green-200">
                🎁 10 000 Ar offerts sur votre premier achat !
            </div>
        )}
        
        {isLogin && (
            <div className="mt-6 pt-6 border-t border-gray-100 text-xs text-gray-400 text-center">
                <p className="mb-1 font-bold text-gray-500">Comptes de démo :</p>
                <p>Admin: domyadmi@domygo.com / 123456</p>
                <p>Vendeur: vend@patnerdomygo.com / 123456</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Auth;