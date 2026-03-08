import { NextRequest, NextResponse } from "next/server";
import { callAI, fallbackNormalize } from "@/lib/ai";
import { getCurrentUser } from "@/lib/session";
import { getVehicleSummaryForPrompt } from "@/data/vehicles";
import { getPartsSummaryForPrompt, PART_CATEGORIES } from "@/data/parts";

function buildNormalizePrompt(): string {
  const vehicleSummary = getVehicleSummaryForPrompt();
  const partsSummary = getPartsSummaryForPrompt();
  const categoriesList = PART_CATEGORIES.join(", ");

  return `Eres un asistente especializado en repuestos y partes de automóviles en Venezuela. Tu trabajo es normalizar y estructurar la información que un vendedor ingresa en lenguaje natural sobre una parte solicitada por un cliente.

Los vendedores en Venezuela usan jerga local para referirse a las partes. Por ejemplo:
- "la pila" = Bomba de gasolina
- "el caucho" = Neumático
- "las banditas" = Zapatas de freno
- "la empacadura del cabezote" = Junta de culata
- "el bomper" = Parachoques
- "la guaya del clutch" = Cable de embrague
- "el electro" = Electroventilador
- "las conchas de biela" = Cojinetes de biela
- "la meseta" = Brazo de control
- "la correa de tiempo" = Correa de distribución
- "las plumas" = Cuchillas de limpiaparabrisas
- "el hidrovac" = Servofreno / Booster

Debes extraer y normalizar la siguiente información:

1. partName: Nombre técnico estandarizado de la parte (en español, capitalizado). NO incluyas marca, modelo o año — solo el nombre del repuesto. Traduce la jerga venezolana al nombre técnico correcto.
2. partCategory: Categoría. Usa SOLO una de estas: ${categoriesList}
3. brand: Marca del vehículo (capitalizada, ej: "Toyota", "Chevrolet")
4. model: Modelo del vehículo (capitalizado, usa el nombre oficial)
5. version: Versión o trim (ej: "LX", "Sport", "4x4")
6. year: Año del vehículo (número entero, o null)
7. additionalNotes: Información adicional relevante

CATÁLOGO DE PARTES VENEZOLANO (nombre venezolano → nombre técnico):
${partsSummary}

VEHÍCULOS CONOCIDOS EN VENEZUELA:
${vehicleSummary}

Responde ÚNICAMENTE con un objeto JSON válido. Si algún dato no está disponible, usa null.
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
