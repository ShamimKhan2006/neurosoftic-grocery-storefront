"use client";
import Link from "next/link";
import { useState } from "react";
import { Search, Heart, ShoppingCart, ChevronDown, Menu } from "lucide-react";

// Premium palette — mirror these in tailwind.config.ts under theme.extend.colors
// leaf: "#0E2B22", leafDark: "#081A15", cream: "#F5EFE2", creamSoft: "#EDE3CD",
// ink: "#1B1712", gold: "#C9A24B", plum: "#4A2E3B", carrot: "#9C7A3F"

interface HeaderProps {
  cartCount?: number;
  wishlistCount?: number;
  deliveryArea?: string;
}

export default function Header({
  cartCount = 3,
  wishlistCount = 2,
  deliveryArea = "Dhaka",
}: HeaderProps) {
  const [query, setQuery] = useState("");

  return (
    <div className="sticky top-0 z-50">
      {/* Announcement bar */}
      <div className="bg-[#4A2E3B] text-[#F5EFE2] text-center text-[13px] font-medium py-2.5 px-4">
        ⚡ Express 2-Hour Delivery in Your Area &nbsp;|&nbsp;{" "}
        <span className="text-[#C9A24B] font-semibold">Free Delivery</span> on
        Orders Over ৳500
      </div>

      {/* Main nav */}
      <header className="bg-[#F5EFE2] border-b border-[#1B1712]/10">
        <div className="max-w-[1200px] mx-auto flex items-center gap-6 px-7 py-4">
          <Link
            href="/"
            className="font-serif font-bold text-2xl text-[#081A15] whitespace-nowrap"
          >
            Fresh<span className="text-[#8A3A2C]">Cart</span>
          </Link>

          <button className="hidden md:flex flex-col text-left border-l border-[#1B1712]/10 pl-4 leading-tight whitespace-nowrap">
            <span className="text-[11px] text-[#1B1712]/60">Deliver to</span>
            <span className="text-sm font-semibold flex items-center gap-1 text-[#1B1712]">
              {deliveryArea} <ChevronDown size={13} />
            </span>
          </button>

          <div className="hidden md:flex flex-1 items-center gap-2.5 bg-white border border-[#1B1712]/10 rounded-lg px-3.5 py-2.5 max-w-[520px]">
            <Search size={16} className="text-[#1B1712]/50 shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for fruits, milk, bread..."
              className="flex-1 bg-transparent outline-none text-sm text-[#1B1712] placeholder:text-[#1B1712]/40"
            />
          </div>

          <button className="hidden lg:flex items-center gap-1.5 text-sm font-medium text-[#1B1712] whitespace-nowrap">
            <Menu size={16} /> All Categories <ChevronDown size={13} />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <button className="relative text-[#1B1712]/80 hover:text-[#8A3A2C] transition-colors">
              <Heart size={21} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-[#8A3A2C] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button className="relative text-[#1B1712]/80 hover:text-[#C9A24B] transition-colors">
              <ShoppingCart size={21} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-[#C9A24B] text-[#081A15] text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}