


import Link from "next/link";
import { Leaf, ArrowRight } from "lucide-react";

export default function Hero() {
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

      <div className="max-w-[1200px] mx-auto px-7 grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center relative z-10">
        <div className="animate-[fadeUp_0.8s_cubic-bezier(0.16,1,0.3,1)_both]">
          <span className="inline-flex items-center gap-2 bg-[#C9A24B]/15 border border-[#C9A24B]/50 text-[#C9A24B] font-bold text-sm px-3.5 py-1.5 rounded-full mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A24B] animate-pulse" />
            Up to 30% OFF
          </span>

          <h1 className="font-serif text-[2.2rem] md:text-[3.6rem] leading-[1.08] text-[#F5EFE2] mb-5 tracking-tight">
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
          </h1>

          <p className="text-[#F5EFE2]/70 max-w-[42ch] mb-8 leading-relaxed text-[1.05rem]">
            Farm-picked vegetables, dairy, and pantry staples — ordered before
            6pm, delivered in 2 hours across Dhaka.
          </p>

          <Link
            href="#showcase"
            className="group inline-flex items-center gap-2.5 font-bold text-sm text-[#081A15] px-7 py-3.5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(201,162,75,0.35)]"
            style={{
              background: "linear-gradient(135deg, #DFC077, #C9A24B, #A67F32)",
              boxShadow: "0 8px 20px rgba(201,162,75,0.25)",
            }}
          >
            Shop Fresh Now
            <ArrowRight
              size={16}
              strokeWidth={2.5}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="relative aspect-[4/3.2] rounded-2xl overflow-hidden bg-[#163A2E] animate-[fadeUp_0.9s_cubic-bezier(0.16,1,0.3,1)_0.15s_both] ring-1 ring-[#C9A24B]/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
          <div
            className="absolute inset-0 animate-[drift_14s_ease-in-out_infinite]"
            style={{
              background:
                "radial-gradient(circle at 25% 25%, #C9A24B 0%, transparent 40%), radial-gradient(circle at 75% 40%, #8A3A2C 0%, transparent 45%), radial-gradient(circle at 45% 75%, #9C7A3F 0%, transparent 40%), linear-gradient(160deg,#163A2E,#081A15)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081A15]/60 via-transparent to-transparent" />
          <span className="absolute bottom-4 left-4 bg-[#F5EFE2] text-[#081A15] font-bold text-sm px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-lg">
            <Leaf size={14} className="text-[#3F6B4E]" /> Picked this morning
          </span>
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