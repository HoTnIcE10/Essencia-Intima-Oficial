"use client";

import { useState } from "react";

declare global {
  interface Window {
    Stripe: any;
  }
}

export function CheckoutButton({ items }: any) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleCheckout() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const { sessionId } = await response.json();

      // Carrega Stripe dinamicamente
      const script = document.createElement("script");
      script.src = "https://js.stripe.com/v3/";
      script.async = true;
      script.onload = async () => {
        const stripe = window.Stripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
        );
        await stripe.redirectToCheckout({ sessionId });
      };
      document.body.appendChild(script);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading || items.length === 0}
      className="w-full px-6 py-3 text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 border-2"
      style={{ backgroundColor: "#000000", borderColor: "#d4af37" }}
    >
      {isLoading ? "Processando..." : "Ir para Pagamento"}
    </button>
  );
}
