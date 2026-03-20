"use client";

import { useState, useTransition } from "react";
import { saveNowPage } from "@/lib/actions/now";
import type { NowPage } from "@prisma/client";

const inputCls =
  "w-full px-3 py-2 border border-stone-200 rounded-md text-sm text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent placeholder:text-stone-400";

function toDateInputValue(date: Date | string): string {
  return new Date(date).toISOString().slice(0, 10); // "YYYY-MM-DD"
}

export default function NowEditor({ now }: { now: NowPage | null }) {
  const [content, setContent] = useState(now?.content ?? "");
  const [location, setLocation] = useState(now?.location ?? "");
  const [displayDate, setDisplayDate] = useState(
    now?.displayDate ? toDateInputValue(now.displayDate) : toDateInputValue(new Date())
  );
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");

    const fd = new FormData();
    fd.set("content", content);
    fd.set("location", location);
    fd.set("displayDate", displayDate);

    startTransition(async () => {
      try {
        await saveNowPage(fd);
        setStatus("saved");
        setTimeout(() => setStatus("idle"), 3000);
      } catch {
        setStatus("error");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-stone-500 uppercase tracking-widest mb-1.5">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Bangkok, Thailand"
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-stone-500 uppercase tracking-widest mb-1.5">
            Display date
          </label>
          <input
            type="date"
            value={displayDate}
            onChange={(e) => setDisplayDate(e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-stone-500 uppercase tracking-widest mb-1.5">
          Content{" "}
          <span className="normal-case font-normal text-stone-400">
            (Markdown — one bullet per line)
          </span>
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          placeholder={`- Being a dad\n- Building in public\n- Reading *The Pragmatic Programmer*`}
          className={`${inputCls} font-mono leading-relaxed resize-y`}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 bg-stone-900 text-white text-sm rounded-md hover:bg-stone-700 transition-colors disabled:opacity-50"
        >
          {isPending ? "Saving…" : "Save changes"}
        </button>
        {status === "saved" && (
          <span className="text-sm text-emerald-600">Saved!</span>
        )}
        {status === "error" && (
          <span className="text-sm text-red-500">Something went wrong.</span>
        )}
      </div>
    </form>
  );
}
