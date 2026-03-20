import type { Metadata } from "next";
import { getAllTools } from "@/lib/tools";

export const metadata: Metadata = { title: "Uses" };

export const revalidate = false;

export default async function UsesPage() {
  const tools = await getAllTools();

  // Group by category; uncategorised last
  const toolGroups = tools.reduce<Record<string, typeof tools>>((acc, tool) => {
    const key = tool.category ?? "";
    if (!acc[key]) acc[key] = [];
    acc[key].push(tool);
    return acc;
  }, {});

  const groupKeys = Object.keys(toolGroups).sort((a, b) => {
    if (a === "" && b !== "") return 1;
    if (a !== "" && b === "") return -1;
    return a.localeCompare(b);
  });

  return (
    <div>
      <h1 className="font-serif text-3xl text-stone-900 dark:text-stone-100 mb-2">
        Uses
      </h1>
      <p className="text-sm text-stone-400 dark:text-stone-500 font-sans mb-12">
        Curated tools and resources I find useful.
      </p>

      {tools.length === 0 ? (
        <p className="text-stone-400 dark:text-stone-500 text-sm">Nothing here yet.</p>
      ) : (
        <div className="space-y-10">
          {groupKeys.map((key) => (
            <section key={key}>
              {key && (
                <p className="text-xs font-sans tracking-widest uppercase text-stone-400 dark:text-stone-500 mb-4">
                  {key}
                </p>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {toolGroups[key].map((tool) => (
                  <a
                    key={tool.id}
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-start gap-3 rounded-xl p-4 bg-amber-50 dark:bg-amber-950/20 hover:bg-amber-100 dark:hover:bg-amber-950/30 transition-colors border border-amber-100 dark:border-amber-900/20"
                  >
                    {tool.icon && (
                      <span className="text-2xl leading-none" aria-hidden="true">
                        {tool.icon}
                      </span>
                    )}
                    <div className="min-w-0 w-full">
                      <p className="font-serif text-sm text-stone-900 dark:text-stone-100 leading-snug">
                        {tool.name}
                      </p>
                      {tool.description && (
                        <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 font-sans leading-relaxed line-clamp-2">
                          {tool.description}
                        </p>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
