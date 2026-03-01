"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (!session?.user) return null;

  const user = session.user as any;
  const isAdmin = user.role === "admin";

  const linkClass = (path: string) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      pathname === path
        ? "bg-blue-700 text-white"
        : "text-blue-100 hover:bg-blue-600 hover:text-white"
    }`;

  return (
    <nav className="bg-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="text-white font-bold text-lg">
              AutoPartes
            </Link>
            <span className="text-blue-200 text-xs border border-blue-400 rounded px-2 py-0.5">
              {user.sedeName || "Todas las sedes"}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Link href="/dashboard/parts" className={linkClass("/dashboard/parts")}>
              Registrar Solicitud
            </Link>
            <Link href="/dashboard" className={linkClass("/dashboard")}>
              Solicitudes
            </Link>
            {isAdmin && (
              <>
                <Link
                  href="/dashboard/analytics"
                  className={linkClass("/dashboard/analytics")}
                >
                  Analítica
                </Link>
                <Link
                  href="/dashboard/chat"
                  className={linkClass("/dashboard/chat")}
                >
                  Chat IA
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-white text-sm font-medium">{user.name}</p>
              <p className="text-blue-200 text-xs">
                {isAdmin ? "Administrador" : "Vendedor"}
              </p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="bg-blue-900 text-blue-100 px-3 py-1.5 rounded text-sm hover:bg-blue-950 transition-colors"
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
