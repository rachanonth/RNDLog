import type { Metadata } from "next";
import Link from "next/link";
import { getAllTools } from "@/lib/tools";
import DeleteToolButton from "@/components/admin/DeleteToolButton";

export const metadata: Metadata = { title: "Tools — Admin" };

export default async function AdminToolsPage() {
  const tools = await getAllTools();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-stone-900">Toolbox</h1>
          <p className="mt-1 text-sm text-stone-500">
            {tools.length} tool{tools.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/admin/tools/new"
          className="px-4 py-2 bg-stone-900 text-white text-sm rounded-md hover:bg-stone-700 transition-colors"
        >
          Add tool
        </Link>
      </div>

      {tools.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-lg p-12 text-center">
          <p className="text-stone-400 text-sm">No tools yet.</p>
          <Link
            href="/admin/tools/new"
            className="mt-3 inline-block text-sm text-stone-600 underline underline-offset-2"
          >
            Add your first tool →
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-stone-200 rounded-lg divide-y divide-stone-100">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="flex items-center justify-between px-5 py-4 gap-4"
            >
              <div className="min-w-0 flex items-center gap-3">
                {tool.icon && (
                  <span className="text-lg leading-none flex-shrink-0">{tool.icon}</span>
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-stone-900 truncate">
                      {tool.name}
                    </span>
                    {tool.category && (
                      <span className="text-xs text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded flex-shrink-0">
                        {tool.category}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-400 font-mono truncate mt-0.5">
                    {tool.link}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 flex-shrink-0">
                <Link
                  href={`/admin/tools/${tool.id}/edit`}
                  className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
                >
                  Edit
                </Link>
                <DeleteToolButton toolId={tool.id} toolName={tool.name} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
