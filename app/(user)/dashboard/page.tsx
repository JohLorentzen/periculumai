import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Loader2 } from "lucide-react"

// Server-side placeholder component
function DashboardPlaceholder() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground mt-2">
        Oversikt over dine investeringer og kontoer.
      </p>
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    </div>
  );
}

// Load the dashboard client component with client-side only rendering
const DashboardClient = dynamic(
  () => import('./DashboardClient').then(mod => mod.default),
  { 
    ssr: false,
    loading: () => <DashboardPlaceholder />
  }
);

// Page component with proper suspense boundary
export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardPlaceholder />}>
      <DashboardClient />
    </Suspense>
  );
} 
