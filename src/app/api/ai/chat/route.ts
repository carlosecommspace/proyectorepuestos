import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { callAIText } from "@/lib/ai";
import { getCurrentUser } from "@/lib/session";

const CHAT_SYSTEM_PROMPT = `Eres un asistente analítico para una tienda de repuestos de automóviles. Te proporcionaré datos agregados sobre las solicitudes de partes que los clientes han pedido y que no teníamos disponibles.

Tu trabajo es:
1. Analizar los datos proporcionados
2. Responder preguntas sobre tendencias, demanda y recomendaciones
3. Dar recomendaciones sobre qué partes comprar
4. Identificar patrones de demanda por sede, marca, categoría, etc.

Responde siempre en español, de forma clara y profesional. Usa datos concretos y porcentajes cuando sea posible.
Si te hacen una pregunta que no puedes responder con los datos disponibles, indícalo claramente.`;

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { message } = await req.json();

  if (!message || typeof message !== "string") {
    return NextResponse.json(
      { error: "Se requiere el campo message" },
      { status: 400 }
    );
  }

  // Gather summary data for context
  const allParts = await prisma.partRequest.findMany({
    include: { sede: true },
  });

  const sedes = await prisma.sede.findMany();

  const byCategory: Record<string, number> = {};
  const byBrand: Record<string, number> = {};
  const bySede: Record<string, number> = {};

  for (const part of allParts) {
    const cat = part.partCategory || "Sin categoría";
    byCategory[cat] = (byCategory[cat] || 0) + 1;

    const brand = part.brand || "Sin marca";
    byBrand[brand] = (byBrand[brand] || 0) + 1;

    const sede = part.sede.name;
    bySede[sede] = (bySede[sede] || 0) + 1;
  }

  const topParts: Record<string, number> = {};
  for (const part of allParts) {
    const key = part.partName || part.rawInput.substring(0, 50);
    topParts[key] = (topParts[key] || 0) + 1;
  }

  const sortedTopParts = Object.entries(topParts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 30);

  const dataContext = `
DATOS ACTUALES DE SOLICITUDES DE REPUESTOS:
- Total de solicitudes: ${allParts.length}
- Sedes: ${sedes.map((s) => s.name).join(", ")}

POR CATEGORÍA:
${Object.entries(byCategory)
  .sort(([, a], [, b]) => b - a)
  .map(([k, v]) => `  ${k}: ${v} solicitudes`)
  .join("\n")}

POR MARCA DE VEHÍCULO:
${Object.entries(byBrand)
  .sort(([, a], [, b]) => b - a)
  .map(([k, v]) => `  ${k}: ${v} solicitudes`)
  .join("\n")}

POR SEDE:
${Object.entries(bySede)
  .map(([k, v]) => `  ${k}: ${v} solicitudes`)
  .join("\n")}

TOP PARTES MÁS SOLICITADAS:
${sortedTopParts.map(([k, v]) => `  ${k}: ${v} veces`).join("\n")}

ÚLTIMAS 20 SOLICITUDES:
${allParts
  .slice(0, 20)
  .map(
    (p) =>
      `  - ${p.partName || p.rawInput.substring(0, 40)} | ${p.brand || "?"} ${p.model || ""} ${p.year || ""} | Sede: ${p.sede.name}`
  )
  .join("\n")}
`;

  const aiResponse = await callAIText({
    systemPrompt: CHAT_SYSTEM_PROMPT + "\n\n" + dataContext,
    userMessage: message,
  });

  if (aiResponse.error) {
    return NextResponse.json({
      response:
        "No se pudo conectar con el servicio de IA. Asegúrate de que Ollama esté corriendo o que la API esté configurada correctamente.\n\nError: " +
        aiResponse.error,
      _aiUsed: false,
    });
  }

  return NextResponse.json({
    response: aiResponse.content,
    _aiUsed: true,
  });
}
