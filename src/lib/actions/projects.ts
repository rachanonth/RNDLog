"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { ProjectDisplayType } from "@prisma/client";

function parseFields(formData: FormData) {
  return {
    name: (formData.get("name") as string).trim(),
    description: ((formData.get("description") as string) ?? "").trim() || null,
    url: ((formData.get("url") as string) ?? "").trim() || null,
    githubUrl: ((formData.get("githubUrl") as string) ?? "").trim() || null,
    stack: ((formData.get("stack") as string) ?? "").trim() || null,
    icon: ((formData.get("icon") as string) ?? "").trim() || null,
    displayType: (formData.get("displayType") as ProjectDisplayType) ?? "LIST",
    featured: formData.get("featured") === "on",
    order: parseInt((formData.get("order") as string) ?? "0", 10) || 0,
  };
}

function revalidateAll() {
  revalidatePath("/");          // homepage shows featured projects
  revalidatePath("/projects");
}

export async function createProject(formData: FormData): Promise<void> {
  const data = parseFields(formData);
  const project = await prisma.project.create({ data });
  revalidateAll();
  redirect(`/admin/projects/${project.id}/edit`);
}

export async function updateProject(formData: FormData): Promise<void> {
  const id = formData.get("id") as string;
  const data = parseFields(formData);
  await prisma.project.update({ where: { id }, data });
  revalidateAll();
}

export async function deleteProject(formData: FormData): Promise<void> {
  const id = formData.get("id") as string;
  await prisma.project.delete({ where: { id } });
  revalidateAll();
  redirect("/admin/projects");
}
