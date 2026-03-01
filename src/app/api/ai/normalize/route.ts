import { NextRequest, NextResponse } from "next/server";
import { callAI, fallbackNormalize } from "@/lib/ai";
import { getCurrentUser } from "@/lib/session";
import { getVehicleSummaryForPrompt } from "@/data/vehicles";

function buildNormalizePrompt(): string {
  const vehicleSummary = getVehicleSummaryForPrompt();
  return `Eres un asistente especializado en repuestos y partes de automóviles en Venezuela. Tu trabajo es normalizar y estructurar la información que un vendedor ingresa en lenguaje natural sobre una parte solicitada por un cliente.

Debes extraer y normalizar la siguiente información del texto del vendedor:

1. partName: Nombre estandarizado de la parte/repuesto (en español, capitalizado correctamente)
2. partCategory: Categoría de la parte. Usa SOLO una de estas categorías: Frenos, Motor, Suspensión, Transmisión, Eléctrico, Carrocería, Refrigeración, Escape, Dirección, Aceites y Filtros, Neumáticos, Accesorios, General
3. brand: Marca del vehículo (capitalizada correctamente, ej: "Toyota", "Chevrolet")
4. model: Modelo del vehículo (capitalizado correctamente, usa el nombre oficial del listado abajo)
5. version: Versión o trim del vehículo si se menciona (ej: "LX", "Sport", "4x4")
6. year: Año del vehículo (número entero, o null si no se menciona)
7. additionalNotes: Cualquier información adicional relevante que no encaje en los campos anteriores

IMPORTANTE: Usa este listado de vehículos conocidos en Venezuela para normalizar correctamente marca y modelo. Si el vendedor usa un apodo o nombre popular (ej: "machito", "samuray", "la marronera"), identifica el vehículo correcto.

${vehicleSummary}

Responde ÚNICAMENTE con un objeto JSON válido con estos campos. Si algún dato no está disponible, usa null.
No agregues explicaciones ni texto adicional, solo el JSON.`;
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { rawInput } = await req.json();

  if (!rawInput || typeof rawInput !== "string") {
    return NextResponse.json(
      { error: "Se requiere el campo rawInput" },
      { status: 400 }
    );
  }

  const aiResponse = await callAI({
    systemPrompt: buildNormalizePrompt(),
    userMessage: rawInput,
  });

  if (aiResponse.error) {
    // Fall back to rule-based normalization
    const fallback = fallbackNormalize(rawInput);
    return NextResponse.json({
      ...fallback,
      _aiUsed: false,
      _fallbackReason: aiResponse.error,
    });
  }

  try {
    const parsed = JSON.parse(aiResponse.content);
    return NextResponse.json({
      partName: parsed.partName || null,
      partCategory: parsed.partCategory || "General",
      brand: parsed.brand || null,
      model: parsed.model || null,
      version: parsed.version || null,
      year: parsed.year || null,
      additionalNotes: parsed.additionalNotes || null,
      _aiUsed: true,
    });
  } catch {
    const fallback = fallbackNormalize(rawInput);
    return NextResponse.json({
      ...fallback,
      _aiUsed: false,
      _fallbackReason: "Error parsing AI response",
    });
  }
}
