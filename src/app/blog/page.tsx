import type { Metadata } from "next";
import Link from "next/link";
import { getAllPublishedPosts } from "@/lib/posts";

export const metadata: Metadata = { title: "All Posts" };

export const revalidate = false;

export default async function BlogIndexPage() {
  const posts = await getAllPublishedPosts();

  return (
    <div>
      <h1 className="font-serif text-3xl text-stone-900 dark:text-stone-100 mb-8">All Posts</h1>

      {posts.length === 0 ? (
        <p className="text-stone-400 dark:text-stone-500 text-sm">No posts published yet.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.id}>
              <article>
                <time className="text-xs tracking-widest uppercase text-stone-400 dark:text-stone-500 font-sans">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2 className="mt-1 font-serif text-xl text-stone-900 dark:text-stone-100">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-stone-500 dark:hover:text-stone-400 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                {post.excerpt && (
                  <p className="mt-1 text-sm text-stone-500 dark:text-stone-400 leading-relaxed font-sans">
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
