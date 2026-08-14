"use client";

import { Flame } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  salePrice: number;
  price: number;
  unit: string;
  image: string;
  rating: number;
}

const topProducts: Product[] = [
  {
    id: "1",
    name: "Fresh Organic Tomato",
    category: "Vegetable",
    salePrice: 60,
    price: 75,
    unit: "1 kg",
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Fresh Fish",
    category: "Fish",
    salePrice: 850,
    price: 950,
    unit: "1 kg",
    image:
      "https://images.unsplash.com/photo-1707056707380-5e39845bc25b",
    rating: 4.9,
  },
  {
    id: "3",
    name: "Basmati Rice",
    category: "Grocery",
    salePrice: 120,
    price: 140,
    unit: "5 kg",
    image:
      "https://images.unsplash.com/photo-1643622357625-c013987d90e7",
    rating: 4.7,
  },
];

const TopProductsToday = () => {
  return (
    <section className="py-16 bg-[#FBF8F2]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8 animate-[fadeUp_0.5s_cubic-bezier(0.16,1,0.3,1)_both]">
          <Flame className="w-6 h-6 text-[#E4572E]" />

          <div>
            <p className="text-xs tracking-widest uppercase text-[#1F4D3A] font-semibold">
              Today&apos;s Pick
            </p>

            <h2
              className="text-2xl md:text-3xl font-bold text-[#26302A]"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Top 3 Products
            </h2>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {topProducts.map((product, index) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-3xl border border-[#E7E1D3] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-20px_rgba(31,77,58,0.3)] hover:border-[#A8D95E]/40 animate-[fadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_both]"
              style={{
                animationDelay: `${index * 120}ms`,
              }}
            >
              {/* Rank Badge */}
              <div className="absolute top-4 left-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-[#1F4D3A] text-[#A8D95E] text-sm font-bold shadow-md transition-transform duration-300 group-hover:scale-110">
                {index + 1}
              </div>

              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#1F4D3A]/15 via-transparent to-transparent" />
              </div>

              {/* Details */}
              <div className="p-5">
                {/* Category */}
                <span className="text-xs bg-[#A8D95E]/15 text-[#1F4D3A] px-2 py-1 rounded-full font-medium">
                  {product.category}
                </span>

                {/* Product Name */}
                <h3 className="font-bold text-lg text-[#26302A] mt-3">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[#E4572E] text-sm">⭐</span>

                  <span className="text-sm text-[#26302A]/70">
                    {product.rating}
                  </span>

                  <span className="text-xs text-stone-400 ml-1">
                    · {product.unit}
                  </span>
                </div>

                {/* Price & Add Button */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-baseline gap-2">
                    {/* Sale Price - Dollar */}
                    <span className="text-xl font-bold text-[#26302A]">
                      ${product.salePrice}
                    </span>

                    {/* Original Price - Dollar */}
                    {product.salePrice < product.price && (
                      <span className="text-sm text-stone-400 line-through">
                        ${product.price}
                      </span>
                    )}
                  </div>

                  {/* Add Button */}
                  <button className="bg-[#1F4D3A] hover:bg-[#16382A] text-[#FBF8F2] text-xs font-medium px-4 py-2 rounded-full transition-all duration-200 hover:shadow-[0_6px_16px_-4px_rgba(31,77,58,0.5)] active:scale-95">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default TopProductsToday;