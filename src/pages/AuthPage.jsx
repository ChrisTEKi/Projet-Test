import React from 'react'
import Breadcrumbs from "../components/Breadcrumbs"
export default function AuthPage({ action,page,navigate}){
  const isLogin = action === 'login';
  const title = isLogin ? 'Connectez-vous à votre compte' : 'Créez votre compte';

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${isLogin ? 'Connexion' : 'Inscription'} simulée réussie! Redirection vers l'accueil.`);
    navigate('home');
  };
  
  const breadcrumbs = [
      { label: 'Accueil', href: 'home' },
      { label: isLogin ? 'Connexion' : 'Inscription' }
  ];

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center max-w-7xl">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
        <Breadcrumbs items={breadcrumbs} navigate={navigate} />
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">{title}</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom et Prénom</label>
              <input type="text" id="name" required className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Adresse Email</label>
            <input type="email" id="email" required className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de Passe</label>
            <input type="password" id="password" required className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
          </div>
          
          <button 
            type="submit" 
            className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200"
          >
            {isLogin ? 'Se connecter' : 'S\'inscrire'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Nouveau client ?" : "Déjà un compte ?"}
          <button 
            onClick={() => navigate('account', { action: isLogin ? 'register' : 'login' })} 
            className="ml-1 text-orange-500 hover:text-orange-600 font-medium"
          >
            {isLogin ? 'Créer un compte' : 'Connectez-vous'}
          </button>
        </p>
      </div>
    </div>
  );
}