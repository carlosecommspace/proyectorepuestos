import { NextRequest, NextResponse } from "next/server";
import { callAI, fallbackNormalize } from "@/lib/ai";
import { getCurrentUser } from "@/lib/session";
import { getVehicleSummaryForPrompt } from "@/data/vehicles";

function buildNormalizePrompt(): string {
  const vehicleSummary = getVehicleSummaryForPrompt();
  return `Eres un asistente especializado en repuestos y partes de automóviles en Venezuela. Tu trabajo es normalizar y estructurar la información que un vendedor ingresa en lenguaje natural sobre una parte solicitada por un cliente.

Debes extraer y normalizar la siguiente información del texto del vendedor:

1. partName: Nombre estandarizado de la parte/repuesto (en español, capitalizado correctamente). NO incluyas la marca, modelo o año en este campo — solo el nombre del repuesto.
2. partCategory: Categoría de la parte. Usa SOLO una de estas categorías: Frenos, Motor, Suspensión, Transmisión, Eléctrico, Carrocería, Refrigeración, Escape, Dirección, Aceites y Filtros, Neumáticos, Accesorios, General
3. brand: Marca del vehículo (capitalizada correctamente, ej: "Toyota", "Chevrolet")
4. model: Modelo del vehículo (capitalizado correctamente, usa el nombre oficial del listado abajo)
5. version: Versión o trim del vehículo si se menciona (ej: "LX", "Sport", "4x4")
6. year: Año del vehículo (número entero, o null si no se menciona)
7. additionalNotes: Cualquier información adicional relevante que no encaje en los campos anteriores

IMPORTANTE: Usa este listado de vehículos conocidos en Venezuela para normalizar correctamente marca y modelo. Si el vendedor usa un apodo o nombre popular (ej: "machito", "samuray", "la marronera"), identifica el vehículo correcto.

${vehicleSummary}

Responde ÚNICAMENTE con un objeto JSON válido con estos campos. Si algún dato no está disponible, usa null.
No agregues explicaciones, texto adicional, ni bloques de código markdown. Solo el JSON puro.

Ejemplo de respuesta correcta:
{"partName":"Pastillas de freno delanteras","partCategory":"Frenos","brand":"Toyota","model":"Corolla","version":"SE","year":2019,"additionalNotes":null}`;
}

/**
 * Extracts JSON from an AI response that might contain markdown code fences
 * or surrounding text.
 */
function extractJSON(text: string): Record<string, unknown> {
  // Try direct parse first
  try {
    return JSON.parse(text);
  } catch {
    // Continue to extraction attempts
  }

  // Try extracting from markdown code fence
  const fenceMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
  if (fenceMatch) {
    try {
      return JSON.parse(fenceMatch[1]);
    } catch {
      // Continue
    }
  }

  // Try finding first { ... } block
  const braceMatch = text.match(/\{[\s\S]*\}/);
  if (braceMatch) {
    try {
      return JSON.parse(braceMatch[0]);
    } catch {
      // Continue
    }
  }

  throw new Error("No valid JSON found in AI response");
}

/**
 * Merge AI result with fallback to fill in any missing fields.
 * If AI detected something, keep it. If AI missed something the
 * fallback caught, use the fallback value.
 */
function mergeWithFallback(
  aiResult: Record<string, unknown>,
  rawInput: string
): Record<string, unknown> {
  const fb = fallbackNormalize(rawInput);
  return {
    partName: aiResult.partName || fb.partName,
    partCategory: aiResult.partCategory || fb.partCategory || "General",
    brand: aiResult.brand || fb.brand,
    model: aiResult.model || fb.model,
    version: aiResult.version || fb.version,
    year: aiResult.year || fb.year,
    additionalNotes: aiResult.additionalNotes || fb.additionalNotes,
  };
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
    console.log("[normalize] AI error, using fallback:", aiResponse.error);
    const fallback = fallbackNormalize(rawInput);
    return NextResponse.json({
      ...fallback,
      _aiUsed: false,
    });
  }

  try {
    const parsed = extractJSON(aiResponse.content);
    // Merge with fallback to fill any gaps the AI missed
    const merged = mergeWithFallback(parsed, rawInput);
    return NextResponse.json({
      ...merged,
      _aiUsed: true,
    });
  } catch {
    console.log("[normalize] JSON parse failed, using fallback. Raw AI response:", aiResponse.content?.substring(0, 200));
    const fallback = fallbackNormalize(rawInput);
    return NextResponse.json({
      ...fallback,
      _aiUsed: false,
    });
  }
}
