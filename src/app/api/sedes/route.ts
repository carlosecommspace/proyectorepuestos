import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const sedes = await prisma.sede.findMany({
    orderBy: { name: "asc" },
  });

  return NextResponse.json(sedes);
}
