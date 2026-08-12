import Link from "next/link";

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
    <footer className="bg-[#081A15] text-[#F5EFE2]/75 pt-14 pb-6">
      <div className="max-w-[1200px] mx-auto px-7">
        <div className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-9 pb-9">
          <div>
            <div className="font-serif text-[#F5EFE2] text-xl mb-2.5">
              FreshCart
            </div>
            <p className="text-sm max-w-[32ch] leading-relaxed">
              Fresh groceries from local farms, delivered to your doorstep
              across Dhaka.
            </p>
            <div className="flex gap-2.5 mt-3.5">
              {paymentMethods.map((m) => (
                <span
                  key={m}
                  className="bg-[#C9A24B]/10 border border-[#C9A24B]/25 text-[#C9A24B] rounded-md px-2.5 py-1 text-xs font-semibold"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[#F5EFE2] text-sm font-bold mb-3.5">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label} className="text-sm">
                    <Link
                      href={link.href}
                      className="hover:text-[#C9A24B] transition-colors"
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
          <span>Dhaka · Chattogram · Sylhet</span>
        </div>
      </div>
    </footer>
  );
}