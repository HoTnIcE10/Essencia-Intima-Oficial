import { cookies } from "next/headers";
import { ProductCard } from "@/src/components/ProductCard";
import { createClient } from "@/src/utils/supabase/server";

export default async function Produtos() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  const productList: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
  }> = (products ?? []).map((product: any) => ({
    ...product,
    id: String(product.id),
    name: product.name,
    description: product.short_description || product.description || "Produto premium",
    price: Number(product.price),
    image:
      product.image_url ||
      product.name
        .split(" ")
        .map((part: string) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
  }));

  return (
    <div className="w-full px-4 py-10" style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <p className="mb-3 uppercase tracking-[0.28em]" style={{ color: "#8b6b2e", fontFamily: "var(--font-modern)", fontSize: "12px" }}>
            Coleção premium
          </p>
          <h1 className="text-4xl md:text-5xl font-bold" style={{ color: "#000000" }}>
            Nossos Produtos
          </h1>
        </div>

        {error ? (
          <div className="rounded-[24px] border border-dashed p-12 text-center" style={{ borderColor: "#d4af37", backgroundColor: "#f9f4e8" }}>
            <p className="text-lg" style={{ color: "#000000" }}>
              Não foi possível carregar os produtos no momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productList.map((product: { id: string; name: string; description: string; price: number; image: string }) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
