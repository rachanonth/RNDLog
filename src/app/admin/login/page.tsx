"use client";

import { useActionState } from "react";
import { login } from "@/lib/actions/auth";

export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, null);

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-serif text-2xl text-stone-900 mb-1">
          Admin access
        </h1>
        <p className="text-sm text-stone-500 mb-8">
          Enter your access code to continue.
        </p>

        <form action={action} className="space-y-4">
          <div>
            <label
              htmlFor="code"
              className="block text-xs font-medium text-stone-500 uppercase tracking-widest mb-1.5"
            >
              Access code
            </label>
            <input
              id="code"
              name="code"
              type="password"
              required
              autoFocus
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-stone-200 rounded-md text-sm text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent placeholder:text-stone-300"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-500">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full px-4 py-2 bg-stone-900 text-white text-sm rounded-md hover:bg-stone-700 transition-colors disabled:opacity-50"
          >
            {isPending ? "Checking…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
