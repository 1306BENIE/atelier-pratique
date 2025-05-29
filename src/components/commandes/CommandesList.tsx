"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Commande {
  _id: string;
  items: { name: string; quantity: number; price: number; total: number }[];
  total: number;
  createdAt: string;
}

export default function CommandesList({
  commandes,
}: {
  commandes: Commande[];
}) {
  const [open, setOpen] = useState<string | null>(null);

  if (!commandes || commandes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Image
            src="/assets/images/illustration-empty-cart.svg"
            alt="Aucune commande"
            width={120}
            height={120}
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg text-gray-400"
        >
          Aucune commande pour le moment.
        </motion.p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {commandes.map((commande) => {
          const isOpen = open === commande._id;
          return (
            <motion.div
              key={commande._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 32px #d96c2c22" }}
              className={`relative bg-white rounded-2xl border-2 border-[#f3e9e2] shadow-lg transition-all overflow-hidden group`}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-6 py-4 cursor-pointer select-none"
                onClick={() => setOpen(isOpen ? null : commande._id)}
              >
                <div className="flex items-center gap-3">
                  <motion.span
                    layoutId={`date-${commande._id}`}
                    className="text-xs text-gray-400"
                  >
                    {new Date(commande.createdAt).toLocaleString()}
                  </motion.span>
                  <motion.span
                    layoutId={`badge-${commande._id}`}
                    className="ml-2 px-3 py-1 rounded-full bg-[#f3e9e2] text-[#a84b2b] font-bold text-xs shadow-sm border border-[#d96c2c] animate-pulse"
                  >
                    {commande.items.length} items
                  </motion.span>
                </div>
                <motion.span
                  layoutId={`total-${commande._id}`}
                  className="font-extrabold text-lg text-[#d96c2c] drop-shadow-sm"
                  whileHover={{ scale: 1.1 }}
                >
                  ${commande.total.toFixed(2)}
                </motion.span>
                <motion.button
                  className={`ml-4 w-8 h-8 flex items-center justify-center rounded-full border-2 border-[#d96c2c] bg-white text-[#d96c2c] group-hover:bg-[#d96c2c] group-hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#d96c2c]`}
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  aria-label={isOpen ? "Fermer" : "Voir les détails"}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(isOpen ? null : commande._id);
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 10l5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </div>
              {/* Accordéon items */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { height: "auto", opacity: 1 },
                      collapsed: { height: 0, opacity: 0 },
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                    className="px-6 pb-4"
                  >
                    <div className="divide-y divide-[#f3e9e2]">
                      {commande.items.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 30 }}
                          transition={{ delay: 0.05 * idx }}
                          className="flex items-center justify-between py-3 text-sm hover:bg-[#f9f6f3] rounded-lg px-2 group/item transition"
                        >
                          <span className="font-semibold text-[#3d2314] group-hover/item:text-[#d96c2c] transition">
                            {item.name}
                          </span>
                          <span className="text-[#a84b2b]">
                            {item.quantity}x
                          </span>
                          <span className="text-gray-500">
                            @ ${item.price.toFixed(2)}
                          </span>
                          <span className="font-bold text-[#a84b2b]">
                            ${item.total.toFixed(2)}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
