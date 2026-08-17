import { getStripe } from "@/src/lib/stripe/server";
import { createClient } from "@/src/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { cookies } from "next/headers";

const stripe = getStripe();
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature") || "";

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // Handle checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.user_id;

      if (!userId) {
        console.error("No user_id in session metadata");
        return NextResponse.json({ received: true });
      }

      const cookieStore = await cookies();
      const supabase = createClient(cookieStore);

      // Fetch user's cart items
      const { data: cartItems, error: cartError } = await supabase
        .from("cart_items")
        .select("id, quantity, product_id, products(price)")
        .eq("user_id", userId);

      if (cartError) {
        console.error("Error fetching cart items:", cartError);
        return NextResponse.json({ received: true });
      }

      // Calculate total
      let total = 0;
      if (cartItems && cartItems.length > 0) {
        total = cartItems.reduce((sum: number, item: any) => {
          return sum + ((item.products?.price || 0) * item.quantity);
        }, 0);
        total += 20; // Add shipping
      }

      // Create order in Supabase
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: userId,
          total_amount: total,
          status: "completed",
          stripe_session_id: session.id,
        })
        .select()
        .single();

      if (orderError) {
        console.error("Error creating order:", orderError);
        return NextResponse.json({ received: true });
      }

      // Create order items
      if (cartItems && cartItems.length > 0) {
        const orderItems = cartItems.map((item: any) => ({
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.products?.price || 0,
        }));

        const { error: itemsError } = await supabase
          .from("order_items")
          .insert(orderItems);

        if (itemsError) {
          console.error("Error creating order items:", itemsError);
        }
      }

      // Clear user's cart
      const { error: clearError } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", userId);

      if (clearError) {
        console.error("Error clearing cart:", clearError);
      }

      console.log("Order created successfully:", order.id);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
