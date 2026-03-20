import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PostEditor from "@/components/admin/PostEditor";

export const metadata: Metadata = { title: "Edit Post — Admin" };

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      published: true,
      publishedAt: true,
    },
  });

  if (!post) notFound();

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin/posts"
          className="text-xs tracking-widest uppercase text-stone-400 hover:text-stone-600 transition-colors"
        >
          ← Posts
        </Link>
        <span className="text-stone-200">/</span>
        <h1 className="text-xl font-semibold text-stone-900 truncate">
          {post.title}
        </h1>
        {post.published && (
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            className="text-xs text-stone-400 hover:text-stone-600 transition-colors ml-auto flex-shrink-0"
          >
            View live ↗
          </Link>
        )}
      </div>

      <div className="bg-white border border-stone-200 rounded-lg p-6">
        <PostEditor post={post} />
      </div>
    </div>
  );
}
