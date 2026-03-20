import type { Metadata } from "next";
import { getListProjects, getWidgetProjects } from "@/lib/projects";
import { ProjectLinkIcons } from "@/components/ProjectLinks";

export const metadata: Metadata = { title: "Projects" };

export const revalidate = false;

export default async function ProjectsPage() {
  const [listProjects, widgetProjects] = await Promise.all([
    getListProjects(),
    getWidgetProjects(),
  ]);

  const hasAny = listProjects.length > 0 || widgetProjects.length > 0;

  if (!hasAny) {
    return (
      <div>
        <h1 className="font-serif text-3xl text-stone-900 dark:text-stone-100 mb-10">
          Projects
        </h1>
        <p className="text-stone-400 dark:text-stone-500 text-sm">Nothing here yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <h1 className="font-serif text-3xl text-stone-900 dark:text-stone-100">
        Projects
      </h1>

      {/* ── Section 1: Main Projects (LIST) ── */}
      {listProjects.length > 0 && (
        <section className="space-y-10">
          {listProjects.map((project) => (
            <div key={project.id} className="flex items-start justify-between gap-6">
              <div className="min-w-0">
                <h2 className="font-serif text-xl text-stone-900 dark:text-stone-100">
                  {project.name}
                </h2>

                {project.description && (
                  <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
                    {project.description}
                  </p>
                )}

                {project.stack && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.split(",").map((tag) => (
                      <span
                        key={tag.trim()}
                        className="px-2 py-0.5 text-xs font-mono bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 rounded"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex-shrink-0 mt-1">
                <ProjectLinkIcons
                  githubUrl={project.githubUrl}
                  url={project.url}
                  name={project.name}
                />
              </div>
            </div>
          ))}
        </section>
      )}

      {/* ── Section 2: Mini Tools / Playground (WIDGET) ── */}
      {widgetProjects.length > 0 && (
        <section>
          <h2 className="font-serif text-xl text-stone-900 dark:text-stone-100 mb-6">
            Mini Tools &amp; Playground
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {widgetProjects.map((project) => {
              const Wrapper = project.url || project.githubUrl ? "a" : "div";
              const href = project.url ?? project.githubUrl ?? undefined;

              return (
                <Wrapper
                  key={project.id}
                  {...(href
                    ? { href, target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex flex-col items-start gap-3 rounded-xl p-4 bg-stone-100 dark:bg-stone-800/60 hover:bg-stone-200/70 dark:hover:bg-stone-800 transition-colors"
                >
                  {project.icon && (
                    <span className="text-2xl leading-none" aria-hidden="true">
                      {project.icon}
                    </span>
                  )}
                  <div className="min-w-0 w-full">
                    <p className="font-serif text-sm text-stone-900 dark:text-stone-100 leading-snug">
                      {project.name}
                    </p>
                    {project.description && (
                      <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 font-sans leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    )}
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
