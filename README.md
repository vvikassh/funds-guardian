# 💰 SmartBudget — Personal Finance & UPI Payment Tracker

A modern, responsive personal finance management application built with React and TypeScript. Track expenses across categories, manage budgets, simulate UPI payments, and visualize spending with interactive charts.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)

---

## ✨ Features

### 📊 Dashboard
- Real-time overview of total bank balance, monthly budget, and total spending
- Category-wise budget cards with progress indicators and alerts (Over Budget / Low Funds)
- Quick action buttons for payments and UPI transactions

### 💳 Payment System
- Category-based payment processing with balance validation
- **UPI Integration** — Simulated UPI payment flow supporting GPay, PhonePe, Paytm, and custom UPI IDs
- Real-time balance deduction from both total balance and category budget
- Payment method selection: UPI, Credit/Debit Card, Bank Transfer, Digital Wallet

### 📈 Analytics
- **Pie Chart** — Expense distribution across all categories
- **Bar Chart** — Spent vs Budget comparison per category
- Summary cards for total expenses, remaining budget, and over-budget alerts

### 🎯 Budget Management
- Set and edit budget limits per category with inline editing
- Visual progress bars showing utilization percentage
- Real-time over-budget warnings and remaining balance indicators

### 📜 Transaction History
- Chronological list of all transactions styled like a bank statement
- Filter and view transactions by category

---

## 🛠️ Tech Stack

| Layer        | Technology                          |
|-------------|-------------------------------------|
| Frontend    | React 18, TypeScript                |
| Styling     | Tailwind CSS, shadcn/ui             |
| Charts      | Recharts                            |
| Routing     | React Router DOM v6                 |
| Build Tool  | Vite                                |
| State       | React Hooks, TanStack React Query   |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/funds-guardian.git

# Navigate to project directory
cd funds-guardian

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable shadcn/ui components
│   ├── AppSidebar.tsx    # Navigation sidebar
│   ├── CategoryCard.tsx  # Budget category card component
│   ├── Layout.tsx        # App layout wrapper
│   └── UPIPayment.tsx    # UPI payment flow component
├── data/
│   └── mockData.ts       # Mock data for categories, transactions & user profile
├── hooks/                # Custom React hooks
├── lib/
│   ├── currency.ts       # Currency formatting utilities (INR)
│   └── utils.ts          # General utility functions
├── pages/
│   ├── Dashboard.tsx     # Main dashboard with overview cards
│   ├── PaymentPage.tsx   # Payment form with UPI integration
│   ├── Analytics.tsx     # Charts and spending insights
│   ├── BudgetManagement.tsx  # Budget editing interface
│   └── TransactionHistory.tsx # Transaction log
└── App.tsx               # Root component with routing
```

---

## 📸 Screenshots

> Add screenshots of Dashboard, Analytics, and UPI Payment flow here.

---

## 🗺️ Roadmap

- [ ] Backend integration with database (Supabase / Firebase)
- [ ] User authentication (Sign up / Login / OAuth)
- [ ] Real UPI payment gateway integration (Razorpay / Stripe)
- [ ] Monthly spending trends (line charts)
- [ ] Export transactions as CSV / PDF
- [ ] Dark mode support
- [ ] Mobile PWA support

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/) — Beautiful, accessible UI components
- [Recharts](https://recharts.org/) — Composable charting library
- [Lucide Icons](https://lucide.dev/) — Clean, consistent icon set
- Built with [Lovable](https://lovable.dev)
