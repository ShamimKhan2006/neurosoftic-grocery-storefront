
import Link from "next/link";
import { Leaf } from "lucide-react";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Delivery Info", href: "/delivery" },
    ],
  },
  {
    title: "Shop",
    links: [
      { label: "Fruits & Vegetables", href: "/category/fruits-vegetables" },
      { label: "Dairy & Eggs", href: "/category/dairy-eggs" },
      { label: "Bakery", href: "/category/bakery" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "16-247 Helpline", href: "tel:16247" },
      { label: "Track Order", href: "/dashboard" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const paymentMethods = ["bKash", "Nagad", "Visa", "COD"];

export default function Footer() {
  return (
    <footer className="relative bg-[#081A15] text-[#F5EFE2]/70 pt-16 pb-6 overflow-hidden">
      {/* hairline top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #C9A24B, transparent)",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-7 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 pb-10">
          <div>
            <div className="flex items-center gap-2 font-serif text-[#F5EFE2] text-xl mb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/40">
                <Leaf size={13} className="text-[#C9A24B]" />
              </span>
              FreshCart
            </div>
            <p className="text-sm max-w-[32ch] leading-relaxed">
              Fresh groceries from local farms, delivered to your doorstep
              across Dhaka.
            </p>
            <div className="flex gap-2.5 mt-4 flex-wrap">
              {paymentMethods.map((m) => (
                <span
                  key={m}
                  className="bg-[#C9A24B]/10 border border-[#C9A24B]/25 text-[#C9A24B] rounded-md px-2.5 py-1 text-xs font-semibold transition-colors hover:bg-[#C9A24B]/20"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[#F5EFE2] text-sm font-bold mb-4 tracking-wide">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label} className="text-sm">
                    <Link
                      href={link.href}
                      className="relative inline-block transition-colors hover:text-[#D9B968] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-[#D9B968] after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-between gap-2.5 text-xs border-t border-[#C9A24B]/10 pt-5">
          <span>© {new Date().getFullYear()} FreshCart. All rights reserved.</span>
          <span className="text-[#C9A24B]/70">Dhaka · Chattogram · Sylhet</span>
        </div>
      </div>
    </footer>
  );
}