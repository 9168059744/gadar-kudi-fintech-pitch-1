import { WalletBalance } from "@/components/dashboard/WalletBalance";
import { SavingsTracker } from "@/components/dashboard/SavingsTracker";
import { BudgetPlanner } from "@/components/dashboard/BudgetPlanner";
import { TransactionHistory } from "@/components/dashboard/TransactionHistory";

export function DashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="col-span-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      <div className="col-span-4 lg:col-span-1">
        <WalletBalance />
      </div>
      <div className="col-span-4 lg:col-span-1">
        <SavingsTracker />
      </div>
      <div className="col-span-4 lg:col-span-2">
        <BudgetPlanner />
      </div>
      <div className="col-span-4">
        <TransactionHistory />
      </div>
    </div>
  );
}
