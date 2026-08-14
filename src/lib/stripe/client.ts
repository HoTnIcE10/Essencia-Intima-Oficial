"use client";

declare global {
  interface Window {
    Stripe: any;
  }
}

export async function loadStripe() {
  return new Promise<void>((resolve) => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/";
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
}
