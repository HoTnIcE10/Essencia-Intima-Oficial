"use client";

import { useState } from "react";
import { ProductCard } from "@/src/components/ProductCard";

const allProducts = [
  {
    id: 1,
    name: "Essência Floral",
    description: "Aroma delicado e sofisticado",
    price: 89.90,
    image: "🌹",
  },
  {
    id: 2,
    name: "Essência Tropical",
    description: "Fragrância fresca e energizante",
    price: 79.90,
    image: "🌺",
  },
  {
    id: 3,
    name: "Essência Amadeirada",
    description: "Aroma quente e sensual",
    price: 99.90,
    image: "🎋",
  },
  {
    id: 4,
    name: "Essência Frutada",
    description: "Fragrância doce e refrescante",
    price: 84.90,
    image: "🍓",
  },
  {
    id: 5,
    name: "Essência Floral Intenso",
    description: "Aroma floral mais pronunciado",
    price: 94.90,
    image: "🌸",
  },
  {
    id: 6,
    name: "Essência Almíscara",
    description: "Aroma quente e envolvente",
    price: 109.90,
    image: "💫",
  },
  {
    id: 7,
    name: "Essência Cítrica",
    description: "Fragrância cítrica e revigorante",
    price: 74.90,
    image: "🍋",
  },
  {
    id: 8,
    name: "Essência Oriental",
    description: "Aroma exótico e misterioso",
    price: 119.90,
    image: "🌙",
  },
];

export default function Produtos() {
  const [priceFilter, setPriceFilter] = useState<number>(200);

  const filteredProducts = allProducts.filter((p) => p.price <= priceFilter);

  return (
    <div className="w-full px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8" style={{ color: "#7f1d1d" }}>
          Nossos Produtos
        </h1>

        {/* Filter */}
        <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: "#f4e4a6", border: "2px solid #d4af37" }}>
          <label className="block text-lg font-semibold mb-4" style={{ color: "#7f1d1d" }}>Filtrar por Preço</label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="50"
              max="200"
              value={priceFilter}
              onChange={(e) => setPriceFilter(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-lg font-bold" style={{ color: "#7f1d1d" }}>
              Até R$ {priceFilter.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 text-lg">
                Nenhum produto encontrado nessa faixa de preço.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
