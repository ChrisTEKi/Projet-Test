import React from 'react';
import { ArrowLeft, Users, HelpCircle, RefreshCw, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => (
  <div className="container mx-auto px-4 py-12 max-w-3xl">
    <h1 className="text-3xl font-bold mb-6">Qui sommes-nous ?</h1>
    <p className="text-lg text-gray-700 mb-4">
      Domygo Market est la première plateforme de commerce électronique 100% Malagasy qui combine le meilleur de l'international (Amazon, Rakuten) avec les réalités locales.
    </p>
    <p className="text-gray-700 mb-4">
      Notre mission est de digitaliser le commerce à Madagascar en offrant une plateforme sécurisée, rapide et fiable pour les vendeurs et les acheteurs.
    </p>
  </div>
);

export const Recruitment: React.FC = () => (
  <div className="container mx-auto px-4 py-12 max-w-3xl">
    <h1 className="text-3xl font-bold mb-6 flex items-center gap-3"><Users className="text-red-600"/> Nous rejoindre</h1>
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <h2 className="font-bold text-xl mb-2">Livreur (Moto/Vélo)</h2>
      <p className="text-gray-600 mb-4">Antananarivo - CDI/Freelance</p>
      <button className="bg-red-600 text-white px-4 py-2 rounded">Postuler</button>
    </div>
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <h2 className="font-bold text-xl mb-2">Développeur Fullstack React/Node</h2>
      <p className="text-gray-600 mb-4">Remote / Andraharo - CDI</p>
      <button className="bg-red-600 text-white px-4 py-2 rounded">Postuler</button>
    </div>
  </div>
);

export const Help: React.FC = () => (
  <div className="container mx-auto px-4 py-12 max-w-3xl">
    <h1 className="text-3xl font-bold mb-6 flex items-center gap-3"><HelpCircle className="text-red-600"/> Centre d'aide</h1>
    <div className="space-y-4">
      <details className="bg-white p-4 rounded-lg border">
        <summary className="font-bold cursor-pointer">Comment retourner un colis ?</summary>
        <p className="mt-2 text-gray-600">Vous avez 15 jours pour retourner un article. Allez dans "Mes commandes" {">"} "Retourner".</p>
      </details>
      <details className="bg-white p-4 rounded-lg border">
        <summary className="font-bold cursor-pointer">Quels sont les modes de paiement ?</summary>
        <p className="mt-2 text-gray-600">Nous acceptons Mvola, Orange Money, Airtel Money, Visa, Mastercard et le paiement à la livraison pour certains articles.</p>
      </details>
    </div>
  </div>
);

export const Returns: React.FC = () => (
  <div className="container mx-auto px-4 py-12 max-w-3xl">
    <h1 className="text-3xl font-bold mb-6 flex items-center gap-3"><RefreshCw className="text-red-600"/> Politique de Retours</h1>
    <p className="mb-4">Si vous n'êtes pas satisfait de votre achat, vous pouvez nous le retourner sous 15 jours.</p>
    <ul className="list-disc pl-5 space-y-2 mb-6">
      <li>Article endommagé</li>
      <li>Ne correspond pas à la description</li>
      <li>Change d'avis (produit non ouvert)</li>
    </ul>
    <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
      <p className="text-sm font-bold">Note:</p>
      <p className="text-sm">Le remboursement se fait sous forme d'avoir sur votre Domygo Wallet ou par virement mobile money.</p>
    </div>
  </div>
);

export const Favorites: React.FC = () => (
    <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Mes Favoris</h1>
        <p className="text-gray-500">Vous n'avez aucun favori pour le moment.</p>
        <Link to="/" className="text-red-600 underline mt-4 inline-block">Continuer mes achats</Link>
    </div>
);
