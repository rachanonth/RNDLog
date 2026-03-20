"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function parseFields(formData: FormData) {
  return {
    name: (formData.get("name") as string).trim(),
    description: ((formData.get("description") as string) ?? "").trim() || null,
    link: (formData.get("link") as string).trim(),
    category: ((formData.get("category") as string) ?? "").trim() || null,
    icon: ((formData.get("icon") as string) ?? "").trim() || null,
    visible: formData.get("visible") === "on",
    order: parseInt((formData.get("order") as string) ?? "0", 10) || 0,
  };
}

export async function createTool(formData: FormData): Promise<void> {
  const data = parseFields(formData);
  const tool = await prisma.externalTool.create({ data });
  revalidatePath("/uses");
  redirect(`/admin/tools/${tool.id}/edit`);
}

export async function updateTool(formData: FormData): Promise<void> {
  const id = formData.get("id") as string;
  const data = parseFields(formData);
  await prisma.externalTool.update({ where: { id }, data });
  revalidatePath("/uses");
}

export async function deleteTool(formData: FormData): Promise<void> {
  const id = formData.get("id") as string;
  await prisma.externalTool.delete({ where: { id } });
  revalidatePath("/uses");
  redirect("/admin/tools");
}
