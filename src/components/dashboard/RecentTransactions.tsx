import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownLeft, ShoppingBag, Coffee, Home, Zap } from 'lucide-react';

export default function RecentTransactions() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    if (user) fetchTransactions();
  }, [user]);

  const fetchTransactions = async () => {
    const { data } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false })
      .limit(5);
    if (data) setTransactions(data);
  };

  const getIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'shopping': return ShoppingBag;
      case 'food': return Coffee;
      case 'rent': return Home;
      case 'utilities': return Zap;
      default: return Zap;
    }
  };

  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <button className="text-sm text-primary font-medium hover:underline">View All</button>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactions.length > 0 ? (
          transactions.map((tx) => {
            const Icon = getIcon(tx.category);
            return (
              <div key={tx.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-secondary/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'}`}>
                    {tx.type === 'deposit' ? <ArrowDownLeft className="w-5 h-5 text-green-600" /> : <ArrowUpRight className="w-5 h-5 text-red-600" />}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{tx.description}</div>
                    <div className="text-xs text-muted-foreground">{new Date(tx.created_at).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className={`font-bold ${tx.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                  {tx.type === 'deposit' ? '+' : '-'}₦{tx.amount.toLocaleString()}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-muted-foreground italic">No transactions yet</div>
        )}
      </CardContent>
    </Card>
  );
}
