import React, { useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import RatingStars from "../components/RatingStars"
import { ChevronRight } from 'lucide-react'
import { callGeminiApi } from '../api/gemini'

export default function ProductPage({product,onAddToCart,navigate}){
  if (!product) return <div className="p-8 text-center">Produit non trouvé.</div>;

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [generatedIdea, setGeneratedIdea] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState(null);

  const breadcrumbs = [
      { label: 'Accueil', href: 'home' },
      { label: 'Catalogue', href: 'catalog' },
      { label: product.category, href: 'catalog', props: { category: product.category } },
      { label: product.name }
  ];

  const generateCreativeIdea = async () => {
    setIsGenerating(true);
    setGenerationError(null);
    setGeneratedIdea(null);
    
    // Instruction système pour définir le rôle du modèle
    const systemPrompt = `Agissez en tant que concepteur-rédacteur marketing créatif pour une place de marché moderne et haut de gamme (Malagasy Market). Votre tâche est de générer une description courte, excitante et pertinente ou une idée d'utilisation unique pour le produit fourni. Le ton doit être élégant et inspirant, axé sur le design et l'amélioration de l'habitat. Répondez UNIQUEMENT avec le paragraphe généré en français.`;
    
    // Requête utilisateur
    const userPrompt = `Générez une idée d'utilisation captivante ou un argumentaire marketing pour le produit suivant : Nom du produit : ${product.name}. Description actuelle : ${product.description}. Catégorie : ${product.category}. La sortie doit être attrayante pour une maison ou un style de vie moderne.`;

    try {
        const { text } = await callGeminiApi(userPrompt, systemPrompt);
        setGeneratedIdea(text);
    } catch (error) {
        setGenerationError("La simulation de l'API a échoué. Veuillez vérifier la console.");
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-10">
        
        {/* Navigation Breadcrumb (src/components/Breadcrumbs.jsx) */}
        <Breadcrumbs items={breadcrumbs} navigate={navigate} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Section Image */}
          <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full max-h-96 object-contain rounded-lg" 
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x600/CCCCCC/333333?text=Image+Non+Trouvée"; }}
            />
          </div>

          {/* Section Détails */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-orange-500 font-medium mt-1 mb-4">{product.category}</p>
            
            <div className="mb-4">
              <RatingStars rating={product.rating} />
            </div>

            <p className="text-4xl font-extrabold text-gray-800 mb-6">{product.price.toFixed(2)} Ar</p>

            <div className="flex items-center space-x-4 mb-8">
              <label htmlFor="quantity" className="text-lg font-medium text-gray-700">Quantité:</label>
              <input 
                type="number" 
                id="quantity" 
                min="1" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 p-2 border border-gray-300 rounded-lg text-center focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            {/* Bouton Ajouter au Panier */}
            <button 
              onClick={() => onAddToCart(product, quantity)}
              className="w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200 mb-4"
            >
              Ajouter au Panier
            </button>
            
            {/* Intégration Gemini : Générateur d'Idée Créative */}
            <button 
                onClick={generateCreativeIdea}
                disabled={isGenerating}
                className="w-full py-3 border border-orange-500 text-orange-500 font-semibold rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center justify-center space-x-2"
            >
                {isGenerating ? (
                    <>
                        <svg className="animate-spin h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <span>Génération en cours...</span>
                    </>
                ) : (
                    <span>Générer une Idée Créative ✨</span>
                )}
            </button>
          </div>
        </div>

        {/* Section Idée Générée (Affichage) */}
        {(generatedIdea || generationError) && (
            <div className="mt-8 p-6 bg-orange-50 border-l-4 border-orange-500 rounded-lg shadow-inner">
                <h3 className="text-xl font-bold text-orange-700 mb-3">Idée Générée par l'IA:</h3>
                {generationError ? (
                    <p className="text-red-600 font-medium">Erreur: {generationError}</p>
                ) : (
                    <p className="text-gray-800 italic leading-relaxed whitespace-pre-wrap">{generatedIdea}</p>
                )}
            </div>
        )}

        {/* Description et Avis (Tabs) */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-4">
              <button 
                onClick={() => setActiveTab('description')} 
                className={`py-2 px-4 text-lg font-medium ${activeTab === 'description' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Description
              </button>
              <button 
                onClick={() => setActiveTab('reviews')} 
                className={`py-2 px-4 text-lg font-medium ${activeTab === 'reviews' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Avis Clients (125)
              </button>
            </nav>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            {activeTab === 'description' && (
              <p className="text-gray-700 leading-relaxed">{product.description || "Description détaillée du produit non disponible. Qualité et design garantis."}</p>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <p className="font-semibold">Avis de Sophie R. (5/5)</p>
                <p className="text-sm text-gray-600">"Produit magnifique et livraison rapide à Tana. Correspond parfaitement à la description. Je recommande Malagasy Market !"</p>
                <hr className="border-gray-200" />
                <p className="font-semibold">Avis de Marc L. (4/5)</p>
                <p className="text-sm text-gray-600">"Excellent produit, mais la livraison a été un peu longue. Très bonne qualité générale."</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}