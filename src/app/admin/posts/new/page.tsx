import type { Metadata } from "next";
import Link from "next/link";
import PostEditor from "@/components/admin/PostEditor";

export const metadata: Metadata = { title: "New Post — Admin" };

export default function NewPostPage() {
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
        <h1 className="text-xl font-semibold text-stone-900">New Post</h1>
      </div>

      <div className="bg-white border border-stone-200 rounded-lg p-6">
        <PostEditor />
      </div>
    </div>
  );
}
