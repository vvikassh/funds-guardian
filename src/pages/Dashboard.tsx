import { CategoryCard } from "@/components/CategoryCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockCategories, userProfile } from "@/data/mockData";
import { TrendingUp, TrendingDown, DollarSign, Target, Plus, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const totalSpent = mockCategories.reduce((sum, cat) => sum + cat.balance, 0);
  const totalBudget = mockCategories.reduce((sum, cat) => sum + cat.budget, 0);
  const budgetPercentage = (totalSpent / totalBudget) * 100;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-primary to-primary-hover text-primary-foreground border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/80 text-sm font-medium">Total Balance</p>
                <p className="text-3xl font-bold">₹{userProfile.totalBalance.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Monthly Budget</p>
                <p className="text-2xl font-bold text-foreground">₹{totalBudget.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <Badge variant={budgetPercentage > 80 ? "destructive" : "secondary"}>
                {budgetPercentage.toFixed(1)}% used
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Spent</p>
                <p className="text-2xl font-bold text-foreground">₹{totalSpent.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-expense-light rounded-lg flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-expense" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm text-muted-foreground">
                ₹{(totalBudget - totalSpent).toLocaleString()} remaining
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Categories</p>
                <p className="text-2xl font-bold text-foreground">{mockCategories.length}</p>
              </div>
              <div className="w-12 h-12 bg-success-light rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-success" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm text-muted-foreground">Active budgets</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Button 
          className="bg-gradient-to-r from-primary to-primary-hover shadow-lg hover:shadow-xl transition-all duration-200"
          onClick={() => navigate("/payment")}
        >
          <Plus className="w-4 h-4 mr-2" />
          Make Payment
        </Button>
        <Button 
          className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          onClick={() => navigate("/payment?method=upi")}
        >
          <Smartphone className="w-4 h-4 mr-2" />
          Quick UPI Pay
        </Button>
        <Button variant="outline" onClick={() => navigate("/history")}>View All Transactions</Button>
        <Button variant="outline">Manage Budgets</Button>
      </div>

      {/* Category Cards */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Category Budgets</h2>
            <p className="text-muted-foreground">Track your spending across different categories</p>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockCategories.map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              balance={category.balance}
              budget={category.budget}
              icon={category.icon}
              color={category.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}