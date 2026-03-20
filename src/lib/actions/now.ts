"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function saveNowPage(formData: FormData): Promise<void> {
  const content = (formData.get("content") as string) ?? "";
  const location = (formData.get("location") as string) ?? "";
  const dateStr = formData.get("displayDate") as string;
  const displayDate = dateStr ? new Date(dateStr) : new Date();

  await prisma.nowPage.upsert({
    where: { id: "singleton" },
    update: { content, location, displayDate },
    create: { id: "singleton", content, location, displayDate },
  });

  revalidatePath("/");
}
