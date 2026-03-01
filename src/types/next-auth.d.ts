import "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
    sedeId?: string | null;
    sedeName?: string | null;
  }

  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      role?: string;
      sedeId?: string | null;
      sedeName?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    sedeId?: string | null;
    sedeName?: string | null;
  }
}
