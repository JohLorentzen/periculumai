"use client"

import { Component as PortfolioDonutChart } from "@/components/PortfolioDonutChart";
import { ChartConfig } from "@/components/ui/chart";

export default function ChartExample() {
  // Sample portfolio data
  const portfolioData = [
    { category: "Aksjer", allocation: 40 },  // Stocks
    { category: "Obligasjoner", allocation: 30 },  // Bonds
    { category: "Kontanter", allocation: 20 },  // Cash
    { category: "Alternativt", allocation: 10 }  // Alternative
  ];

  // Chart configuration with Norwegian labels and colors
  const chartConfig: ChartConfig = {
    allocation: {
      label: "Allokering",
      formatter: (value) => `${value}%`
    },
    "Aksjer": {
      label: "Aksjer",
      color: "hsl(var(--chart-1))"
    },
    "Obligasjoner": {
      label: "Obligasjoner",
      color: "hsl(var(--chart-2))"
    },
    "Kontanter": {
      label: "Kontanter",
      color: "hsl(var(--chart-3))"
    },
    "Alternativt": {
      label: "Alternativt",
      color: "hsl(var(--chart-4))"
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Porteføljeeksempel</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Standard donut chart */}
        <PortfolioDonutChart 
          data={portfolioData}
          config={chartConfig}
          trendingPercentage={5.2}
          timeframe="Oktober 2024"
        />
        
        {/* Negative trend example */}
        <PortfolioDonutChart 
          data={portfolioData}
          config={chartConfig}
          trendingPercentage={-2.1}
          timeframe="November 2024"
        />
      </div>
    </div>
  );
} 