import { getStripe } from "@/src/lib/stripe/server";
import { createClient } from "@/src/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    // Fetch user's cart items from Supabase
    const { data: cartItems, error: cartError } = await supabase
      .from("cart_items")
      .select("id, quantity, products(id, name, price)")
      .eq("user_id", user.id);

    if (cartError || !cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: "Carrinho vazio" },
        { status: 400 }
      );
    }

    const stripe = getStripe();

    // Convert cart items to Stripe line_items
    const line_items = cartItems.map((item: any) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: item.products?.name || "Produto",
        },
        unit_amount: Math.round((item.products?.price || 0) * 100),
      },
      quantity: item.quantity || 1,
    }));

    // Add shipping cost
    line_items.push({
      price_data: {
        currency: "brl",
        product_data: {
          name: "Frete",
        },
        unit_amount: 2000, // R$ 20.00
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/sucesso`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/carrinho`,
      metadata: {
        user_id: user.id,
      },
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
