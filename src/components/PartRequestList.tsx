"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

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
  status: string;
  createdAt: string;
  sede: { name: string };
  user: { name: string; email: string };
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
  reviewed: { label: "Revisado", color: "bg-blue-100 text-blue-800" },
  purchased: { label: "Comprado", color: "bg-green-100 text-green-800" },
  dismissed: { label: "Descartado", color: "bg-gray-100 text-gray-800" },
};

export default function PartRequestList({
  refreshKey,
}: {
  refreshKey?: number;
}) {
  const { data: session } = useSession();
  const user = session?.user as any;
  const isAdmin = user?.role === "admin";

  const [parts, setParts] = useState<PartRequest[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");

  const fetchParts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
      });
      if (statusFilter) params.set("status", statusFilter);

      const res = await fetch(`/api/parts?${params}`);
      const data = await res.json();
      setParts(data.parts);
      setTotal(data.total);
    } catch {
      console.error("Error fetching parts");
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => {
    fetchParts();
  }, [fetchParts, refreshKey]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/parts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) fetchParts();
    } catch {
      console.error("Error updating status");
    }
  };

  const totalPages = Math.ceil(total / 20);

  return (
    <div>
      {/* Filters */}
      <div className="flex items-center gap-4 mb-4">
        <div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
          >
            <option value="">Todos los estados</option>
            <option value="pending">Pendiente</option>
            <option value="reviewed">Revisado</option>
            <option value="purchased">Comprado</option>
            <option value="dismissed">Descartado</option>
          </select>
        </div>
        <span className="text-sm text-gray-500">
          {total} solicitud{total !== 1 ? "es" : ""}
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
                  <th className="px-3 py-3 text-gray-600 font-medium">
                    Estado
                  </th>
                  {isAdmin && (
                    <th className="px-3 py-3 text-gray-600 font-medium">
                      Acción
                    </th>
                  )}
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
                    <td className="px-3 py-3">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${STATUS_LABELS[part.status]?.color || "bg-gray-100"}`}
                      >
                        {STATUS_LABELS[part.status]?.label || part.status}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="px-3 py-3">
                        <select
                          value={part.status}
                          onChange={(e) =>
                            handleStatusChange(part.id, e.target.value)
                          }
                          className="text-xs border border-gray-300 rounded px-2 py-1 text-gray-700"
                        >
                          <option value="pending">Pendiente</option>
                          <option value="reviewed">Revisado</option>
                          <option value="purchased">Comprado</option>
                          <option value="dismissed">Descartado</option>
                        </select>
                      </td>
                    )}
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
