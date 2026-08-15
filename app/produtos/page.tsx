"use client";

import { useState } from "react";
import { ProductCard } from "@/src/components/ProductCard";

const allProducts = [
  {
    id: 1,
    name: "Essência Floral",
    description: "Aroma delicado e sofisticado",
    price: 89.90,
    image: "F",
  },
  {
    id: 2,
    name: "Essência Tropical",
    description: "Fragrância fresca e energizante",
    price: 79.90,
    image: "T",
  },
  {
    id: 3,
    name: "Essência Amadeirada",
    description: "Aroma quente e sensual",
    price: 99.90,
    image: "A",
  },
  {
    id: 4,
    name: "Essência Frutada",
    description: "Fragrância doce e refrescante",
    price: 84.90,
    image: "R",
  },
  {
    id: 5,
    name: "Essência Floral Intenso",
    description: "Aroma floral mais pronunciado",
    price: 94.90,
    image: "FI",
  },
  {
    id: 6,
    name: "Essência Almíscara",
    description: "Aroma quente e envolvente",
    price: 109.90,
    image: "AL",
  },
  {
    id: 7,
    name: "Essência Cítrica",
    description: "Fragrância cítrica e revigorante",
    price: 74.90,
    image: "C",
  },
  {
    id: 8,
    name: "Essência Oriental",
    description: "Aroma exótico e misterioso",
    price: 119.90,
    image: "O",
  },
];

export default function Produtos() {
  const [priceFilter, setPriceFilter] = useState<number>(200);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = allProducts.filter((product) => {
    const matchesPrice = product.price <= priceFilter;
    const matchesSearch = `${product.name} ${product.description}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesPrice && matchesSearch;
  });

  return (
    <div className="w-full px-4 py-10" style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <p className="mb-3 uppercase tracking-[0.28em]" style={{ color: "#8b6b2e", fontFamily: "var(--font-modern)", fontSize: "12px" }}>
            Coleção premium
          </p>
          <h1 className="text-4xl md:text-5xl font-bold" style={{ color: "#000000" }}>
            Nossos Produtos
          </h1>
        </div>

        <div className="mb-10 rounded-[28px] p-6 md:p-8" style={{ backgroundColor: "#f8f1d8", border: "1px solid rgba(212, 175, 55, 0.5)" }}>
          <div className="flex flex-col gap-6 md:flex-row md:items-end">
            <div className="flex-1">
              <label className="block text-base font-semibold mb-2" style={{ color: "#000000" }}>
                Buscar produto
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Pesquisar por fragrância ou nome..."
                className="w-full rounded-full border px-4 py-3 text-sm outline-none transition"
                style={{ borderColor: "#d4af37", backgroundColor: "#ffffff", color: "#000000" }}
              />
            </div>

            <div className="flex-1">
              <label className="block text-base font-semibold mb-2" style={{ color: "#000000" }}>
                Filtrar por preço
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(Number(e.target.value))}
                  className="w-full accent-[#d4af37]"
                />
                <span className="min-w-[110px] text-right text-lg font-bold" style={{ color: "#000000" }}>
                  Até R$ {priceFilter.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full rounded-[24px] border border-dashed p-12 text-center" style={{ borderColor: "#d4af37", backgroundColor: "#f9f4e8" }}>
              <p className="text-lg" style={{ color: "#000000" }}>
                Nenhum produto encontrado para sua busca.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
