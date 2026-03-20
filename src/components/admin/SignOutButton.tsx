"use client";

import { logout } from "@/lib/actions/auth";
import { useTransition } from "react";

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => logout())}
      disabled={isPending}
      className="text-sm text-stone-400 hover:text-stone-200 transition-colors disabled:opacity-50"
    >
      {isPending ? "Signing out…" : "Sign out"}
    </button>
  );
}
