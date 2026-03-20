"use client";

import { useEffect, useState, useTransition } from "react";

type Blob = {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
};

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function BlobRow({ blob, onDeleted }: { blob: Blob; onDeleted: () => void }) {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await fetch("/api/blobs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: blob.url }),
      });
      onDeleted();
    });
  };

  return (
    <div className="flex items-center gap-4 px-5 py-3">
      {/* Thumbnail */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={blob.url}
        alt={blob.pathname}
        className="w-12 h-12 object-cover rounded border border-stone-100 flex-shrink-0 bg-stone-50"
      />

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="text-sm text-stone-800 font-mono truncate">{blob.pathname}</p>
        <p className="text-xs text-stone-400 mt-0.5">
          {formatBytes(blob.size)} ·{" "}
          {new Date(blob.uploadedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <button
          onClick={() => navigator.clipboard.writeText(blob.url)}
          className="text-xs text-stone-400 hover:text-stone-700 transition-colors"
          title="Copy URL"
        >
          Copy URL
        </button>
        <a
          href={blob.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-stone-400 hover:text-stone-700 transition-colors"
        >
          Open ↗
        </a>
        {confirming ? (
          <span className="inline-flex items-center gap-2">
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="text-xs text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
            >
              {isPending ? "Deleting…" : "Yes, delete"}
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="text-xs text-stone-400 hover:text-stone-600"
            >
              Cancel
            </button>
          </span>
        ) : (
          <button
            onClick={() => setConfirming(true)}
            className="text-xs text-stone-400 hover:text-red-500 transition-colors"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default function AdminAssetsPage() {
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchBlobs = async () => {
    const res = await fetch("/api/blobs");
    const data = await res.json();
    setBlobs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlobs();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.set("file", file);
    await fetch("/api/upload", { method: "POST", body: fd });
    e.target.value = "";
    await fetchBlobs();
    setUploading(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-stone-900">Assets</h1>
          {!loading && (
            <p className="mt-1 text-sm text-stone-500">
              {blobs.length} file{blobs.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        <label className={`px-4 py-2 bg-stone-900 text-white text-sm rounded-md hover:bg-stone-700 transition-colors cursor-pointer ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
          {uploading ? "Uploading…" : "Upload image"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>

      {loading ? (
        <p className="text-sm text-stone-400">Loading…</p>
      ) : blobs.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-lg p-12 text-center">
          <p className="text-stone-400 text-sm">No assets uploaded yet.</p>
          <p className="mt-1 text-stone-400 text-xs">
            Upload images here or use the Insert Image button in the post editor.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-stone-200 rounded-lg divide-y divide-stone-100">
          {blobs.map((blob) => (
            <BlobRow
              key={blob.url}
              blob={blob}
              onDeleted={() => setBlobs((prev) => prev.filter((b) => b.url !== blob.url))}
            />
          ))}
        </div>
      )}
    </div>
  );
}
