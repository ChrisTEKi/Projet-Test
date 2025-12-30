import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { Users, ShoppingBag, ShieldCheck, Ban, Check, X } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'vendors' | 'products'>('vendors');

  // Mock Data
  const [vendors, setVendors] = useState([
    { id: 1, name: 'Jean R.', shop: 'Techno Malagasy', status: 'PENDING', date: '22/10/2023' },
    { id: 2, name: 'Sarah L.', shop: 'Mode Gasy', status: 'PENDING', date: '23/10/2023' },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'Client A', email: 'clienta@mail.com', role: 'CUSTOMER', status: 'ACTIVE' },
    { id: 2, name: 'Vendeur B', email: 'vendeur@mail.com', role: 'VENDOR', status: 'ACTIVE' },
  ]);

  const handleVendorAction = (id: number, action: 'approve' | 'reject') => {
    setVendors(vendors.filter(v => v.id !== id));
    alert(`Vendeur ${action === 'approve' ? 'validé' : 'rejeté'} avec succès.`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Administration Domygo</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-2">
           <button onClick={() => setActiveTab('vendors')} className={`w-full text-left p-3 rounded-lg flex items-center gap-3 ${activeTab === 'vendors' ? 'bg-red-600 text-white' : 'bg-white hover:bg-gray-50'}`}>
              <ShieldCheck size={20} /> Validation Vendeurs
              {vendors.length > 0 && <span className="bg-white text-red-600 text-xs font-bold px-2 rounded-full ml-auto">{vendors.length}</span>}
           </button>
           <button onClick={() => setActiveTab('users')} className={`w-full text-left p-3 rounded-lg flex items-center gap-3 ${activeTab === 'users' ? 'bg-red-600 text-white' : 'bg-white hover:bg-gray-50'}`}>
              <Users size={20} /> Utilisateurs
           </button>
           <button onClick={() => setActiveTab('products')} className={`w-full text-left p-3 rounded-lg flex items-center gap-3 ${activeTab === 'products' ? 'bg-red-600 text-white' : 'bg-white hover:bg-gray-50'}`}>
              <ShoppingBag size={20} /> Produits & Signalements
           </button>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           
           {activeTab === 'vendors' && (
             <div>
               <h2 className="font-bold text-lg mb-4">Demandes de vendeurs en attente (KYC)</h2>
               <div className="space-y-4">
                 {vendors.map(vendor => (
                   <div key={vendor.id} className="border p-4 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-bold">{vendor.shop}</p>
                        <p className="text-sm text-gray-500">Propriétaire: {vendor.name}</p>
                        <p className="text-xs text-gray-400">Soumis le {vendor.date}</p>
                        <button className="text-blue-600 text-sm underline mt-2">Voir CIN et documents</button>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleVendorAction(vendor.id, 'reject')} className="p-2 border border-red-200 text-red-600 rounded hover:bg-red-50"><X size={20}/></button>
                        <button onClick={() => handleVendorAction(vendor.id, 'approve')} className="p-2 bg-green-600 text-white rounded hover:bg-green-700"><Check size={20}/></button>
                      </div>
                   </div>
                 ))}
                 {vendors.length === 0 && <p className="text-gray-500 italic">Aucune demande en attente.</p>}
               </div>
             </div>
           )}

           {activeTab === 'users' && (
             <div>
               <h2 className="font-bold text-lg mb-4">Gestion des utilisateurs</h2>
               <table className="w-full text-left text-sm">
                 <thead className="bg-gray-50 border-b">
                   <tr>
                     <th className="p-3">Nom</th>
                     <th className="p-3">Role</th>
                     <th className="p-3">Statut</th>
                     <th className="p-3 text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody>
                   {users.map(u => (
                     <tr key={u.id} className="border-b">
                       <td className="p-3">
                         <div className="font-bold">{u.name}</div>
                         <div className="text-gray-500 text-xs">{u.email}</div>
                       </td>
                       <td className="p-3"><span className="bg-gray-100 px-2 py-1 rounded text-xs">{u.role}</span></td>
                       <td className="p-3"><span className="text-green-600 font-bold text-xs">{u.status}</span></td>
                       <td className="p-3 text-right">
                         <button className="text-red-600 hover:bg-red-50 p-2 rounded" title="Bannir"><Ban size={16}/></button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
