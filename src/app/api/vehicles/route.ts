import { NextRequest, NextResponse } from "next/server";
import { VEHICLE_DATABASE, VEHICLE_ALIASES } from "@/data/vehicles";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = (searchParams.get("q") || "").toLowerCase().trim();
  const brand = searchParams.get("brand");

  // If brand specified, return models for that brand
  if (brand) {
    const found = VEHICLE_DATABASE.find(
      (b) => b.brand.toLowerCase() === brand.toLowerCase()
    );
    return NextResponse.json({ models: found?.models || [] });
  }

  // If no query, return all brands
  if (!query) {
    return NextResponse.json({
      brands: VEHICLE_DATABASE.map((b) => b.brand),
    });
  }

  // Search brands matching query
  const matchingBrands = VEHICLE_DATABASE.filter((b) =>
    b.brand.toLowerCase().includes(query)
  ).map((b) => b.brand);

  // Search models matching query
  const matchingModels: { brand: string; model: string; years: string }[] = [];
  for (const b of VEHICLE_DATABASE) {
    for (const m of b.models) {
      if (m.model.toLowerCase().includes(query)) {
        matchingModels.push({ brand: b.brand, model: m.model, years: m.years });
      }
    }
  }

  // Search aliases matching query
  const matchingAliases: { alias: string; brand: string; model: string }[] = [];
  for (const [alias, ref] of Object.entries(VEHICLE_ALIASES)) {
    if (alias.includes(query)) {
      matchingAliases.push({ alias, ...ref });
    }
  }

  return NextResponse.json({
    brands: matchingBrands,
    models: matchingModels,
    aliases: matchingAliases,
  });
}
