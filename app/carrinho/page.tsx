"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckoutButton } from "@/src/components/CheckoutButton";

export default function Carrinho() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Carregar itens do carrinho (simulado com cookie)
    const cartCookie = document.cookie
      .split(";")
      .find((c) => c.includes("cart"));
    if (cartCookie) {
      try {
        const cartItems = JSON.parse(
          decodeURIComponent(cartCookie.split("=")[1])
        );
        setItems(cartItems);
      } catch (e) {
        console.log("Erro ao carregar carrinho");
      }
    }
    setIsLoading(false);
  }, []);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (isLoading) {
    return <div className="text-center py-20">Carregando carrinho...</div>;
  }

  return (
    <div className="w-full px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8" style={{ color: "#7f1d1d" }}>
          Seu Carrinho
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <p className="text-xl text-gray-600 mb-6">Seu carrinho está vazio</p>
            <Link
              href="/produtos"
              className="inline-block px-8 py-3 text-white rounded-lg font-semibold hover:opacity-90 transition"
              style={{ backgroundColor: "#7f1d1d" }}
            >
              Voltar aos Produtos
            </Link>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="space-y-4 mb-8">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">Quantidade: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg" style={{ color: "#7f1d1d" }}>
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-gray-100 p-6 rounded-lg mb-8">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-semibold">Total:</span>
                <span
                  className="text-3xl font-bold"
                  style={{ color: "#7f1d1d" }}
                >
                  R$ {total.toFixed(2)}
                </span>
              </div>
              <CheckoutButton items={items} />
            </div>

            <Link
              href="/produtos"
              className="block text-center text-gray-600 hover:text-gray-900 transition"
            >
              ← Continuar comprando
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
