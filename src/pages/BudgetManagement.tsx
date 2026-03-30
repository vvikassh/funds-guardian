import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { mockCategories, Category } from "@/data/mockData";
import { formatCurrency } from "@/lib/currency";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Check, X, Target } from "lucide-react";

export default function BudgetManagement() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBudget, setEditBudget] = useState("");
  const { toast } = useToast();

  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.balance, 0);

  const handleEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditBudget(cat.budget.toString());
  };

  const handleSave = (id: string) => {
    const newBudget = parseFloat(editBudget);
    if (isNaN(newBudget) || newBudget <= 0) {
      toast({ title: "Invalid budget", description: "Please enter a valid amount", variant: "destructive" });
      return;
    }
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, budget: newBudget } : cat))
    );
    setEditingId(null);
    toast({ title: "Budget updated", description: `Budget has been set to ${formatCurrency(newBudget)}` });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditBudget("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Budget Management</h1>
        <p className="text-muted-foreground">Set and adjust your category budgets</p>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Monthly Budget</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(totalBudget)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-expense-light rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-expense" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overall Utilisation</p>
                <p className="text-2xl font-bold text-foreground">{((totalSpent / totalBudget) * 100).toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Budgets */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Category Budgets</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const percentage = (cat.balance / cat.budget) * 100;
              const isOver = cat.balance > cat.budget;
              const isEditing = editingId === cat.id;

              return (
                <div key={cat.id} className="p-6 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{cat.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Spent: {formatCurrency(cat.balance)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <Label className="text-sm sr-only">Budget</Label>
                          <Input
                            type="number"
                            value={editBudget}
                            onChange={(e) => setEditBudget(e.target.value)}
                            className="w-32 h-9"
                          />
                          <Button size="icon" variant="ghost" className="h-9 w-9" onClick={() => handleSave(cat.id)}>
                            <Check className="w-4 h-4 text-success" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-9 w-9" onClick={handleCancel}>
                            <X className="w-4 h-4 text-expense" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="font-bold text-foreground">{formatCurrency(cat.budget)}</p>
                            {isOver && (
                              <Badge variant="destructive" className="text-xs">Over Budget</Badge>
                            )}
                          </div>
                          <Button size="icon" variant="ghost" className="h-9 w-9" onClick={() => handleEdit(cat)}>
                            <Pencil className="w-4 h-4 text-muted-foreground" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <Progress value={Math.min(percentage, 100)} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {percentage.toFixed(0)}% of budget used — {formatCurrency(Math.max(cat.budget - cat.balance, 0))} remaining
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
