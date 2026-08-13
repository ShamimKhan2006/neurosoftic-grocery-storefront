

"use client";

import { auth } from "@/app/lib/firebase";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";



const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Deals", href: "/deals" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSighOut = async () => {
    await signOut(auth);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#E7E1D3] bg-[#FBF8F2]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1F4D3A] text-[#A8D95E] transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-105"
            aria-hidden
          >
            🌿
          </span>
          <span
            className="text-xl font-semibold tracking-tight text-[#1F4D3A]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            FreshCart
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
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
                  className={`absolute -bottom-[1px] left-3 right-3 h-[2px] rounded-full bg-[#A8D95E] transition-all duration-300 origin-left ${
                    isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                  }`}
                />
              </li>
            );
          })}

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
                className={`absolute -bottom-[1px] left-3 right-3 h-[2px] rounded-full bg-[#A8D95E] transition-all duration-300 origin-left ${
                  pathname === "/dashboard" ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                }`}
              />
            </li>
          )}
        </ul>

        {/* Auth area */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <div className="flex items-center gap-2 rounded-full bg-[#1F4D3A]/5 px-2 py-1 pr-3 transition-colors hover:bg-[#1F4D3A]/10">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1F4D3A] text-xs font-semibold text-[#FBF8F2]">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
                <span className="text-sm font-medium text-[#26302A]">
                  {user?.displayName}
                </span>
              </div>
              <button
                onClick={handleSighOut}
                className="rounded-full border border-[#E4572E]/30 px-4 py-1.5 text-sm font-medium text-[#E4572E] transition-all duration-200 hover:bg-[#E4572E] hover:text-white hover:-translate-y-0.5 active:translate-y-0"
              >
                Log out
              </button>
            </>
          ) : (
            <Link href={"/auth/signin"}>
              <button className="rounded-full bg-[#1F4D3A] px-4 py-1.5 text-sm font-medium text-[#FBF8F2] transition-all duration-200 hover:bg-[#16382A] hover:-translate-y-0.5 hover:shadow-[0_8px_18px_-6px_rgba(31,77,58,0.5)] active:translate-y-0">
                Sign in
              </button>
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-md text-[#1F4D3A] md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className="text-2xl leading-none transition-transform duration-200">
            {mobileOpen ? "×" : "☰"}
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
          </ul>

          <div className="mt-3 border-t border-[#E7E1D3] pt-3">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1F4D3A] text-xs font-semibold text-[#FBF8F2]">
                    {user.email?.charAt(0).toUpperCase()}
                  </span>
                  <span className="text-sm font-medium text-[#26302A]">
                    {user?.displayName}
                  </span>
                </div>
                <button
                  onClick={handleSighOut}
                  className="rounded-full border border-[#E4572E]/30 px-4 py-1.5 text-sm font-medium text-[#E4572E] transition-colors hover:bg-[#E4572E] hover:text-white"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link
                href={"/auth/signin"}
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
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </header>
  );
}