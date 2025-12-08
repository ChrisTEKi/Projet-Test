import React from 'react';
import { Facebook, Twitter, Instagram, Phone, Mail } from 'lucide-react';

const SocialIcon = ({ Icon, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:text-orange-400 transition-colors p-2 rounded-full border border-white hover:border-orange-400"
  >
    <Icon size={20} />
  </a>
);

export default function Footer() {
  return (
	<footer className="bg-gray-800 text-white mt-12">
		<div className="container mx-auto p-8 max-w-7xl">
			<div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-gray-700 pb-8 mb-8">
				
				<div>
					<h3 className="text-lg font-semibold mb-4 text-orange-400">Le Site</h3>
					<ul className="space-y-2 text-sm text-gray-300">
						<li><button className="hover:text-orange-400 transition-colors text-left">À Propos de Nous</button></li>
						<li><button className="hover:text-orange-400 transition-colors text-left">Contact / Support</button></li>
						<li><button className="hover:text-orange-400 transition-colors text-left">FAQ / Aide</button></li>
					</ul>
				</div>
				
				<div>
					<h3 className="text-lg font-semibold mb-4 text-orange-400">Partenaires</h3>
					<ul className="space-y-2 text-sm text-gray-300">
						<li><button className="hover:text-orange-400 transition-colors text-left">Devenir Vendeur</button></li>
						<li><button className="hover:text-orange-400 transition-colors text-left">Affiliation</button></li>
						<li><button className="hover:text-orange-400 transition-colors text-left">Espace Fournisseur</button></li>
					</ul>
				</div>

				<div>
					<h3 className="text-lg font-semibold mb-4 text-orange-400">Légal</h3>
					<ul className="space-y-2 text-sm text-gray-300">
						<li><button className="hover:text-orange-400 transition-colors text-left">Conditions Générales</button></li>
						<li><button className="hover:text-orange-400 transition-colors text-left">Mentions Légales</button></li>
						<li><button className="hover:text-orange-400 transition-colors text-left">Politique de Confidentialité</button></li>
						<li><button className="hover:text-orange-400 transition-colors text-left">Politique de Retour</button></li>
					</ul>
				</div>

				<div className="col-span-2 md:col-span-2 space-y-4">
					<h3 className="text-lg font-semibold text-orange-400">Contact Rapide</h3>
					<div className="space-y-2 text-sm text-gray-300">
						<p className="flex items-center"><Phone size={16} className="mr-2 text-orange-400" /> +261 32 12 345 67</p>
						<p className="flex items-center"><Mail size={16} className="mr-2 text-orange-400" /> support@malagasymarket.com</p>
						<input type="email" placeholder="Votre email pour la newsletter" className="w-full p-2 mt-4 text-gray-900 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
					</div>

					<h3 className="text-lg font-semibold mt-6 text-orange-400">Suivez-nous</h3>
					<div className="flex space-x-3">
						<SocialIcon Icon={Facebook} href="https://facebook.com" />
						<SocialIcon Icon={Twitter} href="https://twitter.com" />
						<SocialIcon Icon={Instagram} href="https://instagram.com" />
					</div>
				</div>
			</div>
			
			<div className="text-center text-sm text-gray-500 pt-4">
				<p>© 2024 Malagasy Market. Tous droits réservés. L'excellence pour votre foyer.</p>
			</div>
		</div>
	</footer>
  );
}