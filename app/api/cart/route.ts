import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { productId, name, price, quantity } = await req.json();

    const cart = (req.headers.get("cookie") || "")
      .split(";")
      .find((c) => c.includes("cart"));

    const items = cart ? JSON.parse(decodeURIComponent(cart.split("=")[1])) : [];
    const existingItem = items.find((i: any) => i.id === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.push({ id: productId, name, price, quantity });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set("cart", JSON.stringify(items), {
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Cart error:", error);
    return NextResponse.json(
      { error: "Erro ao adicionar ao carrinho" },
      { status: 500 }
    );
  }
}
