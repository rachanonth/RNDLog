import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = { title: "Projects" };

export const revalidate = false;

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div>
      <h1 className="font-serif text-3xl text-stone-900 dark:text-stone-100 mb-10">
        Projects
      </h1>

      {projects.length === 0 ? (
        <p className="text-stone-400 dark:text-stone-500 text-sm">
          Nothing here yet.
        </p>
      ) : (
        <ul className="space-y-10">
          {projects.map((project) => (
            <li key={project.id}>
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-serif text-xl text-stone-900 dark:text-stone-100">
                      {project.name}
                    </h2>
                    {project.featured && (
                      <span className="text-xs font-sans tracking-widest uppercase text-stone-400 dark:text-stone-500">
                        featured
                      </span>
                    )}
                  </div>

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

                <div className="flex items-center gap-3 flex-shrink-0 mt-1">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name} on GitHub`}
                      className="text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </a>
                  )}
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${project.name}`}
                      className="text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
