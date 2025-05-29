import React from "react";

export default function CommandesPage() {
  // À terme, ici on affichera la liste des commandes récupérées depuis une API ou un store
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold mb-8 text-[#a84b2b]">
        Mes commandes
      </h1>
      <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
        Aucune commande pour le moment.
      </div>
    </div>
  );
}
