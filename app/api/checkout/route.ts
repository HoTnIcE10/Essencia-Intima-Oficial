import { getStripe } from "@/src/lib/stripe/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();
    const stripe = getStripe();

    const line_items = items.map((item: any) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/sucesso`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/carrinho`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Erro ao processar checkout" },
      { status: 500 }
    );
  }
}
