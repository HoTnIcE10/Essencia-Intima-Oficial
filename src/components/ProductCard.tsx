"use client";

import { useState } from "react";
import { addToCart } from "@/src/utils/supabase/cart";

export function ProductCard({ product }: any) {
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState("");

  async function handleAddToCart() {
    setIsAdding(true);
    setMessage("");
    try {
      await addToCart(product.id, 1);
      setMessage("✅ Adicionado!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error: any) {
      setMessage(error.message || "Erro ao adicionar");
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden transition-all animate-fade-in-up"
      style={{
        border: "1px solid rgba(212, 175, 55, 0.45)",
        boxShadow: "0 12px 30px rgba(0,0,0,0.04)",
      }}
    >
      <div
        className="h-48 bg-gradient-to-br flex items-center justify-center text-4xl font-semibold tracking-[0.18em]"
        style={{ backgroundColor: "#000000", color: "#f4e4a6" }}
      >
        {product.image || "A"}
      </div>
      <div className="p-6">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em]" style={{ color: "#8b6b2e" }}>
          Coleção
        </p>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold" style={{ color: "#d4af37" }}>
            R$ {product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition border-2"
            style={{ backgroundColor: "#000000", borderColor: "#d4af37" }}
          >
            {isAdding ? "..." : "Adicionar"}
          </button>
        </div>
        {message && (
          <p className="text-xs mt-2 text-center" style={{ color: message.includes("✅") ? "#16a34a" : "#dc2626" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
