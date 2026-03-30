import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/currency";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  name: string;
  balance: number;
  budget: number;
  icon: LucideIcon;
  color: "success" | "warning" | "expense" | "primary";
  onClick?: () => void;
}

export function CategoryCard({ name, balance, budget, icon: Icon, color, onClick }: CategoryCardProps) {
  const navigate = useNavigate();
  const percentage = (balance / budget) * 100;
  const isOverBudget = balance > budget;
  const isWarning = percentage > 80 && !isOverBudget;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/payment?category=${encodeURIComponent(name)}`);
    }
  };

  const colorClasses = {
    success: "from-success to-success/80",
    warning: "from-warning to-warning/80", 
    expense: "from-expense to-expense/80",
    primary: "from-primary to-primary/80"
  };

  const bgClasses = {
    success: "bg-success-light",
    warning: "bg-warning-light",
    expense: "bg-expense-light", 
    primary: "bg-accent"
  };

  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-0 shadow-md cursor-pointer hover:shadow-primary/20" 
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            bgClasses[color]
          )}>
            <Icon className="w-6 h-6 text-foreground" />
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(balance)}
            </p>
            <p className="text-sm text-muted-foreground">
              of {formatCurrency(budget)}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">{name}</h3>
            {isOverBudget && (
              <span className="text-xs font-medium text-expense bg-expense-light px-2 py-1 rounded-full">
                Over Budget
              </span>
            )}
            {isWarning && (
              <span className="text-xs font-medium text-warning-foreground bg-warning-light px-2 py-1 rounded-full">
                Low Funds
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Progress 
              value={Math.min(percentage, 100)} 
              className="h-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{percentage.toFixed(0)}% used</span>
              <span>{formatCurrency(budget - balance)} remaining</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}