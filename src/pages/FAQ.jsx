import React from "react";

export default function FAQ({ title, content, navigate }) {
        const breadcrumbs = [
        { label: 'Accueil', href: 'home' },
        { label: title }
    ];
    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Breadcrumbs items={breadcrumbs} navigate={navigate} />
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">{title}</h1>
                <div className="text-gray-700 leading-relaxed space-y-4">
                    {content}
                </div>
                <button onClick={() => navigate('home')} className="mt-8 inline-block bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-orange-500 transition-colors">
                    Retour à l'accueil
                </button>
            </div>
        </div>
    );
}