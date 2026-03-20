import type { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getNowPage, getRecentPosts } from "@/lib/posts";

export const metadata: Metadata = { title: "Rachanont" };

export const revalidate = false;

export default async function HomePage() {
  const [now, recentPosts] = await Promise.all([
    getNowPage(),
    getRecentPosts(4),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
      {/* Sidebar: What I'm doing now */}
      <aside className="md:col-span-4 space-y-12">
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            <h2 className="text-sm uppercase tracking-widest font-bold font-serif text-on-surface-variant">
              Now
            </h2>
          </div>
          <div className="bg-surface-container-low dark:bg-[#1a1c1a] p-8 rounded-sm">
            {now ? (
              <ReactMarkdown
                components={{
                  ul: ({ children }) => (
                    <ul className="space-y-6 text-sm font-sans leading-relaxed counter-reset-list list-none p-0">{children}</ul>
                  ),
                  li: ({ children }) => {
                    return (
                      <li className="flex gap-3 relative" style={{ counterIncrement: "list" }}>
                        <span className="text-primary dark:text-[#faf9f6] opacity-30 font-serif">
                          0<span className="before:content-[counter(list)]"></span>
                        </span>
                        <span>{children}</span>
                      </li>
                    );
                  },
                  strong: ({ children }) => (
                    <strong className="font-semibold">{children}</strong>
                  ),
                  em: ({ children }) => <em className="italic">{children}</em>,
                }}
              >
                {now.content}
              </ReactMarkdown>
            ) : (
              <p className="text-sm font-sans text-on-surface-variant">Nothing here yet.</p>
            )}
          </div>
        </section>
      </aside>

      {/* Main Stream: Recent Posts */}
      <section className="md:col-span-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-bold font-serif tracking-tight">Recent Archives</h2>
          <Link
            href="/blog"
            className="text-xs font-serif uppercase tracking-widest border-b border-primary dark:border-[#faf9f6] pb-1 hover:opacity-60 transition-opacity"
          >
            View All
          </Link>
        </div>

        <div className="space-y-16">
          {recentPosts.length === 0 ? (
            <p className="text-sm font-sans text-on-surface-variant">No posts yet.</p>
          ) : (
            recentPosts.map((post) => (
              <article key={post.id} className="group cursor-pointer">
                <Link href={`/blog/${post.slug}`}>
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                    <time className="text-xs font-serif uppercase tracking-widest text-on-surface-variant pt-2 w-24 shrink-0">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "2-digit",
                        month: "short",
                        day: "2-digit",
                      }).replace(/,/g, ', ')}
                    </time>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold font-serif leading-tight group-hover:text-primary dark:group-hover:text-[#faf9f6] transition-colors mb-4">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-on-surface-variant leading-relaxed max-w-xl mb-6">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex gap-4">
                        <span className="text-[10px] font-serif uppercase tracking-widest text-on-surface-variant/40">Philosophy</span>
                        <span className="text-[10px] font-serif uppercase tracking-widest text-on-surface-variant/40">Design</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
