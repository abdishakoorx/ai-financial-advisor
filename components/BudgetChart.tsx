"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface BudgetChartProps {
  data: Record<string, number>;
}

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', 
  '#FF6B6B', '#54C5C1', '#FFD166', '#06D6A0', '#118AB2'
];

const BudgetChart: React.FC<BudgetChartProps> = ({ data }) => {
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={true}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number | string) => `${value}%`}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default BudgetChart;