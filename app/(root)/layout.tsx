import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Optimize font loading for cross-browser compatibility
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // This helps with FOIT (Flash of Invisible Text)
  preload: true,
  fallback: ['system-ui', 'Arial', 'sans-serif'],
});

export const metadata: Metadata = {
  title: "Fehirde",
  description: "En platform for å samle din formue",
  keywords:
    "Fintech, Norden, KI, AI, Personlig, Formueforvaltning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className={inter.className}>
        {children}
      </main>
      <Footer />
    </>
  );
}
