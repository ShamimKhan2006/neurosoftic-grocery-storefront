"use client";

import React from "react";
import { Leaf, Plus } from "lucide-react";
import productsData from  '../../data/product.json';

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
  Vegetables: "bg-green-50 text-green-700 border-green-200",
  Fruits: "bg-orange-50 text-orange-700 border-orange-200",
  Dairy: "bg-blue-50 text-blue-700 border-blue-200",
  Bakery: "bg-amber-50 text-amber-800 border-amber-200",
};

const ProductsPage: React.FC = () => {
  const products = productsData as Product[];

  const handleAdd = (product: Product) => {
    console.log("Added:", product);
  };

  return (
    <section className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-6xl mx-auto px-4">

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product) => {
            const categoryStyle =
              CATEGORY_COLORS[product.category] ||
              "bg-stone-50 text-stone-700 border-stone-200";

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-square bg-stone-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Organic */}
                  {product.isOrganic && (
                    <span className="absolute top-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-green-700 shadow-sm">
                      <Leaf className="w-3.5 h-3.5" />
                      Organic
                    </span>
                  )}

                  {/* Fresh */}
                  {product.isFresh && (
                    <span className="absolute top-3 right-3 bg-green-600 text-white px-2.5 py-1 rounded-full text-xs font-medium">
                      Fresh
                    </span>
                  )}

                  {/* Low Stock */}
                  {product.stock <= 15 && product.stock > 0 && (
                    <span className="absolute bottom-3 left-3 bg-red-50 text-red-600 px-2.5 py-1 rounded-full text-xs font-medium">
                      Only {product.stock} left
                    </span>
                  )}

                  {/* Out Of Stock */}
                  {product.stock === 0 && (
                    <span className="absolute bottom-3 left-3 bg-red-600 text-white px-2.5 py-1 rounded-full text-xs font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">

                  {/* Category */}
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full border text-xs font-medium mb-2 ${categoryStyle}`}
                  >
                    {product.category}
                  </span>

                  {/* Name */}
                  <h3 className="text-base font-semibold text-stone-900 leading-snug mb-1">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-yellow-500 text-sm">
                      ★
                    </span>

                    <span className="text-sm font-medium text-stone-700">
                      {product.rating}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 mb-3">
                    {product.description}
                  </p>

                  {/* Unit */}
                  <p className="text-xs text-stone-400 mb-3">
                    {product.unit}
                  </p>

                  {/* Price + Add */}
                  <div className="flex items-center justify-between gap-2">

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-stone-900">
                        ৳{product.salePrice}
                      </span>

                      {product.salePrice < product.price && (
                        <span className="text-xs text-stone-400 line-through">
                          ৳{product.price}
                        </span>
                      )}
                    </div>

                    {/* Add Button */}
                    <button
                      type="button"
                      disabled={product.stock === 0}
                      onClick={() => handleAdd(product)}
                      className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 disabled:bg-stone-300 disabled:cursor-not-allowed text-white text-xs font-medium px-3.5 py-2 rounded-full transition-colors"
                    >
                      <Plus className="w-4 h-4" />

                      {product.stock === 0
                        ? "Out"
                        : "Add"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProductsPage;