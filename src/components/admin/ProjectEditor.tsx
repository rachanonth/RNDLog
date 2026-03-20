"use client";

import { useTransition } from "react";
import { createProject, updateProject } from "@/lib/actions/projects";

type Project = {
  id: string;
  name: string;
  description: string | null;
  url: string | null;
  githubUrl: string | null;
  stack: string | null;
  featured: boolean;
  order: number;
};

export default function ProjectEditor({ project }: { project?: Project }) {
  const [isPending, startTransition] = useTransition();
  const action = project ? updateProject : createProject;

  return (
    <form
      action={(fd) => startTransition(() => action(fd))}
      className="space-y-6"
    >
      {project && <input type="hidden" name="id" value={project.id} />}

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Name <span className="text-red-400">*</span>
        </label>
        <input
          name="name"
          required
          defaultValue={project?.name ?? ""}
          className="w-full px-3 py-2 border border-stone-200 rounded-md text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          rows={3}
          defaultValue={project?.description ?? ""}
          className="w-full px-3 py-2 border border-stone-200 rounded-md text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400 resize-y"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Live URL
          </label>
          <input
            name="url"
            type="url"
            defaultValue={project?.url ?? ""}
            placeholder="https://..."
            className="w-full px-3 py-2 border border-stone-200 rounded-md text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            GitHub URL
          </label>
          <input
            name="githubUrl"
            type="url"
            defaultValue={project?.githubUrl ?? ""}
            placeholder="https://github.com/..."
            className="w-full px-3 py-2 border border-stone-200 rounded-md text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Stack{" "}
            <span className="text-stone-400 font-normal">(comma-separated)</span>
          </label>
          <input
            name="stack"
            defaultValue={project?.stack ?? ""}
            placeholder="Next.js, TypeScript, Prisma"
            className="w-full px-3 py-2 border border-stone-200 rounded-md text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Order{" "}
            <span className="text-stone-400 font-normal">(lower = first)</span>
          </label>
          <input
            name="order"
            type="number"
            defaultValue={project?.order ?? 0}
            className="w-full px-3 py-2 border border-stone-200 rounded-md text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="featured"
          name="featured"
          type="checkbox"
          defaultChecked={project?.featured ?? false}
          className="h-4 w-4 rounded border-stone-300 text-stone-900"
        />
        <label htmlFor="featured" className="text-sm text-stone-700">
          Featured project
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
