import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";

export const metadata: Metadata = { title: "Projects — Admin" };

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-stone-900">Projects</h1>
          <p className="mt-1 text-sm text-stone-500">
            {projects.length} project{projects.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="px-4 py-2 bg-stone-900 text-white text-sm rounded-md hover:bg-stone-700 transition-colors"
        >
          New project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-lg p-12 text-center">
          <p className="text-stone-400 text-sm">No projects yet.</p>
          <Link
            href="/admin/projects/new"
            className="mt-3 inline-block text-sm text-stone-600 underline underline-offset-2"
          >
            Add your first project →
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-stone-200 rounded-lg divide-y divide-stone-100">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between px-5 py-4 gap-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {project.featured && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  )}
                  <span className="text-sm font-medium text-stone-900 truncate">
                    {project.name}
                  </span>
                </div>
                {project.stack && (
                  <p className="mt-0.5 text-xs text-stone-400 font-mono ml-3.5 truncate">
                    {project.stack}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-5 flex-shrink-0">
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
                >
                  Edit
                </Link>
                <DeleteProjectButton
                  projectId={project.id}
                  projectName={project.name}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
