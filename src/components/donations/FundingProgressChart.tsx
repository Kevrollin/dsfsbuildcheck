import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart } from "recharts";

interface ChartDataItem {
  day: string;
  amount: number;
}

interface FundingProgressChartProps {
  weeklyData: ChartDataItem[];
  targetAmount: number;
}

const FundingProgressChart = ({ weeklyData }: FundingProgressChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const handleMouseEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const chartConfig = {
    day: { label: "Day of Week" },
    amount: { 
      label: "Donation Amount", 
      color: "#3b82f6" 
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
          <CardTitle className="text-lg font-semibold">Funding Progress Over Time</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-[300px] w-full">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <ChartTooltipContent 
                            className="rounded-lg shadow-lg"
                          >
                            {payload.map((entry, index) => (
                              <div key={`item-${index}`} className="flex justify-between gap-2">
                                <span className="font-medium">{entry.name}:</span>
                                <span className="font-mono tabular-nums">
                                  ${entry.value}
                                </span>
                              </div>
                            ))}
                          </ChartTooltipContent>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="amount"
                    fill="url(#colorGradient)"
                    radius={[4, 4, 0, 0]}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    animationDuration={1500}
                  >
                    {weeklyData.map((_, index) => (
                      <motion.rect
                        key={`bar-${index}`}
                        initial={{ y: 300, height: 0 }}
                        animate={{ 
                          y: undefined, 
                          height: undefined,
                          fill: activeIndex === index ? "#6366f1" : undefined
                        }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      />
                    ))}
                  </Bar>
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.5}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FundingProgressChart;
