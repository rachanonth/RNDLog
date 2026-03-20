import type { MetadataRoute } from "next";
import { getAllPublishedSlugs } from "@/lib/posts";

const BASE = "https://rachanont.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllPublishedSlugs();

  const posts: MetadataRoute.Sitemap = slugs.map(({ slug }) => ({
    url: `${BASE}/blog/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE}/projects`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/uses`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...posts,
  ];
}
