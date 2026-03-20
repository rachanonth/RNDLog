"use client";

import { useTransition } from "react";
import { createTool, updateTool } from "@/lib/actions/tools";

const inputCls =
  "w-full px-3 py-2 border border-stone-200 rounded-md text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400";

type Tool = {
  id: string;
  name: string;
  description: string | null;
  link: string;
  category: string | null;
  icon: string | null;
  visible: boolean;
  order: number;
};

export default function ToolEditor({ tool }: { tool?: Tool }) {
  const [isPending, startTransition] = useTransition();
  const action = tool ? updateTool : createTool;

  return (
    <form
      action={(fd) => startTransition(() => action(fd))}
      className="space-y-6"
    >
      {tool && <input type="hidden" name="id" value={tool.id} />}

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Name <span className="text-red-400">*</span>
        </label>
        <input name="name" required defaultValue={tool?.name ?? ""} className={inputCls} />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          rows={2}
          defaultValue={tool?.description ?? ""}
          placeholder="What is this tool for?"
          className={`${inputCls} resize-y`}
        />
      </div>

      {/* Link */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Link <span className="text-red-400">*</span>
        </label>
        <input
          name="link"
          type="url"
          required
          defaultValue={tool?.link ?? ""}
          placeholder="https://..."
          className={inputCls}
        />
      </div>

      {/* Category + Icon */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Category
          </label>
          <input
            name="category"
            defaultValue={tool?.category ?? ""}
            placeholder="e.g. Design, AI, DevOps"
            className={inputCls}
          />
          <p className="mt-1 text-xs text-stone-400">Used to group tools on the page.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Icon <span className="text-stone-400 font-normal">(emoji)</span>
          </label>
          <input
            name="icon"
            defaultValue={tool?.icon ?? ""}
            placeholder="🛠️"
            className={inputCls}
          />
        </div>
      </div>

      {/* Visible */}
      <div className="flex items-center gap-2">
        <input
          id="visible"
          name="visible"
          type="checkbox"
          defaultChecked={tool?.visible ?? false}
          className="h-4 w-4 rounded border-stone-300 text-stone-900"
        />
        <label htmlFor="visible" className="text-sm text-stone-700">
          Visible on /uses page
        </label>
      </div>

      {/* Order */}
      <div className="w-1/2">
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Order <span className="text-stone-400 font-normal">(lower = first within category)</span>
        </label>
        <input
          name="order"
          type="number"
          defaultValue={tool?.order ?? 0}
          className={inputCls}
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-2 bg-stone-900 text-white text-sm rounded-md hover:bg-stone-700 transition-colors disabled:opacity-50"
        >
          {isPending ? "Saving…" : tool ? "Save changes" : "Add tool"}
        </button>
      </div>
    </form>
  );
}
