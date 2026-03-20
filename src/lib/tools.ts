import { prisma } from "@/lib/prisma";

const ORDER = { orderBy: [{ order: "asc" as const }, { createdAt: "asc" as const }] };

export function getAllTools() {
  return prisma.externalTool.findMany(ORDER);
}

export function getToolById(id: string) {
  return prisma.externalTool.findUnique({ where: { id } });
}
