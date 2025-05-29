"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface Commande {
  _id: string;
  items: { name: string; quantity: number; price: number; total: number }[];
  total: number;
  createdAt: string;
}

export default function CommandesTable() {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/commandes")
      .then((res) => res.json())
      .then((data) => setCommandes(data))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Supprimer cette commande ?")) return;
    const res = await fetch(`/api/commandes/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCommandes((commandes) => commandes.filter((c) => c._id !== id));
    } else {
      alert("Erreur lors de la suppression");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-[#a84b2b] text-lg">
        Chargement...
      </div>
    );
  }

  if (!commandes || commandes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <svg width="100" height="100" fill="none" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="48"
              stroke="#d96c2c"
              strokeWidth="4"
              fill="#f3e9e2"
            />

            <text
              x="50"
              y="55"
              textAnchor="middle"
              fill="#a84b2b"
              fontSize="18"
            >
              Vide
            </text>
          </svg>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg text-gray-400"
        >
          Aucune commande pour le moment.
        </motion.p>
        <button
          className="mt-8 px-6 py-3 rounded-full bg-[#a84b2b] text-white font-bold shadow hover:bg-[#d96c2c] transition"
          onClick={() => router.push("/")}
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full py-8">
      <div className="w-full max-w-5xl overflow-x-auto rounded-2xl shadow-lg bg-white border-2 border-[#f3e9e2] my-6">
        <table className="min-w-full text-sm text-center">
          <thead>
            <tr className="bg-[#f3e9e2] text-[#a84b2b]">
              <th className="py-4 px-2 font-bold">Date</th>
              <th className="py-4 px-2 font-bold">Articles</th>
              <th className="py-4 px-2 font-bold">Total</th>
              <th className="py-4 px-2 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {commandes.map((commande) => {
                const isOpen = open === commande._id;
                return (
                  <motion.tr
                    key={commande._id}
                    initial={{ opacity: 0, y: 30, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 30, scale: 0.98 }}
                    whileHover={{ scale: 1.01, backgroundColor: "#f9f6f3" }}
                    className="transition cursor-pointer border-b border-[#f3e9e2] group"
                  >
                    <td className="py-4 px-2 text-xs text-gray-500">
                      {new Date(commande.createdAt).toLocaleString()}
                    </td>
                    <td className="py-4 px-2">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#f3e9e2] text-[#a84b2b] font-bold animate-pulse">
                        {commande.items.length}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <span className="font-extrabold text-lg text-[#d96c2c]">
                        ${commande.total.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-4 px-2 flex items-center justify-center gap-2">
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-[#d96c2c] bg-white text-[#d96c2c] hover:bg-[#d96c2c] hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#d96c2c]"
                        aria-label={isOpen ? "Fermer" : "Voir les détails"}
                        onClick={() => setOpen(isOpen ? null : commande._id)}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M7 10l5 5 5-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button
                        className="px-3 py-1 rounded-full bg-[#f3e9e2] text-[#a84b2b] font-bold border border-[#d96c2c] hover:bg-[#d96c2c] hover:text-white transition"
                        onClick={() => alert("Recommander à venir !")}
                      >
                        Recommander
                      </button>
                      <button
                        className="px-3 py-1 rounded-full bg-[#fff0f0] text-[#d96c2c] font-bold border border-[#d96c2c] hover:bg-[#d96c2c] hover:text-white transition"
                        onClick={() => handleDelete(commande._id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
        {/* Accordéon détails */}
        <AnimatePresence initial={false}>
          {commandes.map((commande) => {
            const isOpen = open === commande._id;
            return (
              isOpen && (
                <motion.div
                  key={commande._id + "-details"}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="overflow-hidden bg-[#f9f6f3] border-t border-[#f3e9e2] px-8 py-4"
                >
                  <div className="max-w-2xl mx-auto">
                    <div className="grid grid-cols-4 gap-4 text-xs font-bold text-[#a84b2b] mb-2">
                      <span>Produit</span>
                      <span>Quantité</span>
                      <span>Prix unitaire</span>
                      <span>Total</span>
                    </div>
                    <div className="divide-y divide-[#f3e9e2]">
                      {commande.items.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 30 }}
                          transition={{ delay: 0.05 * idx }}
                          className="grid grid-cols-4 gap-4 py-2 text-sm items-center"
                        >
                          <span className="font-semibold text-[#3d2314]">
                            {item.name}
                          </span>
                          <span className="text-[#a84b2b]">
                            {item.quantity}x
                          </span>
                          <span className="text-gray-500">
                            ${item.price.toFixed(2)}
                          </span>
                          <span className="font-bold text-[#a84b2b]">
                            ${item.total.toFixed(2)}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            );
          })}
        </AnimatePresence>
      </div>
      <button
        className="mt-10 px-8 py-2 rounded-lg bg-[#a84b2b] text-white font-bold shadow hover:bg-[#d96c2c] transition text-lg"
        onClick={() => router.push("/")}
      >
        Retour à l'accueil
      </button>
    </div>
  );
}
