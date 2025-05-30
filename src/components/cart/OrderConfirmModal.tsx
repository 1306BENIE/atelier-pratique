"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function OrderConfirmModal({
  open,
  onCancel,
  onConfirm,
  cart,
  total,
  loading = false,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  cart: any[];
  total: number;
  loading?: boolean;
}) {
  if (!open) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-auto flex flex-col"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          {/* Icône check */}
          <div className="mb-4 flex w-full">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z"
                fill="#1EA575"
              />
              <path
                d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z"
                fill="#1EA575"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-[#3d2314] mb-2">
            Order Confirmed
          </h2>
          <p className="text-gray-500 mb-6">We hope you enjoy your food!</p>
          {/* Liste des produits */}
          <div className="w-full bg-[#f9f6f3] rounded-xl p-4 mb-6">
            {cart.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-2 border-b last:border-b-0 border-[#e5ded7]"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={item.image.thumbnail}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-[#3d2314]">
                      {item.name}
                    </div>
                    <div className="text-sm text-[#d96c2c] font-bold">
                      {item.quantity}x{" "}
                      <span className="text-[#b6aeae] font-normal ml-2">@</span>
                      <span className="text-[#b6aeae] font-semibold text-sm">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="font-semibold text-[#3d2314]">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center pt-4 mt-2 border-t border-[#e5ded7]">
              <span className="font-medium text-[#a89b91]">Order Total</span>
              <span className="font-extrabold text-xl text-[#3d2314]">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
          {/* Boutons */}
          <div className="flex gap-4 w-full">
            <button
              onClick={onCancel}
              className="flex-1 py-2 rounded-full border border-[#a84b2b] text-[#a84b2b] font-bold hover:bg-[#f3e9e2] transition"
            >
              Annuler
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-2 rounded-full bg-[#a84b2b] text-white font-bold hover:bg-[#d96c2c] transition"
            >
              Confirmer
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
