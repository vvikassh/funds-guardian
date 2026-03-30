import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCategories, mockTransactions, userProfile } from "@/data/mockData";
import { formatCurrency } from "@/lib/currency";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";

const COLORS = [
  "hsl(142, 71%, 45%)",
  "hsl(38, 92%, 50%)",
  "hsl(0, 84%, 60%)",
  "hsl(221, 83%, 53%)",
  "hsl(262, 83%, 58%)",
  "hsl(174, 72%, 40%)",
  "hsl(330, 81%, 60%)",
  "hsl(45, 93%, 47%)",
];

export default function Analytics() {
  const pieData = mockCategories.map((cat) => ({
    name: cat.name,
    value: cat.balance,
  }));

  const barData = mockCategories.map((cat) => ({
    name: cat.name,
    spent: cat.balance,
    budget: cat.budget,
  }));

  const totalSpent = mockCategories.reduce((sum, cat) => sum + cat.balance, 0);
  const totalBudget = mockCategories.reduce((sum, cat) => sum + cat.budget, 0);
  const overBudgetCategories = mockCategories.filter((cat) => cat.balance > cat.budget);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border rounded-lg shadow-lg p-3">
          <p className="font-semibold text-foreground">{payload[0].name}</p>
          <p className="text-sm text-muted-foreground">
            {formatCurrency(payload[0].value)} ({((payload[0].value / totalSpent) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">Visual breakdown of your spending</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-md">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-expense-light rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-expense" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(totalSpent)}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-success-light rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Remaining Budget</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(totalBudget - totalSpent)}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-warning-light rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Over Budget</p>
              <p className="text-2xl font-bold text-foreground">{overBudgetCategories.length} categories</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pie Chart */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Expense Distribution by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={150}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Bar Chart: Spent vs Budget */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Spent vs Budget by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))" }}
                />
                <Legend />
                <Bar dataKey="spent" fill="hsl(0, 84%, 60%)" name="Spent" radius={[4, 4, 0, 0]} />
                <Bar dataKey="budget" fill="hsl(142, 71%, 45%)" name="Budget" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
