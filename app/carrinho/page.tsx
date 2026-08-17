"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckoutButton } from "@/src/components/CheckoutButton";
import { getCartItems, removeFromCart, updateCartQuantity, clearCart } from "@/src/utils/supabase/cart";
import { createClient } from "@/src/utils/supabase/browser";

export default function Carrinho() {
  const supabase = createClient();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function loadCart() {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);

      if (user) {
        const cartItems = await getCartItems();
        setItems(cartItems);
      }
      setLoading(false);
    }

    loadCart();
  }, []);

  async function handleRemove(cartItemId: string) {
    await removeFromCart(cartItemId);
    setItems(items.filter(item => item.id !== cartItemId));
  }

  async function handleUpdateQuantity(cartItemId: string, newQuantity: number) {
    if (newQuantity <= 0) {
      handleRemove(cartItemId);
      return;
    }

    await updateCartQuantity(cartItemId, newQuantity);
    setItems(items.map(item =>
      item.id === cartItemId ? { ...item, quantity: newQuantity } : item
    ));
  }

  async function handleClear() {
    await clearCart();
    setItems([]);
  }

  const subtotal = items.reduce((sum: number, item: any) => sum + (item.products?.price || 0) * item.quantity, 0);
  const shipping = subtotal > 0 ? 20 : 0;
  const total = subtotal + shipping;

  if (!isLoggedIn) {
    return (
      <div className="w-full px-4 py-20 text-center" style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
        <h1 className="text-3xl font-bold mb-6" style={{ color: "#000000" }}>
          Seu Carrinho
        </h1>
        <p className="text-lg mb-6" style={{ color: "#666666" }}>
          Você precisa estar logado para ver seu carrinho.
        </p>
        <Link
          href="/conta"
          className="inline-block px-8 py-3 rounded-full font-semibold text-white"
          style={{ backgroundColor: "#000000" }}
        >
          Fazer Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full px-4 py-20 text-center" style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
        <p style={{ color: "#000000" }}>Carregando carrinho...</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-10" style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8" style={{ color: "#000000" }}>
          Seu Carrinho
        </h1>

        {items.length === 0 ? (
          <div className="rounded-lg p-8 text-center" style={{ border: "1px dashed #d4af37", backgroundColor: "#f9f4e8" }}>
            <p style={{ color: "#000000" }} className="mb-6">
              Seu carrinho está vazio. Explore nossas essências premium!
            </p>
            <Link
              href="/produtos"
              className="inline-block px-6 py-3 rounded-full font-semibold text-white"
              style={{ backgroundColor: "#000000" }}
            >
              Ver Produtos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Itens do carrinho */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-lg"
                  style={{ border: "1px solid rgba(212, 175, 55, 0.3)", backgroundColor: "#f9f4e8" }}
                >
                  <div className="flex-1">
                    <h3 className="font-bold" style={{ color: "#000000" }}>
                      {item.products?.name}
                    </h3>
                    <p style={{ color: "#8b6b2e" }} className="font-semibold">
                      R$ {item.products?.price?.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 border rounded"
                      style={{ borderColor: "#d4af37" }}
                    >
                      −
                    </button>
                    <span className="px-4" style={{ color: "#000000" }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 border rounded"
                      style={{ borderColor: "#d4af37" }}
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p style={{ color: "#000000" }} className="font-semibold mb-2">
                      R$ {((item.products?.price || 0) * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumo */}
            <div className="rounded-lg p-6 h-fit sticky top-10" style={{ border: "1px solid rgba(212, 175, 55, 0.3)", backgroundColor: "#f9f4e8" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#000000" }}>
                Resumo do Pedido
              </h2>

              <div className="space-y-3 mb-6 pb-6" style={{ borderBottom: "1px solid #d4af37" }}>
                <div className="flex justify-between" style={{ color: "#000000" }}>
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between" style={{ color: "#000000" }}>
                  <span>Frete</span>
                  <span>R$ {shipping.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold mb-6" style={{ color: "#8b6b2e" }}>
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>

              <CheckoutButton
                items={items.map((item: any) => ({
                  id: item.product_id,
                  name: item.products?.name,
                  price: item.products?.price,
                  quantity: item.quantity,
                }))}
              />

              <button
                onClick={handleClear}
                className="w-full mt-4 py-2 text-sm rounded-full"
                style={{ backgroundColor: "transparent", color: "#000000", border: "1px solid #000000" }}
              >
                Limpar Carrinho
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
