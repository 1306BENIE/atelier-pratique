"use client";

import { useCart } from "./CartProvider";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import React from "react";
import type { CartItem as CartItemType } from "@/types";
import OrderConfirmModal from "./OrderConfirmModal";
import { useRouter } from "next/navigation";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartEmpty = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center h-56 text-muted-foreground"
    >
      <Image
        src="/assets/images/illustration-empty-cart.svg"
        alt="Empty cart"
        width={96}
        height={96}
        className="mb-4"
      />
      <p className="text-center text-base">Your added items will appear here</p>
    </motion.div>
  );
};

const CartItem = ({
  item,
  removeFromCart,
}: {
  item: CartItemType;
  updateQuantity: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-start gap-3 rounded-xl border border-[#f3e9e2] bg-white px-4 py-3 relative"
    >
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-sm text-[#3d2314] mb-1 truncate">
          {item.name}
        </h3>
        <div className="flex items-center text-xs gap-2 text-[#a84b2b] font-bold">
          <span>{item.quantity}x</span>
          <span className="text-[#b6aeae] font-normal text-[12px]">@</span>
          <span className="text-[#b6aeae] font-normal text-[14px]">
            ${item.price.toFixed(2)}
          </span>
          <span className="text-[#b6aeae] font-normal">•</span>
          <span className="text-[#b6aeae] font-bold text-[14px]">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
      <button
        onClick={() => removeFromCart(item.name)}
        className="ml-2 mt-2 rounded-full bg-white border-2 border-[#999] hover:border-[#000] hover:bg-none transition group"
        aria-label="Remove item"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="8"
          fill="none"
          viewBox="0 0 10 10"
          className="w-4 h-4 group-hover:scale-110 transition"
        >
          <path
            d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
            className="transition-colors group-hover:fill-black"
            fill="#CAAFA7"
          />
        </svg>
      </button>
    </motion.div>
  );
};

const CartFooter = ({
  total,
  onConfirmOrder,
}: {
  total: number;
  onConfirmOrder: () => void;
}) => {
  return (
    <div className="mt-6 space-y-4">
      <div className="flex justify-between border-t pt-4">
        <span className="font-medium">Order Total</span>
        <span className="font-bold text-lg text-[#222]">
          ${total.toFixed(2)}
        </span>
      </div>
      <div className="flex justify-center items-center gap-2 text-xs bg-green-50 rounded px-2 py-1 w-fit mx-auto text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="20"
          fill="none"
          viewBox="0 0 21 20"
        >
          <path
            fill="#1EA575"
            d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"
          />
          <path
            fill="#1EA575"
            d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"
          />
        </svg>
        <span>This is a</span>{" "}
        <span className="font-semibold">carbon-neutral</span>
        <span>delivery</span>
      </div>
      <Button
        className="flex justify-center items-center bg-[#a84b2b] hover:bg-[#7a2e16] text-white text-base py-6 px-16 rounded-full shadow-lg transition mx-auto"
        onClick={onConfirmOrder}
      >
        Confirm Order
      </Button>
    </div>
  );
};

export default function Cart({ isOpen, onClose }: CartProps) {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [modalOpen, setModalOpen] = React.useState(false);
  const router = useRouter();

  // Affichage overlay mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  if (!isOpen && isMobile) return null;

  const handleConfirmOrder = () => setModalOpen(true);
  const handleCancel = () => setModalOpen(false);
  const handleSave = () => {
    setModalOpen(false);
    router.push("/commandes");
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-auto min-h-[340px] flex flex-col justify-between border border-[#f3e9e2]"
      style={{ minHeight: 400 }}
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-extrabold text-[#a84b2b]">
            Your Cart ({cart.items.length})
          </h2>
          {/* Afficher le bouton de fermeture seulement en overlay/mobile */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        <AnimatePresence>
          {cart.items.length === 0 ? (
            <CartEmpty />
          ) : (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <CartItem
                  key={item.name}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {cart.items.length > 0 && (
        <>
          <CartFooter total={cart.total} onConfirmOrder={handleConfirmOrder} />
          <OrderConfirmModal
            open={modalOpen}
            onCancel={handleCancel}
            onConfirm={handleSave}
          />
        </>
      )}
    </div>
  );
}
