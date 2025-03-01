import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Fehirde - Dashboard",
    description: "Oversikten over din formue",  
  };

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Keep this layout minimal to avoid nesting issues
  return <>{children}</>;
}
