"use client";

import useAuth from "@/hooks/useAuth";

export default function LoginButton() {
  const { user, signIn, signOut, status } = useAuth();

  if (status === "loading") return <p>Cargando...</p>;

  return user ? (
    <div>
      <p>Hola, {user.name}</p>
      <button
        onClick={() => signOut()}
        className="bg-red-500 text-white px-4 py-2 mt-2"
      >
        Cerrar sesión
      </button>
    </div>
  ) : (
    <button
      onClick={() => signIn("google")}
      className="bg-blue-500 text-white px-4 py-2"
    >
      Iniciar sesión con Google
    </button>
  );
}
