import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Sidebar from './components/Layout/Sidebar';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import WalletPage from './pages/Wallet';
import Dashboard from './pages/Dashboard';
import VendorJoin from './pages/VendorJoin';
import Auth from './pages/Auth';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Tracking from './pages/Tracking';
import AdminDashboard from './pages/AdminDashboard';
import { About, Recruitment, Help, Returns, Favorites } from './pages/StaticPages';
import { Product, User, CartItem, UserRole } from './types';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // State with LocalStorage Persistence
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('domygo_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('domygo_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Save Cart on change
  useEffect(() => {
    localStorage.setItem('domygo_cart', JSON.stringify(cart));
  }, [cart]);

  // Save User on change
  useEffect(() => {
    if (user) {
        localStorage.setItem('domygo_user', JSON.stringify(user));
    } else {
        localStorage.removeItem('domygo_user');
    }
  }, [user]);

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? {...item, quantity: item.quantity + quantity} : item);
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
      setCart([]);
  };

  const handleLogin = (newUser: User) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header 
          cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
          onMenuClick={() => setIsSidebarOpen(true)}
          user={user}
          onLogout={handleLogout}
        />
        
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
            <Route path="/wallet" element={user ? <WalletPage user={user} /> : <Auth onLogin={handleLogin} />} />
            <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Auth onLogin={handleLogin} />} />
            <Route path="/admin" element={user?.role === UserRole.ADMIN ? <AdminDashboard /> : <Home />} />
            <Route path="/join" element={<VendorJoin />} />
            
            <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
            <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
            <Route path="/checkout" element={user ? <Checkout cart={cart} user={user} clearCart={clearCart} /> : <Auth onLogin={handleLogin} />} />
            <Route path="/tracking" element={<Tracking />} />
            
            {/* Static Pages */}
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/about" element={<About />} />
            <Route path="/recruitment" element={<Recruitment />} />
            <Route path="/help" element={<Help />} />
            <Route path="/returns" element={<Returns />} />
            
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;