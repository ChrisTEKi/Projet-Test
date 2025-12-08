import React from "react";
import { mockCategories } from "../data/mock"
export default function Filters({filter, setFilter, sort, setSort}) {
    //const [filter, setFilter] = useState(initialCategory || "");
    return (
        <div className="w-full bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Filtres</h2>
        
        <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Catégories</label>
            <select 
              value={filter || ""}
              onChange={(e) => setFilter(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Toutes les catégories</option>
              {mockCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Trier par</label>
            <select 
              value={sort || "rating_desc"} 
              onChange={(e) => setSort(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="rating_desc">Meilleures notes</option>
              <option value="price_asc">Prix croissant</option>
              <option value="price_desc">Prix décroissant</option>
            </select>
          </div>
    </div>
    )
}