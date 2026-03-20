import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolById } from "@/lib/tools";
import ToolEditor from "@/components/admin/ToolEditor";

export const metadata: Metadata = { title: "Edit Tool — Admin" };

export default async function EditToolPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tool = await getToolById(id);

  if (!tool) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold text-stone-900 mb-8">
        Edit — {tool.name}
      </h1>
      <ToolEditor tool={tool} />
    </div>
  );
}
