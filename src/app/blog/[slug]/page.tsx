import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPublishedSlugs, getPostBySlug } from "@/lib/posts";

export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export const revalidate = 60;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article>
      {/* Back link */}
      <Link
        href="/"
        className="text-xs tracking-widest uppercase text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 transition-colors font-sans"
      >
        ← Back
      </Link>

      {/* Post header */}
      <header className="mt-8 mb-10">
        <h1 className="font-serif text-4xl leading-tight text-stone-900 dark:text-stone-100">
          {post.title}
        </h1>
        <time className="mt-3 block text-xs tracking-widest uppercase text-stone-400 dark:text-stone-500 font-sans">
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </header>

      <hr className="border-stone-200 dark:border-stone-700 mb-10" />

      {/* Prose content */}
      <div className="prose prose-stone prose-lg max-w-none dark:prose-invert prose-headings:font-serif prose-headings:font-bold prose-a:text-stone-900 dark:prose-a:text-stone-100 prose-a:underline prose-a:underline-offset-2 prose-a:decoration-stone-300 dark:prose-a:decoration-stone-600 hover:prose-a:decoration-stone-600 dark:hover:prose-a:decoration-stone-400 prose-code:font-mono prose-code:text-sm prose-code:bg-stone-100 dark:prose-code:bg-stone-800 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
