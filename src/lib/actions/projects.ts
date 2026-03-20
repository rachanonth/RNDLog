"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function createProject(formData: FormData): Promise<void> {
  const name = (formData.get("name") as string).trim();
  const description = ((formData.get("description") as string) ?? "").trim();
  const url = ((formData.get("url") as string) ?? "").trim();
  const githubUrl = ((formData.get("githubUrl") as string) ?? "").trim();
  const stack = ((formData.get("stack") as string) ?? "").trim();
  const featured = formData.get("featured") === "on";
  const order = parseInt((formData.get("order") as string) ?? "0", 10) || 0;

  const project = await prisma.project.create({
    data: {
      name,
      description: description || null,
      url: url || null,
      githubUrl: githubUrl || null,
      stack: stack || null,
      featured,
      order,
    },
  });

  revalidatePath("/projects");
  redirect(`/admin/projects/${project.id}/edit`);
}

export async function updateProject(formData: FormData): Promise<void> {
  const id = formData.get("id") as string;
  const name = (formData.get("name") as string).trim();
  const description = ((formData.get("description") as string) ?? "").trim();
  const url = ((formData.get("url") as string) ?? "").trim();
  const githubUrl = ((formData.get("githubUrl") as string) ?? "").trim();
  const stack = ((formData.get("stack") as string) ?? "").trim();
  const featured = formData.get("featured") === "on";
  const order = parseInt((formData.get("order") as string) ?? "0", 10) || 0;

  await prisma.project.update({
    where: { id },
    data: {
      name,
      description: description || null,
      url: url || null,
      githubUrl: githubUrl || null,
      stack: stack || null,
      featured,
      order,
    },
  });

  revalidatePath("/projects");
}

export async function deleteProject(formData: FormData): Promise<void> {
  const id = formData.get("id") as string;

  await prisma.project.delete({ where: { id } });

  revalidatePath("/projects");
  redirect("/admin/projects");
}
