import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }

  //interface User { // Puedes agregar campos adicionales del usuario si quieres}
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken?: string;
  }
}
