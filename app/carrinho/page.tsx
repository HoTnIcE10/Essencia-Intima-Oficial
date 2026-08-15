"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckoutButton } from "@/src/components/CheckoutButton";

export default function Carrinho() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = items.length > 0 ? 19.9 : 0;
  const total = subtotal + shipping;

  if (isLoading) {
    return <div className="text-center py-20" style={{ color: "#000000" }}>Carregando carrinho...</div>;
  }

  return (
    <div className="w-full px-4 py-10" style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <p className="mb-3 uppercase tracking-[0.28em]" style={{ color: "#8b6b2e", fontFamily: "var(--font-modern)", fontSize: "12px" }}>
            Finalização
          </p>
          <h1 className="text-4xl md:text-5xl font-bold" style={{ color: "#000000" }}>
            Pagamento
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-[28px] border border-dashed p-12 text-center" style={{ borderColor: "#d4af37", backgroundColor: "#f9f4e8" }}>
            <p className="text-2xl font-semibold mb-4" style={{ color: "#000000" }}>Seu carrinho está vazio</p>
            <p className="text-gray-600 mb-8">Explore nossa coleção e escolha produtos que combinem com seu estilo.</p>
            <Link
              href="/produtos"
              className="inline-block px-8 py-3 rounded-full font-semibold transition"
              style={{ backgroundColor: "#000000", color: "#ffffff" }}
            >
              Ver produtos
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[28px] border p-6 md:p-8" style={{ backgroundColor: "#ffffff", borderColor: "rgba(212, 175, 55, 0.5)", boxShadow: "0 20px 40px rgba(0,0,0,0.04)" }}>
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-semibold" style={{ color: "#000000" }}>Resumo do pedido</h2>
                <span className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em]" style={{ backgroundColor: "#f8f1d8", color: "#8b6b2e" }}>
                  {items.length} item(s)
                </span>
              </div>

              <div className="space-y-4 mb-8">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between rounded-2xl border p-4" style={{ borderColor: "rgba(212, 175, 55, 0.3)", backgroundColor: "#ffffff" }}>
                    <div>
                      <h3 className="font-semibold text-lg" style={{ color: "#000000" }}>{item.name}</h3>
                      <p className="text-sm" style={{ color: "#666666" }}>Quantidade: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg" style={{ color: "#000000" }}>
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl p-5" style={{ backgroundColor: "#f9f4e8" }}>
                <div className="flex justify-between py-2 text-sm" style={{ color: "#333333" }}>
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 text-sm" style={{ color: "#333333" }}>
                  <span>Frete</span>
                  <span>R$ {shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-4 mt-4 border-t text-lg font-bold" style={{ borderColor: "rgba(212, 175, 55, 0.4)", color: "#000000" }}>
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border p-6 md:p-8" style={{ backgroundColor: "#000000", borderColor: "#d4af37", boxShadow: "0 20px 40px rgba(0,0,0,0.14)" }}>
              <h2 className="text-2xl font-semibold mb-6" style={{ color: "#f4e4a6" }}>Pagamento</h2>

              <div className="space-y-4 mb-8">
                <div className="rounded-2xl border p-4" style={{ borderColor: "rgba(212,175,55,0.4)", backgroundColor: "rgba(255,255,255,0.03)" }}>
                  <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "#d4af37" }}>Método</p>
                  <p className="mt-2 text-lg font-medium" style={{ color: "#ffffff" }}>Cartão de crédito</p>
                </div>
                <div className="rounded-2xl border p-4" style={{ borderColor: "rgba(212,175,55,0.4)", backgroundColor: "rgba(255,255,255,0.03)" }}>
                  <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "#d4af37" }}>Entrega</p>
                  <p className="mt-2 text-lg font-medium" style={{ color: "#ffffff" }}>Correios ou retirada</p>
                </div>
              </div>

              <CheckoutButton items={items} />

              <Link
                href="/produtos"
                className="mt-6 block text-center text-sm transition"
                style={{ color: "#f4e4a6" }}
              >
                ← Continuar comprando
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
