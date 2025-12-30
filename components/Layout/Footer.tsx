import React from 'react';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4"><span className="text-red-500">D</span>omygo.</h3>
            <p className="text-sm leading-relaxed mb-4">
              La marketplace n°1 à Madagascar. Nous connectons acheteurs et vendeurs avec confiance, rapidité et sécurité.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-red-500 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-red-500 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-red-500 transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">A propos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-red-500">Qui sommes-nous ?</Link></li>
              <li><Link to="/recruitment" className="hover:text-red-500">Nous rejoindre (Recrutement)</Link></li>
              <li><Link to="/terms" className="hover:text-red-500">Conditions Générales</Link></li>
              <li><Link to="/privacy" className="hover:text-red-500">Confidentialité & Cookies</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Service Client</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help" className="hover:text-red-500">Centre d'aide</Link></li>
              <li><Link to="/tracking" className="hover:text-red-500">Suivre ma commande</Link></li>
              <li><Link to="/returns" className="hover:text-red-500">Retours & Remboursements</Link></li>
              <li><Link to="/join" className="hover:text-red-500">Vendre sur Domygo</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-red-500 mt-0.5" />
                <span>Immeuble Domygo, Zone Galaxy, Andraharo, Antananarivo 101</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-red-500" />
                <span>+261 34 00 000 00</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-red-500" />
                <span>contact@domygomarket.mg</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Domygo Market Madagascar. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
