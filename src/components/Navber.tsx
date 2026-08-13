"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

/**
 * ---------------------------------------------------------------------------
 * Design tokens (GreenCart)
 * ---------------------------------------------------------------------------
 * Forest      #1F4D3A   primary / logo / active state
 * Lime        #A8D95E   accent, hover glow, "fresh" badge
 * Tomato      #E4572E   sale badge, logout hover
 * Cream       #FBF8F2   nav background
 * Charcoal    #26302A   body text
 *
 * Display face  : "Fraunces" (logo wordmark, warm & a bit organic)
 * Body face     : "Inter"    (links, buttons)
 * Signature     : a small leaf-tick "•" that slides under the active route,
 *                 echoing a produce-sticker feel without leaning on icons.
 * ---------------------------------------------------------------------------
 */

// ---- Mock auth hook -------------------------------------------------------
// Swap this out for real auth (NextAuth, Clerk, your own session context, etc).
// Shape kept intentionally small: null = signed out, object = signed in.
interface User {
  name: string;
  avatarInitial: string;
}

function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  const signIn = () => setUser({ name: "Rafi Ahmed", avatarInitial: "R" });
  const signOut = () => setUser(null);

  return { user, signIn, signOut };
}

// ---- Nav config -------------------------------------------------------
// Home / Products are the core routes. Categories + Deals are the "2 more
// real grocery-project routes" — both are staples of live grocery apps
// (Blinkit, Chaldal, Shwapno, Instacart all ship exactly these).
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Deals", href: "/deals" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const { user, signIn, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E7E1D3] bg-[#FBF8F2]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1F4D3A] text-[#A8D95E]"
            aria-hidden
          >
            🌿
          </span>
          <span
            className="text-xl font-semibold tracking-tight text-[#1F4D3A]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            GreenCart
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
                {isActive && (
                  <span className="absolute -bottom-[1px] left-3 right-3 h-[2px] rounded-full bg-[#A8D95E]" />
                )}
              </li>
            );
          })}

          {/* Dashboard route: only visible to a signed-in user */}
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
              {pathname === "/dashboard" && (
                <span className="absolute -bottom-[1px] left-3 right-3 h-[2px] rounded-full bg-[#A8D95E]" />
              )}
            </li>
          )}
        </ul>

        {/* Auth area */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <div className="flex items-center gap-2 rounded-full bg-[#1F4D3A]/5 px-2 py-1 pr-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1F4D3A] text-xs font-semibold text-[#FBF8F2]">
                  {user.avatarInitial}
                </span>
                <span className="text-sm font-medium text-[#26302A]">
                  {user.name}
                </span>
              </div>
              <button
                onClick={signOut}
                className="rounded-full border border-[#E4572E]/30 px-4 py-1.5 text-sm font-medium text-[#E4572E] transition-colors hover:bg-[#E4572E] hover:text-white"
              >
                Log out
              </button>
            </>
          ) : (
            <button
              onClick={signIn}
              className="rounded-full bg-[#1F4D3A] px-4 py-1.5 text-sm font-medium text-[#FBF8F2] transition-colors hover:bg-[#16382A]"
            >
              Sign in
            </button>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-md text-[#1F4D3A] md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className="text-2xl leading-none">{mobileOpen ? "×" : "☰"}</span>
        </button>
      </nav>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="border-t border-[#E7E1D3] bg-[#FBF8F2] px-4 pb-4 md:hidden">
          <ul className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === link.href
                      ? "bg-[#1F4D3A]/10 text-[#1F4D3A]"
                      : "text-[#26302A]/80"
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
                  className={`block rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === "/dashboard"
                      ? "bg-[#1F4D3A]/10 text-[#1F4D3A]"
                      : "text-[#26302A]/80"
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
                    {user.avatarInitial}
                  </span>
                  <span className="text-sm font-medium text-[#26302A]">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={signOut}
                  className="rounded-full border border-[#E4572E]/30 px-4 py-1.5 text-sm font-medium text-[#E4572E]"
                >
                  Log out
                </button>
              </div>
            ) : (
              <button
                onClick={signIn}
                className="w-full rounded-full bg-[#1F4D3A] px-4 py-2 text-sm font-medium text-[#FBF8F2]"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}