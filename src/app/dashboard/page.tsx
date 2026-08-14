"use client";

import { auth } from "@/app/lib/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Package,
  Heart,
  Wallet,
  Clock,
  ChevronRight,
  MapPin,
  Bell,
  Settings,
} from "lucide-react";

/**
 * ---------------------------------------------------------------------------
 * GreenCart — Account Dashboard
 * Forest #1F4D3A · Lime #A8D95E · Tomato #E4572E · Cream #FBF8F2 · Charcoal #26302A
 * ---------------------------------------------------------------------------
 */

interface Order {
  id: string;
  date: string;
  items: number;
  total: number;
  status: "Delivered" | "On the way" | "Processing";
}

const recentOrders: Order[] = [
  {
    id: "GC-10482",
    date: "12 Aug 2026",
    items: 6,
    total: 845,
    status: "Delivered",
  },
  {
    id: "GC-10467",
    date: "8 Aug 2026",
    items: 3,
    total: 320,
    status: "Delivered",
  },
  {
    id: "GC-10451",
    date: "14 Aug 2026",
    items: 9,
    total: 1240,
    status: "On the way",
  },
];

const statusStyle: Record<Order["status"], string> = {
  Delivered: "bg-[#A8D95E]/15 text-[#1F4D3A]",
  "On the way": "bg-amber-50 text-amber-700",
  Processing: "bg-[#E4572E]/10 text-[#E4572E]",
};

const stats = [
  {
    label: "Total Orders",
    value: "24",
    icon: Package,
  },
  {
    label: "Saved Items",
    value: "8",
    icon: Heart,
  },
  {
    label: "Wallet Balance",
    value: "$350",
    icon: Wallet,
  },
];

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setChecking(false);

      if (!currentUser) {
        router.push("/auth/signin");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBF8F2]">
        <div className="flex items-center gap-2 text-[#1F4D3A]">
          <span className="h-2 w-2 rounded-full bg-[#A8D95E] animate-bounce [animation-delay:-0.3s]" />
          <span className="h-2 w-2 rounded-full bg-[#A8D95E] animate-bounce [animation-delay:-0.15s]" />
          <span className="h-2 w-2 rounded-full bg-[#A8D95E] animate-bounce" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  const initial = user.email?.charAt(0).toUpperCase() ?? "U";

  return (
    <section className="min-h-screen bg-[#FBF8F2] py-10">
      <div className="max-w-6xl mx-auto px-4">

        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8 animate-[fadeUp_0.5s_cubic-bezier(0.16,1,0.3,1)_both]">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1F4D3A] text-[#A8D95E] text-xl font-semibold shadow-[0_10px_24px_-8px_rgba(31,77,58,0.4)]">
              {initial}
            </span>

            <div>
              <p className="text-xs uppercase tracking-widest text-[#1F4D3A]/70 font-semibold">
                Welcome back
              </p>

              <h1
                className="text-2xl md:text-3xl font-bold text-[#26302A]"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {user.displayName || user.email?.split("@")[0]}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E7E1D3] bg-white text-[#1F4D3A] transition-all duration-200 hover:border-[#1F4D3A]/30 hover:-translate-y-0.5">
              <Bell size={17} />
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E7E1D3] bg-white text-[#1F4D3A] transition-all duration-200 hover:border-[#1F4D3A]/30 hover:-translate-y-0.5">
              <Settings size={17} />
            </button>

            <Link
              href="/products"
              className="ml-1 rounded-full bg-[#1F4D3A] px-5 py-2.5 text-sm font-medium text-[#FBF8F2] transition-all duration-200 hover:bg-[#16382A] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(31,77,58,0.5)]"
            >
              Shop now
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group flex items-center gap-4 rounded-2xl border border-[#E7E1D3] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-18px_rgba(31,77,58,0.25)] hover:border-[#A8D95E]/40 animate-[fadeUp_0.5s_cubic-bezier(0.16,1,0.3,1)_both]"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#A8D95E]/15 text-[#1F4D3A] transition-transform duration-300 group-hover:scale-110">
                  <Icon size={19} />
                </span>

                <div>
                  <p className="text-xl font-bold text-[#26302A]">
                    {stat.value}
                  </p>

                  <p className="text-xs text-[#26302A]/55">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6">

          {/* Recent Orders */}
          <div className="rounded-2xl border border-[#E7E1D3] bg-white overflow-hidden animate-[fadeUp_0.55s_cubic-bezier(0.16,1,0.3,1)_0.1s_both]">

            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E7E1D3]">
              <h2 className="font-semibold text-[#26302A]">
                Recent Orders
              </h2>

              <Link
                href="/orders"
                className="flex items-center gap-1 text-xs font-medium text-[#1F4D3A] hover:text-[#16382A] transition-colors"
              >
                View all <ChevronRight size={14} />
              </Link>
            </div>

            <ul>
              {recentOrders.map((order, i) => (
                <li
                  key={order.id}
                  className={`flex items-center justify-between px-5 py-4 transition-colors hover:bg-[#FBF8F2] ${
                    i !== recentOrders.length - 1
                      ? "border-b border-[#E7E1D3]"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1F4D3A]/5 text-[#1F4D3A]">
                      <Package size={15} />
                    </span>

                    <div>
                      <p className="text-sm font-semibold text-[#26302A]">
                        {order.id}
                      </p>

                      <p className="flex items-center gap-1 text-xs text-[#26302A]/50">
                        <Clock size={11} />
                        {order.date} · {order.items} items
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        statusStyle[order.status]
                      }`}
                    >
                      {order.status}
                    </span>

                    {/* Dollar Currency */}
                    <span className="text-sm font-bold text-[#26302A] w-14 text-right">
                      ${order.total}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">

            {/* Account */}
            <div className="rounded-2xl border border-[#E7E1D3] bg-white p-5 animate-[fadeUp_0.55s_cubic-bezier(0.16,1,0.3,1)_0.15s_both]">
              <h2 className="font-semibold text-[#26302A] mb-4">
                Account
              </h2>

              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-[#26302A]/50">
                    Email
                  </dt>

                  <dd className="text-[#26302A] font-medium truncate max-w-[60%] text-right">
                    {user.email}
                  </dd>
                </div>

                <div className="flex justify-between">
                  <dt className="text-[#26302A]/50">
                    Member since
                  </dt>

                  <dd className="text-[#26302A] font-medium">
                    2025
                  </dd>
                </div>
              </dl>

              <Link
                href="/dashboard/profile"
                className="mt-4 block w-full rounded-lg border border-[#1F4D3A]/20 py-2.5 text-center text-sm font-medium text-[#1F4D3A] transition-all duration-200 hover:bg-[#1F4D3A] hover:text-[#FBF8F2]"
              >
                Edit profile
              </Link>
            </div>

            {/* Delivery Address */}
            <div className="rounded-2xl border border-[#E7E1D3] bg-white p-5 animate-[fadeUp_0.55s_cubic-bezier(0.16,1,0.3,1)_0.2s_both]">
              <div className="flex items-center gap-2 mb-3">
                <MapPin
                  size={16}
                  className="text-[#1F4D3A]"
                />

                <h2 className="font-semibold text-[#26302A]">
                  Delivery Address
                </h2>
              </div>

              <p className="text-sm text-[#26302A]/60 leading-relaxed">
                No address saved yet. Add one to speed up checkout.
              </p>

              <button className="mt-4 w-full rounded-lg bg-[#1F4D3A] py-2.5 text-sm font-medium text-[#FBF8F2] transition-all duration-200 hover:bg-[#16382A] hover:shadow-[0_10px_24px_-8px_rgba(31,77,58,0.5)]">
                Add address
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
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
    </section>
  );
}