import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const sedeId = searchParams.get("sedeId");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "50");
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};

  if (user.role === "regular" && user.sedeId) {
    where.sedeId = user.sedeId;
  } else if (sedeId) {
    where.sedeId = sedeId;
  }

  const [parts, total] = await Promise.all([
    prisma.partRequest.findMany({
      where,
      include: { sede: true, user: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.partRequest.count({ where }),
  ]);

  return NextResponse.json({ parts, total, page, limit });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const body = await req.json();
  const {
    rawInput,
    partName,
    partCategory,
    brand,
    model,
    version,
    year,
    additionalNotes,
    normalizedData,
    sedeId,
  } = body;

  if (!rawInput) {
    return NextResponse.json(
      { error: "El campo de descripción es requerido" },
      { status: 400 }
    );
  }

  const effectiveSedeId =
    user.role === "admin" ? sedeId || user.sedeId : user.sedeId;

  if (!effectiveSedeId) {
    return NextResponse.json(
      { error: "No se pudo determinar la sede" },
      { status: 400 }
    );
  }

  const part = await prisma.partRequest.create({
    data: {
      rawInput,
      partName: partName || null,
      partCategory: partCategory || null,
      brand: brand || null,
      model: model || null,
      version: version || null,
      year: year ? parseInt(year) : null,
      additionalNotes: additionalNotes || null,
      normalizedData: normalizedData
        ? JSON.stringify(normalizedData)
        : null,
      sedeId: effectiveSedeId,
      userId: user.id,
    },
    include: { sede: true },
  });

  return NextResponse.json(part, { status: 201 });
}
