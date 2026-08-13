"use client";

import Link from "next/link";
import productsData from "../../data/product.json";

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
}

const CATEGORY_META: Record<string, { icon: string; accent: string }> = {
  Vegetables: { icon: "🥕", accent: "#A8D95E" },
  Fruits: { icon: "🍎", accent: "#E4572E" },
  "Dairy & Eggs": { icon: "🥛", accent: "#1F4D3A" },
  "Bakery & Snacks": { icon: "🍞", accent: "#C9A24B" },
  Beverages: { icon: "🧃", accent: "#4E8DDB" },
  "Household & Staples": { icon: "🍯", accent: "#A8712F" },
};

export default function CategoriesPage() {
  const products = productsData as Product[];

  const categories = Array.from(
    products.reduce((map, product) => {
      if (!map.has(product.category)) {
        map.set(product.category, { cover: product.image, count: 0 });
      }
      map.get(product.category)!.count += 1;
      return map;
    }, new Map<string, { cover: string; count: number }>())
  );

  return (
    <section className="min-h-screen bg-[#FBF8F2] py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 animate-[fadeUp_0.5s_cubic-bezier(0.16,1,0.3,1)_both]">
          <p className="text-xs uppercase tracking-widest text-[#1F4D3A]/70 font-semibold mb-1">
            Browse
          </p>
          <h1
            className="text-2xl md:text-3xl font-bold text-[#26302A]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Shop by Category
          </h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories.map(([name, meta], i) => {
            const info = CATEGORY_META[name] || { icon: "🛒", accent: "#1F4D3A" };
            return (
              <Link
                key={name}
                href={`/products?category=${encodeURIComponent(name)}`}
                className="group relative rounded-2xl overflow-hidden border border-[#E7E1D3] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-20px_rgba(31,77,58,0.3)] animate-[fadeUp_0.5s_cubic-bezier(0.16,1,0.3,1)_both]"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <img
                    src={meta.cover}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-70"
                    style={{
                      background: `linear-gradient(180deg, transparent 30%, ${info.accent}CC 100%)`,
                    }}
                  />
                  <span className="absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-lg shadow-sm">
                    {info.icon}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-base leading-snug drop-shadow-sm">
                      {name}
                    </h3>
                    <p className="text-white/85 text-xs mt-0.5">
                      {meta.count} {meta.count === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </section>
  );
}