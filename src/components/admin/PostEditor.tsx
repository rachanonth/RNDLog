"use client";

import { useRef, useState, useTransition } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createPost, updatePost } from "@/lib/actions/posts";
import type { Post } from "@prisma/client";

const inputCls =
  "w-full px-3 py-2 border border-stone-200 rounded-md text-sm text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent placeholder:text-stone-400";

function slugify(val: string) {
  return val
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function toDateInputValue(date: Date | string): string {
  return new Date(date).toISOString().slice(0, 10);
}

type PostEditorProps = {
  post?: Pick<
    Post,
    "id" | "title" | "slug" | "excerpt" | "content" | "published" | "publishedAt"
  >;
};

export default function PostEditor({ post }: PostEditorProps) {
  const isEditing = !!post;

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [published, setPublished] = useState(post?.published ?? false);
  const [publishedAt, setPublishedAt] = useState(
    post?.publishedAt ? toDateInputValue(post.publishedAt) : toDateInputValue(new Date())
  );
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [uploading, setUploading] = useState(false);

  const [isPending, startTransition] = useTransition();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Track cursor position so we can insert at the right spot
  const cursorPosRef = useRef<number>(0);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditing) setSlug(slugify(val));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");

    const fd = new FormData();
    if (isEditing) fd.set("id", post.id);
    fd.set("title", title);
    fd.set("slug", slug);
    fd.set("excerpt", excerpt);
    fd.set("content", content);
    fd.set("publishedAt", publishedAt);
    if (published) fd.set("published", "on");

    startTransition(async () => {
      try {
        if (isEditing) {
          await updatePost(fd);
          setStatus("saved");
          setTimeout(() => setStatus("idle"), 3000);
        } else {
          await createPost(fd);
        }
      } catch {
        setStatus("error");
      }
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fd = new FormData();
      fd.set("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed");

      const { url } = await res.json();
      const snippet = `![${file.name}](${url})`;

      // Insert at saved cursor position
      const pos = cursorPosRef.current;
      setContent((prev) => prev.slice(0, pos) + snippet + prev.slice(pos));

      // Restore focus and move cursor after inserted snippet
      requestAnimationFrame(() => {
        const ta = textareaRef.current;
        if (ta) {
          const newPos = pos + snippet.length;
          ta.focus();
          ta.setSelectionRange(newPos, newPos);
        }
      });
    } catch {
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
      // Reset so the same file can be re-uploaded if needed
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div>
        <label className="block text-xs font-medium text-stone-500 uppercase tracking-widest mb-1.5">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
          placeholder="Post title"
          className={`${inputCls} text-base font-serif`}
        />
      </div>

      {/* Slug + Date + Excerpt row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-stone-500 uppercase tracking-widest mb-1.5">
            Slug
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            placeholder="post-url-slug"
            className={`${inputCls} font-mono`}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-stone-500 uppercase tracking-widest mb-1.5">
            Date
          </label>
          <input
            type="date"
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-stone-500 uppercase tracking-widest mb-1.5">
            Excerpt{" "}
            <span className="normal-case font-normal text-stone-400">(optional)</span>
          </label>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short summary shown on listing"
            className={inputCls}
          />
        </div>
      </div>

      {/* Content editor */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-medium text-stone-500 uppercase tracking-widest">
            Content
          </label>
          <div className="flex items-center gap-2">
            {/* Image upload button */}
            <button
              type="button"
              disabled={uploading || tab === "preview"}
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-stone-500 border border-stone-200 rounded hover:bg-stone-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              title="Upload image and insert at cursor"
            >
              {uploading ? (
                <>
                  <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Uploading…
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  Insert image
                </>
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            {/* Write / Preview toggle */}
            <div className="flex rounded-md border border-stone-200 overflow-hidden text-xs">
              <button
                type="button"
                onClick={() => setTab("write")}
                className={`px-3 py-1 transition-colors ${
                  tab === "write" ? "bg-stone-900 text-white" : "text-stone-500 hover:bg-stone-50"
                }`}
              >
                Write
              </button>
              <button
                type="button"
                onClick={() => setTab("preview")}
                className={`px-3 py-1 transition-colors ${
                  tab === "preview" ? "bg-stone-900 text-white" : "text-stone-500 hover:bg-stone-50"
                }`}
              >
                Preview
              </button>
            </div>
          </div>
        </div>

        {tab === "write" ? (
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onSelect={(e) => {
              cursorPosRef.current = (e.target as HTMLTextAreaElement).selectionStart;
            }}
            onClick={(e) => {
              cursorPosRef.current = (e.target as HTMLTextAreaElement).selectionStart;
            }}
            onKeyUp={(e) => {
              cursorPosRef.current = (e.target as HTMLTextAreaElement).selectionStart;
            }}
            rows={22}
            placeholder="Write your post in Markdown…"
            className={`${inputCls} font-mono text-sm leading-relaxed resize-y`}
          />
        ) : (
          <div className="min-h-[22rem] border border-stone-200 rounded-md p-4 bg-white overflow-auto">
            {content ? (
              <div className="prose prose-stone max-w-none prose-sm prose-headings:font-serif prose-headings:font-bold prose-code:before:content-none prose-code:after:content-none prose-code:bg-stone-100 prose-code:px-1 prose-code:rounded">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
              </div>
            ) : (
              <p className="text-stone-400 text-sm">Nothing to preview yet.</p>
            )}
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div className="flex items-center justify-between pt-2 border-t border-stone-100">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900"
          />
          <span className="text-sm text-stone-600">Publish</span>
        </label>

        <div className="flex items-center gap-3">
          {status === "saved" && (
            <span className="text-sm text-emerald-600">Saved!</span>
          )}
          {status === "error" && (
            <span className="text-sm text-red-500">Something went wrong.</span>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 bg-stone-900 text-white text-sm rounded-md hover:bg-stone-700 transition-colors disabled:opacity-50"
          >
            {isPending ? "Saving…" : isEditing ? "Save changes" : "Create post"}
          </button>
        </div>
      </div>
    </form>
  );
}
