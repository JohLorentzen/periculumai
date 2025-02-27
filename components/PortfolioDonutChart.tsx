"use client"

import { useEffect } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig } from "@/components/ui/chart"

// Norwegian colors from the flag
const COLORS = ["#EF2B2D", "#002868", "#FFFFFF"];

interface PortfolioChartItem {
  category: string;
  allocation: number;
  fill?: string;  // Made optional
}

interface PortfolioDonutChartProps {
  data: PortfolioChartItem[];
  config: ChartConfig;
}

interface CustomLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

export function Component({ data, config }: PortfolioDonutChartProps) {
  // Debug logs
  useEffect(() => {
    console.log("Chart data:", data);
    console.log("Chart config:", config);
  }, [data, config]);

  // Find the item with the highest allocation to use as activeIndex
  const activeIndex = data.reduce(
    (maxIndex, item, index, arr) => 
      item.allocation > arr[maxIndex].allocation ? index : maxIndex,
    0
  );

  const renderCustomizedLabel = (props: CustomLabelProps) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        style={{
          fontWeight: 'bold',
          fontSize: '1rem',
          textShadow: '0px 0px 3px rgba(0,0,0,0.5)'
        }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Use larger size values based on rem calculations
  // (assuming 1rem = 16px in most browsers)
  const innerRadius = 96;  // 6rem equivalent
  const outerRadius = 144; // 9rem equivalent
  const activeOuterRadius = 152; // 9.5rem equivalent

  return (
    <Card className="flex flex-col border-0 shadow-none">
      <CardHeader className="items-center pb-0">
        <CardTitle>Porteføljefordeling</CardTitle>
        <CardDescription>Oktober 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="h-[25rem] w-full"> {/* 25rem = ~400px */}
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                paddingAngle={5}
                dataKey="allocation"
                nameKey="category"
                activeIndex={activeIndex}
                activeShape={({
                  cx,
                  cy,
                  innerRadius,
                  startAngle,
                  endAngle,
                  fill
                }: PieSectorDataItem) => (
                  <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={activeOuterRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                  />
                )}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
