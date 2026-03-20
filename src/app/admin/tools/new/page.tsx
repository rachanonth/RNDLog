import type { Metadata } from "next";
import ToolEditor from "@/components/admin/ToolEditor";

export const metadata: Metadata = { title: "Add Tool — Admin" };

export default function NewToolPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold text-stone-900 mb-8">Add tool</h1>
      <ToolEditor />
    </div>
  );
}
