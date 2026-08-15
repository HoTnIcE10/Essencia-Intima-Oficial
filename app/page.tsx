'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductCard } from "@/src/components/ProductCard";
import { FeatureCard } from "@/src/components/FeatureCard";

const featuredProducts = [
  {
    id: 1,
    name: "Essência Floral",
    description: "Aroma delicado e sofisticado",
    price: 89.9,
    image: "🌹",
  },
  {
    id: 2,
    name: "Essência Tropical",
    description: "Fragrância fresca e energizante",
    price: 79.9,
    image: "🌺",
  },
  {
    id: 3,
    name: "Essência Amadeirada",
    description: "Aroma quente e sensual",
    price: 99.9,
    image: "🎋",
  },
  {
    id: 4,
    name: "Essência Frutada",
    description: "Fragrância doce e refrescante",
    price: 84.9,
    image: "🍓",
  },
];

const carouselItems = [
  {
    title: "Velvet Bloom",
    subtitle: "Mais vendido",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    color: "#5f0b1e",
  },
  {
    title: "Noir Desire",
    subtitle: "Coleção premium",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
    color: "#1f1f1f",
  },
  {
    title: "Golden Touch",
    subtitle: "Luxo discreto",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
    color: "#8d6b1f",
  },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselItems.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentSlide = carouselItems[activeSlide];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden animate-fade-in-down"
        style={{
          borderBottom: "6px solid #d4af37",
          backgroundImage: "url(/fotos-fundo/pexels-toni-5381474.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "650px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to left, rgba(220, 20, 60, 0.82), rgba(220, 20, 60, 0.38) 45%, rgba(0,0,0,0.18) 100%)",
            pointerEvents: "none",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white w-full">
          <div className="mx-auto max-w-3xl">
            <p
              className="mb-2 uppercase tracking-[0.45em] text-sm"
              style={{
                color: "#f4e4a6",
                fontFamily: "var(--font-modern)",
                letterSpacing: "0.42em",
              }}
            >
              Essencia Intima
            </p>
            <h1
              className="mb-4 leading-none"
              style={{
                color: "#ffffff",
                fontFamily: "var(--font-script)",
                fontSize: "clamp(4rem, 8vw, 8rem)",
                lineHeight: 0.9,
                textShadow: "2px 2px 12px rgba(0,0,0,0.45)",
              }}
            >
              Essencia Intima
            </h1>
            <p
              className="mb-8 text-lg md:text-2xl font-light"
              style={{
                color: "#f5f5f5",
                fontFamily: "var(--font-modern)",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                textShadow: "1px 1px 6px rgba(0,0,0,0.4)",
              }}
            >
              Moda e prazer
            </p>
            <Link
              href="/produtos"
              className="inline-block px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition border-2 hover-lift"
              style={{ backgroundColor: "#f4e4a6", borderColor: "#d4af37", color: "#2b0a12" }}
            >
              Explorar Produtos
            </Link>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-16 px-4" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center" style={{ color: "#000000" }}>
            ✨ Mais Vendidos ✨
          </h2>

          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] items-center">
            <div
              className="relative overflow-hidden rounded-[28px] border-4 border-[#d4af37] shadow-[0_25px_60px_rgba(0,0,0,0.12)]"
              style={{ minHeight: "420px" }}
            >
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="h-[420px] w-full object-cover transition-all duration-700"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(90deg, ${currentSlide.color} 0%, rgba(0,0,0,0.12) 35%, rgba(0,0,0,0.15) 100%)`,
                }}
              />
              <div className="absolute inset-0 flex items-end p-8 md:p-10">
                <div className="text-white max-w-md">
                  <p
                    className="mb-2 text-sm uppercase tracking-[0.28em]"
                    style={{ fontFamily: "var(--font-modern)", color: "#f4e4a6" }}
                  >
                    {currentSlide.subtitle}
                  </p>
                  <h3
                    className="mb-2 text-4xl md:text-5xl"
                    style={{ fontFamily: "var(--font-script)", lineHeight: 1 }}
                  >
                    {currentSlide.title}
                  </h3>
                  <Link
                    href="/produtos"
                    className="inline-block rounded-full px-5 py-2 text-sm font-semibold"
                    style={{ backgroundColor: "#f4e4a6", color: "#1a1a1a" }}
                  >
                    Ver coleção
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {carouselItems.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className="w-full rounded-2xl border p-4 text-left transition-all duration-300 hover:translate-x-1"
                  style={{
                    backgroundColor: activeSlide === index ? "#f7f0d4" : "#ffffff",
                    borderColor: activeSlide === index ? "#d4af37" : "#e7e7e7",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 w-20 rounded-xl object-cover"
                    />
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "#8b6b2e" }}>
                        {item.subtitle}
                      </p>
                      <h4 className="mt-1 text-2xl" style={{ fontFamily: "var(--font-script)" }}>
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
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
