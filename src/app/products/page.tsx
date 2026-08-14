"use client";

import React, { useMemo, useState } from "react";
import { Leaf, Plus, Star, Check, Search } from "lucide-react";
import productsData from "../../data/product.json";
import Link from "next/link";

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
  Vegetables:
    "bg-[#A8D95E]/15 text-[#1F4D3A] border-[#A8D95E]/40",

  Fruits:
    "bg-[#E4572E]/10 text-[#E4572E] border-[#E4572E]/25",

  Dairy:
    "bg-[#1F4D3A]/8 text-[#1F4D3A] border-[#1F4D3A]/20",

  Bakery:
    "bg-amber-50 text-amber-800 border-amber-200",
};

const ProductsHome: React.FC = () => {
  const allProducts = productsData as Product[];

  const [addedId, setAddedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // =========================
  // Categories
  // =========================
  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(allProducts.map((product) => product.category))
    );

    return ["All", ...unique];
  }, [allProducts]);

  // =========================
  // Filter Products
  // =========================
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) =>
        activeCategory === "All"
          ? true
          : product.category === activeCategory
      )
      .filter((product) =>
        query.trim()
          ? product.name
              .toLowerCase()
              .includes(query.trim().toLowerCase())
          : true
      )
      .slice(0, 15);
  }, [allProducts, activeCategory, query]);

  // =========================
  // Add To Cart
const handleAdd = (product: Product) => {
  try {
    const storedCart = localStorage.getItem("cart");

    const cart = storedCart ? JSON.parse(storedCart) : [];

    const existingProduct = cart.find(
      (item: Product & { quantity: number }) => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Navbar কে instantly update করার জন্য
    window.dispatchEvent(new Event("cartUpdated"));

    setAddedId(product.id);

    setTimeout(() => {
      setAddedId(null);
    }, 1200);

    console.log("Cart:", cart);
  } catch (error) {
    console.error("Add to cart error:", error);
  }
};

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#FBF8F2] to-[#F3EFE3] py-12">
      <div className="max-w-6xl mx-auto px-4">

        {/* =========================
            Search
        ========================= */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-full border border-[#E7E1D3] bg-white pl-11 pr-4 py-2.5 text-sm text-[#26302A] outline-none transition-colors focus:border-[#1F4D3A]/40 focus:shadow-[0_0_0_4px_rgba(31,77,58,0.08)]"
          />
        </div>

        {/* =========================
            Category Filter
        ========================= */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 ${
                activeCategory === category
                  ? "bg-[#1F4D3A] text-[#FBF8F2] border-[#1F4D3A] shadow-[0_6px_14px_-4px_rgba(31,77,58,0.4)]"
                  : "bg-white text-[#26302A]/70 border-[#E7E1D3] hover:border-[#1F4D3A]/30 hover:text-[#1F4D3A]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* =========================
            Empty State
        ========================= */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-stone-400 text-sm">
            No products found.
          </div>
        ) : (
          /* =========================
             Product Grid
          ========================= */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredProducts.map((product, index) => {
              const categoryStyle =
                CATEGORY_COLORS[product.category] ||
                "bg-stone-50 text-stone-700 border-stone-200";

              const isAdded = addedId === product.id;

              const price = product.price ?? 0;
              const salePrice = product.salePrice ?? price;
              const rating = product.rating ?? 0;
              const stock = product.stock ?? 0;
              const unit = product.unit ?? "";
              const description = product.description ?? "";
              const image = product.image || "/placeholder.png";

              // Discount
              const discount =
                salePrice < price && price > 0
                  ? Math.round(
                      ((price - salePrice) / price) * 100
                    )
                  : 0;

              return (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-3xl border border-[#EFE9DA] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(31,77,58,0.35)] animate-[fadeUp_0.5s_cubic-bezier(0.16,1,0.3,1)_both]"
                  style={{
                    animationDelay: `${Math.min(index, 8) * 60}ms`,
                  }}
                >
                  {/* Hover Ring */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ring-1 ring-inset ring-[#A8D95E]/40" />

                  {/* =========================
                      IMAGE
                      Click → Product Details
                  ========================= */}
                  <div className="relative aspect-square bg-gradient-to-br from-stone-100 to-stone-50 overflow-hidden">

                    <Link
                      href={`/products/${product.slug}`}
                      className="block w-full h-full"
                    >
                      <img
                        src={image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.12]"
                      />
                    </Link>

                    {/* Image Overlay */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/25 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Discount */}
                    {discount > 0 && (
                      <span className="absolute top-3 left-3 bg-[#E4572E] text-white px-2.5 py-1 rounded-full text-[11px] font-bold shadow-lg shadow-[#E4572E]/30">
                        -{discount}%
                      </span>
                    )}

                    {/* Organic */}
                    {product.isOrganic && (
                      <span className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#1F4D3A] shadow-md">
                        <Leaf className="w-3.5 h-3.5 text-[#4C9A2A]" />
                        Organic
                      </span>
                    )}

                    {/* Fresh */}
                    {product.isFresh && (
                      <span className="absolute bottom-3 left-3 bg-[#1F4D3A]/95 backdrop-blur-md text-[#D4F98A] px-2.5 py-1 rounded-full text-[11px] font-bold shadow-md">
                        Fresh
                      </span>
                    )}

                    {/* Low Stock */}
                    {stock <= 15 && stock > 0 && (
                      <span className="absolute bottom-3 right-3 bg-amber-50/95 backdrop-blur-md text-amber-700 px-2.5 py-1 rounded-full text-[11px] font-semibold shadow-md">
                        {stock} left
                      </span>
                    )}

                    {/* Out Of Stock */}
                    {stock === 0 && (
                      <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="bg-stone-800 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide">
                          OUT OF STOCK
                        </span>
                      </div>
                    )}
                  </div>

                  {/* =========================
                      PRODUCT INFO
                  ========================= */}
                  <div className="p-4">

                    {/* Category + Rating */}
                    <div className="flex items-center justify-between mb-2">

                      <span
                        className={`inline-block px-2.5 py-1 rounded-full border text-[11px] font-semibold ${categoryStyle}`}
                      >
                        {product.category}
                      </span>

                      <div className="flex items-center gap-1 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200/70 px-2 py-0.5 rounded-full">
                        <Star className="w-3.5 h-3.5 fill-[#F5B700] text-[#F5B700]" />

                        <span className="text-xs font-bold text-amber-700">
                          {rating.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-base font-bold text-[#1A231D] leading-snug mb-1 tracking-tight">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 mb-1">
                      {description}
                    </p>

                    {/* Unit */}
                    <p className="text-[11px] text-stone-400 mb-3 font-medium">
                      {unit}
                    </p>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-[#E7E1D3] to-transparent mb-3" />

                    {/* Price + Add */}
                    <div className="flex items-center justify-between gap-2">

                      {/* Price */}
                      <div className="flex flex-col">

                        <span className="text-lg font-extrabold text-[#1F4D3A] tracking-tight">
                          ${salePrice.toFixed(2)}
                        </span>

                        {salePrice < price && (
                          <span className="text-xs text-stone-400 line-through -mt-0.5">
                            ${price.toFixed(2)}
                          </span>
                        )}

                      </div>

                      {/* Add Button */}
                      <button
                        type="button"
                        disabled={stock === 0}
                        onClick={() => handleAdd(product)}
                        className={`relative flex items-center gap-1.5 overflow-hidden text-xs font-semibold px-4 py-2.5 rounded-full transition-all duration-300 active:scale-90 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed ${
                          isAdded
                            ? "bg-[#4C9A2A] text-white"
                            : "bg-[#1F4D3A] text-[#FBF8F2] hover:bg-[#16382A] hover:shadow-[0_10px_24px_-6px_rgba(31,77,58,0.55)] hover:-translate-y-0.5"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            Added
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 text-[#A8D95E]" />
                            {stock === 0 ? "Out" : "Add"}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* =========================
          Animation
      ========================= */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
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

export default ProductsHome;