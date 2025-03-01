"use client"
import { Pie, PieChart, ResponsiveContainer, Tooltip, TooltipProps } from "recharts"
import { PortfolioChartItem } from "@/lib/types/account"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Fallback colors if config doesn't provide colors
const FALLBACK_COLORS = ["#EF2B2D", "#002868", "#FFFFFF", "#14B37D", "#F5A623"];

interface PortfolioDonutChartProps {
  data: PortfolioChartItem[];
  timeframe?: string;
}

// Type for the custom tooltip
type CustomTooltipProps = TooltipProps<number, string> & {
  active?: boolean;
  payload?: Array<{ payload: PortfolioChartItem }>;
};

export function Component({ 
  data, 
  timeframe,
}: PortfolioDonutChartProps) {
  
  // Format data for the chart and add colors
  const chartData = data.map((item, index) => ({
    ...item,
    // Ensure fill is a valid color value
    fill: item.fill || FALLBACK_COLORS[index % FALLBACK_COLORS.length]
  }));
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-background border p-2 rounded-md shadow-md">
          <p className="font-medium">{item.name}</p>
          <p>Verdi: {item.valueNumber.toLocaleString('no-NO')} kr</p>
          <p>Avkastning: {item.return >= 0 ? '+' : ''}{item.return.toFixed(2)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Porteføljefordeling</CardTitle>
        <CardDescription>{timeframe}</CardDescription>
      </CardHeader>
      <CardContent className="">
        <div className="mx-auto aspect-square">
          <ResponsiveContainer >
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={chartData}
                dataKey="valueNumber"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={120}

              >
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
