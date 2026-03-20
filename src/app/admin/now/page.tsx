import type { Metadata } from "next";
import { getNowPage } from "@/lib/posts";
import NowEditor from "@/components/admin/NowEditor";

export const metadata: Metadata = { title: "Edit Now Page — Admin" };

export default async function AdminNowPage() {
  const now = await getNowPage();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-stone-900">Now Page</h1>
        <p className="mt-1 text-sm text-stone-500">
          Edits go live on the homepage within 60 seconds.{" "}
          <code className="font-mono text-xs bg-stone-100 px-1 py-0.5 rounded">
            updatedAt
          </code>{" "}
          refreshes automatically on save.
        </p>
      </div>

      <div className="bg-white border border-stone-200 rounded-lg p-6">
        <NowEditor now={now} />
      </div>
    </div>
  );
}
