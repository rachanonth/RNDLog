"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession } from "@/lib/auth";

export async function login(
  _prev: { error: string } | null,
  formData: FormData
): Promise<{ error: string } | null> {
  const code = formData.get("code") as string;

  if (!code || code !== process.env.ADMIN_ACCESS_CODE) {
    return { error: "Invalid access code." };
  }

  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}
