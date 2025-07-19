import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "ADIMO - Soluție digitală pentru administrarea asociațiilor de locatari",
  description:
    "Platforma gratuită ADIMO simplifică gestionarea asociațiilor de locatari. Facturi, cheltuieli, comunicare - totul într-un singur loc.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body suppressHydrationWarning>
        <div className={inter.className}>
          <ThemeProvider>{children}</ThemeProvider>
        </div>
      </body>
    </html>
  );
}
