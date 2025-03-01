"use server"

import { processPortfolioData } from "@/lib/services/accountService";
import { Account, PortfolioMetrics, PortfolioChartItem } from "@/lib/types/account";

// Define the portfolio data structure
type PortfolioData = {
  accountsData: Account[];
  portfolioMetrics: PortfolioMetrics;
  portfolioData: PortfolioChartItem[];
  formattedTotalValue: string;
  timeframe: string;
};

// Server action to fetch portfolio data
export async function fetchPortfolioData(): Promise<PortfolioData> {
  try {
    // Process portfolio data on the server
    const data = await processPortfolioData();
    return data;
  } catch (error) {
    console.error("Error in server action:", error);
    throw new Error("Failed to process portfolio data");
  }
} 