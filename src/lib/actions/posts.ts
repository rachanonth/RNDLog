"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function parseDate(formData: FormData): Date {
  const str = formData.get("publishedAt") as string;
  const d = str ? new Date(str) : new Date();
  return isNaN(d.getTime()) ? new Date() : d;
}

export async function createPost(formData: FormData): Promise<void> {
  const title = (formData.get("title") as string).trim();
  const slug = (formData.get("slug") as string).trim();
  const excerpt = ((formData.get("excerpt") as string) ?? "").trim();
  const content = (formData.get("content") as string) ?? "";
  const published = formData.get("published") === "on";
  const publishedAt = parseDate(formData);

  const post = await prisma.post.create({
    data: { title, slug, excerpt: excerpt || null, content, published, publishedAt },
  });

  revalidatePath("/");
  revalidatePath("/blog");
  redirect(`/admin/posts/${post.id}/edit`);
}

export async function updatePost(formData: FormData): Promise<void> {
  const id = formData.get("id") as string;
  const title = (formData.get("title") as string).trim();
  const newSlug = (formData.get("slug") as string).trim();
  const excerpt = ((formData.get("excerpt") as string) ?? "").trim();
  const content = (formData.get("content") as string) ?? "";
  const published = formData.get("published") === "on";
  const publishedAt = parseDate(formData);

  // Fetch old slug before updating so we can purge it if it changed
  const existing = await prisma.post.findUnique({ where: { id }, select: { slug: true } });

  await prisma.post.update({
    where: { id },
    data: { title, slug: newSlug, excerpt: excerpt || null, content, published, publishedAt },
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${newSlug}`);
  // If the slug changed, also purge the old URL
  if (existing && existing.slug !== newSlug) {
    revalidatePath(`/blog/${existing.slug}`);
  }
}

export async function deletePost(formData: FormData): Promise<void> {
  const id = formData.get("id") as string;
  const post = await prisma.post.findUnique({
    where: { id },
    select: { slug: true },
  });

  await prisma.post.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/blog");
  if (post?.slug) revalidatePath(`/blog/${post.slug}`);

  redirect("/admin/posts");
}
