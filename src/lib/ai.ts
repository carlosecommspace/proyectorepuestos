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

  const knownBrands = [
    "toyota",
    "chevrolet",
    "ford",
    "honda",
    "hyundai",
    "kia",
    "nissan",
    "mazda",
    "volkswagen",
    "bmw",
    "mercedes",
    "audi",
    "suzuki",
    "mitsubishi",
    "subaru",
    "jeep",
    "dodge",
    "ram",
    "fiat",
    "renault",
    "peugeot",
    "citroën",
    "chery",
    "great wall",
    "jac",
    "mg",
    "byd",
  ];

  const knownCategories: Record<string, string[]> = {
    Frenos: [
      "pastilla",
      "disco",
      "freno",
      "caliper",
      "mordaza",
      "balata",
      "tambor",
    ],
    Motor: [
      "bujia",
      "bujía",
      "filtro aceite",
      "filtro de aceite",
      "correa",
      "motor",
      "pistón",
      "piston",
      "biela",
      "culata",
      "empaque",
      "junta",
      "válvula",
      "valvula",
      "árbol de levas",
      "cigüeñal",
    ],
    Suspensión: [
      "amortiguador",
      "resorte",
      "rótula",
      "rotula",
      "barra",
      "terminal",
      "brazo",
      "bujes",
      "buje",
      "suspensión",
      "suspension",
    ],
    Transmisión: [
      "embrague",
      "clutch",
      "caja",
      "transmisión",
      "transmision",
      "cardán",
      "cardan",
      "diferencial",
      "sincronizador",
    ],
    Eléctrico: [
      "alternador",
      "arranque",
      "batería",
      "bateria",
      "bobina",
      "sensor",
      "faro",
      "bombillo",
      "luz",
      "eléctric",
      "electric",
      "fusible",
      "relé",
      "rele",
    ],
    Carrocería: [
      "parachoque",
      "guardafango",
      "capó",
      "capo",
      "puerta",
      "vidrio",
      "espejo",
      "retrovisor",
      "compuerta",
      "tapa",
      "defensa",
    ],
    Refrigeración: [
      "radiador",
      "termostato",
      "manguera",
      "ventilador",
      "refrigerante",
      "bomba de agua",
    ],
    Escape: ["escape", "catalizador", "silenciador", "mofle", "múltiple"],
    Dirección: [
      "dirección",
      "direccion",
      "cremallera",
      "bomba dirección",
      "volante",
      "columna",
    ],
  };

  let brand: string | null = null;
  for (const b of knownBrands) {
    if (input.includes(b)) {
      brand = b.charAt(0).toUpperCase() + b.slice(1);
      break;
    }
  }

  let category: string | null = null;
  for (const [cat, keywords] of Object.entries(knownCategories)) {
    for (const kw of keywords) {
      if (input.includes(kw)) {
        category = cat;
        break;
      }
    }
    if (category) break;
  }

  const yearMatch = input.match(/\b(19|20)\d{2}\b/);
  const year = yearMatch ? parseInt(yearMatch[0]) : null;

  return {
    partName: rawInput.substring(0, 100),
    partCategory: category || "General",
    brand: brand || "No identificada",
    model: null,
    version: null,
    year,
    additionalNotes: null,
  };
}
