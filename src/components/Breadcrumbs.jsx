import React from "react";
import { ChevronRight } from "lucide-react";
export default function Breadcrumbs({items, navigate}) {
    return (
        <div className="text-sm text-gray-500 mb-4 flex items-center">
        {items.map((item, index) => (
            <React.Fragment key={item.label}>
                {index > 0 && <ChevronRight size={16} className="mx-1" />}
                {item.href ? (
                    <button onClick={() => navigate(item.href, item.props)} className="hover:text-orange-500">
                        {item.label}
                    </button>
                ) : (
                    <span className="text-gray-800 font-medium">{item.label}</span>
                )}
            </React.Fragment>
        ))}
    </div>
    )
}