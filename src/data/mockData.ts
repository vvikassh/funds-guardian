import { 
  ShoppingCart, 
  Coffee, 
  Plane, 
  PiggyBank, 
  Car, 
  Home,
  Gamepad2,
  Heart
} from "lucide-react";

export interface Category {
  id: string;
  name: string;
  balance: number;
  budget: number;
  icon: any;
  color: "success" | "warning" | "expense" | "primary";
}

export interface Transaction {
  id: string;
  categoryId: string;
  categoryName: string;
  amount: number;
  date: string;
  description: string;
  type: "expense" | "income" | "transfer";
  remainingBalance: number;
  categoryBalance: number;
}

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Groceries",
    balance: 245.50,
    budget: 500.00,
    icon: ShoppingCart,
    color: "success"
  },
  {
    id: "2", 
    name: "Junk Food",
    balance: 78.25,
    budget: 100.00,
    icon: Coffee,
    color: "warning"
  },
  {
    id: "3",
    name: "Travel",
    balance: 1250.00,
    budget: 800.00,
    icon: Plane,
    color: "expense"
  },
  {
    id: "4",
    name: "Savings",
    balance: 2500.00,
    budget: 1000.00,
    icon: PiggyBank,
    color: "success"
  },
  {
    id: "5",
    name: "Transportation",
    balance: 150.75,
    budget: 300.00,
    icon: Car,
    color: "primary"
  },
  {
    id: "6",
    name: "Housing",
    balance: 1200.00,
    budget: 1500.00,
    icon: Home,
    color: "success"
  },
  {
    id: "7",
    name: "Entertainment",
    balance: 89.50,
    budget: 200.00,
    icon: Gamepad2,
    color: "primary"
  },
  {
    id: "8",
    name: "Healthcare",
    balance: 125.00,
    budget: 250.00,
    icon: Heart,
    color: "warning"
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    categoryId: "1",
    categoryName: "Groceries",
    amount: 45.67,
    date: "2024-01-15",
    description: "Whole Foods Market",
    type: "expense",
    remainingBalance: 2845.33,
    categoryBalance: 245.50
  },
  {
    id: "2",
    categoryId: "2",
    categoryName: "Junk Food", 
    amount: 12.50,
    date: "2024-01-14",
    description: "McDonald's",
    type: "expense",
    remainingBalance: 2891.00,
    categoryBalance: 78.25
  },
  {
    id: "3",
    categoryId: "3",
    categoryName: "Travel",
    amount: 450.00,
    date: "2024-01-13",
    description: "Flight to New York",
    type: "expense",
    remainingBalance: 2903.50,
    categoryBalance: 1250.00
  },
  {
    id: "4",
    categoryId: "4",
    categoryName: "Savings",
    amount: 500.00,
    date: "2024-01-12",
    description: "Monthly savings transfer",
    type: "transfer",
    remainingBalance: 3353.50,
    categoryBalance: 2500.00
  },
  {
    id: "5",
    categoryId: "5", 
    categoryName: "Transportation",
    amount: 35.25,
    date: "2024-01-11",
    description: "Gas Station",
    type: "expense",
    remainingBalance: 3853.50,
    categoryBalance: 150.75
  }
];

export const userProfile = {
  name: "Sarah Johnson",
  email: "sarah@example.com",
  totalBalance: 2845.33,
  monthlyIncome: 5000.00,
  totalBudget: 4150.00
};