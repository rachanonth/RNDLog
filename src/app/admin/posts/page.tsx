import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeletePostButton from "@/components/admin/DeletePostButton";

export const metadata: Metadata = { title: "Posts — Admin" };

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      published: true,
      publishedAt: true,
    },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-stone-900">Posts</h1>
          <p className="mt-1 text-sm text-stone-500">
            {posts.length} post{posts.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="px-4 py-2 bg-stone-900 text-white text-sm rounded-md hover:bg-stone-700 transition-colors"
        >
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-lg p-12 text-center">
          <p className="text-stone-400 text-sm">No posts yet.</p>
          <Link
            href="/admin/posts/new"
            className="mt-3 inline-block text-sm text-stone-600 underline underline-offset-2"
          >
            Create your first post →
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-stone-200 rounded-lg divide-y divide-stone-100">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between px-5 py-4 gap-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      post.published ? "bg-emerald-400" : "bg-stone-300"
                    }`}
                  />
                  <span className="text-sm font-medium text-stone-900 truncate">
                    {post.title}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-stone-400 font-mono ml-3.5">
                  /blog/{post.slug}
                </p>
              </div>

              <div className="flex items-center gap-5 flex-shrink-0">
                <time className="text-xs text-stone-400 hidden sm:block">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
                >
                  Edit
                </Link>
                <DeletePostButton postId={post.id} postTitle={post.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
