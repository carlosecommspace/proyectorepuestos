"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PartRequestList from "@/components/PartRequestList";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const user = session?.user as any;
  const isAdmin = user?.role === "admin";
  const [refreshKey] = useState(0);

  useEffect(() => {
    if (status === "authenticated" && !isAdmin) {
      router.replace("/dashboard/parts");
    }
  }, [status, isAdmin, router]);

  if (status === "loading" || !isAdmin) {
    return null;
  }

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
