import Link from "next/link";
import { Leaf, Mail, Phone, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Delivery Info", href: "/delivery" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Shop",
    links: [
      { label: "Fruits & Vegetables", href: "/category/fruits-vegetables" },
      { label: "Dairy & Eggs", href: "/category/dairy-eggs" },
      { label: "Bakery", href: "/category/bakery" },
      { label: "All Products", href: "/products" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "16-247 Helpline", href: "tel:16247" },
      { label: "Track Order", href: "/dashboard" },
      { label: "Contact", href: "/contact" },
      { label: "FAQs", href: "/faq" },
    ],
  },
];

const paymentMethods = ["bKash", "Nagad", "Visa", "Mastercard", "COD"];

const socials = [
  { icon: FaFacebookF, href: "#" },
  { icon: FaInstagram, href: "#" },
  { icon: FaTwitter, href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#081A15] text-[#F5EFE2]/70 pt-24 pb-8 overflow-hidden">
      {/* hairline top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, #C9A24B, transparent)",
        }}
      />

      {/* ambient glows */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full opacity-[0.08] blur-3xl"
        style={{ background: "radial-gradient(circle, #C9A24B, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full opacity-[0.06] blur-3xl"
        style={{ background: "radial-gradient(circle, #3F6B4E, transparent 70%)" }}
      />

      <div className="max-w-[1320px] mx-auto px-8 relative z-10">
        {/* Newsletter strip */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-[#C9A24B]/15 bg-white/[0.03] px-8 py-8 mb-16 backdrop-blur-sm">
          <div>
            <h3 className="font-serif text-2xl text-[#F5EFE2] mb-1.5">
              Join the Harvest Club
            </h3>
            <p className="text-sm text-[#F5EFE2]/60">
              Get 10% off your first order and weekly fresh deals in your inbox.
            </p>
          </div>
          <form className="flex w-full max-w-md gap-2.5">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-[#C9A24B]/25 bg-white/5 px-4 py-3 text-sm text-[#F5EFE2] placeholder:text-[#F5EFE2]/35 outline-none transition-colors focus:border-[#C9A24B]/60"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg px-6 py-3 text-sm font-bold text-[#081A15] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(201,162,75,0.3)]"
              style={{
                background: "linear-gradient(135deg, #DFC077, #C9A24B, #A67F32)",
              }}
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 pb-14">
          <div>
            <div className="flex items-center gap-2.5 font-serif text-[#F5EFE2] text-2xl mb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/40">
                <Leaf size={16} className="text-[#C9A24B]" />
              </span>
              Harvestly
            </div>
            <p className="text-sm max-w-[34ch] leading-relaxed mb-6">
              Fresh groceries from local farms, delivered to your doorstep
              across Dhaka — organic, seasonal, and always same-day fresh.
            </p>

            <ul className="space-y-3 mb-6 text-sm">
              <li className="flex items-center gap-2.5">
                <MapPin size={15} className="text-[#C9A24B] shrink-0" />
                House 12, Road 5, Dhanmondi, Dhaka
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#C9A24B] shrink-0" />
                +880 1600-000000
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#C9A24B] shrink-0" />
                hello@harvestly.com
              </li>
            </ul>

            <div className="flex gap-2.5">
              {socials.map(({ icon: Icon, href }, idx) => (
                <Link
                  key={idx}
                  href={href}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C9A24B]/25 text-[#C9A24B] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A24B] hover:bg-[#C9A24B]/15"
                >
                  <Icon size={15} />
                </Link>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[#F5EFE2] text-sm font-bold mb-5 tracking-wide uppercase">
                {col.title}
              </h4>
              <ul className="space-y-3.5">
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

        {/* Payment methods */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-[#C9A24B]/10 pt-8 pb-8">
          <div>
            <p className="text-xs text-[#F5EFE2]/45 mb-2.5 tracking-wide uppercase">
              We Accept
            </p>
            <div className="flex gap-2.5 flex-wrap">
              {paymentMethods.map((m) => (
                <span
                  key={m}
                  className="bg-[#C9A24B]/10 border border-[#C9A24B]/25 text-[#C9A24B] rounded-md px-3 py-1.5 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C9A24B]/20"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs text-[#F5EFE2]/45 mb-2.5 tracking-wide uppercase">
              Serving You In
            </p>
            <span className="text-sm text-[#C9A24B]/80 font-medium">
              Dhaka · Chattogram · Sylhet
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap justify-between items-center gap-2.5 text-xs border-t border-[#C9A24B]/10 pt-6">
          <span>© {new Date().getFullYear()} Harvestly. All rights reserved.</span>
          <div className="flex gap-5">
            <Link href="/terms" className="hover:text-[#D9B968] transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-[#D9B968] transition-colors">
              Privacy
            </Link>
            <Link href="/sitemap" className="hover:text-[#D9B968] transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}