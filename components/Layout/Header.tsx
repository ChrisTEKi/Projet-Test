import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, User as UserIcon, Heart, Wallet, LogOut, ChevronDown, LayoutDashboard, Settings } from 'lucide-react';
import { APP_NAME } from '../../constants';
import { Link, useNavigate } from 'react-router-dom';
import { User, UserRole } from '../../types';

interface HeaderProps {
  cartCount: number;
  onMenuClick: () => void;
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onMenuClick, user, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top Bar - Promotion & Info */}
      <div className="bg-red-600 text-white text-xs py-1 px-4 flex justify-between items-center hidden sm:flex">
        <span>Livraison gratuite dès 100 000 Ar d'achat !</span>
        <div className="flex gap-4">
          <Link to="/join" className="hover:underline">Devenir Vendeur</Link>
          <Link to="/recruitment" className="hover:underline">Nous rejoindre</Link>
          <Link to="/help" className="hover:underline">Aide & Contact</Link>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Mobile Menu */}
          <div className="flex items-center gap-3">
            <button onClick={onMenuClick} className="lg:hidden p-2 hover:bg-gray-100 rounded-full">
              <Menu size={24} />
            </button>
            <Link to="/" className="text-2xl font-bold text-red-600 tracking-tighter flex items-center gap-1">
              <span className="text-3xl">D</span>omygo
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl hidden md:flex relative">
            <input 
              type="text" 
              placeholder="Que cherchez-vous ? (Ex: Samsung, Pizza, Canapé...)"
              className="w-full pl-4 pr-12 py-2.5 border-2 border-gray-200 rounded-l-lg focus:border-red-600 focus:outline-none transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-red-600 text-white px-6 rounded-r-lg hover:bg-red-700 transition-colors">
              <Search size={20} />
            </button>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2 sm:gap-6">
            
            {/* Wallet Widget - Only visible if logged in */}
            {user && (
              <Link to="/wallet" className="hidden sm:flex flex-col items-end text-sm group cursor-pointer">
                 <span className="text-gray-500 text-xs group-hover:text-red-600 flex items-center gap-1">
                   <Wallet size={12}/> Mon Wallet
                 </span>
                 <span className="font-bold text-gray-800">{user.walletBalance.toLocaleString()} Ar</span>
              </Link>
            )}

            {/* Auth / Profile Dropdown */}
            {user ? (
               <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 hover:bg-gray-50 p-1 pr-2 rounded-full border border-transparent hover:border-gray-200 transition"
                  >
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold overflow-hidden border border-red-200">
                      {user.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover"/> : user.name[0]}
                    </div>
                    <div className="hidden sm:block text-left">
                       <p className="text-xs font-bold text-gray-900 line-clamp-1 max-w-[100px]">{user.name}</p>
                       <p className="text-[10px] text-gray-500 uppercase">{user.role === 'ADMIN' ? 'Administrateur' : user.role === 'VENDOR' ? 'Vendeur' : 'Membre'}</p>
                    </div>
                    <ChevronDown size={14} className="text-gray-400"/>
                  </button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                       <div className="px-4 py-2 border-b border-gray-100 mb-2">
                          <p className="font-bold text-sm text-gray-800">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                       </div>

                       {(user.role === UserRole.ADMIN || user.role === UserRole.VENDOR) && (
                         <Link to={user.role === UserRole.ADMIN ? '/admin' : '/dashboard'} onClick={() => setShowUserMenu(false)} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                           <LayoutDashboard size={16} /> {user.role === UserRole.ADMIN ? 'Administration' : 'Mon Tableau de bord'}
                         </Link>
                       )}
                       
                       <Link to="/wallet" onClick={() => setShowUserMenu(false)} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                         <Wallet size={16} /> Mon Wallet ({user.walletBalance} Ar)
                       </Link>
                       <Link to="/favorites" onClick={() => setShowUserMenu(false)} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                         <Heart size={16} /> Mes Favoris
                       </Link>
                       <Link to="/settings" onClick={() => setShowUserMenu(false)} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                         <Settings size={16} /> Paramètres
                       </Link>
                       
                       <div className="border-t border-gray-100 mt-2 pt-2">
                         <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium">
                           <LogOut size={16}/> Déconnexion
                         </button>
                       </div>
                    </div>
                  )}
                  
                  {/* Backdrop to close menu */}
                  {showUserMenu && (
                    <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)}></div>
                  )}
               </div>
            ) : (
              <Link to="/auth" className="flex flex-col items-center text-gray-600 hover:text-red-600">
                <UserIcon size={24} />
                <span className="text-xs hidden sm:block">Compte</span>
              </Link>
            )}

            {/* Other Icons */}
            <Link to="/favorites" className="flex flex-col items-center text-gray-600 hover:text-red-600 relative">
              <Heart size={24} />
              <span className="text-xs hidden sm:block">Favoris</span>
            </Link>

            <Link to="/cart" className="flex flex-col items-center text-gray-600 hover:text-red-600 relative">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
              <span className="text-xs hidden sm:block">Panier</span>
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden flex relative">
          <input 
            type="text" 
            placeholder="Rechercher sur Domygo..."
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>
    </header>
  );
};

export default Header;