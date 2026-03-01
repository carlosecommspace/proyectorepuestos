import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  if (user.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const body = await req.json();
  const { status } = body;

  if (!status || !["pending", "reviewed", "purchased", "dismissed"].includes(status)) {
    return NextResponse.json(
      { error: "Estado inválido" },
      { status: 400 }
    );
  }

  const part = await prisma.partRequest.update({
    where: { id: params.id },
    data: { status },
  });

  return NextResponse.json(part);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  if (user.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  await prisma.partRequest.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
