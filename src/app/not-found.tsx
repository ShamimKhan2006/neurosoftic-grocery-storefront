import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#FBF8F2] px-4">
      <div className="mx-auto max-w-md text-center">
        {/* Illustration */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#1F4D3A]/10">
          <span className="text-5xl">🥬</span>
        </div>

        {/* 404 */}
        <p className="text-7xl font-black tracking-tight text-[#1F4D3A]">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold text-[#26302A]">
          Oops! This shelf is empty.
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#26302A]/65">
          The page youre looking for doesnt exist or may have been moved.
          Lets get you back to fresh groceries.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#1F4D3A] px-6 py-3 text-sm font-semibold text-[#FBF8F2] transition-all hover:-translate-y-0.5 hover:bg-[#16382A] hover:shadow-lg"
        >
          <span>🌿</span>
          Back to Home
        </Link>

        {/* Small text */}
        <p className="mt-5 text-xs text-[#26302A]/45">
          Fresh groceries are just one click away.
        </p>
      </div>
    </main>
  );
}