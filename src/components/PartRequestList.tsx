"use client";

import { useState, useEffect, useCallback } from "react";

interface PartRequest {
  id: string;
  rawInput: string;
  partName: string | null;
  partCategory: string | null;
  brand: string | null;
  model: string | null;
  version: string | null;
  year: number | null;
  additionalNotes: string | null;
  createdAt: string;
  sede: { name: string };
  user: { name: string; email: string };
}

export default function PartRequestList({
  refreshKey,
}: {
  refreshKey?: number;
}) {
  const [parts, setParts] = useState<PartRequest[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchParts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
      });

      const res = await fetch(`/api/parts?${params}`);
      const data = await res.json();
      setParts(data.parts);
      setTotal(data.total);
    } catch {
      console.error("Error fetching parts");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchParts();
  }, [fetchParts, refreshKey]);

  const totalPages = Math.ceil(total / 20);

  return (
    <div>
      <div className="mb-4">
        <span className="text-sm text-gray-500">
          {total} solicitud{total !== 1 ? "es" : ""} registrada{total !== 1 ? "s" : ""}
        </span>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Cargando...</div>
      ) : parts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No hay solicitudes registradas
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="px-3 py-3 text-gray-600 font-medium">
                    Fecha
                  </th>
                  <th className="px-3 py-3 text-gray-600 font-medium">
                    Parte
                  </th>
                  <th className="px-3 py-3 text-gray-600 font-medium">
                    Categoría
                  </th>
                  <th className="px-3 py-3 text-gray-600 font-medium">
                    Vehículo
                  </th>
                  <th className="px-3 py-3 text-gray-600 font-medium">Sede</th>
                  <th className="px-3 py-3 text-gray-600 font-medium">
                    Vendedor
                  </th>
                </tr>
              </thead>
              <tbody>
                {parts.map((part) => (
                  <tr
                    key={part.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-3 py-3 text-gray-600 whitespace-nowrap">
                      {new Date(part.createdAt).toLocaleDateString("es")}
                    </td>
                    <td className="px-3 py-3">
                      <div className="font-medium text-gray-900">
                        {part.partName || part.rawInput.substring(0, 50)}
                      </div>
                      {part.partName && (
                        <div className="text-xs text-gray-400 truncate max-w-xs">
                          {part.rawInput}
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-3 text-gray-600">
                      {part.partCategory || "-"}
                    </td>
                    <td className="px-3 py-3 text-gray-600">
                      {[part.brand, part.model, part.version, part.year]
                        .filter(Boolean)
                        .join(" ") || "-"}
                    </td>
                    <td className="px-3 py-3 text-gray-600">
                      {part.sede.name}
                    </td>
                    <td className="px-3 py-3 text-gray-600">
                      {part.user.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 border rounded text-sm disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="text-sm text-gray-600">
                Página {page} de {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 border rounded text-sm disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
