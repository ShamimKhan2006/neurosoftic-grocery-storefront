"use client";
import { useState } from "react";
import { X } from "lucide-react";
import productsData from "../../../data/product.json";

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

const Products = () => {
  const products = productsData as Product[];
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section className="py-10 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4">

        <div className="text-center mb-8">
          <p className="text-green-600 font-medium">Fresh & Healthy</p>
          <h2 className="text-3xl font-bold text-stone-900">Featured Products</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden"
            >
              {/* IMAGE - only this opens the modal */}
              <div
                role="button"
                tabIndex={0}
                className="relative aspect-square overflow-hidden cursor-pointer"
                onClick={() => {
                  console.log("image clicked", product.name);
                  setSelectedProduct(product);
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover pointer-events-none hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4">
                <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                  {product.category}
                </span>

                <h3 className="font-semibold mt-2">{product.name}</h3>
                <p className="text-sm text-stone-500">{product.unit}</p>

                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold">৳{product.salePrice}</span>
                  <button className="bg-green-600 text-white px-3 py-2 rounded-full text-xs">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2">
              <div className="h-[350px] md:h-[500px]">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-center">
                <span className="w-fit bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                  {selectedProduct.category}
                </span>

                <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mt-3">
                  {selectedProduct.name}
                </h2>

                <div className="flex items-center gap-2 mt-3">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-medium">{selectedProduct.rating}</span>
                </div>

                <p className="text-stone-500 text-sm leading-relaxed mt-5">
                  {selectedProduct.description}
                </p>

                <p className="text-sm text-stone-500 mt-4">
                  <span className="font-medium text-stone-700">Unit:</span>{" "}
                  {selectedProduct.unit}
                </p>

                <p className="text-sm mt-2">
                  <span className="font-medium text-stone-700">Stock:</span>{" "}
                  <span className="text-green-600">{selectedProduct.stock} available</span>
                </p>

                {selectedProduct.isFresh && (
                  <p className="text-sm text-green-600 mt-2">✓ Fresh Product</p>
                )}

                {selectedProduct.isOrganic && (
                  <p className="text-sm text-green-600 mt-2">✓ Organic Product</p>
                )}

                <div className="flex items-center gap-3 mt-6">
                  <span className="text-3xl font-bold text-stone-900">
                    ৳{selectedProduct.salePrice}
                  </span>
                  {selectedProduct.salePrice < selectedProduct.price && (
                    <span className="text-lg text-stone-400 line-through">
                      ৳{selectedProduct.price}
                    </span>
                  )}
                </div>

                <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;