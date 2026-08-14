import productsData from "../../../data/product.json";
import Link from "next/link";
import { notFound } from "next/navigation";

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

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailsPage({
  params,
}: Props) {
  const { slug } = await params;

  const products = productsData as Product[];

  const product = products.find(
    (item) => item.slug === slug
  );

  // Product না পাওয়া গেলে 404
  if (!product) {
    notFound();
  }

  return (
    <section className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-6xl mx-auto px-4">

        {/* Back */}
        <Link
          href="/products"
          className="inline-block mb-6 text-green-600 hover:text-green-700 font-medium"
        >
          ← Back to Products
        </Link>

        {/* Product Details Card */}
        <div className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm">

          <div className="grid md:grid-cols-2">

            {/* Product Image */}
            <div className="bg-stone-100 h-[400px] md:h-[600px]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Information */}
            <div className="p-6 md:p-10 flex flex-col justify-center">

              {/* Category */}
              <span className="w-fit bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                {product.category}
              </span>

              {/* Product Name */}
              <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mt-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-4">
                <span className="text-yellow-500">
                  ⭐
                </span>

                <span className="font-semibold">
                  {product.rating}
                </span>

                <span className="text-stone-400">
                  ·
                </span>

                <span className="text-stone-500">
                  {product.unit}
                </span>
              </div>

              {/* Description */}
              <p className="text-stone-600 leading-relaxed mt-6">
                {product.description}
              </p>

              {/* Unit */}
              <div className="mt-6">
                <p className="text-sm text-stone-500">
                  Unit
                </p>

                <p className="font-semibold text-stone-900 mt-1">
                  {product.unit}
                </p>
              </div>

              {/* Stock */}
              <div className="mt-4">
                <p className="text-sm text-stone-500">
                  Stock
                </p>

                <p className="font-semibold text-green-600 mt-1">
                  {product.stock} available
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-5">

                {product.isFresh && (
                  <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                    ✓ Fresh Product
                  </span>
                )}

                {product.isOrganic && (
                  <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                    ✓ Organic Product
                  </span>
                )}

              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mt-7">

                <span className="text-3xl font-bold text-stone-900">
                  ${product.salePrice}
                </span>

                {product.salePrice < product.price && (
                  <span className="text-lg text-stone-400 line-through">
                    ${product.price}
                  </span>
                )}

              </div>

              {/* Add To Cart */}
              <button
                disabled={product.stock <= 0}
                className="mt-7 w-full bg-green-600 hover:bg-green-700 disabled:bg-stone-300 text-white py-3.5 rounded-xl font-semibold transition-colors"
              >
                {product.stock > 0
                  ? "Add to Cart"
                  : "Out of Stock"}
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}