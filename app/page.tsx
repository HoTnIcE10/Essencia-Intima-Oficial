import Link from "next/link";
import { ProductCard } from "@/src/components/ProductCard";
import { LogoAnimation } from "@/src/components/LogoAnimation";
import { FeatureCard } from "@/src/components/FeatureCard";

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
        className="py-20 text-center text-white animate-fade-in-down"
        style={{ backgroundColor: "#000000", borderBottom: "6px solid #d4af37" }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <LogoAnimation />
          <h1 className="text-5xl font-bold mb-4" style={{ color: "#f4e4a6" }}>✨ Bem-vindo à Essência Intima ✨</h1>
          <p className="text-xl mb-8">Descubra aromas que despertam sensações</p>
          <Link
            href="/produtos"
            className="inline-block px-8 py-3 text-red-900 rounded-lg font-semibold hover:opacity-90 transition border-2 hover-lift"
            style={{ backgroundColor: "#f4e4a6", borderColor: "#d4af37" }}
          >
            Explorar Produtos
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center" style={{ color: "#000000" }}>
            ✨ Produtos em Destaque ✨
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center animate-fade-in-up" style={{ color: "#000000" }}>
            Por que escolher Essência Intima?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              index={0}
              icon="✨" 
              title="Qualidade Premium" 
              description="Aromas selecionados com os melhores ingredientes"
            />
            <FeatureCard 
              index={1}
              icon="🔒" 
              title="Discrição Garantida" 
              description="Embalagens discretas para sua privacidade"
            />
            <FeatureCard 
              index={2}
              icon="🚚" 
              title="Entrega Rápida" 
              description="Frete rápido e seguro para todo Brasil"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
