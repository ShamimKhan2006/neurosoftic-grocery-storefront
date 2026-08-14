"use client";

import { auth } from "@/app/lib/firebase";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "About Us", href: "/about" },
] as const;

interface CartItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice: number;
  unit: string;
  image: string;
  quantity: number;
}

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [balance] = useState<number>(120.5);

  const [cartCount, setCartCount] = useState(0);

  // Firebase auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Cart count load
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const storedCart = localStorage.getItem("cart");

        if (!storedCart) {
          setCartCount(0);
          return;
        }

        const cart: CartItem[] = JSON.parse(storedCart);

        const totalQuantity = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        setCartCount(totalQuantity);
      } catch (error) {
        console.error("Cart read error:", error);
        setCartCount(0);
      }
    };

    // First load
    updateCartCount();

    // Custom event
    window.addEventListener("cartUpdated", updateCartCount);

    // Browser storage event
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);

    // Optional: logout করলে cart clear করতে চাইলে
    // localStorage.removeItem("cart");
    // window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#E7E1D3] bg-[#FBF8F2]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">

        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-2">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#1F4D3A] to-[#3C7A5B] text-[#A8D95E] shadow-md transition-all duration-500 group-hover:rotate-[18deg] group-hover:scale-110"
            aria-hidden
          >
            🌿
          </span>

          <span className="flex flex-col leading-none">
            <span
              className="bg-gradient-to-r from-[#1F4D3A] to-[#3C7A5B] bg-clip-text text-xl font-semibold tracking-tight text-transparent transition-all duration-300 group-hover:tracking-wide"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Harvestly
            </span>

            <span className="text-[10px] font-medium tracking-wide text-[#A8D95E] mt-0.5">
              Organic &amp; Fresh
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#1F4D3A]"
                      : "text-[#26302A]/70 hover:text-[#1F4D3A]"
                  }`}
                >
                  {link.label}
                </Link>

                <span
                  className={`absolute -bottom-[1px] left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-[#A8D95E] to-[#3C7A5B] shadow-[0_0_8px_rgba(168,217,94,0.6)] transition-all duration-300 origin-left ${
                    isActive
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0"
                  }`}
                />
              </li>
            );
          })}

          {/* Dashboard */}
          {user && (
            <li className="relative">
              <Link
                href="/dashboard"
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === "/dashboard"
                    ? "text-[#1F4D3A]"
                    : "text-[#26302A]/70 hover:text-[#1F4D3A]"
                }`}
              >
                Dashboard
              </Link>

              <span
                className={`absolute -bottom-[1px] left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-[#A8D95E] to-[#3C7A5B] transition-all duration-300 origin-left ${
                  pathname === "/dashboard"
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0"
                }`}
              />
            </li>
          )}
        </ul>

        {/* Right side */}
        <div className="hidden items-center gap-3 md:flex">

          {/* 🛒 Cart Icon */}
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#E7E1D3] bg-white text-[#1F4D3A] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#A8D95E] hover:bg-[#A8D95E]/10 hover:shadow-md"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-5 w-5" />

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E4572E] px-1 text-[10px] font-bold text-white shadow-md">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          {user ? (
            <>
              {/* Balance */}
              <span className="flex items-center gap-1.5 rounded-full border border-[#A8D95E]/40 bg-[#A8D95E]/15 px-3 py-1.5 text-sm font-bold text-[#1F4D3A]">
                💰 ${balance.toFixed(2)}
              </span>

              {/* User */}
              <div className="flex items-center gap-2 rounded-full bg-[#1F4D3A]/5 px-2 py-1 pr-3 transition-colors hover:bg-[#1F4D3A]/10">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1F4D3A] text-xs font-semibold text-[#FBF8F2]">
                  {user.email?.charAt(0).toUpperCase()}
                </span>

                <span className="max-w-[120px] truncate text-sm font-medium text-[#26302A]">
                  {user.displayName || user.email}
                </span>
              </div>

              {/* Logout */}
              <button
                onClick={handleSignOut}
                className="rounded-full border border-[#E4572E]/30 px-4 py-1.5 text-sm font-medium text-[#E4572E] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E4572E] hover:text-white active:translate-y-0"
              >
                Log out
              </button>
            </>
          ) : (
            <Link href="/auth/signin">
              <button className="relative overflow-hidden rounded-full bg-[#1F4D3A] px-4 py-1.5 text-sm font-medium text-[#FBF8F2] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#16382A] hover:shadow-[0_8px_18px_-6px_rgba(31,77,58,0.5)] active:translate-y-0">
                Sign in
              </button>
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[#1F4D3A]/10 md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className="relative flex h-4 w-5 flex-col justify-between">
            <span
              className={`h-[2px] w-full rounded-full bg-[#1F4D3A] transition-all duration-300 ${
                mobileOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />

            <span
              className={`h-[2px] w-full rounded-full bg-[#1F4D3A] transition-all duration-300 ${
                mobileOpen ? "opacity-0" : "opacity-100"
              }`}
            />

            <span
              className={`h-[2px] w-full rounded-full bg-[#1F4D3A] transition-all duration-300 ${
                mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="border-t border-[#E7E1D3] bg-[#FBF8F2] px-4 pb-4 md:hidden animate-[fadeUp_0.25s_ease-out_both]">

          <ul className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-[#1F4D3A]/10 text-[#1F4D3A]"
                      : "text-[#26302A]/80 hover:bg-[#1F4D3A]/5"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {user && (
              <li>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    pathname === "/dashboard"
                      ? "bg-[#1F4D3A]/10 text-[#1F4D3A]"
                      : "text-[#26302A]/80 hover:bg-[#1F4D3A]/5"
                  }`}
                >
                  Dashboard
                </Link>
              </li>
            )}

            {/* Mobile Cart */}
            <li>
              <Link
                href="/cart"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-[#26302A]/80 transition-colors hover:bg-[#1F4D3A]/5"
              >
                <span className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-[#1F4D3A]" />
                  Shopping Cart
                </span>

                {cartCount > 0 && (
                  <span className="rounded-full bg-[#E4572E] px-2 py-0.5 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>

          <div className="mt-3 border-t border-[#E7E1D3] pt-3">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1F4D3A] text-xs font-semibold text-[#FBF8F2]">
                    {user.email?.charAt(0).toUpperCase()}
                  </span>

                  <div className="flex flex-col">
                    <span className="max-w-[150px] truncate text-sm font-medium text-[#26302A]">
                      {user.displayName || user.email}
                    </span>

                    <span className="text-xs font-bold text-[#1F4D3A]">
                      💰 ${balance.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  className="rounded-full border border-[#E4572E]/30 px-4 py-1.5 text-sm font-medium text-[#E4572E] transition-colors hover:bg-[#E4572E] hover:text-white"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                onClick={() => setMobileOpen(false)}
                className="block w-full rounded-full bg-[#1F4D3A] px-4 py-2 text-center text-sm font-medium text-[#FBF8F2] transition-colors hover:bg-[#16382A]"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
          }
        }
      `}</style>
    </header>
  );
}