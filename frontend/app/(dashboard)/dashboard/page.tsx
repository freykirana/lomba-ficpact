"use client";

import Link from "next/link";
import Image from "next/image";
import { Flame, CircleDollarSign, Trophy } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

/* ─── Feature Card ─── */
function FeatureCard({ title, description, href, imageSrc, svgPlaceholder }: { title: string; description: string; href: string; imageSrc?: string; svgPlaceholder?: React.ReactNode }) {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-4">{title}</h2>
      <div className="flex aspect-4/3 items-center justify-center rounded-xl bg-gray-100 overflow-hidden relative">
        {imageSrc ? (
          <Image src={imageSrc} alt={title} fill className="object-cover" />
        ) : svgPlaceholder ? svgPlaceholder : (
          <svg width="64" height="64" viewBox="0 0 64 64" className="text-gray-300" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="4" width="56" height="56" rx="4" />
            <line x1="4" y1="4" x2="60" y2="60" />
            <line x1="60" y1="4" x2="4" y2="60" />
          </svg>
        )}
      </div>
      <p className="mt-4 text-sm text-gray-500 leading-relaxed">{description}</p>
      <Link href={href}
        className="mt-5 inline-flex items-center justify-center gap-2 self-center rounded-full bg-blue-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
        Let&apos;s Start &nbsp;→
      </Link>
    </div>
  );
}

/* ─── Progress Card ─── */
function ProgressCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex aspect-square flex-col items-center justify-center rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
      {children}
    </div>
  );
}

/* ─── Level name helper ─── */
function getLevelName(level: number): string {
  const levels = ["Rookie", "Novice", "Apprentice", "Journeyman", "Expert", "Master", "Grandmaster", "Legend"];
  return levels[Math.min(level - 1, levels.length - 1)];
}

function getXPForNextLevel(level: number): number {
  return (level) * 1000;
}

/* ─── Dashboard Page ─── */
export default function DashboardPage() {
  const { user } = useAuth();

  const currentXP = user?.xp ?? 0;
  const currentLevel = user?.level ?? 1;
  const coins = user?.coins ?? 0;
  const nextLevelXP = getXPForNextLevel(currentLevel);
  const xpProgress = nextLevelXP > 0 ? Math.min((currentXP / nextLevelXP) * 100, 100) : 0;

  return (
    <div className="space-y-10">
      {/* ─ Welcome ─ */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, <span className="text-blue-600">{user?.username ?? "Player"}</span>! 👋
        </h1>
        <p className="text-gray-500 mt-1">Ready to solve today&apos;s mystery?</p>
      </div>

      {/* ── Top: Feature Cards ── */}
      <div className="grid grid-cols-1 gap-6">
        <div className="md:w-2/3 mx-auto w-full">
          <FeatureCard
            title="Daily Case"
            description="Sharpen your skills with a new real-world case every day. Solve challenges and earn XP to climb the leaderboard."
            href="/daily-case"
            imageSrc="/gambar-studycase.jpg.jpeg"
          />
        </div>
      </div>

      {/* ── Bottom: Progress Tracker ── */}
      <section>
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">Progress Tracker</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card A: Current Level */}
          <ProgressCard>
            <Trophy size={36} className="text-amber-500 mb-3" />
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Current Level</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{getLevelName(currentLevel)}</p>
            <div className="mt-4 w-full">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{currentXP.toLocaleString()} XP</span>
                <span>{nextLevelXP.toLocaleString()} XP</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-gray-100">
                <div className="h-2.5 rounded-full bg-blue-600 transition-all" style={{ width: `${xpProgress}%` }} />
              </div>
            </div>
          </ProgressCard>

          {/* Card B: Mystery Coins */}
          <ProgressCard>
            <CircleDollarSign size={36} className="text-yellow-500 mb-3" />
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Mystery Coins</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">{coins.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Coins</p>
          </ProgressCard>

          {/* Card C: Daily Streak */}
          <ProgressCard>
            <Flame size={36} className="text-orange-500 mb-3" />
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Daily Streak</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">0</p>
            <p className="text-sm text-gray-500">Day Streak!</p>
          </ProgressCard>
        </div>
      </section>
    </div>
  );
}
