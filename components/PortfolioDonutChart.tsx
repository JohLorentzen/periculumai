"use client"

import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend, Cell } from "recharts"


import {
  Card,
  CardContent,
  CardDescription,

  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { 
  ChartConfig,
} from "@/components/ui/chart"

// Fallback colors if config doesn't provide colors
const FALLBACK_COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

interface PortfolioChartItem {
  category: string;
  allocation: number;
  fill?: string;  // Made optional
}

interface PortfolioDonutChartProps {
  data: PortfolioChartItem[];
  config: ChartConfig;
  trendingPercentage?: number;
  timeframe?: string;
}

export function Component({ 
  data, 
  config, 
  timeframe = "Oktober 2024" 
}: PortfolioDonutChartProps) {
  // Format data for the chart
  const chartData = data.map((item, index) => {
    // Try to get color from config
    const categoryConfig = config[item.category];
    const configColor = categoryConfig?.color;
    
    return {
      ...item,
      fill: item.fill || configColor || FALLBACK_COLORS[index % FALLBACK_COLORS.length]
    };
  });

  // Create a custom tooltip formatter
  const formatTooltip = (value: number) => {
    return `${value}%`;
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Porteføljefordeling</CardTitle>
        <CardDescription>{timeframe}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip formatter={formatTooltip} />
              <Legend />
              <Pie
                data={chartData}
                dataKey="allocation"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.fill} 
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
