
import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Expense, CategoryTotal } from "@/types/expense";
import { getCategoryFillColor } from "@/utils/categoryColors";

interface ExpenseChartProps {
  expenses: Expense[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
  const categoryTotals = useMemo(() => {
    if (expenses.length === 0) return [];

    // Group expenses by category and calculate totals
    const categoryMap = expenses.reduce((acc, expense) => {
      const { category, amount } = expense;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    }, {} as Record<string, number>);

    // Calculate total amount across all categories
    const totalAmount = Object.values(categoryMap).reduce((sum, amount) => sum + amount, 0);

    // Convert to array of objects with percentage calculation
    return Object.entries(categoryMap).map(([category, total]) => ({
      category: category as any,
      total,
      percentage: (total / totalAmount) * 100,
    }));
  }, [expenses]);

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 glass-card rounded-xl animate-fade-in">
        <p className="text-muted-foreground">No data to visualize yet.</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-4 shadow-sm animate-fade-in h-[400px]">
      <h3 className="text-lg font-medium mb-4 text-center">Expense Distribution</h3>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={categoryTotals}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="total"
            nameKey="category"
            animationDuration={750}
            animationBegin={0}
          >
            {categoryTotals.map((entry) => (
              <Cell 
                key={`cell-${entry.category}`} 
                fill={getCategoryFillColor(entry.category)} 
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
            contentStyle={{ 
              borderRadius: 'var(--radius)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              border: '1px solid hsl(var(--border))'
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
