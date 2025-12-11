// Layout global
//CAMBIAR PARA EXAMEN
import Sidebar from '@/components/navigation/Sidebar';
import '@/styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="h-screen flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Barra vertical separadora */}
        <div className="w-1 bg-gray-300"></div>

        {/* Área principal de contenido */}
        <main className="flex-1 p-6 overflow-auto min-h-0">{children}</main>
      </body>
    </html>
  );
}
