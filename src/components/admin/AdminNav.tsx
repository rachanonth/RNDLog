"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "@/components/admin/SignOutButton";

export default function AdminNav() {
  const pathname = usePathname();

  if (pathname === "/admin/login") return null;

  return (
    <header className="bg-stone-900 text-white">
      <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="text-sm font-medium text-stone-300 tracking-wide">
            Admin
          </span>
          <nav className="flex items-center gap-1">
            <Link
              href="/admin/now"
              className="px-3 py-1.5 text-sm text-stone-400 hover:text-white hover:bg-stone-800 rounded transition-colors"
            >
              Now Page
            </Link>
            <Link
              href="/admin/posts"
              className="px-3 py-1.5 text-sm text-stone-400 hover:text-white hover:bg-stone-800 rounded transition-colors"
            >
              Posts
            </Link>
            <Link
              href="/admin/projects"
              className="px-3 py-1.5 text-sm text-stone-400 hover:text-white hover:bg-stone-800 rounded transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/admin/tools"
              className="px-3 py-1.5 text-sm text-stone-400 hover:text-white hover:bg-stone-800 rounded transition-colors"
            >
              Tools
            </Link>
            <Link
              href="/admin/assets"
              className="px-3 py-1.5 text-sm text-stone-400 hover:text-white hover:bg-stone-800 rounded transition-colors"
            >
              Assets
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="text-sm text-stone-400 hover:text-white transition-colors"
          >
            View site ↗
          </Link>
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
