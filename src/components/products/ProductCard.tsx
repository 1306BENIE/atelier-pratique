"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { cart, addToCart, updateQuantity } = useCart();
  const cartItem = cart.items.find((item) => item.name === product.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-xl border border-[#f3e9e2]"
    >
      <div className="relative aspect-square w-full flex items-center justify-center p-2">
        <div
          className={`relative w-full h-full rounded-2xl border-2 ${cartItem ? "border-[#d96c2c]" : "border-[#e5ded7]"} overflow-hidden`}
        >
          <Image
            src={product.image.desktop}
            alt={product.name}
            fill
            className="object-cover rounded-2xl"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className="flex justify-center -mt-6 z-10 mb-2">
        {cartItem ? (
          <div className="flex items-center bg-[#a84b2b] rounded-full shadow-md px-6 py-2 gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="border border-white text-white hover:bg-white hover:text-[#d96c2c] rounded-full p-1 w-5 h-5 min-w-0 min-h-0"
              onClick={() =>
                updateQuantity(product.name, Math.max(1, cartItem.quantity - 1))
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="2"
                viewBox="0 0 10 2"
                fill="none"
                className="w-4 h-4"
                style={{ display: "block" }}
              >
                <rect
                  x="0"
                  y="0.375"
                  width="10"
                  height="1.25"
                  rx="0.5"
                  fill="currentColor"
                />
              </svg>
            </Button>
            <span className="font-bold text-white text-base select-none px-7">
              {cartItem.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="border border-white text-[6px] text-white hover:bg-white hover:text-[#d96c2c] rounded-full p-1 w-5 h-5 min-w-0 min-h-0"
              onClick={() =>
                updateQuantity(product.name, cartItem.quantity + 1)
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                className="w-4 h-4"
                style={{ display: "block" }}
              >
                <rect
                  x="0"
                  y="4.375"
                  width="10"
                  height="1.25"
                  rx="0.5"
                  fill="currentColor"
                />
                <rect
                  x="4.375"
                  y="0"
                  width="1.25"
                  height="10"
                  rx="0.5"
                  fill="currentColor"
                />
              </svg>
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => addToCart(product)}
            className="flex items-center gap-2 rounded-full border-2 border-[#b6aeae]
            bg-white text-[#a84b2b] font-bold py-5 px-6 shadow-md hover:bg-[#f9f6f3]
            transition mx-auto hover:border-[#d96c2c]"
          >
            <Image
              src="/assets/images/icon-add-to-cart.svg"
              alt="Add to cart"
              width={24}
              height={24}
            />
            <span className="text-[#333] hover:text-[#d96c2c]">
              Add to Cart
            </span>
          </Button>
        )}
      </div>
      <div className="flex flex-col flex-1 px-5 pb-5 gap-2 mt-2">
        <span className="text-xs text-[#a89b91] font-medium mb-1">
          {product.category}
        </span>
        <h3 className="text-base font-extrabold text-[#3d2314] mb-1">
          {product.name}
        </h3>
        <span className="text-sm font-bold text-[#d96c2c] mb-2">
          ${product.price.toFixed(2)}
        </span>
      </div>
    </motion.div>
  );
}
