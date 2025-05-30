"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import axios from "axios";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 xl:gap-12">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg border border-[#f3e9e2] p-4 animate-pulse flex flex-col gap-4"
          >
            <div className="aspect-square w-full bg-[#f3e9e2] rounded-2xl" />
            <div className="h-4 w-2/3 bg-[#e5ded7] rounded" />
            <div className="h-3 w-1/2 bg-[#e5ded7] rounded" />
            <div className="h-6 w-1/3 bg-[#d96c2c]/30 rounded-full mt-2" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center text-destructive">
        {error}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 xl:gap-12"
    >
      {products.map((product) => (
        <ProductCard key={product.name} product={product} />
      ))}
    </motion.div>
  );
}
