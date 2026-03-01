import { VEHICLE_DATABASE, VEHICLE_ALIASES } from "@/data/vehicles";
import { PARTS_CATALOG, VENEZUELAN_GLOSSARY } from "@/data/parts";

const AI_PROVIDER = process.env.AI_PROVIDER || "ollama";

interface AIRequestOptions {
  systemPrompt: string;
  userMessage: string;
}

interface AIResponse {
  content: string;
  error?: string;
}

async function callClaude(options: AIRequestOptions): Promise<AIResponse> {
  const model = process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001";
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return { content: "", error: "ANTHROPIC_API_KEY not configured" };
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 1024,
        system: options.systemPrompt,
        messages: [
          { role: "user", content: options.userMessage },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || "";
    return { content: text };
  } catch (error) {
    console.error("Anthropic error:", error);
    return {
      content: "",
      error: `Error with Anthropic API: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

async function callClaudeText(options: AIRequestOptions): Promise<AIResponse> {
  return callClaude(options);
}

async function callOllama(options: AIRequestOptions): Promise<AIResponse> {
  const baseUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
  const model = process.env.OLLAMA_MODEL || "llama3";

  try {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: options.systemPrompt },
          { role: "user", content: options.userMessage },
        ],
        stream: false,
        format: "json",
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.status}`);
    }

    const data = await response.json();
    return { content: data.message?.content || "" };
  } catch (error) {
    console.error("Ollama error:", error);
    return {
      content: "",
      error: `Error connecting to Ollama: ${error instanceof Error ? error.message : "Unknown error"}. Make sure Ollama is running.`,
    };
  }
}

async function callOpenAI(options: AIRequestOptions): Promise<AIResponse> {
  const baseUrl =
    process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
  const model = process.env.OPENAI_MODEL || "gpt-3.5-turbo";
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return { content: "", error: "OPENAI_API_KEY not configured" };
  }

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: options.systemPrompt },
          { role: "user", content: options.userMessage },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI error: ${response.status}`);
    }

    const data = await response.json();
    return { content: data.choices?.[0]?.message?.content || "" };
  } catch (error) {
    console.error("OpenAI error:", error);
    return {
      content: "",
      error: `Error with OpenAI API: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

export async function callAI(options: AIRequestOptions): Promise<AIResponse> {
  if (AI_PROVIDER === "openai") {
    return callOpenAI(options);
  }
  if (AI_PROVIDER === "claude") {
    return callClaude(options);
  }
  return callOllama(options);
}

async function callOllamaText(options: AIRequestOptions): Promise<AIResponse> {
  const baseUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
  const model = process.env.OLLAMA_MODEL || "llama3";

  try {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: options.systemPrompt },
          { role: "user", content: options.userMessage },
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.status}`);
    }

    const data = await response.json();
    return { content: data.message?.content || "" };
  } catch (error) {
    console.error("Ollama error:", error);
    return {
      content: "",
      error: `Error connecting to Ollama: ${error instanceof Error ? error.message : "Unknown error"}. Make sure Ollama is running.`,
    };
  }
}

async function callOpenAIText(options: AIRequestOptions): Promise<AIResponse> {
  const baseUrl =
    process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
  const model = process.env.OPENAI_MODEL || "gpt-3.5-turbo";
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return { content: "", error: "OPENAI_API_KEY not configured" };
  }

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: options.systemPrompt },
          { role: "user", content: options.userMessage },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI error: ${response.status}`);
    }

    const data = await response.json();
    return { content: data.choices?.[0]?.message?.content || "" };
  } catch (error) {
    console.error("OpenAI error:", error);
    return {
      content: "",
      error: `Error with OpenAI API: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

export async function callAIText(
  options: AIRequestOptions
): Promise<AIResponse> {
  if (AI_PROVIDER === "openai") {
    return callOpenAIText(options);
  }
  if (AI_PROVIDER === "claude") {
    return callClaudeText(options);
  }
  return callOllamaText(options);
}

export function isAIConfigured(): boolean {
  if (AI_PROVIDER === "openai") {
    return !!process.env.OPENAI_API_KEY;
  }
  if (AI_PROVIDER === "claude") {
    return !!process.env.ANTHROPIC_API_KEY;
  }
  return true; // Ollama just needs to be running
}

export function fallbackNormalize(rawInput: string) {
  const input = rawInput.toLowerCase();

  // --- 1. Try matching against the Venezuelan parts catalog ---
  let matchedPart: { technicalName: string; category: string } | null = null;

  // First try glossary terms (multi-word Venezuelan slang)
  for (const g of VENEZUELAN_GLOSSARY) {
    if (input.includes(g.term.toLowerCase())) {
      matchedPart = { technicalName: g.technicalMeaning, category: "" };
      // Find the category from the catalog if possible
      const catalogMatch = PARTS_CATALOG.find(
        (p) => p.technicalName.toLowerCase().includes(g.technicalMeaning.toLowerCase().split("/")[0].trim().toLowerCase())
          || p.venezuelanName.toLowerCase().includes(g.term.toLowerCase())
      );
      if (catalogMatch) {
        matchedPart = { technicalName: catalogMatch.technicalName, category: catalogMatch.category };
      }
      break;
    }
  }

  // Then try matching search tags from the parts catalog
  if (!matchedPart) {
    let bestMatch: { part: typeof PARTS_CATALOG[0]; score: number } | null = null;
    for (const part of PARTS_CATALOG) {
      let score = 0;
      for (const tag of part.searchTags) {
        if (input.includes(tag.toLowerCase())) {
          score += tag.length; // longer tags are more specific matches
        }
      }
      // Also check Venezuelan name fragments
      const veNames = part.venezuelanName.toLowerCase().split("/").map((s) => s.trim());
      for (const vn of veNames) {
        const cleanVn = vn.replace(/^(el|la|los|las|un|una)\s+/i, "");
        if (cleanVn.length > 3 && input.includes(cleanVn)) {
          score += cleanVn.length * 2; // Venezuelan name matches are strong
        }
      }
      if (score > 0 && (!bestMatch || score > bestMatch.score)) {
        bestMatch = { part, score };
      }
    }
    if (bestMatch) {
      matchedPart = { technicalName: bestMatch.part.technicalName, category: bestMatch.part.category };
    }
  }

  // --- 2. Category detection (extended with Venezuelan terms) ---
  const knownCategories: Record<string, string[]> = {
    Frenos: ["pastilla", "disco de freno", "freno", "caliper", "mordaza", "balata", "tambor", "banditas", "zapatas", "bombin", "hidrovac", "booster", "abs", "bomba de freno"],
    Motor: [
      "bujia", "bujía", "filtro aceite", "filtro de aceite", "motor",
      "pistón", "piston", "biela", "culata", "empaque", "junta", "válvula",
      "valvula", "árbol de levas", "cigüeñal", "empacadura", "cabezote",
      "block", "bloque", "concha", "anillos", "rings", "taquete", "taqué",
      "estopera", "pata de motor", "carter", "turbo",
    ],
    Suspensión: [
      "amortiguador", "resorte", "rótula", "rotula", "barra estabilizadora",
      "brazo de control", "bujes", "buje", "suspensión", "suspension",
      "meseta", "espiga", "espiral", "rolinera de la espiga", "ballesta",
      "muelle", "link",
    ],
    "Transmisión y Embrague": [
      "embrague", "clutch", "croche", "caja sincrónica", "caja de cambios",
      "transmisión", "transmision", "cardán", "cardan", "sincronizador",
      "sincrónico", "sincronico", "tripoide", "punta de eje", "fuelle",
      "prensa", "balinera", "guaya del clutch", "bomba de clutch",
      "turbina", "bandas de la caja", "palier", "cruceta",
    ],
    "Sistema Eléctrico": [
      "alternador", "arranque", "batería", "bateria", "bobina", "faro",
      "bombillo", "fusible", "relé", "rele", "relay", "ramal", "arnés",
      "bendix", "automático del arranque", "estárter", "estarter", "switch",
    ],
    Iluminación: ["faro", "farola", "stop", "calavera", "direccional", "cocuyo", "antiniebla", "plafonera", "bombillo", "luz"],
    Carrocería: [
      "parachoque", "bomper", "guardafango", "capó", "capo", "bonete",
      "puerta", "vidrio", "espejo", "retrovisor", "compuerta", "defensa",
      "parabrisas", "luneta", "pluma", "limpia", "tablero", "guantera",
      "maquinaria del vidrio", "pasador eléctrico", "estribo", "pisadera",
      "parrilla", "manilla", "batea",
    ],
    "Sistema de Enfriamiento": ["radiador", "termostato", "ventilador", "refrigerante", "bomba de agua", "electro", "motoventilador", "envase del agua"],
    Dirección: ["dirección", "direccion", "cremallera", "cajetin", "bomba de la dirección", "volante", "timón", "timon", "terminal de dirección", "bieleta", "brazo pitman", "brazo loco"],
    "Aceites y Filtros": ["aceite", "filtro de aceite", "filtro de aire", "filtro de gasolina", "atf", "refrigerante", "líquido de frenos", "coolant"],
    "Sensores y Electrónica": ["sensor", "ckp", "cmp", "ect", "maf", "tps", "lambda", "manocontacto", "computadora", "ecu", "pcm", "bulbo"],
    "Correas y Cadenas": ["correa de tiempo", "cadena de tiempo", "distribución", "serpentina", "tensor", "correa", "cadena"],
    "Sistema de Combustible": ["inyector", "flauta", "riel", "carburador", "bomba de gasolina", "pila", "tanque", "throttle", "mariposa", "iac", "filtro de gasolina", "gasolina"],
    "Sistema de Climatización": ["aire acondicionado", "a/c", "compresor", "condensador", "evaporador", "blower", "filtro de cabina", "filtro de polen", "gas del aire"],
    Diferencial: ["diferencial", "corona", "semi-eje", "palier"],
    "Sistema 4x4": ["transfer", "reductora", "4x4", "hubs", "manzana libre"],
    "Sistema de Gas": ["gnv", "gas", "bombona"],
    "Ruedas y Neumáticos": ["caucho", "neumático", "neumatico", "rin", "llanta", "rolinera", "rodamiento de rueda", "manzana", "hub"],
    Accesorios: ["radio", "reproductor", "corneta", "parlante", "subwoofer", "pito", "bocina"],
  };

  // --- 3. Search brand and model using vehicle database ---
  let brand: string | null = null;
  let model: string | null = null;

  // First check aliases/nicknames (e.g. "machito", "samuray")
  for (const [alias, ref] of Object.entries(VEHICLE_ALIASES)) {
    if (input.includes(alias)) {
      brand = ref.brand;
      model = ref.model;
      break;
    }
  }

  // If no alias match, search by brand name
  if (!brand) {
    for (const b of VEHICLE_DATABASE) {
      if (input.includes(b.brand.toLowerCase())) {
        brand = b.brand;
        for (const m of b.models) {
          const modelNames = m.model.split("/").map((n: string) => n.trim());
          for (const name of modelNames) {
            if (input.includes(name.toLowerCase())) {
              model = m.model;
              break;
            }
          }
          if (model) break;
        }
        break;
      }
    }
  }

  // If still no brand, try matching model names across all brands
  if (!brand) {
    for (const b of VEHICLE_DATABASE) {
      for (const m of b.models) {
        const modelNames = m.model.split("/").map((n: string) => n.trim());
        for (const name of modelNames) {
          if (name.length > 2 && input.includes(name.toLowerCase())) {
            brand = b.brand;
            model = m.model;
            break;
          }
        }
        if (model) break;
      }
      if (brand) break;
    }
  }

  // --- 4. Determine category ---
  let category: string | null = matchedPart?.category || null;
  if (!category) {
    for (const [cat, keywords] of Object.entries(knownCategories)) {
      for (const kw of keywords) {
        if (input.includes(kw)) {
          category = cat;
          break;
        }
      }
      if (category) break;
    }
  }

  const yearMatch = input.match(/\b(19|20)\d{2}\b/);
  const year = yearMatch ? parseInt(yearMatch[0]) : null;

  // --- 5. Extract part name ---
  let partName = matchedPart?.technicalName || rawInput;

  if (!matchedPart) {
    // Remove vehicle references from the input to get a cleaner part name
    const wordsToRemove: string[] = [];
    if (brand) wordsToRemove.push(brand);
    if (model) {
      model.split("/").forEach((n) => wordsToRemove.push(n.trim()));
    }
    if (yearMatch) wordsToRemove.push(yearMatch[0]);
    for (const [alias, ref] of Object.entries(VEHICLE_ALIASES)) {
      if (input.includes(alias) && ref.brand === brand) {
        wordsToRemove.push(alias);
        break;
      }
    }
    for (const word of wordsToRemove) {
      if (word) {
        partName = partName.replace(new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), "");
      }
    }
    partName = partName
      .replace(/\s+(de|del|para|para el|para la|para un|para una|el|la|un|una)\s*$/i, "")
      .replace(/^\s*(de|del|para|para el|para la|el|la|un|una)\s+/i, "")
      .replace(/\s+/g, " ")
      .trim();
    if (partName) {
      partName = partName.charAt(0).toUpperCase() + partName.slice(1);
    }
  }

  return {
    partName: partName || rawInput.substring(0, 100),
    partCategory: category || "General",
    brand: brand || null,
    model,
    version: null,
    year,
    additionalNotes: null,
  };
}
