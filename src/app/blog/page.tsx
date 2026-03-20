import type { Metadata } from "next";
import Link from "next/link";
import { getAllPublishedPosts } from "@/lib/posts";

export const metadata: Metadata = { title: "All Posts" };

export const revalidate = false;

export default async function BlogIndexPage() {
  const posts = await getAllPublishedPosts();

  return (
    <div>
      <h1 className="font-serif text-3xl text-[#1a1c1a] dark:text-[#faf9f6] mb-8">All Posts</h1>

      {posts.length === 0 ? (
        <p className="text-[#1a1c1a]/60 dark:text-[#faf9f6]/60 text-sm font-sans">No posts published yet.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.id}>
              <article>
                <time className="text-xs tracking-widest uppercase text-[#1a1c1a]/60 dark:text-[#faf9f6]/60 font-serif">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2 className="mt-1 font-serif text-xl text-[#1a1c1a] dark:text-[#faf9f6]">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-[#1a1c1a]/60 dark:hover:text-[#faf9f6]/60 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                {post.excerpt && (
                  <p className="mt-1 text-sm text-[#1a1c1a]/80 dark:text-[#faf9f6]/80 leading-relaxed font-sans">
                    {post.excerpt}
                  </p>
                )}
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
