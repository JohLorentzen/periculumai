"use client"

import { AccountTable } from "@/components/AccountTable"
import { Component as PortfolioDonutChart } from "@/components/PortfolioDonutChart"
import { Card } from "@/components/ui/card"
import { TrendingDown, TrendingUp } from "lucide-react"

// Define account type for better type safety
interface Account {
  name: string;
  platform: string;
  type: string;
  valueNumber: number;
  value: string;
  risk: number;
  percentChange: number;
  return: string;
  allocation: number;
}

// Helper function to calculate portfolio metrics
const calculatePortfolioMetrics = (accounts: Account[]) => {
  // Calculate total value
  const totalValue = accounts.reduce((sum: number, account: Account) => sum + account.valueNumber, 0);
  
  // Calculate weighted return contribution
  const weightedReturns = accounts.map((account: Account) => {
    const weight = account.valueNumber / totalValue;
    const contribution = weight * account.percentChange;
    return contribution;
  });
  
  // Calculate total return percentage
  const totalReturn = weightedReturns.reduce((sum: number, contribution: number) => sum + contribution, 0);
  
  return {
    totalValue,
    totalReturn,
    isPositive: totalReturn >= 0
  };
};

const Dashboard = () => {
  // Mock data for accounts with actual monetary values
  const accountsData = [
    {
      name: "Aksjer",
      platform: "Nordnet",
      type: "ASK",
      valueNumber: 560000,
      value: "560 000 kr",
      risk: 5,
      percentChange: 44.3,
      return: "+44.3%",
      allocation: 55,
    },
    {
      name: "Pensjon",
      platform: "Kron",
      type: "IPS",
      valueNumber: 250000, 
      value: "250 000 kr",
      risk: 3,
      percentChange: 10.1,
      return: "+10.1%",
      allocation: 25,
    },
    {
      name: "Fond",
      platform: "DNB",
      type: "Fondskonto",
      valueNumber: 200000,
      value: "200 000 kr",
      risk: 4,
      percentChange: 18.7,
      return: "+18.7%",
      allocation: 20,
    },
    {
      name: "BSU",
      platform: "Sparebank 1",
      type: "BSU",
      valueNumber: 35000,
      value: "35 000 kr",
      risk: 1,
      percentChange: 6.3,
      return: "+6.3%",
      allocation: 3,
    }
  ];

  // Calculate portfolio metrics
  const portfolioMetrics = calculatePortfolioMetrics(accountsData);
  
  // Format total value with Norwegian currency format
  const formattedTotalValue = new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: 'NOK',
    maximumFractionDigits: 0
  }).format(portfolioMetrics.totalValue);

  // Prepare simplified data for the chart
  const portfolioData = accountsData.map(account => ({
    category: account.name,
    allocation: account.allocation,
  }));

  // Enhanced chart config with CSS variables for colors
  const chartConfig = {
    allocation: {
      label: "Allokering",
      formatter: (value: number) => `${value}%`
    },
    "Aksjer": {
      label: "Aksjer",
      color: "hsl(var(--chart-1))"  // Red from CSS
    },
    "Pensjon": {
      label: "Pensjon",
      color: "hsl(var(--chart-2))"  // Blue from CSS
    },
    "Fond": {
      label: "Fond",
      color: "hsl(var(--chart-3))"  // White from CSS
    },
    "BSU": {
      label: "BSU",
      color: "hsl(var(--chart-4))"  // Green from CSS
    }
  };

  // Current month and year for the chart timeframe
  const currentDate = new Date();
  const month = currentDate.toLocaleString('nb-NO', { month: 'long' });
  const year = currentDate.getFullYear();
  const timeframe = `${month} ${year}`;

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
          <Card className="rounded-xl border bg-card h-[400px] flex flex-col">
            <PortfolioDonutChart 
              data={portfolioData} 
              config={chartConfig} 
              trendingPercentage={portfolioMetrics.totalReturn}
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
};

export default Dashboard;