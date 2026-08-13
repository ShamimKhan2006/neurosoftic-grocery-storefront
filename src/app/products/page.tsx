
"use client";

import React from "react";
import { Leaf, Plus } from "lucide-react";
import productsData from '../../data/product.json';
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  salePrice: number;
  unit: string;
  stock: number;
  rating: number;
  image: string;
  isFresh: boolean;
  isOrganic: boolean;
  description: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Vegetables: "bg-[#A8D95E]/15 text-[#1F4D3A] border-[#A8D95E]/40",
  Fruits: "bg-[#E4572E]/10 text-[#E4572E] border-[#E4572E]/25",
  Dairy: "bg-[#1F4D3A]/8 text-[#1F4D3A] border-[#1F4D3A]/20",
  Bakery: "bg-amber-50 text-amber-800 border-amber-200",
};

const ProductsPage: React.FC = () => {
  const products = productsData as Product[];

  const handleAdd = (product: Product) => {
    console.log("Added:", product);
  };

  return (
    <section className="min-h-screen bg-[#FBF8F2] py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product, i) => {
            const categoryStyle =
              CATEGORY_COLORS[product.category] ||
              "bg-stone-50 text-stone-700 border-stone-200";

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-[#E7E1D3] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(31,77,58,0.25)] hover:border-[#1F4D3A]/20 animate-[fadeUp_0.5s_cubic-bezier(0.16,1,0.3,1)_both]"
                style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-square bg-stone-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {product.isOrganic && (
                    <span className="absolute top-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-[#1F4D3A] shadow-sm">
                      <Leaf className="w-3.5 h-3.5 text-[#A8D95E]" />
                      Organic
                    </span>
                  )}

                  {product.isFresh && (
                    <span className="absolute top-3 right-3 bg-[#1F4D3A] text-[#A8D95E] px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm">
                      Fresh
                    </span>
                  )}

                  {product.stock <= 15 && product.stock > 0 && (
                    <span className="absolute bottom-3 left-3 bg-[#E4572E]/10 text-[#E4572E] px-2.5 py-1 rounded-full text-xs font-medium">
                      Only {product.stock} left
                    </span>
                  )}

                  {product.stock === 0 && (
                    <span className="absolute bottom-3 left-3 bg-[#E4572E] text-white px-2.5 py-1 rounded-full text-xs font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full border text-xs font-medium mb-2 ${categoryStyle}`}
                  >
                    {product.category}
                  </span>

                  <h3 className="text-base font-semibold text-[#26302A] leading-snug mb-1">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-[#E4572E] text-sm">★</span>
                    <span className="text-sm font-medium text-[#26302A]/80">
                      {product.rating}
                    </span>
                  </div>

                  <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 mb-3">
                    {product.description}
                  </p>

                  <p className="text-xs text-stone-400 mb-3">{product.unit}</p>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-[#26302A]">
                        ৳{product.salePrice}
                      </span>
                      {product.salePrice < product.price && (
                        <span className="text-xs text-stone-400 line-through">
                          ৳{product.price}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      disabled={product.stock === 0}
                      onClick={() => handleAdd(product)}
                      className="flex items-center gap-1.5 bg-[#1F4D3A] hover:bg-[#16382A] disabled:bg-stone-300 disabled:cursor-not-allowed text-[#FBF8F2] text-xs font-medium px-3.5 py-2 rounded-full transition-all duration-200 hover:shadow-[0_6px_16px_-4px_rgba(31,77,58,0.5)] active:scale-95"
                    >
                      <Plus className="w-4 h-4 text-[#A8D95E]" />
                      {product.stock === 0 ? "Out" : "Add"}
                    </button>
                  </div>
                </div>
              </div>
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
};

export default ProductsPage;