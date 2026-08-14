

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const promos = [
  {
    title: ["100% Pure Organic", "Oils & Ghee"],
    from: "#5C2A3E",
    to: "#25151f",
    ring: "#7A3B52",
  },
  {
    title: ["Fresh Farm Eggs &", "Milk Everyday"],
    from: "#1F5C3E",
    to: "#0B1F16",
    ring: "#2E7A50",
  },
];

const PromoSection = () => {
  return (
    <section className="bg-[#F5EFE2] py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-5 md:grid-cols-2">
        {promos.map((promo) => (
          <div
            key={promo.title.join(" ")}
            className="group relative flex min-h-[220px] flex-col justify-center overflow-hidden rounded-2xl px-8 transition-transform duration-300 hover:-translate-y-1"
            style={{
              background: `linear-gradient(120deg, ${promo.from}, ${promo.to})`,
              border: `1px solid ${promo.ring}55`,
              boxShadow: `0 20px 45px -20px ${promo.ring}66`,
            }}
          >
            {/* signature gold corner glow */}
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-25 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
              style={{ background: "radial-gradient(circle, #C9A24B, transparent 70%)" }}
            />

            <h2 className="relative z-10 max-w-md font-serif text-2xl font-bold leading-tight text-[#F5EFE2] md:text-3xl">
              {promo.title[0]}
              <br />
              {promo.title[1]}
            </h2>

            <Link
              href="/products"
              className="relative z-10 mt-5 flex w-fit items-center gap-2 border-b-2 border-[#C9A24B] pb-1 text-sm font-semibold text-[#D9B968] transition-all duration-300 group-hover:gap-3"
            >
              Shop now
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromoSection;