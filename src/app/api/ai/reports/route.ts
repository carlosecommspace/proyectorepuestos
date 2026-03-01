import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const sedeId = searchParams.get("sedeId");
  const dateFrom = searchParams.get("dateFrom");
  const dateTo = searchParams.get("dateTo");

  const where: Record<string, unknown> = {};
  if (sedeId) where.sedeId = sedeId;
  if (dateFrom || dateTo) {
    where.createdAt = {};
    if (dateFrom)
      (where.createdAt as Record<string, unknown>).gte = new Date(dateFrom);
    if (dateTo)
      (where.createdAt as Record<string, unknown>).lte = new Date(dateTo);
  }

  const allParts = await prisma.partRequest.findMany({
    where,
    include: { sede: true },
    orderBy: { createdAt: "desc" },
  });

  // Aggregate by part category
  const byCategory: Record<string, number> = {};
  const byBrand: Record<string, number> = {};
  const bySede: Record<string, number> = {};
  const byMonth: Record<string, number> = {};
  const topParts: Record<string, number> = {};

  for (const part of allParts) {
    const cat = part.partCategory || "Sin categoría";
    byCategory[cat] = (byCategory[cat] || 0) + 1;

    const brand = part.brand || "Sin marca";
    byBrand[brand] = (byBrand[brand] || 0) + 1;

    const sede = part.sede.name;
    bySede[sede] = (bySede[sede] || 0) + 1;

    const month = part.createdAt.toISOString().substring(0, 7);
    byMonth[month] = (byMonth[month] || 0) + 1;

    const partKey = `${part.partName || part.rawInput.substring(0, 50)} - ${part.brand || "?"} ${part.model || ""}`.trim();
    topParts[partKey] = (topParts[partKey] || 0) + 1;
  }

  const sortedTopParts = Object.entries(topParts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20)
    .map(([name, count]) => ({ name, count }));

  return NextResponse.json({
    total: allParts.length,
    byCategory,
    byBrand,
    bySede,
    byMonth,
    topParts: sortedTopParts,
  });
}
