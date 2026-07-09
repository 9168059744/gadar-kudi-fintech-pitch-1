import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TransactionHistory() {
  // TODO: Fetch real data
  const transactions = [
    { id: "1", description: "Market Supplies", amount: -12000, date: "2024-07-22", type: "expense" },
    { id: "2", description: "Crop Sale", amount: 85000, date: "2024-07-21", type: "income" },
    { id: "3", description: "Airtime", amount: -1000, date: "2024-07-21", type: "expense" },
    { id: "4", description: "Transfer from sister", amount: 5000, date: "2024-07-20", type: "income" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>{tx.description}</TableCell>
                <TableCell>{tx.date}</TableCell>
                <TableCell className={`text-right ${tx.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                  {tx.type === 'income' ? '+' : '-'}\u20a6{Math.abs(tx.amount).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
