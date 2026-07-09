import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, ArrowDownLeft, ArrowUpRight } from "lucide-react";

export function WalletBalance() {
  // TODO: Fetch real data
  const balance = 245000.75;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">\u20a6{balance.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        <div className="mt-4 flex space-x-2">
          <Button size="sm" variant="outline"><ArrowUpRight className="mr-2 h-4 w-4"/>Send</Button>
          <Button size="sm" variant="outline"><ArrowDownLeft className="mr-2 h-4 w-4"/>Request</Button>
        </div>
      </CardContent>
    </Card>
  );
}
