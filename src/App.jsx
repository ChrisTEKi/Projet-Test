
import React, { useState } from 'react'
import Header from './components/Header';
import Sidebar from "./components/Sidebar";
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import AuthPage from './pages/AuthPage';
import About from './pages/About';
import Checkout from './pages/Checkout';
import FAQ from './pages/FAQ';
import Policies from './pages/Policies';

export default function App(){
  const [currentPage, setCurrentPage] = useState('home');
  const [pageProps, setPageProps] = useState({});
  const [cart, setCart] = useState([]);

  // Fonction de navigation (simule un routeur)
  const navigate = (page, props = {}) => {
    setCurrentPage(page);
    setPageProps(props);
    window.scrollTo(0, 0); // Scroll en haut à chaque changement de page
  };

  // Logique du panier (src/utils/storage.js et src/utils/notifications.js simulés)
  const onAddToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { product, quantity }];
      }
    });
    // Notification simulée
    console.log(`Notification: ${quantity} x ${product.name} ajouté au panier!`);
  };

  const updateQuantity = (productId, newQuantity) => {
    const qty = Math.max(1, newQuantity);
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  	// Logique de suppression d'un article du panier
	const onRemoveItem = (cartId) => {
		setCart(prevCart => prevCart.filter(item => item.cartId !== cartId));
	};

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  // Détermination du contenu de la page
  let content;
  switch (currentPage) {
    case 'home':
      content = <HomePage navigate={navigate} onAddToCart={onAddToCart} />;
      break;
    case 'catalog':
      content = <CataloguePage navigate={navigate} onAddToCart={onAddToCart} initialCategory={pageProps.category} initialSearch={pageProps.search} initialSort={pageProps.sort || "rating_desc"}/>;
      break;
    case 'product':
      content = <ProductPage product={pageProps} onAddToCart={onAddToCart} navigate={navigate} />;
      break;
    case 'cart':
      content = <CartPage cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} navigate={navigate} />;
      break;
    case 'account':
      content = <AuthPage action={pageProps.action || 'login'} navigate={navigate} />;
      break;
    case 'checkout':
      content = <Checkout title="Paiement Sécurisé" navigate={navigate} content={<p>Ici se trouverait le formulaire de livraison et de paiement. Nous acceptons M-Vola, Orange Money et les cartes bancaires sécurisées.</p>} />;
      break;
    case 'about':
      content = <About title="À Propos de Nous" navigate={navigate} content={<p>Malagasy Market est né de la passion de valoriser l'artisanat et le design local en le combinant avec les meilleurs produits modernes. Notre mission est de fournir des articles de haute qualité à travers Madagascar.</p>} />;
      break;
    case 'contact':
        content = <StaticPage title="Nous Contacter" navigate={navigate} content={<p>Vous pouvez nous joindre par email à support@malagasymarket.com ou par téléphone au +261 32 12 345 67. Nous sommes disponibles du lundi au vendredi, de 8h à 17h (heure de Tana).</p>} />;
        break;
    case 'faq':
        content = <FAQ title="Questions Fréquentes (FAQ)" navigate={navigate} content={
            <>
                <h3 className="font-semibold text-lg">Comment suivre ma commande ?</h3>
                <p>Un numéro de suivi vous est envoyé par email dès l'expédition de votre commande.</p>
                <h3 className="font-semibold text-lg">Quels sont les délais de livraison ?</h3>
                <p>Les délais varient entre 3 et 7 jours ouvrables selon la destination à Madagascar.</p>
            </>
        } />;
        break;
    case 'policies':
        content = <Policies title="Politiques et Retours" navigate={navigate} content={<p>Nous offrons une politique de retour de 30 jours pour tous les produits non utilisés et dans leur emballage d'origine. Veuillez consulter nos Conditions Générales de Vente pour plus de détails.</p>} />;
        break;
    default:
      content = <div className="p-8 text-center"><h1 className="text-3xl font-bold">Page 404 - Non trouvée</h1><p className='mt-4'>La page demandée n'existe pas.</p><button onClick={() => navigate('home')} className="mt-6 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-orange-500">Retour à l'accueil</button></div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      
      <Header navigate={navigate} cartItemCount={cart.length} />
      
      <main className="flex-grow">
        {content}
      </main>
      
      <Footer />
    </div>
  );
}