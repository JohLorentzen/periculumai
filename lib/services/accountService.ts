import { Account, PortfolioMetrics, PortfolioChartItem, RawAccount } from "@/lib/types/account";

// Raw mock data as it would come from an API - only includes raw values, no calculated fields
export const mockRawAccountsData: RawAccount[] = [
  {
    name: "Aksjer",
    platform: "Nordnet",
    type: "ASK",
    valueNumber: 560000,
    risk: 5,
    percentChange: 44.3,
  },
  {
    name: "Pensjon",
    platform: "Kron",
    type: "IPS",
    valueNumber: 250000, 
    risk: 3,
    percentChange: 10.1,
  },
  {
    name: "Fond",
    platform: "DNB",
    type: "Fondskonto",
    valueNumber: 200000,
    risk: 4,
    percentChange: 18.7,
  },
  {
    name: "BSU",
    platform: "Sparebank 1",
    type: "BSU",
    valueNumber: 35000,
    risk: 1,
    percentChange: 6.3,
  }
];

// Helper function to process raw accounts data into complete Account objects
export const processRawAccountsData = (rawAccounts: RawAccount[]): Account[] => {
  // Calculate total value for allocation percentages
  const totalValue = rawAccounts.reduce((sum, account) => sum + account.valueNumber, 0);
  
  // Process each account to add derived values
  return rawAccounts.map(account => {
    // Calculate allocation percentage
    const allocation = Math.round((account.valueNumber / totalValue) * 100);
    
    // Format value with Norwegian currency format
    const value = new Intl.NumberFormat('nb-NO', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(account.valueNumber) + " kr";
    
    // Format return percentage
    const returnStr = account.percentChange >= 0 
      ? `+${account.percentChange}%` 
      : `${account.percentChange}%`;
    
    // Return complete Account object
    return {
      ...account,
      value,
      allocation,
      return: returnStr
    };
  });
};

/**
 * Helper function to calculate portfolio metrics
 * @param accounts Array of account objects
 * @returns Object with totalValue, totalReturn, and isPositive flag
 */
export const calculatePortfolioMetrics = (accounts: Account[]): PortfolioMetrics => {
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

/**
 * Maps platform names to their corresponding colors
 * @param platform The platform name to get color for
 * @returns Hex color code for the platform
 */
export const getPlatformColor = (platform: string): string => {
  // Using direct hex values instead of CSS variables for better compatibility with Recharts
  switch (platform.toLowerCase()) {
    case 'nordnet':
      return '#000000'; // Black
    case 'kron':
      return '#f0deff'; // Light purple
    case 'dnb':
      return '#14555a'; // Teal
    case 'sparebank 1':
    case 'sparebank1':
      return '#005aa4'; // Blue
    case 'firi':
      return '#474AEE'; // Bright blue
    default:
      return '#9C27B0'; // Purple
  }
};

/**
 * Maps account data to chart data with appropriate colors based on platform
 * @param accounts Array of account objects
 * @returns Formatted data for the chart with colors
 */
export const mapAccountsToChartData = (accounts: Account[]): PortfolioChartItem[] => {
  return accounts.map(account => ({
    // Map to the expected PortfolioItem properties
    name: account.name,
    valueNumber: account.valueNumber,
    return: account.percentChange,
    // Apply platform-specific color or default if not found
    fill: getPlatformColor(account.platform)
  }));
};

// Function to format total value with Norwegian currency format
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: 'NOK',
    maximumFractionDigits: 0
  }).format(value);
};

// Function to get current month and year for the timeframe
export const getCurrentTimeframe = (): string => {
  const currentDate = new Date();
  const month = currentDate.toLocaleString('nb-NO', { month: 'long' });
  const year = currentDate.getFullYear();
  return `${month} ${year}`;
};

// Main function to process all portfolio data
export const processPortfolioData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Process raw accounts data
  const processedAccounts = processRawAccountsData(mockRawAccountsData);
  
  // Calculate portfolio metrics
  const metrics = calculatePortfolioMetrics(processedAccounts);
  
  // Format total value
  const formattedTotalValue = formatCurrency(metrics.totalValue);
  
  // Map data for chart
  const chartData = mapAccountsToChartData(processedAccounts);
  
  // Get current timeframe
  const timeframe = getCurrentTimeframe();
  
  // Return all processed data
  return {
    accountsData: processedAccounts,
    portfolioMetrics: metrics,
    portfolioData: chartData,
    formattedTotalValue,
    timeframe
  };
}; 