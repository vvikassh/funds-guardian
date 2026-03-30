import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockTransactions, mockCategories } from "@/data/mockData";
import { Search, Filter, TrendingDown, TrendingUp, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { formatCurrency } from "@/lib/currency";

export default function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || transaction.categoryId === filterCategory;
    const matchesType = filterType === "all" || transaction.type === filterType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "expense":
        return <TrendingDown className="w-4 h-4 text-expense" />;
      case "income":
        return <TrendingUp className="w-4 h-4 text-success" />;
      case "transfer":
        return <ArrowUpDown className="w-4 h-4 text-primary" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "expense":
        return "text-expense";
      case "income":
        return "text-success";
      case "transfer":
        return "text-primary";
      default:
        return "text-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Transaction History</h1>
        <p className="text-muted-foreground">Track your spending and transfers</p>
      </div>

      {/* Filters */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {mockCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="expense">Expenses</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="transfer">Transfers</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Transactions ({filteredTransactions.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {filteredTransactions.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No transactions found matching your criteria.
              </div>
            ) : (
              filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="p-6 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                        {getTypeIcon(transaction.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {transaction.description}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {transaction.categoryName}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(transaction.date)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`text-lg font-bold ${getTypeColor(transaction.type)}`}>
                        {transaction.type === "income" ? "+" : "-"}{formatCurrency(transaction.amount)}
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>Balance: {formatCurrency(transaction.remainingBalance)}</div>
                        <div>Category: {formatCurrency(transaction.categoryBalance)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}