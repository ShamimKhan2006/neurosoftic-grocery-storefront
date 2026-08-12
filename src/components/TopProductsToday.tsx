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
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Hilsha Fish",
    category: "Fish",
    salePrice: 850,
    price: 950,
    unit: "1 kg",
    image: "/images/hilsha.jpg",
    rating: 4.9,
  },
  {
    id: "3",
    name: "Basmati Rice",
    category: "Grocery",
    salePrice: 120,
    price: 140,
    unit: "5 kg",
    image: "/images/rice.jpg",
    rating: 4.7,
  },
];

const TopProductsToday = () => {
  return (
    <section className="py-14 bg-[#FAF6F0]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <Flame className="w-6 h-6 text-orange-500" />
          <div>
            <p className="text-xs tracking-widest uppercase text-green-600 font-semibold">
              Today&apos;s Pick
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900">
              Top 3 Products
            </h2>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {topProducts.map((product, index) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-3xl border border-stone-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Rank badge */}
              <div className="absolute top-4 left-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-stone-900 text-white text-sm font-bold shadow-md">
                {index + 1}
              </div>

              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Details */}
              <div className="p-5">
                <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-medium">
                  {product.category}
                </span>

                <h3 className="font-bold text-lg text-stone-900 mt-3">
                  {product.name}
                </h3>

                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-500 text-sm">⭐</span>
                  <span className="text-sm text-stone-600">{product.rating}</span>
                  <span className="text-xs text-stone-400 ml-1">
                    · {product.unit}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-stone-900">
                      ৳{product.salePrice}
                    </span>
                    {product.salePrice < product.price && (
                      <span className="text-sm text-stone-400 line-through">
                        ৳{product.price}
                      </span>
                    )}
                  </div>

                  <button className="bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-4 py-2 rounded-full transition-colors">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopProductsToday;