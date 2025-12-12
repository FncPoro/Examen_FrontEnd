// src/middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth(
  // middleware no necesita hacer nada aquí
  () => {},
  {
    callbacks: {
      authorized: ({ token }) => {
        // permite el acceso si existe token (session JWT)
        return !!token;
      },
    },
  }
);

// proteger todas las rutas de /app excepto los caminos públicos:
export const config = {
  matcher: [
    /*
      - protege todo excepto:
        - rutas API de NextAuth (/api/auth)
        - endpoints estáticos de next (_next)
        - página de login
        - assets públicos (public/)
    */
    "/((?!api/auth|api/public|_next|static|favicon.ico|login).*)",
  ],
};
