"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function useAuth() {
  const { data: session, status } = useSession();

  return {
    session,
    status,        // "loading", "authenticated", "unauthenticated"
    signIn,        // Llamar signIn("google")
    signOut,       // Cierra sesión
    user: session?.user,
  };
}
