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
    <div className="w-full px-4 py-8" style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8" style={{ color: "#000000" }}>
          Nossos Produtos
        </h1>

        <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: "#f4e4a6", border: "2px solid #d4af37" }}>
          <div className="flex flex-col md:flex-row gap-4 md:items-end">
            <div className="flex-1">
              <label className="block text-lg font-semibold mb-2" style={{ color: "#000000" }}>
                Buscar produto
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Pesquisar por fragrância..."
                className="w-full rounded-lg border px-4 py-3 outline-none"
                style={{ borderColor: "#d4af37", backgroundColor: "#ffffff", color: "#000000" }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-lg font-semibold mb-2" style={{ color: "#000000" }}>Filtrar por Preço</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-lg font-bold" style={{ color: "#000000" }}>
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
