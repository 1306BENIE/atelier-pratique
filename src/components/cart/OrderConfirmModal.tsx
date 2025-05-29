import React from "react";

interface OrderConfirmModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function OrderConfirmModal({
  open,
  onCancel,
  onConfirm,
}: OrderConfirmModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xs mx-auto flex flex-col items-center animate-fade-in">
        <h2 className="text-xl font-bold mb-4 text-[#a84b2b] text-center">
          Confirmer la commande ?
        </h2>
        <p className="text-gray-500 mb-8 text-center">
          Voulez-vous vraiment valider cette commande ?
        </p>
        <div className="flex gap-4 w-full">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-full border border-[#a84b2b] text-[#a84b2b] font-bold hover:bg-[#f3e9e2] transition"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-full bg-[#a84b2b] text-white font-bold hover:bg-[#7a2e16] transition"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
