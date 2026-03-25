"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Search, LayoutDashboard, BriefcaseMedical, BookOpen, Users,
  ShoppingCart, Settings, Swords, DoorOpen, X, Gift, LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

/* ─── Navigation Items ─── */
const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Daily Case", href: "/daily-case", icon: BriefcaseMedical },
  { label: "Chapters", href: "/dashboard/chapters", icon: BookOpen },
  { label: "Community", href: "/dashboard/community", icon: Users },
  { label: "Coin Shop", href: "/dashboard/coin-shop", icon: ShoppingCart },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  return (
    <>
      {/* ─── Mobile Overlay ─── */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden" onClick={onClose} aria-hidden="true" />
      )}

      {/* ─── Sidebar Panel ─── */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:z-30`}>
        {/* ─── Header ─── */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <Link href="/dashboard" className="flex items-center gap-2.5" onClick={onClose}>
            <Image src="/logo-eduplay.png" alt="EduPlayVerse Logo" width={40} height={40} className="object-contain" />
            <span className="text-xl font-bold tracking-tight text-gray-900">
              EDUPLAY<span className="text-blue-600">VERSE</span>
            </span>
          </Link>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition lg:hidden" aria-label="Close sidebar">
            <X size={20} />
          </button>
        </div>

        {/* ─── User Info ─── */}
        {user && (
          <div className="mx-4 mb-3 rounded-xl bg-blue-50 p-3">
            <p className="text-sm font-semibold text-blue-900 mb-1 flex items-center flex-wrap gap-2">
              <span>{user.username}</span>
              {user.purchases?.some((p: any) => p.item.name === "Grand Master") && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-800 uppercase tracking-widest border border-amber-300">Grand Master</span>
              )}
            </p>
            <p className="text-xs text-blue-600">Lv.{user.level} • {user.xp} XP • {user.coins} Coins</p>
          </div>
        )}

        {/* ─── Search ─── */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-lg bg-gray-100 py-2.5 pl-9 pr-4 text-sm text-gray-700 placeholder:text-gray-400 outline-none transition focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 border border-transparent" />
          </div>
        </div>

        {/* ─── Navigation ─── */}
        <nav className="flex-1 overflow-y-auto px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = item.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link href={item.href} onClick={onClose}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}>
                    <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ─── Bottom Actions ─── */}
        <div className="mt-auto space-y-2 border-t border-gray-100 p-4">
          <button type="button" onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
