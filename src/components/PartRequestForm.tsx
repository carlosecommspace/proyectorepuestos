"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";

interface NormalizedData {
  partName: string | null;
  partCategory: string | null;
  brand: string | null;
  model: string | null;
  version: string | null;
  year: number | null;
  additionalNotes: string | null;
  _aiUsed?: boolean;
}

interface Sede {
  id: string;
  name: string;
}

interface VehicleModel {
  model: string;
  years: string;
  type: string;
}

export default function PartRequestForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const { data: session } = useSession();
  const user = session?.user as any;
  const isAdmin = user?.role === "admin";

  const [rawInput, setRawInput] = useState("");
  const [normalizedData, setNormalizedData] = useState<NormalizedData | null>(
    null
  );
  const [isNormalizing, setIsNormalizing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [selectedSede, setSelectedSede] = useState("");
  const [allBrands, setAllBrands] = useState<string[]>([]);
  const [brandModels, setBrandModels] = useState<VehicleModel[]>([]);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const brandRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isAdmin) {
      fetch("/api/sedes")
        .then((r) => r.json())
        .then(setSedes);
    }
  }, [isAdmin]);

  // Load all brands on mount
  useEffect(() => {
    fetch("/api/vehicles")
      .then((r) => r.json())
      .then((data) => setAllBrands(data.brands || []));
  }, []);

  // Load models when brand changes
  useEffect(() => {
    if (normalizedData?.brand) {
      fetch(`/api/vehicles?brand=${encodeURIComponent(normalizedData.brand)}`)
        .then((r) => r.json())
        .then((data) => setBrandModels(data.models || []));
    } else {
      setBrandModels([]);
    }
  }, [normalizedData?.brand]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (brandRef.current && !brandRef.current.contains(e.target as Node)) {
        setShowBrandDropdown(false);
      }
      if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
        setShowModelDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Auto-normalize when user stops typing
  const normalize = useCallback(async (text: string) => {
    if (!text.trim()) {
      setNormalizedData(null);
      return;
    }
    setIsNormalizing(true);
    try {
      const res = await fetch("/api/ai/normalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawInput: text }),
      });
      if (!res.ok) throw new Error("Error al normalizar");
      const data = await res.json();
      setNormalizedData(data);
    } catch {
      // Silent fail — user can still fill manually
    } finally {
      setIsNormalizing(false);
    }
  }, []);

  const handleInputChange = (text: string) => {
    setRawInput(text);
    setMessage(null);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!text.trim()) {
      setNormalizedData(null);
      return;
    }
    debounceRef.current = setTimeout(() => normalize(text), 800);
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleSave = async () => {
    if (!rawInput.trim()) return;
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/parts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawInput,
          partName: normalizedData?.partName,
          partCategory: normalizedData?.partCategory,
          brand: normalizedData?.brand,
          model: normalizedData?.model,
          version: normalizedData?.version,
          year: normalizedData?.year,
          additionalNotes: normalizedData?.additionalNotes,
          normalizedData: normalizedData,
          sedeId: isAdmin ? selectedSede : undefined,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error al guardar");
      }

      setMessage({ type: "success", text: "Solicitud registrada exitosamente" });
      setRawInput("");
      setNormalizedData(null);
      onSuccess?.();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleFieldChange = (field: keyof NormalizedData, value: string) => {
    if (!normalizedData) return;
    setNormalizedData({
      ...normalizedData,
      [field]: field === "year" ? (value ? parseInt(value) : null) : value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Natural language input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Describe la parte solicitada por el cliente
        </label>
        <div className="relative">
          <textarea
            value={rawInput}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder='Ej: "Pastillas de freno delanteras para Toyota Corolla 2019 SE"'
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
            rows={2}
          />
          {isNormalizing && (
            <div className="absolute right-3 top-3">
              <span className="animate-spin inline-block w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full" />
            </div>
          )}
        </div>
      </div>

      {/* Sede selector for admin */}
      {isAdmin && sedes.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sede
          </label>
          <select
            value={selectedSede}
            onChange={(e) => setSelectedSede(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
          >
            <option value="">Seleccionar sede...</option>
            {sedes.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Normalized data preview — appears automatically */}
      {normalizedData && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">
              Verifica y corrige los datos
            </h3>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
              {normalizedData._aiUsed ? "Procesado con IA" : "Procesado automáticamente"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Nombre de la Parte
              </label>
              <input
                type="text"
                value={normalizedData.partName || ""}
                onChange={(e) => handleFieldChange("partName", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Categoría
              </label>
              <select
                value={normalizedData.partCategory || "General"}
                onChange={(e) =>
                  handleFieldChange("partCategory", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-900"
              >
                {[
                  "Frenos",
                  "Motor",
                  "Suspensión",
                  "Transmisión",
                  "Eléctrico",
                  "Carrocería",
                  "Refrigeración",
                  "Escape",
                  "Dirección",
                  "Aceites y Filtros",
                  "Neumáticos",
                  "Accesorios",
                  "General",
                ].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div ref={brandRef} className="relative">
              <label className="block text-xs text-gray-500 mb-1">
                Marca del Vehículo
              </label>
              <input
                type="text"
                value={normalizedData.brand || ""}
                onChange={(e) => {
                  handleFieldChange("brand", e.target.value);
                  setShowBrandDropdown(true);
                }}
                onFocus={() => setShowBrandDropdown(true)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-900"
                autoComplete="off"
              />
              {showBrandDropdown && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-48 overflow-y-auto">
                  {allBrands
                    .filter((b) =>
                      b.toLowerCase().includes((normalizedData.brand || "").toLowerCase())
                    )
                    .map((b) => (
                      <li
                        key={b}
                        onClick={() => {
                          handleFieldChange("brand", b);
                          setShowBrandDropdown(false);
                        }}
                        className="px-3 py-2 text-sm text-gray-900 hover:bg-blue-50 cursor-pointer"
                      >
                        {b}
                      </li>
                    ))}
                </ul>
              )}
            </div>
            <div ref={modelRef} className="relative">
              <label className="block text-xs text-gray-500 mb-1">Modelo</label>
              <input
                type="text"
                value={normalizedData.model || ""}
                onChange={(e) => {
                  handleFieldChange("model", e.target.value);
                  setShowModelDropdown(true);
                }}
                onFocus={() => setShowModelDropdown(true)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-900"
                autoComplete="off"
              />
              {showModelDropdown && brandModels.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-48 overflow-y-auto">
                  {brandModels
                    .filter((m) =>
                      m.model.toLowerCase().includes((normalizedData.model || "").toLowerCase())
                    )
                    .map((m) => (
                      <li
                        key={m.model}
                        onClick={() => {
                          handleFieldChange("model", m.model);
                          setShowModelDropdown(false);
                        }}
                        className="px-3 py-2 text-sm hover:bg-blue-50 cursor-pointer"
                      >
                        <span className="text-gray-900">{m.model}</span>
                        <span className="text-xs text-gray-400 ml-2">
                          {m.years}
                        </span>
                      </li>
                    ))}
                </ul>
              )}
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Versión
              </label>
              <input
                type="text"
                value={normalizedData.version || ""}
                onChange={(e) => handleFieldChange("version", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Año</label>
              <input
                type="number"
                value={normalizedData.year || ""}
                onChange={(e) => handleFieldChange("year", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-900"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-gray-500 mb-1">
                Notas Adicionales
              </label>
              <input
                type="text"
                value={normalizedData.additionalNotes || ""}
                onChange={(e) =>
                  handleFieldChange("additionalNotes", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-900"
              />
            </div>
          </div>
        </div>
      )}

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={!rawInput.trim() || isSaving || isNormalizing}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isSaving ? "Guardando..." : "Registrar Solicitud"}
      </button>

      {/* Status message */}
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
