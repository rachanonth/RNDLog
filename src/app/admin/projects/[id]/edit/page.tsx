import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/projects";
import ProjectEditor from "@/components/admin/ProjectEditor";

export const metadata: Metadata = { title: "Edit Project — Admin" };

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold text-stone-900 mb-8">
        Edit — {project.name}
      </h1>
      <ProjectEditor project={project} />
    </div>
  );
}
