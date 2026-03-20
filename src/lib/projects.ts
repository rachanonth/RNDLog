import { prisma } from "@/lib/prisma";

const ORDER = { orderBy: [{ order: "asc" as const }, { createdAt: "desc" as const }] };

export function getAllProjects() {
  return prisma.project.findMany(ORDER);
}

export function getListProjects() {
  return prisma.project.findMany({ where: { displayType: "LIST" }, ...ORDER });
}

export function getWidgetProjects() {
  return prisma.project.findMany({ where: { displayType: "WIDGET" }, ...ORDER });
}

export function getFeaturedProjects() {
  return prisma.project.findMany({ where: { featured: true }, ...ORDER });
}

export function getProjectById(id: string) {
  return prisma.project.findUnique({ where: { id } });
}
