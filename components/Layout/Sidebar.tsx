import React from 'react';
import { CATEGORIES } from '../../constants';
import { X, ChevronRight, Gift, LayoutDashboard, Truck, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60]"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 flex justify-between items-center border-b bg-red-600 text-white">
          <h2 className="font-bold text-xl">Menu</h2>
          <button onClick={onClose}><X size={24} /></button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-60px)] py-4">
          
          <div className="px-4 mb-6">
            <h3 className="font-semibold text-gray-500 mb-2 uppercase text-xs">Mon Espace</h3>
             <ul className="space-y-1">
                <li>
                  <Link to="/dashboard" onClick={onClose} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg text-gray-700">
                    <span className="flex items-center gap-3"><LayoutDashboard size={18}/> Tableau de bord</span>
                  </Link>
                </li>
                 <li>
                  <Link to="/tracking" onClick={onClose} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg text-gray-700">
                    <span className="flex items-center gap-3"><Truck size={18}/> Suivi de commande</span>
                  </Link>
                </li>
             </ul>
          </div>

          <div className="px-4 mb-2">
            <h3 className="font-semibold text-gray-500 mb-2 uppercase text-xs">Catégories</h3>
          </div>
          <ul>
            {CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <Link 
                  to={`/category/${cat.id}`} 
                  className="flex items-center justify-between px-4 py-3 hover:bg-red-50 hover:text-red-600 transition-colors border-l-4 border-transparent hover:border-red-600"
                  onClick={onClose}
                >
                  <span className="font-medium">{cat.name}</span>
                  <ChevronRight size={16} className="text-gray-400" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="px-4 mt-6 border-t pt-6">
             <Link to="/wallet" onClick={onClose} className="flex items-center gap-3 p-3 bg-red-50 text-red-700 rounded-xl font-medium mb-2">
               <Gift size={20} />
               Parrainage & Points
             </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
