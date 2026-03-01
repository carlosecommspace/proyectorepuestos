import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export interface AppUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "regular";
  sedeId: string | null;
  sedeName: string | null;
}

export async function getCurrentUser(): Promise<AppUser | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  return session.user as unknown as AppUser;
}

export async function requireUser(): Promise<AppUser> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");
  return user;
}

export async function requireAdmin(): Promise<AppUser> {
  const user = await requireUser();
  if (user.role !== "admin") throw new Error("Not authorized");
  return user;
}
