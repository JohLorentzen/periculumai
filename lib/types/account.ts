// Define raw account type for API data
export interface RawAccount {
  name: string;
  platform: string;
  type: string;
  valueNumber: number;
  risk: number;
  percentChange: number;
}

// Define account type for better type safety
export interface Account {
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

// Type for portfolio metrics
export interface PortfolioMetrics {
  totalValue: number;
  totalReturn: number;
  isPositive: boolean;
}

// Type for chart data item
export interface PortfolioChartItem {
  name: string;
  valueNumber: number;
  return: number;
  fill?: string;
} 