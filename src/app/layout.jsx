//importar fonts 'Inter' de google
import { Inter } from "next/font/google";
import "./globals.css";

//llamar la font
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eventos Foto",
  description: "Aplicacion web para eventos, sube tu foto mas graciosa para compartirla con tus invitados !",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      
      <body className={inter.className}>{children}</body>
    </html>
  );
}
