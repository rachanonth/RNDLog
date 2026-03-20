import type { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getNowPage, getRecentPosts } from "@/lib/posts";
import { getFeaturedProjects } from "@/lib/projects";
import { ProjectLinkIcons } from "@/components/ProjectLinks";

export const metadata: Metadata = { title: "Rachanont" };

export const revalidate = false;

export default async function HomePage() {
  const [now, recentPosts, featuredProjects] = await Promise.all([
    getNowPage(),
    getRecentPosts(3),
    getFeaturedProjects(),
  ]);

  return (
    <div className="space-y-16">
      {/* ── Now section ── */}
      <section>
        <h1 className="font-serif text-3xl text-stone-900 dark:text-stone-100 mb-6">
          What I&apos;m doing{" "}
          <span className="relative inline-block">
            now
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0.5 h-3 bg-sky-100 dark:bg-sky-900/50 -z-10 rounded-sm"
            />
          </span>
        </h1>

        {now ? (
          <>
            <div className="text-stone-700 dark:text-stone-300 leading-8 text-[1.0625rem]">
              <ReactMarkdown
                components={{
                  ul: ({ children }) => (
                    <ul className="space-y-2 list-none p-0">{children}</ul>
                  ),
                  li: ({ children }) => (
                    <li className="flex gap-3 items-baseline">
                      <span className="text-stone-400 dark:text-stone-500 select-none flex-shrink-0">
                        »
                      </span>
                      <span>{children}</span>
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-stone-900 dark:text-stone-100">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-stone-600 dark:text-stone-400">{children}</em>
                  ),
                }}
              >
                {now.content}
              </ReactMarkdown>
            </div>
            <p className="mt-6 text-xs tracking-widest uppercase text-stone-400 dark:text-stone-500 font-sans">
              Updated{" "}
              {new Date(now.displayDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              from {now.location}
            </p>
          </>
        ) : (
          <p className="text-stone-400 dark:text-stone-500 text-sm">Nothing here yet.</p>
        )}
      </section>

      <hr className="border-stone-200 dark:border-stone-700" />

      {/* ── Recent Posts section ── */}
      <section>
        <h2 className="font-serif text-xl text-stone-900 dark:text-stone-100 mb-5">
          Recent Posts
        </h2>

        {recentPosts.length === 0 ? (
          <p className="text-stone-400 dark:text-stone-500 text-sm">No posts yet.</p>
        ) : (
          <ul className="space-y-3">
            {recentPosts.map((post) => (
              <li key={post.id} className="flex items-baseline gap-4">
                <time className="text-xs text-stone-400 dark:text-stone-500 font-sans tabular-nums flex-shrink-0 w-28">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-serif text-stone-900 dark:text-stone-100 hover:text-stone-500 dark:hover:text-stone-400 transition-colors"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {recentPosts.length > 0 && (
          <Link
            href="/blog"
            className="mt-6 inline-block text-xs tracking-widest uppercase text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 transition-colors font-sans"
          >
            All posts →
          </Link>
        )}
      </section>

      {/* ── Featured Projects section ── */}
      {featuredProjects.length > 0 && (
        <>
          <hr className="border-stone-200 dark:border-stone-700" />

          <section>
            <h2 className="font-serif text-xl text-stone-900 dark:text-stone-100 mb-5">
              Featured Projects
            </h2>

            <ul className="space-y-6">
              {featuredProjects.map((project) => (
                <li key={project.id} className="flex items-start justify-between gap-6">
                  <div className="min-w-0">
                    <p className="font-serif text-base text-stone-900 dark:text-stone-100">
                      {project.name}
                    </p>
                    {project.description && (
                      <p className="mt-1 text-sm text-stone-500 dark:text-stone-400 leading-relaxed font-sans">
                        {project.description}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0 mt-0.5">
                    <ProjectLinkIcons
                      githubUrl={project.githubUrl}
                      url={project.url}
                      name={project.name}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href="/projects"
              className="mt-6 inline-block text-xs tracking-widest uppercase text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 transition-colors font-sans"
            >
              All projects →
            </Link>
          </section>
        </>
      )}
    </div>
  );
}
