"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/lib/auth-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [loading, user, router]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if no user
  if (!user) return null;

  return (
    <div className="flex min-h-screen">
      {user.darkThemeEnabled && (
        <style dangerouslySetInnerHTML={{ __html: `
          body { background-color: #111827 !important; color: #f3f4f6 !important; }
          .bg-white { background-color: #1f2937 !important; color: #f3f4f6 !important; border-color: #374151 !important; }
          .bg-gray-50, .bg-slate-50, .bg-slate-100, .bg-slate-200, .bg-gray-300, .bg-blue-50, .bg-amber-50, .bg-emerald-50, .bg-sky-50, .bg-rose-50 { background-color: #374151 !important; color: #f3f4f6 !important; border-color: #4b5563 !important; }
          .bg-gray-100, .bg-gray-200 { background-color: #111827 !important; }
          .text-gray-900, .text-slate-900, .text-slate-800, .text-blue-900, .text-emerald-900 { color: #f9fafb !important; }
          .text-gray-800, .text-gray-700, .text-slate-700, .text-slate-600 { color: #e5e7eb !important; }
          .text-gray-600, .text-gray-500, .text-slate-500 { color: #9ca3af !important; }
          .border-gray-100, .border-gray-200, .border-gray-300, .border-gray-400, .border-slate-100, .border-slate-200, .border-slate-300 { border-color: #374151 !important; }
          main { background-color: #111827 !important; } /* Force main container to black */
        `}} />
      )}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col lg:ml-64">
        {/* ─── Mobile Header ─── */}
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 transition"
            aria-label="Open sidebar"
          >
            <Menu size={22} />
          </button>
          <span className="text-base font-bold tracking-tight text-gray-900">
            EDUPLAY<span className="text-blue-600">VERSE</span>
          </span>
        </header>

        {/* ─── Content ─── */}
        <main className="flex-1 bg-gray-100 p-4 sm:p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
