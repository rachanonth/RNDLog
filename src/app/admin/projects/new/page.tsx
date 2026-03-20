import type { Metadata } from "next";
import ProjectEditor from "@/components/admin/ProjectEditor";

export const metadata: Metadata = { title: "New Project — Admin" };

export default function NewProjectPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold text-stone-900 mb-8">New project</h1>
      <ProjectEditor />
    </div>
  );
}
