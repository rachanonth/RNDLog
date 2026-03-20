import { prisma } from "@/lib/prisma";
import type { NowPage, Post } from "@prisma/client";

/** Fetch the singleton NowPage row */
export async function getNowPage(): Promise<NowPage | null> {
  return prisma.nowPage.findUnique({ where: { id: "singleton" } });
}

/** Fetch the N most recent published posts */
export async function getRecentPosts(
  limit = 3
): Promise<Pick<Post, "id" | "title" | "slug" | "publishedAt" | "excerpt">[]> {
  return prisma.post.findMany({
    where: { published: true },
    select: { id: true, title: true, slug: true, publishedAt: true, excerpt: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

/** Fetch all published posts (for listing page) */
export async function getAllPublishedPosts(): Promise<
  Pick<Post, "id" | "title" | "slug" | "excerpt" | "publishedAt">[]
> {
  return prisma.post.findMany({
    where: { published: true },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      publishedAt: true,
    },
    orderBy: { publishedAt: "desc" },
  });
}

/** Fetch slugs for generateStaticParams */
export async function getAllPublishedSlugs(): Promise<{ slug: string }[]> {
  return prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });
}

/** Fetch a single post by slug */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  return prisma.post.findUnique({
    where: { slug, published: true },
  });
}
