import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <head>
        <meta
          property="og:title"
          content="Fehirde - Personlig formue forvaltning"
        />
        <meta
          property="og:description"
          content="En platform for å samle dine kontoer under et tak."
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          

          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
