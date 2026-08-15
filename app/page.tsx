import Link from "next/link";
import { ProductCard } from "@/src/components/ProductCard";

const featuredProducts = [
  {
    id: 1,
    name: "Essência Floral",
    description: "Aroma delicado e sofisticado",
    price: 89.90,
    image: "🌹",
  },
  {
    id: 2,
    name: "Essência Tropical",
    description: "Fragrância fresca e energizante",
    price: 79.90,
    image: "🌺",
  },
  {
    id: 3,
    name: "Essência Amadeirada",
    description: "Aroma quente e sensual",
    price: 99.90,
    image: "🎋",
  },
  {
    id: 4,
    name: "Essência Frutada",
    description: "Fragrância doce e refrescante",
    price: 84.90,
    image: "🍓",
  },
];

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="py-20 text-center text-white"
        style={{ backgroundColor: "#7f1d1d" }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Bem-vindo à Essência Intima</h1>
          <p className="text-xl mb-8">Descubra aromas que despertam sensações</p>
          <Link
            href="/produtos"
            className="inline-block px-8 py-3 bg-white text-red-900 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Explorar Produtos
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center" style={{ color: "#7f1d1d" }}>
            Produtos em Destaque
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center" style={{ color: "#7f1d1d" }}>
            Por que escolher Essência Intima?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2">Qualidade Premium</h3>
              <p className="text-gray-600">Aromas selecionados com os melhores ingredientes</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Discrição Garantida</h3>
              <p className="text-gray-600">Embalagens discretas para sua privacidade</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">Frete rápido e seguro para todo Brasil</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
