import { prisma } from "@/lib/prisma";

const ORDER = { orderBy: [{ order: "asc" as const }, { createdAt: "asc" as const }] };

/** Public: only visible tools */
export function getAllTools() {
  return prisma.externalTool.findMany({ where: { visible: true }, ...ORDER });
}

/** Admin: all tools regardless of visibility */
export function getAllToolsAdmin() {
  return prisma.externalTool.findMany(ORDER);
}

export function getToolById(id: string) {
  return prisma.externalTool.findUnique({ where: { id } });
}
