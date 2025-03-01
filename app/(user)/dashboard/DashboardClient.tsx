"use client"

import { useState, useEffect } from "react";
import { AccountTable } from "@/components/AccountTable"
import { Component as PortfolioDonutChart } from "@/components/PortfolioDonutChart"
import { Card } from "@/components/ui/card"
import { TrendingDown, TrendingUp, Loader2 } from "lucide-react"
import { Account, PortfolioMetrics, PortfolioChartItem } from "@/lib/types/account"
import { fetchPortfolioData } from "./actions";

// Define the portfolio data structure
type PortfolioData = {
  accountsData: Account[];
  portfolioMetrics: PortfolioMetrics;
  portfolioData: PortfolioChartItem[];
  formattedTotalValue: string;
  timeframe: string;
};

// Client component for dashboard that handles its own loading state
export default function DashboardClient() {
  // Track component mounting for hydration safety
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Set mounted state after client-side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load data only after component is mounted on client
  useEffect(() => {
    // Skip data fetching during server rendering or before mount
    if (!isMounted) return;

    async function loadData() {
      try {
        setIsLoading(true);
        const data = await fetchPortfolioData();
        setPortfolioData(data);
      } catch (err) {
        console.error("Error fetching portfolio data:", err);
        setError("Kunne ikke hente porteføljedata");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [isMounted]);

  // Return null during server rendering to avoid hydration issues
  if (!isMounted) return null;

  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Oversikt over dine investeringer og kontoer.
        </p>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <h2 className="text-xl font-medium">Laster inn dashboard...</h2>
          <p className="text-muted-foreground">Henter og beregner porteføljedata</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !portfolioData) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Oversikt over dine investeringer og kontoer.
        </p>
        <div className="p-6 text-center">
          <h2 className="text-xl font-medium">Kunne ikke laste data</h2>
          <p className="text-muted-foreground mt-2">{error || "Vennligst prøv igjen senere"}</p>
        </div>
      </div>
    );
  }

  // Destructure data for easier access
  const { 
    accountsData, 
    portfolioMetrics, 
    portfolioData: chartData, 
    formattedTotalValue, 
    timeframe 
  } = portfolioData;

  // Render dashboard with data
  return (
    <div className="container mx-auto p-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Oversikt over dine investeringer og kontoer.
          </p>
          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Total Avkastning</h2>
              <div className="text-2xl font-medium mt-6">
                {formattedTotalValue}
              </div>
            </div>
              
            <div className={`text-4xl font-bold mt-2 flex justify-end gap-2 ${portfolioMetrics.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {portfolioMetrics.isPositive ? (
                <TrendingUp className="h-8 w-8" />
              ) : (
                <TrendingDown className="h-8 w-8" />
              )}
              {portfolioMetrics.totalReturn.toFixed(1)}%
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="rounded-xl bg-card flex flex-col">
            <PortfolioDonutChart 
              data={chartData} 
              timeframe={timeframe}
            />
          </Card>
          <Card className="rounded-xl border bg-card lg:col-span-2">
            <AccountTable accounts={accountsData} />
          </Card>
        </div>
      </div>
    </div>
  );
} 