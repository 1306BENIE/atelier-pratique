"use client";

import { Suspense, useState } from "react";
import ProductGrid from "@/components/products/ProductGrid";
import Cart from "@/components/cart/Cart";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreateCommandePage() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
      {/* Colonne principale : Grille de produits */}
      <div className="flex-1 min-w-0">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-[#3d2314] mb-8 ">
            Desserts
          </h1>
        </header>
        <Suspense fallback={<div>Loading products...</div>}>
          <ProductGrid />
        </Suspense>
      </div>

      {/* Sidebar panier (desktop) */}
      <aside className="hidden lg:block w-full max-w-sm flex-shrink-0">
        <Cart isOpen={true} onClose={() => {}} />
      </aside>

      {/* Bouton panier mobile + overlay */}
      <Button
        className="fixed bottom-6 right-6 z-40 lg:hidden shadow-lg rounded-full p-4 bg-[#a84b2b] text-white hover:bg-[#7a2e16]"
        onClick={() => setIsCartOpen(true)}
        size="icon"
      >
        <ShoppingCart className="h-6 w-6" />
      </Button>
      {isCartOpen && (
        <div className="lg:hidden">
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      )}
    </div>
  );
}
