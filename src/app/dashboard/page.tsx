"use client";

import { useState } from "react";
import PartRequestList from "@/components/PartRequestList";

export default function DashboardPage() {
  const [refreshKey] = useState(0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Solicitudes de Repuestos
        </h1>
        <p className="text-gray-500 mt-1">
          Historial de partes solicitadas por clientes
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <PartRequestList refreshKey={refreshKey} />
      </div>
    </div>
  );
}
