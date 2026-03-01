"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import PartRequestForm from "@/components/PartRequestForm";
import PartRequestList from "@/components/PartRequestList";

export default function PartsPage() {
  const { data: session } = useSession();
  const user = session?.user as any;
  const isAdmin = user?.role === "admin";
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Registrar Solicitud
        </h1>
        <p className="text-gray-500 mt-1">
          Registra las partes que los clientes solicitan y no tenemos disponibles
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <PartRequestForm
          onSuccess={() => setRefreshKey((k) => k + 1)}
        />
      </div>

      {isAdmin && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Solicitudes Recientes
          </h2>
          <PartRequestList refreshKey={refreshKey} />
        </div>
      )}
    </div>
  );
}
