"use client";

import Link from "next/link";
import { Leaf, ArrowRight, Truck, ShieldCheck, Clock } from "lucide-react";
import { useEffect, useState } from "react";

const SLIDES = [
  {
    badge: "Up to 30% OFF",
    title: (
      <>
        Fresh Organic Food
        <br />
        Delivered to{" "}
        <span className="relative inline-block text-[#D9B968]">
          Your Doorstep
          <svg
            className="absolute -bottom-1 left-0 w-full"
            viewBox="0 0 200 8"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M2 5.5C40 1.5 160 1.5 198 5.5"
              stroke="#C9A24B"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </span>
      </>
    ),
    desc: "Farm-picked vegetables, dairy, and pantry staples — ordered before 6pm, delivered in 2 hours across Dhaka.",
    cta: "Shop Fresh Now",
    tag: "Picked this morning",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=1200&auto=format&fit=crop",
  },
  {
    badge: "New Arrivals",
    title: (
      <>
        Farm Fresh Dairy
        <br />
        Straight From the{" "}
        <span className="relative inline-block text-[#D9B968]">
          Source
          <svg
            className="absolute -bottom-1 left-0 w-full"
            viewBox="0 0 200 8"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M2 5.5C40 1.5 160 1.5 198 5.5"
              stroke="#C9A24B"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </span>
      </>
    ),
    desc: "Cheese, milk, and yogurt sourced from local dairy farms — cold-chain delivery guaranteed fresh.",
    cta: "Explore Dairy",
    tag: "Chilled & fresh",
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1200&auto=format&fit=crop",
  },
  {
    badge: "Limited Time",
    title: (
      <>
        Seasonal Fruits
        <br />
        Bursting With{" "}
        <span className="relative inline-block text-[#D9B968]">
          Flavor
          <svg
            className="absolute -bottom-1 left-0 w-full"
            viewBox="0 0 200 8"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M2 5.5C40 1.5 160 1.5 198 5.5"
              stroke="#C9A24B"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </span>
      </>
    ),
    desc: "Hand-picked seasonal fruits at peak ripeness, delivered same-day so nothing sits in a warehouse.",
    cta: "Shop Fruits",
    tag: "Hand-picked daily",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=1200&auto=format&fit=crop&sat=-30",
  },
];

const FEATURES = [
  { icon: Truck, label: "Free delivery over ৳999" },
  { icon: Clock, label: "2-hour delivery in Dhaka" },
  { icon: ShieldCheck, label: "100% freshness guarantee" },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[active];

  return (
    <section
      className="relative overflow-hidden border-b border-[#C9A24B]/15 py-20 md:py-28"
      style={{
        background:
          "radial-gradient(circle at 15% 20%, #163A2E 0%, #0B211A 55%, #081410 100%)",
      }}
    >
      {/* ambient grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* drifting gold glow */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full opacity-20 blur-3xl animate-[float_9s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle, #C9A24B, transparent 70%)" }}
      />

      <div className="max-w-[1200px] mx-auto px-7 relative z-10">
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          {/* Text side */}
          <div key={active} className="animate-[fadeUp_0.7s_cubic-bezier(0.16,1,0.3,1)_both]">
            <span className="inline-flex items-center gap-2 bg-[#C9A24B]/15 border border-[#C9A24B]/50 text-[#C9A24B] font-bold text-sm px-3.5 py-1.5 rounded-full mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A24B] animate-pulse" />
              {slide.badge}
            </span>

            <h1 className="font-serif text-[2.2rem] md:text-[3.6rem] leading-[1.08] text-[#F5EFE2] mb-5 tracking-tight">
              {slide.title}
            </h1>

            <p className="text-[#F5EFE2]/70 max-w-[42ch] mb-8 leading-relaxed text-[1.05rem]">
              {slide.desc}
            </p>

            <Link
              href="#showcase"
              className="group inline-flex items-center gap-2.5 font-bold text-sm text-[#081A15] px-7 py-3.5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(201,162,75,0.35)]"
              style={{
                background: "linear-gradient(135deg, #DFC077, #C9A24B, #A67F32)",
                boxShadow: "0 8px 20px rgba(201,162,75,0.25)",
              }}
            >
              {slide.cta}
              <ArrowRight
                size={16}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            {/* Slide dots */}
            <div className="flex items-center gap-2 mt-9">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-400 ${
                    idx === active
                      ? "w-8 bg-[#C9A24B]"
                      : "w-2.5 bg-[#F5EFE2]/25 hover:bg-[#F5EFE2]/45"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Image side */}
          <div className="relative aspect-[4/3.2] rounded-2xl overflow-hidden bg-[#163A2E] ring-1 ring-[#C9A24B]/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
            {SLIDES.map((s, idx) => (
              <img
                key={idx}
                src={s.image}
                alt={s.tag}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-out ${
                  idx === active
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-110"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-[#081A15]/70 via-[#081A15]/10 to-transparent" />
            <span
              key={active}
              className="absolute bottom-4 left-4 bg-[#F5EFE2] text-[#081A15] font-bold text-sm px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-lg animate-[fadeUp_0.6s_ease-out_both]"
            >
              <Leaf size={14} className="text-[#3F6B4E]" /> {slide.tag}
            </span>

            {/* Prev / Next arrows */}
            <button
              onClick={() => setActive((active - 1 + SLIDES.length) % SLIDES.length)}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-[#F5EFE2] backdrop-blur-md transition-all hover:bg-black/50"
            >
              ‹
            </button>
            <button
              onClick={() => setActive((active + 1) % SLIDES.length)}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-[#F5EFE2] backdrop-blur-md transition-all hover:bg-black/50"
            >
              ›
            </button>
          </div>
        </div>

        {/* Featured strip */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#C9A24B]/15 pt-8">
          {FEATURES.map(({ icon: Icon, label }, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-[#C9A24B]/10 px-4 py-3.5 transition-all duration-300 hover:border-[#C9A24B]/30 hover:bg-white/[0.06]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C9A24B]/15 text-[#C9A24B]">
                <Icon size={16} strokeWidth={2.5} />
              </span>
              <span className="text-sm font-medium text-[#F5EFE2]/85">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 25px); }
        }
        @keyframes drift {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.08) rotate(2deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </section>
  );
}