"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ReportData {
  total: number;
  byCategory: Record<string, number>;
  byBrand: Record<string, number>;
  bySede: Record<string, number>;
  byMonth: Record<string, number>;
  topParts: { name: string; count: number }[];
}

function BarChart({
  data,
  maxBarWidth = 200,
  color = "bg-blue-500",
}: {
  data: Record<string, number>;
  maxBarWidth?: number;
  color?: string;
}) {
  const entries = Object.entries(data).sort(([, a], [, b]) => b - a);
  const maxVal = Math.max(...entries.map(([, v]) => v), 1);

  return (
    <div className="space-y-2">
      {entries.map(([label, value]) => (
        <div key={label} className="flex items-center gap-3">
          <span className="text-sm text-gray-700 w-32 truncate text-right">
            {label}
          </span>
          <div className="flex-1 flex items-center gap-2">
            <div
              className={`h-6 ${color} rounded-r`}
              style={{
                width: `${(value / maxVal) * maxBarWidth}px`,
                minWidth: "4px",
              }}
            />
            <span className="text-sm font-medium text-gray-600">{value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user as any;

  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sedeFilter, setSedeFilter] = useState("");
  const [sedes, setSedes] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (user?.role !== "admin") {
      router.push("/dashboard");
      return;
    }
    fetch("/api/sedes")
      .then((r) => r.json())
      .then(setSedes);
  }, [user, router]);

  useEffect(() => {
    if (user?.role !== "admin") return;
    setLoading(true);
    const params = new URLSearchParams();
    if (sedeFilter) params.set("sedeId", sedeFilter);

    fetch(`/api/ai/reports?${params}`)
      .then((r) => r.json())
      .then(setReport)
      .finally(() => setLoading(false));
  }, [sedeFilter, user]);

  if (user?.role !== "admin") return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Analítica y Reportes
          </h1>
          <p className="text-gray-500 mt-1">
            Análisis de demanda de repuestos no disponibles
          </p>
        </div>
        <select
          value={sedeFilter}
          onChange={(e) => setSedeFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
        >
          <option value="">Todas las sedes</option>
          {sedes.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">
          Cargando reportes...
        </div>
      ) : !report ? (
        <div className="text-center py-12 text-gray-500">
          No hay datos disponibles
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <p className="text-sm text-gray-500">Total Solicitudes</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {report.total}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <p className="text-sm text-gray-500">Categorías</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">
                {Object.keys(report.byCategory).length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <p className="text-sm text-gray-500">Marcas</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">
                {Object.keys(report.byBrand).length}
              </p>
            </div>
          </div>

          {/* Charts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* By Category */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Por Categoría
              </h2>
              {Object.keys(report.byCategory).length > 0 ? (
                <BarChart data={report.byCategory} color="bg-blue-500" />
              ) : (
                <p className="text-gray-400 text-sm">Sin datos</p>
              )}
            </div>

            {/* By Brand */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Por Marca de Vehículo
              </h2>
              {Object.keys(report.byBrand).length > 0 ? (
                <BarChart data={report.byBrand} color="bg-purple-500" />
              ) : (
                <p className="text-gray-400 text-sm">Sin datos</p>
              )}
            </div>

            {/* By Sede */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Por Sede
              </h2>
              {Object.keys(report.bySede).length > 0 ? (
                <BarChart data={report.bySede} color="bg-green-500" />
              ) : (
                <p className="text-gray-400 text-sm">Sin datos</p>
              )}
            </div>

          </div>

          {/* Top Parts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Top 20 Partes Más Solicitadas
            </h2>
            {report.topParts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left px-3 py-2 text-gray-600">#</th>
                      <th className="text-left px-3 py-2 text-gray-600">
                        Parte / Vehículo
                      </th>
                      <th className="text-right px-3 py-2 text-gray-600">
                        Solicitudes
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.topParts.map((part, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="px-3 py-2 text-gray-400">{i + 1}</td>
                        <td className="px-3 py-2 text-gray-900">
                          {part.name}
                        </td>
                        <td className="px-3 py-2 text-right font-medium text-blue-600">
                          {part.count}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-400 text-sm">Sin datos</p>
            )}
          </div>

          {/* Monthly Trend */}
          {Object.keys(report.byMonth).length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Tendencia Mensual
              </h2>
              <BarChart
                data={report.byMonth}
                maxBarWidth={300}
                color="bg-teal-500"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
