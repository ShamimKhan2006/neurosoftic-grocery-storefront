import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b border-[#C9A24B]/15 py-16 md:py-20"
      style={{
        background:
          "radial-gradient(circle at 15% 20%, #163A2E 0%, #081A15 55%, #081410 100%)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-7 grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center relative z-10">
        <div>
          <span className="inline-block bg-[#C9A24B]/15 border border-[#C9A24B]/50 text-[#C9A24B] font-bold text-sm px-3.5 py-1.5 rounded-full mb-5">
            Up to 30% OFF
          </span>

          <h1 className="font-serif text-[2.2rem] md:text-[3.4rem] leading-[1.1] text-[#F5EFE2] mb-5">
            Fresh Organic Food
            <br />
            Delivered to{" "}
            <em className="italic text-[#C9A24B] not-italic font-medium">
              Your Doorstep
            </em>
          </h1>

          <p className="text-[#F5EFE2]/75 max-w-[42ch] mb-7 leading-relaxed">
            Farm-picked vegetables, dairy, and pantry staples — ordered before
            6pm, delivered in 2 hours across Dhaka.
          </p>

          <Link
            href="#showcase"
            className="inline-block font-bold text-sm text-[#081A15] px-7 py-3.5 rounded-lg transition-all hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #C9A24B, #A67F32)",
              boxShadow: "0 8px 20px rgba(201,162,75,0.25)",
            }}
          >
            Shop Fresh Now
          </Link>
        </div>

        <div className="relative aspect-[4/3.2] rounded-2xl overflow-hidden bg-[#163A2E]">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 25% 25%, #C9A24B 0%, transparent 40%), radial-gradient(circle at 75% 40%, #8A3A2C 0%, transparent 45%), radial-gradient(circle at 45% 75%, #9C7A3F 0%, transparent 40%), linear-gradient(160deg,#163A2E,#081A15)",
            }}
          />
          <span className="absolute bottom-4 left-4 bg-[#F5EFE2] text-[#081A15] font-bold text-sm px-3.5 py-2 rounded-lg flex items-center gap-1.5">
            <Leaf size={14} /> Picked this morning
          </span>
        </div>
      </div>
    </section>
  );
}