"use client";

import { useState, useTransition } from "react";
import { createProject, updateProject } from "@/lib/actions/projects";
import type { ProjectDisplayType } from "@prisma/client";

const inputCls =
  "w-full px-3 py-2 border border-stone-200 rounded-md text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400";

type Project = {
  id: string;
  name: string;
  description: string | null;
  url: string | null;
  githubUrl: string | null;
  stack: string | null;
  icon: string | null;
  displayType: ProjectDisplayType;
  featured: boolean;
  order: number;
};

export default function ProjectEditor({ project }: { project?: Project }) {
  const [isPending, startTransition] = useTransition();
  const [displayType, setDisplayType] = useState<ProjectDisplayType>(
    project?.displayType ?? "LIST"
  );
  const action = project ? updateProject : createProject;

  return (
    <form
      action={(fd) => startTransition(() => action(fd))}
      className="space-y-6"
    >
      {project && <input type="hidden" name="id" value={project.id} />}

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Name <span className="text-red-400">*</span>
        </label>
        <input name="name" required defaultValue={project?.name ?? ""} className={inputCls} />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          rows={3}
          defaultValue={project?.description ?? ""}
          className={`${inputCls} resize-y`}
        />
      </div>

      {/* URLs */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Live URL</label>
          <input
            name="url"
            type="url"
            defaultValue={project?.url ?? ""}
            placeholder="https://..."
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">GitHub URL</label>
          <input
            name="githubUrl"
            type="url"
            defaultValue={project?.githubUrl ?? ""}
            placeholder="https://github.com/..."
            className={inputCls}
          />
        </div>
      </div>

      {/* Stack + Order */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Stack <span className="text-stone-400 font-normal">(comma-separated)</span>
          </label>
          <input
            name="stack"
            defaultValue={project?.stack ?? ""}
            placeholder="Next.js, TypeScript"
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Order <span className="text-stone-400 font-normal">(lower = first)</span>
          </label>
          <input
            name="order"
            type="number"
            defaultValue={project?.order ?? 0}
            className={inputCls}
          />
        </div>
      </div>

      {/* Display Type */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Display Type
        </label>
        <select
          name="displayType"
          value={displayType}
          onChange={(e) => setDisplayType(e.target.value as ProjectDisplayType)}
          className={inputCls}
        >
          <option value="LIST">List — full card with description & stack tags</option>
          <option value="WIDGET">Widget — compact grid card with icon</option>
        </select>
      </div>

      {/* Icon — only relevant for WIDGET */}
      {displayType === "WIDGET" && (
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Icon <span className="text-stone-400 font-normal">(emoji, e.g. 🛠️)</span>
          </label>
          <input
            name="icon"
            defaultValue={project?.icon ?? ""}
            placeholder="🛠️"
            className={inputCls}
          />
          <p className="mt-1 text-xs text-stone-400">
            Shown large on the widget card. Use any emoji.
          </p>
        </div>
      )}
      {/* Keep the hidden input so displayType=LIST posts still include icon field as empty */}
      {displayType === "LIST" && (
        <input type="hidden" name="icon" value={project?.icon ?? ""} />
      )}

      {/* Featured */}
      <div className="flex items-center gap-2">
        <input
          id="featured"
          name="featured"
          type="checkbox"
          defaultChecked={project?.featured ?? false}
          className="h-4 w-4 rounded border-stone-300 text-stone-900"
        />
        <label htmlFor="featured" className="text-sm text-stone-700">
          Featured — show on homepage
        </label>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-2 bg-stone-900 text-white text-sm rounded-md hover:bg-stone-700 transition-colors disabled:opacity-50"
        >
          {isPending ? "Saving…" : project ? "Save changes" : "Create project"}
        </button>
      </div>
    </form>
  );
}
