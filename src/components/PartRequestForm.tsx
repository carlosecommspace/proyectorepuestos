"use client";

import { useState, useEffect } from "react";
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
  _fallbackReason?: string;
}

interface Sede {
  id: string;
  name: string;
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

  useEffect(() => {
    if (isAdmin) {
      fetch("/api/sedes")
        .then((r) => r.json())
        .then(setSedes);
    }
  }, [isAdmin]);

  const handleNormalize = async () => {
    if (!rawInput.trim()) return;
    setIsNormalizing(true);
    setMessage(null);

    try {
      const res = await fetch("/api/ai/normalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawInput }),
      });

      if (!res.ok) throw new Error("Error al normalizar");

      const data = await res.json();
      setNormalizedData(data);
    } catch {
      setMessage({
        type: "error",
        text: "Error al procesar con IA. Puedes guardar manualmente.",
      });
    } finally {
      setIsNormalizing(false);
    }
  };

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
        <textarea
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
          placeholder='Ej: "El cliente necesita pastillas de freno delanteras para un Toyota Corolla 2019 versión SE"'
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
          rows={3}
        />
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

      {/* Normalize button */}
      <div className="flex gap-3">
        <button
          onClick={handleNormalize}
          disabled={!rawInput.trim() || isNormalizing}
          className="bg-purple-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {isNormalizing ? (
            <>
              <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              Procesando con IA...
            </>
          ) : (
            "Normalizar con IA"
          )}
        </button>
      </div>

      {/* Normalized data preview */}
      {normalizedData && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Datos Normalizados</h3>
            {normalizedData._aiUsed === false && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                Normalización automática (IA no disponible)
              </span>
            )}
            {normalizedData._aiUsed === true && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                Normalizado con IA
              </span>
            )}
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
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Marca del Vehículo
              </label>
              <input
                type="text"
                value={normalizedData.brand || ""}
                onChange={(e) => handleFieldChange("brand", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Modelo</label>
              <input
                type="text"
                value={normalizedData.model || ""}
                onChange={(e) => handleFieldChange("model", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-900"
              />
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
        disabled={!rawInput.trim() || isSaving}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isSaving ? "Guardando..." : "Guardar Solicitud"}
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
