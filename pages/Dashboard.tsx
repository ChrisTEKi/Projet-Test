import React from 'react';
import { User, UserRole } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Package, Users, DollarSign, Activity } from 'lucide-react';

interface DashboardProps {
  user: User;
}

const data = [
  { name: 'Lun', ventes: 400000 },
  { name: 'Mar', ventes: 300000 },
  { name: 'Mer', ventes: 200000 },
  { name: 'Jeu', ventes: 278000 },
  { name: 'Ven', ventes: 189000 },
  { name: 'Sam', ventes: 600000 },
  { name: 'Dim', ventes: 500000 },
];

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  // Simple check for demo purposes
  if (user.role === UserRole.CUSTOMER) {
    return <div className="p-10 text-center">Accès réservé aux vendeurs et administrateurs.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
         <h1 className="text-2xl font-bold">Tableau de bord {user.role === UserRole.ADMIN ? 'Admin' : 'Vendeur'}</h1>
         <div className="flex gap-2">
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Ajouter un produit</button>
            <button className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold">Paramètres</button>
         </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm">Ventes Totales</span>
              <div className="p-2 bg-green-100 text-green-600 rounded-lg"><DollarSign size={20}/></div>
            </div>
            <p className="text-2xl font-bold">12 450 000 Ar</p>
            <span className="text-xs text-green-600 font-medium">+12% ce mois</span>
         </div>
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm">Commandes</span>
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Package size={20}/></div>
            </div>
            <p className="text-2xl font-bold">145</p>
            <span className="text-xs text-blue-600 font-medium">8 en attente</span>
         </div>
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm">Visiteurs</span>
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Users size={20}/></div>
            </div>
            <p className="text-2xl font-bold">3 200</p>
            <span className="text-xs text-purple-600 font-medium">+5% vs hier</span>
         </div>
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm">Conversion</span>
              <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><Activity size={20}/></div>
            </div>
            <p className="text-2xl font-bold">2.4%</p>
            <span className="text-xs text-gray-500">Moyenne du secteur: 2.1%</span>
         </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <h3 className="font-bold text-gray-800 mb-6">Revenus (7 derniers jours)</h3>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={data}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} tickMargin={10} />
                 <YAxis axisLine={false} tickLine={false} fontSize={12} tickFormatter={(val) => `${val/1000}k`} />
                 <Tooltip cursor={{fill: '#f9f9f9'}} formatter={(value) => [`${value} Ar`, 'Ventes']} />
                 <Bar dataKey="ventes" fill="#dc2626" radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <h3 className="font-bold text-gray-800 mb-6">Commandes récentes</h3>
           <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
               <thead className="text-gray-500 font-medium border-b">
                 <tr>
                   <th className="pb-3">ID</th>
                   <th className="pb-3">Client</th>
                   <th className="pb-3">Statut</th>
                   <th className="pb-3 text-right">Montant</th>
                 </tr>
               </thead>
               <tbody className="divide-y">
                 {[1,2,3,4,5].map(i => (
                   <tr key={i} className="hover:bg-gray-50">
                     <td className="py-3 font-mono">#ORD-{2024+i}</td>
                     <td className="py-3">Mialy R.</td>
                     <td className="py-3">
                       <span className={`px-2 py-1 rounded-full text-xs font-bold ${i === 1 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                         {i === 1 ? 'En cours' : 'Livré'}
                       </span>
                     </td>
                     <td className="py-3 text-right font-bold">{(45000 + i * 2000).toLocaleString()} Ar</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
