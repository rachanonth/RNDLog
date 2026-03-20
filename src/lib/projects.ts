import { prisma } from "@/lib/prisma";

export function getAllProjects() {
  return prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

export function getProjectById(id: string) {
  return prisma.project.findUnique({ where: { id } });
}
